import styled from "styled-components";
import ProjectSection from "./ProjectSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  widows: 100%;
`;

const ExpandedWork = () => {
  return (
    <Wrapper>
      <ProjectSection />
    </Wrapper>
  );
};

export default ExpandedWork;
