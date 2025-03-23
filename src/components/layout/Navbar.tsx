
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  label: string;
  active: boolean;
}

const NavLink = ({ to, label, active }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "relative px-4 py-2 text-sm font-medium transition-colors",
      active 
        ? "text-primary" 
        : "text-muted-foreground hover:text-primary"
    )}
  >
    {label}
    {active && (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
    )}
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Check scroll position immediately on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/venues', label: 'Venues' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  // Determine if we're on a page that needs a solid navbar background
  const needsSolidBackground = location.pathname === '/login' || 
                               location.pathname === '/register' || 
                               location.pathname.includes('/dashboard');

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled || needsSolidBackground || isMobileMenuOpen
          ? "bg-white shadow-sm dark:bg-gray-900 border-b" 
          : "bg-white/80 backdrop-blur-md border-b dark:bg-gray-900/80"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              BanquetHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                label={link.label}
                active={location.pathname === link.to}
              />
            ))}
          </nav>

          {/* Auth & Mobile Menu Buttons */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
                  <User size={16} />
                  <span>Account</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 animate-fade-in bg-white dark:bg-gray-900">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="cursor-pointer">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="cursor-pointer">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="default" size="sm" className="hidden md:inline-flex">
              <Link to="/booking">Book Now</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-16 md:hidden">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "py-3 text-lg font-medium border-b border-border transition-colors",
                    location.pathname === link.to 
                      ? "text-primary" 
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-4">
              <Button variant="outline" className="w-full justify-center py-6">
                <Link to="/login" className="w-full">Login</Link>
              </Button>
              <Button variant="default" className="w-full justify-center py-6">
                <Link to="/register" className="w-full">Register</Link>
              </Button>
              <Button variant="secondary" className="w-full justify-center py-6 mt-2">
                <Link to="/booking" className="w-full">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
