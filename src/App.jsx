import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./CustomRoutes";
import { Provider as AuthProvider } from "./Contexts/AuthContext";

import { Provider as UserProvider } from "./Contexts/UserContext";
import { Provider as TweetProvider } from "./Contexts/TweetContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <TweetProvider>
          <BrowserRouter>
            <CustomRoutes />
          </BrowserRouter>
        </TweetProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
