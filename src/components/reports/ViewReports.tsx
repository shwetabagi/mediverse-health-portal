
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Download, Eye, Search, Filter, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ViewReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { toast } = useToast();

  const reports = [
    {
      id: '1',
      name: 'Blood Test Results',
      type: 'Lab Report',
      date: '2024-01-10',
      doctor: 'Dr. Sarah Johnson',
      status: 'Normal',
      fileSize: '2.3 MB'
    },
    {
      id: '2',
      name: 'X-Ray Chest',
      type: 'Imaging',
      date: '2024-01-08',
      doctor: 'Dr. Michael Chen',
      status: 'Reviewed',
      fileSize: '5.1 MB'
    },
    {
      id: '3',
      name: 'ECG Report',
      type: 'Cardiac',
      date: '2024-01-05',
      doctor: 'Dr. Sarah Johnson',
      status: 'Normal',
      fileSize: '1.8 MB'
    },
    {
      id: '4',
      name: 'MRI Scan - Knee',
      type: 'Imaging',
      date: '2024-01-03',
      doctor: 'Dr. James Wilson',
      status: 'Under Review',
      fileSize: '12.4 MB'
    },
    {
      id: '5',
      name: 'Allergy Test Panel',
      type: 'Lab Report',
      date: '2023-12-28',
      doctor: 'Dr. Emily Rodriguez',
      status: 'Normal',
      fileSize: '3.2 MB'
    }
  ];

  const handleViewReport = (reportName: string) => {
    toast({
      title: "Opening Report",
      description: `Opening ${reportName} in viewer...`
    });
  };

  const handleDownloadReport = (reportName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${reportName}...`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || report.type.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>Medical Reports</span>
          </CardTitle>
          <CardDescription>View, download, and manage your medical reports and test results</CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports, doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Reports</option>
                <option value="lab report">Lab Reports</option>
                <option value="imaging">Imaging</option>
                <option value="cardiac">Cardiac</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{report.name}</h3>
                    <p className="text-gray-600">{report.type}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{report.date}</span>
                      </div>
                      <span>•</span>
                      <span>{report.doctor}</span>
                      <span>•</span>
                      <span>{report.fileSize}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewReport(report.name)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadReport(report.name)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
