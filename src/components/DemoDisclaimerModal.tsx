import React from 'react';
import { ShieldCheck, CheckCircle2, Info, X, Cpu, HardDrive, Heart } from 'lucide-react';

interface DemoDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoDisclaimerModal: React.FC<DemoDisclaimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Anvesha Platform & Privacy Information
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Personal kidney stone intelligence, data privacy, and health monitoring guidelines.
            </p>
          </div>
        </div>

        {/* Section 1: Core Capabilities */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Platform Capabilities & Features</span>
          </h4>
          <ul className="text-xs text-slate-300 space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800 list-disc list-inside">
            <li><strong>Personal Health Overview:</strong> Monitor CT scan records, stone size, density metrics, and kidney health timelines.</li>
            <li><strong>My Health Records:</strong> Maintain personal and family health profiles and medical history notes.</li>
            <li><strong>CT Scan Intake & Visualizer:</strong> Upload DICOM scans to view axial slice series and stone ROI bounding boxes.</li>
            <li><strong>Personal Health Reports:</strong> Export printable health summaries and scan analysis manifests.</li>
          </ul>
        </div>

        {/* Section 2: Privacy & Data Security */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <HardDrive className="w-4 h-4" />
            <span>2. Data Privacy & Local Storage</span>
          </h4>
          <ul className="text-xs text-slate-300 space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800 list-disc list-inside">
            <li>All personal profiles, medical history notes, and uploaded scan records are stored locally in your browser environment (`localStorage`).</li>
            <li>Your health data remains private on your local device.</li>
          </ul>
        </div>

        {/* Section 3: Medical Limitation & Safety Notice */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            <span>3. Medical Disclaimer</span>
          </h4>
          <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
            Anvesha is designed for personal health monitoring, CT scan visualization support, and educational tracking. 
            Anvesha is not a substitute for professional medical diagnosis, advice, or treatment. Always consult a qualified physician or urologist for medical care.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
          >
            Close & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
