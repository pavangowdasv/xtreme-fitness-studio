import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Shield, Award, Users, Trophy, ChevronRight, Star, 
  MapPin, Phone, Mail, Clock, Flame, Calendar,
  Dumbbell, Zap, Target, TrendingUp,
  Apple, Salad, ShieldCheck, Check, Activity
} from 'lucide-react';
import { 
  PROGRAM_DATA, PLAN_DATA, TESTIMONIAL_DATA, GALLERY_IMAGES 
} from '../types';
import xtremeLogo from '../assets/images/xtreme_logo.png';
import xtremeBadgeLogo from '../assets/images/xtreme_badge_logo.jpg';
import heroImage from '../assets/images/hero_image.jpg';

// Detailed program content (mirrored from ProgramsView)
const DETAILED_PROGRAM_CONTENT: Record<string, {
  name: string;
  overview: string;
  benefits: string[];
  trainingMethods: string[];
  suitableFor: string[];
  durationInfo: { length: string; frequency: string; sessionLength: string; };
}> = {
  'strength-training': {
    name: 'STRENGTH TRAINING',
    overview: 'Build elite-level strength, improve muscular density, and unlock ultimate physical power. This system uses proven progressive overload protocols, focusing on foundational compound lifts including the squat, bench press, deadlift, and overhead press.',
    benefits: ['Maximize absolute compound lift strength and bone density','Enhance neuromuscular coordination and CNS motor unit recruitment','Reinforce ligament thickness, joint structures, and overall skeletal stability','Accelerate myofibrillar hypertrophy for thick, functional muscular power'],
    trainingMethods: ['Periodized progressive overload blocks with targeted microcycles','One-Rep Max (1RM) baseline testing and percentage-based loading sheets','Meticulous multi-joint compound mechanics and bar path bio-feedback analysis','Autoregulated volume thresholds using Rate of Perceived Exertion (RPE)'],
    suitableFor: ['Lifters wanting to break past strength plateaus','Lifters looking to construct a powerful physical foundation','Competitive powerlifters and dedicated recreational lifters'],
    durationInfo: { length: '12-Week Structured Macrocycle', frequency: '4 sessions per week (Upper/Lower Split)', sessionLength: '75-90 minutes per session' }
  },
  'weight-loss': {
    name: 'WEIGHT LOSS TRANSFORMATION',
    overview: 'Meticulously structured fat-loss conditioning designed to torch stubborn body fat while defending valuable lean muscle tissue. By combining high-intensity metabolic resistance with customized deficit nutrition, we stimulate optimal metabolic conditioning.',
    benefits: ['Accelerate metabolic output and maximize resting energy expenditure','Generate EPOC afterburn effects to keep fat oxidation elevated post-workout','Enhance cardiovascular efficiency, VO2 max capacity, and cardiovascular flow','Defend and sustain lean skeletal muscle tissue during caloric deficits'],
    trainingMethods: ['High-Intensity Interval Training (HIIT) combined with AMRAP conditioning','Barbell and dumbbell metabolic conditioning complexes to drive peak output','Real-time target zone tracking to maintain optimal fat oxidation heart-rates','Functional dynamic mobility and structured low-intensity steady state cardio'],
    suitableFor: ['Individuals aiming for an intense, highly noticeable body transformation','Anyone wanting to lower total body fat percentage','Busy professionals wanting high-efficiency workouts that maximize caloric burn'],
    durationInfo: { length: '8-Week Conditioning Phase', frequency: '5 sessions per week (3 High-Intensity, 2 Aerobic)', sessionLength: '45-60 minutes per session' }
  },
  'weight-gain': {
    name: 'WEIGHT GAIN & BULKING',
    overview: 'Calibrated specifically for individuals struggling to build high-quality muscle volume. This program pairs high-volume sarcoplasmic hypertrophy techniques with dense calorie programming to safely and systematically pack on size and athletic frame thickness.',
    benefits: ['Trigger significant muscular cross-sectional area growth (hypertrophy)','Keep your body in a sustained anabolic state through structured caloric surplus','Improve structural leverage, boosting absolute compound loading potential','Enhance intramuscular glycogen storage capacity for continuous power'],
    trainingMethods: ['Hypertrophy-focused range-of-motion loading and deep mechanical tension','Targeted muscle-mind connection drills and isolated fatigue mapping','Progressively scaled volume schemes across focused weekly microcycles','Consistent caloric tracking adjustments and recovery pacing logs'],
    suitableFor: ['Hardgainers and ectomorphs wanting to build solid, lasting muscle bulk','Competitive lifters seeking to move up a weight class safely','Anyone wishing to establish a broader, thicker, and more robust physique'],
    durationInfo: { length: '10-Week Muscle Building Phase', frequency: '4 sessions per week (Push/Pull Splits)', sessionLength: '60-75 minutes per session' }
  },
  'personal-training': {
    name: '1-ON-1 PERSONAL TRAINING',
    overview: 'The ultimate bespoke development package. Work directly with Head Trainer MITHUN GOWDA SHIVARAJU to map out a highly specific movement trajectory, perform complex biomechanics audits, and receive immediate coaching.',
    benefits: ['Enjoy custom workout design matching your exact skeletal leverages','Perform detailed movement quality audits to identify and fix structural issues','Receive instant feedback and real-time posture adjustments on heavy compounds','Develop intense accountability, consistent discipline, and professional habits'],
    trainingMethods: ['Detailed joint angle checks and structural biomechanical assessments','Continuous velocity tracking and heart-rate monitoring for intensity control','Customized CNS recovery sheets based on sleep metrics','Individual progression reviews and weekly performance target adjustments'],
    suitableFor: ['Beginners wanting premium guidance and a highly safe path into lifting','Intermediate to advanced lifters looking to adjust minor technical flaws','Lifters recovering from past injuries who need careful mechanical management'],
    durationInfo: { length: 'Ongoing Bespoke Integration', frequency: 'Recommended 2-4 sessions / week', sessionLength: '60 minutes per session' }
  },
  'cross-fit': {
    name: 'CROSSFIT & FUNCTIONAL FITNESS',
    overview: 'High-intensity, multi-planar, fully functional training engineered to forge resilient, multi-directional performance. Develop speed, cardiovascular power, gymnastic balance, and Olympic-lifting efficiency in a supportive team environment.',
    benefits: ['Generate exceptional multi-directional power and high-velocity output','Dramatically raise anaerobic limits and overall cardiovascular endurance','Enhance multi-planar joint mobility, shoulder stability, and core control','Develop high physical adaptability to tackle varied physical tasks'],
    trainingMethods: ['Olympic lifting technique instruction (Snatch, Clean & Jerk, Overhead)','Bodyweight gymnastics mastery, rings coordination, and handstand work','High-intensity interval training via customized Workout of the Day (WOD) blocks','Rowing, stationary cycling, plyometric jumps, and heavy carrying drills'],
    suitableFor: ['Fitness enthusiasts searching for a highly challenging, fast-paced environment','Former competitive lifters wanting to maintain exceptional functional fitness','Anyone wanting to build total body coordination, quickness, and stamina'],
    durationInfo: { length: '8-Week Conditioning Program', frequency: '4-5 sessions per week', sessionLength: '60 minutes per session' }
  },
  'diet-counselling': {
    name: 'PROFESSIONAL DIET COUNSELLING',
    overview: 'Elevate your physical transformation and daily energy by adjusting your underlying metabolic intake. Our professional dietary counseling creates sustainable, macro-calibrated nutritional models built for your daily lifestyle.',
    benefits: ['Receive science-backed macronutrient breakdowns tailored to your precise BMR','Build a healthy, long-term relationship with nutrition using flexible dieting','Enhance focus, daily energy levels, gut wellness, and muscle recovery speed','Carefully track inflammation markers, sleep consistency, and hydration levels'],
    trainingMethods: ['Individual baseline metabolic mapping and accurate lean mass audits','Weekly food diary evaluations and gut microbiome optimization reviews','Structured high-yield grocery list creation and macro-friendly meal prep ideas','Personal education on flexible tracking, nutrient timing, and fluid balance'],
    suitableFor: ['Lifters experiencing slow progress or recovery stagnation','Anyone confused by conflicting dieting advice looking for scientific plans','Individuals wishing to boost digestive wellness, skin health, and clean energy'],
    durationInfo: { length: 'Ongoing Consultative Partnership', frequency: 'Weekly 30-minute check-ins', sessionLength: '30 minutes per audit' }
  },
  'nutrition-support': {
    name: 'INTEGRATED NUTRITION SUPPORT',
    overview: 'Combine your rigorous training routines with targeted performance supplementation and metabolic fuel. This support program handles pre-workout optimization, intra-workout muscle preservation, and post-workout amino-acid synthesis.',
    benefits: ['Significantly speed up muscle tissue repair and optimize systemic recovery','Avoid unnecessary expense by focusing on scientifically proven supplements','Maximize explosive force, power, and physical focus using clean, safe fuels','Ensure proper nutrient absorption and optimal hydration during workouts'],
    trainingMethods: ['Bespoke supplementation audits covering timing, dosing, and efficacy metrics','Direct intra-workout cellular hydration protocols for long-term endurance','Strategic carb-loading schedules tailored for intense performance days','Monthly bio-metric tracking reviews to ensure safe and continuous progression'],
    suitableFor: ['Dedicated lifters wishing to squeeze the absolute maximum results from workouts','Performance and endurance lifters battling training exhaustion or soreness','Anyone wanting to build an optimal dietary framework for health longevity'],
    durationInfo: { length: 'Ongoing Supplementation Auditing', frequency: 'Monthly menu reviews', sessionLength: 'Self-guided tracking with coach supervision' }
  },
  'body-building': {
    name: 'ELITE BODYBUILDING & PHYSIQUE',
    overview: 'Designed for competitive bodybuilders and physique enthusiasts who aim to build maximum hypertrophy, aesthetic symmetry, and extreme muscular definition. We manipulate volume, load, and fatigue to sculpt your ideal physical frame.',
    benefits: ['Achieve maximum sarcoplasmic hypertrophy across targeted muscle groups','Map out and fix physical symmetry imbalances through weak-point stimulus','Gain professional stage posing tips, lighting preparation, and muscle-peak advice','Achieve jaw-dropping vascularity, muscle fullness, and classic aesthetic dimensions'],
    trainingMethods: ['Hypertrophy-specific movement selection using high-tension isolation paths','Weekly structural skinfold fat calipers and circumference measurements','Calibrated peak-week carbohydrate depletion and load-up scheduling','High-intensity drop-sets, biomechanical supersets, and static hold structures'],
    suitableFor: ['Physique, Classic, or Open Bodybuilding competitors seeking pro coaching','Experienced lifters wishing to take their physical development to the absolute limit','Anyone dedicated to packing on maximum muscle mass and shredding fat'],
    durationInfo: { length: '12-Week Bodybuilding Program', frequency: '5-6 sessions per week', sessionLength: '75-90 minutes per session' }
  }
};



const testimonialSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { 
      x: { type: 'spring', stiffness: 220, damping: 25 },
      opacity: { duration: 0.45, ease: 'easeOut' }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    transition: { 
      x: { type: 'spring', stiffness: 220, damping: 25 },
      opacity: { duration: 0.35, ease: 'easeIn' }
    }
  })
};

interface HomeViewProps {
  setCurrentTab: (tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery') => void;
  onOpenEnroll: (planId?: string, programId?: string) => void;
}

export default function HomeView({ setCurrentTab, onOpenEnroll }: HomeViewProps) {
  // Gallery filtering state
  const [activeFilter, setActiveFilter] = useState<'All' | 'Strength' | 'Conditioning' | 'Recovery' | 'Nutrition'>('All');

  // Testimonial circular carousel state
  const CAROUSEL_REVIEWS = [
    { text: "Joining Xtreme Fitness Studio has been one of the best decisions I've made for my fitness journey. The facilities are modern, clean, and well maintained. The trainers are knowledgeable, approachable, and always motivating. The friendly atmosphere makes it feel like a true fitness community. Highly recommended.", name: "Puneeth V" },
    { text: "One of the best gyms in Sunkadakatte. Coach Mithun Sir and Trainer Rakesh Sir are extremely supportive both mentally and physically throughout every individual's transformation. I've personally benefited a lot from training here.", name: "B Keshav Pai" },
    { text: "I've been a member for over two years. The gym experience has been consistently excellent. The coaches are supportive, the equipment is well maintained, and it's definitely worth joining to achieve your fitness goals. Highly recommended.", name: "Raghu Gowda" },
    { text: "Excellent gym with modern equipment and professional guidance. The trainer is always available to ensure proper form, technique and steady progress. Whether you're a beginner or experienced, this gym supports everyone.", name: "Akarsh Rajkumara" },
    { text: "The trainer is knowledgeable, motivating and supportive throughout the fitness journey. I've already lost 4kg and couldn't be happier with the results. The atmosphere is clean, welcoming and inspiring.", name: "Ritik Roy" },
    { text: "The trainer is friendly, experienced and always ready to help. The motivating atmosphere and respectful environment make every workout enjoyable. I've made excellent progress since joining.", name: "Chandan MR" },
    { text: "My body transformation journey at Xtreme Fitness Studio has been amazing. The gym is clean, well equipped and Coach Mithun along with Trainer Rakesh constantly motivate me to become stronger every day.", name: "Anand Murthy" },
    { text: "I've been training here for over a year and the experience has been fantastic. The equipment, environment and coaching are outstanding. I've seen noticeable improvements in my strength and fitness. Special thanks to Coach Mithun Gowda.", name: "Darshan Gowda" },
  ];
  const CR_LEN = CAROUSEL_REVIEWS.length; // 8
  const CARD_W = 380;
  const CARD_GAP = 32;
  const STEP = CARD_W + CARD_GAP;
  const allSlides = [...CAROUSEL_REVIEWS, ...CAROUSEL_REVIEWS, ...CAROUSEL_REVIEWS];

  // Start in the middle clone-set so we can go left or right infinitely
  const [crIdx, setCrIdx] = useState(CR_LEN);
  const [crAnimating, setCrAnimating] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState('transform 0.65s cubic-bezier(0.25, 0.1, 0.25, 1)');
  const crTrackRef = useRef<HTMLDivElement>(null);

  const goNext = () => {
    if (crAnimating) return;
    setCrAnimating(true);
    setCrIdx((prev) => prev + 1);
  };

  const goPrev = () => {
    if (crAnimating) return;
    setCrAnimating(true);
    setCrIdx((prev) => prev - 1);
  };

  const onTransitionEnd = () => {
    setCrAnimating(false);
    if (crIdx >= CR_LEN * 2) {
      setTransitionStyle('none');
      setCrIdx(crIdx - CR_LEN);
    } else if (crIdx < CR_LEN) {
      setTransitionStyle('none');
      setCrIdx(crIdx + CR_LEN);
    }
  };

  useEffect(() => {
    if (transitionStyle === 'none') {
      const timer = setTimeout(() => {
        setTransitionStyle('transform 0.65s cubic-bezier(0.25, 0.1, 0.25, 1)');
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [transitionStyle]);

  const trackX = `calc(50% - ${CARD_W / 2}px - ${crIdx * STEP}px)`;

  const filteredGallery = activeFilter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category.toLowerCase() === activeFilter.toLowerCase());

  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);

  const getProgramIcon = (id: string) => {
    switch (id) {
      case 'strength-training': return <Dumbbell className="h-5 w-5 text-yellow-400" />;
      case 'weight-loss':       return <Flame className="h-5 w-5 text-yellow-400" />;
      case 'weight-gain':       return <TrendingUp className="h-5 w-5 text-yellow-400" />;
      case 'personal-training': return <Users className="h-5 w-5 text-yellow-400" />;
      case 'cross-fit':         return <Zap className="h-5 w-5 text-yellow-400" />;
      case 'diet-counselling':  return <Apple className="h-5 w-5 text-yellow-400" />;
      case 'nutrition-support': return <Salad className="h-5 w-5 text-yellow-400" />;
      case 'body-building':     return <Trophy className="h-5 w-5 text-yellow-400" />;
      default:                  return <Dumbbell className="h-5 w-5 text-yellow-400" />;
    }
  };

  const handleProgramCardClick = (programId: string) => {
    setExpandedProgramId(prevId => prevId === programId ? null : programId);
    setTimeout(() => {
      const el = document.getElementById(`home-program-card-${programId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  };

  return (
    <div className="w-full bg-neutral-950 text-white font-sans" id="home-view">

      {/* ─── DESKTOP HERO & MOVEMENT BAR (1024px+) ─── */}
      <div className="hidden lg:block">
        <section
          id="hero-section"
          style={{
            position: 'relative',
            width: '100%',
            height: 'calc(100vh - 80px)',
            background: '#000000',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <style>{`
            @keyframes heroFadeIn {
              from { opacity: 0; transform: translateY(18px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes heroSlideLeft {
              from { opacity: 0; transform: translateX(-40px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes heroSlideRight {
              from { opacity: 0; transform: translateX(40px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 0 18px rgba(255,210,0,0.35); }
              50% { box-shadow: 0 0 36px rgba(255,210,0,0.65); }
            }
            .hero-left-animate { animation: heroSlideLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .hero-right-animate { animation: heroSlideRight 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
            .hero-bottom-animate { animation: heroFadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
            .join-btn-hover:hover { background: #000 !important; color: #FFD700 !important; }
            .feature-icon-wrap:hover { background: #FFD700 !important; color: #000 !important; }
          `}</style>

          {/* Subtle dot texture overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            zIndex: 0, pointerEvents: 'none',
          }} />

          <div id="hero-inner" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            zIndex: 2,
          }}>
            {/* LEFT COLUMN */}
            <div
              className="hero-left-animate"
              style={{
                flex: '0 0 52%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: '50px 4.5% 48px 7.5%',
                gap: '8px',
              }}
            >
              {/* Logo block */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: '870px' }}>
                <img
                  src={xtremeLogo}
                  alt="XTREME FITNESS STUDIO"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>

              {/* Tagline — STRONGER EVERY DAY */}
              <div style={{ marginTop: '-28px', maxWidth: '820px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '4px', background: '#FFD700', borderRadius: '2px', alignSelf: 'stretch', minHeight: '60px' }} />
                  <div>
                    <p style={{
                      fontFamily: "'Arial Black', 'Arial', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(24px, 2.8vw, 40px)',
                      letterSpacing: '0.04em',
                      lineHeight: 1.15,
                      margin: 0,
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                    }}>
                      <span style={{ color: '#FFD700' }}>STRONGER</span> EVERY DAY.
                    </p>
                    <p style={{
                      fontFamily: "'Arial Black', 'Arial', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(24px, 2.8vw, 40px)',
                      letterSpacing: '0.04em',
                      lineHeight: 1.15,
                      margin: 0,
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                    }}>
                      <span style={{ color: '#FFD700' }}>BETTER</span> EVERY REP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature icons row */}
              <style>{`
                .feat-card {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  flex: 1;
                  gap: 14px;
                  text-align: center;
                  padding: 18px 10px 20px;
                  border-radius: 8px;
                  cursor: default;
                  position: relative;
                  transition: transform 0.25s ease, background 0.25s ease;
                }
                .feat-card::after {
                  content: '';
                  position: absolute;
                  bottom: 6px;
                  left: 50%;
                  transform: translateX(-50%) scaleX(0);
                  width: 36px;
                  height: 2px;
                  background: #FFD700;
                  border-radius: 2px;
                  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1);
                }
                .feat-card:hover {
                  transform: translateY(-6px);
                  background: rgba(255,215,0,0.07);
                }
                .feat-card:hover::after {
                  transform: translateX(-50%) scaleX(1);
                }
                .feat-card:hover .feat-icon {
                  transform: scale(1.25) rotate(-5deg);
                  filter: drop-shadow(0 0 8px rgba(255,215,0,0.7));
                }
                .feat-card:hover .feat-label {
                  color: #FFD700;
                  letter-spacing: 0.18em;
                }
                .feat-icon {
                  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), filter 0.28s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .feat-label {
                  transition: color 0.22s ease, letter-spacing 0.22s ease;
                }
                .feat-divider {
                  width: 1px;
                  height: 56px;
                  background: linear-gradient(to bottom, transparent, rgba(255,215,0,0.3), transparent);
                  flex-shrink: 0;
                  align-self: center;
                }
              `}</style>

              <div style={{
                display: 'flex',
                alignItems: 'stretch',
                width: '100%',
                maxWidth: '820px',
                marginTop: '0',
                marginBottom: '0',
              }}>
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="#FFD700">
                        <rect x="2" y="7" width="2" height="10" rx="1" />
                        <rect x="5" y="5" width="2.5" height="14" rx="1" />
                        <rect x="7.5" y="11" width="9" height="2" />
                        <rect x="16.5" y="5" width="2.5" height="14" rx="1" />
                        <rect x="20" y="7" width="2" height="10" rx="1" />
                      </svg>
                    ),
                    label: 'STRENGTH\nTRAINING'
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="#FFD700">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    ),
                    label: 'POWER\nBUILDING'
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="#FFD700">
                        <circle cx="12" cy="4" r="1.8" />
                        <path d="M9.5 9.5 C9.5 12 10.5 14 10.5 17 H13.5 C13.5 14 14.5 12 14.5 9.5 Z" />
                        <path d="M9.5 8 C8.5 8 7 6.5 6.5 5.5 C6 4.5 7.5 3.5 8.5 4.5 C9 5 9.2 6.5 9.5 8 Z" />
                        <path d="M9.5 8 H6 C5 8 4 9 4 10 C4 11 5 12 6 12 H9.5 Z" />
                        <path d="M14.5 8 C15.5 8 17 6.5 17.5 5.5 C18 4.5 16.5 3.5 15.5 4.5 C15 5 14.8 6.5 14.5 8 Z" />
                        <path d="M14.5 8 H18 C19 8 20 9 20 10 C20 11 19 12 18 12 H14.5 Z" />
                      </svg>
                    ),
                    label: 'TRANSFORMATION\nFOCUSED'
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="13" r="8" />
                        <circle cx="11" cy="13" r="5" />
                        <circle cx="11" cy="13" r="2.2" fill="#FFD700" />
                        <path d="M19 5L14.5 9.5" />
                        <path d="M13 11l1.5-1.5" />
                        <path d="M17 4h2v2" />
                      </svg>
                    ),
                    label: 'RESULTS\nDRIVEN'
                  }
                ].map((f, i, arr) => (
                  <React.Fragment key={i}>
                    <div
                      className="feat-card"
                      role="img"
                      aria-label={f.label.replace('\n', ' ')}
                      tabIndex={0}
                    >
                      <div className="feat-icon">{f.icon}</div>
                      <span
                        className="feat-label"
                        style={{
                          fontFamily: "'Arial Black', 'Arial', sans-serif",
                          fontWeight: 900,
                          fontSize: 'clamp(10px, 0.78vw, 12px)',
                          letterSpacing: '0.14em',
                          color: '#FFFFFF',
                          textTransform: 'uppercase',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-line',
                        }}
                      >{f.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="feat-divider" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div
              className="hero-right-animate"
              style={{
                flex: '0 0 48%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Fade overlays */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000000 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.2) 55%, transparent 75%)', zIndex: 2, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, #000000 0%, rgba(0,0,0,0.4) 10%, transparent 30%)', zIndex: 2, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.3) 12%, transparent 30%)', zIndex: 2, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.4) 15%, transparent 40%)', zIndex: 2, pointerEvents: 'none' }} />
              <img
                src={heroImage}
                alt="XTREME FITNESS Trainer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'brightness(1.12) contrast(1.08) saturate(0.9)',
                }}
              />
            </div>
          </div>
        </section>

        {/* BOTTOM MOVEMENT BAR */}
        <div
          id="movement-bar"
          role="banner"
          aria-label="Call to action: Join the movement"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
          }}
        >
          <style>{`
            @keyframes barSlideUp {
              from { opacity: 0; transform: translateY(32px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes shimmer {
              0%   { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
            @keyframes trainPulse {
              0%, 100% { opacity: 0.55; letter-spacing: 0.35em; }
              50%       { opacity: 0.85; letter-spacing: 0.42em; }
            }
            .movement-bar-wrap {
              animation: barSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
            }
            .join-btn {
              transition: transform 0.2s ease, letter-spacing 0.2s ease, color 0.2s ease;
              cursor: pointer;
            }
            .join-btn:hover {
              transform: scale(1.04);
              letter-spacing: 0.28em;
              color: #111 !important;
            }
            .yellow-half {
              transition: background 0.25s ease, flex-basis 0.25s ease;
            }
            .yellow-half:hover {
              background: #FFDF00 !important;
              flex-basis: 52% !important;
            }
            .train-tagline {
              animation: trainPulse 4s ease-in-out infinite;
            }
          `}</style>

          <div
            className="movement-bar-wrap"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              width: '100%',
              minHeight: '60px',
              borderTop: '2px solid rgba(255,215,0,0.35)',
            }}
          >
            {/* Yellow LEFT half */}
            <div
              className="yellow-half"
              style={{
                flex: '0 0 50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFD700',
                position: 'relative',
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%)',
                paddingRight: '24px',
                gap: '10px',
              }}
            >
              <div aria-hidden="true" style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: '3px',
                      height: '24px',
                      background: 'rgba(0,0,0,0.22)',
                      transform: 'skewX(-15deg)',
                      borderRadius: '1px',
                    }}
                  />
                ))}
              </div>
              <span
                id="join-movement-text"
                className="join-btn"
                style={{
                  fontFamily: "'Arial Black', 'Arial', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(11px, 1.1vw, 15px)',
                  letterSpacing: '0.2em',
                  color: '#000',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  cursor: 'default',
                  userSelect: 'none',
                }}
              >
                JOIN THE MOVEMENT
              </span>
            </div>

            {/* Black RIGHT half */}
            <div
              style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a',
                paddingLeft: '28px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Arial', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  letterSpacing: '0.22em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  margin: 0,
                  cursor: 'default',
                  userSelect: 'none',
                }}
              >
                YOUR BEST SELF STARTS HERE.
              </p>
            </div>
          </div>

          {/* TRAIN HARD tagline */}
          <div
            style={{
              textAlign: 'center',
              padding: '13px 20px',
              background: '#000',
              borderBottom: '1px solid rgba(255,215,0,0.12)',
            }}
          >
            <p
              className="train-tagline"
              aria-label="Train hard. Stay consistent. Be Xtreme."
              style={{
                fontFamily: "'Arial', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(9px, 0.82vw, 12px)',
                letterSpacing: '0.35em',
                color: '#888',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              TRAIN HARD.&nbsp;&nbsp;STAY CONSISTENT.&nbsp;&nbsp;
              <span style={{ color: '#FFD700' }}>BE XTREME.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ─── MOBILE & TABLET HERO & MOVEMENT BAR (Up to 1023px) ─── */}
      <div className="block lg:hidden" id="hero-mobile-layout">
        {/* SECTION 1 – HERO IMAGE IN NATURAL FLOW (Starts behind transparent navbar) */}
        <div
          id="hero-poster-mobile-wrap"
          style={{
            width: '100%',
            height: '85dvh',
            background: '#000000',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={heroImage}
            alt="XTREME FITNESS Trainer"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
          {/* Top gradient overlay to fade the image to black for transparent navbar legibility */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          {/* Bottom gradient overlay to fade the image to solid black seamlessly */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </div>

        {/* SECTION 2 – HERO CONTENT (Seamless transition right below trainer's waist) */}
        <section
          id="hero-content-mobile"
          style={{
            width: '100%',
            background: '#000000',
            padding: '0px 24px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {/* Logo block */}
          <div style={{ width: '90%', maxWidth: '440px', display: 'flex', justifyContent: 'center' }}>
            <img
              src={xtremeLogo}
              alt="XTREME FITNESS STUDIO"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Tagline — STRONGER EVERY DAY. BETTER EVERY REP. */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <p style={{
              fontFamily: "'Arial Black', 'Arial', sans-serif",
              fontWeight: 900,
              fontSize: '22px',
              letterSpacing: '0.04em',
              lineHeight: 1.2,
              margin: 0,
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}>
              <span style={{ color: '#FFD700' }}>STRONGER</span> EVERY DAY.
            </p>
            <p style={{
              fontFamily: "'Arial Black', 'Arial', sans-serif",
              fontWeight: 900,
              fontSize: '22px',
              letterSpacing: '0.04em',
              lineHeight: 1.2,
              margin: 0,
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}>
              <span style={{ color: '#FFD700' }}>BETTER</span> EVERY REP.
            </p>
          </div>

          {/* Feature icons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            width: '100%',
            maxWidth: '480px',
            marginTop: '8px'
          }}>
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="#FFD700">
                    <rect x="2" y="7" width="2" height="10" rx="1" />
                    <rect x="5" y="5" width="2.5" height="14" rx="1" />
                    <rect x="7.5" y="11" width="9" height="2" />
                    <rect x="16.5" y="5" width="2.5" height="14" rx="1" />
                    <rect x="20" y="7" width="2" height="10" rx="1" />
                  </svg>
                ),
                label: 'STRENGTH\nTRAINING'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="#FFD700">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                label: 'POWER\nBUILDING'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="#FFD700">
                    <circle cx="12" cy="4" r="1.8" />
                    <path d="M9.5 9.5 C9.5 12 10.5 14 10.5 17 H13.5 C13.5 14 14.5 12 14.5 9.5 Z" />
                    <path d="M9.5 8 C8.5 8 7 6.5 6.5 5.5 C6 4.5 7.5 3.5 8.5 4.5 C9 5 9.2 6.5 9.5 8 Z" />
                    <path d="M9.5 8 H6 C5 8 4 9 4 10 C4 11 5 12 6 12 H9.5 Z" />
                    <path d="M14.5 8 C15.5 8 17 6.5 17.5 5.5 C18 4.5 16.5 3.5 15.5 4.5 C15 5 14.8 6.5 14.5 8 Z" />
                    <path d="M14.5 8 H18 C19 8 20 9 20 10 C20 11 19 12 18 12 H14.5 Z" />
                  </svg>
                ),
                label: 'TRANSFORMATION\nFOCUSED'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="13" r="8" />
                    <circle cx="11" cy="13" r="5" />
                    <circle cx="11" cy="13" r="2.2" fill="#FFD700" />
                    <path d="M19 5L14.5 9.5" />
                    <path d="M13 11l1.5-1.5" />
                    <path d="M17 4h2v2" />
                  </svg>
                ),
                label: 'RESULTS\nDRIVEN'
              }
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,215,0,0.02)',
                  border: '1px solid rgba(255,215,0,0.08)',
                  padding: '16px 12px',
                  borderRadius: '12px'
                }}
              >
                <div>{f.icon}</div>
                <span style={{
                  fontFamily: "'Arial Black', 'Arial', sans-serif",
                  fontWeight: 900,
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-line',
                }}>{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* JOIN THE MOVEMENT CTA strip for mobile/tablet */}
        <div
          id="movement-bar-mobile"
          style={{
            width: '100%',
            background: '#FFD700',
            borderTop: '2px solid rgba(255,215,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            gap: '8px',
            textAlign: 'center'
          }}
        >
          <span style={{
            fontFamily: "'Arial Black', 'Arial', sans-serif",
            fontWeight: 900,
            fontSize: '13px',
            letterSpacing: '0.2em',
            color: '#000',
            textTransform: 'uppercase',
          }}>
            JOIN THE MOVEMENT
          </span>
          <span style={{
            fontFamily: "'Arial', sans-serif",
            fontWeight: 700,
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: '#333',
            textTransform: 'uppercase',
          }}>
            YOUR BEST SELF STARTS HERE.
          </span>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '12px 20px',
          background: '#000',
          borderBottom: '1px solid rgba(255,215,0,0.12)',
        }}>
          <p style={{
            fontFamily: "'Arial', sans-serif",
            fontWeight: 700,
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#888',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            TRAIN HARD.&nbsp;&nbsp;STAY CONSISTENT.&nbsp;&nbsp;
            <span style={{ color: '#FFD700' }}>BE XTREME.</span>
          </p>
        </div>
      </div>


      {/* 2. ABOUT XTREME FITNESS */}
      <section className="pt-24 pb-12 bg-neutral-950 border-t border-neutral-900" id="about-section">
        
        {/* TOP CONTENT AREA */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 text-center"
            id="about-content-wrapper"
          >
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-yellow-400 tracking-widest uppercase block">
                Est. 2009 / Performance Forge
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-white tracking-tight uppercase leading-none">
                About <span className="text-yellow-400">XTREME FITNESS</span>
              </h2>
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed font-sans font-normal max-w-3xl mx-auto">
              XTREME FITNESS is a modern training facility designed to help members achieve their fitness goals through expert guidance, premium equipment, and a motivating workout environment. Whether you are a beginner or an experienced lifter, our gym provides everything needed for effective and results-driven training.
            </p>





          </motion.div>
        </div>

        {/* BOTTOM: FULL-BLEED MARQUEE CAROUSEL */}
        <div className="w-full relative overflow-hidden bg-black py-10 border-t border-b border-neutral-900 shadow-2xl">
          <style>{`
            @keyframes marqueeLoop {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation: marqueeLoop 45s linear infinite; /* Slightly slower for full-bleed */
              will-change: transform;
            }
            .marquee-set {
              display: flex;
              gap: 24px;
              padding-right: 24px; /* Matches gap to ensure a mathematically perfect loop */
            }
            @media (prefers-reduced-motion: reduce) {
              .marquee-track {
                animation-duration: 120s;
              }
            }
            .marquee-card {
              height: 400px;
              aspect-ratio: 16/9; /* Rectangle spec requested */
              flex-shrink: 0;
              border-radius: 12px; /* Slightly sharper for horizontal cards */
              overflow: hidden;
              border: 1px solid rgba(255, 255, 255, 0.05);
              box-shadow: 0 15px 40px -10px rgba(0,0,0,0.7);
              background-color: #0c0c0c;
              transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
            }
            .marquee-card:hover {
              transform: scale(1.02);
              filter: brightness(1.15);
            }
            .marquee-image {
              width: 100%;
              height: 100%;
              object-fit: contain; /* DO NOT CROP */
              animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            /* Responsive sizing */
            @media (max-width: 1024px) {
              .marquee-card { height: 320px; }
            }
            @media (max-width: 640px) {
              .marquee-card { height: 240px; }
            }
          `}</style>
          
          {/* Edge Fades for Seamless Look */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="marquee-track">
            <div className="marquee-set">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div key={`img1-${num}`} className="marquee-card">
                  <img
                    src={`/about-photos/${num}.jpeg`}
                    alt={`XTREME FITNESS Gallery Image ${num}`}
                    loading={num <= 3 ? "eager" : "lazy"}
                    className="marquee-image"
                  />
                </div>
              ))}
            </div>
            <div className="marquee-set" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div key={`img2-${num}`} className="marquee-card">
                  <img
                    src={`/about-photos/${num}.jpeg`}
                    alt=""
                    loading="lazy"
                    className="marquee-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 3. WHY CHOOSE US */}
      <section className="bg-neutral-900 border-t border-b border-neutral-900 py-24" id="why-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase block mb-2">
              WHY XTREME FITNESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight uppercase">
              THE SYSTEM FOR ABSOLUTE RESULTS
            </h2>
            <p className="text-sm text-neutral-400 mt-4 leading-relaxed">
              We do not deal in soft cardio grids or aesthetic vanity. We provide the hard mechanics, world-class coaching, and elite community you need to forge physical dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1: Elite Coaching */}
            <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between group hover:border-neutral-700 transition">
              <div>
                <div className="bg-amber-500/10 text-amber-500 h-12 w-12 rounded-xl flex items-center justify-center border border-amber-500/20 mb-6 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-sans font-bold text-white uppercase tracking-tight">
                  ELITE HEAD COACH
                </h3>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  Our Head Trainer is not a certification-mill trainer. He is a competitive lifter, athletic performance specialist, and active practitioner dedicated to your optimization.
                </p>
              </div>
              <span className="block font-mono text-[10px] text-neutral-600 mt-6 uppercase tracking-widest">
                [ CLINICALLY DRIVEN ]
              </span>
            </div>

            {/* Box 2: Premium Gear */}
            <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between group hover:border-neutral-700 transition">
              <div>
                <div className="bg-amber-500/10 text-amber-500 h-12 w-12 rounded-xl flex items-center justify-center border border-amber-500/20 mb-6 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-sans font-bold text-white uppercase tracking-tight">
                  PREMIUM IRON FACILITY
                </h3>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  Eleiko powerlifting bars, Ivanko calibrated plates, Hammer Strength plate-loaded equipment, Rogue steel cages, and dedicated 30-meter high-friction sprint turf track.
                </p>
              </div>
              <span className="block font-mono text-[10px] text-neutral-600 mt-6 uppercase tracking-widest">
                [ WORLD CLASS SPEC ]
              </span>
            </div>

            {/* Box 3: Supportive Community */}
            <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between group hover:border-neutral-700 transition">
              <div>
                <div className="bg-amber-500/10 text-amber-500 h-12 w-12 rounded-xl flex items-center justify-center border border-amber-500/20 mb-6 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-sans font-bold text-white uppercase tracking-tight">
                  XTREME COMRADERY
                </h3>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  No egos. Just pure commitment. Surround yourself with driven builders, competitive lifters, and active fitness enthusiasts who push your training standards daily.
                </p>
              </div>
              <span className="block font-mono text-[10px] text-neutral-600 mt-6 uppercase tracking-widest">
                [ ZERO COMPROMISE ]
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* 4. PREVIEW MEMBERSHIP PLANS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="membership-preview-section">
        <div className="bg-radial from-neutral-900 to-neutral-950 border border-neutral-850 p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase">
              RESERVE YOUR POSITION
            </span>
            <h3 className="text-3xl sm:text-4xl font-sans font-black text-white uppercase tracking-tight">
              COMMITTED MEMBRESHIP PLANS
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Transparent tier structures starting from <span className="text-white font-bold">₹2,000/mo</span> (billed annually) with zero registration markup or hidden exit fees. Choose your tier of access and join the team.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                setCurrentTab('membership');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 py-3.5 px-8 rounded-xl font-sans font-bold text-sm uppercase tracking-wider transition text-center cursor-pointer font-black shadow-lg"
            >
              VIEW MEMBERSHIP PLANS
            </button>
            <button
              onClick={() => {
                setCurrentTab('register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-transparent hover:bg-neutral-900 border border-neutral-700 hover:border-amber-500 text-white hover:text-amber-500 py-3.5 px-8 rounded-xl font-sans font-bold text-sm uppercase tracking-wider transition text-center cursor-pointer"
            >
              JOIN THE FORGE
            </button>
          </div>
        </div>
      </section>





      {/* 6. PROGRAMS SECTION (embedded from ProgramsView) */}
      <section className="bg-neutral-900 border-t border-b border-neutral-900 py-24" id="home-programs-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase block mb-2">
                XTREME FITNESS BLUEPRINTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight uppercase">
                EXPLORE OUR PROGRAMS
              </h2>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="home-programs-grid">
            {PROGRAM_DATA.map((program) => {
              const isExpanded = expandedProgramId === program.id;
              const details = DETAILED_PROGRAM_CONTENT[program.id] || {
                name: program.title,
                overview: program.description,
                benefits: program.benefits,
                trainingMethods: ['Bespoke progressive overload.', 'Technique monitoring.'],
                suitableFor: ['Dedicated lifters.'],
                durationInfo: { length: program.duration, frequency: '3-4 sessions per week', sessionLength: '60-75 minutes' }
              };
              return (
                <motion.div
                  key={program.id}
                  layout="position"
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  onClick={() => handleProgramCardClick(program.id)}
                  className={`group border overflow-hidden rounded-2xl shadow-xl transition-all duration-300 relative flex flex-col justify-between ${
                    isExpanded
                      ? 'col-span-1 sm:col-span-2 lg:col-span-4 bg-neutral-900/90 border-yellow-400/50 p-1'
                      : 'col-span-1 bg-neutral-900/60 hover:bg-neutral-900 border-neutral-900 hover:border-yellow-400/35 h-[385px] hover:-translate-y-1'
                  } cursor-pointer`}
                  id={`home-program-card-${program.id}`}
                >
                  {!isExpanded ? (
                    <div className="flex flex-col justify-between h-full w-full">
                      <div className="relative h-48 w-full overflow-hidden bg-neutral-950 shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30 z-10" />
                        <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                        <img src={program.image} alt={program.title} className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute top-4 left-4 z-20 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 p-2.5 rounded-xl shadow-md">
                          {getProgramIcon(program.id)}
                        </div>
                        <div className="absolute bottom-4 right-4 z-20 bg-black/90 backdrop-blur-sm border border-neutral-850 px-2.5 py-1 rounded-md">
                          <span className="font-mono text-[9px] font-bold text-neutral-300 tracking-wider uppercase">{program.intensity} TIER</span>
                        </div>
                      </div>
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
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full text-white font-sans flex flex-col lg:flex-row gap-6 p-6 lg:p-8"
                    >
                      {/* Left: Visual + Parameters */}
                      <div className="w-full lg:w-1/3 shrink-0 flex flex-col justify-between space-y-4">
                        <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-video lg:aspect-auto lg:h-64">
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-10" />
                          <img src={program.image} alt={program.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute bottom-4 left-4 z-20">
                            <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black px-2.5 py-1 rounded-md text-[10px] font-mono font-black uppercase tracking-wider">
                              <Activity className="h-3 w-3 stroke-[2.5]" />
                              <span>{program.intensity} INTENSITY</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-neutral-950/80 border border-neutral-800/60 p-5 rounded-xl space-y-4">
                          <h4 className="font-sans font-black text-xs text-neutral-400 uppercase tracking-wider border-b border-neutral-800 pb-2.5">Program Parameters</h4>
                          <div className="divide-y divide-neutral-800/60 text-xs">
                            <div className="flex justify-between py-2.5 gap-4"><span className="text-neutral-400 font-medium shrink-0">Duration</span><span className="font-mono text-yellow-400 font-bold text-right">{details.durationInfo.length}</span></div>
                            <div className="flex justify-between py-2.5 gap-4"><span className="text-neutral-400 font-medium shrink-0">Frequency</span><span className="font-mono text-yellow-400 font-bold text-right">{details.durationInfo.frequency}</span></div>
                            <div className="flex justify-between py-2.5 gap-4"><span className="text-neutral-400 font-medium shrink-0">Session Length</span><span className="font-mono text-yellow-400 font-bold text-right">{details.durationInfo.sessionLength}</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Details + Benefits + CTA */}
                      <div className="flex-grow flex flex-col justify-between space-y-6 lg:pl-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="font-mono text-[10px] font-bold text-yellow-400 uppercase tracking-widest block mb-1">PROGRAM DETAILS</span>
                              <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase tracking-tight">{details.name}</h3>
                            </div>
                            <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">{getProgramIcon(program.id)}</div>
                          </div>
                          <p className="text-neutral-300 text-sm leading-relaxed max-w-3xl">{details.overview}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3 bg-neutral-950/40 p-4 border border-neutral-800/40 rounded-xl">
                            <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider flex items-center gap-2"><Award className="h-4 w-4" /> Core Benefits</h4>
                            <ul className="space-y-2">
                              {details.benefits.map((b, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                                  <Check className="h-3.5 w-3.5 text-yellow-400 shrink-0 mt-0.5" /><span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-3 bg-neutral-950/40 p-4 border border-neutral-800/40 rounded-xl">
                            <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider flex items-center gap-2"><Target className="h-4 w-4" /> Methodology Focus</h4>
                            <ul className="space-y-2">
                              {details.trainingMethods.map((m, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed">
                                  <span className="font-mono text-yellow-400 font-bold shrink-0">{i + 1}.</span><span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/40">
                          <button
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setCurrentTab('register'); 
                              window.scrollTo({ top: 0, behavior: 'smooth' }); 
                            }}
                            className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black font-sans font-black px-6 py-3 rounded-xl tracking-wider uppercase transition-all duration-300 cursor-pointer text-xs"
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

          {/* Assurance Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 pt-16 border-t border-neutral-800">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20 shrink-0"><ShieldCheck className="h-6 w-6" /></div>
              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">SCIENTIFICALLY PLANNED</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Every training path matches optimal loading ratios, physiological rest cycles, and metabolic target triggers.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20 shrink-0"><Award className="h-6 w-6" /></div>
              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">MASTER COACHING STAFF</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Our coaches hold certified athletic qualifications to supervise forms, calibrate weights, and guide nutrition blocks.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20 shrink-0"><Clock className="h-6 w-6" /></div>
              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">PROGRESSIVE ROADMAPS</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Log your progression metrics, modify weight vectors, and secure consistent physiological adaptation safely.</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 7. TESTIMONIALS — Click-driven Infinite Circular Carousel */}
      <section
        className="w-full bg-neutral-950 border-t border-neutral-900 py-20 relative overflow-hidden"
        id="testimonials-section"
      >
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-yellow-400/3 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-yellow-400/2 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-center text-center mb-14 px-4">
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 stroke-none" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white tracking-tight uppercase leading-none mb-3">
            WHAT OUR <span className="text-yellow-400">MEMBERS SAY</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-lg leading-relaxed font-light tracking-wide">
            Real transformations. Real experiences. Real people.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full z-10">
              {/* Left fade edge */}
              <div className="absolute left-0 top-0 h-full w-32 sm:w-56 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
              {/* Right fade edge */}
              <div className="absolute right-0 top-0 h-full w-32 sm:w-56 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />

              {/* Left Arrow */}
              <button
                onClick={goPrev}
                aria-label="Previous review"
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-yellow-400/20 hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] cursor-pointer select-none"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 1L3 7l6 6" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                onClick={goNext}
                aria-label="Next review"
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-yellow-400/20 hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] cursor-pointer select-none"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 1l6 6-6 6" />
                </svg>
              </button>

              {/* Overflow mask */}
              <div className="overflow-hidden w-full">
                {/* Sliding track */}
                <div
                  ref={crTrackRef}
                  onTransitionEnd={onTransitionEnd}
                  className="flex items-start py-10"
                  style={{
                    transform: `translateX(${trackX})`,
                    transition: transitionStyle,
                    willChange: 'transform',
                    gap: `${CARD_GAP}px`,
                  }}
                >
                  {allSlides.map((review, idx) => {
                    const isCenter = idx === crIdx;
                    const dist = Math.abs(idx - crIdx);
                    // Only render visible cards (center ± 4) for perf
                    const visible = dist <= 4;
                    return (
                      <div
                        key={idx}
                        style={{
                          width: `${CARD_W}px`,
                          flexShrink: 0,
                          transform: isCenter
                            ? 'scale(1.06) translateY(-10px)'
                            : dist === 1
                            ? 'scale(0.93) translateY(0px)'
                            : 'scale(0.85) translateY(0px)',
                          opacity: isCenter ? 1 : dist === 1 ? 0.5 : visible ? 0.2 : 0,
                          filter: isCenter ? 'none' : dist === 1 ? 'blur(1.5px)' : 'blur(3px)',
                          transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1), opacity 0.65s ease, filter 0.65s ease',
                          transformOrigin: 'center bottom',
                          pointerEvents: visible ? 'auto' : 'none',
                        }}
                      >
                        <div className="flex flex-col space-y-5">
                          {/* Stars */}
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 stroke-none transition-colors duration-300 ${
                                isCenter ? 'fill-yellow-400' : 'fill-yellow-400/50'
                              }`} />
                            ))}
                          </div>

                          {/* Review text */}
                          <p
                            className="leading-[1.8] font-light"
                            style={{
                              fontSize: '15px',
                              color: isCenter ? 'rgb(212 212 212)' : 'rgb(115 115 115)',
                              transition: 'color 0.65s ease',
                            }}
                          >
                            {review.text}
                          </p>

                          {/* Name */}
                          <p
                            className="text-[13px] font-semibold tracking-wide"
                            style={{
                              color: isCenter ? 'rgb(250 204 21)' : 'rgb(120 100 30)',
                              transition: 'color 0.65s ease',
                            }}
                          >
                            — {review.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center space-x-2 mt-6">
                {CAROUSEL_REVIEWS.map((_, i) => {
                  const active = (crIdx % CR_LEN) === i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (crAnimating) return;
                        const target = CR_LEN + i;
                        setCrAnimating(true);
                        setCrIdx(target);
                      }}
                      className={`rounded-full transition-all duration-400 cursor-pointer ${
                        active ? 'w-6 h-2 bg-yellow-400' : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                      }`}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  );
                })}
              </div>
        </div>
      </section>


      {/* 8. PREMIUM BOTTOM CALL-TO-ACTION */}
      <section className="relative bg-black py-28 border-t border-neutral-900 overflow-hidden" id="forge-cta-section">
        {/* Subtle yellow ambient accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
            <span className="font-mono text-[10px] font-bold text-yellow-400 uppercase tracking-widest">
              IMMEDIATE MOBILIZATION
            </span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-white tracking-tight uppercase leading-none">
              READY TO FORGE A<br />
              <span className="text-yellow-400">STRONGER VERSION</span> OF YOURSELF?
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-normal">
              Take the first step towards your fitness transformation.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setCurrentTab('register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black font-sans font-black px-12 py-4 rounded-none tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_35px_rgba(250,204,21,0.25)] text-sm"
              id="home-bottom-join-btn"
            >
              JOIN THE FORGE
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
