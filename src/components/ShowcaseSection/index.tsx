import styled from "styled-components";
import Title from "../Title";
import { ReactNode } from "react";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  margin: auto;
`;

const Flex = styled.div<{ reverse: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  margin-top: 1em;
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
    <Wrapper>
      <Title>{title}</Title>
      <Flex reverse={reverseContent}>{children}</Flex>
    </Wrapper>
  );
};

export default ShowcaseSection;
