
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is admin - this function must be definitive
  const checkAdmin = async (userId: string) => {
    try {
      console.log("AdminLogin: === INICIO VERIFICACIÓN ADMIN ===");
      console.log("AdminLogin: Usuario actual ID:", userId);
      console.log("AdminLogin: Usuario actual email:", user?.email);
      
      console.log("AdminLogin: Llamando has_role con parámetros:", { _role: 'admin' });
      const { data, error } = await supabase
        .rpc('has_role', { _role: 'admin' });
      
      console.log("AdminLogin: === RESULTADO RPC has_role ===");
      console.log("AdminLogin: Data (raw):", data);
      console.log("AdminLogin: Data (tipo):", typeof data);
      console.log("AdminLogin: Error:", error);
      console.log("AdminLogin: ================================");
        
      if (error) {
        console.error("AdminLogin: Error en RPC has_role:", error);
        console.error("AdminLogin: Error details:", {
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
      console.log("AdminLogin: Conversión a boolean:", isAdmin);
      console.log("AdminLogin: === FIN VERIFICACIÓN ADMIN ===");
      
      return isAdmin;
    } catch (error) {
      console.error("AdminLogin: Excepción en checkAdmin:", error);
      toast.error("Error verifying admin permissions");
      return false;
    }
  };
  
  // Handle admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      console.log("AdminLogin: Iniciando proceso de login admin");
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("AdminLogin: Error en signIn:", error);
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      console.log("AdminLogin: Login exitoso, esperando verificación admin...");
      // Authentication successful, but we need to check for admin role separately
      // This is handled in the effect below when the user state updates
    } catch (error: any) {
      console.error("AdminLogin: Excepción en handleAdminLogin:", error);
      toast.error(error.message || "An error occurred during login");
      setIsLoading(false);
    }
  };
  
  // If user is logged in, immediately check if they're an admin
  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (user) {
        console.log("AdminLogin: === EFECTO useEffect ACTIVADO ===");
        console.log("AdminLogin: Usuario detectado:", {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        });
        
        setIsLoading(true);
        const isAdmin = await checkAdmin(user.id);
        setIsAdminUser(isAdmin);
        
        console.log("AdminLogin: Resultado final isAdmin:", isAdmin);
        
        if (isAdmin) {
          console.log("AdminLogin: Usuario ES admin, navegando a /admin");
          navigate('/admin');
          toast.success("Bienvenido al panel de administración");
        } else {
          console.log("AdminLogin: Usuario NO es admin, navegando a /dashboard");
          toast.error("No tienes privilegios de administrador");
          navigate('/dashboard');
        }
        setIsLoading(false);
      } else {
        console.log("AdminLogin: No hay usuario logueado");
      }
    };
    
    if (user) {
      verifyAdminStatus();
    }
  }, [user, navigate]);
  
  // If user is logged in, show loading until admin check is complete
  if (user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-2">Verificando permisos de administrador...</p>
      </div>
    );
  }
  
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
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
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
