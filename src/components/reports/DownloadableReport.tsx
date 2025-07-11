
import { Button } from '@/components/ui/button';
import { Download, FileText, Image, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadableReportProps {
  report: {
    id: string;
    name: string;
    type: string;
    fileSize: string;
    format: 'pdf' | 'jpg' | 'png' | 'xlsx' | 'docx';
  };
}

export const DownloadableReport = ({ report }: DownloadableReportProps) => {
  const { toast } = useToast();

  console.log('DownloadableReport rendered for:', report.name);

  const generateMockFileContent = (format: string) => {
    console.log('Generating mock file content for format:', format);
    switch (format) {
      case 'pdf':
        return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
100 700 Td
(${report.name}) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000226 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
317
%%EOF`;
      
      case 'xlsx':
        return 'PK\x03\x04\x14\x00\x06\x00\x08\x00\x00\x00!\x00'; // Excel file header
      
      case 'docx':
        return 'PK\x03\x04\x14\x00\x06\x00\x08\x00\x00\x00!\x00'; // Word file header
      
      default:
        return `Medical Report: ${report.name}\nGenerated on: ${new Date().toLocaleDateString()}\n\nThis is a sample medical report file.`;
    }
  };

  const handleDownload = () => {
    console.log('Download button clicked for:', report.name);
    try {
      const content = generateMockFileContent(report.format);
      const blob = new Blob([content], { 
        type: getMimeType(report.format) 
      });
      
      console.log('Blob created:', blob.size, 'bytes');
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${report.name}.${report.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('Download initiated successfully');

      toast({
        title: "Download Started",
        description: `${report.name} is being downloaded.`
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download the file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getMimeType = (format: string) => {
    switch (format) {
      case 'pdf': return 'application/pdf';
      case 'jpg': return 'image/jpeg';
      case 'png': return 'image/png';
      case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default: return 'text/plain';
    }
  };

  const getFileIcon = (format: string) => {
    switch (format) {
      case 'pdf':
      case 'docx':
        return <FileText className="h-4 w-4" />;
      case 'jpg':
      case 'png':
        return <Image className="h-4 w-4" />;
      case 'xlsx':
        return <FileSpreadsheet className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="flex items-center space-x-2"
    >
      {getFileIcon(report.format)}
      <Download className="h-4 w-4" />
      <span>Download</span>
    </Button>
  );
};
