import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import Title from "../Title";
import { ReactNode } from "react";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  margin: auto;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
  gap: 3em;
`;

const ImageWrapper = styled.div`
  position: relative;

  width: 400px;
  height: 525px;
  flex: 1 0 400px;

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
    outline: "200px solid rgba(0,0,0,0.7)",
    outlineOffset: "-200px",
  },
  hover: {
    outline: "8px solid rgb(52, 229, 235)",
    outlineOffset: "16px",
  },
};

type Props = {
  srcImg: string;
  children: ReactNode;
  title: string;
};

const ShowcaseSection = ({ srcImg, children, title }: Props) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Flex>
        <div>{children}</div>
        <ImageWrapper>
          <Img src={srcImg} />
          <Overlay variants={variants} initial="init" whileHover="hover" />
        </ImageWrapper>
      </Flex>
    </Wrapper>
  );
};

export default ShowcaseSection;
