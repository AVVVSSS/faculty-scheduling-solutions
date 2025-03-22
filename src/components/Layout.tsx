
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, UserRound, School, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: Calendar },
  { name: 'Faculty', path: '/faculty', icon: UserRound },
  { name: 'Classrooms', path: '/classrooms', icon: School },
  { name: 'Subjects', path: '/subjects', icon: BookOpen },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-background/80 backdrop-blur-sm border-border hover:bg-secondary button-animation"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="relative w-full h-full flex flex-col">
              <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              <div className="relative w-3/4 h-full max-w-xs bg-card glass-panel flex flex-col z-10 py-6 px-4">
                <div className="flex items-center justify-between mb-8 px-2">
                  <h2 className="text-xl font-semibold">Faculty Scheduler</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.path}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(item.path);
                            setIsMobileMenuOpen(false);
                          }}
                          className={cn(
                            "nav-item",
                            location.pathname === item.path && "active"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <div className="mt-auto pt-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-destructive hover:text-destructive nav-item"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarOpen ? '240px' : '80px' }}
        className={cn(
          "hidden md:flex flex-col h-screen sticky top-0 glass-panel border-r",
          isSidebarOpen ? "w-60" : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {isSidebarOpen ? (
            <h2 className="text-xl font-semibold">Faculty Scheduler</h2>
          ) : (
            <span className="mx-auto text-xl font-bold">FS</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {isSidebarOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className={cn(
                    "nav-item",
                    !isSidebarOpen && "justify-center px-2",
                    location.pathname === item.path && "active"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {isSidebarOpen && <span>{item.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-destructive hover:text-destructive nav-item",
              !isSidebarOpen && "justify-center px-2"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen transition-all duration-300">
        <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
