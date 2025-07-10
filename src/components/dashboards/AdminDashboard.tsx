
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Stethoscope,
  FileText,
  MessageCircle,
  AlertTriangle
} from 'lucide-react';
import { User } from '@/pages/Index';

interface AdminDashboardProps {
  user: User;
}

export const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const stats = [
    { label: 'Total Patients', value: '2,847', change: '+12%', trend: 'up', icon: Users },
    { label: 'Active Doctors', value: '156', change: '+3%', trend: 'up', icon: Stethoscope },
    { label: 'Appointments Today', value: '342', change: '-5%', trend: 'down', icon: Calendar },
    { label: 'Revenue (Month)', value: '$48,592', change: '+18%', trend: 'up', icon: DollarSign },
  ];

  const recentActivities = [
    { id: 1, type: 'appointment', message: 'New appointment booked by John Smith', time: '5 min ago' },
    { id: 2, type: 'doctor', message: 'Dr. Sarah Johnson completed 8 consultations', time: '12 min ago' },
    { id: 3, type: 'payment', message: 'Payment of $150 received from Emily Davis', time: '18 min ago' },
    { id: 4, type: 'alert', message: 'Server maintenance scheduled for tonight', time: '1 hour ago' },
  ];

  const topDoctors = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', patients: 156, rating: 4.9 },
    { name: 'Dr. Michael Chen', specialty: 'General Medicine', patients: 142, rating: 4.8 },
    { name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', patients: 128, rating: 4.9 },
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High server load detected', severity: 'medium' },
    { id: 2, type: 'info', message: 'Backup completed successfully', severity: 'low' },
    { id: 3, type: 'error', message: 'Payment gateway timeout (2 instances)', severity: 'high' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-purple-100">Monitor and manage your healthcare platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {activity.type === 'appointment' && <Calendar className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'doctor' && <Stethoscope className="h-4 w-4 text-green-600" />}
                    {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-green-600" />}
                    {activity.type === 'alert' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' :
                      alert.severity === 'medium' ? 'default' : 'secondary'
                    }>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Doctors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="h-5 w-5 text-green-600" />
            <span>Top Performing Doctors</span>
          </CardTitle>
          <CardDescription>Doctors with highest patient satisfaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topDoctors.map((doctor, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{doctor.name}</h4>
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Patients: {doctor.patients}</span>
                  <span className="font-medium">⭐ {doctor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Management Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="h-16 flex flex-col items-center justify-center space-y-1 bg-blue-600 hover:bg-blue-700">
          <Users className="h-5 w-5" />
          <span className="text-sm">Manage Users</span>
        </Button>
        <Button className="h-16 flex flex-col items-center justify-center space-y-1 bg-green-600 hover:bg-green-700">
          <Stethoscope className="h-5 w-5" />
          <span className="text-sm">Doctor Reports</span>
        </Button>
        <Button className="h-16 flex flex-col items-center justify-center space-y-1 bg-purple-600 hover:bg-purple-700">
          <DollarSign className="h-5 w-5" />
          <span className="text-sm">Financial Reports</span>
        </Button>
        <Button className="h-16 flex flex-col items-center justify-center space-y-1 bg-orange-600 hover:bg-orange-700">
          <FileText className="h-5 w-5" />
          <span className="text-sm">System Logs</span>
        </Button>
      </div>
    </div>
  );
};
