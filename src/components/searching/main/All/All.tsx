import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RelatedFAQSection } from "./Faq";
import { Results } from "./Results";
import { SearchResult } from "@/types";
import { Search } from "lucide-react";
import { refetchQuery, searchQuery } from "@/src/states/atoms/queryAtom";
import { search } from "@/src/services/search";

interface AllProps {
  searchResult?: SearchResult;
 
}

export const All: React.FC<AllProps> = () => {
  const setQuery = useSetRecoilState(searchQuery);
  const [refetchData, setRefetchData] = useRecoilState(refetchQuery)
  const queryClient = useQueryClient();
  const query = useRecoilValue(searchQuery);
  const [page, setPage] = useState(1);

  const { data: searchResults, isLoading,refetch } = useQuery({
    queryKey: ['searchResult', { page }],
    queryFn: () => search({ type: "search", q: query, page }),

  });



  const handleRelatedSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuery(e.currentTarget.textContent || "");
    refetch();
    window.scrollTo({ top: 0, behavior: "smooth" });
    queryClient.invalidateQueries({ queryKey: ["searchResult"] });
    setPage(1);
  };



   

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    setPage(1);
  }, [query,]);



    if (refetchData) {
      refetch();
      console.log("refetching")
      setRefetchData(false);
    }


  if (isLoading && !searchResults) {
    return <div>Loading...</div>;
  }

  const hasNextPage = searchResults?.data?.organic && searchResults.data.organic.length > 0;

  return (
    <main className="container mx-auto px-3 md:pr-4">

  
      {searchResults?.data?.knowledgeGraph && (
        <div className="border border-gray-200 max-w-3xl rounded-2xl p-4 my-4 bg-white shadow-md">
          <h2 className="text-xl font-semibold">
            {searchResults.data.knowledgeGraph.title}
          </h2>
          <div className="flex gap-x-3">
            <div className="w-[30%] ">
          {searchResults.data.knowledgeGraph.imageUrl && (
           <img
              src={searchResults.data.knowledgeGraph.imageUrl}
              alt={searchResults.data.knowledgeGraph.title}
              className=" rounded w-full py-2" 
            />
          )}
          </div>
          <div className="w-[70%]">
          <p>{searchResults.data.knowledgeGraph.description}</p>
          {searchResults.data.knowledgeGraph.website && (
            <a
              href={searchResults.data.knowledgeGraph.website}
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              {searchResults.data.knowledgeGraph.website}
            </a>
          )}
          </div>
          </div>
        </div>
      )}

      <div className="border border-gray-200 max-w-3xl rounded-2xl">
        <Results organicResults={searchResults?.data?.organic} />
      </div>

      {searchResults?.data?.peopleAlsoAsk && searchResults.data.peopleAlsoAsk.length > 0 && (
        <div className="border border-gray-200 max-w-3xl rounded-lg my-4">
          <RelatedFAQSection questions={searchResults.data.peopleAlsoAsk} />
        </div>
      )}

      {searchResults?.data?.relatedSearches && searchResults.data.relatedSearches.length > 0 && (
        <div className="max-w-3xl my-4 p-4">
          <h3 className="font-semibold text-lg flex items-center">
            <Search className="w-5 h-5 mr-2" /> Related queries
          </h3>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {searchResults.data.relatedSearches.map((search: { query: string }, index: number) => (
              <button
                key={index}
                onClick={handleRelatedSearch}
                className="flex items-center text-start p-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-100 transition-all"
              >
                <Search className="w-4 h-4 mr-2 text-gray-500" />
                {search.query}
              </button>
            ))}
          </div>
        </div>
      )}

     <div className="flex justify-between items-center my-4 max-w-3xl">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`flex items-center px-4 py-2 rounded-full border ${
            page === 1
              ? "border-gray-300 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
          }`}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous
        </button>
        <span className="text-gray-700">Page {page}</span>
        {hasNextPage && (
          <button
            onClick={handleNextPage}
            className="flex items-center px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
          >
            Next
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </main>
  );
};