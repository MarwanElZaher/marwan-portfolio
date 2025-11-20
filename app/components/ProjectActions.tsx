'use client';

import { useState } from 'react';

interface ProjectActionsProps {
    liveLink: string;
    repoLink: string;
    projectName: string;
}

export default function ProjectActions({ liveLink, repoLink, projectName }: ProjectActionsProps) {
    const handleRequest = (type: 'Demo' | 'Repo', method: 'email' | 'schedule') => {
        const message = method === 'email'
            ? `I am interested in the ${projectName} ${type}. Can I request access via email?`
            : `I am interested in the ${projectName} ${type}. Can I schedule a meeting to see it?`;

        const event = new CustomEvent('open-chat', {
            detail: { message }
        });
        window.dispatchEvent(event);
    };

    const ActionButton = ({ href, label, type }: { href: string, label: string, type: 'Demo' | 'Repo' }) => {
        const isRestricted = href === '#' || !href;
        const [isHovered, setIsHovered] = useState(false);
        const [showOptions, setShowOptions] = useState(false);

        if (isRestricted) {
            if (showOptions) {
                return (
                    <div className="flex gap-2 animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => handleRequest(type, 'email')}
                            className="flex-1 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span>Email</span>
                        </button>
                        <button
                            onClick={() => handleRequest(type, 'schedule')}
                            className="flex-1 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span>Schedule</span>
                        </button>
                    </div>
                );
            }

            return (
                <button
                    onClick={() => setShowOptions(true)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`
                        relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group w-full
                        ${type === 'Demo'
                            ? 'bg-primary text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600'
                            : 'bg-glass-bg border border-glass-border text-foreground hover:border-primary/50 hover:bg-primary/5'
                        }
                    `}
                >
                    <div className={`flex items-center justify-center gap-2 transition-transform duration-300 ${isHovered ? '-translate-y-12' : 'translate-y-0'}`}>
                        <span>{label}</span>
                        {type === 'Demo' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        )}
                    </div>
                    <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-12'}`}>
                        <span>Request Access</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-5.685-2.347L2.333 19.416 4.5 13.5A8.006 8.006 0 012 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path></svg>
                    </div>
                </button>
            );
        }

        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                    flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all group w-full
                    ${type === 'Demo'
                        ? 'bg-primary text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600'
                        : 'bg-glass-bg border border-glass-border text-foreground hover:border-primary/50 hover:bg-primary/5'
                    }
                `}
            >
                <span>{label}</span>
                {type === 'Demo' ? (
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                ) : (
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                )}
            </a>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <ActionButton href={liveLink} label="View Live Demo" type="Demo" />
            <ActionButton href={repoLink} label="GitHub Repository" type="Repo" />
        </div>
    );
}
