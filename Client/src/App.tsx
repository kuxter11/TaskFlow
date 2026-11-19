import { useState } from "react";

import AuthModal from "./components/auth/AuthModal";

import { useAppSelector } from "./store/hooks";

import "./App.css";
import type { AuthMode } from "./types/auth.types";
import Projects from "./components/pages/Projects/Projects";
import LandingPage from "./components/landing/LandingPage";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import ProjectBoard from "./components/pages/ProjectBoard/ProjectBoard";
import ProjectLayout from "./components/pages/ProjectLayout/ProjectLayout";
import ProjectMembers from "./components/pages/ProjectMembers/ProjectMembers";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.user !== null);

  const isInitializing = useAppSelector((state) => state.auth.isInitializing);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  if (isInitializing) {
    return <div className="app-loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onOpenAuth={openAuthModal} />

        <AuthModal
          key={authMode}
          isOpen={isAuthOpen}
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<Layout onOpenAuth={openAuthModal} />}>
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

      <AuthModal
        key={authMode}
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}

export default App;
