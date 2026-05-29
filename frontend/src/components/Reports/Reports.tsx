import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { Button, Card } from '@/components/Common';
import { reportsAPI } from '@/services/api';
import { Trash2, Download, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface Report {
  filename: string;
}

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const res = await reportsAPI.getReports();
      setReports(res.data);
    } catch (error) {
      console.error('Failed to load reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      await reportsAPI.deleteReport(filename);
      toast.success('Report deleted successfully');
      await loadReports();
    } catch (error) {
      console.error('Failed to delete report:', error);
      toast.error('Failed to delete report');
    }
  };

  const handleDownload = (filename: string) => {
    window.open(`/report/${filename}`, '_blank');
  };

  if (loading) {
    return (
      <Layout pageTitle="Reports">
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-400">Loading reports...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Reports">
      <div className="space-y-6">
        {reports.length === 0 ? (
          <Card className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-slate-500 mb-4" />
            <p className="text-slate-400">No reports available yet.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <Card key={report.filename} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-medium">{report.filename}</p>
                    <p className="text-xs text-slate-400">PDF Document</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(report.filename)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(report.filename)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
