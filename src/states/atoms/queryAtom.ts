'use client'
import { atom } from "recoil";

export const getLastQuery = (): string => {
  // Check if the code is running in a browser environment
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const keys = Array.from(params.keys());
    return keys.length > 0 ? params.get(keys[keys.length - 1]) || '' : '';
  }
  return ''; // Return an empty string if not in a browser environment
};



export const searchQuery = atom<string>({
    key: 'searchQuery',
    default: getLastQuery(),
  });
  

  export const showSuggestion = atom<boolean>({
    key: 'showSuggestion',
    default: false,
  });


  export const refetchQuery = atom<boolean>({
    key: 'refetchData',
    default: false,
  });
  
  