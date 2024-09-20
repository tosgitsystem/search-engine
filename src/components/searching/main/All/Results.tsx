import React from 'react';
import { Button } from '@/src/components/ui';

interface SearchResult {
  title: string;
  url: string;
  description: string;
  tags?: string[];
}

interface MainProps {
  searchResults: SearchResult[];
}

export const Results: React.FC<MainProps> = ({ searchResults }) => {
  return (
    <div>
      <div className="space-y-6">
        {searchResults.map((result, index) => (
          <div key={index} className="max-w-full md:max-w-2xl bg-white p-4  rounded-2xl shadow-sm">
            <div className="text-sm text-gray-600">{result.url}</div>
            <h2 className="text-lg text-[#4A0A84] font-[1400]">{result.title}</h2>
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
    </div>
  );
};
