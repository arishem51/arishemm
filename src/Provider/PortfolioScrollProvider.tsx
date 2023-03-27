import { MotionValue } from "framer-motion";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { SetState } from "../types";

type PortfolioScrolDataContextProps = {
  scrollMotion: MotionValue<number> | undefined;
};

type PortfolioScrollAPIContextProps = {
  setScrollMotion: SetState<MotionValue<number> | undefined>;
};

const PortfolioScrollDataContext =
  createContext<PortfolioScrolDataContextProps>(
    {} as PortfolioScrolDataContextProps
  );

const PortfolioScrollAPIContext = createContext<PortfolioScrollAPIContextProps>(
  {} as PortfolioScrollAPIContextProps
);

export const usePortfolioScrollDataProvider = () =>
  useContext(PortfolioScrollDataContext);

export const usePortfolioScrollAPIProivder = () =>
  useContext(PortfolioScrollAPIContext);

type Props = {
  children: ReactNode;
};

const PorfolioScrollProvider = ({ children }: Props) => {
  const [scrollMotion, setScrollMotion] = useState<MotionValue<number>>();

  const dataValue = useMemo(() => ({ scrollMotion }), [scrollMotion]);
  const apiValue = useMemo(() => ({ setScrollMotion }), [setScrollMotion]);

  return (
    <PortfolioScrollDataContext.Provider value={dataValue}>
      <PortfolioScrollAPIContext.Provider value={apiValue}>
        {children}
      </PortfolioScrollAPIContext.Provider>
    </PortfolioScrollDataContext.Provider>
  );
};

export default PorfolioScrollProvider;
