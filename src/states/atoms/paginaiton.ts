import { atom } from "recoil";


export const pagination = atom<number>({
    key: 'pageNumber',
    default: 1,
  });
  