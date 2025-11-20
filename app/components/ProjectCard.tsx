import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/app/lib/projects';
interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={400} // Example width, adjust as needed
        height={250} // Example height, adjust as needed
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Link href={`/projects/${project.slug}`} className="text-blue-600 hover:underline">
            View Details
          </Link>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}