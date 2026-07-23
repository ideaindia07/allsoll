'use client';

import { useState } from 'react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'company',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <section id="contact" className="relative py-24 md:py-40 px-6 md:px-10 lg:px-20 bg-black text-background overflow-hidden">
            {/* Gradient Blob */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/10 blur-[150px] rounded-full pointer-events-none -z-0" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-purple/10 blur-[150px] rounded-full pointer-events-none -z-0" />

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 text-foreground">
                        Let's talk
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto">
                        Whether you're building a team or looking for your next opportunity, we'd love to hear from you.
                    </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-[13px] uppercase tracking-[0.15em] mb-3 opacity-60 text-muted-foreground">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-0 py-4 bg-transparent border-b border-white/20 focus:border-white focus:outline-none transition-colors placeholder:text-white/30 text-lg text-foreground"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-[13px] uppercase tracking-[0.15em] mb-3 opacity-60 text-muted-foreground">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-0 py-4 bg-transparent border-b border-white/20 focus:border-white focus:outline-none transition-colors placeholder:text-white/30 text-lg text-foreground"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] uppercase tracking-[0.15em] mb-4 opacity-60 text-muted-foreground">
                            I am a...
                        </label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'company' })}
                                className={`px-8 py-4 rounded-full text-sm font-medium transition-all ${formData.type === 'company'
                                    ? 'bg-foreground text-background'
                                    : 'border border-white/20 hover:border-white/50 text-foreground'
                                    }`}
                            >
                                Company
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'candidate' })}
                                className={`px-8 py-4 rounded-full text-sm font-medium transition-all ${formData.type === 'candidate'
                                    ? 'bg-foreground text-background'
                                    : 'border border-white/20 hover:border-white/50 text-foreground'
                                    }`}
                            >
                                Candidate
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-[13px] uppercase tracking-[0.15em] mb-3 opacity-60 text-muted-foreground">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="w-full px-0 py-4 bg-transparent border-b border-white/20 focus:border-white focus:outline-none transition-colors placeholder:text-white/30 text-lg resize-none text-foreground"
                            placeholder="Tell us about yourself or your hiring needs..."
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background font-medium rounded-full hover:scale-105 transition-transform text-lg"
                        >
                            Send message
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Contact Info */}
                <div className="mt-24 pt-12 border-t border-background/10">
                    <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
                        <div>
                            <p className="text-[13px] uppercase tracking-[0.15em] opacity-40 mb-2">Email</p>
                            <a href="mailto:hello@purposetalent.xyz" className="text-lg hover:opacity-70 transition-opacity">
                                hello@purposetalent.xyz
                            </a>
                        </div>
                        <div>
                            <p className="text-[13px] uppercase tracking-[0.15em] opacity-40 mb-2">Location</p>
                            <p className="text-lg">New York, NY</p>
                        </div>
                        <div>
                            <p className="text-[13px] uppercase tracking-[0.15em] opacity-40 mb-2">Social</p>
                            <div className="flex justify-center md:justify-start gap-6">
                                <a href="#" className="text-lg hover:opacity-70 transition-opacity">LinkedIn</a>
                                <a href="#" className="text-lg hover:opacity-70 transition-opacity">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
