export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  intensity: 'High' | 'Elite' | 'Maximum' | 'Extreme';
  rating: number;
  image: string;
  benefits: string[];
  trainerId: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  specialty: string;
  image: string;
  instagram: string;
  motto: string;
  certifications?: string[];
  expertiseAreas?: string[];
  philosophy?: string;
  specialties?: string[];
  achievements?: string[];
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  popular: boolean;
  tier: 'silver' | 'gold' | 'black';
  badge?: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  reviewAge: string;
  content: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Membership' | 'Training' | 'Facilities';
}

// ----------------------------------------------------------------------
// Static Mock Data for Powerhouse Gym
// ----------------------------------------------------------------------

export const PROGRAM_DATA: Program[] = [
  {
    id: 'strength-training',
    title: 'STRENGTH TRAINING',
    description: 'Build strength, improve endurance, and develop overall muscular fitness through structured resistance training.',
    duration: '12-Week Cycle',
    intensity: 'Elite',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
    benefits: ['Increase strength thresholds', 'Myofibrillar development', 'CNS efficiency'],
    trainerId: 'marcus-vance',
  },
  {
    id: 'weight-loss',
    title: 'WEIGHT LOSS',
    description: 'Scientifically planned workouts and guidance focused on burning fat, improving fitness levels, and achieving sustainable weight loss.',
    duration: '8-Week Cycle',
    intensity: 'Maximum',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    benefits: ['High caloric deficit stimulation', 'Conditioned cardiovascular rate', 'EPOC afterburn'],
    trainerId: 'marcus-vance',
  },
  {
    id: 'weight-gain',
    title: 'WEIGHT GAIN',
    description: 'Customized training and nutrition support designed to help members gain healthy muscle mass and strength.',
    duration: '10-Week Cycle',
    intensity: 'High',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600',
    benefits: ['Lean hypertrophy mass development', 'Caloric surplus guidance', 'Heavy progressive overload'],
    trainerId: 'marcus-vance',
  },
  {
    id: 'personal-training',
    title: 'PERSONAL TRAINING',
    description: 'One-on-one coaching sessions with certified trainers to create personalized workout plans and track progress effectively.',
    duration: 'Ongoing Guidance',
    intensity: 'Extreme',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600',
    benefits: ['Direct form feedback & technique', 'Custom workout progressions', 'Elite accountability & results'],
    trainerId: 'marcus-vance',
  },
  {
    id: 'cross-fit',
    title: 'CROSS FIT',
    description: 'High-intensity functional training programs that improve strength, endurance, agility, and overall physical performance.',
    duration: '8-Week Cycle',
    intensity: 'Extreme',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=600',
    benefits: ['Multi-directional power agility', 'Metabolic rate spike', 'Dynamic reflex mechanics'],
    trainerId: 'marcus-vance',
  },
  {
    id: 'diet-counselling',
    title: 'DIET COUNSELLING',
    description: 'Professional guidance on healthy eating habits, meal planning, and lifestyle modifications to support fitness goals.',
    duration: 'Ongoing Consultation',
    intensity: 'High',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600',
    benefits: ['Personalized macros breakdown', 'Sustainable healthy diet models', 'Weekly hydration tracker'],
    trainerId: 'marcus-vance',
  },
  {
    id: 'nutrition-support',
    title: 'NUTRITION SUPPORT',
    description: 'Nutrition-focused assistance to help members maintain proper dietary balance for muscle building, weight management, and overall wellness.',
    duration: 'Ongoing Guidance',
    intensity: 'High',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    benefits: ['Proper supplement structures', 'Metabolism optimization charts', 'Daily energy level tracking'],
    trainerId: 'mithun-gowda-shivaraju',
  },
  {
    id: 'body-building',
    title: 'BODY BUILDING',
    description: 'Dedicated training programs focused on muscle growth, physique development, strength enhancement, and competition preparation.',
    duration: '12-Week Protocol',
    intensity: 'Elite',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600',
    benefits: ['Hypertrophy and symmetry focus', 'Peak week stage prep tactics', 'Advanced volume structures'],
    trainerId: 'marcus-vance',
  },
];

export const TRAINER_DATA: Trainer[] = [
  {
    id: 'marcus-vance',
    name: 'MITHUN GOWDA SHIVARAJU',
    role: 'Head Trainer',
    bio: 'Former competitive powerlifter and strength coach with over 16+ years of coaching elite lifters. Specialized in mechanical analysis, customized macro-cycles, and breaking personal records.',
    experience: '16+ Years Elite Coaching',
    specialty: 'Powerlifting, Hypertrophy, Periodization',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=1200',
    instagram: '@being_phenomenal_mithun',
    motto: 'Strength is not an option. It is a biological obligation.',
    certifications: [
      'Certified Strength & Conditioning Specialist (CSCS)',
      'NASM Performance Enhancement Specialist (PES)',
      'USA Powerlifting (USAPL) Senior Coach',
      'Precision Nutrition Level 2 Certified Coach'
    ],
    expertiseAreas: [
      'Elite Powerlifting & Strength Training',
      'Hypertrophy & Muscle Building Protocols',
      'Advanced Periodization & Programming',
      'Biomechanical Analysis & Form Optimization'
    ],
    philosophy: 'Real training is about progression, discipline, and scientific programming. There are no shortcuts—only consistent, heavy compound loading and proper recovery.',
    specialties: [
      '1-on-1 Powerlifting Coaching',
      'Custom Strength Macrocycles',
      'Body Recomposition & Hypertrophy',
      'Injury Prevention & Form Reconstruction'
    ],
    achievements: [
      '16+ years of coaching experience with 2000+ client transformations',
      'Coached 20+ national and state-level powerlifting competitors',
      'Keynote Speaker at the Annual Strength & Conditioning Summit',
      'Former State Powerlifting Champion (93kg Class)'
    ]
  }
];

export const PLAN_DATA: Plan[] = [
  {
    id: 'iron-access',
    name: 'Iron Access',
    priceMonthly: 2500,
    priceAnnual: 2000,
    tier: 'silver',
    description: 'Essential strength foundation. Access to all weights and conditioning equipment.',
    features: [
      'Unlimited access to gym floor & turf',
      'Advanced cardio deck & spin zone',
      'Locker room & high-pressure showers',
      'Complimentary initial fitness assessment',
      'Access to Powerhouse custom tracking app',
    ],
    popular: false,
  },
  {
    id: 'power-performance',
    name: 'Power Performance',
    priceMonthly: 4500,
    priceAnnual: 3500,
    tier: 'gold',
    badge: 'Best Value',
    description: 'Our most popular tier. Designed for those serious about taking performance to the next level.',
    features: [
      'Everything in Iron Access',
      'Unlimited group power classes (HIIT, Strength)',
      'Acoustic recovery lounge access (2x / month)',
      '1x Monthly body composition analysis (InBody)',
      '10% discount at the Powerhouse Shake Bar',
      'Priority workshop & seminar bookings',
    ],
    popular: true,
  },
  {
    id: 'elite-powerhouse',
    name: 'Elite Powerhouse',
    priceMonthly: 10000,
    priceAnnual: 7500,
    tier: 'black',
    badge: 'Pro Tier',
    description: 'The ultimate fitness ecosystem. Direct premium coaching and high-end recovery benefits.',
    features: [
      'Everything in Power Performance',
      'Monthly 1-on-1 personal coaching session',
      'Customized nutrition & macro plans updated weekly',
      'Unlimited group program guidance & posture check',
      '24/7 keycard door access to the VIP facility',
      '1x Free daily signature energy shake',
      'Direct WhatsApp access to the coach panel',
    ],
    popular: false,
  },
];

export const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Puneeth V',
    reviewAge: '6 months ago',
    content: "Joining Xtreme Fitness Studio has been one of the best decisions I've made for my fitness journey. The facilities are modern, clean, and well-maintained, with a wide range of equipment that suits beginners and advanced lifters alike. The trainers are knowledgeable, approachable, and always ready to guide you with personalized tips and motivation.\n\nI especially appreciate the friendly atmosphere—it feels more like a community than just a gym. Whether it's strength training or cardio, there's something for everyone.\n\nHighly recommend Xtreme Fitness Studio to anyone looking to stay fit and truly enjoy the process."
  },
  {
    id: 't-2',
    name: 'B Keshav Pai',
    reviewAge: '6 months ago',
    content: "One of the best gyms in the Sunkadakatte locality. Coach Mithun Sir and Trainer Rakesh Sir are incredibly supportive, both morally and psychologically, throughout every individual's transformation journey.\n\nI have personally benefited a lot from this gym. Thanks to the entire Xtreme Fitness Studio team."
  },
  {
    id: 't-3',
    name: 'Raghu Gowda',
    reviewAge: 'a week ago',
    content: "I've been a member here for the past 2 years, and the experience has been outstanding. The gym is very well maintained, the coaching is excellent, and everyone is treated with kindness and respect.\n\nIt's absolutely worth joining if you're serious about achieving your fitness goals.\n\nOne of the finest gyms in and around Sunkadakatte.\n\nHighly recommended."
  },
  {
    id: 't-4',
    name: 'Akarsh Rajkumara',
    reviewAge: '11 months ago',
    content: "Excellent Gym with Professional Support.\n\nAll the equipment is modern, clean, and extremely well maintained, making workouts both safe and effective.\n\nWhat truly sets this gym apart is the trainer. He's knowledgeable, supportive, and always available to guide you through every exercise. You're never left figuring things out on your own.\n\nWhether you're a beginner or experienced, this gym offers the perfect environment to grow stronger every day."
  },
  {
    id: 't-5',
    name: 'Ritik Roy',
    reviewAge: '11 months ago',
    content: "I recently joined Xtreme Fitness Studio and have been working with an amazing trainer who has guided me every step of the way.\n\nThe trainer is knowledgeable, motivating, and supportive, making every workout enjoyable and productive.\n\nI've already lost 4 kg and I'm extremely happy with my progress. The gym has a welcoming atmosphere, friendly staff, and a clean, well-equipped facility.\n\nHighly recommended for anyone starting their fitness journey."
  },
  {
    id: 't-6',
    name: 'Chandan MR',
    reviewAge: '1 year ago',
    content: "The trainer is friendly, knowledgeable, and always ready to answer questions or provide valuable fitness advice.\n\nThe atmosphere inside the gym is highly motivating, and everyone is respectful, making it a comfortable place to train.\n\nI've seen great improvements in my fitness journey, and whether you're a beginner or experienced, Xtreme Fitness Studio has everything you need to achieve your goals."
  },
  {
    id: 't-7',
    name: 'Anand Murthy',
    reviewAge: '11 months ago',
    content: "I joined Xtreme Fitness Studio for fitness and body transformation, and my journey has been incredible.\n\nThe gym is clean, well equipped, and provides an excellent training environment.\n\nTrainer Mithun and Trainer Rakesh are extremely professional, encouraging, and motivating every single day. Their guidance has helped me stay consistent and move closer to my fitness goals.\n\nI'm happy to continue training in such a friendly and supportive environment."
  },
  {
    id: 't-8',
    name: 'Darshan Gowda',
    reviewAge: '1 year ago',
    content: "I've been a member of Xtreme Fitness Studio for the past year, and it's been a fantastic experience.\n\nThe gym is well maintained, offers a wide variety of training options, and the staff are supportive, knowledgeable, and friendly.\n\nI've experienced significant improvements in my strength and overall fitness.\n\nSpecial thanks to my trainer, Mithun Gowda, for his constant motivation and guidance.\n\nI highly recommend Xtreme Fitness Studio to anyone looking for a supportive, professional, and well-equipped gym."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Can I freeze my membership if I travel?',
    answer: 'Absolutely. Power Performance and Elite Powerhouse members can freeze their membership for up to 60 days per calendar year. You can do this easily with 48 hours notice through our app or by sending an email to our support team.',
    category: 'Membership',
  },
  {
    id: 'faq-2',
    question: 'Are personal training sessions included?',
    answer: 'Yes, our Elite Powerhouse membership includes a monthly 1-on-1 personal coaching session. You can also book additional premium sessions with our master trainers at any time.',
    category: 'Training',
  },
  {
    id: 'faq-3',
    question: 'What premium equipment is available?',
    answer: 'Our floor features elite-grade powerlifting gear: Eleiko competition bars, Ivanko calibrated plates, Rogue monster racks, Hammer Strength plate-loaded equipment, a 30m sprint turf, and state-of-the-art Keiser dynamic pneumatic machines.',
    category: 'Facilities',
  },
  {
    id: 'faq-4',
    question: 'Are there initiation fees or hidden contracts?',
    answer: 'None whatsoever. We believe in complete transparency. Our memberships are month-to-month, meaning you can cancel or change tiers at any time before your next billing cycle. No setup fees, no cancellation fees.',
    category: 'Membership',
  },
  {
    id: 'faq-5',
    question: 'How do I book 1-on-1 sessions with my coach?',
    answer: 'If you are an Elite Powerhouse member, you can book your weekly or monthly assessments and sessions directly in our mobile application or by messaging your assigned personal trainer on WhatsApp.',
    category: 'Training',
  },
  {
    id: 'faq-6',
    question: 'Are lockers and shower facilities available?',
    answer: 'Yes, we provide clean, hygienic changing rooms, lockable day lockers, and fully functional shower rooms with regular sanitization for all our active members.',
    category: 'Facilities',
  },
];

export const GALLERY_IMAGES = [
  {
    title: 'The Weight Room',
    category: 'Strength',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Sprint Turf Track',
    category: 'Conditioning',
    url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Cardio & Conditioning Area',
    category: 'Cardio',
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Group Performance Arena',
    category: 'Community',
    url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Clean Changing Rooms',
    category: 'Facilities',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Dumbbell Forge Area',
    category: 'Strength',
    url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800',
  },
];
