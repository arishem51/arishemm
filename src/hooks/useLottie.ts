import { AnimationItem as LottieInstance } from "lottie-web";
import { useCallback, useEffect, useState } from "react";
import { usePortfolioProvider } from "../Provider/AnimationProvider";

type Props = {
  defaultFrame: number;
};

export const useLottie = ({ defaultFrame }: Props) => {
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
    if (!portfolio || !lottie) {
      return;
    }
    let removeListerner: () => void;
    const timeoutId = setTimeout(() => {
      lottie.play();
      removeListerner = lottie?.addEventListener("complete", () => {
        lottie?.goToAndPlay(0, true);
      });
    }, 750);
    return () => {
      lottie?.goToAndStop(lottie.currentFrame, true);
      removeListerner();
      clearTimeout(timeoutId);
    };
  }, [lottie, portfolio]);

  const setLottileInstance = useCallback((lottie: LottieInstance) => {
    setLottile(lottie);
  }, []);

  return {
    setLottileInstance,
  };
};
