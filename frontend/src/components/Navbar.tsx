import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useTheme } from '@/components/ThemeProvider';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // Try to get doctor name from localStorage (adjust key if needed)
  const { theme, setTheme } = useTheme();
  let doctorName = '';
  try {
    const user = JSON.parse(localStorage.getItem('healthcareUser') || '{}');
    doctorName = user?.name || user?.doctorName || user?.email || '';
  } catch {
    doctorName = '';
  }

  const handleLogout = () => {
    localStorage.removeItem('healthcareUser');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow flex items-center justify-between px-6 py-3 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <div className="rounded bg-green-600 text-white px-3 py-1 font-bold text-lg tracking-wide">HC</div>
        <span className="font-semibold text-xl text-gray-800">HealthCare Reminders</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-700">{doctorName ? `Dr. ${doctorName}` : ''}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut className="w-5 h-5 text-gray-600" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

