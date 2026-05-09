/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Home, BookOpen, Bell, BarChart2, Users, Target,
  MessageCircle, FileText, Settings, LogOut, Search, ChevronDown,
  Download, ExternalLink, Calendar
} from 'lucide-react'

const navLinks = [
  { id: 'dashboard',    label: 'Dashboard',            icon: Home,          badge: null, path: '/dashboard/faculty' },
  { id: 'classes',      label: 'My Classes',           icon: BookOpen,      badge: null, path: '/dashboard/faculty/my-classes' },
  { id: 'intelligence', label: 'Student Intelligence', icon: Grid,          badge: null, path: '/dashboard/faculty/student-intelligence' },
  { id: 'alerts',       label: 'Student Alerts',       icon: AlertCircle,   badge: '5',  path: '/dashboard/faculty/alerts' },
  { id: 'analytics',    label: 'Subject Analytics',    icon: Activity,      badge: null, path: '/dashboard/faculty/analytics' },
  { id: 'profiles',     label: 'Student Profiles',     icon: Users,         badge: null, path: '/dashboard/faculty/student/profile' },
  { id: 'co',           label: 'CO Attainment',        icon: CheckCircle,   badge: null, path: '/dashboard/faculty/co-attainment' },
  { id: 'parent',       label: 'Parent Communication', icon: MessageSquare, badge: null, path: '/dashboard/faculty/parent-communication' },
  { id: 'reports',      label: 'Reports',              icon: FileText,      badge: null, path: '/dashboard/faculty/reports' },
]

const FILTER_TABS = ['All', 'NAAC/NBA', 'Intervention', 'Compliance', 'Academic']

const mockReports = [
  { id: 'rep_01', name: 'CO Attainment Summary', desc: 'Subject-wise CO1–CO3 attainment with status and overall %.', type: 'NAAC/NBA', updated: 'May 04, 2026' },
  { id: 'rep_02', name: 'At-Risk Students List', desc: 'Students flagged by attendance/score decline across subjects.', type: 'Intervention', updated: 'May 03, 2026' },
  { id: 'rep_03', name: 'Attendance Compliance', desc: 'Attendance distribution and shortage warnings by section.', type: 'Compliance', updated: 'May 02, 2026' },
]

export default function FacultyReportsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-bg-base overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} flex-shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-sm z-20`}>
        <div className="p-5 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0F766E, #047857)' }}>PK</div>
            <div className="overflow-hidden">
              <p className="font-semibold text-sm text-navy truncate">Prof. Pushpendra Kumar</p>
              <p className="text-xs text-gray-500 truncate">CSE Department · 4 Subjects</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => { if (link.external) { window.open(link.external, '_blank'); return; } if (link.path) router.push(link.path); }}
              className={`nav-link w-full text-left mb-0.5 ${link.id === 'reports' ? 'bg-teal-50 text-teal-700 font-semibold' : ''}`}>
              <link.icon size={17} />
              <span className="flex-1">{link.label}</span>
              {link.badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{link.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-50">
          <button onClick={() => router.push('/login')} className="nav-link w-full text-left text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut size={17} /><span>Switch Role</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 flex-shrink-0 shadow-sm">
          <button onClick={() => setSidebarOpen(v => !v)} className="text-gray-400 hover:text-gray-700 transition">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 mr-4">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs" style={{ background: '#0F766E' }}>EA</div>
            <span className="font-bold text-navy text-sm hidden sm:block">Educator Analytics OS</span>
          </div>
          <div className="flex-1 max-w-md relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search students, subjects, features..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition" />
          </div>
          <div className="flex-1" />
          <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500"><Bell size={19} /></button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
              style={{ background: 'linear-gradient(135deg, #0F766E, #047857)' }}>PK</div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* TITLE */}
          <div className="mb-5 animate-fade-in">
            <h1 className="text-2xl font-bold text-navy">Reports</h1>
            <p className="text-gray-500 text-sm mt-1">Generate and download audit-ready reports for accreditation and review</p>
          </div>

          {/* REPORT STATS BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <div className="card border-l-4 border-l-blue-500 animate-fade-in" style={{ animationDelay: '0.01s' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Reports Available</p>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText size={16} color="#1A56DB" />
                </div>
              </div>
              <p className="text-2xl font-bold text-navy mb-1">7</p>
            </div>
            <div className="card border-l-4 border-l-teal-500 animate-fade-in" style={{ animationDelay: '0.02s' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Reports Generated This Month</p>
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <BarChart2 size={16} color="#0F766E" />
                </div>
              </div>
              <p className="text-2xl font-bold text-navy mb-1">12</p>
            </div>
            <div className="card border-l-4 border-l-amber-500 animate-fade-in" style={{ animationDelay: '0.03s' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending Accreditation Items</p>
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <AlertTriangle size={16} color="#D97706" />
                </div>
              </div>
              <p className="text-2xl font-bold text-navy mb-1 flex items-center gap-2">
                3 <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              </p>
            </div>
            <div className="card border-l-4 border-l-purple-500 animate-fade-in" style={{ animationDelay: '0.04s' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Generated</p>
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Clock size={16} color="#7E22CE" />
                </div>
              </div>
              <p className="text-sm font-bold text-navy mt-3">Today, 10:42 AM</p>
            </div>
          </div>

          <div className="card mb-6 animate-fade-in" style={{ animationDelay: '0.08s' }}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-navy">
                <FileText size={16} className="text-teal-600" />
                <span>Quick exports</span>
              </div>
              <p className="text-xs text-gray-500 flex-1">Download pre-packaged report bundles for accreditation bodies.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={() => handleDownload('naac')}
                  className="px-4 py-2 bg-teal-600 text-white font-bold text-sm rounded-xl hover:bg-teal-700 transition shadow-sm flex items-center justify-center gap-2">
                  {downloaded['naac'] ? <><CheckCircle size={16} /> Downloaded!</> : <><Download size={16} /> Download NAAC Pack</>}
                </button>
                <button onClick={() => handleDownload('nba')}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2">
                  {downloaded['nba'] ? <><CheckCircle size={16} className="text-green-500" /> Downloaded!</> : <><Download size={16} /> Download NBA Pack</>}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockReports.map((r, idx) => (
              <div key={r.id} className="card animate-fade-in" style={{ animationDelay: `${0.12 + idx * 0.04}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{r.type}</p>
                    <h2 className="font-semibold text-navy text-sm">{r.name}</h2>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                </div>
                <p className="text-sm text-gray-700">{r.desc}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={12} className="text-gray-400" /> Updated {r.updated}</span>
                  <button className="text-xs font-bold text-teal-600 hover:text-teal-800 hover:underline flex items-center gap-1">
                    Preview <ExternalLink size={12} />
                  </button>
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition shadow-sm">
                    Configure
                  </button>
                  <button className="flex-1 px-4 py-2 bg-teal-600 text-white font-bold text-sm rounded-xl hover:bg-teal-700 transition shadow-sm flex items-center justify-center gap-2">
                    <Download size={16} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* GENERATE REPORT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <h2 className="text-xl font-bold text-navy mb-5">Generate New Report</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Report Type</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white">
                  <option>Class Progress Report</option>
                  <option>Individual Student Narrative</option>
                  <option>Assignment Submission Tracker</option>
                  <option>Parent Communication Log</option>
                  <option>CO Attainment Summary</option>
                  <option>At-Risk Students List</option>
                  <option>Pending Accreditation Items</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Subject</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white">
                  <option>Data Structures</option>
                  <option>DBMS</option>
                  <option>Operating Systems</option>
                  <option>Computer Networks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Section</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white">
                  <option>CE-A</option>
                  <option>CE-B</option>
                  <option>CE-C</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">From</label>
                  <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">To</label>
                  <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-gray-100">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-700 font-bold text-sm rounded-xl border border-gray-300 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-teal-600 text-white font-bold text-sm rounded-xl hover:bg-teal-700 transition shadow-sm">
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
