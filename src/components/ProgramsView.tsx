import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, Flame, TrendingUp, Users, Zap, Apple, Salad, Trophy, 
  ShieldCheck, Clock, Award, Star, Check, Activity, ArrowRight, Target
} from 'lucide-react';
import { PROGRAM_DATA } from '../types';

interface ProgramsViewProps {
  onOpenEnroll: (planId?: string, programId?: string) => void;
}

// Detailed premium program information maps
const DETAILED_PROGRAM_CONTENT: Record<string, {
  name: string;
  overview: string;
  benefits: string[];
  trainingMethods: string[];
  suitableFor: string[];
  durationInfo: {
    length: string;
    frequency: string;
    sessionLength: string;
  };
}> = {
  'strength-training': {
    name: 'STRENGTH TRAINING',
    overview: 'Build elite-level strength, improve muscular density, and unlock ultimate physical power. This system uses proven progressive overload protocols, focusing on foundational compound lifts including the squat, bench press, deadlift, and overhead press.',
    benefits: [
      'Maximize absolute compound lift strength and bone density',
      'Enhance neuromuscular coordination and CNS motor unit recruitment',
      'Reinforce ligament thickness, joint structures, and overall skeletal stability',
      'Accelerate myofibrillar hypertrophy for thick, functional muscular power'
    ],
    trainingMethods: [
      'Periodized progressive overload blocks with targeted microcycles',
      'One-Rep Max (1RM) baseline testing and percentage-based loading sheets',
      'Meticulous multi-joint compound mechanics and bar path bio-feedback analysis',
      'Autoregulated volume thresholds using Rate of Perceived Exertion (RPE)'
    ],
    suitableFor: [
      'Lifters wanting to break past strength plateaus and build physical density',
      'Lifters looking to construct a powerful physical foundation for strength',
      'Competitive powerlifters, strongman trainees, and dedicated recreational lifters'
    ],
    durationInfo: {
      length: '12-Week Structured Macrocycle',
      frequency: '4 sessions per week (Upper/Lower Split)',
      sessionLength: '75-90 minutes per session'
    }
  },
  'weight-loss': {
    name: 'WEIGHT LOSS TRANSFORMATION',
    overview: 'Meticulously structured fat-loss conditioning designed to torch stubborn body fat while defending valuable lean muscle tissue. By combining high-intensity metabolic resistance with customized deficit nutrition, we stimulate optimal metabolic conditioning.',
    benefits: [
      'Accelerate metabolic output and maximize resting energy expenditure',
      'Generate EPOC afterburn effects to keep fat oxidation elevated post-workout',
      'Enhance cardiovascular efficiency, VO2 max capacity, and cardiovascular flow',
      'Defend and sustain lean skeletal muscle tissue during caloric deficits'
    ],
    trainingMethods: [
      'High-Intensity Interval Training (HIIT) combined with AMRAP conditioning',
      'Barbell and dumbbell metabolic conditioning complexes to drive peak output',
      'Real-time target zone tracking to maintain optimal fat oxidation heart-rates',
      'Functional dynamic mobility and structured low-intensity steady state cardio'
    ],
    suitableFor: [
      'Individuals aiming for an intense, highly noticeable body transformation',
      'Anyone wanting to lower total body fat percentage and construct a lean, toned frame',
      'Busy professionals wanting high-efficiency workouts that maximize caloric burn'
    ],
    durationInfo: {
      length: '8-Week Conditioning Phase',
      frequency: '5 sessions per week (3 High-Intensity, 2 Aerobic)',
      sessionLength: '45-60 minutes per session'
    }
  },
  'weight-gain': {
    name: 'WEIGHT GAIN & BULKING',
    overview: 'Calibrated specifically for individuals struggling to build high-quality muscle volume. This program pairs high-volume sarcoplasmic hypertrophy techniques with dense calorie programming to safely and systematically pack on size and athletic frame thickness.',
    benefits: [
      'Trigger significant muscular cross-sectional area growth (hypertrophy)',
      'Keep your body in a sustained anabolic state through structured caloric surplus',
      'Improve structural leverage, boosting absolute compound loading potential',
      'Enhance intramuscular glycogen storage capacity for continuous power'
    ],
    trainingMethods: [
      'Hypertrophy-focused range-of-motion loading and deep mechanical tension',
      'Targeted muscle-mind connection drills and isolated fatigue mapping',
      'Progressively scaled volume schemes across focused weekly microcycles',
      'Consistent caloric tracking adjustments and recovery pacing logs'
    ],
    suitableFor: [
      'Hardgainers and ectomorphs wanting to build solid, lasting muscle bulk',
      'Competitive lifters seeking to move up a weight class safely and powerfully',
      'Anyone wishing to establish a broader, thicker, and more robust physique'
    ],
    durationInfo: {
      length: '10-Week Muscle Building Phase',
      frequency: '4 sessions per week (Push/Pull Splits)',
      sessionLength: '60-75 minutes per session'
    }
  },
  'personal-training': {
    name: '1-ON-1 PERSONAL TRAINING',
    overview: 'The ultimate bespoke development package. Work directly with Head Trainer MITHUN GOWDA SHIVARAJU to map out a highly specific movement trajectory, perform complex biomechanics audits, and receive immediate coaching.',
    benefits: [
      'Enjoy custom workout design matching your exact skeletal leverages',
      'Perform detailed movement quality audits to identify and fix structural issues',
      'Receive instant feedback and real-time posture adjustments on heavy compounds',
      'Develop intense accountability, consistent discipline, and professional habits'
    ],
    trainingMethods: [
      'Detailed joint angle checks and structural biomechanical assessments',
      'Continuous velocity tracking and heart-rate monitoring for intensity control',
      'Customized central nervous system recovery sheets based on sleep metrics',
      'Individual progression reviews and weekly performance target adjustments'
    ],
    suitableFor: [
      'Beginners wanting premium guidance and a highly safe path into lifting',
      'Intermediate to advanced lifters looking to adjust minor technical flaws',
      'Lifters recovering from past injuries who need careful mechanical management'
    ],
    durationInfo: {
      length: 'Ongoing Bespoke Integration',
      frequency: 'Scheduled flexibly (Recommended 2-4 sessions / week)',
      sessionLength: '60 minutes per session'
    }
  },
  'cross-fit': {
    name: 'CROSSFIT & FUNCTIONAL FITNESS',
    overview: 'High-intensity, multi-planar, fully functional training engineered to forge resilient, multi-directional performance. Develop speed, cardiovascular power, gymnastic balance, and Olympic-lifting efficiency in a supportive team environment.',
    benefits: [
      'Generate exceptional multi-directional power and high-velocity output',
      'Dramatically raise anaerobic limits and overall cardiovascular endurance',
      'Enhance multi-planar joint mobility, shoulder stability, and core control',
      'Develop high physical adaptability to tackle varied and unpredictable physical tasks'
    ],
    trainingMethods: [
      'Olympic lifting technique instruction (Snatch, Clean & Jerk, Overhead)',
      'Bodyweight gymnastics mastery, rings coordination, and handstand work',
      'High-intensity interval training via customized Workout of the Day (WOD) blocks',
      'Rowing, stationary cycling, plyometric jumps, and heavy carrying drills'
    ],
    suitableFor: [
      'Fitness enthusiasts searching for a highly challenging, fast-paced environment',
      'Former competitive lifters wanting to maintain exceptional functional fitness',
      'Anyone wanting to build total body coordination, quickness, and stamina'
    ],
    durationInfo: {
      length: '8-Week Conditioning Program',
      frequency: '4-5 sessions per week',
      sessionLength: '60 minutes per session'
    }
  },
  'diet-counselling': {
    name: 'PROFESSIONAL DIET COUNSELLING',
    overview: 'Elevate your physical transformation and daily energy by adjusting your underlying metabolic intake. Our professional dietary counseling creates sustainable, macro-calibrated nutritional models built for your daily lifestyle.',
    benefits: [
      'Receive science-backed macronutrient breakdowns tailored to your precise BMR',
      'Build a healthy, long-term relationship with nutrition using flexible dieting',
      'Enhance focus, daily energy levels, gut wellness, and muscle recovery speed',
      'Carefully track inflammation markers, sleep consistency, and hydration levels'
    ],
    trainingMethods: [
      'Individual baseline metabolic mapping and accurate lean mass audits',
      'Weekly food diary evaluations and gut microbiome optimization reviews',
      'Structured high-yield grocery list creation and macro-friendly meal prep ideas',
      'Personal education on flexible tracking, nutrient timing, and fluid balance'
    ],
    suitableFor: [
      'Lifters experiencing slow progress or recovery stagnation in their training',
      'Anyone confused by conflicting dieting advice looking for scientific plans',
      'Individuals wishing to boost digestive wellness, skin health, and clean energy'
    ],
    durationInfo: {
      length: 'Ongoing Consultative Partnership',
      frequency: 'Weekly 30-minute check-ins and review adjustments',
      sessionLength: '30 minutes per audit'
    }
  },
  'nutrition-support': {
    name: 'INTEGRATED NUTRITION SUPPORT',
    overview: 'Combine your rigorous training routines with targeted performance supplementation and metabolic fuel. This support program handles pre-workout optimization, intra-workout muscle preservation, and post-workout amino-acid synthesis.',
    benefits: [
      'Significantly speed up muscle tissue repair and optimize systemic recovery',
      'Avoid unnecessary expense by focusing exclusively on scientifically proven supplements',
      'Maximize explosive force, power, and physical focus using clean, safe fuels',
      'Ensure proper nutrient absorption and optimal hydration during workouts'
    ],
    trainingMethods: [
      'Bespoke supplementation audits covering timing, dosing, and efficacy metrics',
      'Direct intra-workout cellular hydration protocols for long-term endurance',
      'Strategic carb-loading schedules tailored for intense performance days',
      'Monthly bio-metric tracking reviews to ensure safe and continuous progression'
    ],
    suitableFor: [
      'Dedicated lifters wishing to squeeze the absolute maximum results from workouts',
      'Performance and endurance lifters battling training exhaustion or soreness',
      'Anyone wanting to build an optimal dietary framework for health longevity'
    ],
    durationInfo: {
      length: 'Ongoing Supplementation Auditing',
      frequency: 'Monthly menu reviews and nutrition updates',
      sessionLength: 'Self-guided tracking with coach supervision'
    }
  },
  'body-building': {
    name: 'ELITE BODYBUILDING & PHYSIQUE',
    overview: 'Designed for competitive bodybuilders and physique enthusiasts who aim to build maximum hypertrophy, aesthetic symmetry, and extreme muscular definition. We manipulate volume, load, and fatigue to sculpt your ideal physical frame.',
    benefits: [
      'Achieve maximum sarcoplasmic hypertrophy across targeted muscle groups',
      'Map out and fix physical symmetry imbalances through weak-point stimulus',
      'Gain professional stage posing tips, lighting preparation, and muscle-peak advice',
      'Achieve jaw-dropping vascularity, muscle fullness, and classic aesthetic dimensions'
    ],
    trainingMethods: [
      'Hypertrophy-specific movement selection using high-tension isolation paths',
      'Weekly structural skinfold fat calipers and circumference measurements',
      'Calibrated peak-week carbohydrate depletion and load-up scheduling',
      'High-intensity drop-sets, biomechanical supersets, and static hold structures'
    ],
    suitableFor: [
      'Physique, Classic, or Open Bodybuilding competitors seeking pro coaching',
      'Experienced lifters wishing to take their physical development to the absolute limit',
      'Anyone dedicated to packing on maximum muscle mass and shredding fat'
    ],
    durationInfo: {
      length: '12-Week Bodybuilding Program',
      frequency: '5-6 sessions per week',
      sessionLength: '75-90 minutes per session'
    }
  }
};

export default function ProgramsView({ onOpenEnroll }: ProgramsViewProps) {
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedProgramId) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target && target.closest('[id^="program-card-"]')) {
        return;
      }
      setExpandedProgramId(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedProgramId(null);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
    
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedProgramId]);

  // Helper to get program-specific icons
  const getProgramIcon = (id: string) => {
    switch (id) {
      case 'strength-training':
        return <Dumbbell className="h-5 w-5 text-yellow-400" />;
      case 'weight-loss':
        return <Flame className="h-5 w-5 text-yellow-400" />;
      case 'weight-gain':
        return <TrendingUp className="h-5 w-5 text-yellow-400" />;
      case 'personal-training':
        return <Users className="h-5 w-5 text-yellow-400" />;
      case 'cross-fit':
        return <Zap className="h-5 w-5 text-yellow-400" />;
      case 'diet-counselling':
        return <Apple className="h-5 w-5 text-yellow-400" />;
      case 'nutrition-support':
        return <Salad className="h-5 w-5 text-yellow-400" />;
      case 'body-building':
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      default:
        return <Dumbbell className="h-5 w-5 text-yellow-400" />;
    }
  };

  const handleCardClick = (programId: string) => {
    setExpandedProgramId(prevId => prevId === programId ? null : programId);
    
    // Smoothly scroll the page so the expanding card aligns well
    setTimeout(() => {
      const element = document.getElementById(`program-card-${programId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 150);
  };

  return (
    <div className="w-full bg-neutral-950 text-white font-sans min-h-screen" id="programs-view">
      
      {/* 1. HERO HEADER BANNER */}
      <section className="relative py-24 bg-black border-b border-neutral-900 overflow-hidden" id="programs-hero">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center gap-2 mb-3"
          >
            <span className="h-1 w-8 bg-yellow-400" />
            <span className="font-mono text-xs font-bold text-yellow-400 tracking-widest uppercase">
              XTREME FITNESS BLUEPRINTS
            </span>
            <span className="h-1 w-8 bg-yellow-400" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-sans font-black text-white uppercase tracking-tight"
          >
            Explore Our Programs
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-lg text-neutral-400 mt-4 max-w-3xl mx-auto leading-relaxed"
          >
            Specialized training blueprints and high-fidelity physical systems engineered for ultimate performance.
          </motion.p>
        </div>
      </section>

      {/* 2. PROGRAMS GRID SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="programs-grid-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="programs-grid">
          {PROGRAM_DATA.map((program, idx) => {
            const isExpanded = expandedProgramId === program.id;
            const details = DETAILED_PROGRAM_CONTENT[program.id] || {
              name: program.title,
              overview: program.description,
              benefits: program.benefits,
              trainingMethods: ['Bespoke progressive overload.', 'Technique monitoring.'],
              suitableFor: ['Dedicated lifters.'],
              durationInfo: {
                length: program.duration,
                frequency: '3-4 sessions per week',
                sessionLength: '60-75 minutes'
              }
            };

            return (
              <motion.div
                key={program.id}
                layout="position"
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                onClick={() => handleCardClick(program.id)}
                className={`group border overflow-hidden rounded-2xl shadow-xl transition-all duration-300 relative flex flex-col justify-between ${
                  isExpanded 
                    ? 'col-span-1 sm:col-span-2 lg:col-span-4 bg-neutral-900/90 border-yellow-400/50 p-1' 
                    : 'col-span-1 bg-neutral-900/60 hover:bg-neutral-900 border-neutral-900 hover:border-yellow-400/35 h-[385px] hover:-translate-y-1'
                } cursor-pointer`}
                id={`program-card-${program.id}`}
              >
                {!isExpanded ? (
                  // COLLAPSED CARD VIEW
                  <div className="flex flex-col justify-between h-full w-full">
                    {/* Card Image Area */}
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-950 shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30 z-10" />
                      <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating Icon Badge */}
                      <div className="absolute top-4 left-4 z-20 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 p-2.5 rounded-xl shadow-md">
                        {getProgramIcon(program.id)}
                      </div>

                      {/* Floating Intensity Tag */}
                      <div className="absolute bottom-4 right-4 z-20 bg-black/90 backdrop-blur-sm border border-neutral-850 px-2.5 py-1 rounded-md">
                        <span className="font-mono text-[9px] font-bold text-neutral-300 tracking-wider uppercase">
                          {program.intensity} TIER
                        </span>
                      </div>
                    </div>

                    {/* Card Body & Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-base font-sans font-black text-white uppercase tracking-tight group-hover:text-yellow-400 transition-colors duration-200 mb-3">
                        {program.title}
                      </h3>
                      
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans line-clamp-4">
                        {program.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  // EXPANDED WIDESCREEN PANEL VIEW
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-white font-sans flex flex-col lg:flex-row gap-6 p-6 lg:p-8"
                  >
                    {/* Left Column: Visual Preview */}
                    <div className="w-full lg:w-1/3 shrink-0 flex flex-col justify-between space-y-4">
                      <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-video lg:aspect-auto lg:h-64">
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-10" />
                        <img 
                          src={program.image} 
                          alt={program.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
                          <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black px-2.5 py-1 rounded-md text-[10px] font-mono font-black uppercase tracking-wider w-fit">
                            <Activity className="h-3 w-3 stroke-[2.5]" />
                            <span>{program.intensity} INTENSITY</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-neutral-950/80 border border-neutral-800/60 p-5 rounded-xl space-y-4">
                        <h4 className="font-sans font-black text-xs text-neutral-400 uppercase tracking-wider border-b border-neutral-800 pb-2.5">
                          Program Parameters
                        </h4>
                        <div className="divide-y divide-neutral-800/60 text-xs">
                          <div className="flex justify-between py-2.5 gap-4">
                            <span className="text-neutral-400 font-medium shrink-0">Duration</span>
                            <span className="font-mono text-yellow-400 font-bold text-right">{details.durationInfo.length}</span>
                          </div>
                          <div className="flex justify-between py-2.5 gap-4">
                            <span className="text-neutral-400 font-medium shrink-0">Frequency</span>
                            <span className="font-mono text-yellow-400 font-bold text-right">{details.durationInfo.frequency}</span>
                          </div>
                          <div className="flex justify-between py-2.5 gap-4">
                            <span className="text-neutral-400 font-medium shrink-0">Session Length</span>
                            <span className="font-mono text-yellow-400 font-bold text-right">{details.durationInfo.sessionLength}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Rich Text, Benefits and CTA */}
                    <div className="flex-grow flex flex-col justify-between space-y-6 lg:pl-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-yellow-400 uppercase tracking-widest block mb-1">
                              INLINE ACCORDION SPECIFICATIONS
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase tracking-tight">
                              {details.name}
                            </h3>
                          </div>
                          <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">
                            {getProgramIcon(program.id)}
                          </div>
                        </div>

                        <p className="text-neutral-300 text-sm leading-relaxed max-w-3xl">
                          {details.overview}
                        </p>
                      </div>

                      {/* Benefits Split Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3 bg-neutral-950/40 p-4 border border-neutral-800/40 rounded-xl">
                          <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Core Benefits
                          </h4>
                          <ul className="space-y-2">
                            {details.benefits.map((benefit, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                                <Check className="h-3.5 w-3.5 text-yellow-400 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3 bg-neutral-950/40 p-4 border border-neutral-800/40 rounded-xl">
                          <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Methodology Focus
                          </h4>
                          <ul className="space-y-2">
                            {details.trainingMethods.map((method, mIdx) => (
                              <li key={mIdx} className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed">
                                <span className="font-mono text-yellow-400 font-bold shrink-0">{mIdx + 1}.</span>
                                <span>{method}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Clickable Card Action & Close instruction */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-neutral-850/40">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenEnroll(undefined, program.id);
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black font-sans font-black px-6 py-3 rounded-xl tracking-wider uppercase transition-all duration-300 cursor-pointer text-xs"
                        >
                          <span>BOOK PROGRAM NOW</span>
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. CORE BENEFITS ASSURANCE */}
      <section className="bg-black py-20 border-t border-neutral-900" id="programs-assurance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20 shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                  SCIENTIFICALLY PLANNED
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every training path matches optimal loading ratios, physiological rest cycles, and metabolic target triggers.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20 shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                  MASTER COACHING STAFF
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Our coaches hold certified athletic qualifications to supervise forms, calibrate weights, and guide nutrition blocks.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20 shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                  PROGRESSIVE ROADMAPS
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Log your progression metrics, modify weight vectors, and secure consistent physiological adaptation safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
