import styled from "styled-components";
import AboutMeSection from "./AboutMeSection";
import MySkills from "./MySkillsSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8em;

  width: 100%;
  padding: 8em 0;
  padding-bottom: 10em;
`;

const ExpandedAbout = () => {
  return (
    <Wrapper>
      <AboutMeSection />
      <MySkills />
    </Wrapper>
  );
};

export default ExpandedAbout;
