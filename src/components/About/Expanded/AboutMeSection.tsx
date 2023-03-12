import styled from "styled-components";
import Paragraph from "../../Paragraph";
import ShowcaseSection from "../../ShowcaseSection";
import AboutMe from "../../../assets/me02.jpg";

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

const AboutMeSection = () => {
  return (
    <ShowcaseSection title="About Me" srcImg={AboutMe}>
      <div>
        <Paragraph>
          Hello! I&apos;m Arishemm. I love building something creative that
          people can interact with.
        </Paragraph>
        <Paragraph style={{ marginTop: ".5em" }}>
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
    </ShowcaseSection>
  );
};

export default AboutMeSection;
