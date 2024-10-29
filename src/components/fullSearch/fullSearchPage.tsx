"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FullPageSearchBar } from "./fullPageSearchBar";
import { search } from "@/src/services/search";

interface FullPageSearchProps {
  onSelect: (value: string) => void;
  isOpen: boolean;
}

const FullPageSearch: React.FC<FullPageSearchProps> = ({ isOpen, onSelect }) => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { data: suggestions } = useQuery({
    queryKey: ["searchAutocomplete", query],
    queryFn: () => search({ type: "autocomplete", q: query }),
    enabled: !!query,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const debouncedSearch = useCallback((input: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setQuery(input);
      queryClient.invalidateQueries({ queryKey: ["searchAutocomplete"] });
    }, 300);
  }, [queryClient]);

  const handleInputChange = useCallback((input: string) => {
    queryClient.cancelQueries({ queryKey: ["searchAutocomplete"] });
    debouncedSearch(input);
  }, [debouncedSearch, queryClient]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const fetchResultsAndNavigate = async (query: string) => {
    console.log("Searching for: ", query);
    setTimeout(() => {
      console.log("Fake API call successful.");
      router.push(`/search?q=${query}`);
    }, 200);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="w-full flex flex-col md:flex-row justify-between items-center relative">
        <div className="overflow-x-hidden absolute -top-16 bg-white bg-no-repeat bg-contain bg-top opacity-10 w-1/2 min-h-screen md:flex flex-col justify-center items-center z-0 pointer-events-none" />
        <div className="overflow-x-hidden absolute md:-top-20 md:-right-80 min-h-[50vh] bg-contain  bg-white self-end bg-no-repeat bg-right opacity-20 md:opacity-30 w-[70%] h-[80%] md:w-[60%] md:h-[80%] md:min-h-screen flex flex-col justify-center items-center z-0 pointer-events-none" />
      </div>
      <div className="flex flex-col items-center">
        <FullPageSearchBar
          suggestions={suggestions?.data.suggestions?.map((s: { value: string }) => s.value) || []}
          onSelect={onSelect}
          onSearch={fetchResultsAndNavigate}
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default FullPageSearch;