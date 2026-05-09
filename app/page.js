'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowRight, BarChart2, Bell, Users, ShieldCheck,
  TrendingUp, BookOpen, Activity, Brain,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Student Intelligence Engine',
    desc: 'Surfaces academic blind spots, risk signals, and growth vectors for every student — updated daily.',
  },
  {
    icon: BarChart2,
    title: 'CO/PO Attainment Tracking',
    desc: 'Live attainment percentages per subject, section, and programme. NBA-ready export in one click.',
  },
  {
    icon: Bell,
    title: 'Early Warning System',
    desc: 'Flags at-risk students 6–8 weeks before exams using attendance, submission, and grade velocity signals.',
  },
  {
    icon: Activity,
    title: 'Faculty Performance Analytics',
    desc: 'Outcome-based faculty insights — not opinion ratings. CO-wise results tied to teaching impact.',
  },
  {
    icon: BookOpen,
    title: 'Curriculum Health Monitor',
    desc: 'Tracks which subjects are underperforming and where syllabus time allocation mismatches outcomes.',
  },
  {
    icon: TrendingUp,
    title: 'Placement Readiness Index',
    desc: 'Projects each student\'s placement trajectory from Year 1. Intervention window starts 12 months early.',
  },
]

const stats = [
  { value: '480', label: 'Students Tracked', icon: Users },
  { value: '98%', label: 'Alert Accuracy', icon: ShieldCheck },
  { value: '6 wks', label: 'Early Warning Lead', icon: Bell },
]

const roles = [
  { label: 'Dean', color: '#5B21B6', bg: '#F5F3FF', border: '#DDD6FE', path: '/dashboard/dean' },
  { label: 'Faculty', color: '#0F766E', bg: '#F0FDFA', border: '#99F6E4', path: '/dashboard/faculty' },
  { label: 'Student', color: '#1A56DB', bg: '#EFF6FF', border: '#BFDBFE', path: '/dashboard/student' },
  { label: 'Parent', color: '#B45309', bg: '#FFFBEB', border: '#FDE68A', path: '/dashboard/parent' },
]

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-[#0D1B2A]">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-[12px]"
              style={{ background: '#5B21B6' }}>EA</div>
            <span className="font-bold text-[15px] text-[#0D1B2A] tracking-tight">Educator Analytics OS</span>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: '#5B21B6' }}
          >
            Sign In <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-[11.5px] font-semibold mb-6"
            style={{ background: '#EDE9FE', color: '#5B21B6' }}>
            Built for Indian Engineering Colleges
          </span>
          <h1 className="text-[42px] sm:text-[52px] font-extrabold leading-[1.1] tracking-tight text-[#0D1B2A] mb-5">
            The operating system<br />
            for your <span style={{ color: '#5B21B6' }}>department.</span>
          </h1>
          <p className="text-[16px] text-gray-500 leading-relaxed max-w-xl mb-8">
            One platform for Deans, Faculty, Students and Parents. Live academic data, predictive alerts, and CO/PO attainment — without the spreadsheets.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/login')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-[14px] transition-all hover:opacity-90 shadow-sm"
              style={{ background: '#5B21B6' }}
            >
              Get Started <ArrowRight size={15} />
            </button>
            <span className="text-[13px] text-gray-400">No setup required · CSE Department ready</span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-3 divide-x divide-gray-100">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-4 px-8 first:pl-0 last:pr-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#EDE9FE' }}>
                <s.icon size={18} color="#5B21B6" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[22px] font-bold text-[#0D1B2A] tabular-nums leading-tight">{s.value}</p>
                <p className="text-[12px] text-gray-400 font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-[26px] font-bold text-[#0D1B2A] tracking-tight">Everything the department needs</h2>
          <p className="text-[14px] text-gray-500 mt-1.5">Designed for Deans, built around data that already exists in your institution.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                style={{ background: '#F5F3FF' }}>
                <f.icon size={17} color="#5B21B6" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-[14px] text-[#0D1B2A] mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role cards */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h2 className="text-[26px] font-bold text-[#0D1B2A] tracking-tight">One platform, every role</h2>
            <p className="text-[14px] text-gray-500 mt-1.5">Each portal is purpose-built for how that role actually works.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {roles.map((r, i) => (
              <button key={i} onClick={() => router.push(r.path)}
                className="text-left p-5 rounded-2xl border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-1 group"
                style={{ background: r.bg, borderColor: r.border }}>
                <p className="font-bold text-[15px] mb-1" style={{ color: r.color }}>{r.label}</p>
                <p className="text-[12px] text-gray-500 leading-snug">Open {r.label} portal</p>
                <ArrowRight size={14} className="mt-3 transition-transform group-hover:translate-x-1" style={{ color: r.color }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-2xl p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ background: '#F5F3FF', border: '1px solid #DDD6FE' }}>
          <div>
            <h3 className="text-[20px] font-bold text-[#0D1B2A] tracking-tight">Ready to see your department clearly?</h3>
            <p className="text-[13.5px] text-gray-500 mt-1">Sign in and the dashboard is live in under 60 seconds.</p>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-[14px] transition-all hover:opacity-90 shadow-sm flex-shrink-0"
            style={{ background: '#5B21B6' }}
          >
            Go to Dashboard <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-[10px]"
              style={{ background: '#5B21B6' }}>EA</div>
            <span className="text-[12.5px] font-semibold text-gray-500">Educator Analytics OS</span>
          </div>
          <p className="text-[12px] text-gray-400">Built for engineering colleges across India. © 2026</p>
        </div>
      </footer>

    </div>
  )
}
