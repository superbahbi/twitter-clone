import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
const AppRoot = createGlobalStyle`
  body {
    font-family: Chirp !important;
    overflow-y: scroll;
  }
`;
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppRoot />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
