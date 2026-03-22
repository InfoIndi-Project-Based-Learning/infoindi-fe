import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import FauziPage from "./pages/Fauzi.jsx";
import WidanPage from "./pages/Widan.jsx";
import IndahPage from "./pages/Indah.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/fauzi-ahmad-zaki",
    element: <FauziPage />,
  },
  {
    path: "/widan-ababil",
    element: <WidanPage />,
  },
  {
    path: "/indah-brilian",
    element: <IndahPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
