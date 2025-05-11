
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: { firstName?: string, lastName?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Authentication is disabled per client request
    // Still setting up the session listener to maintain code structure
    // but we'll ignore any auth events
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // While authentication is disabled, we won't update state based on auth events
        // This effectively prevents any login/logout functionality
      }
    );

    // Initialize with no user/session
    setUser(null);
    setSession(null);
    setLoading(false);

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string, metadata?: { firstName?: string, lastName?: string }) => {
    // Authentication disabled per client request
    console.log("Sign up attempt blocked - authentication disabled");
    return { error: { message: "Authentication is temporarily disabled" } };
  };

  const signIn = async (email: string, password: string) => {
    // Authentication disabled per client request
    console.log("Sign in attempt blocked - authentication disabled");
    return { error: { message: "Authentication is temporarily disabled" } };
  };

  const signInWithGoogle = async () => {
    // Authentication disabled per client request
    console.log("Google sign in attempt blocked - authentication disabled");
    toast.info("Authentication is temporarily disabled");
  };

  const signOut = async () => {
    // Authentication disabled per client request
    console.log("Sign out attempt blocked - authentication disabled");
    toast.info("Authentication is temporarily disabled");
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
