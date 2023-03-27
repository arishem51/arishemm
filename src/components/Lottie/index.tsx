import { Player, IPlayerProps } from "@lottiefiles/react-lottie-player";
import { CSSProperties } from "styled-components";
import { useLottie, useLottieProps } from "../../hooks/useLottie";

type Props = IPlayerProps & useLottieProps;

const styles: CSSProperties = {
  position: "relative",
  zIndex: 2,
  height: "60%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const TIME = 650 / 1000; // seconds

export default function Lottie({
  defaultFrame,
  portfolioItemName,
  ...props
}: Props) {
  const { setLottie } = useLottie({ defaultFrame, portfolioItemName });

  return (
    <Player
      lottieRef={setLottie}
      className="player"
      speed={TIME}
      style={styles}
      {...props}
    />
  );
}
