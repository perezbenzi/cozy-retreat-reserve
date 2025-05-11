
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
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Function to check if we're in production
const isProduction = (): boolean => {
  return window.location.hostname.includes('lovable.app') || 
         window.location.hostname === 'cozy-retreat-reserve.lovable.app';
};

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

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect if in production
  if (isProduction()) {
    toast.error("Registration is disabled in production mode");
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Disable authentication functionality per client request
    toast.info("Authentication is temporarily disabled");
    return;
    
    // The code below is preserved but currently unreachable
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
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
        toast.success("Registration successful! Please check your email for confirmation.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    // Disable authentication functionality per client request
    toast.info("Authentication is temporarily disabled");
    return;
    
    // The code below is preserved but currently unreachable
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
              <CardTitle className="text-2xl text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authentication Disabled</AlertTitle>
                <AlertDescription>
                  Registration is temporarily disabled. Please check back later.
                </AlertDescription>
              </Alert>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required value={firstName} onChange={e => setFirstName(e.target.value)} disabled={true} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required value={lastName} onChange={e => setLastName(e.target.value)} disabled={true} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required value={email} onChange={e => setEmail(e.target.value)} disabled={true} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} disabled={true} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={true} />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={agreeTerms} onCheckedChange={checked => setAgreeTerms(checked as boolean)} disabled={true} />
                  <label htmlFor="terms" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the{" "}
                    <Link to="/terms" className="text-accent hover:underline">
                      terms of service
                    </Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-accent hover:underline">
                      privacy policy
                    </Link>
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={true}>
                  {isLoading ? 'Creating account...' : 'Sign up'}
                </Button>
              </form>
              
              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mt-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2" 
                  onClick={handleGoogleLogin}
                  disabled={true}
                >
                  <FcGoogle className="h-5 w-5" /> Sign up with Google
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-center w-full text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-accent font-medium hover:underline">
                  Log in
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
