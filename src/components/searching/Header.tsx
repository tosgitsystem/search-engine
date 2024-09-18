// src/components/Header.tsx
import React from "react";
import Image from "next/image";
import { MoreVertical, Settings } from "lucide-react";
import SearchBar from "./searchbar"; // Import the new SearchBar component

export const Header: React.FC = () => {
  const suggestions = ['Example 1', 'Example 2', 'Example 3']; // Replace with actual suggestions
  const handleSelect = (value: string) => {
    console.log('Selected:', value);
  };

  return (
    <header className="relative  h-auto">
      <div className="container   mx-auto flex flex-col md:flex-row items-center justify-between h-full">
        
        {/* Logo and Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center space-x-2  md:space-x-4 w-full md:w-auto">
          <div className="px-5 pl-4 my-6 w-full flex  flex-row-reverse justify-between items-center">
          <div className=" md:hidden">
        <Settings className="h-5 w-5 text-white" />
      </div>
    
            <Image
              src="/eek-monk-logo.png"
              alt="eek-monk"
              width={180}
              height={180}
              className="mx-auto md:mx-0"
            />
              <div className=" md:hidden">
        <MoreVertical className="h-5 w-5 text-white" />
      </div>
          </div>
          <div className="relative flex-grow md:mb-0 mb-4 md:mt-0 -mt-4" >
            <SearchBar 
              suggestions={suggestions}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 px-3">
          <Settings className="h-5 w-5 text-white" />
          <MoreVertical className="h-5 w-5 text-white" />
        </div>
      </div>
    </header>
  );
};
