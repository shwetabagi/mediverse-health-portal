import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Calendar,
  Video,
  MessageCircle,
  Filter,
  Stethoscope
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DoctorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 156,
      experience: '15 years',
      location: 'New York Medical Center',
      consultationFee: 150,
      nextAvailable: 'Today 3:00 PM',
      image: '/api/placeholder/120/120',
      languages: ['English', 'Spanish'],
      education: 'Harvard Medical School',
      videoConsultation: true,
      inPersonConsultation: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      rating: 4.8,
      reviews: 203,
      experience: '12 years',
      location: 'Downtown Health Clinic',
      consultationFee: 120,
      nextAvailable: 'Tomorrow 10:00 AM',
      image: '/api/placeholder/120/120',
      languages: ['English', 'Mandarin'],
      education: 'Johns Hopkins University',
      videoConsultation: true,
      inPersonConsultation: true
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      reviews: 189,
      experience: '10 years',
      location: 'Children\'s Medical Center',
      consultationFee: 140,
      nextAvailable: 'Today 5:30 PM',
      image: '/api/placeholder/120/120',
      languages: ['English', 'Spanish', 'Portuguese'],
      education: 'Stanford Medical School',
      videoConsultation: true,
      inPersonConsultation: false
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      rating: 4.7,
      reviews: 134,
      experience: '18 years',
      location: 'Sports Medicine Institute',
      consultationFee: 180,
      nextAvailable: 'Jan 16, 9:00 AM',
      image: '/api/placeholder/120/120',
      languages: ['English'],
      education: 'Mayo Clinic School of Medicine',
      videoConsultation: false,
      inPersonConsultation: true
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatology',
      rating: 4.8,
      reviews: 167,
      experience: '8 years',
      location: 'Skin Care Specialists',
      consultationFee: 160,
      nextAvailable: 'Jan 15, 2:00 PM',
      image: '/api/placeholder/120/120',
      languages: ['English', 'French'],
      education: 'UCLA Medical School',
      videoConsultation: true,
      inPersonConsultation: true
    },
    {
      id: 6,
      name: 'Dr. Robert Kim',
      specialty: 'Psychiatry',
      rating: 4.9,
      reviews: 142,
      experience: '14 years',
      location: 'Mental Health Center',
      consultationFee: 200,
      nextAvailable: 'Today 6:00 PM',
      image: '/api/placeholder/120/120',
      languages: ['English', 'Korean'],
      education: 'Columbia Medical School',
      videoConsultation: true,
      inPersonConsultation: true
    }
  ];

  const specialties = ['all', 'Cardiology', 'General Medicine', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Psychiatry'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookNow = (doctor: typeof doctors[0]) => {
    // Store selected doctor in localStorage for the booking form
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    navigate('/book-appointment');
    toast({
      title: "Redirecting to Book Appointment",
      description: `Selected ${doctor.name} for booking.`
    });
  };

  const handleChat = (doctor: typeof doctors[0]) => {
    // Store selected doctor for chat context
    localStorage.setItem('chatDoctor', JSON.stringify(doctor));
    navigate('/chat');
    toast({
      title: "Starting Chat",
      description: `Opening chat with ${doctor.name}.`
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Find Your Doctor</h1>
        <p className="text-blue-100">Connect with qualified healthcare professionals</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specialties' : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                {/* Doctor Image */}
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="h-8 w-8 text-gray-400" />
                </div>

                {/* Doctor Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500 text-sm">({doctor.reviews})</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Next available: {doctor.nextAvailable}</span>
                    </div>
                  </div>

                  {/* Consultation Options */}
                  <div className="flex items-center space-x-2 mb-4">
                    {doctor.videoConsultation && (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Video className="h-3 w-3" />
                        <span>Video</span>
                      </Badge>
                    )}
                    {doctor.inPersonConsultation && (
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>In-Person</span>
                      </Badge>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      Languages: {doctor.languages.join(', ')}
                    </p>
                  </div>

                  {/* Fee and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-green-600">${doctor.consultationFee}</span>
                      <span className="text-sm text-gray-600"> consultation</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleChat(doctor)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleBookNow(doctor)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all specialties.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
