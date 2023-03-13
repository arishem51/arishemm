import { ReactNode } from "react";
import styled from "styled-components";
import Stack from "../Stack";

type Props = {
  children: ReactNode;
};

const Wrapper = styled(Stack)`
  width: 100%;
  padding: 8em 0;
  padding-bottom: 10em;
`;

const ExpandedWrapper = ({ children }: Props) => {
  return (
    <Wrapper direction="column" gap="8em">
      {children}
    </Wrapper>
  );
};

export default ExpandedWrapper;
