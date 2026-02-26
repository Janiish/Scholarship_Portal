import { Link } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineMagnifyingGlass, HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi2';

const features = [
  {
    icon: HiOutlineDocumentText,
    title: 'Easy Application',
    desc: 'Submit your scholarship application in minutes with our streamlined form.',
  },
  {
    icon: HiOutlineMagnifyingGlass,
    title: 'Track Status',
    desc: 'Monitor the progress of all your applications from a single dashboard.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Admin Review',
    desc: 'Administrators can efficiently review, approve, or reject applications.',
  },
];

const stats = [
  { value: '500+', label: 'Scholarships' },
  { value: '10K+', label: 'Students' },
  { value: '95%', label: 'Satisfaction' },
];

export default function Home() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated Blobs */}
        <div className="blob w-[500px] h-[500px] bg-indigo-600/30 top-[-10%] right-[-5%]" />
        <div className="blob w-[400px] h-[400px] bg-purple-600/25 bottom-[-5%] left-[-5%]" style={{ animationDelay: '2s' }} />
        <div className="blob w-[300px] h-[300px] bg-pink-500/20 top-[30%] left-[40%]" style={{ animationDelay: '4s' }} />
        <div className="blob w-[200px] h-[200px] bg-cyan-400/15 top-[10%] left-[10%]" style={{ animationDelay: '6s' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium glass mb-8 text-indigo-300 slide-down hover-scale cursor-default">
              <HiOutlineSparkles className="w-3.5 h-3.5" />
              Empowering Students Everywhere
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] slide-up">
              <span className="text-white text-glow">Your Gateway to</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-gradient-shift">
                Scholarship
              </span>
              <span className="text-white text-glow"> Success</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed slide-up delay-200">
              Apply for scholarships, track your applications in real-time, and take the next step in your academic journey — all in one place.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 slide-up delay-400">
              <Link to="/apply" className="btn-glow ripple w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-xl">
                Apply Now
              </Link>
              <Link to="/dashboard" className="btn-glass w-full sm:w-auto px-8 py-3.5 text-slate-200 font-semibold rounded-xl text-center">
                Check Status
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {stats.map(({ value, label }, i) => (
              <div key={label} className={`text-center glass-light rounded-2xl p-4 hover-lift hover-shine cursor-default slide-up`} style={{ animationDelay: `${500 + i * 120}ms` }}>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{value}</p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-glow">How It Works</h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Three simple steps to manage your scholarship journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`relative glass rounded-2xl p-8 hover-lift hover-shine hover:bg-white/10 transition-all duration-500 group cursor-default slide-up`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 text-indigo-400 mb-5 group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-indigo-500/25 group-hover:scale-110 transition-all duration-500 ease-spring">
                  <Icon className="w-6 h-6 group-hover-bounce" />
                </span>
                <span className="absolute top-6 right-6 text-5xl font-black text-white/[0.03] group-hover:text-white/[0.08] group-hover:scale-110 transition-all duration-500">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover-slide">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-tilt slide-up">
            <div className="rounded-3xl glass-strong px-8 py-16 sm:px-16 text-center relative overflow-hidden group">
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] group-hover:w-[400px] group-hover:h-[400px] group-hover:bg-purple-500/30 transition-all duration-700" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-glow">Ready to Get Started?</h2>
                <p className="text-slate-400 max-w-xl mx-auto mb-8">
                  Don't miss out on funding opportunities. Apply today and take control of your future.
                </p>
                <Link to="/apply" className="btn-glow ripple inline-block px-8 py-3.5 text-white font-semibold rounded-xl">
                  Start Your Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
