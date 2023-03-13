import { ReactNode } from "react";
import styled from "styled-components";
import Title from "../Title";
import Stack, { StackProps } from "../Stack";

const Wrapper = styled(Stack)`
  width: 60%;
  margin: auto;
`;

const Flex = styled(Stack)`
  margin-top: 1.5em;
`;

type Props = {
  children: ReactNode;
  title: string;
  reverseContent?: boolean;
} & StackProps;

const ShowcaseSection = ({
  children,
  title,
  reverseContent = false,
  ...props
}: Props) => {
  return (
    <Wrapper
      htmlElement="section"
      direction="column"
      alignItems="start"
      {...props}
    >
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
