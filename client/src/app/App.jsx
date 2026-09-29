import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/styles/index.css";
import SmoothScroll from "@/app/providers/SmoothScroll";
import { AuthProvider } from "@/app/providers/AuthProvider";
import AppRoutes from "@/app/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SmoothScroll>
          <AppRoutes />
        </SmoothScroll>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
