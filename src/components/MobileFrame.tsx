import React, { createContext, useContext } from 'react';

interface ViewportContextType {
  viewMode: 'responsive';
  isPhoneSimulated: boolean;
}

const ViewportContext = createContext<ViewportContextType>({
  viewMode: 'responsive',
  isPhoneSimulated: false,
});

export const useViewport = () => useContext(ViewportContext);

interface MobileFrameProps {
  children: React.ReactNode;
}

/**
 * Clean Full-Width Architectural Viewport Provider
 * Provides unified, seamless full-screen responsiveness for laptop, tablet, and mobile.
 */
export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <ViewportContext.Provider value={{ viewMode: 'responsive', isPhoneSimulated: false }}>
      <div className="min-h-screen w-full bg-[#FAF8F5] text-[#20251F] flex flex-col relative overflow-x-hidden selection:bg-[#B99560]/30 selection:text-[#17352B]">
        {children}
      </div>
    </ViewportContext.Provider>
  );
};
