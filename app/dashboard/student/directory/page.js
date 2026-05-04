'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Home, User, Activity, TrendingUp, Users, Bell, Award,
  Grid, FileText, LogOut, Search, ChevronDown, ChevronRight,
  ArrowUpRight, Globe, Cpu, BarChart2, Wifi, PenTool, Code, BookOpen,
  X, CheckCircle, Plus, Filter, GitBranch, CalendarDays, UserSearch,
  Mail, Phone, MapPin, Layers, Star, Trophy, Zap, GraduationCap,
  Building2, Hash, Badge, ClipboardList, BarChart, Target,
  Briefcase, ExternalLink, SlidersHorizontal
} from 'lucide-react'

// ─── NAV ────────────────────────────────────────────────────────
const navLinks = [
  { id: 'dashboard',  label: 'Dashboard',       icon: Home,      badge: null, path: '/dashboard/student' },
  { id: 'profile',    label: 'My Profile',       icon: User,      badge: null, path: '/dashboard/student/profile' },
  { id: 'skill',      label: 'Skill Radar',      icon: Activity,  badge: null, path: '/dashboard/student/skill-radar' },
  { id: 'career',     label: 'Career Path',      icon: TrendingUp,badge: null, path: '/dashboard/student' },
  { id: 'team',       label: 'My Team',          icon: Users,     badge: null, path: '/dashboard/student/my-team' },
  { id: 'notifs',     label: 'Notifications',    icon: Bell,      badge: '3',  path: '/dashboard/student/notifications' },
  { id: 'rankings',   label: 'Rankings',         icon: Award,     badge: null, path: '/dashboard/student/rankings' },
  { id: 'directory',  label: 'Domain Directory', icon: Grid,      badge: null, path: '/dashboard/student/directory' },
  { id: 'resume',     label: 'Resume Builder',   icon: FileText,  badge: null, path: '/dashboard/student' },
]

// ─── BRANCH & YEAR OPTIONS ──────────────────────────────────────
const BRANCHES = ['All Branches', 'CSE', 'IT', 'ECE', 'Mechanical', 'Civil']
const YEARS    = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year']

// ─── STUDENT DATA ───────────────────────────────────────────────
const students = [
  {
    id: 1, name: 'Harsh Chaudhary',   roll: '3CS12', branch: 'CSE', year: '3rd Year',
    domain: 'Web Development',          skills: ['React', 'Node.js', 'MongoDB'],
    spi: 81, cgpa: 7.9, status: 'Open to Team Up', initials: 'HC', isTeammate: true,
    email: 'harsh.chaudhary@college.edu', phone: '+91 98765 43210',
    city: 'Ahmedabad', achievements: ['SIH 2025 Finalist', 'Best Project Award'],
    projects: ['E-Commerce Platform', 'College Bus Tracker'],
    certifications: ['AWS Cloud Practitioner', 'Meta Front-End Dev'],
    linkedin: 'linkedin.com/in/harshchaudhary', github: 'github.com/harshc',
    about: 'Passionate full-stack developer with a knack for building scalable web apps. Active open-source contributor.',
    semester: 5,
  },
  {
    id: 2, name: 'Priya Sharma',       roll: '2CS18', branch: 'CSE', year: '2nd Year',
    domain: 'AI & Machine Learning',   skills: ['Python', 'TensorFlow', 'Keras'],
    spi: 78, cgpa: 7.6, status: 'Open to Team Up', initials: 'PS', isTeammate: false,
    email: 'priya.sharma@college.edu',  phone: '+91 87654 32109',
    city: 'Surat',   achievements: ['Google ML Bootcamp Graduate'],
    projects: ['Crop Disease Detection', 'Sentiment Analyser'],
    certifications: ['DeepLearning.AI Specialization'],
    linkedin: 'linkedin.com/in/priyasharma', github: 'github.com/priyaml',
    about: 'ML enthusiast working on real-world computer vision and NLP projects.',
    semester: 3,
  },
  {
    id: 3, name: 'Rohan Gupta',        roll: '3CS29', branch: 'CSE', year: '3rd Year',
    domain: 'Data Science',            skills: ['Python', 'Pandas', 'Tableau'],
    spi: 74, cgpa: 7.2, status: 'In a Team', initials: 'RG', isTeammate: false,
    email: 'rohan.gupta@college.edu',  phone: '+91 76543 21098',
    city: 'Vadodara', achievements: ['Kaggle Expert'],
    projects: ['Stock Price Predictor', 'HR Analytics Dashboard'],
    certifications: ['IBM Data Science', 'Tableau Desktop Specialist'],
    linkedin: 'linkedin.com/in/rohangupta', github: 'github.com/rohands',
    about: 'Data enthusiast turning raw numbers into actionable insights.',
    semester: 5,
  },
  {
    id: 4, name: 'Ananya Verma',       roll: '2CS07', branch: 'IT', year: '2nd Year',
    domain: 'UI/UX Design',            skills: ['Figma', 'Adobe XD', 'Prototyping'],
    spi: 76, cgpa: 7.4, status: 'Open to Team Up', initials: 'AV', isTeammate: true,
    email: 'ananya.verma@college.edu', phone: '+91 65432 10987',
    city: 'Rajkot',  achievements: ['UX Design Hackathon 1st Place'],
    projects: ['HealthCare App UI', 'E-Learning Portal Redesign'],
    certifications: ['Google UX Design Certificate'],
    linkedin: 'linkedin.com/in/ananyaverma', github: 'github.com/ananyaux',
    about: 'User-centered designer focused on accessible and beautiful digital interfaces.',
    semester: 3,
  },
  {
    id: 5, name: 'Krish Singhal',      roll: '2CS22', branch: 'IT', year: '2nd Year',
    domain: 'Web Development',         skills: ['Vue.js', 'Firebase', 'TailwindCSS'],
    spi: 72, cgpa: 7.0, status: 'Open to Team Up', initials: 'KS', isTeammate: false,
    email: 'krish.singhal@college.edu',phone: '+91 54321 09876',
    city: 'Gandhinagar', achievements: ['Hackathon Participant x3'],
    projects: ['Notes App', 'Realtime Chat'],
    certifications: ['Firebase Essentials'],
    linkedin: 'linkedin.com/in/krishsinghal', github: 'github.com/krishdev',
    about: 'Frontend developer who loves crafting fast, responsive interfaces.',
    semester: 3,
  },
  {
    id: 6, name: 'Siddharth Rao',      roll: '4CS08', branch: 'CSE', year: '4th Year',
    domain: 'Competitive Programming', skills: ['C++', 'Algorithms', 'Data Structures'],
    spi: 88, cgpa: 8.6, status: 'Open to Team Up', initials: 'SR', isTeammate: false,
    email: 'siddharth.rao@college.edu',phone: '+91 43210 98765',
    city: 'Ahmedabad', achievements: ['ICPC Regionalist', 'Codeforces Master (2200+)'],
    projects: ['CP Judge Platform', 'Interview Prep Tool'],
    certifications: ['Google Kickstart Champion'],
    linkedin: 'linkedin.com/in/siddharthrao', github: 'github.com/sidcp',
    about: 'Competitive programmer and problem-solver aiming for top tech roles.',
    semester: 7,
  },
  {
    id: 7, name: 'Neha Joshi',         roll: '2CS33', branch: 'ECE', year: '2nd Year',
    domain: 'AI & Machine Learning',   skills: ['NLP', 'Python', 'Scikit-learn'],
    spi: 79, cgpa: 7.7, status: 'Open to Team Up', initials: 'NJ', isTeammate: true,
    email: 'neha.joshi@college.edu',   phone: '+91 32109 87654',
    city: 'Surat',    achievements: ['Research Paper Published - NLP'],
    projects: ['Fake News Detector', 'Resume Parser'],
    certifications: ['HuggingFace NLP Course'],
    linkedin: 'linkedin.com/in/nehajoshi', github: 'github.com/nehanl',
    about: 'NLP researcher passionate about making AI understand human language better.',
    semester: 3,
  },
  {
    id: 8, name: 'Aditya Kumar',       roll: '3CS41', branch: 'ECE', year: '3rd Year',
    domain: 'IoT & Embedded Systems',  skills: ['Arduino', 'Raspberry Pi', 'C'],
    spi: 71, cgpa: 6.9, status: 'In a Team', initials: 'AK', isTeammate: false,
    email: 'aditya.kumar@college.edu', phone: '+91 21098 76543',
    city: 'Vadodara', achievements: ['Best IoT Project - Tech Fest 2025'],
    projects: ['Smart Irrigation System', 'Home Automation Hub'],
    certifications: ['Cisco IoT Fundamentals'],
    linkedin: 'linkedin.com/in/adityakumar', github: 'github.com/adityaiot',
    about: 'Hardware hacker building smart systems that connect the physical and digital world.',
    semester: 5,
  },
  {
    id: 9, name: 'Divya Patel',        roll: '2CS14', branch: 'IT', year: '2nd Year',
    domain: 'Data Science',            skills: ['R', 'Python', 'Power BI'],
    spi: 75, cgpa: 7.3, status: 'Open to Team Up', initials: 'DP', isTeammate: false,
    email: 'divya.patel@college.edu',  phone: '+91 10987 65432',
    city: 'Rajkot',   achievements: ['Data Visualisation Contest Winner'],
    projects: ['COVID Dashboard', 'Sales Forecasting Model'],
    certifications: ['Microsoft Power BI Analyst'],
    linkedin: 'linkedin.com/in/divyapatel', github: 'github.com/divyads',
    about: 'Aspiring data scientist creating compelling visual narratives from complex datasets.',
    semester: 3,
  },
  {
    id: 10, name: 'Aryan Mehta',       roll: '3CS05', branch: 'CSE', year: '3rd Year',
    domain: 'Web Development',         skills: ['Next.js', 'TypeScript', 'AWS'],
    spi: 83, cgpa: 8.1, status: 'Open to Team Up', initials: 'AM', isTeammate: false,
    email: 'aryan.mehta@college.edu',  phone: '+91 09876 54321',
    city: 'Gandhinagar', achievements: ['AWS Hackathon Top 10', 'GSoC Contributor'],
    projects: ['Cloud File Manager', 'SaaS Boilerplate'],
    certifications: ['AWS Solutions Architect', 'Next.js + TypeScript Course'],
    linkedin: 'linkedin.com/in/aryanmehta', github: 'github.com/aryanweb',
    about: 'Cloud-native developer building production-grade web applications with a focus on performance.',
    semester: 5,
  },
  {
    id: 11, name: 'Sneha Singh',       roll: '2CS27', branch: 'Mechanical', year: '2nd Year',
    domain: 'Research & Academia',     skills: ['LaTeX', 'MATLAB', 'Research Writing'],
    spi: 77, cgpa: 7.5, status: 'Open to Team Up', initials: 'SS', isTeammate: false,
    email: 'sneha.singh@college.edu',  phone: '+91 98761 23450',
    city: 'Ahmedabad', achievements: ['Best Paper Award - NCET 2025'],
    projects: ['Vibration Analysis Tool', 'FEM Simulation'],
    certifications: ['MATLAB Onramp', 'Academic Writing Coursera'],
    linkedin: 'linkedin.com/in/snehasingh', github: 'github.com/snehar',
    about: 'Research-oriented student with a passion for simulation and academic publishing.',
    semester: 3,
  },
  {
    id: 12, name: 'Rahul Tiwari',      roll: '4CS15', branch: 'CSE', year: '4th Year',
    domain: 'Competitive Programming', skills: ['Java', 'DP', 'Graph Theory'],
    spi: 86, cgpa: 8.4, status: 'In a Team', initials: 'RT', isTeammate: false,
    email: 'rahul.tiwari@college.edu', phone: '+91 87650 34521',
    city: 'Surat',    achievements: ['LeetCode Guardian', 'ICPC Asia Regionalist'],
    projects: ['Online Judge', 'Algorithm Visualizer'],
    certifications: ['JavaSE 17 Developer', 'MIT OCW Algorithms'],
    linkedin: 'linkedin.com/in/rahultiwari', github: 'github.com/rahulcp',
    about: 'Algorithm expert and Java developer with a strong foundation in CS theory.',
    semester: 7,
  },
  {
    id: 13, name: 'Meera Nair',        roll: '1CS09', branch: 'Civil', year: '1st Year',
    domain: 'UI/UX Design',            skills: ['Canva', 'Figma (beginner)', 'HTML'],
    spi: 70, cgpa: 6.8, status: 'Open to Team Up', initials: 'MN', isTeammate: false,
    email: 'meera.nair@college.edu',   phone: '+91 76541 23890',
    city: 'Vadodara', achievements: ['Poster Design Contest 1st Place'],
    projects: ['Personal Portfolio', 'NGO Website Prototype'],
    certifications: ['Canva for Education'],
    linkedin: 'linkedin.com/in/meeranair', github: 'github.com/meeraui',
    about: 'First-year student exploring the intersection of design and technology.',
    semester: 1,
  },
]

// ─── DOMAIN COLOR MAP ───────────────────────────────────────────
const domainColorMap = {
  'Web Development':          { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500',   accent: '#1A56DB' },
  'AI & Machine Learning':    { bg: 'bg-teal-100',   text: 'text-teal-700',   dot: 'bg-teal-500',   accent: '#0D9488' },
  'Data Science':             { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500', accent: '#7C3AED' },
  'IoT & Embedded Systems':   { bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500',  accent: '#D97706' },
  'UI/UX Design':             { bg: 'bg-rose-100',   text: 'text-rose-700',   dot: 'bg-rose-500',   accent: '#E11D48' },
  'Competitive Programming':  { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500',  accent: '#16A34A' },
  'Research & Academia':      { bg: 'bg-slate-100',  text: 'text-slate-700',  dot: 'bg-slate-500',  accent: '#475569' },
}

function getColorSet(domain) {
  return domainColorMap[domain] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400', accent: '#6B7280' }
}

// ─── SPI ARC ─────────────────────────────────────────────────────
function SPIArc({ score, size = 64 }) {
  const r = size * 0.39
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth="5" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1A56DB" strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-navy" style={{ fontSize: size * 0.22 }}>{score}</span>
      </div>
    </div>
  )
}

// ─── SELECT COMPONENT ────────────────────────────────────────────
function FilterSelect({ icon: Icon, label, value, options, onChange, disabled }) {
  return (
    <div className={`relative flex-1 min-w-[160px] ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        <span className="flex items-center gap-1"><Icon size={11} /> {label}</span>
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none pl-3 pr-8 py-2.5 text-sm font-medium text-navy bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition cursor-pointer"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

// ─── STUDENT DETAIL MODAL ────────────────────────────────────────
function StudentDetailModal({ student, onClose, onInvite }) {
  const c = getColorSet(student.domain)
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in">

        {/* Header Banner */}
        <div className="relative h-28 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c.accent}dd, ${c.accent}99)` }}>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition z-10">
            <X size={16} />
          </button>
          {/* Initials Avatar */}
          <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg ring-4 ring-white z-10"
            style={{ background: c.accent }}>
            {student.initials}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-12 pb-6 space-y-5">

          {/* Name Row */}
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-2xl font-bold text-navy">{student.name}</h2>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-sm text-gray-500"><Hash size={13} /> {student.roll}</span>
                <span className="flex items-center gap-1 text-sm text-gray-500"><GitBranch size={13} /> {student.branch}</span>
                <span className="flex items-center gap-1 text-sm text-gray-500"><CalendarDays size={13} /> {student.year}</span>
                <span className="flex items-center gap-1 text-sm text-gray-500"><MapPin size={13} /> {student.city}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SPIArc score={student.spi} size={56} />
              <div>
                <p className="text-xs text-gray-500 font-semibold">SPI Score</p>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">CGPA: <span className="text-navy font-bold">{student.cgpa}</span></p>
              </div>
            </div>
          </div>

          {/* Status + Domain + Semester */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 ${c.bg} ${c.text}`}>
              <Layers size={12} /> {student.domain}
            </span>
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 ${student.status === 'Open to Team Up' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
              {student.status === 'Open to Team Up' ? <CheckCircle size={12} /> : <Users size={12} />}
              {student.status}
            </span>
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1.5">
              <GraduationCap size={12} /> Semester {student.semester}
            </span>
          </div>

          {/* About */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User size={12} /> About
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">{student.about}</p>
          </div>

          {/* Skills + Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Zap size={12} /> Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((sk, i) => (
                  <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${c.bg} ${c.text}`}>{sk}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award size={12} /> Certifications
              </p>
              <div className="space-y-1.5">
                {student.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase size={12} /> Projects
            </p>
            <div className="flex flex-wrap gap-2">
              {student.projects.map((p, i) => (
                <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl shadow-sm flex items-center gap-1.5">
                  <ExternalLink size={11} className="text-gray-400" /> {p}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Trophy size={12} /> Achievements
            </p>
            <div className="space-y-1.5">
              {student.achievements.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                  <Star size={12} className="text-amber-500 flex-shrink-0" /> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail size={12} /> Contact Info
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a href={`mailto:${student.email}`} className="flex items-center gap-2 text-xs text-blue-700 hover:underline">
                <Mail size={13} /> {student.email}
              </a>
              <span className="flex items-center gap-2 text-xs text-gray-600">
                <Phone size={13} /> {student.phone}
              </span>
              <a href={`https://${student.linkedin}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-xs text-blue-700 hover:underline">
                <ExternalLink size={13} /> {student.linkedin}
              </a>
              <a href={`https://${student.github}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-xs text-blue-700 hover:underline">
                <ExternalLink size={13} /> {student.github}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 flex gap-3 flex-shrink-0">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-100 transition">
            Close
          </button>
          {student.status === 'Open to Team Up' && !student.isTeammate && (
            <button onClick={() => onInvite(student)}
              className="flex-1 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-2">
              <Plus size={15} /> Invite to Team
            </button>
          )}
          {student.isTeammate && (
            <span className="flex-1 py-2.5 bg-green-50 text-green-600 font-semibold text-sm rounded-xl border border-green-200 flex items-center justify-center gap-2">
              <CheckCircle size={15} /> Already Teammate
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── INVITE MODAL ────────────────────────────────────────────────
function InviteModal({ student, onClose, onSend }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="font-bold text-lg text-navy flex items-center gap-2"><Plus size={18} /> Invite to Your Team</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm font-semibold flex items-center gap-2 border border-blue-100">
            <Users size={16} /> Inviting: {student?.name}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Project / Hackathon Name</label>
            <input type="text" placeholder="e.g. Smart India Hackathon 2026"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Your Role</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                {['Team Lead','Developer','Designer','ML Engineer','Data Analyst','Other'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Team Size</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                {['2 members','3 members','4 members','5 members','6 members'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Message</label>
            <textarea rows={3} placeholder="Tell them why you want them on your team..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none" />
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-5 py-2 border border-gray-300 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-100 transition">Cancel</button>
          <button onClick={onSend} className="px-5 py-2 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition shadow-sm">Send Invite</button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────
export default function DomainDirectoryPage() {
  const router = useRouter()
  const [activeNav]     = useState('directory')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // ── Filter State ────────────────────────────────
  const [filterBranch, setFilterBranch] = useState('All Branches')
  const [filterYear,   setFilterYear]   = useState('All Years')
  const [nameInput,    setNameInput]    = useState('')
  const [activeSearch, setActiveSearch] = useState({ branch: 'All Branches', year: 'All Years', name: '' })
  const [hasSearched,  setHasSearched]  = useState(false)

  // ── Modal State ──────────────────────────────────
  const [detailStudent, setDetailStudent] = useState(null)
  const [inviteStudent, setInviteStudent] = useState(null)
  const [showToast,     setShowToast]     = useState(false)
  const [toastMsg,      setToastMsg]      = useState('')

  // ── Filtered Results ─────────────────────────────
  const results = useMemo(() => {
    if (!hasSearched) return []
    return students.filter(s => {
      const bOk = activeSearch.branch === 'All Branches' || s.branch === activeSearch.branch
      const yOk = activeSearch.year   === 'All Years'    || s.year   === activeSearch.year
      const nOk = !activeSearch.name  || s.name.toLowerCase().includes(activeSearch.name.toLowerCase())
      return bOk && yOk && nOk
    })
  }, [hasSearched, activeSearch])

  const handleSearch = () => {
    setActiveSearch({ branch: filterBranch, year: filterYear, name: nameInput })
    setHasSearched(true)
  }

  const handleReset = () => {
    setFilterBranch('All Branches')
    setFilterYear('All Years')
    setNameInput('')
    setActiveSearch({ branch: 'All Branches', year: 'All Years', name: '' })
    setHasSearched(false)
  }

  const handleSendInvite = () => {
    const name = inviteStudent?.name
    setInviteStudent(null)
    setDetailStudent(null)
    setToastMsg(`Invite sent to ${name} successfully!`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="flex h-screen bg-bg-base overflow-hidden font-sans relative">

      {/* ══ SIDEBAR ══ */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} flex-shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-sm z-20`}>
        <div className="p-5 border-b border-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1A56DB, #5B21B6)' }}>AS</div>
            <div className="overflow-hidden">
              <p className="font-semibold text-sm text-navy truncate">Arman Singh</p>
              <p className="text-xs text-gray-500 truncate">CSE — 2nd Year, Section B</p>
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => router.push('/dashboard/student/spi')}>
            <SPIArc score={72} size={56} />
            <div>
              <p className="text-xs font-semibold text-navy group-hover:text-blue-600 transition">SPI Score</p>
              <p className="text-xs text-green-600 flex items-center gap-0.5 mt-0.5"><ArrowUpRight size={11} /> +3 this month</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => router.push(link.path)}
              className={`nav-link w-full text-left mb-0.5 ${activeNav === link.id ? 'active' : ''}`}>
              <link.icon size={17} />
              <span className="flex-1">{link.label}</span>
              {link.badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{link.badge}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP NAV */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 flex-shrink-0 shadow-sm z-10">
          <button onClick={() => setSidebarOpen(v => !v)} className="text-gray-400 hover:text-gray-700 transition">
            <Grid size={20} />
          </button>
          <div className="flex items-center gap-2 mr-4">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs" style={{ background: '#1A56DB' }}>EA</div>
            <span className="font-bold text-navy text-sm hidden sm:block">Educator Analytics OS</span>
          </div>
          <div className="flex-1" />
          <button onClick={() => router.push('/dashboard/student/notifications')} className="relative p-2 rounded-lg hover:bg-gray-100 transition text-gray-500">
            <Bell size={19} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
              style={{ background: 'linear-gradient(135deg, #1A56DB, #5B21B6)' }}>AS</div>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition" />
          </div>
        </header>

        {/* PAGE BODY */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
          <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">

            {/* ── PAGE HEADER ── */}
            <div>
              <h1 className="text-3xl font-bold text-navy mb-1 flex items-center gap-2">
                <UserSearch size={28} className="text-blue-600" />
                Student Directory
              </h1>
              <p className="text-gray-500 text-sm">Search students by branch, year and name — click any card for full details</p>
            </div>

            {/* ── ADVANCED FILTER PANEL ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={16} className="text-blue-600" />
                <span className="font-bold text-navy text-sm">Advanced Filters</span>
                <span className="ml-auto text-xs text-gray-400 hidden sm:block">Fill in order — Branch first, then Year, then Name</span>
              </div>

              {/* Steps Progress */}
              <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 transition-all ${filterBranch !== 'All Branches' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                  <GitBranch size={12} /> 1. Branch
                  {filterBranch !== 'All Branches' && <CheckCircle size={12} />}
                </div>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 transition-all ${filterYear !== 'All Years' ? 'bg-blue-600 text-white' : filterBranch !== 'All Branches' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-gray-100 text-gray-400'}`}>
                  <CalendarDays size={12} /> 2. Year
                  {filterYear !== 'All Years' && <CheckCircle size={12} />}
                </div>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 transition-all ${nameInput ? 'bg-blue-600 text-white' : filterYear !== 'All Years' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-gray-100 text-gray-400'}`}>
                  <Search size={12} /> 3. Name
                  {nameInput && <CheckCircle size={12} />}
                </div>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 bg-gray-100 text-gray-400">
                  <Target size={12} /> 4. Search
                </div>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-end gap-4">
                <FilterSelect
                  icon={GitBranch}
                  label="Branch"
                  value={filterBranch}
                  options={BRANCHES}
                  onChange={v => { setFilterBranch(v); setFilterYear('All Years'); setNameInput('') }}
                />
                <FilterSelect
                  icon={CalendarDays}
                  label="Year"
                  value={filterYear}
                  options={YEARS}
                  onChange={v => { setFilterYear(v); setNameInput('') }}
                  disabled={filterBranch === 'All Branches'}
                />
                <div className={`flex-1 min-w-[180px] ${filterYear === 'All Years' ? 'opacity-50 pointer-events-none' : ''}`}>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    <span className="flex items-center gap-1"><UserSearch size={11} /> Student Name</span>
                  </label>
                  <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                      placeholder="Type student name…"
                      className="w-full pl-9 pr-4 py-2.5 text-sm font-medium text-navy bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={handleSearch}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition shadow-sm">
                    <Search size={15} /> Search
                  </button>
                  {hasSearched && (
                    <button onClick={handleReset}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-100 transition">
                      <X size={15} /> Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── EMPTY STATE ── */}
            {!hasSearched && (
              <div className="text-center py-24 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Filter size={32} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">Use the filters above to find students</p>
                  <p className="text-gray-400 text-sm mt-1">Select a Branch to get started</p>
                </div>
              </div>
            )}

            {hasSearched && results.length === 0 && (
              <div className="text-center py-24 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <UserSearch size={32} className="text-gray-400" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">No students found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your filter criteria</p>
                </div>
              </div>
            )}

            {/* ── RESULTS GRID ── */}
            {hasSearched && results.length > 0 && (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-navy">{results.length} student{results.length !== 1 ? 's' : ''} found</span>
                  {activeSearch.branch !== 'All Branches' && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 flex items-center gap-1">
                      <GitBranch size={10} /> {activeSearch.branch}
                    </span>
                  )}
                  {activeSearch.year !== 'All Years' && (
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100 flex items-center gap-1">
                      <CalendarDays size={10} /> {activeSearch.year}
                    </span>
                  )}
                  {activeSearch.name && (
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
                      <UserSearch size={10} /> &quot;{activeSearch.name}&quot;
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {results.map(student => {
                    const c = getColorSet(student.domain)
                    return (
                      <div key={student.id}
                        onClick={() => setDetailStudent(student)}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer group">
                        <div className={`h-1 w-full ${c.dot}`} />
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${c.bg} ${c.text} group-hover:scale-105 transition-transform`}>
                              {student.initials}
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${student.status === 'Open to Team Up' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                              {student.status === 'Open to Team Up' ? <CheckCircle size={10} /> : <Users size={10} />}
                              {student.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-navy text-base leading-tight group-hover:text-blue-700 transition">{student.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5 mb-3 flex-wrap">
                            <span className="text-[11px] text-gray-400 flex items-center gap-0.5"><Hash size={10} />{student.roll}</span>
                            <span className="text-[11px] text-gray-400 flex items-center gap-0.5"><GitBranch size={10} />{student.branch}</span>
                            <span className="text-[11px] text-gray-400 flex items-center gap-0.5"><CalendarDays size={10} />{student.year}</span>
                          </div>

                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${c.bg} ${c.text} self-start mb-3`}>
                            <Layers size={11} /> {student.domain}
                          </span>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {student.skills.map((sk, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-semibold">{sk}</span>
                            ))}
                          </div>

                          <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-100 flex items-center gap-1">
                              <Target size={11} /> SPI: {student.spi}
                            </span>
                            <span className="text-xs text-gray-400 font-medium flex items-center gap-0.5 group-hover:text-blue-600 transition">
                              View Details <ChevronRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

          </div>
        </main>
      </div>

      {/* ══ STUDENT DETAIL MODAL ══ */}
      {detailStudent && (
        <StudentDetailModal
          student={detailStudent}
          onClose={() => setDetailStudent(null)}
          onInvite={s => setInviteStudent(s)}
        />
      )}

      {/* ══ INVITE MODAL ══ */}
      {inviteStudent && (
        <InviteModal
          student={inviteStudent}
          onClose={() => setInviteStudent(null)}
          onSend={handleSendInvite}
        />
      )}

      {/* ══ TOAST ══ */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in z-50">
          <CheckCircle size={20} />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </div>
      )}
    </div>
  )
}
