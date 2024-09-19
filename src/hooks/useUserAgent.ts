'use client'

import { useEffect, useState } from "react";

const useUserAgent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = /Mobile|Android/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  return isMobile;
};

export default useUserAgent;
