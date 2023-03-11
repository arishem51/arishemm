import React from "react";

type Props = {
  initialTime?: number; // second
};

const useTime = ({ initialTime = 0 }: Props) => {
  const [time, setTime] = React.useState(initialTime);

  React.useEffect(() => {
    if (time > 1) {
      return;
    }

    const timeout = setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  return { time, setTime };
};

export default useTime;
