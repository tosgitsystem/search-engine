// src/components/Main.tsx
import React from 'react';
import { Button } from '../ui';

interface SearchResult {
  title: string;
  url: string;
  description: string;
  tags?: string[];
}

interface MainProps {
  searchResults: SearchResult[];
}

export const Main: React.FC<MainProps> = ({ searchResults }) => {
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scroll-smooth mb-4">
        {['Photo', 'Price', 'Brands', 'Rental', 'Open now', 'Game', 'Dealership', 'Used', 'Within 800m'].map((filter) => (
          <Button key={filter} variant="outline" size="sm" className="rounded-full">
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {searchResults.map((result, index) => (
          <div key={index} className="max-w-full md:max-w-2xl bg-white">
            <div className="text-sm text-gray-600">{result.url}</div>
            <h2 className="text-xl text-blue-700 font-medium">{result.title}</h2>
            <p className="text-sm text-gray-700">{result.description}</p>
            {result.tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {result.tags.map((tag) => (
                  <Button key={tag} variant="ghost" size="sm" className="text-blue-600 p-0 h-auto">
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};
