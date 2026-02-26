import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-enter min-h-[60vh] flex flex-col items-center justify-center text-center px-4 relative">
      {/* Decorative blob */}
      <div className="blob w-64 h-64 bg-indigo-600/15 top-[10%] left-[30%]" />

      <h1 className="text-8xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-glow text-gradient-shift float">
        404
      </h1>
      <p className="mt-4 text-xl font-semibold text-white slide-up delay-100">Page Not Found</p>
      <p className="mt-2 text-slate-500 slide-up delay-200">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-glow ripple mt-8 px-8 py-3.5 text-white font-semibold rounded-xl slide-up delay-300">
        Back to Home
      </Link>
    </div>
  );
}
