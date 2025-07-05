
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    // Collapse navbar when not on home page
    setIsExpanded(isHomePage);
    setIsMobileMenuOpen(false);
  }, [location.pathname, isHomePage]);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Weather Display', path: '/weather' },
    { name: 'Mars Rover Photos', path: '/mars-gallery' },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className={cn(
          "transition-all duration-70000 ease-in-out",
          isExpanded 
            ? "bg-black/80 backdrop-blur-md border border-border/20 rounded-2xl" 
            : "flex justify-between items-center"
        )}>
          {isExpanded ? (
            // Full navbar (home page)
            <div className="px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link to={"/"}>
                <img
                  src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪐</text></svg>" type="image/svg+xml"
                  alt="SkyNet Logo"
                  className="w-8 h-8 rounded object-cover"
                /> </Link> <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    SkyNet
                  </span>
                

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors duration-200",
                        location.pathname === item.path
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Auth buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    {isAuthenticated ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </Button>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button variant="ghost" size="sm">
                            Sign in
                          </Button>
                        </Link>
                        <Link to="/signup">
                          <Button size="sm">
                            Sign up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Split navbar (other pages)
            <>
              {/* Left side - Logo only in circle */}
              <div className="fixed top-4 left-8 z-50">
                <Link 
                  to="/" 
                  className="flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-md border border-border/20 rounded-full transition-all duration-700 hover:scale-110"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded transform rotate-12"></div>
                </Link>
              </div>

              {/* Right side - Hamburger menu */}
              <div className="fixed top-4 right-8 z-50">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-md border border-border/20 rounded-full transition-all duration-500 hover:scale-110"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Menu className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile/Hamburger Menu Dropdown */}
      {(isMobileMenuOpen || (isExpanded && isMobileMenuOpen)) && (
        <div className={cn(
          "fixed z-40 transition-all duration-500 origin-top",
          isExpanded 
            ? "top-20 left-1/2 transform -translate-x-1/2 w-full max-w-sm"
            : "top-20 right-8 origin-top-right"
        )}>
          <div className={cn(
            "transition-all duration-500",
            isMobileMenuOpen 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          )}>
            <div className="bg-black/90 backdrop-blur-md border border-border/20 rounded-xl py-4 px-2 min-w-[200px]">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/10",
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground",
                    "animate-fade-in"
                  )}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Auth section */}
              <div className="border-t border-border/20 mt-2 pt-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/10 text-muted-foreground hover:text-foreground"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 text-center"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
