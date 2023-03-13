import ExpandedWrapper from "../../ExpandedWrapper";
import ShowcaseSection from "../../ShowcaseSection";
import Resume from "../../../assets/New-Front-end-CV.pdf";

const ExpandedResume = () => {
  return (
    <ExpandedWrapper>
      <ShowcaseSection title="Resume">
        <iframe width={1000} height={1000} src={Resume} />
      </ShowcaseSection>
    </ExpandedWrapper>
  );
};

export default ExpandedResume;
