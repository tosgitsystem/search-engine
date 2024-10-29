'use client';
import { refetchQuery, searchQuery, showSuggestion } from '@/src/states/atoms/queryAtom';
import { useQueryClient } from '@tanstack/react-query';
import { Mic, Search,  Sparkles, X } from 'lucide-react';
import React, { useState, ChangeEvent, useEffect, useRef} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type SearchBarProps = {
  suggestions: string[];
  onSelect: (value: string) => void;
  onInputChange?: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ suggestions, onSelect,onInputChange}) => {
  const query = useRecoilValue(searchQuery);
  const setQuery = useSetRecoilState(searchQuery);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const showSuggestions = useRecoilValue(showSuggestion);
  const setShowSuggestions = useSetRecoilState(showSuggestion);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [error, setError] = useState<string | null>(null);
  const [justSelected, setJustSelected] = useState(false);
  const [listening, setListening] = useState(false);
  const [endSpeech, setEndSpeech] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const queryClient = useQueryClient() 
  const setRefetchData = useSetRecoilState(refetchQuery);


  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setEndSpeech(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      if(isInitialLoad) {
        setShowSuggestions(false);
        setIsInitialLoad(false);
      }
      console.log("debouncedQuery", debouncedQuery);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery && !justSelected) {
      const fetchSuggestions = async () => {
        try {
          if (debouncedQuery === 'error') {
            throw new Error('500 Internal Server Error');
          }

          setFilteredSuggestions(
            suggestions.filter((suggestion) =>
              suggestion.toLowerCase().includes(debouncedQuery.toLowerCase())
            )
          );

          // Only show suggestions if it's not the initial load
         

          setError(null);
        } catch (e) {
          setError('500 Internal Server Error');
        }
      };
      fetchSuggestions();
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setError(null);
    }

    // Set initial load to false after the first render
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [debouncedQuery, suggestions, justSelected]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

const handleSearchBarClick = () => {
  if (!isInitialLoad) {
    console.log("", isInitialLoad);
    setShowSuggestions(debouncedQuery.length > 0);
  }
}

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (justSelected) {
      setJustSelected(false);
      return;
    }
    onInputChange && onInputChange(e.target.value);
    setQuery(e.target.value);
  };

  const handleParamsChange = () =>{
        // Update the URL query parameter
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('q', query); // Set the query parameter
        window.history.replaceState({}, '', currentUrl);
  }

 // Handle Enter key press
 useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      setRefetchData(true);
      handleParamsChange();

      queryClient.invalidateQueries({ queryKey: ["searchResult"] });
       // Reset page to 1
    }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  };
}, [query, queryClient]);



  const handleSelect = (value: string) => {
    setQuery(value);
setRefetchData(true);
handleParamsChange();
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setJustSelected(true);
    onSelect(value);

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const SpeechRecog = () => {
    const SpeechRecognition = (window ).SpeechRecognition || (window).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();

    if (endSpeech) {
      recognition.stop();
      setListening(false);
      setEndSpeech(false);
      return;
    }

    recognition.onstart = () => {
      console.log("Listening...");
      setListening(true);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      console.log("Stopped listening");
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.start();
  };

  const clearButtonClicked = () => {
    setQuery('');
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setJustSelected(false);
    setListening(false);
  };





  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
        );
      } else if (e.key === 'Enter') {
        if (activeSuggestionIndex >= 0 && filteredSuggestions.length > 0) {
          handleSelect(filteredSuggestions[activeSuggestionIndex]);
        } else {
          setRefetchData(true);
          handleParamsChange();
          queryClient.invalidateQueries({ queryKey: ["searchResult"] });
        }
      }
    }
  };

  useEffect(() => {
    if (suggestionsRef.current && activeSuggestionIndex >= 0) {
      const activeElement = suggestionsRef.current.children[activeSuggestionIndex] as HTMLElement;
      if (activeElement) {
        const containerTop = suggestionsRef.current.scrollTop;
        const containerBottom = containerTop + suggestionsRef.current.clientHeight;
        const elementTop = activeElement.offsetTop;
        const elementBottom = elementTop + activeElement.offsetHeight;

        if (elementTop < containerTop) {
          suggestionsRef.current.scrollTop = elementTop;
        } else if (elementBottom > containerBottom) {
          suggestionsRef.current.scrollTop = elementBottom - suggestionsRef.current.clientHeight;
        }
      }
    }
  }, [activeSuggestionIndex]);


  return (
    <div className="relative flex justify-center items-center w-full max-w-5xl mx-auto" ref={searchBarRef}>
      <div className='relative w-[95vw] md:w-[50vw] px-5 py-1 bg-white rounded-3xl shadow-md shadow-gray-200  outline outline-1 outline-[#eceef2]'>
        <div className="absolute left-0 top-0 flex items-center pl-4 h-full">
          <Search size={20} color="#4A0A84" />
        </div>

        <input
          ref={inputRef}
          id="search-input"
          type="text"
          autoFocus={false}
          value={query}
          onClick={handleSearchBarClick}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`w-full pl-6 pr-10 py-2 focus:outline-none focus:border-blue-500 ${listening ? 'placeholder-blue-500' : 'placeholder-gray-050'}`}
          placeholder={listening ? 'Listening...' : 'Search...'}
        />

        {(query || listening) ? (
          <div className="absolute right-0 top-0 flex items-center pr-4 h-full">
            <X size={20} color="#B4B4B8" className='text-[#B4B4B8] hover:cursor-pointer hover:scale-125 hover:font-bold ease-in-out transition-all' onClick={clearButtonClicked} />
          </div>
        ) : (
          <div className="absolute right-0 top-0 flex items-center pr-4 h-full gap-1">
            <Mic
              size={20}
              color='#4A0A84'
              className='text-[#B4B4B8] hover:cursor-pointer hover:scale-125 hover:font-bold ease-in-out transition-all'
              onClick={SpeechRecog}
            />
            <Sparkles size={20} color="#4A0A84" className="text-[#B4B4B8] hover:cursor-pointer hover:scale-125 hover:font-bold ease-in-out transition-all" />
          </div>
        )}
      </div>

      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}

      {showSuggestions &&  filteredSuggestions.length > 0 && (
        <ul ref={suggestionsRef} className="absolute top-full left-0 w-full md:w-[50vw] bg-white border border-gray-300 rounded-lg shadow-lg z-[1000] custom-scrollbar max-h-[300px] mt-1 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === activeSuggestionIndex ? 'bg-gray-200' : ''
              }`}
              onMouseDown={() => handleSelect(suggestion)}
            >

                <HighlightedText text={suggestion} query={query} />
              </li>
            ))
          ) : (
            ''
          )}
        </ul>
      )}
    </div>
  );
};

type HighlightedTextProps = {
  text: string;
  query: string;
};

const HighlightedText = ({ text, query }: HighlightedTextProps) => {
  if (!query) return <span>{text}</span>;

  const startIndex = text.toLowerCase().indexOf(query.toLowerCase());

  // If no match found, return the original text
  if (startIndex === -1) {
    return <span>{text}</span>;
  }

  const endIndex = startIndex + query.length;
  const beforeMatch = text.slice(0, startIndex);
  const match = text.slice(startIndex, endIndex);
  const afterMatch = text.slice(endIndex);

  return (
    <span className='flex'>
      {beforeMatch}
      <span className="text-gray-900 font-semibold">{match}</span>
      {afterMatch}
    </span>
  );
};

export default SearchBar;
