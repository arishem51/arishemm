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
  childrenStyle?: Omit<StackProps, "children">;
} & StackProps;

const ShowcaseSection = ({
  children,
  title,
  childrenStyle,
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
      <Flex alignItems="center" gap="3em" {...childrenStyle}>
        {children}
      </Flex>
    </Wrapper>
  );
};

export default ShowcaseSection;
