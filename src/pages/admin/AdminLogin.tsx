
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is admin - this function must be definitive
  const checkAdmin = async (userId: string) => {
    try {
      console.log("=== INICIO VERIFICACIÓN ADMIN ===");
      console.log("checkAdmin: Usuario ID:", userId);
      console.log("checkAdmin: Usuario email:", user?.email);
      
      console.log("checkAdmin: Llamando RPC has_role con parámetros:", { _role: 'admin' });
      const { data, error } = await supabase
        .rpc('has_role', { _role: 'admin' });
      
      console.log("=== RESULTADO RPC has_role ===");
      console.log("checkAdmin: Data (raw):", data);
      console.log("checkAdmin: Data (tipo):", typeof data);
      console.log("checkAdmin: Error:", error);
      console.log("================================");
        
      if (error) {
        console.error("checkAdmin: Error en RPC has_role:", error);
        console.error("checkAdmin: Error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast.error("Error verifying admin permissions");
        return false;
      }
      
      // Explicitly cast to boolean to ensure we have a definitive true/false
      const isAdmin = Boolean(data);
      console.log("checkAdmin: Conversión a boolean:", isAdmin);
      console.log("=== FIN VERIFICACIÓN ADMIN ===");
      
      return isAdmin;
    } catch (error) {
      console.error("checkAdmin: Excepción:", error);
      toast.error("Error verifying admin permissions");
      return false;
    }
  };
  
  // Handle admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      console.log("=== INICIO LOGIN ADMIN ===");
      console.log("handleAdminLogin: Iniciando proceso de login admin");
      console.log("handleAdminLogin: Email:", email);
      
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("handleAdminLogin: Error en signIn:", error);
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      console.log("handleAdminLogin: Login exitoso, obteniendo sesión actual...");
      
      // Get the current session to verify admin immediately
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.user) {
        console.error("handleAdminLogin: Error obteniendo sesión:", sessionError);
        toast.error("Error al verificar sesión");
        setIsLoading(false);
        return;
      }
      
      console.log("handleAdminLogin: Sesión obtenida, verificando roles para usuario:", session.user.id);
      
      // Check if user is admin immediately
      const isAdmin = await checkAdmin(session.user.id);
      console.log("handleAdminLogin: Resultado verificación admin:", isAdmin);
      
      if (isAdmin) {
        console.log("handleAdminLogin: Usuario ES admin, navegando a /admin");
        navigate('/admin');
        toast.success("Bienvenido al panel de administración");
      } else {
        console.log("handleAdminLogin: Usuario NO es admin, navegando a /dashboard");
        toast.error("No tienes privilegios de administrador");
        navigate('/dashboard');
      }
      
    } catch (error: any) {
      console.error("handleAdminLogin: Excepción:", error);
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
      console.log("=== FIN LOGIN ADMIN ===");
    }
  };
  
  // If user is already logged in, redirect them
  if (user) {
    console.log("AdminLogin: Usuario ya logueado, verificando admin...");
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-2">Ya estás logueado, verificando permisos...</p>
      </div>
    );
  }
  
  console.log("AdminLogin: Renderizando formulario de login");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Panel de Administración</CardTitle>
          <CardDescription className="text-center">
            Inicia sesión con tus credenciales de administrador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verificando permisos...' : 'Iniciar sesión'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full text-sm text-muted-foreground">
            Las cuentas de administrador son creadas por administradores del sistema.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
