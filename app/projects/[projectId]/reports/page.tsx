"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { FileText, Download, Eye, Calendar, AlertTriangle, TrendingUp } from "lucide-react"

interface ProjectReport {
  id: string
  filename: string
  date: string
  type: "vulnerability" | "network" | "web" | "compliance"
  size: string
  vulnerabilities: number
  status: "completed" | "processing"
}

export default function ProjectReports() {
  const { projectId } = useParams()
  const [reports, setReports] = useState<ProjectReport[]>([])

  useEffect(() => {
    // Mock data for project reports
    setReports([
      {
        id: "1",
        filename: "vulnerability_scan_2024-01-15.pdf",
        date: "2024-01-15",
        type: "vulnerability",
        size: "2.4 MB",
        vulnerabilities: 8,
        status: "completed",
      },
      {
        id: "2",
        filename: "network_analysis_2024-01-14.pdf",
        date: "2024-01-14",
        type: "network",
        size: "1.8 MB",
        vulnerabilities: 3,
        status: "completed",
      },
      {
        id: "3",
        filename: "web_app_scan_2024-01-13.pdf",
        date: "2024-01-13",
        type: "web",
        size: "3.2 MB",
        vulnerabilities: 12,
        status: "processing",
      },
    ])
  }, [projectId])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vulnerability":
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case "network":
        return <TrendingUp className="w-5 h-5 text-blue-400" />
      case "web":
        return <FileText className="w-5 h-5 text-green-400" />
      case "compliance":
        return <FileText className="w-5 h-5 text-yellow-400" />
      default:
        return <FileText className="w-5 h-5 text-gray-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vulnerability":
        return "bg-red-500/20 text-red-400"
      case "network":
        return "bg-blue-500/20 text-blue-400"
      case "web":
        return "bg-green-500/20 text-green-400"
      case "compliance":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-2xl font-bold text-white">{reports.reduce((acc, r) => acc + r.vulnerabilities, 0)}</p>
              <p className="text-gray-400 text-sm">Vulnerabilities Found</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-6 card-3d hover:bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{reports.filter((r) => r.status === "completed").length}</p>
              <p className="text-gray-400 text-sm">Completed Scans</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Project Reports</h2>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-800/30 rounded-full w-16 h-16 mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No reports yet</h3>
            <p className="text-gray-400 mb-6">Run a scan to generate your first report</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {reports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-800/30 transition-colors card-3d">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-800/50 rounded-lg">{getTypeIcon(report.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{report.filename}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {report.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-white font-medium">{report.vulnerabilities}</p>
                      <p className="text-gray-400 text-sm">vulnerabilities</p>
                    </div>
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
        )}
      </div>
    </div>
  )
}
