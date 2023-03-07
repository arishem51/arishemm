import React from "react";
import styled from "styled-components";
import Portfolio from "./Portfolio";

const Wrapper = styled.main`
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

function App() {
  return (
    <Wrapper>
      <Portfolio />
    </Wrapper>
  );
}

export default App;
