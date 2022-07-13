import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./CustomRoutes";
import { Provider as AuthProvider } from "./Contexts/AuthContext";

import { Provider as UserProvider } from "./Contexts/UserContext";
import { Provider as TweetProvider } from "./Contexts/TweetContext";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <TweetProvider>
            <BrowserRouter>
              <CustomRoutes />
            </BrowserRouter>
          </TweetProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
