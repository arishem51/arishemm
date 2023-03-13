import { RefObject } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useAnimationAPIProvider } from "../Provider/AnimationProvider";

type Props = {
  scrollRef: RefObject<HTMLElement>;
};

export const usePortfolioScroll = ({ scrollRef }: Props) => {
  const { setScrollState } = useAnimationAPIProvider();
  const { scrollY } = useScroll({ container: scrollRef });
  useMotionValueEvent(scrollY, "change", (current) => {
    if (scrollRef.current) {
      const previous = scrollY.getPrevious();
      if (current < 100) {
        setScrollState("initial");
      } else if (current - previous < 0) {
        setScrollState("up");
      } else if (current - previous > 0) {
        setScrollState("down");
      }
    }
  });
};
