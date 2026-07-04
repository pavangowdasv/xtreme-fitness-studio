import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, Sparkles, ShieldCheck, Dumbbell, Zap, Coffee, Award, Users
} from 'lucide-react';
import xtremeBadgeLogo from '../assets/images/xtreme_badge_logo.jpg';

interface MembershipViewProps {
  onOpenEnroll: (planId?: string) => void;
  setCurrentTab: (tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery') => void;
}

export default function MembershipView({ onOpenEnroll, setCurrentTab }: MembershipViewProps) {
  const plans = [
    {
      id: 'monthly-plan',
      name: 'Monthly Plan',
      originalPrice: 2000,
      discount: 0,
      finalPrice: 2000,
      description: 'Ideal for short-term flexibility with full-access performance tools.',
      features: [
        'Unlimited access to gym floor & turf',
        'Advanced cardio deck & strength equipment',
        'Locker room & hygienic shower facilities',
        'Initial physical fitness evaluation session',
        '24/7 client portal & tracking app features'
      ],
      popular: false
    },
    {
      id: 'quarterly-plan',
      name: 'Quarterly Plan',
      originalPrice: 6000,
      discount: 2000,
      finalPrice: 4000,
      description: 'The standard choice for committed fitness builders tracking progress.',
      features: [
        'Everything in Monthly Plan',
        'Save ₹2,000 over 3 Months',
        'Monthly InBody composition analysis',
        'Customized nutrition guidelines scorecard'
      ],
      popular: false
    },
    {
      id: 'six-months-plan',
      name: '6 Months Plan',
      originalPrice: 12000,
      discount: 5000,
      finalPrice: 7000,
      description: 'Exceptional mid-term value for serious athletic transformations.',
      features: [
        'Everything in Quarterly Plan',
        'Save ₹5,000 over 6 Months',
        'Priority coaching workshop reservations',
        'XTREME FITNESS athletic training manual'
      ],
      popular: false
    },
    {
      id: 'yearly-plan',
      name: 'Yearly Plan',
      originalPrice: 24000,
      discount: 14000,
      finalPrice: 10000,
      description: 'The ultimate fitness commitment. Absolute maximum cost-savings rate.',
      features: [
        'Everything in 6 Months Plan',
        'Save ₹14,000 over 12 Months',
        'Complimentary generalized diet plan & tips',
        'Standard barcode or app-based check-in',
        'Direct priority WhatsApp trainer feedback channel'
      ],
      popular: true,
      badge: 'Best Value'
    }
  ];

  const handleChoosePlan = () => {
    setCurrentTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-neutral-950 text-white font-sans min-h-screen py-10" id="membership-view">
      
      {/* 1. HERO SECTION (COMPACT & INTENTIONAL) */}
      <section className="relative py-16 bg-neutral-900 border-b border-neutral-900 overflow-hidden" id="membership-hero">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200" 
            alt="Lifting weights plates background" 
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-yellow-400 tracking-widest uppercase block mb-3">
              MEMBERSHIP TIERS
            </span>
            <h1 className="text-3xl sm:text-5xl font-sans font-black text-white uppercase tracking-tight">
              FORGE YOUR ULTIMATE ACCELERATION
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
              Flexible, high-performance memberships designed with complete transparency. Simple billing, zero setup charges, and focused athletic results.
            </p>
          </div>
          <div className="shrink-0 bg-neutral-950/40 p-2.5 rounded-full border border-neutral-800/40 shadow-inner">
            <img 
              src={xtremeBadgeLogo} 
              alt="XTREME FITNESS STUDIO Logo" 
              className="h-28 w-28 md:h-36 md:w-36 object-cover rounded-full border border-neutral-900 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>


      {/* 2. CHOOSE YOUR PLAN SECTOR */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="plans-section">
        
        {/* ADMISSION OFFER BADGE */}
        <div className="flex justify-center mb-12" id="admission-offer-badge-wrapper">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
            className="inline-flex items-center space-x-2.5 bg-yellow-400 text-black px-5 py-2.5 rounded-full font-sans font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.35)]"
            id="badge-free-admission"
          >
            <Zap className="h-4 w-4 fill-current animate-pulse" />
            <span>LIMITED ADMISSION OFFER: FREE ADMISSION</span>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16" id="pricing-plans-grid">
          {plans.map((plan) => {
            return (
              <div 
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 h-full border ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-yellow-400 shadow-2xl shadow-yellow-400/5 hover:scale-[1.01]' 
                    : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700/80 hover:scale-[1.01]'
                }`}
                id={`plan-card-${plan.id}`}
              >
                {/* Popularity Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-6 -translate-y-1/2">
                    <span className="bg-yellow-400 text-neutral-950 text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md flex items-center gap-1">
                      <Sparkles className="h-3 w-3 fill-neutral-950" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Card Top */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-sans font-black text-white uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-normal min-h-[34px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 border-b border-t border-neutral-800/85">
                    {/* Final Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-sans font-black text-white tracking-tight">
                        ₹{plan.finalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
                        / Total
                      </span>
                    </div>

                    {/* Original Price and Discount Info */}
                    <div className="mt-2 space-y-1">
                      {plan.discount > 0 ? (
                        <>
                          <div className="text-[11px] font-mono text-neutral-500">
                            Original Fee: <span className="line-through">₹{plan.originalPrice.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="inline-block bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            Save ₹{plan.discount.toLocaleString('en-IN')}
                          </div>
                        </>
                      ) : (
                        <div className="text-[11px] font-mono text-neutral-500">
                          Standard monthly rate
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
                      INCLUDED BENEFITS:
                    </p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-xs text-neutral-300 leading-normal">
                          <Check className="h-3.5 w-3.5 text-yellow-400 shrink-0 mr-2.5 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Choose plan Button */}
                <div className="mt-6 pt-5 border-t border-neutral-850">
                  <button
                    onClick={handleChoosePlan}
                    className="w-full py-3 px-4 rounded-xl font-sans font-bold text-xs uppercase tracking-widest transition duration-300 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 shadow-md cursor-pointer text-center"
                    id={`select-plan-${plan.id}-btn`}
                  >
                    CHOOSE DISCIPLINE
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* PERSONAL TRAINING UPGRADE SECTION */}
        <div className="bg-neutral-900/40 border border-neutral-900 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-yellow-400/20 transition-all duration-300" id="personal-training-upgrade">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left max-w-2xl">
            <div className="bg-yellow-400/10 text-yellow-400 p-3 rounded-xl border border-yellow-400/20 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400 uppercase bg-yellow-400/10 px-2 py-0.5 rounded">
                  RECOMMENDED ADD-ON
                </span>
                <span className="text-white font-sans font-black text-sm uppercase tracking-wider">
                  PERSONAL TRAINING UPGRADE
                </span>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Unlock specialized 1-on-1 athletic coaching tailored precisely to your mechanical layout. Includes weekly customized programming and strict nutritional tracking.
              </p>
              <p className="text-[11px] text-neutral-500 font-mono italic">
                * Note: Personal Training charges are separate and general membership fees are not included in this rate.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-center md:text-right bg-neutral-950/80 border border-neutral-800/60 p-4 sm:px-6 rounded-xl min-w-[200px] w-full md:w-auto">
            <span className="block font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Master Coach Rate</span>
            <span className="block text-2xl font-sans font-black text-yellow-400 mt-1">₹8,000</span>
            <span className="block font-mono text-[9px] text-neutral-400 mt-0.5">PER MONTH ADD-ON</span>
          </div>
        </div>

      </section>


      {/* 3. WHY MEMBERS CHOOSE US */}
      <section className="bg-neutral-900 border-t border-b border-neutral-900 py-20" id="benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold text-yellow-400 tracking-widest uppercase block mb-2">
              WHY MEMBERS CHOOSE US
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-black text-white tracking-tight uppercase">
              MEMBER BENEFITS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
              We provide a supportive, hygienic, and fully equipped training environment to help you stay motivated and achieve consistent fitness results.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="benefits-bento-grid">
            {/* Box 1: Modern Strength & Cardio */}
            <div className="md:col-span-8 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-2xl hover:border-yellow-400/20 transition flex flex-col sm:flex-row justify-between items-start gap-6 group">
              <div className="space-y-4 max-w-md">
                <div className="bg-yellow-400/10 text-yellow-400 h-9 w-9 rounded-lg flex items-center justify-center border border-yellow-400/20 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Dumbbell className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-white uppercase tracking-tight">
                  Modern Strength & Cardio Equipment
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Train with imported plate-loaded strength machines, full range of dumbbells up to 50kg, and high-performance commercial treadmills.
                </p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shrink-0 w-full sm:w-44 flex flex-col justify-center text-center">
                <span className="text-[10px] font-mono text-yellow-400 font-bold">DUMBBELL RANGE</span>
                <span className="text-2xl font-black text-white mt-1">50 kg</span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase mt-1.5 pt-1.5 border-t border-neutral-800">HEAVY STRENGTH DECK</span>
              </div>
            </div>

            {/* Box 2: Certified Trainers */}
            <div className="md:col-span-4 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-2xl hover:border-yellow-400/20 transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="bg-yellow-400/10 text-yellow-400 h-9 w-9 rounded-lg flex items-center justify-center border border-yellow-400/20 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-white uppercase tracking-tight">
                  Guidance from Certified Trainers
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Our expert floor coaches are always available during operational hours to correct your form, adjust posture, and ensure safety.
                </p>
              </div>
              <span className="block font-mono text-[9px] text-neutral-600 uppercase tracking-widest mt-6">[ CERTIFIED FLOOR STAFF ]</span>
            </div>

            {/* Box 3: Clean & Hygienic */}
            <div className="md:col-span-4 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-2xl hover:border-yellow-400/20 transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="bg-yellow-400/10 text-yellow-400 h-9 w-9 rounded-lg flex items-center justify-center border border-yellow-400/20 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-white uppercase tracking-tight">
                  Clean & Hygienic Workout Environment
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Experience rigorous daily cleaning of all workout benches, sanitization of machines, and clean, tidy changing rooms.
                </p>
              </div>
              <span className="block font-mono text-[9px] text-neutral-600 uppercase tracking-widest mt-6">[ HYGIENE & SAFETY FIRST ]</span>
            </div>

            {/* Box 4: Diet & Nutrition */}
            <div className="md:col-span-8 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-2xl hover:border-yellow-400/20 transition flex flex-col sm:flex-row justify-between items-start gap-6 group">
              <div className="space-y-4 max-w-md">
                <div className="bg-yellow-400/10 text-yellow-400 h-9 w-9 rounded-lg flex items-center justify-center border border-yellow-400/20 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Coffee className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-white uppercase tracking-tight">
                  Nutrition & Diet Guidance
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Receive personalized macro advice and general diet templates designed to complement your weight loss or muscle building training.
                </p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shrink-0 w-full sm:w-44 text-center flex flex-col justify-center">
                <span className="text-[10px] font-mono text-neutral-400">DIET CHARTS</span>
                <span className="text-sm font-bold text-yellow-400 uppercase mt-1">INCLUDED</span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase mt-1.5 pt-1.5 border-t border-neutral-800">ALL PASS TIERS</span>
              </div>
            </div>

            {/* Box 5: Weight Loss & Muscle Building Programs */}
            <div className="md:col-span-6 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-2xl hover:border-yellow-400/20 transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="bg-yellow-400/10 text-yellow-400 h-9 w-9 rounded-lg flex items-center justify-center border border-yellow-400/20 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Zap className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-white uppercase tracking-tight">
                  Weight Loss & Muscle Building Programs
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Tailored workouts and routine layouts planned to target body fat reductions and robust muscular growth effectively.
                </p>
              </div>
              <span className="block font-mono text-[9px] text-neutral-600 uppercase tracking-widest mt-6">[ RESULT ORIENTED ]</span>
            </div>

            {/* Box 6: Community & Flexibility */}
            <div className="md:col-span-6 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-2xl hover:border-yellow-400/20 transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="bg-yellow-400/10 text-yellow-400 h-9 w-9 rounded-lg flex items-center justify-center border border-yellow-400/20 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Users className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-white uppercase tracking-tight">
                  Friendly Community & Flexible Options
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Join a friendly local gym community with highly supportive members and enjoy flexible monthly, quarterly, or yearly pricing.
                </p>
              </div>
              <span className="block font-mono text-[9px] text-neutral-600 uppercase tracking-widest mt-6">[ CHOOSE YOUR CONVENIENCE ]</span>
            </div>
          </div>
        </div>
      </section>


      {/* 4. MEMBERSHIP CTA */}
      <section className="relative py-20 text-center bg-neutral-950 overflow-hidden border-t border-neutral-900" id="membership-cta">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200" 
            alt="Lifting details" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 max-w-2xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-sans font-black text-white uppercase tracking-tight">
            FORGE YOUR ULTIMATE PHYSIQUE
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
            Join the ranks of competitive lifters, active performance athletes, and dedicated builders today.
          </p>
          <div className="pt-4">
            <button
              onClick={handleChoosePlan}
              className="bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-sans font-black px-8 py-4 rounded-xl shadow-lg shadow-yellow-400/10 tracking-widest text-xs uppercase cursor-pointer transition"
            >
              CHOOSE DISCIPLINE
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
