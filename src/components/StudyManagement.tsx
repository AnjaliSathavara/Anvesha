import React, { useState } from 'react';
import { 
  FileSearch, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  Layers, 
  Sliders, 
  Cpu, 
  Calendar, 
  User, 
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { CTStudy, ReviewStatus } from '../types';
import { StatusBadge } from './Dashboard';
import { TabType } from './Sidebar';

interface StudyManagementProps {
  studies: CTStudy[];
  onSelectStudy: (study: CTStudy) => void;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
}

export const StudyManagement: React.FC<StudyManagementProps> = ({
  studies,
  onSelectStudy,
  setActiveTab,
  searchQuery,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [inspectedStudy, setInspectedStudy] = useState<CTStudy | null>(null);

  const filteredStudies = studies.filter((study) => {
    const matchesSearch =
      study.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.patientMrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.studyUid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.primaryStoneLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || study.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-cyan-400" />
            <span>My Scans & CT Analysis Directory</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Non-Contrast CT (NCCT) abdomen & pelvis scan records with calculated stone analysis metrics.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-300">Status:</span>
          {['ALL', 'Pending Review', 'In Review', 'Approved', 'Flagged'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {status === 'Approved' ? 'Verified' : status}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {filteredStudies.length} scan records listed
        </div>
      </div>

      {/* Grid of Studies Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStudies.map((study) => (
          <div 
            key={study.id} 
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <span>{study.patientName}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                    Record ID: {study.patientMrn} • Scan ID: {study.id}
                  </span>
                </div>
                <StatusBadge status={study.status} />
              </div>

              {/* Study Details Summary Box */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    Scan Date:
                  </span>
                  <span className="font-mono text-slate-200">{study.studyDate}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Modality / Volume:
                  </span>
                  <span className="font-mono text-slate-200">{study.modality} ({study.sliceCount} Slices)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Primary Stone Location:</span>
                  <span className="font-semibold text-cyan-300">{study.primaryStoneLocation}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Max Size & Density:</span>
                  <span className="font-mono font-bold text-amber-300">
                    {study.maxStoneSizeMm} mm • {study.maxStoneHU} HU
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                onClick={() => setInspectedStudy(study)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                <Info className="w-3.5 h-3.5 text-cyan-400" /> Acquisition Parameters
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    onSelectStudy(study);
                    setActiveTab('findings');
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Visualizer</span>
                </button>
                <button
                  onClick={() => {
                    onSelectStudy(study);
                    setActiveTab('reports');
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="View Report Summary"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Acquisition Parameters Modal */}
      {inspectedStudy && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setInspectedStudy(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>CT Scan Technical Parameters</span>
              </h3>
              <p className="text-xs text-cyan-400 font-mono mt-0.5">
                UID: {inspectedStudy.studyUid}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Scanner Model:</span>
                <span className="text-slate-200 font-sans">{inspectedStudy.scannerModel}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Slice Thickness:</span>
                <span className="text-slate-200">{inspectedStudy.sliceThicknessMm} mm</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Total Slice Count:</span>
                <span className="text-slate-200">{inspectedStudy.sliceCount} axial slices</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Peak Voltage (KVP):</span>
                <span className="text-slate-200">{inspectedStudy.kvp} kVp</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Tube Current (mA):</span>
                <span className="text-slate-200">{inspectedStudy.ma} mA</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectedStudy(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium"
              >
                Close Parameters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
