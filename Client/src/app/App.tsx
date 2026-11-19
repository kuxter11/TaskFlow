import { Navigate, Route, Routes, useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "./hooks";
import { logout } from "@/features/auth/authSlice";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";

// Import order = CSS order: Layout's base page typography must load
// before the page components' CSS so page styles keep winning.
import AuthModal from "@/features/auth/components/AuthModal/AuthModal";
import Layout from "@/components/layout/Layout/Layout";
import Projects from "@/components/pages/Projects/Projects";
import LandingPage from "@/components/landing/LandingPage";
import ProjectBoard from "@/components/pages/ProjectBoard/ProjectBoard";
import ProjectLayout from "@/components/pages/ProjectLayout/ProjectLayout";
import ProjectMembers from "@/components/pages/ProjectMembers/ProjectMembers";

import styles from "./App.module.css";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const isInitializing = useAppSelector((state) => state.auth.isInitializing);

  const authModal = useAuthModal();

  // Log out from anywhere (sidebar or top bar) and go to the landing page.
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/");
    }
  };

  if (isInitializing) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      {user === null ? (
        <LandingPage onOpenAuth={authModal.open} />
      ) : (
        <Routes>
          <Route
            element={
              <Layout
                user={user}
                isInitializing={isInitializing}
                onLogout={handleLogout}
                onOpenAuth={authModal.open}
              />
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <>
                  <h1>Dashboard</h1>
                  <p>Your dashboard content goes here.</p>
                </>
              }
            />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectLayout />}>
              <Route index element={<Navigate to="board" replace />} />
              <Route path="board" element={<ProjectBoard />} />
              <Route path="members" element={<ProjectMembers />} />
            </Route>
            <Route path="settings" element={<h1>Settings</h1>} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Route>
        </Routes>
      )}

      {/* One AuthModal for the whole app. key = remount (fresh form) when the opening tab changes. */}
      <AuthModal
        key={authModal.mode}
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={authModal.close}
      />
    </>
  );
}

export default App;
