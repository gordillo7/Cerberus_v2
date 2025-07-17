"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Calendar, Target, MoreVertical } from "lucide-react"

interface Project {
  id: string
  name: string
  target: string
  created_at: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Mock data for demonstration
    setProjects([
      { id: "1", name: "E-commerce Security Audit", target: "shop.example.com", created_at: "2024-01-15" },
      { id: "2", name: "Corporate Network Scan", target: "192.168.1.0/24", created_at: "2024-01-14" },
      { id: "3", name: "Web Application Test", target: "app.testsite.org", created_at: "2024-01-13" },
    ])
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your security assessment projects</p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}/scanner`}
            className="glass-effect rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300 group card-3d"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-indigo-600/20 rounded-lg">
                <Target className="w-5 h-5 text-indigo-400" />
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {project.name}
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Target className="w-4 h-4" />
                <span>{project.target}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Created {project.created_at}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Active</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-800/30 rounded-full w-16 h-16 mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6">Create your first security assessment project</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
            Create Project
          </button>
        </div>
      )}
    </div>
  )
}
