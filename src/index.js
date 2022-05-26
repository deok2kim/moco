import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import App from "./App";

import GlobalStyles from "./GlobalStyles";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </>
);
