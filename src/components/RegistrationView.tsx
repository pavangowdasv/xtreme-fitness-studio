import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface RegistrationViewProps {
  setCurrentTab: (tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery') => void;
}

export default function RegistrationView({ setCurrentTab }: RegistrationViewProps) {
  // Official WhatsApp SVG logo — high-quality, crisp rendering
  const WhatsAppIcon = () => (
    <svg
      viewBox="0 0 16 16"
      className="h-6 w-6 fill-white shrink-0 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );

  return (
    <div className="w-full bg-neutral-950 text-white font-sans min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="registration-view">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#25D366]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main card */}
      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col items-center text-center space-y-10">
        
        {/* Back navigation */}
        <button 
          onClick={() => {
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center space-x-2 text-neutral-400 hover:text-yellow-400 transition group cursor-pointer text-xs font-mono uppercase tracking-wider bg-neutral-900/60 border border-neutral-850 px-4 py-2 rounded-full hover:border-yellow-400/30"
          id="back-to-home-btn-top"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Section 1: Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full">
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-yellow-400 uppercase tracking-widest">
              Join The Forge
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-white uppercase leading-none mt-2">
            JOIN THE <span className="text-yellow-400">FORGE</span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed pt-2">
            Ready to begin your fitness journey? Connect with XTREME FITNESS STUDIO on WhatsApp and we'll help you choose the perfect membership plan, answer your questions, and get you started.
          </p>
        </motion.div>

        {/* Section 2: WhatsApp Call-to-action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <a
            href="https://wa.me/qr/EAF5F3QVFSRFF1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1a9c4b] text-white font-sans font-extrabold py-5 px-8 rounded-2xl tracking-wider transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_8px_30px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.4)] text-base sm:text-lg uppercase"
            id="whatsapp-cta-button"
          >
            <WhatsAppIcon />
            <span>CHAT WITH US ON WHATSAPP</span>
          </a>
        </motion.div>

        {/* Section 3: Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="max-w-lg"
        >
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic font-medium border-t border-neutral-900 pt-6">
            "Your transformation starts with a simple conversation. Message us today and take the first step towards a stronger, healthier you."
          </p>
        </motion.div>

      </div>
    </div>
  );
}
