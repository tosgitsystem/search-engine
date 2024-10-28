// FullPageSearch.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { FullPageSearchBar } from "./fullPageSearchBar";
import { search } from "@/src/services/search";



// Custom debounce function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (func: (...args: any) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<typeof func>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface FullPageSearchProps {
  onSelect: (value: string) => void;
  isOpen: boolean;
}
const FullPageSearch: React.FC<FullPageSearchProps> = ({ isOpen, onSelect }) => {
  const [query, setQuery] = useState<string>(""); // Local state to track the user's input
  const router = useRouter();

  // Fetch suggestions using TanStack Query
  const { data: suggestions, refetch } = useQuery({
    queryKey: ["searchAutocomplete", query], // Re-fetch when query changes
    queryFn: () => search({type:"autocomplete", q: query }), // Fetch suggestions using the API
    enabled: !!query, // Only fetch if the query is not empty
    staleTime: 60 * 1000, // Cache results for 1 minute
    refetchOnWindowFocus: false, // Prevent refetching when the window is refocused
  });

  // Debounced function to handle input changes
  const handleInputChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debounce((input: any) => {
      setQuery(input); // Set query state with the debounced input
      refetch(); // Refetch suggestions after debounce
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    if (isOpen) {
      // Disable background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable background scroll
      document.body.style.overflow = "";
    }

    // Cleanup on unmount or when isOpen changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const fetchResultsAndNavigate = async (query: string) => {
    console.log("Searching for: ", query);
    // Simulate an API call with a 2-second delay
    setTimeout(() => {
      console.log("Fake API call successful.");
      // Navigate to the search results page after the delay
      router.push(`/search/${query}`);
    }, 200);
  };




  return (
    <div className="fixed inset-0 bg-gradient z-50 flex flex-col">
      <div className="w-full flex flex-col md:flex-row justify-between items-center relative">
        {/* Brick pattern */}
        <div className="overflow-x-hidden absolute -top-16 bg-[url(/brick-pattern.png)] bg-no-repeat bg-contain bg-top opacity-10 w-1/2 min-h-screen md:flex flex-col justify-center items-center z-0 pointer-events-none" />
        {/* World map */}
        <div className="overflow-x-hidden absolute md:-top-20 md:-right-80 min-h-[50vh] bg-contain bg-[url(/world.svg)] self-end bg-no-repeat bg-right opacity-20 md:opacity-30 w-[70%] h-[80%] md:w-[60%] md:h-[80%] md:min-h-screen flex flex-col justify-center items-center z-0 pointer-events-none" />
      </div>
      <div className="flex flex-col items-center">
        <FullPageSearchBar
          suggestions={suggestions?.data.suggestions?.map((s: { value: string }) => s.value) || []}
          onSelect={onSelect}
          onSearch={fetchResultsAndNavigate}
          onInputChange={handleInputChange} // Pass the debounced input handler
        />
      </div>
    </div>
  );
};

export default FullPageSearch;
