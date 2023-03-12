import { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useAnimationAPI } from "../Provider/AnimationProvider";

export const useIsScrollUp = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setScrollState } = useAnimationAPI();
  const { scrollY } = useScroll({ container: scrollRef });
  useMotionValueEvent(scrollY, "change", (current) => {
    if (scrollRef.current) {
      const previous = scrollY.getPrevious();
      if (current - previous > 0) {
        setScrollState("down");
      } else if (current - previous < 0) {
        setScrollState("up");
      }
    }
  });
  return { scrollRef };
};
