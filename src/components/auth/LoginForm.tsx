
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Mail, UserCheck, Stethoscope, Shield } from 'lucide-react';
import { User as UserType } from '@/pages/Index';

interface LoginFormProps {
  onLogin: (user: UserType) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [activeTab, setActiveTab] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent, role: 'patient' | 'doctor' | 'admin') => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would be API call
    const mockUser: UserType = {
      id: '1',
      name: role === 'patient' ? 'John Patient' : role === 'doctor' ? 'Dr. Smith' : 'Admin User',
      email: email,
      role: role
    };
    
    onLogin(mockUser);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'patient': return <User className="h-4 w-4" />;
      case 'doctor': return <Stethoscope className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-4 shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <UserCheck className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">HealthCare Portal</CardTitle>
        <CardDescription>Sign in to access your healthcare services</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patient" className="flex items-center gap-2">
              {getRoleIcon('patient')}
              Patient
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex items-center gap-2">
              {getRoleIcon('doctor')}
              Doctor
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              {getRoleIcon('admin')}
              Admin
            </TabsTrigger>
          </TabsList>
          
          {(['patient', 'doctor', 'admin'] as const).map((role) => (
            <TabsContent key={role} value={role}>
              <form onSubmit={(e) => handleSubmit(e, role)} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
                </Button>
              </form>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo credentials for testing:</p>
          <p>Email: demo@example.com | Password: demo123</p>
        </div>
      </CardContent>
    </Card>
  );
};
