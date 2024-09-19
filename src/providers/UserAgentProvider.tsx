'use client'

import { atom, useSetRecoilState } from "recoil";
import useUserAgent from "../hooks/useUserAgent";
import { useEffect } from "react";
// Import the custom hook

// Define the Recoil atom
export const IsMobile = atom<boolean>({
  key: 'isMobile',
  default: false,
});

// Component to initialize isMobile Recoil state
import { ReactNode } from "react";

export const UserAgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isMobile = useUserAgent();
  const setIsMobile = useSetRecoilState(IsMobile);

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  return <>{children}</>;
};
