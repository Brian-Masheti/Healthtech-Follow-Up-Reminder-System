import React from 'react';
import { Calendar, Users, Bell, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardOverviewProps {
  doctorName: string;
  onAddAppointment: () => void;
  onAddReminder: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ doctorName, onAddAppointment, onAddReminder }) => {
  const stats = [
    {
      title: 'Today\'s Appointments',
      value: '24',
      description: '3 new since yesterday',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Patients',
      value: '1,247',
      description: '+12% from last month',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Reminders Sent',
      value: '89',
      description: 'Today',
      icon: Bell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Show Rate',
      value: '92%',
      description: '+5% improvement',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'John Smith', time: '9:00 AM', type: 'Consultation', status: 'confirmed' },
    { id: 2, patient: 'Sarah Wilson', time: '9:30 AM', type: 'Follow-up', status: 'pending' },
    { id: 3, patient: 'Mike Johnson', time: '10:00 AM', type: 'Check-up', status: 'confirmed' },
    { id: 4, patient: 'Emma Davis', time: '10:30 AM', type: 'Consultation', status: 'confirmed' },
  ];

  const recentReminders = [
    { id: 1, patient: 'John Smith', type: 'SMS', status: 'delivered', time: '8:30 AM' },
    { id: 2, patient: 'Sarah Wilson', type: 'WhatsApp', status: 'delivered', time: '8:25 AM' },
    { id: 3, patient: 'Mike Johnson', type: 'Email', status: 'delivered', time: '8:20 AM' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome back, Dr. {doctorName}. Here's your clinic overview.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={onAddAppointment}>
            New Appointment
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onAddReminder}>
            New Reminder
          </Button>
        </div>
        </div>
        <Button className="medical-gradient text-white">
          <Calendar className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
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
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Today's Appointments
            </CardTitle>
            <CardDescription>Next 4 appointments scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {appointment.patient.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{appointment.time}</p>
                    <div className="flex items-center">
                      {appointment.status === 'confirmed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-xs text-gray-500 ml-1 capitalize">{appointment.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reminders */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-green-600" />
              Recent Reminders
            </CardTitle>
            <CardDescription>Latest reminder activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{reminder.patient}</p>
                      <p className="text-sm text-gray-500">{reminder.type} reminder</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{reminder.time}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {reminder.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
