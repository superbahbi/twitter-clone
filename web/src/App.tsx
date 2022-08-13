import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Provider as AuthProvider } from "./Contexts/AuthContext";
import { Provider as TweetProvider } from "./Contexts/TweetContext";
import { Provider as UserProvider } from "./Contexts/UserContext";
import CustomRoutes from "./CustomRoutes";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <TweetProvider>
            <BrowserRouter>
              <CustomRoutes />
              <ReactQueryDevtools initialIsOpen={true} />
            </BrowserRouter>
          </TweetProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
