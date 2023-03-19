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

const TextContent = styled(Paragraph)`
  margin: 0.8em 0;
`;

const ExpandedContact = () => {
  return (
    <ExpandedWrapper>
      <ShowcaseSection title="Get in touch">
        <Stack direction="column" gap=".8em">
          <TextContent>
            If you have any inquiries, job opportunities or just want to say
            hello, feel free to contact me using the information below:
          </TextContent>
          <Heading>
            Email:{" "}
            <Link href="mailto:hungphung2002@gmail.com">
              hungphung2002@gmail.com
            </Link>
          </Heading>
          <Heading>
            Github:{" "}
            <Link href="https://github.com/arishem51">
              https://github.com/arishem51
            </Link>
          </Heading>
          <Heading>
            LinkedIn:{" "}
            <Link href="https://www.linkedin.com/in/arishemm">
              https://www.linkedin.com/in/arishemm
            </Link>
          </Heading>
          <Heading>
            Twitter:{" "}
            <Link href="https://twitter.com/HungPhung51">
              https://twitter.com/HungPhung51
            </Link>
          </Heading>
          <TextContent>I look forward to hearing from you soon!</TextContent>
        </Stack>
      </ShowcaseSection>
    </ExpandedWrapper>
  );
};

export default ExpandedContact;
