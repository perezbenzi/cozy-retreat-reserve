
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
import { Shield } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Handle admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      console.log("AdminLogin: Starting admin login process");
      
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("AdminLogin: Error in signIn:", error);
        toast.error(error.message);
      }
      // AuthContext will handle admin verification and redirection
      
    } catch (error: any) {
      console.error("AdminLogin: Exception:", error);
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };
  
  // If user is already logged in, redirect them
  if (user) {
    console.log("AdminLogin: User already logged in, showing loading");
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-2">{t.admin.alreadyLoggedIn}</p>
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
          <CardTitle className="text-2xl text-center">{t.admin.adminPanel}</CardTitle>
          <CardDescription className="text-center">
            {t.admin.loginWithCredentials}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
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
              <Label htmlFor="password">{t.auth.password}</Label>
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
              {isLoading ? t.admin.verifyingPermissions : t.auth.login}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full text-sm text-muted-foreground">
            {t.admin.adminAccountsNote}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
