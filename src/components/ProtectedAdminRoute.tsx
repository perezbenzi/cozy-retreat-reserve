
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import AdminLayout from "@/components/admin/AdminLayout";

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
  
  // Mock role check since we don't have a real role system yet
  // This would normally check against the user's actual role
  const hasAccess = !!user;

  useEffect(() => {
    if (!loading && !user) {
      toast.error("You must be logged in to access the admin panel");
      navigate("/login");
    } else if (!loading && user && !hasAccess) {
      toast.error(`You need ${requiredRole} permissions to access this page`);
      navigate("/");
    }
  }, [user, loading, navigate, hasAccess, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !hasAccess) return null;
  
  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedAdminRoute;
