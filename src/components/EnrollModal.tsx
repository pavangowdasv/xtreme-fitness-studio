import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Dumbbell, ShieldAlert, Target } from 'lucide-react';
import { PLAN_DATA, PROGRAM_DATA } from '../types';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
  initialProgramId?: string;
}

export default function EnrollModal({ isOpen, onClose, initialPlanId, initialProgramId }: EnrollModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: initialPlanId || '',
    program: initialProgramId || '',
    level: 'intermediate',
    goals: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initial props when they change
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      plan: initialPlanId || prev.plan,
      program: initialProgramId || prev.program,
    }));
  }, [initialPlanId, initialProgramId]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API registration delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      plan: '',
      program: '',
      level: 'intermediate',
      goals: '',
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10"
            id="enroll-modal-content"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-neutral-900 border-b border-neutral-800">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-5 w-5 text-amber-500 animate-pulse" />
                <span className="font-sans font-bold tracking-wider text-white text-lg">
                  POWERHOUSE LEAGUE
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition"
                aria-label="Close modal"
                id="close-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4" id="enroll-form">
                  <div>
                    <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                      Begin Your Forge Process
                    </h3>
                    <p className="text-sm text-neutral-400 mt-1">
                      Complete your details to secure priority access, customized onboarding, and scheduling options.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full bg-neutral-950 border ${
                        errors.name ? 'border-red-500' : 'border-neutral-800 focus:border-amber-500'
                      } text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition`}
                      id="input-name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <ShieldAlert className="h-3 w-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full bg-neutral-950 border ${
                          errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-amber-500'
                        } text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition`}
                        id="input-email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className={`w-full bg-neutral-950 border ${
                          errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-amber-500'
                        } text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition`}
                        id="input-phone"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Plan & Program Selections */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest mb-1.5">
                        Select Plan Tier (Optional)
                      </label>
                      <select
                        value={formData.plan}
                        onChange={e => setFormData({ ...formData, plan: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                        id="select-plan"
                      >
                        <option value="">No Plan Selected</option>
                        {PLAN_DATA.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} (₹{p.priceMonthly.toLocaleString('en-IN')}/mo)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest mb-1.5">
                        Target Protocol (Optional)
                      </label>
                      <select
                        value={formData.program}
                        onChange={e => setFormData({ ...formData, program: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                        id="select-program"
                      >
                        <option value="">No Protocol Selected</option>
                        {PROGRAM_DATA.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fitness Level */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest mb-2">
                      Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['beginner', 'intermediate', 'advanced'].map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({ ...formData, level })}
                          className={`py-2 text-xs font-sans capitalize rounded-lg border font-medium transition ${
                            formData.level === level
                              ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-md shadow-amber-500/10'
                              : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Fitness Goal */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest mb-1.5">
                      Your Main Fitness Goal or Message
                    </label>
                    <textarea
                      value={formData.goals}
                      onChange={e => setFormData({ ...formData, goals: e.target.value })}
                      placeholder="e.g. Break deadlift plateau, increase sprint velocity, build core muscle..."
                      rows={2}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                      id="input-goals"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-sans font-bold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/15 flex justify-center items-center gap-2 cursor-pointer transition disabled:opacity-50 mt-4"
                    id="submit-enroll-btn"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Target className="h-4 w-4" />
                        <span>AUTHORIZE ENROLLMENT</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 px-4"
                  id="success-enrollment"
                >
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-6">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-sans font-bold text-white tracking-tight uppercase">
                    Onboarding Initiated
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-sm mx-auto mt-3">
                    Welcome to the line, <span className="text-white font-semibold">{formData.name}</span>! Your protocol registration is validated.
                  </p>
                  <p className="text-neutral-400 text-xs max-w-xs mx-auto mt-4 border-t border-neutral-800/80 pt-4 font-mono">
                    An intake specialist or coach will contact you within the next 4 hours at <span className="text-amber-500">{formData.email}</span>.
                  </p>

                  <button
                    onClick={handleReset}
                    className="mt-8 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 border border-neutral-700 text-white font-sans text-sm font-semibold rounded-lg tracking-wide transition cursor-pointer"
                    id="success-dismiss-btn"
                  >
                    DISMISS PROTOCOL
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
