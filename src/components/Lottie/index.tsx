import { Player, IPlayerProps } from "@lottiefiles/react-lottie-player";
import { CSSProperties } from "styled-components";
import { useLottie } from "../../hooks/useLottie";

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

const TIME = 650 / 1000; // seconds

export default function Lottie({ defaultFrame, ...props }: Props) {
  const { setLottileInstance } = useLottie({ defaultFrame });

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
