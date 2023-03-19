import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import Link from "../../Link";
import Paragraph from "../../Paragraph";
import Stack from "../../Stack";
import M1 from "./Missing Corner/ms1.jpg";
import M2 from "./Missing Corner/ms2.jpg";
import M3 from "./Missing Corner/ms4.jpg";

const Wrapper = styled.div`
  position: relative;
`;

const Flex = styled(Stack)`
  position: relative;
  z-index: 2;

  margin-top: 1em;
  padding: 1em;

  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

const Heading = styled.h1`
  font-family: "Rampart One", cursive;
  color: var(--color-black);
  font-weight: 900;
  font-style: italic;
`;

const Time = styled.h4`
  color: var(--color-black-60);
`;

const ImgWrapper = styled.div`
  position: relative;
  flex: 1 0 33%;
  border-radius: inherit;
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: inherit;
`;

const ImgContainer = styled(Stack)`
  margin-top: 1em;
  border-radius: 1em;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  z-index: 2;
  inset: 0;

  cursor: pointer;
  border-radius: inherit;
`;

const variants: Variants = {
  initial: {
    background:
      "repeating-linear-gradient(to right, rgba(0,0,0,.85) 0% 25%, transparent 0 25%)",
  },
  hover: {
    background:
      "repeating-linear-gradient(to right, rgba(0,0,0,.85) 0% 0%, transparent 0 25%)",
  },
};

const MissingCorner = () => {
  return (
    <Wrapper>
      <Flex gap="0.5em" direction="column">
        <Heading>
          <Link href="https://www.missingcorner.com/">• Missing Corner</Link>
        </Heading>
        <Time>Oct 2021 - Aug 2022</Time>
        <Paragraph style={{ fontSize: "1.2em" }}>
          During my time at Missing Corner, I gained valuable experience working
          alongside senior developers. I was responsible for developing and
          maintaining projects using technologies such as React, TypeScript,
          styled-components, and React Native.
        </Paragraph>
      </Flex>
      <ImgContainer gap="2em">
        <ImgWrapper>
          <Img src={M1} />
          <Overlay variants={variants} initial="initial" whileHover="hover" />
        </ImgWrapper>
        <ImgWrapper>
          <Img src={M2} />
          <Overlay variants={variants} initial="initial" whileHover="hover" />
        </ImgWrapper>
        <ImgWrapper>
          <Img src={M3} />
          <Overlay variants={variants} initial="initial" whileHover="hover" />
        </ImgWrapper>
      </ImgContainer>
    </Wrapper>
  );
};

export default MissingCorner;
