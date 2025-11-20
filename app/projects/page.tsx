import type { Metadata } from 'next';
import { projects, Project } from '@/app/lib/projects'; // Import your project data
import ProjectCard from '@/app/components/ProjectCard';
export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Browse through my portfolio of web development projects, showcasing my skills in Next.js, React, and more.',
};
export default function ProjectsPage() {
  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: Project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}