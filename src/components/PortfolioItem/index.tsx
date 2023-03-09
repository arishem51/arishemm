import { motion, MotionStyle } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useAnimationProvider } from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";

const Wrapper = styled(motion.div)`
  position: absolute;

  background-color: var(--bgColor);
  border-radius: 1.5em;

  cursor: pointer;

  ::after {
    content: "";

    position: absolute;
    top: calc(1em / 2);
    left: calc(1em / 2);

    width: calc(100% - 1em);
    height: calc(100% - 1em);

    z-index: 1;

    background-color: white;
    border-radius: 1em;

    transition: scale 0.5s ease;
    scale: 0;
  }

  &[data-isActive="false"]:hover {
    ::after {
      scale: 1;
    }
  }
`;

const CenterFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

type Props = {
  children?: React.ReactNode;
  width: string;
  height: string;
  top: string;
  left: string;
  bgColor: string;
  name: PortfolioType;
};

function PortfolioItem({
  children,
  width,
  height,
  top,
  left,
  bgColor,
  name,
}: Props) {
  const { portfolio, reverseViewX, reverseViewY } = useAnimationProvider();

  const isActive = portfolio === name;

  const styles: MotionStyle = {
    width: isActive ? window.innerWidth + "px" : width,
    height: isActive ? "auto" : height,
    minHeight: isActive ? window.innerHeight : "auto",

    left: isActive ? reverseViewX.get() + "px" : left,
    top: isActive ? reverseViewY.get() + "px" : top,

    background: bgColor,

    zIndex: isActive ? 9999 : 2,
  };

  return (
    <Wrapper
      onMouseMove={(e) => {
        if (isActive) {
          e.stopPropagation();
        }
      }}
      layout
      data-isActive={isActive}
      style={styles}
    >
      <CenterFlex>{children}</CenterFlex>
    </Wrapper>
  );
}

export default PortfolioItem;
