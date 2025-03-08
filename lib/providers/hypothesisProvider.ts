import React, { createContext, useContext, useState, ReactNode } from "react";

export type MarketingHypothesis = {
  id: string;
  hypothesis: string;
  hypothesisAlias: string;
  rationale: string;
  channels: string[];
  targetAudience: {
    description: string;
    alias: string;
  };
  estimatedImpact: {
    confidence: number;
    effort: string;
  };
  selected: boolean;
};

type HypothesisContextType = {
  selectedHypotheses: MarketingHypothesis[];
  setSelectedHypotheses: (hypotheses: MarketingHypothesis[]) => void;
};

// Create context
const HypothesisContext = createContext<HypothesisContextType | undefined>(undefined);

// Create provider
export const HypothesisProvider = ({ children }: { children: ReactNode }) => {
  const [selectedHypotheses, setSelectedHypotheses] = useState<MarketingHypothesis[]>([]);

  return (
    <HypothesisContext.Provider value={{ selectedHypotheses, setSelectedHypotheses }}>
      {children}
    </HypothesisContext.Provider>
  );
};

// Custom hook for easy access
export const useHypothesisContext = () => {
  const context = useContext(HypothesisContext);
  if (!context) {
    throw new Error("useHypothesisContext must be used within a HypothesisProvider");
  }
  return context;
};
