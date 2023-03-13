import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

const Wrapper = styled.div<Props>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => props.gap};
  flex-wrap: ${(props) => props.flexWrap};
`;

type Props = {
  children: ReactNode;
  direction?: "row" | "column";
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  gap?: CSSProperties["gap"];
  htmlElement?: keyof HTMLElementTagNameMap;
  flexWrap?: CSSProperties["flexWrap"];
};

const Stack = ({
  direction = "row",
  justifyContent = "flex-start",
  alignItems = "stretch",
  htmlElement = "div",
  gap = "0",
  flexWrap = "unset",
  ...props
}: Props) => {
  return (
    <Wrapper
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      as={htmlElement}
      gap={gap}
      flexWrap={flexWrap}
      {...props}
    />
  );
};

export default Stack;
