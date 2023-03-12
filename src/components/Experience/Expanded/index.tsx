import ExpandedWrapper from "../../ExpandedWrapper";
import ShowcaseSection from "../../ShowcaseSection";
import MissingCorner from "./MissingCorner";

const Expanded = () => {
  return (
    <ExpandedWrapper>
      <ShowcaseSection title="Where I've worked">
        <MissingCorner />
      </ShowcaseSection>
    </ExpandedWrapper>
  );
};

export default Expanded;
