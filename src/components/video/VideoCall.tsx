
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Settings,
  Users,
  MessageSquare,
  ScreenShare,
  ScreenShareOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User as UserType } from '@/pages/Index';

interface VideoCallProps {
  user: UserType;
  participants?: Array<{
    id: string;
    name: string;
    role: string;
    isConnected: boolean;
  }>;
}

export const VideoCall = ({ user, participants = [] }: VideoCallProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Mock participants data
  const mockParticipants = [
    {
      id: '1',
      name: user.role === 'patient' ? 'Dr. Sarah Johnson' : 'John Smith',
      role: user.role === 'patient' ? 'Cardiologist' : 'Patient',
      isConnected: true
    },
    ...participants
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = async () => {
    try {
      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: isVideoEnabled, 
        audio: isAudioEnabled 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setIsCallActive(true);
      setCallDuration(0);
      toast({
        title: "Call Started",
        description: "Video call has been initiated successfully."
      });
    } catch (error) {
      toast({
        title: "Call Failed",
        description: "Unable to access camera or microphone.",
        variant: "destructive"
      });
    }
  };

  const endCall = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    
    setIsCallActive(false);
    setCallDuration(0);
    setIsScreenSharing(false);
    toast({
      title: "Call Ended",
      description: "Video call has been ended."
    });
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
      }
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);
        toast({
          title: "Screen Sharing Started",
          description: "Your screen is now being shared."
        });
      } else {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoEnabled, 
          audio: isAudioEnabled 
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = cameraStream;
        }
        setIsScreenSharing(false);
        toast({
          title: "Screen Sharing Stopped",
          description: "Screen sharing has been stopped."
        });
      }
    } catch (error) {
      toast({
        title: "Screen Share Failed",
        description: "Unable to share screen.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Video Consultation</h1>
        <p className="text-purple-100">Secure video calls with healthcare professionals</p>
      </div>

      {!isCallActive ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pre-call Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Start Video Call</CardTitle>
              <CardDescription>Join or start a video consultation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Camera Preview */}
              <div className="relative bg-gray-200 rounded-lg overflow-hidden h-48">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                {!isVideoEnabled && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <VideoOff className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleVideo}
                  className={!isVideoEnabled ? 'bg-red-100 hover:bg-red-200' : ''}
                >
                  {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAudio}
                  className={!isAudioEnabled ? 'bg-red-100 hover:bg-red-200' : ''}
                >
                  {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={startCall} className="w-full bg-green-600 hover:bg-green-700">
                <Video className="h-4 w-4 mr-2" />
                Start Call
              </Button>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Participants</span>
              </CardTitle>
              <CardDescription>Who will join this call</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-gray-600">{participant.role}</p>
                      </div>
                    </div>
                    <Badge variant={participant.isConnected ? "default" : "secondary"}>
                      {participant.isConnected ? "Online" : "Offline"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Call Interface */}
          <Card>
            <CardContent className="p-0">
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {/* Remote Video */}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="w-full h-full object-cover"
                />
                
                {/* Local Video (Picture-in-Picture) */}
                <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!isVideoEnabled && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <VideoOff className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Call Info */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-white">
                    <p className="font-medium">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-300">Cardiologist</p>
                    <p className="text-sm text-gray-300">{formatDuration(callDuration)}</p>
                  </div>
                </div>

                {/* Connection Status */}
                <div className="absolute bottom-20 left-4">
                  <Badge className="bg-green-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Connected
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleAudio}
                  className={!isAudioEnabled ? 'bg-red-100 hover:bg-red-200' : ''}
                >
                  {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleVideo}
                  className={!isVideoEnabled ? 'bg-red-100 hover:bg-red-200' : ''}
                >
                  {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleScreenShare}
                  className={isScreenSharing ? 'bg-blue-100 hover:bg-blue-200' : ''}
                >
                  {isScreenSharing ? <ScreenShareOff className="h-5 w-5" /> : <ScreenShare className="h-5 w-5" />}
                </Button>
                
                <Button variant="outline" size="lg">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={endCall}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
