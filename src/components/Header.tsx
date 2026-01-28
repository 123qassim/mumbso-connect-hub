import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import mumbsoLogo from "@/assets/mumbso-logo.jpg";

interface NavItem {
  path?: string;
  label: string;
  submenu?: NavSubitem[];
}

interface NavSubitem {
  path: string;
  label: string;
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const headerRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const navItems: NavItem[] = [
    { path: "/", label: "Home" },
    {
      label: "About",
      submenu: [
        { path: "/about", label: "About Us" },
        { path: "/constitution", label: "Constitution" },
      ],
    },
    {
      label: "Programs & Research",
      submenu: [
        { path: "/programs", label: "Programs" },
        { path: "/research", label: "Research" },
      ],
    },
    {
      label: "Updates",
      submenu: [
        { path: "/events", label: "Events" },
        { path: "/news", label: "News" },
      ],
    },
    { path: "/members", label: "Members" },
    { path: "/support", label: "Support Us" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" ref={headerRef}>
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={mumbsoLogo} 
            alt="MUMBSO Logo" 
            className="h-12 w-12 object-contain"
          />
          <span className="hidden font-bold sm:inline-block lg:text-base text-sm">MUMBSO</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.submenu ? (
                // Dropdown Menu
                <button className="flex items-center gap-1 px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors hover:bg-muted text-text-secondary hover:text-primary group-hover:text-primary">
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
              ) : (
                // Regular Link
                <Link
                  to={item.path!}
                  className={`flex items-center px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors hover:bg-muted whitespace-nowrap ${
                    isActive(item.path!) ? "text-primary bg-muted" : "text-text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown Content */}
              {item.submenu && (
                <div className="absolute left-0 top-full hidden group-hover:block pt-1 z-50">
                  <div className="bg-background border border-border rounded-md shadow-lg min-w-max">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.path}
                        to={subitem.path}
                        className={`block px-4 py-2 text-sm font-medium transition-colors first:rounded-t-md last:rounded-b-md hover:bg-muted ${
                          isActive(subitem.path) ? "text-primary bg-muted" : "text-text-secondary hover:text-primary"
                        }`}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="h-6 w-px bg-border mx-1" /> {/* Divider */}
          
          <DarkModeToggle />
          <Button variant="hero" size="sm" onClick={() => navigate("/join")} className="whitespace-nowrap">
            Join MUMBSO
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  // Mobile Accordion
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted text-text-secondary hover:text-primary"
                    >
                      {item.label}
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="bg-muted/50 rounded-md ml-4 mt-1 space-y-1">
                        {item.submenu.map((subitem) => (
                          <button
                            key={subitem.path}
                            onClick={() => handleNavigation(subitem.path)}
                            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              isActive(subitem.path)
                                ? "text-primary bg-muted"
                                : "text-text-secondary hover:text-primary hover:bg-muted"
                            }`}
                          >
                            {subitem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Regular Link
                  <button
                    onClick={() => handleNavigation(item.path!)}
                    className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.path!)
                        ? "text-primary bg-muted"
                        : "text-text-secondary hover:text-primary hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            
            <div className="h-px bg-border my-2" /> {/* Divider */}
            
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-medium">Theme</span>
              <DarkModeToggle />
            </div>
            <Button 
              variant="hero" 
              size="sm" 
              className="w-full"
              onClick={() => {
                setIsOpen(false);
                navigate("/join");
              }}
            >
              Join MUMBSO
            </Button>
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/dashboard");
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/auth");
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
