'use client';

import { useState } from 'react';
import { portfolioData } from '../content/portfolio-data';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(`Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div
        ref={ref}
        className={`container mx-auto max-w-4xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          Get in <span className="text-gradient">Touch</span>
        </h1>

        <p className="text-xl text-muted text-center mb-16 max-w-2xl mx-auto">
          Have a project in mind or want to discuss the latest in AI and automation?
          I'm always open to new opportunities and interesting conversations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted/80">Email</p>
                    <a href={`mailto:${portfolioData.personal.email}`} className="text-lg text-foreground hover:text-primary transition-colors">
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted/80">Location</p>
                    <p className="text-lg text-foreground">{portfolioData.personal.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Social Profiles</h3>
              <div className="flex gap-4">
                {Object.entries(portfolioData.personal.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-glass-bg hover:bg-glass-border border border-glass-border text-muted hover:text-primary transition-colors capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-8 rounded-2xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h3>
                <p className="text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-glass-bg border border-glass-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder-muted/50"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-glass-bg border border-glass-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder-muted/50"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-glass-bg border border-glass-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-foreground placeholder-muted/50"
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}