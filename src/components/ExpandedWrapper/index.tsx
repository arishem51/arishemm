import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8em;

  width: 100%;
  padding: 8em 0;
  padding-bottom: 10em;
`;

const ExpandedWrapper = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ExpandedWrapper;
