
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { PatientDashboard } from '@/components/dashboards/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboards/DoctorDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { DoctorDirectory } from '@/components/doctors/DoctorDirectory';
import { Chat } from '@/components/communication/Chat';
import { Blog } from '@/components/blog/Blog';
import { Pharmacy } from '@/components/pharmacy/Pharmacy';
import { Navbar } from '@/components/layout/Navbar';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <Routes>
          <Route 
            path="/" 
            element={
              user.role === 'patient' ? <PatientDashboard user={user} /> :
              user.role === 'doctor' ? <DoctorDashboard user={user} /> :
              <AdminDashboard user={user} />
            } 
          />
          <Route path="/doctors" element={<DoctorDirectory />} />
          <Route path="/chat" element={<Chat user={user} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Index;
