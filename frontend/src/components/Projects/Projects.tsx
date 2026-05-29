import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { Button, Card, Input } from '@/components/Common';
import { projectsAPI } from '@/services/api';
import { Trash2, Plus, Folder, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  name: string;
  target: string;
  created_at: string;
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', target: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsAPI.getProjects();
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.target) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await projectsAPI.createProject({
        name: formData.name,
        target: formData.target,
      });
      toast.success('Project created successfully');
      setFormData({ name: '', target: '' });
      setShowForm(false);
      await loadProjects();
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.deleteProject(projectId);
      toast.success('Project deleted successfully');
      await loadProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <Layout pageTitle="Projects">
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-400">Loading projects...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Projects">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(!showForm)} variant="primary">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {showForm && (
          <Card className="max-w-2xl">
            <h3 className="mb-4 text-lg font-bold">Create New Project</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Project Name"
                placeholder="e.g., ACME Corp Audit"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                label="Target URL"
                placeholder="e.g., https://example.com"
                value={formData.target}
                onChange={(e) =>
                  setFormData({ ...formData, target: e.target.value })
                }
              />
              <div className="flex gap-3">
                <Button type="submit" isLoading={isSubmitting}>
                  Create Project
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <Folder className="mx-auto h-12 w-12 text-slate-500 mb-4" />
            <p className="text-slate-400">No projects yet. Create one to get started!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <p className="mt-1 break-all text-sm text-orange-600">
                    {project.target}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="h-4 w-4" />
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1">
                    View Reports
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
