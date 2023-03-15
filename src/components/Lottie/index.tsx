import { Player, IPlayerProps } from "@lottiefiles/react-lottie-player";
import { AnimationItem } from "lottie-web";
import { useEffect, useState } from "react";
import { CSSProperties } from "styled-components";

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

export default function Lottie({ defaultFrame, ...props }: Props) {
  const [lottie, setLottile] = useState<AnimationItem | undefined>(undefined);

  useEffect(() => {
    if (lottie) {
      lottie.goToAndStop(defaultFrame, true, lottie.name);
    }
  }, [defaultFrame, lottie]);

  return (
    <Player
      lottieRef={(lottie) => setLottile(lottie)}
      className="player"
      style={styles}
      {...props}
    />
  );
}
