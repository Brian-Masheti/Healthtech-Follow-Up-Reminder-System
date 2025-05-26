import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ClipboardCheck, Clock, User, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const PatientPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const section = params.get('section') || 'dashboard';
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
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
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('healthcareUser');
    toast("Logged out successfully", {
      description: "You have been logged out of your account"
    });
    navigate('/login');
  };

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Smith', date: '2024-05-30', time: '9:00 AM', type: 'Check-up', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Johnson', date: '2024-06-15', time: '10:30 AM', type: 'Follow-up', status: 'Pending' },
  ];
  const reminders = [
    { id: 1, message: 'Appointment tomorrow at 9:00 AM', status: 'Delivered' },
    { id: 2, message: 'Follow-up in 2 days', status: 'Pending' },
  ];

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'reminders', label: 'Reminders' },
    { id: 'settings', label: 'Settings' },
  ];

  // Section content
  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to your Patient Portal</h2>
            <p>Here you can view your upcoming appointments and reminders.</p>
          </div>
        );
      case 'appointments':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Appointments</h2>
            <ul>
              {upcomingAppointments.map(app => (
                <li key={app.id} className="mb-2">
                  <strong>{app.doctor}</strong> - {app.type} on {app.date} at {app.time} ({app.status})
                </li>
              ))}
            </ul>
          </div>
        );
      case 'reminders':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Reminders</h2>
            <ul>
              {reminders.map(rem => (
                <li key={rem.id} className="mb-2">
                  {rem.message} <span className={rem.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}>({rem.status})</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Settings</h2>
            <ul className="list-disc pl-6">
              <li>Email: <span className="font-mono">john@demo.com</span></li>
              <li>Notifications: Enabled</li>
              <li>Theme: Light/Dark</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-30">
        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HC</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Patient Portal</h1>
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
              <Button variant="ghost" size="sm" className="hidden md:flex">
                John Doe
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)] shrink-0">
          <ul className="space-y-2 p-4">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => navigate(`/patient-portal?section=${item.id}`)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    section === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 max-w-full overflow-x-hidden transition-colors duration-200">
          <div className="max-w-4xl mx-auto">
            {renderSection()}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{appointment.doctor}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{appointment.date}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</p>
                      </div>
                      <div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {upcomingAppointments.length === 0 && (
                    <p className="text-center py-6 text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                  )}
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      View All Appointments
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-green-600" />
                  Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                    <p className="text-sm text-green-800 dark:text-green-400">
                      You have an appointment with Dr. Smith tomorrow at 9:00 AM.
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline">
                      <Bell className="w-4 h-4 mr-2" />
                      Manage Reminders
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardCheck className="w-5 h-5 mr-2 text-purple-600" />
                  Medical Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Access and view your medical records securely.
                  </p>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline">
                      <ClipboardCheck className="w-4 h-4 mr-2" />
                      View Records
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-gray-600" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your communication preferences and account settings.
                  </p>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientPortal;