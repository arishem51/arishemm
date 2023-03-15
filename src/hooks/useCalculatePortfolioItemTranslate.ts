import { Coordinates, PortfolioType } from "../types";
import { useEffect, useState } from "react";
import {
  useAnimationDataProvider,
  useAnimationRefProvider,
  usePortfolioProvider,
} from "../Provider/AnimationProvider";

const InitialCoordinates: Coordinates = {
  x: 0,
  y: 0,
};

type Props = {
  name: PortfolioType;
  left: string;
  top: string;
};

export const useCalculatePortfolioItemTranslate = ({
  name,
  left,
  top,
}: Props) => {
  const [offset, setOffset] = useState<Coordinates>(InitialCoordinates);
  const [translate, setTranslate] = useState<Coordinates>(InitialCoordinates);
  const { portfolio } = usePortfolioProvider();
  const { motionX, motionY } = useAnimationDataProvider();
  const { contentRef } = useAnimationRefProvider();

  useEffect(() => {
    // Sync motionX/Y instead of SpringX/Y
    if (portfolio === name) {
      setOffset({
        x: motionX.get() * -1,
        y: motionY.get() * -1,
      });
    } else {
      setOffset({
        x: 0,
        y: 0,
      });
    }
  }, [portfolio, motionX, motionY, name]);

  useEffect(() => {
    // Calculate the translationX/Y of portfolioItem
    if (portfolio === name && (offset.x > 0 || offset.y > 0)) {
      const x =
        (+left.slice(0, -1) * (contentRef?.current?.clientWidth || 0)) / 100 -
        offset.x;
      const y =
        (+top.slice(0, -1) * (contentRef?.current?.clientHeight || 0)) / 100 -
        offset.y;
      setTranslate({ x, y });
    }
  }, [contentRef, left, name, offset, portfolio, top]);

  return { translate };
};
