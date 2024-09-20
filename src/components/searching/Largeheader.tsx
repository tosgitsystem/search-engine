import React from 'react';

import { Header } from "./Header";
import { Nav } from "./Nav";
import { useRecoilValue } from 'recoil';
import { IsMobile } from '@/src/providers/UserAgentProvider';

interface LargeHeaderProps {
  setActiveTab: (tab: string) => void;
  activeTab: string; // Add this prop to receive the active tab
}

export const LargeHeader: React.FC<LargeHeaderProps> = ({ setActiveTab, activeTab }) => {
const isMobile = useRecoilValue(IsMobile);

  return (
    <div className={`sm:mt-0 bg-white border-b ${isMobile  ? "relative" : "sticky top-0" }`}>
      {/* Settings and More Vertical Icons for Small Screens */}
  
      <div className="h-auto  md:block flex flex-col md:items-center md:mt-0 -mt-6">
        <div>
          <Header />
        </div>
        <div className="md:px-56  lg:px-56 pt-4 -mt-2 md:-mt-2 relative z-20 ">
          <Nav setActiveTab={setActiveTab} activeTab={activeTab} /> {/* Pass activeTab here */}
        </div>
      </div>
    </div>
  );
};
