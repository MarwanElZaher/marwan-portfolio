'use client';

import { portfolioData } from '../content/portfolio-data';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function Skills() {
    const { ref, isVisible } = useIntersectionObserver({
        threshold: 0.1
    });

    return (
        <section id="skills" className="py-20 relative">
            <div
                ref={ref}
                className={`container mx-auto px-6 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
                    My <span className="text-gradient">Skills</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {portfolioData.skills.map((skill) => (
                        <div key={skill.category} className="p-6 rounded-2xl bg-glass-bg border border-glass-border hover:border-primary/30 transition-colors">
                            <h3 className="text-xl font-bold mb-6 capitalize text-primary">{skill.category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {skill.items.map((item) => (
                                    <span key={item} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
