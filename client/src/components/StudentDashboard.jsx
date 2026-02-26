import { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineInboxStack, HiOutlineClock, HiOutlineCheckBadge, HiOutlineXCircle } from 'react-icons/hi2';

const statusConfig = {
  Pending: { badge: 'badge-pending', icon: HiOutlineClock },
  Approved: { badge: 'badge-approved', icon: HiOutlineCheckBadge },
  Rejected: { badge: 'badge-rejected', icon: HiOutlineXCircle },
};

export default function StudentDashboard() {
  const [email, setEmail] = useState('');
  const [applications, setApplications] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    setApplications(null);
    try {
      const res = await fetch(`/api/status/${encodeURIComponent(email)}`);
      if (res.status === 404) { setApplications([]); return; }
      if (!res.ok) throw new Error('Failed to fetch');
      setApplications(await res.json());
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 slide-up">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 text-indigo-400 mb-4 float pulse-glow hover:scale-125 hover:rotate-12 hover:shadow-2xl hover:shadow-indigo-500/50 hover:from-indigo-500 hover:to-purple-600 hover:border-transparent hover:text-white transition-all duration-500 cursor-pointer">
            <HiOutlineMagnifyingGlass className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-2xl font-bold text-white text-glow hover:scale-105 transition-transform duration-300 cursor-default">Track Your Applications</h1>
          <p className="text-slate-400 mt-1 hover:text-slate-300 transition-colors cursor-default">Enter your email to view all submitted applications.</p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-8 slide-up delay-200">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="Enter your email address"
            className="input-glass flex-1 px-4 py-3 rounded-xl hover-border-glow focus:scale-[1.01] transition-all"
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className="btn-glow ripple px-6 py-3 text-white font-semibold rounded-xl disabled:opacity-50 whitespace-nowrap hover:px-8 transition-all duration-300"
          >
            {loading ? 'Searching...' : 'Check Status'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl badge-rejected text-sm font-medium text-center scale-in hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 cursor-default">
            {error}
          </div>
        )}

        {/* Empty State */}
        {applications && applications.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center scale-in hover:glass-strong hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 group">
            <HiOutlineInboxStack className="w-12 h-12 text-slate-600 mx-auto mb-4 group-hover:text-slate-500 group-hover:scale-110 transition-all duration-300" />
            <p className="text-slate-300 font-medium group-hover:text-white transition-colors">No applications found for this email.</p>
            <p className="text-slate-500 text-sm mt-1 group-hover:text-slate-400 transition-colors">Make sure you entered the correct email address.</p>
          </div>
        )}

        {/* Results */}
        {applications && applications.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-medium">{applications.length} application{applications.length > 1 ? 's' : ''} found</p>
            {applications.map((app, i) => {
              const cfg = statusConfig[app.status] || statusConfig.Pending;
              const StatusIcon = cfg.icon;
              return (
                <div key={app._id} className={`glass rounded-2xl p-5 flex items-center justify-between hover-lift hover-shine hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-400/40 group slide-up transition-all duration-500`} style={{ animationDelay: `${i * 100}ms` }}>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover-slide group-hover:text-indigo-300 transition-colors duration-300">{app.scholarshipName}</h3>
                    <p className="text-sm text-slate-500 mt-1 group-hover:text-slate-400 transition-colors">
                      Applied on {new Date(app.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {app.gpa && <p className="text-xs text-slate-500 mt-0.5 group-hover:text-slate-400 transition-colors">GPA: {app.gpa}</p>}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.badge} hover:scale-110 transition-transform duration-300 cursor-default`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {app.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
