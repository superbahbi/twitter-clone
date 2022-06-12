import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import AuthProvider from "./Contexts/AuthContext";
import {createGlobalStyle} from 'styled-components';
const AppRoot = createGlobalStyle`
  body {
    font-family: Chirp !important;
  }
`;
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <AppRoot />
          <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
