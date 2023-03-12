import styled from "styled-components";
import Logo from "../Logo";
import AboutTitle from "./AboutTitle";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4em;

  width: 70%;
  margin: auto;
`;

const SkillWrapper = styled.div`
  display: flex;
  gap: 3.5em;

  flex-wrap: wrap;
  justify-content: center;
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  > img {
    width: 100px;
    height: 100px;
    cursor: pointer;
    filter: drop-shadow(8px 10px 2px hsl(0deg 0% 0% / 0.4));
  }
`;

const TextItem = styled.h1`
  color: var(--color-black);
  font-size: 1.2em;
  font-weight: 500;
`;

const SKILLS: { name: string; logo: string }[] = [
  {
    name: "HTML 5",
    logo: Logo.HTML,
  },
  {
    name: "CSS 3",
    logo: Logo.CSS,
  },
  {
    name: "Javascript",
    logo: Logo.Javascript,
  },
  {
    name: "Typescript",
    logo: Logo.Typescript,
  },
  {
    name: "React",
    logo: Logo.ReactLogo,
  },
  {
    name: "Styled-components",
    logo: Logo.StyledComponents,
  },
  {
    name: "Tailwind CSS",
    logo: Logo.TailwindCSS,
  },
  {
    name: "Tanstack Query",
    logo: Logo.TanstackQuery,
  },
  {
    name: "Redux",
    logo: Logo.Redux,
  },
  {
    name: "Framer Motion",
    logo: Logo.FramerMotion,
  },
];

const MySkills = () => {
  return (
    <Wrapper>
      <AboutTitle>My Skills</AboutTitle>
      <SkillWrapper>
        {SKILLS.map(({ name, logo }, index) => {
          return (
            <SkillItem key={name + index}>
              <img src={logo} />
              <TextItem>{name}</TextItem>
            </SkillItem>
          );
        })}
      </SkillWrapper>
    </Wrapper>
  );
};

export default MySkills;
