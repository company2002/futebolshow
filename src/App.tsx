import { Suspense, lazy, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRoute from "./components/admin/AdminRoute";
import SupabaseSetup from "./components/SupabaseSetup";
import { isSupabaseConfigured } from "./lib/supabase";

// Lazy load admin panel for better performance
const AdminPanel = lazy(() => import("./components/admin/AdminPanel"));

function App() {
  const [showSetup, setShowSetup] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    // Check if Supabase is configured
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    // Check if we're coming from the admin panel
    const fromAdmin =
      new URLSearchParams(window.location.search).get("setup") === "supabase";
    if (fromAdmin && !configured) {
      setShowSetup(true);
    }
  }, []);

  const handleSetup = (url: string, key: string) => {
    // This will be handled by the SupabaseSetup component
    // which will reload the page after setting the values
  };

  // If we're showing the setup screen, render it instead of the normal routes
  if (showSetup) {
    return <SupabaseSetup onSetup={handleSetup} />;
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/panel"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route
            path="/setup"
            element={<SupabaseSetup onSetup={handleSetup} />}
          />
          {/* Add this before any catch-all route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
