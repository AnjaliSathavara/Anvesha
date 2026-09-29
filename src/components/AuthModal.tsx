import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Info,
  Lock,
  Mail,
  User
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: any) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const validateInputs = (): boolean => {
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your name.');
        return false;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    if (!isSupabaseConfigured) {
      // Demo authentication fallback when Supabase keys are not set in .env
      const mockUser = {
        id: 'patient-demo-001',
        email: email || 'patient@anvesha.health',
        user_metadata: {
          full_name: fullName || (email ? email.split('@')[0] : 'Aarav Patel'),
        },
      };
      setSuccessMsg(mode === 'login' ? 'Signed in successfully (Demo Mode)!' : 'Account created successfully (Demo Mode)!');
      if (onAuthSuccess) onAuthSuccess(mockUser);
      setTimeout(() => {
        onClose();
      }, 1000);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          setSuccessMsg('Account created successfully! Check your email to confirm registration or log in now.');
          if (onAuthSuccess) onAuthSuccess(data.user);
          setTimeout(() => {
            setMode('login');
          }, 2000);
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data.user) {
          setSuccessMsg('Logged in successfully!');
          if (onAuthSuccess) onAuthSuccess(data.user);
          setTimeout(() => {
            onClose();
          }, 1200);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl relative text-slate-900 dark:text-slate-100">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {mode === 'login' ? 'Patient Sign In' : 'Create Patient Account'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Anvesha Personal Health Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Supabase Not Configured Warning Banner */}
        {!isSupabaseConfigured && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-1">
            <div className="flex items-center space-x-2 font-bold text-amber-900 dark:text-amber-300">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Supabase Auth Setup Required</span>
            </div>
            <p className="text-amber-800 dark:text-amber-200/90 text-[11px] leading-relaxed">
              To enable live registration and login, add your <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded text-amber-950 dark:text-amber-100 font-mono border border-amber-200 dark:border-amber-800">VITE_SUPABASE_URL</code> and <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded text-amber-950 dark:text-amber-100 font-mono border border-amber-200 dark:border-amber-800">VITE_SUPABASE_ANON_KEY</code> to your project <code className="font-mono text-amber-900 dark:text-amber-100">.env</code> file.
            </p>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              mode === 'login' ? 'bg-cyan-600 text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              mode === 'signup' ? 'bg-cyan-600 text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Banner */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Aarav Patel"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2.5 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2.5 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-10 py-2.5 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2.5 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-cyan-950 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Account</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Register Account</span>
              </>
            )}
          </button>
        </form>

        {/* Data Isolation Notice */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
          <span className="font-semibold text-slate-900 dark:text-slate-300 block">Patient Privacy Note</span>
          <p className="leading-relaxed">
            Local CT scan records and health metrics are saved in browser storage. Enabling Supabase Auth links your session to secure cloud user tables.
          </p>
        </div>

      </div>
    </div>
  );
};
