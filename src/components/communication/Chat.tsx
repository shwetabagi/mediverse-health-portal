
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Video, 
  Phone, 
  Paperclip, 
  Smile,
  Stethoscope,
  User,
  Clock,
  MessageCircle,
  Search
} from 'lucide-react';
import { User as UserType } from '@/pages/Index';

interface ChatProps {
  user: UserType;
}

export const Chat = ({ user }: ChatProps) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: user.role === 'patient' ? 'Dr. Sarah Johnson' : 'John Smith',
      role: user.role === 'patient' ? 'Cardiologist' : 'Patient',
      lastMessage: 'How are you feeling today?',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      type: 'consultation'
    },
    {
      id: 2,
      name: user.role === 'patient' ? 'Dr. Michael Chen' : 'Emily Davis',
      role: user.role === 'patient' ? 'General Medicine' : 'Patient',
      lastMessage: 'Your lab results are ready',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      type: 'follow-up'
    },
    {
      id: 3,
      name: user.role === 'patient' ? 'Dr. Emily Rodriguez' : 'Robert Wilson',
      role: user.role === 'patient' ? 'Pediatrics' : 'Patient',
      lastMessage: 'Thank you for the consultation',
      timestamp: '3 hours ago',
      unread: 0,
      online: true,
      type: 'completed'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: user.role === 'patient' ? 'Dr. Sarah Johnson' : 'John Smith',
      content: 'Hello! How are you feeling today?',
      timestamp: '10:30 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: 2,
      sender: user.name,
      content: 'Hi Doctor, I\'ve been experiencing some chest discomfort since yesterday.',
      timestamp: '10:32 AM',
      isOwn: true,
      type: 'text'
    },
    {
      id: 3,
      sender: user.role === 'patient' ? 'Dr. Sarah Johnson' : 'John Smith',
      content: 'Can you describe the pain? Is it sharp or dull? Does it worsen with activity?',
      timestamp: '10:33 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: 4,
      sender: user.name,
      content: 'It\'s more of a dull ache, and yes, it gets worse when I climb stairs.',
      timestamp: '10:35 AM',
      isOwn: true,
      type: 'text'
    },
    {
      id: 5,
      sender: user.role === 'patient' ? 'Dr. Sarah Johnson' : 'John Smith',
      content: 'I\'d like to schedule you for an ECG. Can you come in tomorrow morning?',
      timestamp: '10:37 AM',
      isOwn: false,
      type: 'text'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white mb-6">
        <h1 className="text-3xl font-bold mb-2">Medical Consultations</h1>
        <p className="text-green-100">Secure messaging with healthcare professionals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Conversations</span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                    selectedChat === conversation.id ? 'bg-blue-50 border-r-2 border-r-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {user.role === 'patient' ? (
                          <Stethoscope className="h-5 w-5 text-gray-600" />
                        ) : (
                          <User className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{conversation.name}</h4>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="ml-2">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{conversation.role}</p>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                        <Badge variant="outline" className="text-xs">
                          {conversation.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {user.role === 'patient' ? (
                        <Stethoscope className="h-5 w-5 text-gray-600" />
                      ) : (
                        <User className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-600">{selectedConversation.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-end mt-1">
                          <Clock className="h-3 w-3 mr-1 opacity-70" />
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
