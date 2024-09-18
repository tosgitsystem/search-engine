import React from 'react';
import { RelatedFAQSection } from './Faq';
import { Results } from './Results';


interface SearchResult {
  title: string;
  url: string;
  description: string;
  tags?: string[];
}

interface AllProps {
  searchResults: SearchResult[];
}

export const All: React.FC<AllProps> = ({ searchResults }) => {
  return (
    <main className="container mx-auto px-3 md:pr-4 ">
      <div className='border border-gray-200 max-w-3xl rounded-md my-4'>
        <Results searchResults={searchResults} />
      </div>
      
      <div className='border border-gray-200 max-w-3xl rounded-lg my-4'>
        <RelatedFAQSection />
      </div>
    </main>
  );
};
