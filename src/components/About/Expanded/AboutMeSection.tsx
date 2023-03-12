import Paragraph from "../../Paragraph";
import ShowcaseSection from "../../ShowcaseSection";
import AboutMe from "../../../assets/me02.jpg";
import Link from "../../Link";

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
          <Link>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://hanoi.fpt.edu.vn/"
            >
              FPT University
            </a>
          </Link>{" "}
          in Hanoi, majoring in software engineering, focusing on things that
          are creative and performant to provide a good user experience.
        </Paragraph>
      </div>
    </ShowcaseSection>
  );
};

export default AboutMeSection;
