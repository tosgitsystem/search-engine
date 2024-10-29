'use client'

import { useCallback, useEffect, useState, useRef } from "react";
import { CyberSecurityServices, Hero, SecondaryServices, Testimonials } from "../components";
import SearchBar from "../components/main/autoSuggest";
import { useModal } from "../hooks/useModal";
import FullPageSearch from "../components/fullSearch/fullSearchPage";
import { useSetRecoilState } from "recoil";
import { searchQuery } from "../states/atoms/queryAtom";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { search } from "../services/search";

export const HomePage = () => {
  const router = useRouter();
  const setQuery = useSetRecoilState(searchQuery);
  const [localQuery, setLocalQuery] = useState<string>("");
  const { openModal, modalStack } = useModal();
  const queryClient = useQueryClient();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelect = (value: string) => {
    console.log("Selected value: ", value);
    setQuery(value);
    fetchResultsAndNavigate(value);
  };

  const handleSearchClick = () => {
    openModal("full-search-modal");
    console.log("is mobile", isMobile);
    console.log("search clicked");
  };

  const { data: suggestions } = useQuery({
    queryKey: ["searchAutocomplete", localQuery],
    queryFn: () => search({ type: "autocomplete", q: localQuery }),
    enabled: !!localQuery,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const debouncedSearch = useCallback((input: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setLocalQuery(input);
      queryClient.invalidateQueries({ queryKey: ["searchAutocomplete"] });
    }, 500);
  }, [queryClient]);

  const handleInputChange = useCallback((input: string) => {
    // Cancel all previous queries
    queryClient.cancelQueries({ queryKey: ["searchAutocomplete"] });
    debouncedSearch(input);
  }, [debouncedSearch, queryClient]);

  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState("");

    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);

    return userAgent;
  };

  const userAgent = useUserAgent();
  const isMobile = /Mobile|Android/i.test(userAgent);

  const fetchResultsAndNavigate = async (query: string) => {
    console.log("Searching for: ", query);
    setTimeout(() => {
     
      router.push(`/search?q=${query}`);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Hero />
      <div className="absolute top-24 md:top-1/2 flex flex-col md:flex-row gap-3 w-full items-center justify-start md:justify-center z-10 md:-mt-28 px-4 overflow-visible">
        <div className="flex flex-col md:flex-row gap-2" onClick={isMobile ? handleSearchClick : undefined}>
          <SearchBar
            suggestions={suggestions?.data.suggestions?.map((s: { value: string }) => s.value) || []}
            onInputChange={handleInputChange}
            onSelect={(value) => handleSelect(value)}
            disabled={isMobile}
            onSearch={fetchResultsAndNavigate}
          />
        </div>
      </div>
      <main>
        <CyberSecurityServices />
        <SecondaryServices />
        <Testimonials />
      </main>
      <FullPageSearch isOpen={modalStack.includes("full-search-modal")} onSelect={handleSelect} />
    </div>
  );
};