import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import DashboardOverview from '@/components/DashboardOverview';
import { Edit2, Trash2 } from 'lucide-react';


const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const sectionFromUrl = params.get('section') || 'dashboard';
  const [section, setSection] = useState(sectionFromUrl);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '' });
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ patient: '', date: '', time: '', type: '' });
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [newReminder, setNewReminder] = useState({ patient: '', message: '', channel: 'SMS', time: '' });
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [loadingReminders, setLoadingReminders] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSection(sectionFromUrl);
  }, [sectionFromUrl]);

  useEffect(() => {
    if (section === 'patients') {
      setLoadingPatients(true);
      axios.get('http://localhost:5000/api/patients')
        .then(res => setPatients(res.data))
        .catch(() => setError('Failed to fetch patients'))
        .finally(() => setLoadingPatients(false));
    }
  }, [section]);

  useEffect(() => {
    if (section === 'appointments') {
      setLoadingAppointments(true);
      axios.get('http://localhost:5000/api/appointments')
        .then(res => setAppointments(res.data))
        .catch(() => setError('Failed to fetch appointments'))
        .finally(() => setLoadingAppointments(false));
    }
  }, [section]);

  useEffect(() => {
    if (section === 'reminders') {
      setLoadingReminders(true);
      axios.get('http://localhost:5000/api/reminders')
        .then(res => setReminders(res.data))
        .catch(() => setError('Failed to fetch reminders'))
        .finally(() => setLoadingReminders(false));
    }
  }, [section]);

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

  const handleSidebarNav = (target) => {
    if (target === 'dashboard') navigate('/doctor');
    else navigate(`/doctor?section=${target}`);
  };

  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Doctor Dashboard</h2>
            <p>Welcome! Use the sidebar to manage appointments, patients, and more.</p>
          </div>
        );
      case 'appointments':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Appointments</h2>
              <Button onClick={() => setShowAppointmentModal(true)} className="bg-blue-600 text-white">Add Appointment</Button>
            </div>
            {loadingAppointments ? <p>Loading...</p> : null}
            {error && <p className="text-red-600">{error}</p>}
            <ul>
              {appointments.length === 0 ? (
                <li>No appointments found.</li>
              ) : appointments.map((app) => (
                <li key={app._id || app.id}>
                  {app.patient} - {app.type} on {app.date} at {app.time} ({app.status || 'Pending'})
                </li>
              ))}
            </ul>
            {showAppointmentModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <form onSubmit={handleAddAppointment} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
                  <h3 className="text-lg font-bold">Add New Appointment</h3>
                  <input type="text" placeholder="Patient Name" value={newAppointment.patient} onChange={e => setNewAppointment({ ...newAppointment, patient: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <input type="date" placeholder="Date" value={newAppointment.date} onChange={e => setNewAppointment({ ...newAppointment, date: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <input type="time" placeholder="Time" value={newAppointment.time} onChange={e => setNewAppointment({ ...newAppointment, time: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <input type="text" placeholder="Type (e.g. Consultation)" value={newAppointment.type} onChange={e => setNewAppointment({ ...newAppointment, type: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-blue-600 text-white flex-1">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setShowAppointmentModal(false)} className="flex-1">Cancel</Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        );
      case 'patients':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Patients</h2>
              <Button onClick={() => setShowPatientModal(true)} className="bg-blue-600 text-white">Add Patient</Button>
            </div>
            {loadingPatients ? <p>Loading...</p> : null}
            {error && <p className="text-red-600">{error}</p>}
            <ul>
              {patients.length === 0 ? (
                <li>No patients found.</li>
              ) : patients.map((p) => (
                <li key={p._id || p.id}>
                  {p.name} - {p.email} - {p.phone}
                </li>
              ))}
            </ul>
            {showPatientModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <form onSubmit={handleAddPatient} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
                  <h3 className="text-lg font-bold">Add New Patient</h3>
                  <input type="text" placeholder="Name" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <input type="email" placeholder="Email" value={newPatient.email} onChange={e => setNewPatient({ ...newPatient, email: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <input type="text" placeholder="Phone" value={newPatient.phone} onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })} className="w-full border px-2 py-1 rounded" />
                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-blue-600 text-white flex-1">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setShowPatientModal(false)} className="flex-1">Cancel</Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        );
      case 'reminders':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Reminders</h2>
              <Button onClick={() => setShowReminderModal(true)} className="bg-blue-600 text-white">Add Reminder</Button>
            </div>
            {loadingReminders ? <p>Loading...</p> : null}
            {error && <p className="text-red-600">{error}</p>}
            <ul>
              {reminders.length === 0 ? (
                <li>No reminders found.</li>
              ) : reminders.map((rem) => (
                <li key={rem._id || rem.id}>
                  {rem.patient}: {rem.message} via {rem.channel} at {rem.time} {rem.sent ? '(sent)' : '(pending)'}
                </li>
              ))}
            </ul>
            {showReminderModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <form onSubmit={handleAddReminder} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
                  <h3 className="text-lg font-bold">Add New Reminder</h3>
                  <input type="text" placeholder="Patient Name" value={newReminder.patient} onChange={e => setNewReminder({ ...newReminder, patient: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <input type="text" placeholder="Message" value={newReminder.message} onChange={e => setNewReminder({ ...newReminder, message: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <select value={newReminder.channel} onChange={e => setNewReminder({ ...newReminder, channel: e.target.value })} className="w-full border px-2 py-1 rounded">
                    <option value="SMS">SMS</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                  </select>
                  <input type="time" placeholder="Time" value={newReminder.time} onChange={e => setNewReminder({ ...newReminder, time: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-blue-600 text-white flex-1">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setShowReminderModal(false)} className="flex-1">Cancel</Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-900 text-white flex flex-col py-8 px-4 space-y-2 min-h-screen sticky top-0">
          <div className="font-bold text-lg mb-8">HC HealthCare Reminders</div>
          <Button variant={section === 'dashboard' ? 'secondary' : 'ghost'} onClick={() => handleSidebarNav('dashboard')} className="justify-start w-full mb-2">Dashboard</Button>
          <Button variant={section === 'appointments' ? 'secondary' : 'ghost'} onClick={() => handleSidebarNav('appointments')} className="justify-start w-full mb-2">Appointments</Button>
          <Button variant={section === 'patients' ? 'secondary' : 'ghost'} onClick={() => handleSidebarNav('patients')} className="justify-start w-full mb-2">Patients</Button>
          <Button variant={section === 'reminders' ? 'secondary' : 'ghost'} onClick={() => handleSidebarNav('reminders')} className="justify-start w-full">Reminders</Button>
        </nav>
        {/* Main Content */}
        <main className="flex-1 p-8">
          {section === 'dashboard' && (
            <DashboardOverview
              doctorName={(() => {
                try {
                  const user = JSON.parse(localStorage.getItem('healthcareUser') || '{}');
                  return user?.name || user?.doctorName || user?.email || '';
                } catch {
                  return '';
                }
              })()}
              onAddAppointment={() => setShowAppointmentModal(true)}
              onAddReminder={() => setShowReminderModal(true)}
            />
          )}
          {section === 'appointments' && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Appointments</span>
                  <Button onClick={() => setShowAppointmentModal(true)} className="bg-green-600 hover:bg-green-700 text-white">Add Appointment</Button>
                </CardTitle>
                <CardDescription>Manage all your appointments</CardDescription>
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
                {showAppointmentModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <form onSubmit={handleAddAppointment} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
                      <h3 className="text-lg font-bold">Add New Appointment</h3>
                      <input type="text" placeholder="Patient Name" value={newAppointment.patient} onChange={e => setNewAppointment({ ...newAppointment, patient: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <input type="date" placeholder="Date" value={newAppointment.date} onChange={e => setNewAppointment({ ...newAppointment, date: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <input type="time" placeholder="Time" value={newAppointment.time} onChange={e => setNewAppointment({ ...newAppointment, time: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <input type="text" placeholder="Type (e.g. Consultation)" value={newAppointment.type} onChange={e => setNewAppointment({ ...newAppointment, type: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <div className="flex space-x-2">
                        <Button type="submit" className="bg-green-600 text-white flex-1">Save</Button>
                        <Button type="button" variant="outline" onClick={() => setShowAppointmentModal(false)} className="flex-1">Cancel</Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          {section === 'patients' && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Patients</span>
                  <Button onClick={() => setShowPatientModal(true)} className="bg-green-600 hover:bg-green-700 text-white">Add Patient</Button>
                </CardTitle>
                <CardDescription>Manage all your patients</CardDescription>
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
                {showPatientModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <form onSubmit={handleAddPatient} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
                      <h3 className="text-lg font-bold">Add New Patient</h3>
                      <input type="text" placeholder="Name" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <input type="email" placeholder="Email" value={newPatient.email} onChange={e => setNewPatient({ ...newPatient, email: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <input type="text" placeholder="Phone" value={newPatient.phone} onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })} className="w-full border px-2 py-1 rounded" />
                      <div className="flex space-x-2">
                        <Button type="submit" className="bg-green-600 text-white flex-1">Save</Button>
                        <Button type="button" variant="outline" onClick={() => setShowPatientModal(false)} className="flex-1">Cancel</Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          {section === 'reminders' && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Reminders</span>
                  <Button onClick={() => setShowReminderModal(true)} className="bg-green-600 hover:bg-green-700 text-white">Add Reminder</Button>
                </CardTitle>
                <CardDescription>Manage all your reminders</CardDescription>
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
                        <TableCell>{rem.sent ? 'Sent' : 'Pending'}</TableCell>
                        <TableCell>
                          <Button size="icon" variant="ghost" className="hover:bg-green-100" title="Edit"><Edit2 className="w-4 h-4 text-green-600" /></Button>
                          <Button size="icon" variant="ghost" className="hover:bg-red-100" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {showReminderModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <form onSubmit={handleAddReminder} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
                      <h3 className="text-lg font-bold">Add New Reminder</h3>
                      <input type="text" placeholder="Patient Name" value={newReminder.patient} onChange={e => setNewReminder({ ...newReminder, patient: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <input type="text" placeholder="Message" value={newReminder.message} onChange={e => setNewReminder({ ...newReminder, message: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <select value={newReminder.channel} onChange={e => setNewReminder({ ...newReminder, channel: e.target.value })} className="w-full border px-2 py-1 rounded">
                        <option value="SMS">SMS</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Email">Email</option>
                      </select>
                      <input type="time" placeholder="Time" value={newReminder.time} onChange={e => setNewReminder({ ...newReminder, time: e.target.value })} className="w-full border px-2 py-1 rounded" required />
                      <div className="flex space-x-2">
                        <Button type="submit" className="bg-green-600 text-white flex-1">Save</Button>
                        <Button type="button" variant="outline" onClick={() => setShowReminderModal(false)} className="flex-1">Cancel</Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;