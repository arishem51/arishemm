import React, { useEffect, useRef } from "react";
import { motion, MotionProps, MotionValue, useSpring } from "framer-motion";
import styled from "styled-components";
import { Portfolios } from "../../constant";
import PortfolioItem from "./PortfolioItem";

const ViewContent = styled(motion.div)`
  width: 140vmax;
  height: 100vmax;
  background: var(--color-black);

  position: absolute;
`;

const Portfolio = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <ViewContent ref={ref} {...props}>
      {Portfolios.map((item) => (
        <PortfolioItem key={item.id} style={item.style} />
      ))}
    </ViewContent>
  );
});

export default motion(Portfolio, { forwardMotionProps: true });
