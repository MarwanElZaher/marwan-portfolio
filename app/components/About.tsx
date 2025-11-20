'use client';

import { portfolioData } from '../content/portfolio-data';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function About() {
    const { description, location, email } = portfolioData.personal;
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="about" className="py-20 relative">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
                        About <span className="text-gradient">Me</span>
                    </h2>

                    <div className="glass-panel p-8 md:p-12 rounded-3xl">
                        <p className="text-lg md:text-xl text-muted leading-relaxed mb-8">
                            {description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-4 text-gray-400">
                                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </span>
                                <div>
                                    <p className="text-sm text-muted/80">Location</p>
                                    <p className="text-foreground font-medium">{location}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 text-gray-400">
                                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </span>
                                <div>
                                    <p className="text-sm text-muted/80">Email</p>
                                    <a href={`mailto:${email}`} className="text-foreground hover:text-primary transition-colors font-medium">{email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
