import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineAcademicCap, HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/apply', label: 'Apply' },
  { to: '/dashboard', label: 'My Status' },
  { to: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 group-hover:scale-110 transition-all duration-400 ease-spring">
              <HiOutlineAcademicCap className="w-5 h-5 text-white group-hover-bounce" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-indigo-400 transition-all duration-600">
              ScholarHub
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-400 ease-spring ${
                  pathname === to
                    ? 'bg-white/10 text-white shadow-lg shadow-indigo-500/10 border border-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06] hover-underline'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-white/10 transition text-slate-300">
            {open ? <HiOutlineXMark className="w-6 h-6" /> : <HiOutlineBars3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-1 mobile-menu-enter" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {navLinks.map(({ to, label }, i) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium slide-right transition-all duration-400 ${
                pathname === to
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06] hover:translate-x-1'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
