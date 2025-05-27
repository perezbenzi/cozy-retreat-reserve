
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedAdminRouteProps {
  children: ReactNode;
  requiredRole?: "admin";
}

const ProtectedAdminRoute = ({ 
  children, 
  requiredRole = "admin" 
}: ProtectedAdminRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);
  
  // Check admin role when user is available
  useEffect(() => {
    const checkAdminRole = async () => {
      console.log("ProtectedAdminRoute: === INICIO VERIFICACIÓN ADMIN ===");
      console.log("ProtectedAdminRoute: Auth loading:", loading);
      console.log("ProtectedAdminRoute: User:", user ? { id: user.id, email: user.email } : null);
      
      // Wait for auth to finish loading
      if (loading) {
        console.log("ProtectedAdminRoute: Auth still loading, waiting...");
        return;
      }
      
      // If no user after auth loading is complete, they're not admin
      if (!user) {
        console.log("ProtectedAdminRoute: No user after auth loading complete");
        setIsAdmin(false);
        setCheckingRole(false);
        return;
      }
      
      try {
        console.log("ProtectedAdminRoute: Checking admin role for user:", user.id);
        
        const { data, error } = await supabase
          .rpc('has_role', { _role: requiredRole });
        
        console.log("ProtectedAdminRoute: RPC result - data:", data, "error:", error);
          
        if (error) {
          console.error("ProtectedAdminRoute: Error checking role:", error);
          setIsAdmin(false);
        } else {
          const hasAdminRole = Boolean(data);
          console.log("ProtectedAdminRoute: User is admin:", hasAdminRole);
          setIsAdmin(hasAdminRole);
        }
      } catch (error) {
        console.error("ProtectedAdminRoute: Exception checking role:", error);
        setIsAdmin(false);
      } finally {
        setCheckingRole(false);
        console.log("ProtectedAdminRoute: === FIN VERIFICACIÓN ADMIN ===");
      }
    };
    
    checkAdminRole();
  }, [user, loading, requiredRole]);

  // Handle redirections only after role check is complete
  useEffect(() => {
    // Only redirect after both auth and role checking are complete
    if (!loading && !checkingRole) {
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
  }, [user, loading, isAdmin, checkingRole, navigate, requiredRole]);

  // Show loading while checking auth or admin status
  if (loading || checkingRole) {
    console.log("ProtectedAdminRoute: Showing loading state - auth loading:", loading, "role checking:", checkingRole);
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
