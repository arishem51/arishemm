import ExpandedWrapper from "../../ExpandedWrapper";
import ShowcaseSection from "../../ShowcaseSection";
import Image from "../../../assets/CV-Image.jpg";
import styled from "styled-components";
import Stack from "../../Stack";

const Img = styled.img`
  width: 80%;
  max-width: 1200px;
`;

const Wrapper = styled(Stack)`
  width: 100%;
  height: 100%;
`;

const ExpandedResume = () => {
  return (
    <ExpandedWrapper>
      <ShowcaseSection
        title="Resume"
        alignItems="center"
        justifyContent="center"
      >
        <Wrapper justifyContent="center">
          <Img src={Image} />
        </Wrapper>
      </ShowcaseSection>
    </ExpandedWrapper>
  );
};

export default ExpandedResume;
