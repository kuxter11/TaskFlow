import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { refreshSession } from "./features/auth/authSlice";
import App from "./App";

export default function AppInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshSession());
  }, [dispatch]);

  return <App />;
}
