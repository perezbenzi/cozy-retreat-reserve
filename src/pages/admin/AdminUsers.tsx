import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, UserPlusIcon } from "lucide-react";

interface UserWithRole {
  id: string;
  email: string;
  isAdmin: boolean;
  created_at: string;
}

// Define a specific interface for Supabase Auth user that won't conflict with any imported User type
interface AdminAuthUser {
  id: string;
  email: string | null;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [promoting, setPromoting] = useState(false);

  // Fetch all users and their admin status
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Get all auth users through Supabase admin functions
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error("Error fetching users:", authError);
        setUsers([]);
        return;
      }

      const authUsers = authData?.users || [];
      
      if (!authUsers || authUsers.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      // Get admin roles
      const { data: adminRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id");

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
        toast.error("Failed to load user roles");
      }

      // Map admin user IDs for quick lookup
      const adminIds = new Set((adminRoles || []).map(role => role.user_id));

      // Use explicit type assertion to fix the type mismatch
      const combinedUsers = authUsers.map((user: any) => ({
        id: user.id,
        email: user.email || "No email",
        isAdmin: adminIds.has(user.id),
        created_at: user.created_at
      }));

      setUsers(combinedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Promote user to admin by email
  const promoteToAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminEmail) {
      toast.error("Please enter a user email");
      return;
    }

    setPromoting(true);
    try {
      // First, get the user ID from the email
      const { data: authData, error: userError } = await supabase.auth.admin.listUsers();
      
      if (userError) {
        console.error("Error fetching users:", userError);
        toast.error("Could not fetch users to find email");
        setPromoting(false);
        return;
      }
      
      const authUsers = authData?.users || [];
      // Fix the type mismatch by using explicit any type
      const user = authUsers.find((u: any) => 
        u.email?.toLowerCase() === adminEmail.toLowerCase()
      );
      
      if (!user) {
        toast.error("User not found with this email");
        setPromoting(false);
        return;
      }

      console.log("Found user with ID:", user.id);
      
      // Check if already admin
      const { data: existingRole } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();
        
      if (existingRole) {
        toast.info("This user is already an admin");
        setPromoting(false);
        return;
      }

      // Check if user exists in auth.users
      const { data: authUserCheck, error: authCheckError } = await supabase.auth.admin.getUserById(user.id);
      
      if (authCheckError || !authUserCheck?.user) {
        console.error("User doesn't exist in auth.users:", authCheckError);
        toast.error("This user ID is not valid in the authentication system");
        setPromoting(false);
        return;
      }

      // Add admin role
      const { error: insertError } = await supabase
        .from("user_roles")
        .insert({ 
          user_id: user.id, 
          role: "admin" 
        });

      if (insertError) {
        console.error("Error promoting user:", insertError);
        toast.error(`Failed to promote user: ${insertError.message}`);
        setPromoting(false);
        return;
      }
      
      toast.success(`${adminEmail} has been promoted to admin`);
      setAdminEmail("");
      await fetchUsers(); // Refresh the user list
    } catch (error: any) {
      console.error("Error promoting user:", error);
      toast.error(error.message || "Failed to promote user");
    } finally {
      setPromoting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button onClick={fetchUsers} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Promote User to Admin</CardTitle>
          <CardDescription>
            Enter a user's email address to grant them admin privileges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={promoteToAdmin} className="flex space-x-2">
            <Input
              placeholder="user@example.com"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              disabled={promoting}
              className="flex-1"
            />
            <Button type="submit" disabled={promoting}>
              {promoting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 
                  Processing
                </>
              ) : (
                <>
                  <UserPlusIcon className="mr-2 h-4 w-4" /> 
                  Make Admin
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>User ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.isAdmin ? (
                            <Badge variant="default">Admin</Badge>
                          ) : (
                            <Badge variant="outline">User</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {user.id}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
