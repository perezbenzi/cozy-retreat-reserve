
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from '@/hooks/useTranslation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signInWithGoogle, user } = useAuth();
  const { t } = useTranslation();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      console.log("Login: Starting regular login process");
      
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("Login: Error in signIn:", error);
        toast.error(error.message);
      }
      // AuthContext will handle role verification and redirection
      
    } catch (error: any) {
      console.error("Login: Exception:", error);
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // Note: Google login will need additional role checking after redirect
    } catch (error: any) {
      toast.error(error.message || "An error occurred with Google login");
    }
  };
  
  return (
    <>
      <Navbar />
      
      <main className="mt-16 flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 bg-secondary/50">
        <div className="container-custom max-w-md">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">{t.auth.loginTitle}</CardTitle>
              <CardDescription className="text-center">
                {t.auth.loginDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.auth.email}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t.auth.password}</Label>
                    <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                      {t.auth.forgotPassword}
                    </Link>
                  </div>
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
                  {isLoading ? t.auth.loggingIn : t.auth.login}
                </Button>
              </form>
              
              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    {t.auth.orContinueWith}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mt-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle className="h-5 w-5" /> {t.auth.signInWithGoogle}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-center w-full text-sm">
                {t.auth.dontHaveAccount}{" "}
                <Link to="/register" className="text-accent font-medium hover:underline">
                  {t.auth.createAccount}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Login;
