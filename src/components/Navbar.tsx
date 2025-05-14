
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AccountMenu from "@/components/AccountMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-background/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
      <div className="container-custom flex items-center justify-between h-16">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <span className="text-xl font-semibold">TravelStay</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm ${isActive('/') ? 'font-medium text-primary' : 'text-muted-foreground hover:text-primary transition-colors'}`}
          >
            Home
          </Link>
          <Link 
            to="/rooms" 
            className={`text-sm ${isActive('/rooms') ? 'font-medium text-primary' : 'text-muted-foreground hover:text-primary transition-colors'}`}
          >
            Rooms
          </Link>
          <Link 
            to="/about" 
            className={`text-sm ${isActive('/about') ? 'font-medium text-primary' : 'text-muted-foreground hover:text-primary transition-colors'}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm ${isActive('/contact') ? 'font-medium text-primary' : 'text-muted-foreground hover:text-primary transition-colors'}`}
          >
            Contact
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <AccountMenu />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-4 pb-4">
            <Link 
              to="/" 
              onClick={closeMenu} 
              className={`px-2 py-2 rounded-md ${isActive('/') ? 'bg-secondary font-medium' : 'hover:bg-secondary/50 transition-colors'}`}
            >
              Home
            </Link>
            <Link 
              to="/rooms" 
              onClick={closeMenu} 
              className={`px-2 py-2 rounded-md ${isActive('/rooms') ? 'bg-secondary font-medium' : 'hover:bg-secondary/50 transition-colors'}`}
            >
              Rooms
            </Link>
            <Link 
              to="/about" 
              onClick={closeMenu} 
              className={`px-2 py-2 rounded-md ${isActive('/about') ? 'bg-secondary font-medium' : 'hover:bg-secondary/50 transition-colors'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={closeMenu} 
              className={`px-2 py-2 rounded-md ${isActive('/contact') ? 'bg-secondary font-medium' : 'hover:bg-secondary/50 transition-colors'}`}
            >
              Contact
            </Link>
          </div>
          
          {/* Authentication buttons */}
          <div className="flex pt-4 border-t border-border">
            {user ? (
              <div className="w-full">
                <Button 
                  variant="ghost" 
                  className="w-full flex justify-start" 
                  onClick={() => {
                    closeMenu();
                  }}
                  asChild
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login" className="flex-1" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/register" className="flex-1 ml-2" onClick={closeMenu}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
