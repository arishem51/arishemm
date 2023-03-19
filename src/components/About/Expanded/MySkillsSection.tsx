import styled from "styled-components";
import Logo from "../../Logo";
import Stack from "../../Stack";
import Title from "../../Title";

const Wrapper = styled(Stack)`
  width: 70%;
  margin: auto;
`;

const Img = styled.img`
  width: 100px;
  aspect-ratio: 1;
  cursor: pointer;
  filter: drop-shadow(8px 10px 2px hsl(0deg 0% 0% / 0.4));
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
  {
    name: "Github",
    logo: Logo.Github,
  },
];

const MySkills = () => {
  return (
    <Wrapper
      direction="column"
      alignItems="center"
      gap="4em"
      htmlElement="section"
    >
      <Title>My Skills</Title>
      <Stack
        gap="3.5em"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
      >
        {SKILLS.map(({ name, logo }, index) => {
          return (
            <Stack
              direction="column"
              alignItems="center"
              gap="1em"
              key={name + index}
            >
              <Img src={logo} />
              <TextItem>{name}</TextItem>
            </Stack>
          );
        })}
      </Stack>
    </Wrapper>
  );
};

export default MySkills;
