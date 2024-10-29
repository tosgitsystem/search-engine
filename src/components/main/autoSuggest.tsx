'use client';
import { Mic, Search, X } from 'lucide-react';
import React, { forwardRef, useState, ChangeEvent, useEffect, useRef } from 'react';
import classNames from 'classnames'; // Ensure the package is installed
import { useRecoilState } from 'recoil';
import { searchQuery, showSuggestion } from '@/src/states/atoms/queryAtom'; // Recoil atom for search query

type SearchBarProps = {
  suggestions: string[];
  onSelect: (value: string) => void;
  onInputChange?: (value: string) => void;
  disabled?: boolean;
  inputClassName?: string;
  onSearch?: (query: string) => void; // Custom className prop for input element
};

type SearchBarHandle = {
  focus: () => void;
};

const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(
  ({ suggestions, onSelect, disabled, inputClassName, onSearch,onInputChange }) => {
    const [query, setQuery] = useRecoilState<string>(searchQuery); // Using Recoil state with explicit type
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useRecoilState<boolean>(showSuggestion);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [error, setError] = useState<string | null>(null);
    const [justSelected, setJustSelected] = useState(false);
    const [listening, setListening] = useState(false);
    const [endSpeech, setEndSpeech] = useState(false);
   

    const searchBarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
            setTimeout(() => {
              setShowSuggestions(debouncedQuery.length > 0);
            }, 100);
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
    }, [debouncedQuery, suggestions, justSelected]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (justSelected) {
        setJustSelected(false);
        return;
      }
      onInputChange && onInputChange(e.target.value);
      setQuery(e.target.value); // Updating Recoil state
    };

    const handleSelect = (value: string) => {
      setQuery(value); // Set selected value in Recoil state
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setJustSelected(true);
      onSelect(value);

      if (inputRef.current) {
        inputRef.current.blur();
      }
    };

    const SpeechRecog = () => {
      if (disabled) {
        return;
      }
      const SpeechRecognition = (window).SpeechRecognition || (window ).webkitSpeechRecognition;
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
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      }
  
      recognition.onsoundend = () => {
        console.log("Sound ended");
        setListening(false);
      }

      recognition.onspeechend = () => {
        recognition.stop();
        setListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript); // Update Recoil state with the speech input
      };

      recognition.start();
    };

    const clearButtonClicked = () => {
      setQuery(''); // Clear the Recoil state query
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setJustSelected(false);
      setListening(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
       setShowSuggestions(false);
        if (query.trim()) {
          if (onSearch) {
            onSearch(query); // Call the search function passed from the parent
          }
        }
      }
    };

    return (
      <div className="relative flex justify-center items-center w-full max-w-md mx-auto" ref={searchBarRef}>
        <div className={classNames("relative w-[350px] px-5 bg-white border border-gray-300 rounded-full", inputClassName)}>
          <div className="absolute left-0 top-0 p-3 pt-3">
            <Search size={20} color="#B4B4B8" />
          </div>

          <input
            ref={inputRef}
            id="search-input"
            type="text"
            autoFocus={true}
            value={query} // Bind input value to Recoil state
            readOnly={disabled}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className={classNames(
              'w-full ml-1 px-4 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-400',
              { 'placeholder-blue-500': listening },
              inputClassName // Ensure custom classes will override default ones
            )}
            placeholder={listening ? 'Listening...' : 'Search...'}
          />

          {(query || listening) ? (
            <div className="absolute right-0 top-0 flex flex-row gap-1 p-2 pt-3">
              <X
                size={20}
                color="#B4B4B8"
                className="text-[#B4B4B8] hover:cursor-pointer hover:scale-125 hover:font-bold ease-in-out transition-all"
                onClick={clearButtonClicked}
              />
            </div>
          ) : (
            <div className="absolute right-0 top-0 pt-3 p-4">
              <Mic
                size={20}
                color="#B4B4B8"
                className="text-[#B4B4B8] hover:cursor-pointer hover:scale-125 hover:font-bold ease-in-out transition-all"
                onClick={SpeechRecog}
              />
            </div>
          )}
        </div>

        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}

        {showSuggestions && (
          <ul className="absolute max-h-[300px] top-10 overflow-y-scroll overflow-x-hidden w-[350px] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-[1000] custom-scrollbar">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-nowrap cursor-pointer hover:bg-gray-100 whitespace-nowrap overflow-hidden text-ellipsis"
                  onClick={() => handleSelect(suggestion)}
                >
                  <HighlightedText text={suggestion} query={query} />
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No suggestions</li>
            )}
          </ul>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

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
