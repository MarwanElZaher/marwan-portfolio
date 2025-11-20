import { portfolioData } from '@/app/content/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectActions from '@/app/components/ProjectActions';
import ProjectGallery from '@/app/components/ProjectGallery';

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

  // Map project slugs to their logo files
  const logoMap: Record<string, string> = {
    'heal-hub': '/hospital-logo.svg',
    'ai-gis-plugin': '/Pentab.svg',
  };

  const projectLogo = logoMap[project.slug];

  return (
    <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <Link
          href="/#projects"
          className="inline-flex items-center text-muted hover:text-primary transition-colors mb-12 group"
        >
          <div className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center mr-3 group-hover:border-primary/50 transition-colors">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </div>
          <span className="font-medium">Back to Projects</span>
        </Link>

        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-block mb-6">
              <span className="text-sm font-bold tracking-widest uppercase text-primary bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight">
              {project.title}
            </h1>
          </div>

          {/* Client Info Card */}
          {(projectLogo || (project as any).client || (project as any).clientLogos) && (
            <div className="glass-panel p-8 rounded-3xl mb-16 flex flex-col items-center justify-center gap-8 border-primary/20 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">

              {/* Single Logo */}
              {projectLogo && (
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Image
                    src={projectLogo}
                    alt={`${project.title} logo`}
                    width={150}
                    height={150}
                    className="rounded-lg object-contain h-20 w-auto"
                  />
                </div>
              )}

              {/* Multiple Client Logos */}
              {(project as any).clientLogos && (
                <div className="flex flex-wrap justify-center gap-6">
                  {(project as any).clientLogos.map((logo: string, i: number) => (
                    <div key={i} className="p-4 bg-white/90 rounded-2xl border border-white/10 hover:scale-105 transition-transform duration-300">
                      <Image
                        src={logo}
                        alt={`Client logo ${i + 1}`}
                        width={120}
                        height={80}
                        className="rounded-lg object-contain h-16 w-auto mix-blend-multiply"
                      />
                    </div>
                  ))}
                </div>
              )}

              {(project as any).client && (
                <div className="text-center">
                  <p className="text-sm text-muted mb-2 uppercase tracking-wider font-semibold">Trusted By</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground max-w-2xl leading-relaxed">{(project as any).client}</p>
                </div>
              )}
            </div>
          )}

          {/* Media Gallery */}
          <div className="space-y-12 mb-16 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            {/* Project Image */}
            {(project as any).image && (
              <div className="rounded-3xl overflow-hidden border border-glass-border shadow-2xl group">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={(project as any).image}
                    alt={project.title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            )}

            {/* Project Video */}
            {(project as any).video && (
              <div className="rounded-3xl overflow-hidden border border-glass-border shadow-2xl bg-black aspect-video relative group">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors" />
                <iframe
                  width="100%"
                  height="100%"
                  src={(project as any).video}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}

            {/* Screenshot Gallery */}
            {(project as any).gallery && (
              <ProjectGallery images={(project as any).gallery} title={project.title} />
            )}
          </div>

          {/* Content & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Project Overview
              </h3>
              <div className="glass-panel p-8 rounded-3xl space-y-6">
                {project.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg text-muted leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Key Features */}
            {(project as any).features && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary rounded-full"></span>
                  Key Features
                </h3>
                <div className="glass-panel p-6 sm:p-8 rounded-3xl">
                  <ul className="grid grid-cols-1 gap-4">
                    {(project as any).features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 group">
                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-lg text-foreground/90 group-hover:text-primary transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Details */}
          {/* Tech Stack */}
          <div className="my-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Technologies
            </h3>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <ProjectActions
            liveLink={project.link}
            repoLink={project.github}
            projectName={project.title}
          />
        </div>
      </div>
    </main >
  );
}