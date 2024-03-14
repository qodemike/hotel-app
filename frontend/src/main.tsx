import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContextProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { SearchContextProvider } from "./contexts/search/SearchContextProvider.tsx";
import AuthContextProvider from "./contexts/Auth/AuthContextProvider.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <AuthContextProvider>
          <RouterProvider router={router} />
          </AuthContextProvider>
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
