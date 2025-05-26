import React, { useState } from 'react';
import { Bell, MessageSquare, Mail, Phone, Settings, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const ReminderSystem = () => {
  const [autoReminders, setAutoReminders] = useState(true);

  const reminderStats = [
    {
      title: 'SMS Sent Today',
      value: '45',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'WhatsApp Sent',
      value: '28',
      icon: Phone,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Emails Sent',
      value: '16',
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Success Rate',
      value: '96%',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const recentReminders = [
    {
      id: 1,
      patient: 'John Smith',
      appointment: '2024-01-25 09:00',
      type: 'SMS',
      status: 'delivered',
      time: '2024-01-24 17:00',
      message: '24h reminder',
    },
    {
      id: 2,
      patient: 'Sarah Wilson',
      appointment: '2024-01-25 09:30',
      type: 'WhatsApp',
      status: 'delivered',
      time: '2024-01-24 17:00',
      message: '24h reminder',
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      appointment: '2024-01-25 10:00',
      type: 'Email',
      status: 'pending',
      time: '2024-01-24 17:00',
      message: '24h reminder',
    },
    {
      id: 4,
      patient: 'Emma Davis',
      appointment: '2024-01-25 10:30',
      type: 'SMS',
      status: 'failed',
      time: '2024-01-24 17:00',
      message: '24h reminder',
    },
  ];

  const reminderSettings = [
    { label: '7 days before', enabled: true, channels: ['Email'] },
    { label: '24 hours before', enabled: true, channels: ['SMS', 'WhatsApp', 'Email'] },
    { label: '2 hours before', enabled: true, channels: ['SMS', 'WhatsApp'] },
    { label: '30 minutes before', enabled: false, channels: ['SMS'] },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SMS':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'WhatsApp':
        return <Phone className="w-4 h-4 text-green-500" />;
      case 'Email':
        return <Mail className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reminder System</h2>
          <p className="text-gray-600">Automated patient appointment reminders</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Auto Reminders</span>
            <Switch checked={autoReminders} onCheckedChange={setAutoReminders} />
          </div>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reminderStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reminders */}
        <div className="lg:col-span-2">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-blue-600" />
                Recent Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(reminder.type)}
                        {getStatusIcon(reminder.status)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{reminder.patient}</h4>
                        <p className="text-sm text-gray-500">
                          Appointment: {new Date(reminder.appointment).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{reminder.message}</p>
                      <p className="text-xs text-gray-500">
                        Sent: {new Date(reminder.time).toLocaleString()}
                      </p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        reminder.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        reminder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reminder.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reminder Settings */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-green-600" />
              Reminder Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reminderSettings.map((setting, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">{setting.label}</span>
                    <Switch checked={setting.enabled} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {setting.channels.map((channel) => (
                      <span
                        key={channel}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {getTypeIcon(channel)}
                        <span className="ml-1">{channel}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button className="w-full" variant="outline">
                Customize Messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReminderSystem;