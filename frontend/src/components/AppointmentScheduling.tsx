import React, { useState } from 'react';
import { Calendar, Clock, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AppointmentScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState('day'); // day, week, month

  const appointments = [
    {
      id: 1,
      time: '09:00',
      duration: 30,
      patient: 'John Smith',
      type: 'Consultation',
      status: 'confirmed',
      notes: 'Regular checkup',
    },
    {
      id: 2,
      time: '09:30',
      duration: 30,
      patient: 'Sarah Wilson',
      type: 'Follow-up',
      status: 'pending',
      notes: 'Blood pressure monitoring',
    },
    {
      id: 3,
      time: '10:00',
      duration: 45,
      patient: 'Mike Johnson',
      type: 'Consultation',
      status: 'confirmed',
      notes: 'Initial consultation',
    },
    {
      id: 4,
      time: '11:00',
      duration: 30,
      patient: 'Emma Davis',
      type: 'Check-up',
      status: 'confirmed',
      notes: 'Routine examination',
    },
  ];

  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const getAppointmentForTime = (time: string) => {
    return appointments.find(apt => apt.time === time);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'pending':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Scheduling</h2>
          <p className="text-gray-600">Manage and schedule patient appointments</p>
        </div>
        <Button className="medical-gradient text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Date:</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={view === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('day')}
            >
              Day
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search appointments..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Time Schedule */}
        <div className="lg:col-span-3">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timeSlots.map((time) => {
                  const appointment = getAppointmentForTime(time);
                  return (
                    <div key={time} className="flex items-center">
                      <div className="w-16 text-sm font-medium text-gray-500 text-right pr-4">
                        {time}
                      </div>
                      <div className="flex-1 min-h-[60px] border-l-2 border-gray-200 pl-4 relative">
                        {appointment ? (
                          <div className={`p-3 rounded-lg border-l-4 ${getStatusColor(appointment.status)}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{appointment.patient}</h4>
                                <p className="text-sm opacity-75">{appointment.type}</p>
                                <p className="text-xs opacity-60">{appointment.notes}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-medium">
                                  {appointment.duration} min
                                </span>
                                <div className="flex items-center mt-1">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span className="text-xs">{appointment.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button className="w-full h-full text-left p-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                            <span className="text-gray-400 group-hover:text-blue-600 text-sm">
                              + Add appointment
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Appointments</span>
                <span className="font-semibold text-gray-900">{appointments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Confirmed</span>
                <span className="font-semibold text-green-600">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">
                  {appointments.filter(a => a.status === 'pending').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Available Slots</span>
                <span className="font-semibold text-blue-600">
                  {timeSlots.length - appointments.length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Set Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduling;