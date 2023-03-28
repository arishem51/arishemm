import { AnimationItem as LottieInstance } from "lottie-web";
import { useEffect, useRef, useState } from "react";
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
  const [lottie, setLottie] = useState<LottieInstance | undefined>(undefined);
  const firstRender = useRef(true);

  const portfolio = usePortfolioProvider();
  const animationType = useAnimationTypeProvider();

  useEffect(() => {
    // Set default frame to Lottie
    if (lottie && !portfolio && firstRender.current) {
      lottie.goToAndStop(defaultFrame, true, lottie.name);
      firstRender.current = false;
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

  return {
    setLottie,
  };
};
