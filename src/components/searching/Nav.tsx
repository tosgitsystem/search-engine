// src/components/Nav.tsx
import React from 'react';

export const Nav: React.FC = () => {
  return (
    <nav className="bg-gray-600">
      <div className="container mx-auto px-6 py-2 flex overflow-x-auto scroll-smooth whitespace-nowrap">
        {['All', 'Images', 'Shopping', 'Videos', 'News', 'Maps', 'Books'].map((item) => (
          <div
            key={item}
            className="text-white cursor-pointer hover:text-black transition-colors px-4"
          >
            {item}
          </div>
        ))}
        <div className="text-white cursor-pointer hover:text-black transition-colors px-4">
          More
        </div>
      </div>
    </nav>
  );
};
