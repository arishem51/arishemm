import {
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setView({
      width: viewRef.current?.offsetWidth || 0,
      height: viewRef.current?.offsetHeight || 0,
    });

    setContent({
      width: contentRef.current?.offsetWidth || 0,
      height: contentRef.current?.offsetHeight || 0,
    });
  }, []);

  const motionX = useMotionValue<number>(0);
  const motionY = useMotionValue<number>(-400);

  const springX: MotionValue<number> = useSpring(motionX, config);
  const springY: MotionValue<number> = useSpring(motionY, config);

  useEffect(() => {
    if (portfolio) {
      return;
    }

    const worker = new Worker(new URL("./worker.ts", import.meta.url));

    const handleMouseMoveOnView = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      worker.postMessage({ clientX, clientY, content, view });
    };

    const handleMessageWorker = ({
      data,
    }: MessageEvent<{ distanceX: number; distanceY: number }>) => {
      const { distanceX, distanceY } = data;
      motionY.set(distanceY);
      motionX.set(distanceX);
    };

    worker.addEventListener("message", handleMessageWorker);

    const throttleEvent = throttleMouseEvent(handleMouseMoveOnView, 135);

    const element = viewRef?.current;
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
      worker.removeEventListener("message", handleMessageWorker);
    };
  }, [content, motionX, motionY, portfolio, view]);

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
