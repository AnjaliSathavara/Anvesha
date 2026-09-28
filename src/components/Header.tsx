import React from 'react';
import { 
  Activity, 
  User, 
  Search, 
  Bell, 
  Info, 
  Sun, 
  Moon, 
  LogIn, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';

interface HeaderProps {
  activeClinician: string; // Patient profile selector
  setActiveClinician: (name: string) => void;
  onOpenDisclaimer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  authUser: any | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeClinician,
  setActiveClinician,
  onOpenDisclaimer,
  searchQuery,
  setSearchQuery,
  theme,
  onToggleTheme,
  authUser,
  onOpenAuth,
  onSignOut,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-3 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Branding & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-950 via-teal-900 to-slate-900 dark:from-slate-100 dark:via-cyan-200 dark:to-teal-300 bg-clip-text text-transparent">
                ANVESHA
              </h1>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <span>Kidney Stone Intelligence & Personal Health Monitoring</span>
            </p>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-0 md:mx-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search records, CT scan IDs, or health metrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 text-slate-200 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Right Controls: Theme Toggle, Auth, Patient Profile Selector & Disclaimer */}
        <div className="flex items-center space-x-2 justify-between md:justify-end flex-wrap gap-y-2">
          
          {/* Accessible Theme Toggle (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all cursor-pointer flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-500" />
            )}
          </button>

          {/* Privacy & Medical Info Button */}
          <button
            onClick={onOpenDisclaimer}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs border border-slate-700 transition-all cursor-pointer"
            title="Privacy & Medical Information Notice"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline font-medium">Info</span>
          </button>

          {/* User Auth Button */}
          {authUser ? (
            <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-200 font-medium truncate max-w-[120px]">
                {authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Patient'}
              </span>
              <button
                onClick={onSignOut}
                title="Log Out"
                className="text-slate-400 hover:text-rose-400 transition-colors ml-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Active Profile Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
            <User className="w-3.5 h-3.5 text-cyan-400 ml-1" />
            <select
              value={activeClinician}
              onChange={(e) => setActiveClinician(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="Aarav Patel (My Profile)" className="bg-slate-900 text-slate-200">
                Aarav Patel (My Profile)
              </option>
              <option value="Priya Sharma (Family Record)" className="bg-slate-900 text-slate-200">
                Priya Sharma (Family Record)
              </option>
              <option value="Rajesh Verma (Family Record)" className="bg-slate-900 text-slate-200">
                Rajesh Verma (Family Record)
              </option>
            </select>
          </div>

          {/* Notification Bell */}
          <button 
            className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 transition-colors"
            onClick={() => alert("Notification: Your CT scan analysis (STD-9901) is available to view.")}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
