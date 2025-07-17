import { redirect } from 'next/navigation'

export default function ProjectIndex({ params }: { params: { projectId: string } }) {
  // Redirect to default sub-route
  return redirect(`/projects/${params.projectId}/scanner`)
}