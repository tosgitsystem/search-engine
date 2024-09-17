// src/components/Nav.tsx
import Link from 'next/link';
import React from 'react';

export const Nav: React.FC = () => {
  return (
    <nav className="">
      <div className="container relative mx-auto px-0  md:px-6 md:pl-0 py-2 flex overflow-x-auto scroll-smooth whitespace-nowrap z-10">
        {['All', 'Images', 'Shopping', 'Videos', 'News', 'Maps', 'Books'].map((item) => (
          <div
            key={item}
            className="text-white cursor-pointer hover:text-blue-400 transition-colors px-4"
          >
            <Link href="#" className='text-white transition-colors hover:text-blue-400 cursor-pointer '>{item}</Link>
{/*   
            {item} */}
          </div>
        ))}
        <div className="text-white cursor-pointer hover:text-blue-400 transition-colors px-4">
          More
        </div>
      </div>
    </nav>
  );
};
