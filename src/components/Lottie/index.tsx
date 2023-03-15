import { Player, IPlayerProps } from "@lottiefiles/react-lottie-player";
import { AnimationItem } from "lottie-web";
import { useCallback, useEffect, useRef, useState } from "react";
import { CSSProperties } from "styled-components";
import { usePortfolioProvider } from "../../Provider/AnimationProvider";

type Props = IPlayerProps & {
  defaultFrame: number;
};

const styles: CSSProperties = {
  position: "relative",
  zIndex: 2,
  height: "60%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const TIME = 750 / 1000; // seconds

export default function Lottie({ defaultFrame, ...props }: Props) {
  const [lottie, setLottile] = useState<AnimationItem | undefined>(undefined);

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
    lottie.play();
    const removeListerner = lottie?.addEventListener("complete", () => {
      lottie?.goToAndPlay(0, true);
    });
    return () => {
      lottie?.goToAndStop(lottie.currentFrame, true);
      removeListerner();
    };
  }, [lottie, portfolio]);

  const setLottileInstance = useCallback((lottie: AnimationItem) => {
    setLottile(lottie);
  }, []);

  return (
    <Player
      lottieRef={setLottileInstance}
      className="player"
      speed={TIME}
      style={styles}
      {...props}
    />
  );
}
