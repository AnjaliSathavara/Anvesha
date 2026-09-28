import React from 'react';
import { 
  Home, 
  Users, 
  FileSearch, 
  Upload, 
  ChevronRight,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export type TabType = 'dashboard' | 'patients' | 'studies' | 'upload' | 'results' | 'findings' | 'reports';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  pendingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
}) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: number; description: string }[] = [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: Home,
      description: 'Personal Health & Scan Overview'
    },
    { 
      id: 'patients', 
      label: 'My Health Records', 
      icon: Users,
      description: 'Personal & Family Profiles'
    },
    { 
      id: 'studies', 
      label: 'My Scans & Analysis', 
      icon: FileSearch,
      description: 'CT Scan Directory & Analysis'
    },
    { 
      id: 'upload', 
      label: 'Scan Upload', 
      icon: Upload,
      description: 'Intake CT DICOM Scan File'
    },
    { 
      id: 'results', 
      label: 'Technical Run Results', 
      icon: Terminal,
      description: 'Pipeline Execution Manifest'
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0 transition-colors">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Patient Navigation
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600/90 to-teal-600/90 text-white shadow-md shadow-cyan-900/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                    <div className="text-left">
                      <div>{item.label}</div>
                    </div>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive ? 'bg-white text-cyan-900' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && item.badge === undefined && (
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-200" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Health Notice Footer in Sidebar */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2 mt-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Health & Privacy Notice</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Anvesha helps track personal kidney health and CT scan information. Consult a healthcare provider for medical diagnosis.
        </p>
      </div>
    </aside>
  );
};
