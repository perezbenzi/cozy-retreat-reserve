
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import AdminLayout from "@/components/admin/AdminLayout";

interface ProtectedAdminRouteProps {
  children: ReactNode;
  requiredRole?: "admin";
}

const ProtectedAdminRoute = ({ 
  children, 
  requiredRole = "admin" 
}: ProtectedAdminRouteProps) => {
  const { user, loading, isAdmin, adminLoading } = useAuth();
  const navigate = useNavigate();

  // Handle redirections based on auth and admin status
  useEffect(() => {
    // Wait for both auth and admin status to be determined
    if (!loading && !adminLoading) {
      if (!user) {
        console.log("ProtectedAdminRoute: No user - redirecting to admin login");
        toast.error("Debes iniciar sesión para acceder al panel de administración");
        navigate("/admin/login");
      } else if (isAdmin === false) {
        console.log("ProtectedAdminRoute: User is not admin - redirecting to dashboard");
        toast.error(`Necesitas permisos de ${requiredRole} para acceder a esta página`);
        navigate("/dashboard");
      }
    }
  }, [user, loading, isAdmin, adminLoading, navigate, requiredRole]);

  // Show loading while checking auth or admin status
  if (loading || adminLoading) {
    console.log("ProtectedAdminRoute: Showing loading state - auth loading:", loading, "admin loading:", adminLoading);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render admin content if user is confirmed admin
  if (!user || isAdmin !== true) {
    console.log("ProtectedAdminRoute: Not rendering admin content - user:", !!user, "isAdmin:", isAdmin);
    return null;
  }
  
  console.log("ProtectedAdminRoute: Rendering admin content");
  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedAdminRoute;
