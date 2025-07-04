
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useAuth } from '@/context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from '@/hooks/useTranslation';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    signUp,
    signInWithGoogle,
    user
  } = useAuth();
  const { t } = useTranslation();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error(t.auth.passwordsDontMatch);
      return;
    }
    if (!agreeTerms) {
      toast.error(t.auth.agreeToTermsError);
      return;
    }
    setIsLoading(true);
    try {
      const {
        error
      } = await signUp(email, password, {
        firstName,
        lastName
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t.auth.registrationSuccess);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
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
              <CardTitle className="text-2xl text-center">{t.auth.registerTitle}</CardTitle>
              <CardDescription className="text-center">
                {t.auth.registerDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t.auth.firstName}</Label>
                    <Input id="firstName" placeholder="John" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t.auth.lastName}</Label>
                    <Input id="lastName" placeholder="Doe" required value={lastName} onChange={e => setLastName(e.target.value)} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t.auth.email}</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">{t.auth.password}</Label>
                  <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={agreeTerms} onCheckedChange={checked => setAgreeTerms(checked as boolean)} />
                  <label htmlFor="terms" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {t.auth.agreeToTerms}{" "}
                    <Link to="/terms" className="text-accent hover:underline">
                      {t.auth.termsOfService}
                    </Link>
                    {" "}{t.auth.and}{" "}
                    <Link to="/privacy" className="text-accent hover:underline">
                      {t.auth.privacyPolicy}
                    </Link>
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t.auth.creatingAccount : t.auth.register}
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
                  <FcGoogle className="h-5 w-5" /> {t.auth.signUpWithGoogle}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-center w-full text-sm">
                {t.auth.alreadyHaveAccount}{" "}
                <Link to="/login" className="text-accent font-medium hover:underline">
                  {t.auth.login}
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

export default Register;
