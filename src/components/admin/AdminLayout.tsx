
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  LayoutDashboard, 
  Users, 
  Hotel, 
  Settings,
  Menu,
  X,
  UserCog
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/bookings", icon: Calendar, label: "Bookings" },
    { path: "/admin/users", icon: UserCog, label: "User Management" },
    { path: "/admin/guests", icon: Users, label: "Guests" },
    { path: "/admin/rooms", icon: Hotel, label: "Rooms" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden fixed z-50 top-4 left-4"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-300 bg-background border-r ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <Link to="/admin" className="text-xl font-semibold">
              Admin Panel
            </Link>
          </div>
          
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary/50"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t">
            <Link 
              to="/"
              className="w-full inline-flex justify-center rounded-md px-3 py-2 text-sm bg-secondary hover:bg-secondary/80"
            >
              Return to Site
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
