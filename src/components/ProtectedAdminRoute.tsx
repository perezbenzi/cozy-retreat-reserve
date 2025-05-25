
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
      console.log("ProtectedAdminRoute: === INICIO VERIFICACIÓN PROTEGIDA ===");
      console.log("ProtectedAdminRoute: loading:", loading);
      console.log("ProtectedAdminRoute: user:", user ? {
        id: user.id,
        email: user.email
      } : null);
      
      // If no user is logged in, they can't be an admin
      if (!user) {
        console.log("ProtectedAdminRoute: No hay usuario, estableciendo isAdmin = false");
        setIsAdmin(false);
        setCheckingRole(false);
        return;
      }
      
      try {
        console.log("ProtectedAdminRoute: Verificando rol admin para usuario:", user.id, user.email);
        console.log("ProtectedAdminRoute: Llamando RPC has_role con:", { _role: requiredRole });
        
        const { data, error } = await supabase
          .rpc('has_role', { _role: requiredRole });
        
        console.log("ProtectedAdminRoute: === RESULTADO RPC ===");
        console.log("ProtectedAdminRoute: Data (raw):", data);
        console.log("ProtectedAdminRoute: Data (tipo):", typeof data);
        console.log("ProtectedAdminRoute: Error:", error);
        console.log("ProtectedAdminRoute: ====================");
          
        if (error) {
          console.error("ProtectedAdminRoute: Error en has_role:", error);
          console.error("ProtectedAdminRoute: Error details:", {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          setIsAdmin(false);
          toast.error(`Error verificando permisos de ${requiredRole}`);
        } else {
          // Explicitly cast to boolean to ensure we have a definitive true/false
          const hasAdminRole = Boolean(data);
          console.log("ProtectedAdminRoute: Conversión a boolean:", hasAdminRole);
          
          setIsAdmin(hasAdminRole);
          
          if (!hasAdminRole) {
            console.log("ProtectedAdminRoute: Usuario NO tiene rol admin, preparando redirección");
            toast.error(`Necesitas permisos de ${requiredRole} para acceder a esta página`);
          } else {
            console.log("ProtectedAdminRoute: Usuario SÍ tiene rol admin, acceso permitido");
          }
        }
      } catch (error) {
        console.error("ProtectedAdminRoute: Excepción al verificar rol:", error);
        setIsAdmin(false);
        setCheckingRole(false);
      } finally {
        setCheckingRole(false);
        console.log("ProtectedAdminRoute: === FIN VERIFICACIÓN PROTEGIDA ===");
      }
    };
    
    checkAdminRole();
  }, [user, requiredRole, navigate]);

  // Handle redirections based on auth status and admin role
  useEffect(() => {
    console.log("ProtectedAdminRoute: === EFECTO REDIRECCIÓN ===");
    console.log("ProtectedAdminRoute: loading:", loading);
    console.log("ProtectedAdminRoute: checkingRole:", checkingRole);
    console.log("ProtectedAdminRoute: user:", !!user);
    console.log("ProtectedAdminRoute: isAdmin:", isAdmin);
    
    // Only perform redirects after both auth check and role check are complete
    if (!loading && !checkingRole) {
      if (!user) {
        console.log("ProtectedAdminRoute: Redirigiendo a login admin - no hay usuario");
        toast.error("Debes iniciar sesión para acceder al panel de administración");
        navigate("/admin/login");
      } else if (isAdmin === false) {
        console.log("ProtectedAdminRoute: Redirigiendo a dashboard - usuario no es admin");
        toast.error(`Necesitas permisos de ${requiredRole} para acceder a esta página`);
        navigate("/dashboard");
      } else if (isAdmin === true) {
        console.log("ProtectedAdminRoute: Acceso permitido - usuario es admin");
      }
    }
    console.log("ProtectedAdminRoute: === FIN EFECTO REDIRECCIÓN ===");
  }, [user, loading, navigate, isAdmin, checkingRole, requiredRole]);

  // Show loading state while checking auth or admin status
  if (loading || checkingRole) {
    console.log("ProtectedAdminRoute: Mostrando estado de carga");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render admin content if user is logged in AND has admin role
  if (!user || isAdmin !== true) {
    console.log("ProtectedAdminRoute: NO renderizando contenido admin. User:", !!user, "isAdmin:", isAdmin);
    return null;
  }
  
  console.log("ProtectedAdminRoute: Renderizando contenido admin exitosamente");
  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedAdminRoute;
