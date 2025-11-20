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

            <div className="container mx-auto px-4 sm:px-6 text-center z-10">
                <div className="mb-6 sm:mb-8 inline-block px-4 sm:px-6 py-2 rounded-full border border-glass-border bg-glass-bg backdrop-blur-md text-xs sm:text-sm font-medium text-muted">
                    Available for new opportunities
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-6 sm:mb-8 tracking-tighter px-2">
                    Hi, I'm <span className="text-gradient">{name}</span>
                </h1>

                <h2 className="text-xl sm:text-2xl md:text-4xl font-medium text-foreground/80 mb-6 sm:mb-8 px-2">
                    {title}
                </h2>

                <p className="text-base sm:text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-4">
                    {tagline}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
                    <Link
                        href="/#projects"
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20 text-sm sm:text-base"
                    >
                        View My Work
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-glass-bg hover:bg-glass-border text-foreground border border-glass-border rounded-full font-semibold backdrop-blur-sm transition-all transform hover:scale-105 text-sm sm:text-base"
                    >
                        Contact Me
                    </Link>
                </div>

                <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center px-4">
                    {portfolioData.personal.valueProps.map((prop, index) => (
                        <div
                            key={index}
                            className={`p-4 sm:p-6 rounded-2xl bg-glass-bg border border-glass-border backdrop-blur-sm hover:border-primary/30 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <p className="font-medium text-foreground/90 text-sm sm:text-base">{prop}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
