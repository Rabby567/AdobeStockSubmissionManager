import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LicenseGate from "./components/LicenseGate";
import License from "./pages/License";
import Dashboard from "./pages/Dashboard";
import Review from "./pages/Review";
import Settings from "./pages/Settings";
import UserGuide from "./pages/UserGuide";

function App() {
  console.log("APP COMPONENT LOADED");
    
return (
  <>
    <LicenseGate
      fallback={<License />}
    >
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/review"
            element={<Review />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/guide"
            element={<UserGuide />}
          />
        </Routes>
      </HashRouter>
    </LicenseGate>

    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#ffffff",
          color: "#111827",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 600,
          boxShadow:
            "0 12px 30px rgba(0,0,0,.12)",
        },

        success: {
          style: {
            borderLeft: "4px solid #16a34a",
          },
        },

        error: {
          style: {
            borderLeft: "4px solid #ef4444",
          },
        },
      }}
    />
  </>
);
}

export default App;