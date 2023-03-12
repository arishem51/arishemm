import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useAnimationAPI } from "../Provider/AnimationProvider";

export const useIsScrollUp = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setIsScrollUp } = useAnimationAPI();
  const { scrollY } = useScroll({ container: scrollRef });
  useMotionValueEvent(scrollY, "change", (current) => {
    if (scrollRef.current) {
      const previous = scrollY.getPrevious();
      if (current - previous > 0) {
        setIsScrollUp(false);
      } else if (current - previous < 0) {
        setIsScrollUp(true);
      }
    }
  });
  return { scrollRef };
};
