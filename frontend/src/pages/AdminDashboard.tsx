import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Calendar, Bell, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  // Read the ?section= param from the URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const section = params.get('section') || 'dashboard';

  const stats = [
    {
      title: 'Total Users',
      value: '124',
      description: '+12 this month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Clinics',
      value: '8',
      description: '2 recently added',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Appointments',
      value: '3,247',
      description: 'Across all clinics',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'System Health',
      value: '99.9%',
      description: 'Uptime this month',
      icon: BarChart3,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  // Section content
  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-400">System overview and management</p>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="card-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.description}</p>
                        </div>
                        <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg dark:bg-opacity-20`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {/* Recent System Activity and System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Recent System Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Admin dashboard functionality will be implemented here.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    System metrics and health status will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'appointments':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Appointments</h2>
            <p>Manage all appointments here.</p>
          </div>
        );
      case 'patients':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Patients</h2>
            <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-4 py-2">John Smith</td><td className="px-4 py-2">john@demo.com</td><td className="px-4 py-2">555-1234</td></tr>
                <tr><td className="px-4 py-2">Sarah Wilson</td><td className="px-4 py-2">sarah@demo.com</td><td className="px-4 py-2">555-5678</td></tr>
                <tr><td className="px-4 py-2">Mike Johnson</td><td className="px-4 py-2">mike@demo.com</td><td className="px-4 py-2">555-9012</td></tr>
              </tbody>
            </table>
          </div>
        );
      case 'reminders':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Reminders</h2>
            <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2">Patient</th>
                  <th className="px-4 py-2">Message</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-4 py-2">John Smith</td><td className="px-4 py-2">Appointment tomorrow at 9:00 AM</td><td className="px-4 py-2 text-green-600">Sent</td></tr>
                <tr><td className="px-4 py-2">Sarah Wilson</td><td className="px-4 py-2">Follow-up in 2 days</td><td className="px-4 py-2 text-yellow-600">Pending</td></tr>
              </tbody>
            </table>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Settings</h2>
            <ul className="list-disc pl-6">
              <li>Admin Email: <span className="font-mono">admin@demo.com</span></li>
              <li>Notifications: Enabled</li>
              <li>Theme: Light/Dark</li>
              <li>Data Export: Available</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout currentPage={section} onPageChange={() => {}}>
      {renderSection()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
