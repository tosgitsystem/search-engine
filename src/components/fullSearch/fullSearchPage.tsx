// FullPageSearch.tsx
import React from 'react';
import SearchBar from '../main/autoSuggest';

interface FullPageSearchProps {
  onClose: () => void;
  suggestions: string[];
  onSelect: (value: string) => void;
}

const FullPageSearch: React.FC<FullPageSearchProps> = ({ onClose, suggestions, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col p-8">
      <button onClick={onClose} className="self-end text-gray-600">
        Close
      </button>
      <h1 className="text-2xl font-semibold mb-4">Search</h1>
      <div className="flex flex-col items-center">
        <SearchBar suggestions={suggestions} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default FullPageSearch;
