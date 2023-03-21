import styled from "styled-components";
import Stack from "../Stack";
import TextAnimated from "./TextAnimated";

const Wrapper = styled(Stack)`
  position: absolute;
  z-index: 4;

  width: 100vw;
  height: 100vh;
  background: white;
`;

const TextWrapper = styled.div`
  overflow: hidden;
`;

const Heading = styled.h1`
  font-size: 5em;
`;

type Props = {
  onAnimatedEnd: () => void;
};

const HELLO = "Hello I'm Arishemm";

const Onboard = ({ onAnimatedEnd }: Props) => {
  return (
    <Wrapper justifyContent="center" alignItems="center">
      <TextWrapper>
        <Heading>
          {HELLO.split("").map((item, index) => (
            <TextAnimated
              key={item + index}
              delay={index * 0.1}
              onAnimatedEnd={
                HELLO.split("").length - 1 === index ? onAnimatedEnd : undefined
              }
            >
              {item === " " ? <span>&nbsp;</span> : item}
            </TextAnimated>
          ))}{" "}
        </Heading>
      </TextWrapper>
    </Wrapper>
  );
};

export default Onboard;
