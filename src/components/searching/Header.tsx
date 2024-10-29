import React, { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { MoreVertical, Settings } from "lucide-react";
import SearchBar from "./searchbar";
import { useRecoilValue } from "recoil";
import { IsMobile } from "@/src/providers/UserAgentProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { search } from "@/src/services/search";

export const Header: React.FC = () => {
  const [showFixedSearchBar, setShowFixedSearchBar] = useState(false);
  const isMobile = useRecoilValue(IsMobile);
  const [query, setQuery] = useState<string>("");
  const queryClient = useQueryClient();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelect = (value: string) => {
    console.log('Selected:', value);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedSearchBar(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <header className="relative h-auto">
      <div className="container mx-auto sm:ml-16 flex flex-col md:flex-row items-center justify-between h-full">
        <div className="flex flex-col md:flex-row items-center space-x-2 gap-y-3 md:space-x-4 w-full md:w-auto">
          <div className="mt-8 md:mt-4 mb-3 w-full flex flex-row-reverse justify-between items-center">
            <div className="md:hidden pr-3">
              {/* <Settings className="h-5 w-5" /> */}
            </div>
            <a href="/">
              <Image
                src="/seekmonk.jpg"
                alt="eek-monk"
                width={isMobile ? 120 : 150}
                height={isMobile ? 120 : 150}
                className="mx-auto md:mx-0"
              />
            </a>
            <div>
              {/*  */}
            </div>
          </div>
          <div className="flex-grow md:mb-0 mb-4 md:mt-0 -mt-4">
            <SearchBar 
              suggestions={suggestions?.data.suggestions?.map((s: { value: string }) => s.value) || []}
              onInputChange={handleInputChange}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4 px-3">
          <Settings className="h-5 w-5 text-white" />
          <MoreVertical className="h-5 w-5 text-white" />
        </div>
      </div>
      {isMobile && showFixedSearchBar && (
        <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b p-4 pb-2">
          <div className="container mx-auto">
            <SearchBar 
              suggestions={suggestions?.data.suggestions?.map((s: { value: string }) => s.value) || []}
              onInputChange={handleInputChange}
              onSelect={handleSelect}
            />
          </div>
        </div>
      )}
    </header>
  );
};