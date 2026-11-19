import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/variables.css";
import "@/styles/global.css";
import AppProviders from "@/app/AppProviders";
import AppInitializer from "@/app/AppInitializer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <AppInitializer />
    </AppProviders>
  </StrictMode>,
);
