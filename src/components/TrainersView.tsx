import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, Medal, Award, Dumbbell, ShieldCheck, Star, Check, Quote, Calendar, Activity
} from 'lucide-react';
import { TRAINER_DATA } from '../types';
import mensFitness30 from '../assets/images/Men\'s Fitness 30+.png';
import mensClassicPhysique from '../assets/images/Men\'s Classic Physique.png';
import bodybuildingNatural from '../assets/images/Bodybuilding Natural Competition.png';
import headTrainer from '../assets/images/HEAD TRAINER.png';

interface TrainersViewProps {
  onOpenEnroll: (planId?: string, programId?: string) => void;
}

export default function TrainersView({ onOpenEnroll }: TrainersViewProps) {
  // Retrieve the single Head Trainer MITHUN GOWDA SHIVARAJU
  const trainer = TRAINER_DATA[0];

  if (!trainer) {
    return (
      <div className="w-full bg-neutral-950 text-white font-sans min-h-screen flex items-center justify-center">
        <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest">No Trainer Profile Available</p>
      </div>
    );
  }

  // Define the 3 competition achievements requested
  const achievementsList = [
    {
      id: 'award-1',
      competition: 'ICN INDIA 2026',
      category: "Men's Fitness 30+",
      placement: '3rd Place',
      description: 'Demonstrated exceptional dedication, conditioning, and performance at the ICN India Natural Fitness & Bodybuilding Championship.',
      image: mensFitness30,
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
    },
    {
      id: 'award-2',
      competition: 'ICN INDIA 2026',
      category: "Men's Classic Physique",
      placement: '3rd Place',
      description: 'Demonstrated exceptional dedication, conditioning, and performance at the ICN India Natural Fitness & Bodybuilding Championship.',
      image: mensClassicPhysique,
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
    },
    {
      id: 'award-3',
      competition: 'ICN INDIA 2026',
      category: 'Bodybuilding Natural Competition',
      placement: '5th Place',
      description: 'Demonstrated exceptional dedication, conditioning, and performance at the ICN India Natural Fitness & Bodybuilding Championship.',
      image: bodybuildingNatural,
      badgeColor: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
    }
  ];

  return (
    <div className="w-full bg-neutral-950 text-white font-sans min-h-screen" id="trainer-profile-view">
      
      {/* 1. TRAINER HERO SECTION WITH LOOPING VIDEO */}
      <section 
        className="relative overflow-hidden bg-neutral-950 w-full" 
        id="trainer-hero"
        style={{
          minHeight: 'clamp(420px, 70vw, 700px)',
          paddingTop: 'clamp(80px, 15vw, 160px)',
          paddingBottom: 'clamp(60px, 10vw, 160px)',
        }}
      >
        {/* Full-bleed background video player */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            src="/trainer vedio.MOV"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: 0.7,
              filter: 'brightness(1.25) contrast(1.1)',
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Ambient atmospheric highlights */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[130px] pointer-events-none z-10" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-yellow-400 tracking-widest uppercase">
              CHAMPIONSHIP MENTORSHIP
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-7xl font-sans font-black tracking-tighter leading-none uppercase text-white"
          >
            OUR <span className="text-yellow-400">HEAD TRAINER</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mt-4 leading-relaxed font-mono uppercase tracking-wider"
          >
            A competitive natural bodybuilder dedicated to maximizing your physical performance and muscle design.
          </motion.p>
        </div>
      </section>

      {/* 2. TRAINER PROFILE SECTION */}
      <section className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="trainer-profile">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Huge Premium Portrait Image */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
              id="trainer-image-frame"
            >
              {/* No border, no clip, no rounding — full image shown */}
              <img 
                src={headTrainer} 
                alt={trainer.name} 
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  filter: 'brightness(1.08) contrast(1.05)',
                  mixBlendMode: 'screen',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 95%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 95%)',
                }}
              />
              
              {/* Overlay Badge for Position */}
              <div className="absolute top-4 left-4 z-20 bg-yellow-400 text-black font-sans font-black text-xs px-4 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                HEAD TRAINER
              </div>
            </motion.div>

            {/* Sub-grid with quick bio stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl text-center space-y-1">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">EXPERIENCE</span>
                <span className="font-sans font-black text-sm sm:text-base text-yellow-400 uppercase block">16+ YEARS</span>
              </div>
              <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl text-center space-y-1">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">ACTIVE COACHING</span>
                <span className="font-sans font-black text-sm sm:text-base text-white uppercase block">2000+ CLIENTS</span>
              </div>
              <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl text-center space-y-1">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">INSTAGRAM</span>
                <a 
                  href="https://www.instagram.com/being_phenomenal_mithun?igsh=M3dtNm1jOWE1bnZ4" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-[10px] font-bold text-yellow-400 hover:text-white transition block truncate mt-1"
                >
                  {trainer.instagram}
                </a>
              </div>
            </div>
          </div>

          {/* Biography & Achievements Overview */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-yellow-400 tracking-widest uppercase bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded inline-block">
                CHAMPIONSHIP BODYBUILDER & COACH
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-black text-white tracking-tight uppercase" id="trainer-name-main">
                {trainer.name}
              </h2>
              <div className="w-16 h-1 bg-yellow-400 rounded" />
            </div>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-sans" id="trainer-detailed-bio">
              <p>
                MITHUN GOWDA SHIVARAJU is the athletic architect and cornerstone of performance at XTREME FITNESS STUDIO. 
                As a former competitive powerlifter and recognized natural bodybuilding competitor, he specializes in biomechanical analysis, advanced loading models, and peak physique transformations. 
                With over 16+ years of coaching elite lifters and everyday fitness enthusiasts, Mithun brings a scientific, progressive approach to force creation and subcutaneous fat depletion.
              </p>
              <p>
                Deeply rooted in the Bangalore fitness revolution, Mithun has spent over a decade shaping training standards and elevating lifters across premier fitness centers in Karnataka. As a highly sought-after performance consultant, he has built custom programs that have guided numerous state champions and natural bodybuilders to gold-medal placements in ICN India championships.
              </p>
              <p>
                His systematic approach combines state-of-the-art biomechanics with customized metabolic plans, making elite-level strength and aesthetics accessible to both competitive bodybuilders and dedicated recreational lifters in Bangalore.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">GUIDANCE MODEL</h4>
                  <p className="font-sans font-extrabold text-xs text-white uppercase tracking-wide">1-ON-1 METICULOUS COACHING</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">EXPERTISE AREA</h4>
                  <p className="font-sans font-extrabold text-xs text-white uppercase tracking-wide">PHYSIQUE RECOMPOSITION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="achievements-highlights">
        
        {/* Section Headers */}
        <div className="text-center space-y-4 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2"
          >
            <span className="h-1 w-6 bg-yellow-400" />
            <span className="font-mono text-xs font-bold text-yellow-400 tracking-widest uppercase">
              COMPETITION TRANSCRIPTION
            </span>
            <span className="h-1 w-6 bg-yellow-400" />
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase text-white tracking-tight">
            Achievements & Competition Highlights
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Recognized performance and competitive excellence in natural bodybuilding.
          </p>
        </div>

        {/* 3-Card Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="award-cards-grid">
          {achievementsList.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-900 hover:border-yellow-400/30 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300 hover:shadow-[0_12px_40px_rgba(250,204,21,0.08)] hover:-translate-y-1.5"
              id={`achievement-card-${ach.id}`}
            >
              {/* Card Image area */}
              <div className="relative w-full overflow-hidden bg-neutral-950 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                <img 
                  src={ach.image} 
                  alt={ach.competition} 
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    objectFit: 'contain',
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Floating Placement Badge */}
                <div className="absolute top-4 right-4 z-20 bg-yellow-400 text-black font-sans font-black text-xs px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1">
                  <Trophy className="h-3 w-3 fill-current" />
                  <span>{ach.placement}</span>
                </div>

                {/* Floating Trophy Icon Badge */}
                <div className="absolute top-4 left-4 z-20 bg-neutral-950/95 border border-neutral-800 p-2.5 rounded-xl shadow-md text-yellow-400">
                  <Medal className="h-5 w-5" />
                </div>
              </div>

              {/* Card Body and Text details */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-yellow-400 uppercase tracking-widest">
                      {ach.competition}
                    </span>
                    <span className="h-1 w-1 bg-neutral-700 rounded-full" />
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                      NATURAL FEDERATION
                    </span>
                  </div>

                  <h3 className="text-xl font-sans font-extrabold text-white tracking-tight uppercase group-hover:text-yellow-400 transition-colors">
                    {ach.category}
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans pt-1">
                    "{ach.description}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex justify-between items-center text-xs font-mono text-neutral-500">
                  <span>CATEGORY PLACEMENT</span>
                  <span className="text-yellow-400 font-bold">{ach.placement.toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. TRAINING PHILOSOPHY */}
      <section className="relative py-24 bg-black border-t border-b border-neutral-900 overflow-hidden" id="training-philosophy">
        {/* Decorative subtle weight plate outline graphic */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.02] text-white select-none pointer-events-none hidden lg:block">
          <Dumbbell className="h-96 w-96" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 items-center justify-center text-yellow-400">
            <Quote className="h-5 w-5 fill-current" />
          </div>

          <h3 className="text-xs font-mono font-bold tracking-widest text-yellow-400 uppercase block">
            CORE COACHING PHILOSOPHY
          </h3>

          <p className="text-2xl sm:text-4xl font-sans font-black italic tracking-tight text-white leading-tight">
            "{trainer.philosophy}"
          </p>

          <div className="space-y-1">
            <p className="font-sans font-black text-sm text-yellow-400 uppercase tracking-widest">
              MITHUN GOWDA SHIVARAJU
            </p>
            <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
              HEAD COACH • XTREME FITNESS STUDIO
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
