import React from 'react';
import { 
  Users, 
  FileCheck, 
  Clock, 
  AlertTriangle, 
  Upload, 
  UserPlus, 
  ArrowUpRight, 
  ChevronRight, 
  Activity, 
  Sparkles,
  PieChart,
  Layers,
  Filter,
  Eye,
  FileText,
  Heart,
  Droplets
} from 'lucide-react';
import { CTStudy, Patient } from '../types';
import { TabType } from './Sidebar';

interface DashboardProps {
  patients: Patient[];
  studies: CTStudy[];
  setActiveTab: (tab: TabType) => void;
  onSelectStudy: (study: CTStudy) => void;
  onOpenAddPatient: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  patients,
  studies,
  setActiveTab,
  onSelectStudy,
  onOpenAddPatient,
}) => {
  // Metrics calculation
  const totalPatientsCount = patients.length;
  const totalStudiesCount = studies.length;
  const pendingReviewsCount = studies.filter(s => s.status === 'Pending Review' || s.status === 'In Review').length;
  const highRiskCount = studies.filter(s => s.maxStoneSizeMm >= 7.0 || s.status === 'Flagged').length;

  return (
    <div className="space-y-6 pb-8">
      {/* Patient Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg text-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>My Personal Kidney Health & Scan Overview</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                PATIENT PORTAL
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Welcome back! Track your CT scan records, view calculus analysis, and manage personal health records.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setActiveTab('upload')}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-950 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Scan</span>
          </button>
          <button
            onClick={onOpenAddPatient}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Health Record</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Health Profiles</span>
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 dark:text-sky-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{totalPatientsCount}</span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> Managed Profiles
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-600 dark:text-slate-500 mt-1">Personal & Family Records</p>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-teal-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">CT Scans Analyzed</span>
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-500 dark:text-teal-400">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{totalStudiesCount}</span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">NCCT Abdomen</span>
          </div>
          <p className="text-[11px] font-medium text-slate-600 dark:text-slate-500 mt-1">Stored Scan Records</p>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-4 rounded-2xl border border-amber-300 dark:border-amber-900/40 hover:border-amber-500/50 transition-all bg-amber-500/5 dark:bg-amber-950/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300">Scans Awaiting Review</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-900 dark:text-amber-100">{pendingReviewsCount}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-mono">
              In Review
            </span>
          </div>
          <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-400/80 mt-1">Analysis pending physician review</p>
        </div>

        {/* Card 4 */}
        <div className="glass-panel p-4 rounded-2xl border border-rose-300 dark:border-rose-900/40 hover:border-rose-500/50 transition-all bg-rose-500/5 dark:bg-rose-950/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 dark:text-rose-300">Large Calculi / High Concern</span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-rose-900 dark:text-rose-100">{highRiskCount}</span>
            <span className="text-[11px] font-bold text-rose-800 dark:text-rose-400">Stone &gt; 7mm / Hydronephrosis</span>
          </div>
          <p className="text-[11px] font-semibold text-rose-800 dark:text-rose-400/80 mt-1">Requires prompt specialist consultation</p>
        </div>
      </div>

      {/* Main Grid: Recent Studies Table & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent CT Studies Table */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Recent CT Scans & Analysis</span>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Scan Records
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Overview of recent CT scans with calculus measurements and report status.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('studies')}
              className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              View All Scans <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] font-semibold text-slate-400 uppercase bg-slate-900/80 border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2.5">Health Profile</th>
                  <th className="px-3 py-2.5">Scan Date</th>
                  <th className="px-3 py-2.5">Stone Location</th>
                  <th className="px-3 py-2.5">Size / Density</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {studies.slice(0, 5).map((study) => {
                  return (
                    <tr key={study.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-3 py-3 font-medium">
                        <div className="text-slate-200">{study.patientName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">ID: {study.patientMrn}</div>
                      </td>
                      <td className="px-3 py-3 text-slate-400">
                        <div>{study.studyDate.split(' ')[0]}</div>
                        <div className="text-[10px] text-slate-500">{study.modality.split(' ')[0]}</div>
                      </td>
                      <td className="px-3 py-3 font-medium text-cyan-300">
                        {study.primaryStoneLocation}
                      </td>
                      <td className="px-3 py-3">
                        <span className="font-semibold text-slate-200">{study.maxStoneSizeMm} mm</span>
                        <span className="text-[10px] text-slate-400 block font-mono">{study.maxStoneHU} HU</span>
                      </td>
                      <td className="px-3 py-3">
                        <StatusBadge status={study.status} />
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => {
                              onSelectStudy(study);
                              setActiveTab('findings');
                            }}
                            className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 hover:bg-cyan-900 border border-cyan-800 transition-all"
                            title="View CT Scan Visualizer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              onSelectStudy(study);
                              setActiveTab('reports');
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
                            title="View Report Summary"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Analytics & Density Guide */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-400" />
                <span>Stone Location Distribution</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Breakdown of detected calculus locations across sample records.
            </p>

            {/* Custom Interactive SVG/CSS Distribution Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">UPJ / Ureteric (Obstructive)</span>
                  <span className="text-cyan-400 font-mono font-bold">40%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Mid-Kidney / Calyx</span>
                  <span className="text-teal-400 font-mono font-bold">35%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Vesicoureteral Junction (UVJ)</span>
                  <span className="text-sky-400 font-mono font-bold">25%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient-Friendly Info Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
            <div className="font-semibold text-slate-200 flex items-center justify-between">
              <span>Understanding Stone Density (HU)</span>
              <span className="font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Density Guide
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Density over 800 HU indicates hard calcium stones. Lower density (&lt;500 HU) often suggests uric acid stones, which may respond to oral alkalinization therapy under medical guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'Pending Review':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
          Pending Review
        </span>
      );
    case 'In Review':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-950 text-sky-300 border border-sky-800">
          In Review
        </span>
      );
    case 'Approved':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
          Verified
        </span>
      );
    case 'Flagged':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
          Flagged
        </span>
      );
    default:
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
          {status}
        </span>
      );
  }
};
