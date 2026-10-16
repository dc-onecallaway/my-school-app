export const PHONE = '7011705235';
export const EMAIL = 'tutorshub.aktutorials@gmail.com';
export const wa = (t) => `https://wa.me/917011705235?text=${encodeURIComponent(t)}`;

export const PROGRAMS = [
  'Maths Orbit: Class 9-10 ICSE/CBSE Mathematics',
  'Maths Orbit: Class 8-9 Maths & Science Foundation',
  'Commerce Orbit: Class 11-12 Accountancy & Economics',
  'Commerce Orbit: Class 11-12 Business Studies & Banking',
  'Morning CUET (UG) Commerce Domain Batch',
  'Practical GST, ITR & Financial Accounting Lab',
];
export const [M910, M89, ACC, BST, CUET, GST] = PROGRAMS;
export const BOARD_MODES = ['ICSE / ISC — Offline (Sarojini Nagar)', 'CBSE — Offline (Sarojini Nagar)', 'Live Interactive Online Batch'];
export const OFFLINE = 'Offline Class (Sarojini Nagar)';
export const ONLINE = 'Live Interactive Online Batch';

export const NAV = [['orbits', 'Our Orbits'], ['founders', 'Founders'], ['courses', 'Courses'], ['quiz-lab', '⚡ Interactive Lab'], ['calculator', 'Study Planner'], ['schedule', 'Timetable'], ['demo', 'Contact']];
export const MOBILE_NAV = [['orbits', '🚀 Commerce Orbit & Maths Orbit'], ['founders', '👑 Meet Our Founders'], ['courses', '📚 All Courses (Class 8–12 & CUET)'], ['quiz-lab', '⚡ Live Quiz & Worksheet Lab'], ['calculator', '🎯 Custom Study & Score Planner'], ['schedule', '⏰ Daily Batch Timetable'], ['demo', '📍 Sarojini Nagar Center & Demo']];

export const HERO_MODES = {
  offline: {
    title: '📍 Sarojini Nagar, Lucknow (226008)', pill: 'Small Batch', pillCls: 'bg-yellow-400/20 text-yellow-200',
    text: 'Attend physical classes with printed chapter worksheets, daily 2-hour ledger/numerical practice, and Sunday offline board mock exams.',
    pts: ['✔ Direct copy & ledger checking on the spot', '✔ Dedicated doubt-solving desk before & after class'],
    cta: '🎟️ Book Offline Demo', enroll: OFFLINE, waLabel: '💬 WhatsApp Us', waText: 'Hello Tutors Hub! I want to join the Offline Batch in Sarojini Nagar.',
  },
  online: {
    title: '💻 Live Two-Way Interactive Online', pill: 'Pan-India', pillCls: 'bg-emerald-500/20 text-emerald-300',
    text: 'HD live audio-visual classes with real-time screen sharing, digital whiteboard derivations, downloadable PDF worksheets, and recorded backup access.',
    pts: ['✔ Unmute & ask doubts live during every lecture', '✔ Digital test paper evaluation with step-by-step remarks'],
    cta: '💻 Book Online Demo', enroll: ONLINE, waLabel: '💬 WhatsApp Online', waText: 'Hello Tutors Hub! I want to join the Live Online Batch.',
  },
};

export const HERO_PHRASES = ['95%+ Board Toppers.', 'Accountancy Mastery.', 'ICSE & CBSE Maths Speed.', 'Top CUET University Ranks.'];
export const HERO_STATS = [['ICSE / ISC', '& CBSE Board Aligned'], ['2-Hour', 'Daily Evening Practice'], ['CUET (UG)', 'Morning Target Batch'], ['1-on-1', 'Doubt & Parent Sync']];
export const MARQUEE = ['★ TUTORS HUB — SAROJINI NAGAR, LUCKNOW (226008) & LIVE ONLINE', '★ COMMERCE ORBIT × TUTORS HUB (CLASS 11, 12 & CUET)', '★ MATHS ORBIT × TUTORS HUB (CLASS 8, 9 & 10 ICSE & CBSE)', '★ 2-HOUR DAILY EVENING INTENSIVE SESSIONS', '★ DIRECT HELPLINE: 7011705235'];

export const FOUNDERS = [
  { name: 'Prof. Jyoti Rani', mono: 'JR', wing: 'Commerce Orbit × Tutors Hub', grad: 'from-amber-950 via-amber-900 to-yellow-700', rot: 'group-hover:rotate-6', cta: "✨ Book Demo with Ma'am", program: ACC,
    bio: 'Leading Commerce Orbit × Tutors Hub with a passion for turning complex accounting ledgers, economic policies, and business case studies into high-scoring subjects for board and CUET aspirants.',
    tags: ['📊 Accountancy', '📈 Economics', '💼 Business Studies', '🏦 Banking & CUET'] },
  { name: 'Mr. Ashish Kumar Chauhan', mono: 'AC', wing: 'Maths Orbit × Tutors Hub', grad: 'from-yellow-700 via-amber-900 to-amber-950', rot: 'group-hover:-rotate-6', cta: '✨ Book Demo with Sir', program: M910,
    bio: 'Leading Maths Orbit × Tutors Hub and evening Commerce sessions with a focus on analytical speed, theorem accuracy, and practical real-world accounting and tax applications.',
    tags: ['📐 ICSE & CBSE Maths', '⚡ Science Foundation', '📊 2-Hr Evening Accounts/Eco', '🧾 Applied GST Lab'] },
];

export const FILTERS = [['all', 'All Programs (6)'], ['maths', 'Maths Orbit (Class 8–10)'], ['commerce', 'Commerce Orbit (Class 11–12)'], ['entrance', 'CUET & Practical GST']];
export const COURSES = [
  { cat: 'maths', wing: 'Maths Orbit × Tutors Hub', tag: 'ICSE & CBSE', title: 'Class 9 & 10 High School Mathematics', program: M910,
    desc: 'Master Commercial Maths (GST, Banking, Shares), Algebra, Geometry, Trigonometry, Statistics & Mensuration with step-marking precision.',
    pts: ['Topic-wise graded worksheets & theorem drills', 'Past 10-year ICSE & CBSE board paper solving', 'Bi-weekly parent progress reports'] },
  { cat: 'maths', wing: 'Maths Orbit × Tutors Hub', tag: 'Class 8 & 9', title: 'Middle School Maths & Science Integrated', program: M89,
    desc: 'Comprehensive foundation across Mathematics, Physics, Chemistry & Biology with custom chapter worksheets and diagram drills.',
    pts: ['Physics & Chemistry numerical problem labs', 'Interactive audio-visual concept modules', 'Dedicated doubt-clearing sessions'] },
  { cat: 'commerce', dark: true, wing: 'Commerce Orbit × Tutors Hub', tag: '2-Hr Evening', title: 'Class 11 & 12 Accountancy & Economics', program: ACC,
    desc: 'Signature 2-hour daily evening sessions covering Partnership, Company Accounts, Cash Flow, and Micro/Macro/Indian Economics.',
    pts: ['Daily 2-hour intensive ledger & numerical practice', 'Real corporate financial statement illustrations', 'Full ISC & CBSE Pre-Board mock series'] },
  { cat: 'commerce', dark: true, wing: 'Commerce Orbit × Tutors Hub', tag: 'Class 11 & 12', title: 'Business Studies & Banking Mastery', program: BST,
    desc: 'Master management principles, financial markets, RBI monetary policy, and commercial banking with structured case-study presentation.',
    pts: ['Mind-maps, flowcharts & keyword capsules', 'Competency-based case study decoding', 'Complete Board Project & Viva-Voce guidance'] },
  { cat: 'entrance', wing: 'Morning Target Batch', tag: 'CUET (UG)', title: 'CUET (UG) Commerce Domain Booster', program: CUET,
    desc: 'Specialized morning coaching for top central university admissions. Line-by-line NCERT drills, speed MCQs & assertion-reason banks.',
    pts: ['Time-bound CBT mock tests & speed analytics', 'High-yield domain revision sheets', 'University preference list counseling'] },
  { cat: 'entrance', wing: 'Practical Tax Lab', tag: 'Skill Module', title: 'Practical GST, ITR & Financial Statements', program: GST,
    desc: 'Hands-on training in GST registration, E-way bills, GSTR-1/3B/9 filing, Input Tax Credit (ITC) reconciliation & Balance Sheet prep.',
    pts: ['Real-world tax & audit workflow exposure', 'Practical ITC optimization exercises', 'Ideal for Class 12 students & B.Com aspirants'] },
];

export const QUIZ = [
  { q: 'Maths Orbit (Class 10 GST): A dealer in Lucknow sells goods worth ₹20,000 within UP at 18% GST. What is the SGST amount?', options: ['₹3,600', '₹1,800', '₹900'], correct: 1,
    explanation: 'Correct! Intra-state GST (18%) splits equally into 9% CGST (₹1,800) and 9% SGST (₹1,800).' },
  { q: 'Commerce Orbit (Class 12 Accounts): In the absence of a Partnership Deed, interest on a partner’s loan is allowed at:', options: ['6% p.a.', '10% p.a.', 'No interest allowed'], correct: 0,
    explanation: 'Spot on! Interest on Partner’s Loan is a charge against profit allowed at 6% p.a. even without a deed.' },
  { q: 'Macroeconomics & Banking: If the Legal Reserve Ratio (LRR) is 20%, what is the Credit Multiplier?', options: ['4 times', '5 times', '10 times'], correct: 1,
    explanation: 'Awesome! Credit Multiplier = 1 / LRR = 1 / 0.20 = 5 times.' },
];

export const SAMPLES = {
  maths: { tab: '📐 Maths Orbit', badge: 'Maths Orbit × Tutors Hub', dark: false, title: 'Class 10 ICSE/CBSE: Commercial Maths (GST & Banking)', items: [
    { label: 'Problem 01 (Intra-State GST & ITC):', text: ' A dealer in Lucknow supplies goods worth ₹50,000 to a retailer at 18% GST. The retailer sells them to a customer at a profit of ₹10,000. Find the net CGST and SGST payable by the retailer.', ans: '✔ Value Addition = ₹10,000 | Net GST Payable = 18% of ₹10,000 = ₹1,800 (CGST = ₹900, SGST = ₹900).' },
    { label: 'Problem 02 (Banking — Recurring Deposit):', text: ' Mr. Khanna deposits ₹2,000 per month in a Recurring Deposit Account for 3 years at 9% p.a. simple interest. Calculate the maturity value.' } ] },
  accounts: { tab: '📊 Commerce Orbit', badge: 'Commerce Orbit × Tutors Hub', dark: true, title: 'Class 12 Accountancy & Banking (2-Hr Evening Drill)', items: [
    { label: 'Problem 01 (Company Accounts — Pro-Rata & Forfeiture):', text: ' X Ltd. forfeited 400 shares of ₹10 each (₹8 called up) issued at a premium of ₹2 on which ₹5 (including premium) was paid. Out of these, 300 shares were re-issued at ₹7 per share as ₹8 paid up. Calculate Capital Reserve.', ans: '✔ Amount forfeited on 300 shares (excluding premium) = 300 × ₹3 = ₹900 | Discount on re-issue = 300 × ₹1 = ₹300 | Capital Reserve = ₹600.' },
    { label: 'Problem 02 (Macroeconomics & Banking):', text: ' Illustrate numerically how an initial primary deposit of ₹1,000 Crore expands total credit in the economy when the Legal Reserve Ratio (LRR) is 20%.' } ] },
  cuet: { tab: '🎯 CUET & GST', badge: 'Morning CUET & Tax Lab', dark: false, title: 'CUET Assertion-Reason & Practical GST Filing', items: [
    { label: 'CUET High-Speed MCQ:', text: "\nAssertion (A): Interest on Partner's Loan is credited to the Partner's Loan Account and not to the Partner's Capital Account.\nReason (R): Interest on Partner's Loan is a charge against profit and not an appropriation of profit.", ans: '✔ Both (A) and (R) are true, and (R) is the correct explanation of (A).' },
    { label: 'Practical Tax Lab:', text: ' Step-by-step reconciliation of Input Tax Credit (ITC) between GSTR-2B and GSTR-3B along with E-Way Bill generation rules.' } ] },
};

export const PLANS = {
  middle: ['Maths & Science Foundation Roadmap: ICSE/CBSE theorem drills, numerical problem-solving, and weekly diagnostic testing.', '4:00 PM – 5:30 PM Daily Batch'],
  high: ['Class 10 Board Accelerator: Commercial Maths, Physics/Chemistry board marking drills, and past 10-year paper practice.', '4:00 PM – 5:30 PM Daily Batch'],
  commerce: ['Commerce Orbit Signature 2-Hour Evening Track: Partnership accounts, Company balance sheets, and Macro/Micro economics ledger mastery.', '5:30 PM – 7:30 PM (2-Hour Intensive Slot)'],
  cuet: ['CUET (UG) Morning Target Batch: NCERT line-by-line MCQ speed drills and assertion-reasoning practice.', '6:30 AM – 8:00 AM Morning Slot'],
};
export const MODE_TEXT = { offline: 'Offline Center in Sarojini Nagar, Lucknow', online: 'Live Interactive Online Classes', hybrid: 'Hybrid (Offline + Online Access)' };

export const SCHEDULE = [
  { wing: 'Morning CUET & Class 12 Booster', subjects: 'Accountancy, Economics & Business Studies Domain MCQs', time: '6:30 AM – 8:00 AM', mode: 'Offline + Online', program: CUET },
  { wing: 'Maths Orbit × Tutors Hub (Class 8–10)', subjects: 'ICSE & CBSE Mathematics, Physics, Chemistry & Biology', time: '4:00 PM – 5:30 PM', mode: 'Offline + Online', program: M910 },
  { wing: 'Commerce Orbit Evening (2-Hr Intensive)', subjects: 'ISC & CBSE Class 11–12 Accountancy & Economics', time: '5:30 PM – 7:30 PM (2 Hrs)', mode: 'Signature 2-Hr Slot', sig: true, program: ACC },
  { wing: 'Business Studies, Banking & GST Lab', subjects: 'Class 11–12 BST, Banking & Practical GST Filing', time: '7:30 PM – 8:45 PM', mode: 'Blended Hybrid', program: BST },
];
