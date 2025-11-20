'use client';

import Link from 'next/link';
import { portfolioData } from '../content/portfolio-data';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function Hero() {
    const { name, title, tagline, description } = portfolioData.personal;
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section ref={ref} className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Background Elements - More subtle and futuristic */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 text-center z-10">
                <div className="mb-8 inline-block px-6 py-2 rounded-full border border-glass-border bg-glass-bg backdrop-blur-md text-sm font-medium text-muted">
                    Available for new opportunities
                </div>

                <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
                    Hi, I'm <span className="text-gradient">{name}</span>
                </h1>

                <h2 className="text-2xl md:text-4xl font-medium text-foreground/80 mb-8">
                    {title}
                </h2>

                <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                    {tagline}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link
                        href="/#projects"
                        className="px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
                    >
                        View My Work
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-glass-bg hover:bg-glass-border text-foreground border border-glass-border rounded-full font-semibold backdrop-blur-sm transition-all transform hover:scale-105"
                    >
                        Contact Me
                    </Link>
                </div>

                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {portfolioData.personal.valueProps.map((prop, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl bg-glass-bg border border-glass-border backdrop-blur-sm hover:border-primary/30 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <p className="font-medium text-foreground/90">{prop}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
