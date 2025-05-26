import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardOverview from '@/components/DashboardOverview';
import PatientManagement from '@/components/PatientManagement';
import AppointmentScheduling from '@/components/AppointmentScheduling';
import ReminderSystem from '@/components/ReminderSystem';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentScheduling />;
      case 'reminders':
        return <ReminderSystem />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings page coming soon...</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </DashboardLayout>
  );
};

export default Index;