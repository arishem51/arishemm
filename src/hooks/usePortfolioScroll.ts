import { RefObject } from "react";
import { useScroll } from "framer-motion";
import { usePortfolioScrollAPIProivder } from "../Provider/PortfolioScrollProvider";
import { usePortfolioProvider } from "../Provider/AnimationProvider";
import { PortfolioType } from "../types";

type Props = {
  scrollRef: RefObject<HTMLElement>;
  name: PortfolioType;
};

export const usePortfolioScroll = ({ scrollRef, name }: Props) => {
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const { setScrollMotion } = usePortfolioScrollAPIProivder();
  const { portfolio } = usePortfolioProvider();

  if (scrollYProgress && portfolio === name) {
    setScrollMotion(scrollYProgress);
  }
};
