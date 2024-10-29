'use client'


import { useCallback, useEffect, useState } from "react";
import { CyberSecurityServices, Hero, SecondaryServices, Testimonials } from "../components";
import SearchBar from "../components/main/autoSuggest";
import { useModal } from "../hooks/useModal";
import FullPageSearch from "../components/fullSearch/fullSearchPage";
import { useSetRecoilState } from "recoil";
import { searchQuery } from "../states/atoms/queryAtom";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { search } from "../services/search";
// import FullPageSearch from "../components/fullSearch/fullSearchPage";



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



export const HomePage = () =>{
  const router = useRouter();

  const setQuery = useSetRecoilState(searchQuery);
  const [localquery, setLocalQuery] = useState<string>(""); 
  const { openModal, modalStack } = useModal();
  // const customers = [
  //   'Adam', 'Bella', 'Charlie', 'David', 'Fiona', 'George', 'Kelly',
  //   'Samantha', 'Harry', 'Olivia', 'Isabella', 'Mason', 'Sophia', 'James', 
  //   'Ava', 'Liam', 'Ethan', 'Noah', 'Emma', 'Michael', 'Lucas', 'Amelia',
  //   'Alexander', 'Mia', 'Benjamin', 'Charlotte', 'Jack', 'Lily', 'Daniel',
  //   'Ella', 'Henry', 'Grace', 'Matthew', 'Zoe', 'Owen', 'Scarlett', 
  //   'Ryan', 'Hazel', 'Gabriel', 'Aria', 'William', 'Chloe', 'Sebastian'
  // ];
  const handleSelect = (value: string) => {
    console.log("Selected value: ", value);
    setQuery(value);
    fetchResultsAndNavigate(value);
    console.log("Selected value: ", value);
   
  };



  const handleSearchClick = () => {
openModal("full-search-modal");
console.log("is mobile", isMobile)
console.log("search clicked")
  };


   // Fetch suggestions using TanStack Query
   const { data: suggestions, refetch } = useQuery({
    queryKey: ["searchAutocomplete", localquery], // Re-fetch when query changes
    queryFn: () => search({type:"autocomplete", q: localquery }),// Fetch suggestions using the API
    enabled: !!localquery, // Only fetch if the query is not empty
    staleTime: 60 * 1000, // Cache results for 1 minute
    refetchOnWindowFocus: false, // Prevent refetching when the window is refocused
  });

  // Debounced function to handle input changes
  const handleInputChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debounce((input: any) => {
      setLocalQuery(input); // Set query state with the debounced input
      refetch(); // Refetch suggestions after debounce
    }, 300), // 300ms debounce delay
    []
  )


// Function to check if the device is mobile
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
  // Simulate an API call with a 2-second delay
  setTimeout(() => {
    console.log("Fake API call successful.");
    // Navigate to the search results page after the delay
    router.push(`/search/${query}`);

  },200);
};

  return (
    <div>
<Hero/>
<div className="absolute top-24 md:top-1/2 flex flex-col md:flex-row gap-3 w-full items-center justify-start md:justify-center  z-10  md:-mt-28 px-4 overflow-visible">
        <div className="flex flex-col md:flex-row gap-2" onClick={isMobile ? handleSearchClick : undefined}>
       <SearchBar                suggestions={suggestions?.data.suggestions?.map((s: { value: string }) => s.value) || []}  onInputChange={handleInputChange}     onSelect={(value) => handleSelect(value)}  disabled={isMobile ? true: false} onSearch={fetchResultsAndNavigate}  />
        </div>
        
      </div>
<main>
  <CyberSecurityServices/>
  <SecondaryServices/>
  <Testimonials/>
</main>

 {/* Full-page search modal
  */}
        <FullPageSearch  isOpen={modalStack.includes("full-search-modal")} onSelect={handleSelect}  />
    

    </div>
  );
}













//autocomolete 


// 'use client'


// import { useCallback, useEffect, useState } from "react";
// import { CyberSecurityServices, Hero, SecondaryServices, Testimonials } from "../components";
// import SearchBar from "../components/main/autoSuggest";
// import { useModal } from "../hooks/useModal";
// import FullPageSearch from "../components/fullSearch/fullSearchPage";
// import { useRecoilState } from "recoil";
// import { searchQuery } from "../states/atoms/queryAtom";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { search } from "../services/search";
// // import FullPageSearch from "../components/fullSearch/fullSearchPage";




// // Custom debounce function
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const debounce = (func: (...args: any) => void, delay: number) => {
//   let timeoutId: ReturnType<typeof setTimeout>;
//   return (...args: Parameters<typeof func>) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };



// export const HomePage = () =>{
 
//   const router = useRouter();


//   const[query, setQuery] = useRecoilState(searchQuery);
//   setQuery("");

//   const { openModal, modalStack } = useModal();

//   const handleSelect = (value: string) => {
//     console.log("Selected value: ", value);
//     setQuery(value);
//     fetchResultsAndNavigate(value);
//     console.log("Selected value: ", value);
   
//   };



//   const handleSearchClick = () => {
// openModal("full-search-modal");
// console.log("is mobile", isMobile)
// console.log("search clicked")
//   };

//   // Fetch suggestions using TanStack Query
//   const { data: suggestions, refetch } = useQuery({
//     queryKey: ["searchAutocomplete"], // Re-fetch when query changes
//     queryFn: () => search({type:"autocomplete", q: query }), // Fetch suggestions using the API
//     enabled: !!query, // Only fetch if the query is not empty
//     staleTime: 60 * 1000, // Cache results for 1 minute
//     refetchOnWindowFocus: false, // Prevent refetching when the window is refocused
//   });

//   // Debounced function to handle input changes
//   const handleInputChange = useCallback(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     debounce((input: any) => {
//       setQuery(input); // Set query state with the debounced input
//       refetch(); // Refetch suggestions after debounce
//     }, 300), // 300ms debounce delay
//     []
//   );


// // Function to check if the device is mobile
// const useUserAgent = () => {
//   const [userAgent, setUserAgent] = useState("");

//   useEffect(() => {
//     setUserAgent(navigator.userAgent);
//   }, []);

//   return userAgent;
// };

// const userAgent = useUserAgent();

// const isMobile = /Mobile|Android/i.test(userAgent);

// const fetchResultsAndNavigate = async (query: string) => {
//   console.log("Searching for: ", query);
//   // Simulate an API call with a 2-second delay
//   setTimeout(() => {
//     console.log("Fake API call successful.");
//     // Navigate to the search results page after the delay
//     router.push(`/search/${query}`);

//   },200);
// };

//   return (
//     <div>
// <Hero/>
// <div className="absolute top-24 md:top-1/2 flex flex-col md:flex-row gap-3 w-full items-center justify-start md:justify-center  z-10  md:-mt-28 px-4 overflow-visible">
//         <div className="flex flex-col md:flex-row gap-2" onClick={isMobile ? handleSearchClick : undefined}>
//        <SearchBar  suggestions={suggestions?.data.suggestions?.map((s: { value: string }) => s.value) || []} onInputChange={handleInputChange}     onSelect={(value) => handleSelect(value)}  disabled={isMobile ? true: false} onSearch={fetchResultsAndNavigate}  />
//         </div>
        
//       </div>
// <main>
//   <CyberSecurityServices/>
//   <SecondaryServices/>
//   <Testimonials/>
// </main>

//  {/* Full-page search modal
//   */}
//         <FullPageSearch  isOpen={modalStack.includes("full-search-modal")} onSelect={handleSelect}  />
    

//     </div>
//   );
// }

