
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useAdminTranslation } from "@/hooks/useAdminTranslation";
import { 
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

const AdminSidebar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useAdminTranslation();
  
  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
    toast.success("Successfully logged out of admin panel");
  };
  
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t.dashboard,
      path: "/admin",
      active: location.pathname === "/admin"
    },
    {
      icon: Calendar,
      label: t.bookings,
      path: "/admin/bookings",
      active: isActive("/admin/bookings")
    },
    {
      icon: Users,
      label: t.users,
      path: "/admin/users",
      active: isActive("/admin/users")
    },
    {
      icon: Settings,
      label: t.settings,
      path: "/admin/settings",
      active: isActive("/admin/settings")
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-4">
          <span className="text-lg font-semibold">{t.adminPanel}</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.management}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={item.active}
                    tooltip={item.label}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  tooltip={t.logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.logout}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          {t.version}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
