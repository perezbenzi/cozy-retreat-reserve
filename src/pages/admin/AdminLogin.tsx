
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
      console.log("AdminLogin: Checking admin role for user:", userId);
      const { data, error } = await supabase
        .rpc('has_role', { _role: 'admin' });
        
      if (error) {
        console.error("AdminLogin: Error checking admin role:", error);
        toast.error("Error verifying admin permissions");
        return false;
      }
      
      // Log the exact response from the has_role function
      console.log("AdminLogin: Admin check result (raw):", data);
      console.log("AdminLogin: Admin check result type:", typeof data);
      
      // Explicitly cast to boolean to ensure we have a definitive true/false
      const isAdmin = Boolean(data);
      console.log("AdminLogin: Is user admin:", isAdmin);
      
      return isAdmin;
    } catch (error) {
      console.error("AdminLogin: Failed to check admin role:", error);
      toast.error("Error verifying admin permissions");
      return false;
    }
  };
  
  // Handle admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      // Authentication successful, but we need to check for admin role separately
      // This is handled in the effect below when the user state updates
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login");
      setIsLoading(false);
    }
  };
  
  // If user is logged in, immediately check if they're an admin
  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (user) {
        console.log("AdminLogin: User logged in, checking admin status:", user.id, user.email);
        setIsLoading(true);
        const isAdmin = await checkAdmin(user.id);
        setIsAdminUser(isAdmin);
        
        if (isAdmin) {
          console.log("AdminLogin: User is admin, navigating to admin dashboard");
          navigate('/admin');
        } else {
          // If not admin, show error and redirect to regular dashboard
          console.log("AdminLogin: User is NOT admin, redirecting to dashboard");
          toast.error("No tienes privilegios de administrador");
          navigate('/dashboard');
        }
        setIsLoading(false);
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
