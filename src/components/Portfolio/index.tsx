import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import About from "../About";
import Work from "../Work";
import Experience from "../Experience";
import Resume from "../Resume";
import Contact from "../Contact";

const ViewContent = styled(motion.div)`
  width: 140vmax;
  height: 110vmax;

  position: absolute;

  z-index: 2;
`;

const Portfolio = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <ViewContent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      ref={ref}
      {...props}
    >
      <About />
      <Work />
      <Experience />
      <Resume />
      <Contact />
    </ViewContent>
  );
});

export default motion(Portfolio, { forwardMotionProps: true });
