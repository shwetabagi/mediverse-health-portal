
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
import { BookAppointment } from '@/components/appointments/BookAppointment';
import { Profile } from '@/components/profile/Profile';
import { VideoCall } from '@/components/video/VideoCall';
import { ViewReports } from '@/components/reports/ViewReports';
import { PaymentGateway } from '@/components/payment/PaymentGateway';
import { Navbar } from '@/components/layout/Navbar';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  console.log('Index component rendered, user:', user);

  const handleLogin = (userData: User) => {
    console.log('Login successful:', userData);
    setUser(userData);
  };

  const handleLogout = () => {
    console.log('User logged out');
    setUser(null);
  };

  if (!user) {
    console.log('No user found, showing login form');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  console.log('User authenticated, showing main app');
  
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
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/doctors" element={<DoctorDirectory />} />
          <Route path="/chat" element={<Chat user={user} />} />
          <Route path="/video-call" element={<VideoCall user={user} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/reports" element={<ViewReports />} />
          <Route 
            path="/payment" 
            element={
              <PaymentGateway 
                amount={99.99}
                items={[{ name: "Medical Consultation", price: 99.99, quantity: 1 }]}
                onPaymentSuccess={() => console.log('Payment successful')}
                onPaymentCancel={() => console.log('Payment cancelled')}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Index;
