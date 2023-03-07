import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Portfolios } from "../../constant";
import PortfolioItem from "../PortfolioItem";
import About from "../About";
import Work from "../Work";

const ViewContent = styled(motion.div)`
  width: 140vmax;
  height: 110vmax;

  position: absolute;

  z-index: 2;
`;

const Portfolio = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <ViewContent ref={ref} {...props}>
      <About />
      <Work />
    </ViewContent>
  );
});

export default motion(Portfolio, { forwardMotionProps: true });
