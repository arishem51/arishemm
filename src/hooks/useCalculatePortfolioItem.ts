import { Coordinates, PortfolioType } from "../types";
import { useMemo } from "react";
import {
  useAnimationDataProvider,
  useAnimationRefProvider,
  usePortfolioProvider,
} from "../Provider/AnimationProvider";

type Props = {
  name: PortfolioType;
  left: string;
  top: string;
  width: string;
  height: string;
};

export const useCalculatePortfolioItem = ({
  name,
  left,
  top,
  width,
  height,
}: Props) => {
  const { portfolio } = usePortfolioProvider();
  const { motionX, motionY } = useAnimationDataProvider();
  const { contentRef } = useAnimationRefProvider();

  const translate = useMemo<Coordinates>(() => {
    const offsetX = motionX.get() * -1;
    const offsetY = motionY.get() * -1;
    if (portfolio === name && (offsetX > 0 || offsetY > 0)) {
      // Get the offset  of the item related to the contentRef

      const x =
        (+left.slice(0, -1) * (contentRef?.current?.clientWidth || 0)) / 100 -
        offsetX;
      const y =
        (+top.slice(0, -1) * (contentRef?.current?.clientHeight || 0)) / 100 -
        offsetY;

      return {
        x,
        y,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  }, [contentRef, left, motionX, motionY, name, portfolio, top]);

  const { percentageWidth, percentageHeight } = useMemo(() => {
    if (portfolio === name) {
      const percentageWidth =
        (window.innerWidth / (contentRef?.current?.clientWidth || 0)) * 100 +
        "%";
      const percentageHeight =
        (window.innerHeight / (contentRef?.current?.clientHeight || 0)) * 100 +
        "%";
      return {
        percentageWidth,
        percentageHeight,
      };
    }
    return {
      percentageWidth: width,
      percentageHeight: height,
    };
  }, [contentRef, height, name, portfolio, width]);

  return { translate, percentageHeight, percentageWidth };
};
