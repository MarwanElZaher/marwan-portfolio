'use client';

import { useEffect } from 'react';

interface CalendlyModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
}

export default function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
    useEffect(() => {
        if (isOpen) {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl h-[80vh] bg-background rounded-2xl shadow-2xl overflow-hidden border border-glass-border">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-glass-bg rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div
                    className="calendly-inline-widget w-full h-full"
                    data-url={url}
                    style={{ minWidth: '320px', height: '100%' }}
                />
            </div>
        </div>
    );
}
