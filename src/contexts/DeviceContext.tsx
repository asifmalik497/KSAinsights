import React, { createContext, useContext, useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'desktop';

interface DeviceContextType {
  deviceType: DeviceType;
  isMobile: boolean;
  isDesktop: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      // 1. Check User Agent for mobile keywords
      const ua = navigator.userAgent;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      
      // 2. Check for touch capability (coarse pointer)
      // This detects if the primary input is a finger/touch
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      // 3. Logic: If it's a mobile UA OR (it has touch AND is not a large screen usually associated with desktops)
      // But the user wants Laptop to ALWAYS show PC even if small.
      // So we strictly rely on UA + Touch capability for "True Mobile".
      
      if (isMobileUA || (isCoarsePointer && !ua.includes('Windows NT') && !ua.includes('Macintosh'))) {
        setDeviceType('mobile');
        document.documentElement.classList.add('is-mobile');
        document.documentElement.classList.remove('is-desktop');
      } else {
        setDeviceType('desktop');
        document.documentElement.classList.add('is-desktop');
        document.documentElement.classList.remove('is-mobile');
      }
    };

    checkDevice();
    
    // We don't listen to resize because the user wants it to be hardware-locked
  }, []);

  const value = {
    deviceType,
    isMobile: deviceType === 'mobile',
    isDesktop: deviceType === 'desktop',
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
