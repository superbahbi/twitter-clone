import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import AuthProvider from "./Contexts/AuthContext";
import { Provider as AuthReducerContext } from "./Contexts/AuthReducerContext";

function App() {
  return (
    <AuthReducerContext>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </AuthReducerContext>
  );
}

export default App;
