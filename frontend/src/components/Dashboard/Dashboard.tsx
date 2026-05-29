import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { StatCard } from '@/components/Common';
import { statsAPI as stats } from '@/services/api';
import { Activity, FileText, Package } from 'lucide-react';
import toast from 'react-hot-toast';

interface Stats {
  reports_count: number;
  modules_count: number;
  clients_count: number;
}

interface RecentScan {
  target: string;
  date: string;
  status: string;
}

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<Stats | null>(null);
  const [recentScans, setRecentScans] = useState<RecentScan[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsRes, scansRes] = await Promise.all([
          stats.getStats(),
          stats.getRecentScans(),
        ]);
        setStatsData(statsRes.data);
        setRecentScans(scansRes.data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Layout pageTitle="Dashboard">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
            <p className="mt-4 text-slate-400">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Dashboard">
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            title="Available Modules"
            value={statsData?.modules_count || 0}
            icon={<Package className="h-8 w-8" />}
            description="Security scanning modules"
          />
          <StatCard
            title="Generated Reports"
            value={statsData?.reports_count || 0}
            icon={<FileText className="h-8 w-8" />}
            description="Audit reports created"
          />
          <StatCard
            title="Active Projects"
            value={statsData?.clients_count || 0}
            icon={<Activity className="h-8 w-8" />}
            description="Projects in progress"
          />
        </div>

        {/* Recent Scans */}
        {recentScans.length > 0 && (
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
            <h2 className="mb-4 text-xl font-bold">Recent Scans</h2>
            <div className="space-y-3">
              {recentScans.map((scan, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
                >
                  <div>
                    <p className="font-medium">{scan.target}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(scan.date).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      scan.status === 'Completed'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-red-600/20 text-red-400'
                    }`}
                  >
                    {scan.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
