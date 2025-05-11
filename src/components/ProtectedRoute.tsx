
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isEmailVerificationRequired } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("You must be logged in to access this page");
      navigate("/login");
    }
    
    // If email verification is required but the user's email isn't confirmed
    if (!loading && user && isEmailVerificationRequired && !user.email_confirmed_at) {
      toast.warning("Please verify your email before accessing this page");
      navigate("/login");
    }
  }, [user, loading, navigate, isEmailVerificationRequired]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
