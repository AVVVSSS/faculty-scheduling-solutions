
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AnimatePresence } from "framer-motion";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import Classrooms from "./pages/Classrooms";
import Subjects from "./pages/Subjects";
import Scheduling from "./pages/Scheduling";
import NotFound from "./pages/NotFound";

// Add framer-motion
import { LazyMotion, domAnimation } from "framer-motion";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/faculty" element={
          <ProtectedRoute>
            <Faculty />
          </ProtectedRoute>
        } />
        <Route path="/classrooms" element={
          <ProtectedRoute>
            <Classrooms />
          </ProtectedRoute>
        } />
        <Route path="/subjects" element={
          <ProtectedRoute>
            <Subjects />
          </ProtectedRoute>
        } />
        <Route path="/scheduling" element={
          <ProtectedRoute>
            <Scheduling />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </LazyMotion>
  </QueryClientProvider>
);

export default App;
