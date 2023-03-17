import {
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useEffect } from "react";
import { useRef } from "react";
import { PortfolioType } from "../types";

const OPPOSITE = -1;

const config: SpringOptions = { damping: 30, stiffness: 100 };

type Dimensions = { width: number; height: number };

const state: Dimensions = {
  width: 0,
  height: 0,
};

type Props = {
  portfolio: PortfolioType | undefined;
};

export function useHandleViewMove({ portfolio }: Props) {
  const [view, setView] = React.useState<Dimensions>(state);
  const [content, setContent] = React.useState<Dimensions>(state);
  const firstRender = useRef(true);

  const viewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!viewRef?.current || !contentRef.current) {
      return;
    }
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
    if (
      view.height === 0 ||
      view.width === 0 ||
      content.width === 0 ||
      content.height === 0 ||
      portfolio
    ) {
      return;
    }

    const handleMouseMoveOnView = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const percentageX = clientX / view.width;
      const percentageY = clientY / view.height;

      const maxX = content.width - view.width;
      const maxY = content.height - view.height;

      const distanceX = percentageX * maxX * OPPOSITE;
      const distanceY = percentageY * maxY * OPPOSITE;

      motionX.set(distanceX);
      motionY.set(distanceY);
    };

    const element = viewRef?.current;
    const timeoutdId = setTimeout(
      () => {
        element?.addEventListener("mousemove", handleMouseMoveOnView);
        firstRender.current = false;
      },
      firstRender.current ? 2000 : 750
    );
    return () => {
      element?.removeEventListener("mousemove", handleMouseMoveOnView);
      window.clearTimeout(timeoutdId);
    };
  }, [content, motionX, motionY, portfolio, view]);

  return {
    viewRef,
    contentRef,
    viewX: springX,
    viewY: springY,
    motionX,
    motionY,
  };
}
