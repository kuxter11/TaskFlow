import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { store } from "./store";

interface AppProvidersProps {
  children: ReactNode;
}

// Everything the app needs around it: Redux store, router, toast container.
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
        <Toaster richColors position="bottom-right" />
      </BrowserRouter>
    </Provider>
  );
}
