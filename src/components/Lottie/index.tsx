import React from "react";
import { Player, IPlayerProps } from "@lottiefiles/react-lottie-player";

type Props = IPlayerProps;

export default function Lottie(props: Props) {
  return (
    <Player
      className="player"
      loop
      autoplay
      style={{ position: "relative", zIndex: 2, height: "100%" }}
      {...props}
    />
  );
}
