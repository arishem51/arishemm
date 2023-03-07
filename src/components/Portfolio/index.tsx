import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import About from "../About";
import Experience from "../Experience";
import Contact from "../Contact";
import Work from "../Work";
import Resume from "../Resume";

const ViewContent = styled(motion.div)`
  width: 140vmax;
  height: 110vmax;

  position: absolute;

  z-index: 2;
`;

type Props = {
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const Portfolio = React.forwardRef<HTMLDivElement, Props>(
  ({ setState, ...props }, ref) => {
    function handleHoverEnd() {
      setState("");
    }

    return (
      <ViewContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        ref={ref}
        {...props}
      >
        <motion.div
          onHoverStart={() => setState("About")}
          onHoverEnd={handleHoverEnd}
        >
          <About />
        </motion.div>
        <motion.div
          onHoverStart={() => setState("Work")}
          onHoverEnd={handleHoverEnd}
        >
          <Work />
        </motion.div>
        <motion.div
          onHoverStart={() => setState("Experience")}
          onHoverEnd={handleHoverEnd}
        >
          <Experience />
        </motion.div>
        <motion.div
          onHoverStart={() => setState("Resume")}
          onHoverEnd={handleHoverEnd}
        >
          <Resume />
        </motion.div>
        <motion.div
          onHoverStart={() => setState("Contact")}
          onHoverEnd={handleHoverEnd}
        >
          <Contact />
        </motion.div>
      </ViewContent>
    );
  }
);

export default motion(Portfolio);
