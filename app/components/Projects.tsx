'use client';

import { portfolioData } from '../content/portfolio-data';
import Link from 'next/link';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function Projects() {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="projects" className="py-12 sm:py-20 relative">
            <div ref={ref} className={`container mx-auto px-4 sm:px-6 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
                    Featured <span className="text-gradient">Projects</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {portfolioData.projects.map((project) => (
                        <Link key={project.id} href={`/projects/${project.slug}`} className="block group">
                            <div className="h-full relative rounded-3xl overflow-hidden bg-glass-bg border border-glass-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="mb-6 flex items-center justify-between">
                                        <span className="text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">{project.category}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-muted mb-8 flex-grow line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.technologies.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-muted/10 text-muted border border-muted/20">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
