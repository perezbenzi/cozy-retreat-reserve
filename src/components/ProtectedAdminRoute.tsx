
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
  
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;
      
      try {
        console.log("Checking admin role for user:", user.id);
        const { data, error } = await supabase
          .rpc('has_role', { _role: requiredRole });
          
        if (error) {
          console.error(`Error checking ${requiredRole} role:`, error);
          setIsAdmin(false);
        } else {
          console.log(`${requiredRole} check result:`, data);
          setIsAdmin(!!data);
        }
      } catch (error) {
        console.error(`Failed to check ${requiredRole} role:`, error);
        setIsAdmin(false);
      } finally {
        setCheckingRole(false);
      }
    };
    
    if (user) {
      checkAdminRole();
    } else {
      setCheckingRole(false);
    }
  }, [user, requiredRole]);

  useEffect(() => {
    if (!loading && !checkingRole) {
      if (!user) {
        toast.error("Debes iniciar sesión para acceder al panel de administración");
        navigate("/admin/login");
      } else if (isAdmin === false) {
        toast.error(`Necesitas permisos de ${requiredRole} para acceder a esta página`);
        navigate("/dashboard");
      }
    }
  }, [user, loading, navigate, isAdmin, checkingRole, requiredRole]);

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || isAdmin === false) return null;
  
  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedAdminRoute;
