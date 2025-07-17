"use client"
import type React from "react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { Play, Square, Trash2, Settings, Target } from "lucide-react"

export default function ProjectScanner() {
  const { projectId } = useParams()
  const [target, setTarget] = useState("example.com")
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "[INFO] Scanner initialized",
    "[INFO] Loading security modules...",
    "[INFO] Ready to scan",
  ])

  const startScan = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLogs((prev) => [...prev, "[INFO] Starting comprehensive scan..."])

    // Simulate scan progress
    const scanSteps = [
      "[INFO] Port scanning initiated",
      "[INFO] Discovered open ports: 80, 443, 22",
      "[INFO] Starting vulnerability assessment",
      "[WARN] Potential SQL injection found",
      "[INFO] Checking SSL/TLS configuration",
      "[INFO] Analyzing web application security",
      "[SUCCESS] Scan completed successfully",
    ]

    for (let i = 0; i < scanSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setLogs((prev) => [...prev, scanSteps[i]])
    }

    setLoading(false)
  }

  const clearConsole = () => {
    setLogs(["[INFO] Console cleared"])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Target Configuration */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-indigo-600/20 rounded-lg">
            <Target className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Target Configuration</h2>
        </div>

        <form onSubmit={startScan} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target URL/IP</label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter target URL or IP address"
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300">Scan Options</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="comprehensive"
                  className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-300">Comprehensive Scan</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="stealth"
                  className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-300">Stealth Mode</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="aggressive"
                  className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-300">Aggressive Testing</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Scan</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Console */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <Settings className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Scan Console</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setLoading(false)}
              disabled={!loading}
              className="flex items-center space-x-1 px-3 py-1 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 disabled:opacity-50 transition-colors"
            >
              <Square className="w-3 h-3" />
              <span className="text-sm">Stop</span>
            </button>
            <button
              onClick={clearConsole}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span className="text-sm">Clear</span>
            </button>
          </div>
        </div>

        <div className="scan-console rounded-lg p-4 h-96 overflow-auto font-mono text-sm">
          {logs.map((line, i) => (
            <div
              key={i}
              className={`mb-1 ${
                line.includes("[ERROR]")
                  ? "text-red-400"
                  : line.includes("[WARN]")
                    ? "text-yellow-400"
                    : line.includes("[SUCCESS]")
                      ? "text-green-400"
                      : "text-gray-300"
              }`}
            >
              <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {line}
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 text-indigo-400">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <span>Processing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
