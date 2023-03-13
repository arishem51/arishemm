import styled from "styled-components";
import Title from "../Title";
import { ReactNode } from "react";
import Stack from "../Stack";

const Wrapper = styled(Stack)`
  width: 60%;
  margin: auto;
`;

const Flex = styled(Stack)`
  margin-top: 1.5em;
  gap: 3em;
`;

type Props = {
  children: ReactNode;
  title: string;
  reverseContent?: boolean;
};

const ShowcaseSection = ({
  children,
  title,
  reverseContent = false,
}: Props) => {
  return (
    <Wrapper htmlElement="section" direction="column" alignItems="start">
      <Title>{title}</Title>
      <Flex
        alignItems="center"
        gap="3em"
        direction={reverseContent ? "row-reverse" : "row"}
      >
        {children}
      </Flex>
    </Wrapper>
  );
};

export default ShowcaseSection;
