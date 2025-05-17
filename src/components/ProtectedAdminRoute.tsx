
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedAdminRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "staff";
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
        const { data, error } = await supabase
          .rpc('has_role', { _role: 'admin' });
          
        if (error) {
          console.error("Error checking admin role:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      } catch (error) {
        console.error("Failed to check admin role:", error);
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
  }, [user]);

  useEffect(() => {
    if (!loading && !checkingRole) {
      if (!user) {
        toast.error("You must be logged in to access the admin panel");
        navigate("/admin/login");
      } else if (!isAdmin) {
        toast.error(`You need ${requiredRole} permissions to access this page`);
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

  if (!user || !isAdmin) return null;
  
  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedAdminRoute;
