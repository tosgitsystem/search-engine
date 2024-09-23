import React, {  useEffect, useState } from "react";
import Image from "next/image";
import { MoreVertical, Settings } from "lucide-react";
import SearchBar from "./searchbar"; // Import the new SearchBar component
import { useRecoilValue } from "recoil";
import { IsMobile } from "@/src/providers/UserAgentProvider";

export const Header: React.FC = () => {
  const [showFixedSearchBar, setShowFixedSearchBar] = useState(false);

  const  isMobile = useRecoilValue(IsMobile);

  const customers = [
    'Adam', 'Bella', 'Charlie', 'David', 'Fiona', 'George', 'Kelly',
    'Samantha', 'Harry', 'Olivia', 'Isabella', 'Mason', 'Sophia', 'James', 
    'Ava', 'Liam', 'Ethan', 'Noah', 'Emma', 'Michael', 'Lucas', 'Amelia',
    'Alexander', 'Mia', 'Benjamin', 'Charlotte', 'Jack', 'Lily', 'Daniel',
    'Ella', 'Henry', 'Grace', 'Matthew', 'Zoe', 'Owen', 'Scarlett', 
    'Ryan', 'Hazel', 'Gabriel', 'Aria', 'William', 'Chloe', 'Sebastian'
  ];

  const handleSelect = (value: string) => {
    console.log('Selected:', value);
  };

  // Detect scroll to show or hide fixed search bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Change this threshold to where you want the fixed bar to appear
        setShowFixedSearchBar(true);
      } else {
        setShowFixedSearchBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={` relative h-auto`}>
      <div className="container mx-auto sm:ml-16 flex flex-col md:flex-row items-center justify-between h-full ">
         
        {/* Logo and Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center space-x-2 gap-y-3 md:space-x-4 w-full md:w-auto">
          <div className=" mt-8 md:mt-4 mb-3 w-full flex flex-row-reverse justify-between items-center">
            <div className="md:hidden">
              <Settings className="h-5 w-5 " />
            </div>
    
            <Image
              src="/eek-monk-logo_black.png"
              alt="eek-monk"
              width={isMobile ? 120 : 150}
              height={isMobile ? 120 : 150}
              className="mx-auto md:mx-0"
            />
          
          </div>

          {/* Regular SearchBar */}
          <div className="flex-grow md:mb-0 mb-4 md:mt-0 -mt-4">
            <SearchBar 
              suggestions={customers}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 px-3">
          <Settings className="h-5 w-5 text-white" />
          <MoreVertical className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Fixed Search Bar */}
      {isMobile && showFixedSearchBar && (
        <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b   p-4 pb-2">
          <div className="container mx-auto">
            <SearchBar 
              suggestions={customers}
              onSelect={handleSelect}
            />
          </div>
        </div>
      )}
    </header>
  );
};
