'use client';

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Send } from "lucide-react";

const Twitter = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    helpType: "Talent Consulting",
    message: "",
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add submission logic here
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative overflow-hidden">
      {/* Ambient glows mimicking global design */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-[#3b82f6]/5 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <Header />

      <main className="pt-24 min-h-screen flex flex-col md:flex-row relative z-10">
        {/* Left Column - Info (Matches global background) */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-marker text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.9] text-foreground mb-6">
              SAY <br /> HELLO
            </h1>

            <p className="text-accent text-xl md:text-2xl font-serif italic mb-12">
              Let's build a team that matters.
            </p>

            <div className="space-y-10 mb-16">
              <div className="flex gap-6">
                <div className="w-[2px] bg-foreground/20 h-auto min-h-[50px]"></div>
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground mb-2 uppercase">Email</p>
                    <a href="mailto:hello@allsol.com" className="text-text-primary font-serif text-2xl hover:text-accent transition-colors">tanishkapatel1707@gmail.com</a>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground mb-2 uppercase">Phone</p>
                    <p className="text-foreground font-serif text-2xl">+91-7790910416</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground mb-2 uppercase">Address</p>
                    <address className="text-foreground font-serif text-xl not-italic leading-relaxed">
                      Jagatpura,<br />
                      jaipur, Rajasthan, India
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-gray-400/30 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-gray-400/30 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-gray-400/30 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>

          </motion.div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg w-full mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-8">

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 bg-transparent border-b border-white/20 focus:border-accent outline-none transition-all placeholder:text-white/30 text-lg font-medium text-text-primary hover:border-white/50"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Business Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full p-4 bg-transparent border-b border-white/20 focus:border-accent outline-none transition-all placeholder:text-white/30 text-lg font-medium text-text-primary hover:border-white/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">How can we help?</label>
                <div className="relative">
                  <select
                    className="w-full p-4 bg-transparent border-b border-white/20 focus:border-accent outline-none transition-all appearance-none text-lg font-medium cursor-pointer text-text-primary hover:border-white/50"
                    value={formData.helpType}
                    onChange={(e) => setFormData({ ...formData, helpType: e.target.value })}
                  >
                    <option>Talent Consulting</option>
                    <option>Recruitment</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Message</label>
                <textarea
                  placeholder="Tell us about the project..."
                  rows={3}
                  className="w-full p-4 bg-transparent border-b border-white/20 focus:border-accent outline-none transition-all resize-none placeholder:text-white/30 text-lg font-medium text-text-primary hover:border-white/50"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-accent hover:bg-[#E5BE35] text-black font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(255,212,59,0.3)] hover:shadow-[0_0_25px_rgba(255,212,59,0.5)]"
                >
                  <span>SEND MESSAGE</span>
                  <Send size={18} />
                </button>
              </div>

            </form>

            <div className="mt-16 flex items-center justify-between opacity-40">
              <div className="bg-gray-300 h-8 w-24 rounded-md"></div>
              <div className="bg-gray-300 h-8 w-24 rounded-md"></div>
              <div className="bg-gray-300 h-8 w-24 rounded-md"></div>
            </div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
