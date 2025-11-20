'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);

    // Handle Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedIndex(null);
                setDirection(null);
            } else if (e.key === 'ArrowRight') {
                setDirection('right');
                setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowLeft') {
                setDirection('left');
                setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [images.length]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDirection('right');
        setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDirection('left');
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    };

    const handleOpen = (index: number) => {
        setDirection(null); // No slide animation on initial open
        setSelectedIndex(index);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                App Screenshots
            </h3>

            {/* Scrollable Gallery */}
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-[85vw] sm:w-[600px] snap-center rounded-2xl overflow-hidden border border-glass-border shadow-xl group relative cursor-zoom-in"
                        onClick={() => handleOpen(i)}
                    >
                        <Image
                            src={img}
                            alt={`${title} screenshot ${i + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-white font-medium flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                                Enlarge
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setSelectedIndex(null)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-6 right-6 z-50 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    {/* Navigation Buttons */}
                    {selectedIndex > 0 && (
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 sm:left-8 z-50 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                    )}

                    {selectedIndex < images.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="absolute right-4 sm:right-8 z-50 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    )}

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
                    >
                        <Image
                            key={selectedIndex} // Force re-render for animation
                            src={images[selectedIndex]}
                            alt={`${title} full screen ${selectedIndex + 1}`}
                            fill
                            className={`object-contain ${direction === 'right' ? 'animate-slide-right' :
                                    direction === 'left' ? 'animate-slide-left' :
                                        'animate-fade-in'
                                }`}
                            priority
                        />

                        {/* Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
