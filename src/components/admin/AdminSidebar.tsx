
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
  
  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
    toast.success("Successfully logged out of admin panel");
  };
  
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin",
      active: location.pathname === "/admin"
    },
    {
      icon: Calendar,
      label: "Reservas",
      path: "/admin/bookings",
      active: isActive("/admin/bookings")
    },
    {
      icon: Users,
      label: "Usuarios",
      path: "/admin/users",
      active: isActive("/admin/users")
    },
    {
      icon: Settings,
      label: "Configuración",
      path: "/admin/settings",
      active: isActive("/admin/settings")
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-4">
          <span className="text-lg font-semibold">Panel de Administración</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
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
                  tooltip="Cerrar sesión"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          Panel de Administración v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
