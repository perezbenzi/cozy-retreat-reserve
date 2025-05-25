import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { LogOut, Settings, User, CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

const AccountMenu = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile(data as Profile);
      }
      
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      console.log("AccountMenu: Starting logout process");
      await signOut();
      console.log("AccountMenu: Logout completed successfully");
    } catch (error) {
      console.error("AccountMenu: Error during logout:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link to="/login">Log in</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Sign up</Link>
        </Button>
      </div>
    );
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    } else if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };
  
  // Get display name
  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    } else if (profile?.first_name) {
      return profile.first_name;
    } else if (user.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={profile?.avatar_url || undefined} alt={getDisplayName()} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{getDisplayName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5 text-sm font-medium">
          {user.email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex cursor-pointer items-center">
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/reservations" className="flex cursor-pointer items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            My Reservations
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account" className="flex cursor-pointer items-center">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex cursor-pointer items-center text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
