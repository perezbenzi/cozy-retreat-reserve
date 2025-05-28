
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean | null;
  adminLoading: boolean;
  signUp: (email: string, password: string, metadata?: { firstName?: string, lastName?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  checkAdminStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load cached admin status from localStorage
  const loadCachedAdminStatus = (userId: string) => {
    try {
      const cached = localStorage.getItem(`admin_status_${userId}`);
      if (cached !== null) {
        const adminStatus = JSON.parse(cached);
        console.log("AuthContext: Loaded cached admin status:", adminStatus);
        setIsAdmin(adminStatus);
        return adminStatus;
      }
    } catch (error) {
      console.error("AuthContext: Error loading cached admin status:", error);
    }
    return null;
  };

  // Cache admin status in localStorage
  const cacheAdminStatus = (userId: string, adminStatus: boolean) => {
    try {
      localStorage.setItem(`admin_status_${userId}`, JSON.stringify(adminStatus));
      console.log("AuthContext: Cached admin status:", adminStatus);
    } catch (error) {
      console.error("AuthContext: Error caching admin status:", error);
    }
  };

  // Clear cached admin status
  const clearCachedAdminStatus = () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('admin_status_')) {
          localStorage.removeItem(key);
        }
      });
      console.log("AuthContext: Cleared all cached admin status");
    } catch (error) {
      console.error("AuthContext: Error clearing cached admin status:", error);
    }
  };

  // Check admin status from database
  const checkAdminStatus = async () => {
    if (!user?.id) {
      setIsAdmin(false);
      return;
    }

    // First check if we have cached status
    const cachedStatus = loadCachedAdminStatus(user.id);
    if (cachedStatus !== null) {
      return; // Use cached status, no need to call database
    }

    setAdminLoading(true);
    try {
      console.log("AuthContext: Checking admin status for user:", user.id);
      
      const { data, error } = await supabase
        .rpc('has_role', { _role: 'admin' });
      
      console.log("AuthContext: Admin check result - data:", data, "error:", error);
        
      if (error) {
        console.error("AuthContext: Error checking admin role:", error);
        setIsAdmin(false);
        cacheAdminStatus(user.id, false);
      } else {
        const adminStatus = Boolean(data);
        console.log("AuthContext: User is admin:", adminStatus);
        setIsAdmin(adminStatus);
        cacheAdminStatus(user.id, adminStatus);
      }
    } catch (error) {
      console.error("AuthContext: Exception checking admin role:", error);
      setIsAdmin(false);
      cacheAdminStatus(user.id, false);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("AuthContext: Auth state changed:", event);
        console.log("AuthContext: Session:", currentSession ? "exists" : "null");
        console.log("AuthContext: Current location:", location.pathname);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && currentSession?.user) {
          // Load cached admin status immediately for faster UI updates
          const cachedStatus = loadCachedAdminStatus(currentSession.user.id);
          if (cachedStatus === null) {
            // No cached status, check from database
            checkAdminStatusForUser(currentSession.user);
          }

          // Handle redirections based on login page
          if (location.pathname === '/login') {
            console.log("AuthContext: Regular login - redirecting to dashboard");
            navigate('/dashboard');
            toast.success("Successfully logged in!");
          } else if (location.pathname === '/admin/login') {
            console.log("AuthContext: Admin login - redirecting to admin dashboard");
            navigate('/admin');
            toast.success("Successfully logged in!");
          }
        }
        
        if (event === 'SIGNED_OUT') {
          console.log("AuthContext: User signed out, clearing admin status");
          setIsAdmin(null);
          clearCachedAdminStatus();
          navigate('/');
          toast.success("Successfully logged out!");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("AuthContext: Initial session:", session ? "exists" : "null");
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Load cached admin status for existing session
        loadCachedAdminStatus(session.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Separate function to check admin status for a specific user
  const checkAdminStatusForUser = async (userToCheck: User) => {
    setAdminLoading(true);
    try {
      console.log("AuthContext: Checking admin status for user:", userToCheck.id);
      
      const { data, error } = await supabase
        .rpc('has_role', { _role: 'admin' });
      
      console.log("AuthContext: Admin check result - data:", data, "error:", error);
        
      if (error) {
        console.error("AuthContext: Error checking admin role:", error);
        setIsAdmin(false);
        cacheAdminStatus(userToCheck.id, false);
      } else {
        const adminStatus = Boolean(data);
        console.log("AuthContext: User is admin:", adminStatus);
        setIsAdmin(adminStatus);
        cacheAdminStatus(userToCheck.id, adminStatus);
      }
    } catch (error) {
      console.error("AuthContext: Exception checking admin role:", error);
      setIsAdmin(false);
      cacheAdminStatus(userToCheck.id, false);
    } finally {
      setAdminLoading(false);
    }
  };

  // Check admin status when user changes (but not on initial load if cached)
  useEffect(() => {
    if (user?.id && isAdmin === null) {
      checkAdminStatus();
    }
  }, [user?.id]);

  const signUp = async (email: string, password: string, metadata?: { firstName?: string, lastName?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    } catch (error: any) {
      toast.error(error.message || "An error occurred during Google login");
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      toast.error(error.message || "An error occurred during logout");
    }
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    adminLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    checkAdminStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
