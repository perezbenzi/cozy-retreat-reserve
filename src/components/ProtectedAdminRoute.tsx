
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
        console.log("ProtectedAdminRoute: No user logged in");
        setIsAdmin(false);
        setCheckingRole(false);
        return;
      }
      
      try {
        console.log("ProtectedAdminRoute: Checking admin role for user:", user.id, user.email);
        const { data, error } = await supabase
          .rpc('has_role', { _role: requiredRole });
          
        if (error) {
          console.error(`ProtectedAdminRoute: Error checking ${requiredRole} role:`, error);
          setIsAdmin(false);
          toast.error(`Error verificando permisos de ${requiredRole}`);
        } else {
          // Log the exact response from the has_role function
          console.log(`ProtectedAdminRoute: ${requiredRole} check result (raw):`, data);
          console.log(`ProtectedAdminRoute: ${requiredRole} check result type:`, typeof data);
          
          // Explicitly cast to boolean to ensure we have a definitive true/false
          const hasAdminRole = Boolean(data);
          console.log(`ProtectedAdminRoute: User has ${requiredRole} role:`, hasAdminRole);
          
          setIsAdmin(hasAdminRole);
          
          if (!hasAdminRole) {
            console.log("ProtectedAdminRoute: User does not have admin role, will redirect");
            toast.error(`Necesitas permisos de ${requiredRole} para acceder a esta página`);
            navigate("/dashboard");
          }
        }
      } catch (error) {
        console.error(`ProtectedAdminRoute: Failed to check ${requiredRole} role:`, error);
        setIsAdmin(false);
        setCheckingRole(false);
      } finally {
        setCheckingRole(false);
      }
    };
    
    checkAdminRole();
  }, [user, requiredRole, navigate]);

  // Handle redirections based on auth status and admin role
  useEffect(() => {
    // Only perform redirects after both auth check and role check are complete
    if (!loading && !checkingRole) {
      if (!user) {
        console.log("ProtectedAdminRoute: No user logged in, redirecting to admin login");
        toast.error("Debes iniciar sesión para acceder al panel de administración");
        navigate("/admin/login");
      } else if (isAdmin === false) {
        console.log("ProtectedAdminRoute: User is not admin, redirecting to dashboard");
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
  if (!user || isAdmin !== true) {
    console.log("ProtectedAdminRoute: Not rendering admin content. User:", !!user, "isAdmin:", isAdmin);
    return null;
  }
  
  console.log("ProtectedAdminRoute: Rendering admin content");
  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedAdminRoute;
