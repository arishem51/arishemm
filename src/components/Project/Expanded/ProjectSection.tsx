import ShowcaseSection from "../../ShowcaseSection";
import MovieProject from "../../../assets/movie-project.jpg";
import IUniverseProject from "../../../assets/iuniverse-project.jpg";
import Paragraph from "../../Paragraph";
import Link from "../../Link";
import Actions from "./Actions";
import styled from "styled-components";

const Description = styled(Paragraph)`
  font-size: 1.2rem;
`;

const style = {
  alignItems: "flex-start",
  gap: "2rem",
};

const ProjectSection = () => {
  return (
    <>
      <ShowcaseSection
        title="Project"
        childrenStyle={{ ...style, direction: "row-reverse" }}
      >
        <div>
          <Description>
            My personal project is a collection of UIs that I have created,
            drawing inspiration from popular design websites such as{" "}
            <Link href="https://codepen.io/">Codepen</Link>,{" "}
            <Link href="https://uiverse.io/">UiVerse</Link>,{" "}
            <Link href="https://css-tricks.com/">Css-Tricks</Link>, and{" "}
            <Link href="https://www.framer.com/motion/">Framer Motion</Link>. It
            serves as a platform for me to constantly improve my front-end
            development skills and I work on it every day to contribute new
            ideas and designs.
          </Description>
          <Actions
            githubLink="https://github.com/arishem51/iuniverse"
            vercelLink="https://iuniverse.vercel.app/"
          />
        </div>
        <Image src={IUniverseProject} />
      </ShowcaseSection>
      <ShowcaseSection title="" childrenStyle={style}>
        <div>
          <Description>
            This is a side project inspired by{" "}
            <Link href="https://www.themoviedb.org/">
              The Movie Database API.
            </Link>{" "}
            It allows users to browse and search for movie information,
            including details on theater showtimes, TV listings, and genre
            filters. With this project, I aimed to further develop my skills in
            web development
          </Description>
          <Actions
            githubLink="https://github.com/arishem51/Movies"
            vercelLink="https://movies-arishem51.vercel.app/"
          />
        </div>
        <Image src={MovieProject} />
      </ShowcaseSection>
    </>
  );
};

const Image = ({ src }: { src: string }) => {
  return (
    <div>
      <img src={src} />
    </div>
  );
};

export default ProjectSection;
