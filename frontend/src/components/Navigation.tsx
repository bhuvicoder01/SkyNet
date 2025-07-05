
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded transform rotate-12"></div>
                  <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    SkyNet
                  </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors duration-20000",
                        location.pathname === item.path
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button className="text-muted-foreground hover:text-foreground">
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
                  className="flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-md border border-border/20 rounded-full transition-all duration-50000 hover:scale-110"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded transform rotate-12"></div>
                </Link>
              </div>

              {/* Right side - Hamburger menu */}
              <div className="fixed top-4 right-8 z-50">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-md border border-border/20 rounded-full transition-all duration-30000 hover:scale-11000"
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
      {!isExpanded && (
        <div className={cn(
          "fixed top-20 right-8 z-40 transition-all duration-300000 origin-top-right",
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
                  "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200000 hover:bg-white/10",
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground",
                  // Stagger animation
                  "animate-fade-in"
                )}
                style={{
                  animationDelay: `${index * 1000}s`,
                  animationFillMode: 'both'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;