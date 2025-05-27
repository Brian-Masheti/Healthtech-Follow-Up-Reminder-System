import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Bell, BarChart3, Settings, LogOut, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const DashboardLayout = ({ children, currentPage }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleNav = (id: string) => {
    switch (id) {
      case 'dashboard':
        navigate('/admin');
        break;
      case 'appointments':
        navigate('/admin?section=appointments');
        break;
      case 'patients':
        navigate('/admin?section=patients');
        break;
      case 'reminders':
        navigate('/admin?section=reminders');
        break;
      case 'settings':
        navigate('/admin?section=settings');
        break;
      default:
        navigate('/admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('healthcareUser');
    navigate('/login');
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    // Check for user preference in localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast({
        title: "Dark mode enabled",
        description: "Your eyes will thank you!",
      });
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast({
        title: "Light mode enabled",
        description: "Bright and clear!",
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-30 transition-colors duration-200">
        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">HC</span>
                        </div>
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">HealthCare Reminders</h1>
                      </div>
                    </div>
                    <nav className="flex-1 p-4">
                      <ul className="space-y-1">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <li key={item.id}>
                              <button
                                onClick={() => {
                                  handleNav(item.id);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                  currentPage === item.id
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HC</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">HealthCare Reminders</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleDarkMode}
                className="h-8 w-8 text-gray-700 dark:text-gray-300"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <span className="hidden md:flex text-sm font-medium text-gray-700 dark:text-gray-200 items-center">
                {(() => {
                  try {
                    const user = JSON.parse(localStorage.getItem('healthcareUser') || '{}');
                    const userName = user?.name || '';
                    const userRole = user?.role || '';
                    if (userName && userRole) {
                      if (userRole === 'admin') return `Admin: ${userName}`;
                      if (userRole === 'provider') return `Dr. ${userName}`;
                      if (userRole === 'patient') return `Patient: ${userName}`;
                      return userName;
                    }
                    return '';
                  } catch {
                    return '';
                  }
                })()}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - only visible on desktop */}
        <nav className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)] shrink-0 sticky top-16 transition-colors duration-200">
          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNav(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        currentPage === item.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 max-w-full overflow-x-hidden transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;