// src/components/ui/input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Additional props can be added here if needed
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="rounded-md py-2 px-3 text-gray-700"
      {...props}
    />
  );
};


