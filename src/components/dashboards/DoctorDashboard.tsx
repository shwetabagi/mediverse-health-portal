
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  MessageCircle,
  FileText,
  Star,
  Activity,
  Video,
  Phone
} from 'lucide-react';
import { User } from '@/pages/Index';

interface DoctorDashboardProps {
  user: User;
}

export const DoctorDashboard = ({ user }: DoctorDashboardProps) => {
  const todayAppointments = [
    { id: 1, patient: 'John Smith', time: '09:00 AM', type: 'Video Call', condition: 'Follow-up' },
    { id: 2, patient: 'Emily Johnson', time: '10:30 AM', type: 'In-Person', condition: 'Check-up' },
    { id: 3, patient: 'Michael Brown', time: '02:00 PM', type: 'Video Call', condition: 'Consultation' },
    { id: 4, patient: 'Sarah Davis', time: '03:30 PM', type: 'In-Person', condition: 'Treatment' },
  ];

  const recentPatients = [
    { id: 1, name: 'Alice Wilson', lastVisit: '2024-01-12', condition: 'Hypertension', status: 'Stable' },
    { id: 2, name: 'Robert Taylor', lastVisit: '2024-01-11', condition: 'Diabetes', status: 'Monitoring' },
    { id: 3, name: 'Lisa Anderson', lastVisit: '2024-01-10', condition: 'Anxiety', status: 'Improving' },
  ];

  const stats = [
    { label: 'Today\'s Appointments', value: '8', icon: Calendar, color: 'blue' },
    { label: 'Total Patients', value: '1,247', icon: Users, color: 'green' },
    { label: 'Pending Reviews', value: '15', icon: FileText, color: 'orange' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'yellow' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Good morning, {user.name}!</h1>
        <p className="text-green-100">You have 8 appointments scheduled for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            orange: 'bg-orange-100 text-orange-600',
            yellow: 'bg-yellow-100 text-yellow-600',
          };
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Today's Appointments</span>
            </CardTitle>
            <CardDescription>Your scheduled appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.patient}</h4>
                      <p className="text-sm text-gray-600">{appointment.condition}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={appointment.type === 'Video Call' ? 'secondary' : 'outline'}>
                      {appointment.type}
                    </Badge>
                    <Button size="sm" variant="outline">
                      {appointment.type === 'Video Call' ? <Video className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Video Call
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Write Prescription
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Patient Records
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Patients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span>Recent Patients</span>
          </CardTitle>
          <CardDescription>Patients you've recently treated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{patient.name}</h4>
                  <Badge variant={patient.status === 'Stable' ? 'default' : patient.status === 'Improving' ? 'secondary' : 'outline'}>
                    {patient.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{patient.condition}</p>
                <p className="text-xs text-gray-500 mb-3">Last visit: {patient.lastVisit}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-3 w-3 mr-1" />
                    Records
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
