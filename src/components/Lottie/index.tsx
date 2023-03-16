import { Player, IPlayerProps } from "@lottiefiles/react-lottie-player";
import { CSSProperties } from "styled-components";
import { useLottie } from "../../hooks/useLottie";
import { PortfolioType } from "../../types";

type Props = IPlayerProps & {
  defaultFrame: number;
  portfolioItemName: PortfolioType;
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

export default function Lottie({
  defaultFrame,
  portfolioItemName,
  ...props
}: Props) {
  const { setLottileInstance } = useLottie({ defaultFrame, portfolioItemName });

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
