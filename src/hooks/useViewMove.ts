import { useEffect } from "react";
import {
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

export function useViewMove() {
  const viewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const motionX = useMotionValue<number>(0);
  const motionY = useMotionValue<number>(-400);

  const reverseMotionX = useMotionValue<number>(0);
  const reverseMotionY = useMotionValue<number>(0);

  const config: SpringOptions = { damping: 30, stiffness: 100 };

  const springX: MotionValue<number> = useSpring(motionX, config);
  const springY: MotionValue<number> = useSpring(motionY, config);

  function handleMouseMoveOnView(e: MouseEvent) {
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

    reverseMotionX.set(distanceX / -1);
    reverseMotionY.set(distanceY / -1);
  }

  const removeViewMoveEvent = () =>
    viewRef.current?.removeEventListener("mousemove", handleMouseMoveOnView);

  const addViewMoveEvent = () =>
    viewRef.current?.addEventListener("mousemove", handleMouseMoveOnView);

  useEffect(() => {
    addViewMoveEvent();
    return () => {
      removeViewMoveEvent();
    };
  }, []);

  return {
    handleMouseMoveOnView,
    viewRef,
    contentRef,
    viewX: springX,
    viewY: springY,
    reverseViewX: reverseMotionX,
    reverseViewY: reverseMotionY,
    removeViewMoveEvent,
    addViewMoveEvent,
  };
}
