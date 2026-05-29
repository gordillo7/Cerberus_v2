import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { Button, Card, Input } from '@/components/Common';
import { scannerAPI } from '@/services/api';
import { Play, Square, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Scanner: React.FC = () => {
  const [target, setTarget] = useState('');
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [scanType, setScanType] = useState('regular');
  const [comprehensive, setComprehensive] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const startScan = async () => {
    if (!target.trim()) {
      toast.error('Please enter a target');
      return;
    }

    setScanning(true);
    setLogs([]);

    try {
      const formData = new FormData();
      formData.append('target', target);
      formData.append('scanType', scanType);
      if (comprehensive) {
        formData.append('comprehensive', 'true');
      }

      const response = await fetch('/fullscan', {
        method: 'POST',
        body: formData,
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to get response stream');

      const decoder = new TextDecoder();
      let chunk;

      while (!(chunk = await reader.read()).done) {
        const text = decoder.decode(chunk.value, { stream: true });
        const lines = text.split('\n').filter((line) => line.trim());
        setLogs((prev) => [...prev, ...lines]);
      }

      toast.success('Scan completed successfully');
    } catch (error) {
      console.error('Scan failed:', error);
      toast.error('Scan failed');
    } finally {
      setScanning(false);
    }
  };

  const stopScan = async () => {
    try {
      await scannerAPI.stopScan();
      setScanning(false);
      toast.success('Scan stopped');
    } catch (error) {
      console.error('Failed to stop scan:', error);
      toast.error('Failed to stop scan');
    }
  };

  return (
    <Layout pageTitle="Scanner">
      <div className="space-y-6">
        <Card>
          <h3 className="mb-4 text-lg font-bold">Start New Scan</h3>
          <div className="space-y-4">
            <Input
              label="Target URL or IP"
              placeholder="e.g., https://example.com or 192.168.1.1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={scanning}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Scan Type
                </label>
                <select
                  value={scanType}
                  onChange={(e) => setScanType(e.target.value)}
                  disabled={scanning}
                  className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-slate-50"
                >
                  <option value="regular">Regular Scan</option>
                  <option value="project">Project Scan</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={comprehensive}
                    onChange={(e) => setComprehensive(e.target.checked)}
                    disabled={scanning}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-800"
                  />
                  <span className="text-sm text-slate-200">
                    Comprehensive Scan
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              {!scanning ? (
                <Button onClick={startScan} variant="primary">
                  <Play className="h-4 w-4" />
                  Start Scan
                </Button>
              ) : (
                <Button onClick={stopScan} variant="danger">
                  <Square className="h-4 w-4" />
                  Stop Scan
                </Button>
              )}
            </div>
          </div>
        </Card>

        {logs.length > 0 && (
          <Card>
            <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Scan Output
            </h3>
            <div className="max-h-96 overflow-y-auto rounded-lg bg-black p-4 font-mono text-sm text-green-400">
              {logs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};
