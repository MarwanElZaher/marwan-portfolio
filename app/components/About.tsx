'use client';

import { portfolioData } from '../content/portfolio-data';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function About() {
    const { description, location, email, education, values, interests } = portfolioData.personal;
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="about" className="py-12 sm:py-20 relative">
            <div ref={ref} className={`container mx-auto px-4 sm:px-6 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center">
                        About <span className="text-gradient">Me</span>
                    </h2>

                    <div className="glass-panel p-6 sm:p-8 md:p-12 rounded-3xl space-y-8">
                        {/* Main Description */}
                        <div className="space-y-4">
                            {description.split('\n\n').map((paragraph, i) => (
                                <p key={i} className="text-base sm:text-lg text-muted leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Education */}
                        {education && (
                            <div className="border-t border-glass-border pt-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                                    Education
                                </h3>
                                <div className="text-muted leading-relaxed whitespace-pre-line">
                                    {education}
                                </div>
                            </div>
                        )}

                        {/* Core Values */}
                        {values && values.length > 0 && (
                            <div className="border-t border-glass-border pt-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    What I Value
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {values.map((value, i) => (
                                        <span key={i} className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg font-medium">
                                            {value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Beyond the Screen */}
                        {interests && (
                            <div className="border-t border-glass-border pt-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Beyond the Screen
                                </h3>
                                <p className="text-muted leading-relaxed">
                                    {interests}
                                </p>
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="border-t border-glass-border pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
