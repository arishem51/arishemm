import {
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { throttleMouseEvent } from "../helpers";
import { Dimensions, PortfolioType } from "../types";

const config: SpringOptions = { damping: 30, stiffness: 100 };

const state: Dimensions = {
  width: 0,
  height: 0,
};

type Props = {
  portfolio: PortfolioType | undefined;
};

export function useHandleViewMove({ portfolio }: Props) {
  const [view, setView] = useState<Dimensions>(state);
  const [content, setContent] = useState<Dimensions>(state);

  const firstRender = useRef(true);
  const viewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker>();

  const element = viewRef.current;

  const motionX = useMotionValue<number>(0);
  const motionY = useMotionValue<number>(-400);

  const springX: MotionValue<number> = useSpring(motionX, config);
  const springY: MotionValue<number> = useSpring(motionY, config);

  const handleMouseMoveOnView = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      workerRef.current?.postMessage({ clientX, clientY, content, view });
    },
    [content, view]
  );

  const handleMessageWorker = useCallback(
    ({ data }: MessageEvent<{ distanceX: number; distanceY: number }>) => {
      const { distanceX, distanceY } = data;
      motionY.set(distanceY);
      motionX.set(distanceX);
    },
    [motionX, motionY]
  );

  useEffect(() => {
    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));

    setView({
      width: viewRef.current?.offsetWidth || 0,
      height: viewRef.current?.offsetHeight || 0,
    });

    setContent({
      width: contentRef.current?.offsetWidth || 0,
      height: contentRef.current?.offsetHeight || 0,
    });
  }, []);

  useEffect(() => {
    if (portfolio) {
      return;
    }

    workerRef.current?.addEventListener("message", handleMessageWorker);

    const throttleEvent = throttleMouseEvent(handleMouseMoveOnView, 150);

    const timeoutdId = setTimeout(
      () => {
        element?.addEventListener("mousemove", throttleEvent);
        firstRender.current = false;
      },
      firstRender.current ? 2000 : 750
    );

    return () => {
      element?.removeEventListener("mousemove", throttleEvent);
      window.clearTimeout(timeoutdId);
      workerRef.current?.removeEventListener("message", handleMessageWorker);
    };
  }, [
    content,
    element,
    handleMessageWorker,
    handleMouseMoveOnView,
    motionX,
    motionY,
    portfolio,
    view,
  ]);

  return {
    viewRef,
    contentRef,
    viewX: springX,
    viewY: springY,
    motionX,
    motionY,
    content,
  };
}
