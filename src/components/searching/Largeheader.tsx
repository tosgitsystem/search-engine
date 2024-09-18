import React from 'react';
import { Settings, MoreVertical } from "lucide-react";
import { Header } from "./Header";
import { Nav } from "./Nav";

interface LargeHeaderProps {
  setActiveTab: (tab: string) => void;
  activeTab: string; // Add this prop to receive the active tab
}

export const LargeHeader: React.FC<LargeHeaderProps> = ({ setActiveTab, activeTab }) => {
  return (
    <div className="relative mt-5 sm:mt-0">
      {/* Settings and More Vertical Icons for Small Screens */}
      <div className="absolute top-2 right-2 my-2 flex space-x-4 md:hidden">
        <Settings className="h-5 w-5 text-white" />
      </div>
      <div className="absolute top-2 left-2 my-2 flex space-x-4 md:hidden">
        <MoreVertical className="h-5 w-5 text-white" />
      </div>
      <div className="h-auto bg-main-gradient md:block flex flex-col md:items-center md:mt-0 -mt-6">
        <div>
          <Header />
        </div>
        <div className="md:px-56 lg:px-56 py-4 -mt-5 md:-mt-10 ">
          <Nav setActiveTab={setActiveTab} activeTab={activeTab} /> {/* Pass activeTab here */}
        </div>
      </div>
    </div>
  );
};
