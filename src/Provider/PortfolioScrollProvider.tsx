import { MotionValue } from "framer-motion";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { SetState } from "../types";

type PorfolioScrolDataContextProps = {
  scrollMotion: MotionValue<number> | undefined;
};

type PortfolioScrollAPIContextProps = {
  setScrollMotion: SetState<MotionValue<number> | undefined>;
};

const PorfolioScrollDataContext = createContext<PorfolioScrolDataContextProps>(
  {} as PorfolioScrolDataContextProps
);

const PorfolioScrollAPIContext = createContext<PortfolioScrollAPIContextProps>(
  {} as PortfolioScrollAPIContextProps
);

export const usePorfolioScrollDataProvider = () =>
  useContext(PorfolioScrollDataContext);

export const usePortfolioScrollAPIProivder = () =>
  useContext(PorfolioScrollAPIContext);

type Props = {
  children: ReactNode;
};

const PorfolioScrollProvider = ({ children }: Props) => {
  const [scrollMotion, setScrollMotion] = useState<MotionValue<number>>();

  const dataValue = useMemo(() => ({ scrollMotion }), [scrollMotion]);
  const apiValue = useMemo(() => ({ setScrollMotion }), [setScrollMotion]);

  return (
    <PorfolioScrollDataContext.Provider value={dataValue}>
      <PorfolioScrollAPIContext.Provider value={apiValue}>
        {children}
      </PorfolioScrollAPIContext.Provider>
    </PorfolioScrollDataContext.Provider>
  );
};

export default PorfolioScrollProvider;
