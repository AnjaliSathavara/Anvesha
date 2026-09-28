import React from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Activity, 
  ShieldCheck, 
  Calendar, 
  User, 
  Layers, 
  AlertTriangle,
  QrCode,
  ArrowLeft
} from 'lucide-react';
import { CTStudy } from '../types';
import { TabType } from './Sidebar';

interface ReportsProps {
  study: CTStudy;
  activeClinician: string;
  setActiveTab: (tab: TabType) => void;
}

export const Reports: React.FC<ReportsProps> = ({
  study,
  activeClinician,
  setActiveTab,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const primaryFinding = study.findings[0] || {
    location: study.primaryStoneLocation,
    maxDiameterMm: study.maxStoneSizeMm,
    volumeMm3: 180,
    densityHU: study.maxStoneHU,
    compositionEstimate: 'Calcium Oxalate',
    hydronephrosisGrade: 'Grade 2 (Moderate)',
    sliceIndex: 68,
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Action Toolbar (Hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('findings')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>Personal Health & Scan Summary Report</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Printable summary report for scan record {study.id}.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-950 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Page Canvas */}
      <div className="print-page bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-8 shadow-2xl relative space-y-6 overflow-hidden">
        
        {/* Informational Watermark */}
        <div className="absolute top-12 right-6 transform rotate-12 opacity-15 pointer-events-none select-none text-center">
          <div className="text-3xl font-extrabold text-cyan-500 border-4 border-cyan-500 p-2 rounded-xl">
            HEALTH RECORD
          </div>
          <div className="text-[10px] font-mono text-cyan-400 mt-1 uppercase tracking-widest">
            PERSONAL HEALTH TRACKING REPORT
          </div>
        </div>

        {/* Section 1: Header & Facility Branding */}
        <div className="border-b border-slate-800 pb-6 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white text-sm">
                A
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-100">
                ANVESHA PATIENT HEALTH REPORT
              </h1>
            </div>
            <p className="text-xs text-cyan-400 font-medium">
              Kidney Stone Intelligence & Personal Health Monitoring
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Personal Health Record System
            </p>
          </div>

          <div className="text-right space-y-1 text-xs font-mono">
            <div className="text-slate-400">Report ID: <span className="text-slate-200">REP-2026-{study.id}</span></div>
            <div className="text-slate-400">Date: <span className="text-slate-200">{new Date().toISOString().split('T')[0]}</span></div>
            <div className="inline-block px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              PATIENT RECORD
            </div>
          </div>
        </div>

        {/* Section 2: Patient & Acquisition Demographics Table */}
        <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Health Profile Demographics</h3>
            <div className="grid grid-cols-2 gap-1 text-slate-400">
              <span>Profile Name:</span>
              <span className="font-semibold text-slate-100">{study.patientName}</span>
              <span>Record ID:</span>
              <span className="font-mono text-cyan-400">{study.patientMrn}</span>
              <span>Age / Gender:</span>
              <span className="text-slate-200">{study.patientAge} Yrs / {study.patientGender}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">CT Acquisition Details</h3>
            <div className="grid grid-cols-2 gap-1 text-slate-400">
              <span>Modality:</span>
              <span className="text-slate-200">{study.modality}</span>
              <span>Scanner Model:</span>
              <span className="text-slate-200">{study.scannerModel}</span>
              <span>Slice Thickness:</span>
              <span className="text-slate-200 font-mono">{study.sliceThicknessMm} mm ({study.sliceCount} slices)</span>
            </div>
          </div>
        </div>

        {/* Section 3: Quantitative Findings Summary Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Calculus Quantitative Findings Summary
          </h3>

          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-800">Finding #</th>
                <th className="p-3 border-b border-slate-800">Anatomical Location</th>
                <th className="p-3 border-b border-slate-800">Max Diameter</th>
                <th className="p-3 border-b border-slate-800">HU Density</th>
                <th className="p-3 border-b border-slate-800">Estimated Composition</th>
                <th className="p-3 border-b border-slate-800">Hydronephrosis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="p-3 font-mono text-cyan-400 font-bold">ROI #1</td>
                <td className="p-3 font-semibold text-slate-100">{primaryFinding.location}</td>
                <td className="p-3 font-bold text-cyan-300">{primaryFinding.maxDiameterMm} mm</td>
                <td className="p-3 font-mono text-amber-300">{primaryFinding.densityHU} HU</td>
                <td className="p-3">{primaryFinding.compositionEstimate}</td>
                <td className="p-3 text-rose-300">{primaryFinding.hydronephrosisGrade}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: Key Image Snapshot & Clinical Impression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Key Image Thumbnail */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-slate-400">Key Image Slice #{primaryFinding.sliceIndex}</div>
            <div className="aspect-square bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden medical-grid">
              <svg viewBox="0 0 200 200" className="w-full h-full max-w-[160px]">
                <ellipse cx="100" cy="100" rx="80" ry="65" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <path d="M 60 90 C 45 70, 45 120, 60 115 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
                <ellipse cx="62" cy="102" rx="3" ry="2.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.5" />
                <rect x="55" y="95" width="14" height="14" fill="rgba(6, 182, 212, 0.08)" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" rx="1" />
              </svg>
            </div>
            <div className="text-[10px] text-center text-slate-500 font-mono">
              Calculus ROI (8.4mm / 960 HU)
            </div>
          </div>

          {/* Clinical Impression & Recommendations */}
          <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div>
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                Specialist Summary & Impression
              </h4>
              <p className="text-slate-200 leading-relaxed">
                {study.clinicianReview?.clinicalImpression ||
                  `NCCT demonstrates a ${study.maxStoneSizeMm}mm calculus at ${study.primaryStoneLocation} with associated proximal ureteric dilatation.`}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                Recommended Management Plan
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {(study.clinicianReview?.recommendedActions || [
                  'Medical Expulsive Therapy',
                  'Urology Consultation for Lithotripsy'
                ]).map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Section 5: Review Info & Digital Verification */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-end gap-4">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-mono">Reviewed By:</div>
            <div className="text-sm font-bold text-slate-100">{study.clinicianReview?.reviewedBy || 'Certified Specialist Consultation'}</div>
            <div className="text-[10px] text-slate-500 font-mono">
              Digital Reference Hash: {study.clinicianReview?.signatureHash || 'SHA256-REF-882A-991F'}
            </div>
          </div>

          {/* Verification Box */}
          <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <QrCode className="w-10 h-10 text-cyan-400" />
            <div className="text-[10px] text-slate-400 font-mono">
              <div className="font-bold text-slate-300">ANVESHA VERIFIED</div>
              <div>Personal Health Record</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
