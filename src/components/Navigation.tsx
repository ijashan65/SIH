import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  GraduationCap,
  Users,
  Calendar,
  Briefcase,
  Heart,
  User,
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: GraduationCap },
    { href: "/alumni", label: "Alumni Directory", icon: Users },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/jobs", label: "Opportunities", icon: Briefcase },
    { href: "/support", label: "Support", icon: Heart },
  ];

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                AlumniConnect
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Building Lifelong Networks
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-primary shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>

                  {/* underline animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div
            className="hidden md:flex items-center space-x-4 relative"
            ref={dropdownRef}
          >
            {role ? (
              <>
                <Button
                  className="rounded-full w-10 h-10 flex items-center justify-center font-bold bg-primary text-white hover:scale-105 transition-transform shadow-md"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {role === "admin" ? "AD" : role.charAt(0).toUpperCase()}
                </Button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg animate-fadeIn">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Button
                variant="hero"
                asChild
                className="bg-primary text-white shadow-md hover:opacity-90 transition-all"
              >
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md animate-fadeIn">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`relative flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white bg-primary shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>

                    {/* underline animation */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                );
              })}

              {/* Mobile Auth */}
              <div className="pt-4 space-y-2">
                {role ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="hero"
                    className="w-full bg-primary text-white shadow-md hover:opacity-90 transition-all"
                    asChild
                  >
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
