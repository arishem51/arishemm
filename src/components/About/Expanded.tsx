import React from "react";
import styled from "styled-components";
import AboutMeSection from "./AboutMeSection";

const Wrapper = styled.div`
  width: 100%;
  padding: 10% 0;
`;

const ExpandedAbout = () => {
  return (
    <Wrapper>
      <AboutMeSection />
    </Wrapper>
  );
};

export default ExpandedAbout;
