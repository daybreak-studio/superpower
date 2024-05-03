import { MotionValue } from "framer-motion";
import React, { createContext, useContext } from "react";

type Props = {
  progress: MotionValue<number>;
  children: React.ReactNode;
};

const ProgressContext = createContext(new MotionValue());

export const useProgress = () => useContext(ProgressContext);
const ProgressProvider = ({ progress, children }: Props) => {
  return (
    <ProgressContext.Provider value={progress}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;
