import { useState } from "react";
import Onboard from "./Onboard";
import MainContent from "./MainContent";
import AnimationProvider from "../Provider/AnimationProvider";

function App() {
  const [shouldRenderOnboard, setShouldRenderOnboard] = useState(true);

  const handleAnimationEnd = () => {
    setShouldRenderOnboard(false);
  };

  return shouldRenderOnboard ? (
    <Onboard onAnimatedEnd={handleAnimationEnd} />
  ) : (
    <AnimationProvider>
      <MainContent />
    </AnimationProvider>
  );
}

export default App;
