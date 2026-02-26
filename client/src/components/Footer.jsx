import { HiOutlineAcademicCap } from 'react-icons/hi2';

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-indigo-500/40 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-spring">
              <HiOutlineAcademicCap className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors duration-300 group-hover:scale-110" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-indigo-400 transition-all duration-500 group-hover:tracking-wider">ScholarHub</span>
          </div>
          <p className="text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300 cursor-default">
            &copy; {new Date().getFullYear()} ScholarHub. Built with MERN Stack.
          </p>
        </div>
      </div>
    </footer>
  );
}
