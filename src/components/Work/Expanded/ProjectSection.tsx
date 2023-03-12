import ShowcaseSection from "../../ShowcaseSection";
import MovieProject from "../../../assets/movie-project.jpg";
import IUniverseProject from "../../../assets/iuniverse-project.jpg";
import Paragraph from "../../Paragraph";
import Link from "../../Link";
import Actions from "./Actions";

const ProjectSection = () => {
  return (
    <>
      <ShowcaseSection title="" reverseContent>
        <div>
          <Paragraph>
            A collection of UIs that I made inspired mainly by{" "}
            <Link href="https://codepen.io/">Codepen</Link>,{" "}
            <Link href="https://css-tricks.com/">UiVerse</Link>,{" "}
            <Link href="https://uiverse.io/">Css-Tricks</Link>,{" "}
            <Link href="https://www.framer.com/motion/">Framer Motion</Link>.
            It&apos;s a project where I focus on improving my skills so I try to
            contribute to it every day 😸😸
          </Paragraph>
          <Actions
            githubLink="https://github.com/arishem51/iuniverse"
            vercelLink="https://iuniverse.vercel.app/"
          />
        </div>
        <div>
          <img src={IUniverseProject} />
        </div>
      </ShowcaseSection>
      <ShowcaseSection title="Project">
        <div>
          <Paragraph>
            A side project inspired by{" "}
            <Link href="https://www.themoviedb.org/">The Movie Database</Link>{" "}
            (The API is also theirs 😹😹). Display movie information by theater,
            tv, filter by movie genre, ...
          </Paragraph>
          <Actions
            githubLink="https://github.com/arishem51/Movies"
            vercelLink="https://movies-arishem51.vercel.app/"
          />
        </div>
        <div>
          <img src={MovieProject} />
        </div>
      </ShowcaseSection>
    </>
  );
};

export default ProjectSection;
