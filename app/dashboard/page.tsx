import { Activity, Shield, FileText, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Active Modules",
      value: "12",
      change: "+2.5%",
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Generated Reports",
      value: "847",
      change: "+12.3%",
      icon: FileText,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Active Scans",
      value: "3",
      change: "-1.2%",
      icon: Activity,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Vulnerabilities",
      value: "24",
      change: "+5.7%",
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
  ]

  const recentScans = [
    { target: "example.com", status: "Completed", time: "2 hours ago", severity: "High" },
    { target: "testsite.org", status: "Running", time: "5 minutes ago", severity: "Medium" },
    { target: "demo.net", status: "Completed", time: "1 day ago", severity: "Low" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
          <p className="text-gray-400">Monitor your cybersecurity operations in real-time</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300 card-3d"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className={`text-2xl font-bold text-white number-animate delay-${index + 1}`}>{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Scans */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Scans</h2>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentScans.map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors card-3d"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      scan.status === "Completed"
                        ? "bg-green-500"
                        : scan.status === "Running"
                          ? "bg-yellow-500 animate-pulse"
                          : "bg-gray-500"
                    }`}
                  ></div>
                  <div>
                    <p className="text-white font-medium">{scan.target}</p>
                    <p className="text-gray-400 text-sm">{scan.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      scan.severity === "High"
                        ? "bg-red-500/20 text-red-400"
                        : scan.severity === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {scan.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="glass-effect rounded-xl p-6 card-3d hover:bg-gray-800/50">
          <h2 className="text-xl font-semibold text-white mb-6">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">CPU Usage</span>
              <span className="text-white font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Memory Usage</span>
              <span className="text-white font-medium">67%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "67%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Network Activity</span>
              <span className="text-white font-medium">23%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "23%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
