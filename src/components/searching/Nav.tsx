import React from 'react';
import { Home, Image, Newspaper, Video } from 'lucide-react'; // Import icons

interface NavProps {
  setActiveTab: (tab: string) => void;
  activeTab: string; // Add this prop to receive the active tab
}

const tabs = [
  { name: 'All', icon: <Home className="w-4 h-4" /> },
  { name: 'Images', icon: <Image className="w-4 h-4" /> },
  { name: 'News', icon: <Newspaper className="w-4 h-4" /> },
  { name: 'Videos', icon: <Video className="w-4 h-4" /> },
];

export const Nav: React.FC<NavProps> = ({ setActiveTab, activeTab }) => {
  return (
    <nav className=''>
      <div className="container  mx-auto  flex overflow-x-auto gap-x-2 scroll-smooth whitespace-nowrap z-10 text-gray-300 border-b">
        {tabs.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveTab(item.name)} // Update the active tab on click
            className={`cursor-pointer transition-colors mx-4 pb-2 flex items-center space-x-1 ${
              activeTab === item.name
                ? 'text-red-500 border-spacing-y-4 border-b-4 border-red-500 rounded-sm'
                : 'text-gray-800 text-sm '
            }`}
          >
            {item.icon}
            <div className={`text-sm ${
              activeTab === item.name
                ? 'text-red-500 ml-2 '
                : 'text-gray-800 '
            }`}>{item.name}</div>
            
          </div>
        ))}
      </div>
    </nav>
  );
};
