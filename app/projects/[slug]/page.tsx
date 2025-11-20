import { portfolioData } from '@/app/content/portfolio-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center text-muted hover:text-primary transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Back to Projects
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-sm font-bold tracking-wider uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
            {project.title}
          </h1>

          <div className="glass-panel p-8 md:p-12 rounded-3xl mb-12">
            <p className="text-xl text-muted leading-relaxed mb-8">
              {project.content}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-secondary/10 text-secondary border border-secondary/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-glass-bg border border-glass-border text-foreground rounded-full font-semibold hover:border-primary/50 transition-all"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}