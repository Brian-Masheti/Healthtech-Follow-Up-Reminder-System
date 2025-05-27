import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialogue';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Plus, Sun, Moon, Bell, Users, Calendar, Shield, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();

  // State for edit/delete dialogs
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteType, setDeleteType] = useState(''); // 'appointment' | 'patient' | 'reminder'
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editType, setEditType] = useState(''); // 'appointment' | 'patient' | 'reminder'
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const section = params.get('section') || 'dashboard';

  // State for fetched data
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingReminders, setLoadingReminders] = useState(false);
  const [error, setError] = useState('');

  // Modal states
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ patient: '', date: '', time: '', type: '' });
  const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '' });
  const [newReminder, setNewReminder] = useState({ patient: '', message: '', channel: 'SMS', time: '' });

  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState({ email: '', name: '' });

  // Populate admin profile from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('healthcareUser') || '{}');
    if (user && user.email) {
      setProfile({ email: user.email, name: user.name || 'Admin User' });
    }
  }, []);

  // Role-based redirect: if not admin, redirect to correct dashboard
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('healthcareUser') || '{}');
    if (user.role !== 'admin') {
      if (user.role === 'provider') navigate('/doctor');
      else if (user.role === 'patient') navigate('/patient-portal');
      else navigate('/login');
    }
  }, [navigate]);

  // Fetch data
  useEffect(() => {
    if (section === 'appointments') {
      setLoadingAppointments(true);
      axios.get('http://localhost:5000/api/appointments')
        .then(res => setAppointments(res.data))
        .catch(() => setError('Failed to fetch appointments'))
        .finally(() => setLoadingAppointments(false));
    }
    if (section === 'patients') {
      setLoadingPatients(true);
      axios.get('http://localhost:5000/api/patients')
        .then(res => setPatients(res.data))
        .catch(() => setError('Failed to fetch patients'))
        .finally(() => setLoadingPatients(false));
    }
    if (section === 'reminders') {
      setLoadingReminders(true);
      axios.get('http://localhost:5000/api/reminders')
        .then(res => setReminders(res.data))
        .catch(() => setError('Failed to fetch reminders'))
        .finally(() => setLoadingReminders(false));
    }
  }, [section]);

  // Handlers for CRUD
  const handleAddAppointment = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/appointments', newAppointment)
      .then(res => {
        setAppointments(prev => [...prev, res.data]);
        setShowAppointmentModal(false);
        setNewAppointment({ patient: '', date: '', time: '', type: '' });
        setError('');
      })
      .catch(() => setError('Failed to add appointment'));
  };
  const handleAddPatient = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/patients', newPatient)
      .then(res => {
        setPatients(prev => [...prev, res.data]);
        setShowPatientModal(false);
        setNewPatient({ name: '', email: '', phone: '' });
        setError('');
      })
      .catch(() => setError('Failed to add patient'));
  };
  const handleAddReminder = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/reminders', newReminder)
      .then(res => {
        setReminders(prev => [...prev, res.data]);
        setShowReminderModal(false);
        setNewReminder({ patient: '', message: '', channel: 'SMS', time: '' });
        setError('');
      })
      .catch(() => setError('Failed to add reminder'));
  };

  // Settings handlers
  const handleToggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };
  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  const handleExportData = () => {
    const data = { appointments, patients, reminders };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "admin-data.json");
    dlAnchorElem.click();
  };


  useEffect(() => {
    if (section === 'patients') {
      setLoadingPatients(true);
      axios.get('http://localhost:5000/api/patients')
        .then(res => setPatients(res.data))
        .catch(() => setError('Failed to fetch patients'))
        .finally(() => setLoadingPatients(false));
    }
    if (section === 'appointments') {
      setLoadingAppointments(true);
      axios.get('http://localhost:5000/api/appointments')
        .then(res => setAppointments(res.data))
        .catch(() => setError('Failed to fetch appointments'))
        .finally(() => setLoadingAppointments(false));
    }
    if (section === 'reminders') {
      setLoadingReminders(true);
      axios.get('http://localhost:5000/api/reminders')
        .then(res => setReminders(res.data))
        .catch(() => setError('Failed to fetch reminders'))
        .finally(() => setLoadingReminders(false));
    }
  }, [section]);

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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Appointments</span>
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2" onClick={() => setShowAppointmentModal(true)}><Plus className="w-4 h-4" /> Add Appointment</Button>
              </CardTitle>
              <CardDescription>Manage all appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAppointments ? <p>Loading...</p> : null}
              {error && <p className="text-red-600">{error}</p>}
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50">
                    <TableCell>Patient</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>No appointments found.</TableCell>
                    </TableRow>
                  ) : appointments.map((app) => (
                    <TableRow key={app._id || app.id}>
                      <TableCell>{app.patient}</TableCell>
                      <TableCell>{app.type}</TableCell>
                      <TableCell>{app.date}</TableCell>
                      <TableCell>{app.time}</TableCell>
                      <TableCell>{app.status || 'Pending'}</TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost" className="hover:bg-green-100" title="Edit"><Edit2 className="w-4 h-4 text-green-600" /></Button>
                        <Button size="icon" variant="ghost" className="hover:bg-red-100" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      case 'patients':
        return (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Patients</span>
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2" onClick={() => setShowPatientModal(true)}><Plus className="w-4 h-4" /> Add Patient</Button>
              </CardTitle>
              <CardDescription>Manage all patients</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingPatients ? <p>Loading...</p> : null}
              {error && <p className="text-red-600">{error}</p>}
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50">
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>No patients found.</TableCell>
                    </TableRow>
                  ) : patients.map((p) => (
                    <TableRow key={p._id || p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.email}</TableCell>
                      <TableCell>{p.phone}</TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost" className="hover:bg-green-100" title="Edit"><Edit2 className="w-4 h-4 text-green-600" /></Button>
                        <Button size="icon" variant="ghost" className="hover:bg-red-100" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      case 'reminders':
        return (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Reminders</span>
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2" onClick={() => setShowReminderModal(true)}><Plus className="w-4 h-4" /> Add Reminder</Button>
              </CardTitle>
              <CardDescription>Manage all reminders</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingReminders ? <p>Loading...</p> : null}
              {error && <p className="text-red-600">{error}</p>}
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50">
                    <TableCell>Patient</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Channel</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reminders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>No reminders found.</TableCell>
                    </TableRow>
                  ) : reminders.map((rem) => (
                    <TableRow key={rem._id || rem.id}>
                      <TableCell>{rem.patient}</TableCell>
                      <TableCell>{rem.message}</TableCell>
                      <TableCell>{rem.channel}</TableCell>
                      <TableCell>{rem.time}</TableCell>
                      <TableCell>{rem.status || (rem.sent ? 'Sent' : 'Pending')}</TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost" className="hover:bg-green-100" title="Edit"><Edit2 className="w-4 h-4 text-green-600" /></Button>
                        <Button size="icon" variant="ghost" className="hover:bg-red-100" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      case 'settings':
        return (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your profile and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Admin Email</label>
                  <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="w-full border px-2 py-1 rounded" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full border px-2 py-1 rounded" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-medium">Notifications</label>
                  <Button variant={notificationsEnabled ? 'secondary' : 'outline'} onClick={() => setNotificationsEnabled(!notificationsEnabled)}>
                    {notificationsEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-medium">Theme</label>
                  <Button variant={isDarkMode ? 'secondary' : 'outline'} onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} {isDarkMode ? 'Dark' : 'Light'}
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="mt-2">Export Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout currentPage={section}>
      {renderSection()}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The item will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (!selectedItem) return;
              try {
                if (deleteType === 'appointment') {
                  await axios.delete(`http://localhost:5000/api/appointments/${selectedItem._id || selectedItem.id}`);
                  setAppointments(prev => prev.filter(a => (a._id || a.id) !== (selectedItem._id || selectedItem.id)));
                } else if (deleteType === 'patient') {
                  await axios.delete(`http://localhost:5000/api/patients/${selectedItem._id || selectedItem.id}`);
                  setPatients(prev => prev.filter(p => (p._id || p.id) !== (selectedItem._id || selectedItem.id)));
                } else if (deleteType === 'reminder') {
                  await axios.delete(`http://localhost:5000/api/reminders/${selectedItem._id || selectedItem.id}`);
                  setReminders(prev => prev.filter(r => (r._id || r.id) !== (selectedItem._id || selectedItem.id)));
                }
                setShowDeleteDialog(false);
                setSelectedItem(null);
                setDeleteType('');
                toast({ title: 'Deleted', description: 'Item deleted successfully.' });
              } catch {
                toast({ title: 'Error', description: 'Failed to delete item.' });
              }
            }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editType.charAt(0).toUpperCase() + editType.slice(1)}</DialogTitle>
            <DialogDescription>Edit the details below and save changes.</DialogDescription>
          </DialogHeader>
          {editType === 'appointment' && (
            <form onSubmit={async e => {
              e.preventDefault();
              try {
                await axios.put(`http://localhost:5000/api/appointments/${editData._id || editData.id}`, editData);
                setAppointments(prev => prev.map(a => (a._id || a.id) === (editData._id || editData.id) ? editData : a));
                setShowEditModal(false);
                setSelectedItem(null);
                setEditType('');
                toast({ title: 'Changes saved', description: 'Appointment updated.' });
              } catch {
                toast({ title: 'Error', description: 'Failed to save changes.' });
              }
            }} className="space-y-3">
              <input className="w-full border px-2 py-1 rounded" value={editData.patient || ''} onChange={e => setEditData({ ...editData, patient: e.target.value })} placeholder="Patient" required />
              <input className="w-full border px-2 py-1 rounded" value={editData.type || ''} onChange={e => setEditData({ ...editData, type: e.target.value })} placeholder="Type" required />
              <input className="w-full border px-2 py-1 rounded" value={editData.date || ''} onChange={e => setEditData({ ...editData, date: e.target.value })} placeholder="Date" required />
              <input className="w-full border px-2 py-1 rounded" value={editData.time || ''} onChange={e => setEditData({ ...editData, time: e.target.value })} placeholder="Time" required />
              <DialogFooter>
                <DialogClose asChild>
                  <button type="button" className="btn btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                </DialogClose>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </DialogFooter>
            </form>
          )}
          {editType === 'patient' && (
            <form onSubmit={async e => {
              e.preventDefault();
              try {
                await axios.put(`http://localhost:5000/api/patients/${editData._id || editData.id}`, editData);
                setPatients(prev => prev.map(p => (p._id || p.id) === (editData._id || editData.id) ? editData : p));
                setShowEditModal(false);
                setSelectedItem(null);
                setEditType('');
                toast({ title: 'Changes saved', description: 'Patient updated.' });
              } catch {
                toast({ title: 'Error', description: 'Failed to save changes.' });
              }
            }} className="space-y-3">
              <input className="w-full border px-2 py-1 rounded" value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} placeholder="Name" required />
              <input className="w-full border px-2 py-1 rounded" value={editData.email || ''} onChange={e => setEditData({ ...editData, email: e.target.value })} placeholder="Email" required />
              <input className="w-full border px-2 py-1 rounded" value={editData.phone || ''} onChange={e => setEditData({ ...editData, phone: e.target.value })} placeholder="Phone" required />
              <DialogFooter>
                <DialogClose asChild>
                  <button type="button" className="btn btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                </DialogClose>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </DialogFooter>
            </form>
          )}
          {editType === 'reminder' && (
            <form onSubmit={async e => {
              e.preventDefault();
              try {
                await axios.put(`http://localhost:5000/api/reminders/${editData._id || editData.id}`, editData);
                setReminders(prev => prev.map(r => (r._id || r.id) === (editData._id || editData.id) ? editData : r));
                setShowEditModal(false);
                setSelectedItem(null);
                setEditType('');
                toast({ title: 'Changes saved', description: 'Reminder updated.' });
              } catch {
                toast({ title: 'Error', description: 'Failed to save changes.' });
              }
            }} className="space-y-3">
              <input className="w-full border px-2 py-1 rounded" value={editData.patient || ''} onChange={e => setEditData({ ...editData, patient: e.target.value })} placeholder="Patient" required />
              <input className="w-full border px-2 py-1 rounded" value={editData.message || ''} onChange={e => setEditData({ ...editData, message: e.target.value })} placeholder="Message" required />
              <input className="w-full border px-2 py-1 rounded" value={editData.channel || ''} onChange={e => setEditData({ ...editData, channel: e.target.value })} placeholder="Channel" required />
              <input className="w-full border px-2 py-1 rounded" value={editData.time || ''} onChange={e => setEditData({ ...editData, time: e.target.value })} placeholder="Time" required />
              <DialogFooter>
                <DialogClose asChild>
                  <button type="button" className="btn btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                </DialogClose>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminDashboard;
