// src/app/dashboard/layout.jsx
import DashboardClientLayout from './client-layout';

export const metadata = {
  title: 'Hospital Management System - Dashboard',
  description: 'Manage your hospital operations efficiently with our comprehensive dashboard.',
};

export default function DashboardLayout({ children }) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
