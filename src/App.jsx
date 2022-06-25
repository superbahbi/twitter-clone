import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./CustomRoutes";
import { Provider as AuthProvider } from "./Contexts/AuthContext";
import { Provider as TweetProvider } from "./Contexts/TweetContext";

function App() {
  return (
    <AuthProvider>
      <TweetProvider>
        <BrowserRouter>
          <CustomRoutes />
        </BrowserRouter>
      </TweetProvider>
    </AuthProvider>
  );
}

export default App;
