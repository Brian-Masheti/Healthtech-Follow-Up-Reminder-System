import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PatientPortal from "./pages/PatientPortal";
import DoctorDashboard from "./pages/DoctorDashboard";
import AuthGuard from "./components/AuthGuard";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes - Provider (Doctor) */}
              <Route 
                path="/doctor" 
                element={
                  <AuthGuard allowedRoles={['provider']}>
                    <DoctorDashboard />
                  </AuthGuard>
                } 
              />
              {/* Generic dashboard, used for admin/provider if needed */}
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard allowedRoles={['provider', 'admin']}>
                    <Index />
                  </AuthGuard>
                } 
              />
              
              {/* Protected routes - Admin */}
              <Route 
                path="/admin" 
                element={
                  <AuthGuard allowedRoles={['admin']}>
                    <AdminDashboard />
                  </AuthGuard>
                } 
              />
              
              {/* Protected routes - Patient */}
              <Route 
                path="/patient-portal" 
                element={
                  <AuthGuard allowedRoles={['patient']}>
                    <PatientPortal />
                  </AuthGuard>
                } 
              />
              
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;