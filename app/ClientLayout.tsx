"use client"
import "./globals.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import {
  Shield,
  BarChart3,
  Search,
  FileText,
  Settings,
  Layers,
  Bell,
  User,
  ChevronRight,
  Clock,
  Wifi,
  Zap,
  Moon,
  Sun,
  Command,
  Settings2,
  LogOut,
  UserCircle,
} from "lucide-react"
import { useState, useEffect } from "react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Projects", href: "/projects", icon: Layers },
  { name: "Scanner", href: "/scanner", icon: Search },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

function Header() {
  const pathname = usePathname()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs: { name: string; href: string }[] = []

    if (segments.length === 0 || segments[0] === "dashboard") {
      return [{ name: "Dashboard", href: "/dashboard" }]
    }

    let currentPath = ""
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const name = segment.charAt(0).toUpperCase() + segment.slice(1)
      breadcrumbs.push({ name, href: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  const notifications = [
    {
      id: 1,
      title: "Scan completed",
      message: "Vulnerability scan for example.com finished",
      time: "2 min ago",
      type: "success",
    },
    {
      id: 2,
      title: "High severity alert",
      message: "Critical vulnerability detected",
      time: "5 min ago",
      type: "error",
    },
    {
      id: 3,
      title: "New report available",
      message: "Security assessment report ready",
      time: "10 min ago",
      type: "info",
    },
  ]

  return (
    <header className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/5 to-pink-600/10"></div>

      {/* Glass Effect Overlay */}
      <div className="relative glass-effect-strong border-b border-gray-700/50 backdrop-blur-xl">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Breadcrumbs & Search */}
            <div className="flex items-center space-x-6">
              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2">
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center space-x-2">
                    {index > 0 && <ChevronRight className="w-4 h-4 text-gray-500" />}
                    <Link
                      href={crumb.href}
                      className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        index === breadcrumbs.length - 1
                          ? "text-white font-semibold bg-white/10 backdrop-blur-sm"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {crumb.name}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Right Section - Status & Actions */}
            <div className="flex items-center space-x-4">
              {/* System Status */}
              <div className="hidden lg:flex items-center space-x-4 px-4 py-2 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Online</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Connected</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300 font-mono">
                    {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-700/30"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-700/30"
                >
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500/30 rounded-full animate-ping"></div>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 glass-effect-strong rounded-xl border border-gray-700/50 shadow-2xl z-50">
                    <div className="p-4 border-b border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Notifications</h3>
                        <span className="px-2 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-medium">
                          {notifications.length} new
                        </span>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 hover:bg-gray-800/30 transition-colors border-b border-gray-800/50 last:border-b-0"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === "success"
                                  ? "bg-green-400"
                                  : notification.type === "error"
                                    ? "bg-red-400"
                                    : "bg-blue-400"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm">{notification.title}</p>
                              <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                              <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-700/50">
                      <button className="w-full text-center text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-700/30"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-white font-medium text-sm">Alex Rivera</p>
                    <p className="text-gray-400 text-xs">Security Analyst</p>
                  </div>
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 glass-effect-strong rounded-xl border border-gray-700/50 shadow-2xl z-50">
                    <div className="p-4 border-b border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Alex Rivera</p>
                          <p className="text-gray-400 text-sm">alex@cerberus.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                        <UserCircle className="w-4 h-4" />
                        <span className="text-sm">Profile</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                        <Settings2 className="w-4 h-4" />
                        <span className="text-sm">Preferences</span>
                      </button>
                      <div className="my-2 h-px bg-gray-700/50"></div>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false)
            setShowUserMenu(false)
          }}
        ></div>
      )}
    </header>
  )
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <html lang="es" className="dark">
      <body className="bg-black text-white">
        <div className="flex h-screen">
          {/* Modern Sidebar */}
          <nav className="w-64 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800">
            <div className="p-6">
              <Link href="/dashboard" className="flex items-center space-x-3 mb-8 hover:opacity-80 transition-opacity">
                <div className="p-2 bg-gray-700 rounded-lg shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Cerberus</h1>
              </Link>

              <ul className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? "bg-gray-700 text-white shadow-lg border border-gray-600"
                            : "text-gray-300 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors ${
                            isActive ? "text-gray-200" : "group-hover:text-gray-300"
                          }`}
                        />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-black to-gray-900">
              <div className="p-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
