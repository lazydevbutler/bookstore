import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./pages/root/index";
import { QueryClient, QueryClientProvider } from "react-query";

// import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <QueryClientProvider client={queryClient}>
    <Root />
  </QueryClientProvider>
);
