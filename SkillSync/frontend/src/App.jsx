// frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthForm from "./components/AuthForm";
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./pages/Overview";
import CareerPaths from "./pages/CareerPaths";
import AIAdvisor from "./pages/AIAdvisor";
import Settings from "./pages/Settings";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/register" element={<AuthForm mode="register" />} />

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard"
        element={user ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Overview />} />
        <Route path="career-paths" element={<CareerPaths />} />
        <Route path="ai-advisor" element={<AIAdvisor />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
