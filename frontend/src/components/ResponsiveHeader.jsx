import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeaderMobile from './HeaderMobile';

const ResponsiveHeader = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Use 1024px as breakpoint
      setIsLoaded(true);
    };

    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show loading or mobile version by default until we know screen size
  if (!isLoaded) {
    return <HeaderMobile />;
  }

  return isMobile ? <HeaderMobile /> : <Header />;
};

export default ResponsiveHeader;