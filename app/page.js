'use client'

import { Zap, BarChart3, Bell, ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      desc: 'Multi-agent AI that analyzes every student across 7 dimensions of intelligence.',
    },
    {
      icon: BarChart3,
      title: 'Student Potential Index',
      desc: 'One score that captures academic, project, skill and extracurricular performance.',
    },
    {
      icon: Bell,
      title: 'Real-Time Alerts',
      desc: 'Early warning system flags at-risk students weeks before exam failure.',
    },
  ]

  const stats = [
    { value: '12K+', label: 'Students Evaluated', icon: Users },
    { value: '340+', label: 'Active Faculty', icon: ShieldCheck },
    { value: '98%', label: 'Prediction Accuracy', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen font-sans text-white overflow-hidden" style={{ background: 'linear-gradient(160deg, #0D1B2A 0%, #0f2744 100%)' }}>
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-8 sm:px-16 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(37,99,235,0.5)]" style={{ background: '#1A56DB' }}>
            EA
          </div>
          <span className="font-bold text-xl tracking-tight">Educator Analytics OS</span>
        </div>
        {/* Sign In button temporarily removed */}
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 sm:px-16 py-8 lg:py-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-2" style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60A5FA' }}>
            The Future of Education
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-white">
            Every student is <br />
            <span style={{ color: '#60A5FA' }}>
              more than their marks.
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Empower your institution with an AI-driven operating system designed to uncover true potential, predict academic outcomes, and personalize student success journeys.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 rounded-xl text-white font-bold transition-all flex items-center gap-2 hover:scale-105"
              style={{ background: 'linear-gradient(90deg, #1A56DB, #3B82F6)', boxShadow: '0 0 30px rgba(37,99,235,0.3)' }}
            >
              Get Started Now
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => router.push('/demo')}
              className="px-8 py-4 rounded-xl text-white font-bold transition-all border border-white/20 hover:bg-white/5"
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Content - Features & Stats */}
        <div className="space-y-6 relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-10 rounded-[3rem] blur-3xl -z-10" style={{ background: 'rgba(59, 130, 246, 0.1)' }}></div>
          
          {/* Features */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex gap-5 items-start backdrop-blur-md transition-all hover:translate-x-2 border border-white/5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59, 130, 246, 0.2)', boxShadow: '0 0 15px rgba(37,99,235,0.2)' }}>
                  <f.icon size={24} color="#60a5fa" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 text-center border border-white/5 backdrop-blur-md flex flex-col items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <s.icon size={20} color="#818cf8" className="mb-2 opacity-80" />
                <p className="text-white font-bold text-2xl tracking-tight">{s.value}</p>
                <p className="text-gray-500 text-xs mt-1 font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-500 text-sm border-t border-white/10 mt-10">
        <p>Built for engineering colleges across India. © 2026 Educator Analytics OS.</p>
      </footer>
    </div>
  )
}
