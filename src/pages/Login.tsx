
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login attempt
    setTimeout(() => {
      setIsLoading(false);
      
      // Display toast message - will be replaced with actual authentication
      toast.info("This is a demo. Supabase authentication will be implemented here.");
      
      // Clear the form
      setEmail('');
      setPassword('');
    }, 1500);
  };
  
  return (
    <>
      <Navbar />
      
      <main className="mt-16 flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 bg-secondary/50">
        <div className="container-custom max-w-md">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Log in to your account</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                      Forgot password?
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
                  {isLoading ? 'Logging in...' : 'Log in'}
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
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button variant="outline" type="button" className="w-full">Google</Button>
                <Button variant="outline" type="button" className="w-full">Facebook</Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-center w-full text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-accent font-medium hover:underline">
                  Create an account
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
