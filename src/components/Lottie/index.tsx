import { Player, IPlayerProps } from "@lottiefiles/react-lottie-player";
import { CSSProperties } from "styled-components";

type Props = IPlayerProps;

const styles: CSSProperties = {
  position: "relative",
  zIndex: 2,
  height: "60%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Lottie(props: Props) {
  return <Player className="player" style={styles} {...props} />;
}
