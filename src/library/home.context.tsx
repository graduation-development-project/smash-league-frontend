"use client";

import React, { createContext, useContext, useState } from "react";

interface TourCardSliderContextProps {
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
}

const HomeContext = createContext<TourCardSliderContextProps | null>(null);

export const HomeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSlide, setActiveSlide] = useState(1);
  

  return (
    <HomeContext.Provider value={{ activeSlide, setActiveSlide }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error("useHomeContext must be used within a HomeContextProvider");
  }

  return context;
};
