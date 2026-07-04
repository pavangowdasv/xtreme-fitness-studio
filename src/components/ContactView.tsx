import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, Phone, Mail, Instagram, Youtube
} from 'lucide-react';



interface ContactViewProps {
  setCurrentTab: (tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery') => void;
}

export default function ContactView({ setCurrentTab }: ContactViewProps) {
  return (
    <div className="w-full bg-neutral-950 text-white font-sans min-h-screen py-6 sm:py-10" id="contact-view">
      
      {/* SECTION 1: HEADER & CONTACT INFO (COMPACT, ALL IN ONE SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="contact-header-info-section">
        
        {/* Compact Hero/Header */}
        <div className="text-center relative space-y-3 pb-4 border-b border-neutral-900" id="contact-header-block">
          {/* Subtle glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
            <span className="font-mono text-[9px] font-bold text-yellow-400 uppercase tracking-widest">
              DIRECT ATHLETIC ACCESS
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white uppercase leading-none">
            CONTACT <span className="text-yellow-400">US</span>
          </h1>
          
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Operational questions, facility inquiries, or membership proposals? Get in touch directly or visit the forge.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 max-w-4xl mx-auto w-full pt-4" id="contact-actions-container">
          {/* Call Us Button */}
          <a
            href="tel:+919886090497"
            className="flex-1 flex items-center justify-center gap-4 bg-neutral-900 border border-neutral-800 hover:border-yellow-400 text-white hover:text-yellow-400 px-8 py-6 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-yellow-400/10 cursor-pointer"
            id="btn-call-us"
          >
            <div className="bg-neutral-950 border border-neutral-800 h-14 w-14 rounded-xl flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300 shadow-inner">
              <Phone className="h-6 w-6" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 group-hover:text-yellow-400/80 transition-colors">
                Phone Hotline
              </span>
              <span className="block text-lg sm:text-xl font-sans font-black uppercase tracking-tight mt-0.5">
                Call Us
              </span>
              <span className="block text-xs font-mono text-neutral-500 mt-0.5">
                +91 98860 90497
              </span>
            </div>
          </a>

          {/* Email Us Button */}
          <a
            href="mailto:xtremebodieshealthclub@gmail.com"
            className="flex-1 flex items-center justify-center gap-4 bg-neutral-900 border border-neutral-800 hover:border-yellow-400 text-white hover:text-yellow-400 px-8 py-6 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-yellow-400/10 cursor-pointer"
            id="btn-email-us"
          >
            <div className="bg-neutral-950 border border-neutral-800 h-14 w-14 rounded-xl flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300 shadow-inner">
              <Mail className="h-6 w-6" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 group-hover:text-yellow-400/80 transition-colors">
                Official Email
              </span>
              <span className="block text-lg sm:text-xl font-sans font-black uppercase tracking-tight mt-0.5">
                Email Us
              </span>
              <span className="block text-xs font-mono text-neutral-500 mt-0.5">
                xtremebodieshealthclub@gmail.com
              </span>
            </div>
          </a>
        </div>

      </section>

      {/* SECTION 2: GOOGLE MAPS LOCATION */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="contact-map-section">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="font-mono text-[10px] font-bold text-yellow-400 tracking-widest uppercase block mb-1">
            OUR LOCATION
          </span>
          <h2 className="text-xl sm:text-3xl font-sans font-black text-white uppercase tracking-tight leading-none">
            GYM LOCATION &amp; ROUTING
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
            Find us in Bangalore. Click the button below to open navigation directly in Google Maps.
          </p>
        </div>

        {/* Map Frame Wrapper */}
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-2xl overflow-hidden shadow-2xl relative" id="gym-map-box">

          {/* Location Float Info Overlay */}
          <div className="absolute top-6 left-6 z-10 hidden lg:block max-w-xs bg-neutral-950/95 backdrop-blur-md border border-neutral-800 p-4 rounded-xl shadow-xl space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[9px] font-mono font-bold tracking-widest text-yellow-400 uppercase">
                XTREME FITNESS STUDIO
              </span>
            </div>
            <p className="font-sans font-black text-white text-sm leading-snug">
              Bangalore, Karnataka, India
            </p>
            <p className="text-neutral-400 text-[11px] leading-normal">
              Xtreme Bodies Health Club
            </p>
            <a
              href="https://maps.app.goo.gl/mvPryRjxFL7MhJei8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-sans font-black text-[10px] uppercase tracking-widest px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-[0_0_16px_rgba(250,204,21,0.4)] active:scale-95 w-full justify-center"
            >
              <MapPin className="h-3 w-3" />
              Get Directions
            </a>
          </div>

          <div className="w-full h-[360px] sm:h-[460px] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative">
            <iframe
              title="XTREME FITNESS STUDIO Bangalore Location Map"
              src="https://maps.google.com/maps?q=XGV5%2BQ8%20Bengaluru%20Karnataka&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 opacity-85 hover:opacity-100 transition-all duration-500"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              id="google-maps-iframe"
            />
          </div>

          {/* Mobile Get Directions CTA — visible only on mobile */}
          <div className="mt-3 lg:hidden">
            <a
              href="https://maps.app.goo.gl/mvPryRjxFL7MhJei8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-sans font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] active:scale-95 w-full"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Standalone Get Directions Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-neutral-900/40 border border-neutral-800 p-5 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="font-sans font-black text-white text-sm uppercase tracking-wide">XTREME FITNESS STUDIO</p>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Xtreme Bodies Health Club — Bangalore, Karnataka</p>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/mvPryRjxFL7MhJei8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-sans font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] active:scale-95 whitespace-nowrap shrink-0"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        </div>
      </section>

      {/* SECTION 3: SOCIAL MEDIA LINKS & ACTION CTA */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="contact-social-section">
        <div className="bg-neutral-900/40 border border-neutral-900 p-6 sm:p-10 rounded-2xl text-center space-y-6" id="contact-socials">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-yellow-400 tracking-widest uppercase block">
              LIFTING NETWORKS
            </span>
            <h3 className="text-xl sm:text-2xl font-sans font-black text-white uppercase tracking-tight">
              CONNECT WITH THE FORGE
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Join active gym conversations, track professional lifters, and get real-time athletic logs.
            </p>
          </div>

          {/* Compact Social Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-1" id="social-links-container">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/xtremefitness_studio_official?igsh=MmVzbjdnZmNzaDRv" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-yellow-400/30 text-neutral-300 hover:text-yellow-400 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer font-mono text-[10px] uppercase tracking-wider font-semibold shadow-md"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>Instagram</span>
            </a>

            {/* YouTube */}
            <a 
              href="http://www.youtube.com/@mithungowda62818" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-red-500/30 text-neutral-300 hover:text-red-500 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer font-mono text-[10px] uppercase tracking-wider font-semibold shadow-md"
            >
              <Youtube className="h-3.5 w-3.5 text-red-500" />
              <span>YouTube</span>
            </a>


          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setCurrentTab('register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black font-sans font-black px-6 py-3 tracking-widest uppercase transition-all duration-300 cursor-pointer text-xs"
            >
              JOIN THE FORGE NOW
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
