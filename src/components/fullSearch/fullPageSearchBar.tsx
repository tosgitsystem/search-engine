"use client";
import { ArrowLeft, ArrowUpLeft, Mic, SearchIcon, X } from "lucide-react";
import React, {
  forwardRef,
  useState,
  ChangeEvent,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames"; // Ensure the package is installed
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { searchQuery, showSuggestion } from "@/src/states/atoms/queryAtom"; // Recoil atom for search query

import { useModal } from "@/src/hooks/useModal";

type FullPageSearchBarProps = {
  suggestions: string[];
  onInputChange?: (value: string) => void;
  onSelect: (value: string) => void;
 
  inputClassName?: string;
  onSearch?: (query: string) => void; // Custom className prop for input element
};

type SearchBarHandle = {
  focus: () => void;
};

export const FullPageSearchBar = forwardRef<
  SearchBarHandle,
  FullPageSearchBarProps
>(({ suggestions, onSelect, inputClassName, onSearch, onInputChange }) => {
const query = useRecoilValue(searchQuery)
console.log("query", query)
const setQuery = useSetRecoilState(searchQuery)
// Using Recoil state with explicit type
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const showSuggestions = useRecoilValue(showSuggestion);
  const setShowSuggestions = useSetRecoilState(showSuggestion);

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [error, setError] = useState<string | null>(null);
  const [justSelected, setJustSelected] = useState(false);
  const [listening, setListening] = useState(false);
  const [endSpeech, setEndSpeech] = useState(false);
  const { closeModal } = useModal();

  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


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
          if (debouncedQuery === "error") {
            throw new Error("500 Internal Server Error");
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
          setError("500 Internal Server Error");
        }
      };
      fetchSuggestions();
    } else {
         console.log("else starment")
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setError(null);
    }
  }, [debouncedQuery, suggestions, justSelected]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Input Changed",e.target.value)
    if (justSelected) {
      setJustSelected(false);
      return;
    }
    onInputChange && onInputChange(e.target.value);
    setQuery(e.target.value); // Updating Recoil state
  };

  const handleSelect = (value: string) => {
    console.log("handle select clicked");
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
 
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser");
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
    };

    recognition.onsoundend = () => {
      console.log("Sound ended");
      setListening(false);
    };

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
    setQuery(""); // Clear the Recoil state query
console.log("clear button clicked")
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setJustSelected(false);
    setListening(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        console.log("Enter key pressed")
      setShowSuggestions(false);
      if (query.trim()) {
        if (onSearch) {
          onSearch(query); // Call the search function passed from the parent
        }
      }
    }
  };

  return (
    <div
      className="relative flex justify-center items-center w-full max-w-md mx-auto border-b"
      ref={searchBarRef}
    >
      <div
        className={classNames(
          "relative w-full px-5 border-b border-gray-400",
          inputClassName
        )}
      >
        <div className="absolute left-0 top-0 p-3 pt-4 ">
          <ArrowLeft size={20} color="#B4B4B8" onClick={closeModal} />
        </div>

        <input
          ref={inputRef}
          id="search-input"
          type="text"
          autoFocus={true}
          value={query} // Bind input value to Recoil state
    
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className={classNames(
            "w-full ml-3 px-4 py-3 bg-transparent focus:outline-none  focus:border-blue-500 placeholder-gray-400 text-lg",
            { "placeholder-blue-500": listening },
            inputClassName // Ensure custom classes will override default ones
          )}
          placeholder={
            listening ? "Listening..." : "Search the web privately..."
          }
        />

        {query || listening ? (
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

      {showSuggestions && filteredSuggestions.length > 0 &&  (
        <ul className="absolute max-h-screen top-10 border-t scrollbar-none bg-white w-full mt-1  z-[100] "   onClick={() => (console.log("hjxbsjbwjsk"))}>
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="relative px-4 py-3 text-black cursor-pointer hover:bg-gray-400 z-[101]"
                onMouseDown={() => {

                  console.log("clicked")
             
                  handleSelect(suggestion)}}
              >
                <div
                  className="w-full flex flex-row justify-between items-center"
                 
                >
                  <div className="flex flex-row w-full  gap-4" onClick={() => {console.log("clicked")}}>
                    <SearchIcon size={18} className="text-center mt-1" />
                    <span>
                      <HighlightedText text={suggestion} query={query} />
                    </span>
                  </div>
                  <ArrowUpLeft className="" />
                </div>
              </li>
            ))
          ) : (
''
          )}
        </ul>
      )}
    </div>
  );
});

FullPageSearchBar.displayName = "SearchBar";

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
