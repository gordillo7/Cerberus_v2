"use client"
import { useState } from "react"
import type React from "react"

import { Play, Square, Trash2, Settings, Target, Zap, Shield, Search } from "lucide-react"

export default function ScannerPage() {
  const [target, setTarget] = useState("")
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "[INFO] Cerberus Scanner v2.0 initialized",
    "[INFO] Loading security modules...",
    "[INFO] All systems ready",
  ])

  const scanProfiles = [
    { name: "Quick Scan", description: "Fast port scan and basic checks", time: "~5 min", icon: Zap },
    { name: "Standard Scan", description: "Comprehensive vulnerability assessment", time: "~30 min", icon: Shield },
    { name: "Deep Scan", description: "Thorough security analysis", time: "~2 hours", icon: Search },
  ]

  const startScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!target.trim()) return

    setLoading(true)
    setLogs((prev) => [...prev, `[INFO] Starting scan for target: ${target}`])

    const scanSteps = [
      "[INFO] Initializing scan modules",
      "[INFO] Performing DNS resolution",
      "[INFO] Port scanning in progress...",
      "[INFO] Discovered services: HTTP, HTTPS, SSH, FTP",
      "[INFO] Starting vulnerability detection",
      "[WARN] Potential security issue detected",
      "[INFO] Analyzing SSL/TLS configuration",
      "[INFO] Checking for common vulnerabilities",
      "[SUCCESS] Scan completed - Report generated",
    ]

    for (let i = 0; i < scanSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setLogs((prev) => [...prev, scanSteps[i]])
    }

    setLoading(false)
  }

  const clearConsole = () => {
    setLogs(["[INFO] Console cleared - Ready for new scan"])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Scanner</h1>
          <p className="text-gray-400">Comprehensive vulnerability assessment and penetration testing</p>
        </div>
      </div>

      {/* Scan Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scanProfiles.map((profile, index) => {
          const Icon = profile.icon
          return (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group card-3d"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-indigo-600/20 rounded-lg group-hover:bg-indigo-600/30 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
                  <p className="text-sm text-gray-400">{profile.time}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{profile.description}</p>
            </div>
          )
        })}
      </div>

      {/* Main Scanner Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Target Configuration */}
        <div className="glass-effect rounded-xl p-6 card-3d hover:bg-gray-800/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-600/20 rounded-lg">
              <Target className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Target Configuration</h2>
          </div>

          <form onSubmit={startScan} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target URL/IP Address</label>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="example.com or 192.168.1.1"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Scan Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-300 text-sm">Port Scan</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-300 text-sm">Vuln Assessment</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-300 text-sm">Web App Scan</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-300 text-sm">SSL/TLS Check</span>
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
                  <span>Start Security Scan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Console Output */}
        <div className="glass-effect rounded-xl p-6 card-3d hover:bg-gray-800/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Settings className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Scan Output</h2>
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
                <span>Processing scan...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
