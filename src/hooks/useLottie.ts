import { AnimationItem as LottieInstance } from "lottie-web";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAnimationTypeProvider,
  usePortfolioProvider,
} from "../Provider/AnimationProvider";
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
  const firstRender = useRef(true);

  const { portfolio } = usePortfolioProvider();
  const { animationType } = useAnimationTypeProvider();

  useEffect(() => {
    // Set default frame to Lottie
    if (lottie && !portfolio && firstRender.current) {
      const frame =
        lottie.currentFrame !== 0 ? lottie.currentFrame : defaultFrame;
      lottie.goToAndStop(frame, true, lottie.name);
      firstRender.current = true;
    }
  }, [defaultFrame, lottie, portfolio]);

  useEffect(() => {
    // If portfolio was select so enable Lottile animation --> Different animation time will have diffenrent time out animation
    if (portfolio !== portfolioItemName || !lottie) {
      return;
    }

    const timeoutId = setTimeout(
      () => {
        lottie.play();
      },
      animationType === "expand" ? 750 : 1500
    );
    const removeListener = lottie?.addEventListener("complete", () => {
      lottie?.goToAndPlay(0, true);
    });
    return () => {
      lottie?.goToAndStop(lottie.currentFrame, true);
      lottie?.removeEventListener("complete", removeListener);
      window.clearTimeout(timeoutId);
    };
  }, [animationType, lottie, portfolio, portfolioItemName]);

  const setLottileInstance = useCallback((lottie: LottieInstance) => {
    setLottile(lottie);
  }, []);

  return {
    setLottileInstance,
  };
};
