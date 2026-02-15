'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ThreatContextType {
  isThreatMode: boolean;
  setThreatMode: (value: boolean) => void;
}

const ThreatContext = createContext<ThreatContextType | undefined>(undefined);

export function ThreatProvider({ children }: { children: ReactNode }) {
  const [isThreatMode, setIsThreatMode] = useState(false);

  const setThreatMode = (value: boolean) => {
    setIsThreatMode(value);
    
    // Screen shake effect only when activating threat mode
    if (value && typeof window !== 'undefined') {
      document.body.style.animation = 'shake 0.5s';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 500);
    }
  };

  return (
    <ThreatContext.Provider value={{ isThreatMode, setThreatMode }}>
      {children}
    </ThreatContext.Provider>
  );
}

export function useThreatMode() {
  const context = useContext(ThreatContext);
  if (context === undefined) {
    throw new Error('useThreatMode must be used within a ThreatProvider');
  }
  return context;
}
