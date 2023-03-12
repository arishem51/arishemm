import { Player, IPlayerProps } from "@lottiefiles/react-lottie-player";
import { CSSProperties } from "styled-components";

type Props = IPlayerProps;

const styles: CSSProperties = {
  position: "relative",
  zIndex: 2,
  height: "100%",
};

export default function Lottie(props: Props) {
  return <Player className="player" loop autoplay style={styles} {...props} />;
}
