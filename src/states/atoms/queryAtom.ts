import { atom } from "recoil";

export const searchQuery = atom<string>({
    key: 'searchQuery',
    default: '',
  });
  

  export const showSuggestion = atom<boolean>({
    key: 'showSuggestion',
    default: false,
  });
  
  