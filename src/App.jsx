import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as AuthProvider } from "./Contexts/AuthContext";
import CustomRoutes from "./CustomRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as TweetProvider } from "./Contexts/TweetContext";
import { Provider as UserProvider } from "./Contexts/UserContext";
import ThemeProvider from "react-bootstrap/ThemeProvider";
const queryClient = new QueryClient();
function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
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
    </ThemeProvider>
  );
}

export default App;
