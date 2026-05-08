'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  User, BookOpen, Building2, Heart, Settings,
  Eye, EyeOff, ChevronRight, Lock, Mail, Sparkles
} from 'lucide-react'

const roles = [
  {
    id: 'student',
    label: 'Student',
    sub: 'Access your grades and insights',
    icon: User,
    color: '#1A56DB',
    border: 'border-blue-500',
    bg: 'hover:bg-blue-50',
    path: '/dashboard/student',
  },
  {
    id: 'faculty',
    label: 'Faculty',
    sub: 'Manage classes and analytics',
    icon: BookOpen,
    color: '#0F766E',
    border: 'border-teal-600',
    bg: 'hover:bg-teal-50',
    path: '/dashboard/faculty',
  },
  {
    id: 'dean',
    label: 'Dean',
    sub: 'Institutional oversight',
    icon: Building2,
    color: '#5B21B6',
    border: 'border-purple-700',
    bg: 'hover:bg-purple-50',
    path: '/dashboard/dean',
  },
  {
    id: 'parent',
    label: 'Parent',
    sub: 'Track ward progress',
    icon: Heart,
    color: '#D97706',
    border: 'border-amber-500',
    bg: 'hover:bg-amber-50',
    path: '/dashboard/parent',
  },
  {
    id: 'admin',
    label: 'Admin',
    sub: 'System configuration',
    icon: Settings,
    color: '#6B7280',
    border: 'border-gray-400',
    bg: 'hover:bg-gray-50',
    path: '/dashboard/admin',
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hoveredRole, setHoveredRole] = useState(null)

  return (
    <div className="min-h-screen flex items-center justify-center font-sans p-4 relative overflow-hidden" 
      style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)' }}>
      
      {/* Background Decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]" style={{ background: '#1A56DB' }}></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px]" style={{ background: '#0F766E' }}></div>

      <div className="w-full max-w-[580px] bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] px-10 py-12 animate-fade-in relative overflow-hidden border border-gray-100">
        {/* Top decorative bar */}
        <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'linear-gradient(90deg, #1A56DB, #1447C0)' }}></div>

        {/* Header section */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20"
                style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #1447C0 100%)' }}
              >
                EA
              </div>
              <span className="font-extrabold text-2xl tracking-tight" style={{ color: '#0f2744' }}>Educator OS</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#0f2744' }}>Welcome back</h1>
            <p className="text-gray-500 font-medium">Sign in to your intelligent academic dashboard</p>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span
              className="text-xs font-bold px-4 py-1.5 rounded-full shadow-sm border border-blue-100 flex items-center gap-2"
              style={{ background: '#EFF6FF', color: '#1A56DB' }}
            >
              <Sparkles size={12} />
              2026–27 Session
            </span>
          </div>
        </div>

        <div className="w-full space-y-6">
          {/* Email Input Group */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Mail size={18} />
              </div>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@college.edu.in"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Password Input Group */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Forgot password?</button>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                id="password-input"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-sm"
              />
              <button
                id="toggle-password"
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            id="sign-in-btn"
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #1447C0 100%)' }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
          >
            Sign In to Dashboard
            <ChevronRight size={20} />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-100" />
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">
              Instant Access
            </p>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Role Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map(role => (
              <button
                key={role.id}
                id={`role-btn-${role.id}`}
                onClick={() => router.push(role.path)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className={`role-btn border-2 text-left p-4 rounded-[20px] transition-all duration-200 relative group overflow-hidden ${role.border} ${role.bg} bg-white`}
                style={{
                  transform: hoveredRole === role.id ? 'translateY(-4px)' : 'none',
                  boxShadow: hoveredRole === role.id ? '0 12px 24px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                    <role.icon size={20} color={role.color} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#0f2744' }}>{role.label}</p>
                    <p className="text-[10px] text-gray-500 font-medium line-clamp-1">{role.sub}</p>
                  </div>
                </div>
                {/* Subtle hover effect */}
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={14} color={role.color} />
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-10 font-medium">
            © 2026 Educator Analytics OS · CSE Department · <span className="text-blue-600/60">AICTE Certified Platform</span>
          </p>
        </div>
      </div>
    </div>
  )
}
