import { SpringOptions, useMotionValue, useSpring } from "framer-motion";
import React from "react";
import { useRef } from "react";

export function useViewMove() {
  const viewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const config: SpringOptions = { damping: 30, stiffness: 100 };

  const springX = useSpring(motionX, config);
  const springY = useSpring(motionY, config);

  React.useEffect(() => {
    motionY.set(-400);
  }, []);

  function handleMouseMoveOnView(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const { clientX, clientY } = e;

    const viewWidth = viewRef?.current?.offsetWidth;
    const viewHeight = viewRef?.current?.offsetHeight;
    const contentWidth = contentRef?.current?.offsetWidth;
    const contentHeight = contentRef?.current?.offsetHeight;

    if (!viewWidth || !viewHeight || !contentWidth || !contentHeight) {
      return;
    }

    const percentageX = clientX / viewWidth;
    const percentageY = clientY / viewHeight;

    const maxX = contentWidth - viewWidth;
    const maxY = contentHeight - viewHeight;

    const distanceX = percentageX * maxX * -1;
    const distanceY = percentageY * maxY * -1;

    motionX.set(distanceX);
    motionY.set(distanceY);
  }

  return {
    handleMouseMoveOnView,
    viewRef,
    contentRef,
    x: springX,
    y: springY,
  };
}
