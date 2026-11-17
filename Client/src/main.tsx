import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import AppInitializer from "./AppInitializer";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppInitializer />
        <Toaster richColors position="bottom-right" />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
