import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 400px;
  border-radius: 1em;

  position: absolute;
  cursor: pointer;
`;

const Text = styled.h1`
  color: white;
`;

type Props = {
  className?: string;
  style: React.CSSProperties;
  name: string;
};

export default function PortfolioItem({ name, ...props }: Props) {
  return (
    <Wrapper
      initial={{ scale: 0.8 }}
      whileHover={{ scale: 1 }}
      transition={{ type: "spring" }}
      {...props}
    >
      <Text>{name}</Text>
    </Wrapper>
  );
}
