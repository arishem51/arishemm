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

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
  gap: 3em;
`;

type Props = {
  children: ReactNode;
  title: string;
};

const ShowcaseSection = ({ children, title }: Props) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Flex>{children}</Flex>
    </Wrapper>
  );
};

export default ShowcaseSection;
