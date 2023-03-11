import React from "react";
import styled from "styled-components";
import AboutTitle from "./AboutTitle";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MySkills = () => {
  return (
    <Wrapper>
      <AboutTitle>My Skills</AboutTitle>
    </Wrapper>
  );
};

export default MySkills;
