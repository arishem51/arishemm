import React, { useEffect, useRef } from "react";
import { motion, MotionProps, MotionValue, useSpring } from "framer-motion";
import styled from "styled-components";
import { Portfolios } from "../../constant";
import PortfolioItem from "./PortfolioItem";

const ViewContent = styled(motion.div)`
  width: 140vmax;
  height: 110vmax;

  position: absolute;

  z-index: 2;
`;

const Portfolio = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <ViewContent ref={ref} {...props}>
      {Portfolios.map((item) => (
        <PortfolioItem name={item.name} key={item.id} style={item.style} />
      ))}
    </ViewContent>
  );
});

export default motion(Portfolio, { forwardMotionProps: true });
