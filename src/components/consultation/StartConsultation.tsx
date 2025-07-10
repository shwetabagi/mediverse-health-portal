
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Video, Phone, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StartConsultation = () => {
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const { toast } = useToast();

  const availableConsultations = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      type: 'Video Call',
      status: 'Available Now',
      estimatedWait: '5-10 minutes',
      avatar: 'SJ'
    },
    {
      id: '2', 
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      type: 'Phone Call',
      status: 'Available Now',
      estimatedWait: '2-5 minutes',
      avatar: 'MC'
    },
    {
      id: '3',
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology', 
      type: 'Video Call',
      status: 'Next Available',
      estimatedWait: '15-20 minutes',
      avatar: 'ER'
    }
  ];

  const handleStartConsultation = (consultationId: string, doctor: string, type: string) => {
    toast({
      title: "Starting Consultation",
      description: `Connecting you with ${doctor} via ${type.toLowerCase()}...`
    });
    
    // Simulate connecting delay
    setTimeout(() => {
      toast({
        title: "Consultation Started!",
        description: `You are now connected with ${doctor}.`
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    return status === 'Available Now' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <span>Start Instant Consultation</span>
          </CardTitle>
          <CardDescription>Connect with available healthcare professionals for immediate consultation</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {availableConsultations.map((consultation) => (
          <Card key={consultation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{consultation.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{consultation.doctor}</h3>
                    <p className="text-gray-600">{consultation.specialty}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Estimated wait: {consultation.estimatedWait}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <Badge className={getStatusColor(consultation.status)}>
                      {consultation.status}
                    </Badge>
                    <div className="flex items-center space-x-1 mt-2">
                      {consultation.type === 'Video Call' ? (
                        <Video className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Phone className="h-4 w-4 text-green-600" />
                      )}
                      <span className="text-sm text-gray-600">{consultation.type}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleStartConsultation(consultation.id, consultation.doctor, consultation.type)}
                    disabled={consultation.status !== 'Available Now'}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {consultation.status === 'Available Now' ? 'Start Now' : 'Join Queue'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Emergency Consultation</h4>
              <p className="text-blue-700 text-sm">For urgent medical concerns, click here for immediate assistance</p>
            </div>
          </div>
          <Button className="mt-4 bg-red-600 hover:bg-red-700">
            Emergency Consultation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
