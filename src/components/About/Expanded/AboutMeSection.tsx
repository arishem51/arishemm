import Paragraph from "../../Paragraph";
import ShowcaseSection from "../../ShowcaseSection";
import AboutMe from "../../../assets/me02.jpg";
import Link from "../../Link";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";

const SIZE = 400;

const ImageWrapper = styled.div`
  position: relative;

  width: ${SIZE}px;
  height: 525px;
  flex: 1 0 ${SIZE}px;

  border-radius: 2em;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;

  border-radius: inherit;

  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  inset: 0;

  border-radius: inherit;
  cursor: pointer;
`;

const variants: Variants = {
  init: {
    outline: `${SIZE / 2}px solid rgba(0,0,0,0.7)`,
    outlineOffset: `-${SIZE / 2}px`,
  },
  hover: {
    outline: "8px solid rgb(52, 229, 235)",
    outlineOffset: "16px",
  },
};

const AboutMeSection = () => {
  return (
    <ShowcaseSection title="About Me">
      <div>
        <Paragraph>
          Hello! I&apos;m Arishemm. I love building something creative that
          people can interact with.
        </Paragraph>
        <Paragraph style={{ marginTop: ".5em" }}>
          I&apos;m a student at{" "}
          <Link href="https://hanoi.fpt.edu.vn/">FPT University</Link> in Hanoi,
          majoring in software engineering, focusing on things that are creative
          and performant to provide a good user experience.
        </Paragraph>
      </div>
      <ImageWrapper>
        <Img src={AboutMe} />
        <Overlay variants={variants} initial="init" whileHover="hover" />
      </ImageWrapper>
    </ShowcaseSection>
  );
};

export default AboutMeSection;
