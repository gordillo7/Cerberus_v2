"use client"
import type { ReactNode } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Search, FileText, MessageSquare } from "lucide-react"

export default function ProjectLayout({ children }: { children: ReactNode }) {
  const { projectId } = useParams()
  const pathname = usePathname()

  const tabs = [
    { name: "Scanner", href: `/projects/${projectId}/scanner`, icon: Search },
    { name: "Reports", href: `/projects/${projectId}/reports`, icon: FileText },
    { name: "Chatbot", href: `/projects/${projectId}/chatbot`, icon: MessageSquare },
  ]

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="glass-effect rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Project Dashboard</h1>
        <p className="text-gray-400">Security assessment for target system</p>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-effect rounded-xl p-1">
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  )
}
