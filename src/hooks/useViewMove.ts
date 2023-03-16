import {
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useCallback, useEffect } from "react";
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
  shouldRenderOnboard: boolean;
  portfolio: PortfolioType | undefined;
};

export function useViewMove({ shouldRenderOnboard, portfolio }: Props) {
  const [view, setView] = React.useState<Dimensions>(state);
  const [content, setContent] = React.useState<Dimensions>(state);

  React.useEffect(() => {
    if (!shouldRenderOnboard) {
      setView({
        width: viewRef.current?.offsetWidth || 0,
        height: viewRef.current?.offsetHeight || 0,
      });

      setContent({
        width: contentRef.current?.offsetWidth || 0,
        height: contentRef.current?.offsetHeight || 0,
      });
    }
  }, [shouldRenderOnboard]);

  const viewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const motionX = useMotionValue<number>(0);
  const motionY = useMotionValue<number>(-400);

  const springX: MotionValue<number> = useSpring(motionX, config);
  const springY: MotionValue<number> = useSpring(motionY, config);

  const handleMouseMoveOnView = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (
        view.height === 0 ||
        view.width === 0 ||
        content.width === 0 ||
        content.height === 0
      ) {
        return;
      }

      const percentageX = clientX / view.width;
      const percentageY = clientY / view.height;

      const maxX = content.width - view.width;
      const maxY = content.height - view.height;

      const distanceX = percentageX * maxX * OPPOSITE;
      const distanceY = percentageY * maxY * OPPOSITE;

      motionX.set(distanceX);
      motionY.set(distanceY);
    },
    [content.height, content.width, motionX, motionY, view.height, view.width]
  );

  const removeViewMoveEvent = useCallback(() => {
    viewRef.current?.removeEventListener("mousemove", handleMouseMoveOnView);
  }, [handleMouseMoveOnView]);

  const addViewMoveEvent = useCallback(() => {
    viewRef.current?.addEventListener("mousemove", handleMouseMoveOnView);
  }, [handleMouseMoveOnView]);

  useEffect(() => {
    if (portfolio) {
      removeViewMoveEvent();
      return;
    }
    addViewMoveEvent();
    return () => {
      removeViewMoveEvent();
    };
  }, [addViewMoveEvent, portfolio, removeViewMoveEvent, viewRef]);

  useEffect(() => {
    if (!shouldRenderOnboard) {
      addViewMoveEvent();
    }
  }, [addViewMoveEvent, shouldRenderOnboard]);

  return {
    viewRef,
    contentRef,
    viewX: springX,
    viewY: springY,
    motionX,
    motionY,
  };
}
