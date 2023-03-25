import { useState } from "react";
import Onboard from "./Onboard";
import MainContent from "./MainContent";
import AnimationProvider from "../Provider/AnimationProvider";
import { MotionConfig } from "framer-motion";

function App() {
  const [shouldRenderOnboard, setShouldRenderOnboard] = useState(true);

  const handleAnimationEnd = () => {
    setShouldRenderOnboard(false);
  };

  return (
    <AnimationProvider>
      <MotionConfig reducedMotion="user">
        <MainContent />
      </MotionConfig>
    </AnimationProvider>
  );
}

export default App;
