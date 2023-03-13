import styled from "styled-components";
import ExpandedWrapper from "../../ExpandedWrapper";
import Link from "../../Link";
import Paragraph from "../../Paragraph";
import ShowcaseSection from "../../ShowcaseSection";
import Stack from "../../Stack";

const Heading = styled.h1`
  font-style: italic;
  color: var(--color-black-60);
`;

const Slash = styled.span`
  font-size: inherit;
  font-family: "Rampart One", cursive;
`;

const ExpandedContact = () => {
  return (
    <ExpandedWrapper>
      <ShowcaseSection title="Get in touch">
        <Stack direction="column" gap=".8em">
          <Paragraph style={{ margin: ".8em 0" }}>
            Currently I&apos;m looking for new opportunities. Contact me if you
            need help 😸😸
          </Paragraph>
          <Heading>
            Email:{" "}
            <Link href="mailto:hungphung2002@gmail.com">
              hungphung2002@gmail.com
            </Link>
          </Heading>

          <Heading>
            Social Media:{" "}
            <Link href="https://www.linkedin.com/in/arishemm/">LinkedIn</Link>
            <Slash>&nbsp;/&nbsp;</Slash>
            <Link href="https://www.facebook.com/arishem51/">Facebook</Link>
            <Slash>&nbsp;/&nbsp;</Slash>
            <Link href="https://twitter.com/HungPhung51">Twitter</Link>
            <Slash>&nbsp;/&nbsp;</Slash>
            <Link href="https://github.com/arishem51">Github</Link>
          </Heading>
        </Stack>
      </ShowcaseSection>
    </ExpandedWrapper>
  );
};

export default ExpandedContact;
