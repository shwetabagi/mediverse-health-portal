
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Stethoscope, Video, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export const BookAppointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [preselectedDoctor, setPreselectedDoctor] = useState<Doctor | null>(null);
  const { toast } = useToast();

  const doctors = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'General Medicine' },
    { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Dermatology' },
    { id: '4', name: 'Dr. James Wilson', specialty: 'Orthopedics' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  useEffect(() => {
    // Check if a doctor was selected from the directory
    const storedDoctor = localStorage.getItem('selectedDoctor');
    if (storedDoctor) {
      const doctor = JSON.parse(storedDoctor);
      setPreselectedDoctor(doctor);
      setSelectedDoctor(doctor.id.toString());
      // Clear the stored selection
      localStorage.removeItem('selectedDoctor');
    }
  }, []);

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information", 
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const selectedDoc = doctors.find(doc => doc.id === selectedDoctor) || preselectedDoctor;
    toast({
      title: "Appointment Booked Successfully!",
      description: `Your ${appointmentType} appointment with ${selectedDoc?.name} is scheduled for ${selectedDate} at ${selectedTime}.`
    });

    // Reset form
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setAppointmentType('in-person');
    setPreselectedDoctor(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-6">
        <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
        <p className="text-blue-100">Schedule your consultation with our healthcare professionals</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Book New Appointment</span>
          </CardTitle>
          <CardDescription>Schedule your consultation with our healthcare professionals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {preselectedDoctor && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-1">Selected Doctor</h4>
              <p className="text-blue-700">{preselectedDoctor.name} - {preselectedDoctor.specialty}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <select
              id="doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a doctor...</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <select
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select time...</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Appointment Type</Label>
            <div className="flex space-x-4">
              <button
                onClick={() => setAppointmentType('in-person')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors ${
                  appointmentType === 'in-person' 
                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span>In-Person</span>
              </button>
              <button
                onClick={() => setAppointmentType('video-call')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors ${
                  appointmentType === 'video-call' 
                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Video className="h-4 w-4" />
                <span>Video Call</span>
              </button>
            </div>
          </div>

          <Button onClick={handleBookAppointment} className="w-full">
            <Stethoscope className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
