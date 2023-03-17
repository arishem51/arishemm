import { AnimationItem as LottieInstance } from "lottie-web";
import { useCallback, useEffect, useState } from "react";
import { usePortfolioProvider } from "../Provider/AnimationProvider";
import { PortfolioType } from "../types";

export type useLottieProps = {
  defaultFrame: number;
  portfolioItemName: PortfolioType;
};

export const useLottie = ({
  defaultFrame,
  portfolioItemName,
}: useLottieProps) => {
  const [lottie, setLottile] = useState<LottieInstance | undefined>(undefined);

  const { portfolio } = usePortfolioProvider();

  useEffect(() => {
    if (lottie && !portfolio) {
      const frame =
        lottie.currentFrame !== 0 ? lottie.currentFrame : defaultFrame;
      lottie.goToAndStop(frame, true, lottie.name);
    }
  }, [defaultFrame, lottie, portfolio]);

  useEffect(() => {
    if (portfolio !== portfolioItemName || !lottie) {
      return;
    }
    const timeoutId = setTimeout(() => {
      lottie.play();
      lottie?.addEventListener("complete", () => {
        lottie?.goToAndPlay(0, true);
      });
    }, 750);
    return () => {
      lottie?.goToAndStop(lottie.currentFrame, true);
      clearTimeout(timeoutId);
    };
  }, [lottie, portfolio, portfolioItemName]);

  const setLottileInstance = useCallback((lottie: LottieInstance) => {
    setLottile(lottie);
  }, []);

  return {
    setLottileInstance,
  };
};
