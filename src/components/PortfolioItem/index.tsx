import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  position: absolute;

  height: var(--height);
  width: var(--width);
  left: var(--left);
  top: var(--top);

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1.5em;

  background-color: var(--bgColor);

  cursor: pointer;

  ::after {
    content: "";

    position: absolute;

    width: calc(100% - 1em);
    height: calc(100% - 1em);

    z-index: 1;

    background-color: white;
    border-radius: 1em;

    transition: scale 0.5s ease;
    scale: 0;
  }

  :hover {
    ::after {
      scale: 1;
    }
  }
`;

type Props = {
  children?: React.ReactNode;
  width: string;
  height: string;
  top: string;
  left: string;
  bgColor: string;
};

export default function PortfolioItem({
  children,
  width,
  height,
  top,
  left,
  bgColor,
}: Props) {
  const styles = {
    "--width": width,
    "--height": height,
    "--top": top,
    "--left": left,
    "--bgColor": bgColor,
  } as React.CSSProperties;

  return <Wrapper style={styles}>{children}</Wrapper>;
}
