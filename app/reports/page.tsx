"use client"
import { useState, useEffect } from "react"
import { FileText, Download, Eye, Calendar, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface Report {
  id: string
  name: string
  target: string
  date: string
  status: "completed" | "failed" | "processing"
  severity: "high" | "medium" | "low"
  vulnerabilities: number
  size: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Mock data
    setReports([
      {
        id: "1",
        name: "E-commerce Security Assessment",
        target: "shop.example.com",
        date: "2024-01-15",
        status: "completed",
        severity: "high",
        vulnerabilities: 12,
        size: "2.4 MB",
      },
      {
        id: "2",
        name: "Network Infrastructure Scan",
        target: "192.168.1.0/24",
        date: "2024-01-14",
        status: "completed",
        severity: "medium",
        vulnerabilities: 5,
        size: "1.8 MB",
      },
      {
        id: "3",
        name: "Web Application Pentest",
        target: "app.testsite.org",
        date: "2024-01-13",
        status: "processing",
        severity: "low",
        vulnerabilities: 2,
        size: "0.9 MB",
      },
    ])
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "processing":
        return <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      default:
        return null
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filteredReports = reports.filter((report) => filter === "all" || report.status === filter)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Reports</h1>
          <p className="text-gray-400">View and manage your security assessment reports</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl p-6 card-3d hover:bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-indigo-400" />
            <div>
              <p className="text-2xl font-bold text-white">{reports.length}</p>
              <p className="text-gray-400 text-sm">Total Reports</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-6 card-3d hover:bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{reports.filter((r) => r.status === "completed").length}</p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-6 card-3d hover:bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-2xl font-bold text-white">{reports.reduce((acc, r) => acc + r.vulnerabilities, 0)}</p>
              <p className="text-gray-400 text-sm">Vulnerabilities</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-6 card-3d hover:bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">7</p>
              <p className="text-gray-400 text-sm">This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Recent Reports</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {filteredReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-800/30 transition-colors card-3d">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-600/20 rounded-lg">
                    <FileText className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{report.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Target: {report.target}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(report.status)}
                    <span className="text-sm text-gray-400 capitalize">{report.status}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                    {report.vulnerabilities} vulnerabilities
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-800/30 rounded-full w-16 h-16 mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No reports found</h3>
          <p className="text-gray-400 mb-6">No reports match the current filter</p>
        </div>
      )}
    </div>
  )
}
