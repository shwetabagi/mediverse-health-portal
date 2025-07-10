import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText, 
  Heart, 
  Activity, 
  Clock, 
  Stethoscope,
  MessageCircle,
  Pill,
  TrendingUp,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { User } from '@/pages/Index';
import { BookAppointment } from '@/components/appointments/BookAppointment';
import { StartConsultation } from '@/components/consultation/StartConsultation';
import { ViewReports } from '@/components/reports/ViewReports';
import { OrderMedicine } from '@/components/pharmacy/OrderMedicine';

interface PatientDashboardProps {
  user: User;
}

export const PatientDashboard = ({ user }: PatientDashboardProps) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'appointment' | 'consultation' | 'reports' | 'medicine'>('dashboard');

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2024-01-15', time: '10:00 AM', type: 'Video Call' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'General Medicine', date: '2024-01-18', time: '2:30 PM', type: 'In-Person' },
  ];

  const recentReports = [
    { id: 1, name: 'Blood Test Results', date: '2024-01-10', status: 'Normal' },
    { id: 2, name: 'X-Ray Chest', date: '2024-01-08', status: 'Reviewed' },
    { id: 3, name: 'ECG Report', date: '2024-01-05', status: 'Normal' },
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', icon: Heart },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', icon: Activity },
    { label: 'Weight', value: '70 kg', status: 'stable', icon: TrendingUp },
  ];

  if (activeView !== 'dashboard') {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Button
          onClick={() => setActiveView('dashboard')}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        {activeView === 'appointment' && <BookAppointment />}
        {activeView === 'consultation' && <StartConsultation />}
        {activeView === 'reports' && <ViewReports />}
        {activeView === 'medicine' && <OrderMedicine />}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100">Stay on top of your health with our comprehensive care platform.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button 
          onClick={() => setActiveView('appointment')}
          className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-600 hover:bg-green-700"
        >
          <Calendar className="h-6 w-6" />
          <span>Book Appointment</span>
        </Button>
        <Button 
          onClick={() => setActiveView('consultation')}
          className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="h-6 w-6" />
          <span>Start Consultation</span>
        </Button>
        <Button 
          onClick={() => setActiveView('reports')}
          className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-600 hover:bg-purple-700"
        >
          <FileText className="h-6 w-6" />
          <span>View Reports</span>
        </Button>
        <Button 
          onClick={() => setActiveView('medicine')}
          className="h-20 flex flex-col items-center justify-center space-y-2 bg-orange-600 hover:bg-orange-700"
        >
          <Pill className="h-6 w-6" />
          <span>Order Medicine</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Upcoming Appointments</span>
            </CardTitle>
            <CardDescription>Your scheduled medical appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{appointment.date} at {appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={appointment.type === 'Video Call' ? 'secondary' : 'outline'}>
                    {appointment.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span>Health Metrics</span>
            </CardTitle>
            <CardDescription>Your latest health indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">{metric.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{metric.value}</div>
                      <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>Recent Medical Reports</span>
          </CardTitle>
          <CardDescription>Your latest test results and medical documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{report.name}</h4>
                  <Badge variant={report.status === 'Normal' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{report.date}</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertCircle className="h-5 w-5" />
            <span>Health Reminders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-orange-800">
            <p className="text-sm">• Annual health checkup due in 2 weeks</p>
            <p className="text-sm">• Take blood pressure medication at 8:00 PM today</p>
            <p className="text-sm">• Schedule flu vaccination for this month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
