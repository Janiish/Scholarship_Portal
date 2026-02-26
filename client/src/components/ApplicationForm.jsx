import { useState } from 'react';
import { HiOutlinePaperAirplane, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';

const fields = [
  { name: 'studentName', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: '👤' },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@university.edu', icon: '✉️' },
  { name: 'scholarshipName', label: 'Scholarship Name', type: 'text', placeholder: 'e.g. Merit Scholarship 2026', icon: '🎓' },
  { name: 'gpa', label: 'GPA (0 - 4.0)', type: 'number', placeholder: '3.85', step: '0.01', min: '0', max: '4', icon: '📊' },
];

export default function ApplicationForm() {
  const [form, setForm] = useState({ studentName: '', email: '', scholarshipName: '', gpa: '' });
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMessage('');
    
    // Validate GPA
    const gpaValue = parseFloat(form.gpa);
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      setStatus('error');
      setErrorMessage('GPA must be a number between 0 and 4.0');
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, gpa: gpaValue }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      setStatus('success');
      setForm({ studentName: '', email: '', scholarshipName: '', gpa: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter min-h-[80vh] flex items-center justify-center py-12 px-4 relative">
      {/* Background decorations */}
      <div className="blob w-[350px] h-[350px] bg-indigo-600/20 top-[10%] right-[10%] fixed" />
      <div className="blob w-[250px] h-[250px] bg-purple-500/15 bottom-[20%] left-[5%] fixed" style={{ animationDelay: '3s' }} />

      <div className="w-full max-w-lg relative">
        {/* Header */}
        <div className="text-center mb-8 slide-up">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 text-indigo-400 mb-4 float pulse-glow hover:scale-125 hover:rotate-12 hover:shadow-2xl hover:shadow-indigo-500/50 hover:from-indigo-500 hover:to-purple-600 hover:border-transparent hover:text-white transition-all duration-500 cursor-pointer">
            <HiOutlinePaperAirplane className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-2xl font-bold text-white text-glow hover:scale-105 transition-transform duration-300 cursor-default">Apply for a Scholarship</h1>
          <p className="text-slate-400 mt-1 hover:text-slate-300 transition-colors cursor-default">Fill in the details below to submit your application.</p>
        </div>

        {/* Alert */}
        {status === 'success' && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl badge-approved scale-in hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 cursor-default">
            <HiOutlineCheckCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <p className="text-sm font-medium">Application submitted successfully!</p>
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl badge-rejected scale-in hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 cursor-default">
            <HiOutlineExclamationTriangle className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <div>
              <p className="text-sm font-medium">Submission failed</p>
              {errorMessage && <p className="text-xs mt-1 opacity-90">{errorMessage}</p>}
            </div>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5 hover-lift hover-shine hover:shadow-2xl hover:shadow-indigo-500/20 slide-up delay-200 hover:border-indigo-400/40 transition-all duration-700">
          {fields.map(({ name, label, icon, ...rest }, i) => (
            <div key={name} className="slide-up" style={{ animationDelay: `${300 + i * 100}ms` }}>
              <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5 hover:text-indigo-300 transition-colors cursor-pointer">
                <span className="mr-1.5">{icon}</span>{label}
              </label>
              <input
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="input-glass w-full px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/10 focus:shadow-xl transition-all"
                {...rest}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="btn-glow ripple w-full py-3 text-white font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 slide-up delay-700 hover:py-3.5 transition-all"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
