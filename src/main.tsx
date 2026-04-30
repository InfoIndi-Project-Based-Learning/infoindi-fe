import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import router from "./routes";
import { RouterProvider } from "react-router";
import QueryProvider from "./providers/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
);
