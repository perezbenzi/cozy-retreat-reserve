
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
  
  // Check admin role immediately when component mounts or user changes
  useEffect(() => {
    const checkAdminRole = async () => {
      // If no user is logged in, they can't be an admin
      if (!user) {
        setIsAdmin(false);
        setCheckingRole(false);
        return;
      }
      
      try {
        console.log("Checking admin role for user:", user.id);
        const { data, error } = await supabase
          .rpc('has_role', { _role: requiredRole });
          
        if (error) {
          console.error(`Error checking ${requiredRole} role:`, error);
          setIsAdmin(false);
          toast.error(`Error verificando permisos de ${requiredRole}`);
        } else {
          console.log(`${requiredRole} check result:`, data);
          // Explicitly cast to boolean to ensure we have a definitive true/false
          const hasAdminRole = Boolean(data);
          setIsAdmin(hasAdminRole);
          
          if (!hasAdminRole) {
            console.log("User does not have admin role, will redirect");
          }
        }
      } catch (error) {
        console.error(`Failed to check ${requiredRole} role:`, error);
        setIsAdmin(false);
      } finally {
        setCheckingRole(false);
      }
    };
    
    checkAdminRole();
  }, [user, requiredRole]);

  // Handle redirections based on auth status and admin role
  useEffect(() => {
    // Only perform redirects after both auth check and role check are complete
    if (!loading && !checkingRole) {
      if (!user) {
        console.log("No user logged in, redirecting to admin login");
        toast.error("Debes iniciar sesión para acceder al panel de administración");
        navigate("/admin/login");
      } else if (isAdmin === false) {
        console.log("User is not admin, redirecting to dashboard");
        toast.error(`Necesitas permisos de ${requiredRole} para acceder a esta página`);
        navigate("/dashboard");
      }
    }
  }, [user, loading, navigate, isAdmin, checkingRole, requiredRole]);

  // Show loading state while checking auth or admin status
  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render admin content if user is logged in AND has admin role
  if (!user || isAdmin === false) {
    return null;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedAdminRoute;
