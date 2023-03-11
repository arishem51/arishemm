import React from "react";
import styled from "styled-components";
import AboutMeSection from "./AboutMeSection";
import MySkills from "./MySkillsSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5em;

  width: 100%;
  padding: 10% 0;
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
