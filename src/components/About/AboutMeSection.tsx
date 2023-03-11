import React from "react";
import styled from "styled-components";
import AboutMe from "../../assets/me02.jpg";
import { motion } from "framer-motion";

const TextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  margin: auto;
`;

const Heading = styled.h1`
  font-size: 3.2em;
  color: var(--color-black);
`;

const Paragraph = styled.p`
  font-size: 1.8em;
  color: var(--color-black);
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
  gap: 3em;
`;

const Font = styled.span`
  font-family: "Rampart One", cursive;
  color: var(--color-black);
  font-weight: 900;
  font-style: italic;
  > a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
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

const AboutMeSection = () => {
  return (
    <TextWrapper>
      <Heading>About Me</Heading>
      <Flex>
        <div>
          <Paragraph>
            Hello! I&apos;m Arishemm. I love building something creative that
            people can interact with.
          </Paragraph>
          <Paragraph style={{ marginTop: "1em" }}>
            I&apos;m a student at{" "}
            <Font>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://hanoi.fpt.edu.vn/"
              >
                FPT University
              </a>
            </Font>{" "}
            in Hanoi, majoring in software engineering, focusing on things that
            are creative and performant to provide a good user experience.
          </Paragraph>
        </div>
        <ImageWrapper>
          <Img src={AboutMe} />
          <Overlay
            initial={{
              outline: "200px solid rgba(0,0,0,0.7)",
              outlineOffset: "-200px",
            }}
            whileHover={{
              outline: "8px solid rgb(52, 229, 235)",
              outlineOffset: "16px",
            }}
          />
        </ImageWrapper>
      </Flex>
    </TextWrapper>
  );
};

export default AboutMeSection;
