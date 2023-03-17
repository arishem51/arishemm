import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./components/App";

const GlobalStyles = createGlobalStyle`
  /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
  
}

/*
  2. Remove default margin and padding
*/
* {
  margin: 0;
  padding:0;
}

/*
  3. Allow percentage-based heights in the application
  3.1 CSS variables
*/
html, body {
  height: 100%;

  --color-blue: #3051A8;
  --color-blue-2:rgb(66, 165, 245);
  --color-green: #3F593D;
  --color-green-2:rgb(102, 187, 106);
  --color-sky: #90C0E6;
  --color-red: #D30423;
  --color-red-2: rgb(239, 83, 80);
  --color-yellow: #F4C537;
  --color-orange:rgb(255, 167, 38);
  --color-sage-green: #D7D7C8;
  --color-off-white: #F2F0E9;
  --color-black: #141212;
  --color-black-60: #5B5959;
  --color-black-40: #A1A0A0;
  --color-black-10: #D0D0D0;
  --color-white: #ffffff;
  --color-red-brick: #863A29;
  --color-brown: rgb(141, 110, 99);
  --color-brown-2: rgb(195, 126, 145);
}

/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering

  5.1 font 

*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: 'Roboto', sans-serif;
}

/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}

/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}
.lf-player-container{
  height:100%;
  display: flex;
  align-items: center;
}
`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
