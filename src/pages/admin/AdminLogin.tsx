
import { useState } from 'react';
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
  
  // Check if user is admin
  const checkAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { _role: 'admin' });
        
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error("Failed to check admin role:", error);
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
      
      // Check if the user is an admin after successful login
      // This will be handled by ProtectedAdminRoute component
      // We just need to wait for auth state to update
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login");
      setIsLoading(false);
    }
  };
  
  // If user is logged in, check if they're an admin
  if (user) {
    if (isAdminUser === null) {
      // Check if user is an admin
      checkAdmin(user.id).then(isAdmin => {
        setIsAdminUser(isAdmin);
        if (isAdmin) {
          navigate('/admin');
        }
      });
      return (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }
    
    // If user is not an admin, show error message
    if (isAdminUser === false) {
      toast.error("You don't have administrator privileges");
      return <Navigate to="/login" />;
    }
    
    // If user is admin, redirect to admin dashboard
    return <Navigate to="/admin" />;
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
          <CardTitle className="text-2xl text-center">Admin Panel</CardTitle>
          <CardDescription className="text-center">
            Please sign in with your administrator credentials
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
              <Label htmlFor="password">Password</Label>
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
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full text-sm text-muted-foreground">
            Administrator accounts are created by system administrators.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
