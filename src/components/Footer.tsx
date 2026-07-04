import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock, Instagram, Youtube, ArrowUp } from 'lucide-react';
import xtremeBadgeLogo from '../assets/images/xtreme_badge_logo.jpg';

// Official WhatsApp Logo SVG (Bootstrap Icons quality)
const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
  </svg>
);

interface FooterProps {
  setCurrentTab: (tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery') => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 font-sans" id="app-footer">
      {/* Upper Brand Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-4">
          <div className="flex items-center">
            <img 
              src={xtremeBadgeLogo} 
              alt="XTREME FITNESS STUDIO Logo" 
              className="h-20 w-20 object-cover rounded-full border border-neutral-800 shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">
            The premium forge of athletic supremacy. Our world-class coaches and elite-grade equipment are here to engineer your peak physical potential.
          </p>
          <div className="flex space-x-3 pt-2">
            <a 
              href="https://www.instagram.com/xtremefitness_studio_official?igsh=MmVzbjdnZmNzaDRv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:border-amber-500 hover:bg-neutral-800 transition"
              aria-label="Instagram Profile"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a 
              href="https://wa.me/qr/EAF5F3QVFSRFF1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-[#25D366] hover:text-white hover:border-[#25D366] hover:bg-[#25D366] transition"
              aria-label="WhatsApp Chat"
            >
              <WhatsAppLogo className="h-4 w-4" />
            </a>
            <a 
              href="http://www.youtube.com/@mithungowda62818" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-500 hover:bg-neutral-800 transition"
              aria-label="YouTube Channel"
            >
              <Youtube className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-6">
            Discipline Links
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <button 
                onClick={() => handleNavClick('home')}
                className="hover:text-amber-500 transition text-left cursor-pointer"
              >
                Home Arena
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('membership')}
                className="hover:text-amber-500 transition text-left cursor-pointer"
              >
                Membership & Plans
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('trainers')}
                className="hover:text-amber-500 transition block text-left cursor-pointer font-sans"
              >
                Head Trainer
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('contact')}
                className="hover:text-amber-500 transition block text-left cursor-pointer font-sans"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Operating Hours */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-6">
            Operating Hours
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <Clock className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium">Monday – Saturday</p>
                <p className="text-xs text-neutral-500 mt-1">05:00 AM – 01:00 PM</p>
                <p className="text-xs text-neutral-500">05:00 PM – 10:00 PM</p>
                <p className="text-xs text-red-500 font-bold mt-2 uppercase tracking-wider">Sunday Closed</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Facility */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-6">
            HQ Facility
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-snug">
                sri hara complex, 2nd main road,<br />
                Maruti Tent Rd, Sreenivas Nagar,<br />
                Sunkadakatte, Bengaluru,<br />
                Karnataka 560091
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-amber-500 shrink-0" />
              <a href="tel:+919886090497" className="hover:text-amber-500 transition">
                +91 98860 90497
              </a>
            </li>
            <li className="flex items-center space-x-3 min-w-0">
              <Mail className="h-4 w-4 text-amber-500 shrink-0" />
              <a 
                href="mailto:xtremebodieshealthclub@gmail.com" 
                className="hover:text-amber-500 transition whitespace-nowrap text-[13px] xl:text-sm"
              >
                xtremebodieshealthclub@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Lower Copyright & Scroll-To-Top Section */}
      <div className="border-t border-neutral-900 bg-neutral-950/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          {/* Copyright + Developer Credit */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p className="text-neutral-500 font-mono whitespace-nowrap">
              &copy; 2026 XTREME FITNESS STUDIO. All Rights Reserved.
            </p>
            <p className="text-neutral-600 font-sans whitespace-nowrap">
              Designed &amp; Developed by{' '}
              <span className="text-amber-400 font-semibold">TechDot-X</span>
            </p>
          </div>
          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="h-10 w-10 bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-white rounded-lg flex items-center justify-center transition cursor-pointer shadow-md shrink-0"
            aria-label="Back to Top"
            id="back-to-top-btn"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

// Inline helper SVG since we want standard import for react icon but keep fallback simple
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
