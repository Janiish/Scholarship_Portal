import { useState, useEffect } from 'react';
import {
  HiOutlineShieldCheck,
  HiOutlineInboxStack,
  HiOutlineClock,
  HiOutlineCheckBadge,
  HiOutlineXCircle,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineNoSymbol,
} from 'react-icons/hi2';

const statusConfig = {
  Pending: { badge: 'badge-pending', icon: HiOutlineClock },
  Approved: { badge: 'badge-approved', icon: HiOutlineCheckBadge },
  Rejected: { badge: 'badge-rejected', icon: HiOutlineXCircle },
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/admin/applications')
      .then((res) => res.json())
      .then(setApplications)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/update/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setApplications((prev) => prev.map((app) => (app._id === id ? { ...app, status } : app)));
    } catch {
      alert('Failed to update status.');
    } finally {
      setUpdating(null);
    }
  };

  const deleteApp = async (id) => {
    if (!confirm('Delete this application?')) return;
    try {
      const res = await fetch(`/api/admin/delete/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch {
      alert('Failed to delete.');
    }
  };

  const filtered = filter === 'All' ? applications : applications.filter((a) => a.status === filter);

  const counts = {
    All: applications.length,
    Pending: applications.filter((a) => a.status === 'Pending').length,
    Approved: applications.filter((a) => a.status === 'Approved').length,
    Rejected: applications.filter((a) => a.status === 'Rejected').length,
  };

  const filterGlow = {
    All: 'from-indigo-500/20 to-purple-500/20 border-indigo-400/30',
    Pending: 'from-yellow-500/20 to-amber-500/20 border-yellow-400/30',
    Approved: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
    Rejected: 'from-red-500/20 to-rose-500/20 border-red-400/30',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
        <svg className="animate-spin h-10 w-10 text-indigo-400" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-slate-400 text-sm animate-pulse">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="page-enter py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 slide-up">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 text-indigo-400 float pulse-glow hover:scale-125 hover:rotate-12 hover:shadow-2xl hover:shadow-indigo-500/50 hover:from-indigo-500 hover:to-purple-600 hover:border-transparent hover:text-white transition-all duration-500 cursor-pointer">
                <HiOutlineShieldCheck className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
              </div>
              <h1 className="text-2xl font-bold text-white text-glow hover:scale-105 transition-transform duration-300 cursor-default">Admin Dashboard</h1>
            </div>
            <p className="text-slate-500 text-sm ml-[52px] hover:text-slate-400 transition-colors cursor-default">Review and manage scholarship applications.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {Object.entries(counts).map(([key, val], i) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`p-4 rounded-xl text-left transition-all duration-400 ease-spring hover-lift hover-shine hover:shadow-2xl slide-up group ${
                filter === key
                  ? `glass-strong bg-gradient-to-br ${filterGlow[key]} ring-2 ring-white/20 scale-105`
                  : 'glass hover:bg-white/[0.08] hover:border-indigo-400/30'
              }`}
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              <p className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{val}</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1 group-hover:text-slate-400 transition-colors">{key}</p>
            </button>
          ))}
        </div>

        {/* Empty */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center scale-in hover:glass-strong hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 group">
            <HiOutlineInboxStack className="w-12 h-12 text-slate-600 mx-auto mb-4 group-hover:text-slate-500 group-hover:scale-110 transition-all duration-300" />
            <p className="text-slate-400 font-medium group-hover:text-white transition-colors">
              {filter === 'All' ? 'No applications yet.' : `No ${filter.toLowerCase()} applications.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto glass rounded-2xl hover-glow-ring hover:shadow-2xl hover:shadow-indigo-500/20 slide-up delay-300 transition-all duration-500">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Student', 'Email', 'Scholarship', 'GPA', 'Status', 'Action'].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((app, i) => {
                  const cfg = statusConfig[app.status] || statusConfig.Pending;
                  const StatusIcon = cfg.icon;
                  return (
                    <tr
                      key={app._id}
                      className="table-row-glass transition-all"
                      style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    >
                      <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{app.studentName}</td>
                      <td className="px-5 py-4 text-slate-400 text-sm">{app.email}</td>
                      <td className="px-5 py-4 text-slate-300 text-sm">{app.scholarshipName}</td>
                      <td className="px-5 py-4 text-slate-300 text-sm font-medium">{app.gpa}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {app.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus(app._id, 'Approved')}
                            disabled={updating === app._id || app.status === 'Approved'}
                            title="Approve"
                            className="p-2 rounded-lg transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-green-500/30 hover:rotate-12 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0 hover:-translate-y-1"
                            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}
                          >
                            <HiOutlineCheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(app._id, 'Rejected')}
                            disabled={updating === app._id || app.status === 'Rejected'}
                            title="Reject"
                            className="p-2 rounded-lg transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-red-500/30 hover:-rotate-12 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0 hover:-translate-y-1"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}
                          >
                            <HiOutlineNoSymbol className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteApp(app._id)}
                            title="Delete"
                            className="p-2 rounded-lg transition-all duration-300 hover:scale-125 hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-400 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
