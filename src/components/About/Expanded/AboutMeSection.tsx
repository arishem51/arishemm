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

const TextContent = styled(Paragraph)<{ shouldSpace?: boolean }>`
  font-size: 1.3rem;
  margin: ${(props) => (props.shouldSpace ? ".5em 0" : "0")};
`;

const AboutMeSection = () => {
  return (
    <ShowcaseSection title="About Me">
      <div>
        <TextContent>
          Hello! My name is Arishemm and I&apos;m passionate about building
          creative and interactive experiences for people to enjoy. As a
          software engineering student at{" "}
          <Link href="https://hanoi.fpt.edu.vn/">FPT University</Link> in Hanoi,
          I&apos;m focused on developing performant solutions that provide
          exceptional user experiences.
        </TextContent>
        <TextContent shouldSpace>
          In my free time, I love working on various projects that challenge me
          to improve my skills. This includes building UIs inspired by{" "}
          <Link href="https://codepen.io/">Codepen</Link>,{" "}
          <Link href="https://uiverse.io/">UiVerse</Link>,{" "}
          <Link href="https://css-tricks.com/">Css-Tricks</Link>, and{" "}
          <Link href="https://www.framer.com/motion/">Framer Motion</Link>
        </TextContent>
        <TextContent shouldSpace>
          I&apos;m constantly learning and growing in the field of front-end
          development and I&apos;m excited to see where my skills will take me
          next.
        </TextContent>
      </div>
      <ImageWrapper>
        <Img src={AboutMe} />
        <Overlay variants={variants} initial="init" whileHover="hover" />
      </ImageWrapper>
    </ShowcaseSection>
  );
};

export default AboutMeSection;
