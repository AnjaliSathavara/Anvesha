import React, { useState } from 'react';
import { 
  Stethoscope, 
  Sliders, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ShieldCheck,
  CheckSquare,
  Square,
  Activity,
  Maximize2
} from 'lucide-react';
import { CTStudy, ReviewStatus, StoneFinding } from '../types';
import { TabType } from './Sidebar';

interface FindingsReviewProps {
  study: CTStudy;
  onUpdateStudyReview: (updatedStudy: CTStudy) => void;
  activeClinician: string;
  setActiveTab: (tab: TabType) => void;
}

export const FindingsReview: React.FC<FindingsReviewProps> = ({
  study,
  onUpdateStudyReview,
  activeClinician,
  setActiveTab,
}) => {
  const primaryFinding = study.findings[0] || {
    id: 'FND-01',
    location: study.primaryStoneLocation,
    maxDiameterMm: study.maxStoneSizeMm,
    volumeMm3: 180,
    densityHU: study.maxStoneHU,
    compositionEstimate: 'Calcium Oxalate',
    hydronephrosisGrade: 'Grade 2 (Moderate)',
    sliceIndex: 68,
    roiBoundingBox: { x: 42, y: 38, width: 16, height: 16 },
  };

  // Interactive Slice Viewer State
  const [currentSlice, setCurrentSlice] = useState<number>(primaryFinding.sliceIndex || 68);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [windowPreset, setWindowPreset] = useState<'soft' | 'stone'>('stone');
  const [showRoiBox, setShowRoiBox] = useState<boolean>(true);

  // Review Form State
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>(
    study.clinicianReview?.reviewStatus || study.status || 'Pending Review'
  );
  const [impressionNotes, setImpressionNotes] = useState<string>(
    study.clinicianReview?.clinicalImpression ||
    `NCCT demonstrates a ${study.maxStoneSizeMm}mm high-density (${study.maxStoneHU} HU) calculus at ${study.primaryStoneLocation}. Associated proximal ureteric dilatation (Grade 2 Hydronephrosis).`
  );

  const defaultActions = study.clinicianReview?.recommendedActions || [
    'Medical Expulsive Therapy (Tamsulosin 0.4mg)',
    'Urology Consultation for URS / Laser Lithotripsy',
    '3L Daily Fluid Intake Protocol'
  ];
  const [selectedActions, setSelectedActions] = useState<string[]>(defaultActions);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const toggleAction = (action: string) => {
    if (selectedActions.includes(action)) {
      setSelectedActions(selectedActions.filter(a => a !== action));
    } else {
      setSelectedActions([...selectedActions, action]);
    }
  };

  const handleSaveReview = () => {
    const updatedReviewObj = {
      reviewedBy: 'Certified Specialist Consultation',
      reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      reviewStatus,
      clinicalImpression: impressionNotes,
      recommendedActions: selectedActions,
      signatureHash: `SHA256-REF-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    const updatedStudy: CTStudy = {
      ...study,
      status: reviewStatus,
      clinicianReview: updatedReviewObj,
    };

    onUpdateStudyReview(updatedStudy);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Check if current slice is near stone slice index
  const isStoneSlice = Math.abs(currentSlice - primaryFinding.sliceIndex) <= 4;

  return (
    <div className="space-y-6 pb-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-cyan-400" />
              <span>CT Scan Visualizer & Findings Analysis</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              SCAN ANALYSIS RECORD
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Health Record: <span className="text-slate-200 font-semibold">{study.patientName}</span> ({study.patientAge}y/{study.patientGender}) • Record ID: <span className="font-mono text-cyan-400">{study.patientMrn}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('reports')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Summary Report</span>
          </button>
        </div>
      </div>

      {/* Main Review Workspace: CT Slice Simulator (Left 7 cols) & Quantitative Metrics (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section: Slice Simulator (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200">Axial CT Slice Simulator</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                Slice {currentSlice} / {study.sliceCount}
              </span>
            </div>

            {/* Contrast Preset Buttons */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                onClick={() => setWindowPreset('stone')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all ${
                  windowPreset === 'stone' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bone/Stone (W:1500 L:400)
              </button>
              <button
                onClick={() => setWindowPreset('soft')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all ${
                  windowPreset === 'soft' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Soft Tissue (W:400 L:40)
              </button>
            </div>
          </div>

          {/* Interactive CT Cross-Section Rendering Box */}
          <div data-radiology-viewport="true" className="relative w-full aspect-square max-h-[460px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center medical-grid group">
            
            {/* Synthetic Anatomical Kidney Cross-Section SVG Rendering */}
            <div 
              className="relative w-full h-full flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[380px] max-h-[380px]">
                {/* SVG Radial Gradients for Anatomical Radiologic CT Rendering */}
                <defs>
                  <radialGradient id="bodyContourGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={windowPreset === 'stone' ? '#0f172a' : '#1e293b'} />
                    <stop offset="85%" stopColor={windowPreset === 'stone' ? '#090d16' : '#0f172a'} />
                    <stop offset="100%" stopColor="#030712" />
                  </radialGradient>
                  <radialGradient id="kidneyTissueGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor={windowPreset === 'stone' ? '#334155' : '#475569'} />
                    <stop offset="100%" stopColor={windowPreset === 'stone' ? '#1e293b' : '#334155'} />
                  </radialGradient>
                  <radialGradient id="stoneDensityGrad" cx="45%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="60%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </radialGradient>
                </defs>

                {/* Background Body Cross-Section Contour */}
                <ellipse 
                  cx="200" 
                  cy="200" 
                  rx="160" 
                  ry="130" 
                  fill="url(#bodyContourGrad)" 
                  stroke="#334155" 
                  strokeWidth="2" 
                />
                
                {/* Vertebral Column (Posterior Bone Attenuation) */}
                <circle cx="200" cy="300" r="22" fill="#475569" stroke="#64748b" strokeWidth="2" />
                <path d="M190 288 L210 288 L200 315 Z" fill="#334155" />
                <circle cx="200" cy="300" r="10" fill="#0f172a" />

                {/* Left Kidney Contour (Anatomical Calyx Structure) */}
                <path 
                  d="M 120 180 C 90 140, 90 240, 120 230 C 145 220, 140 190, 120 180 Z" 
                  fill="url(#kidneyTissueGrad)" 
                  stroke="#64748b" 
                  strokeWidth="1.5" 
                />

                {/* Right Kidney Contour */}
                <path 
                  d="M 280 180 C 310 140, 310 240, 280 230 C 255 220, 260 190, 280 180 Z" 
                  fill="url(#kidneyTissueGrad)" 
                  stroke="#64748b" 
                  strokeWidth="1.5" 
                />

                {/* Major Abdominal Vascular Structures */}
                <circle cx="185" cy="255" r="11" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                <circle cx="215" cy="255" r="13" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

                {/* High Attenuation Calculus Focus & Subtle Medical ROI Annotation */}
                {isStoneSlice && (
                  <g>
                    {/* Natural High-HU Hyperdense Calculus Structure */}
                    <ellipse cx="124" cy="204" rx="5" ry="4" fill="url(#stoneDensityGrad)" stroke="#64748b" strokeWidth="1" />
                    
                    {/* Professional Medical ROI Annotation Boundary */}
                    {showRoiBox && (
                      <g>
                        <rect 
                          x="112" 
                          y="192" 
                          width="24" 
                          height="24" 
                          fill="rgba(6, 182, 212, 0.08)" 
                          stroke="#38bdf8" 
                          strokeWidth="1" 
                          strokeDasharray="3,3" 
                          rx="2"
                        />
                        {/* Corner Reticle Markers */}
                        <path d="M 112 196 L 112 192 L 116 192" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                        <path d="M 132 192 L 136 192 L 136 196" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                        <path d="M 136 212 L 136 216 L 132 216" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                        <path d="M 116 216 L 112 216 L 112 212" stroke="#38bdf8" strokeWidth="1.5" fill="none" />

                        <text x="112" y="186" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="600">
                          ROI #1: {study.maxStoneSizeMm}mm ({study.maxStoneHU} HU)
                        </text>
                      </g>
                    )}
                  </g>
                )}
              </svg>

              {/* HUD Slice Information Overlay */}
              <div className="absolute top-3 left-3 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
                <div className="text-cyan-400 font-bold">ANVESHA DICOM VIEWER</div>
                <div className="text-slate-300">Slice: {currentSlice} / {study.sliceCount}</div>
                <div className="text-slate-400">HU: {isStoneSlice ? `${study.maxStoneHU} HU (Stone)` : '35 HU (Tissue)'}</div>
                <div className="text-slate-500">Zoom: {zoomLevel.toFixed(1)}x</div>
              </div>

              {/* Stone Detection Alert Overlay */}
              {isStoneSlice ? (
                <div className="absolute bottom-3 right-3 bg-cyan-950/90 border border-cyan-800 p-2 rounded-xl text-[11px] text-cyan-300 font-medium flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Calculus Identified on Slice #{currentSlice}</span>
                </div>
              ) : (
                <div className="absolute bottom-3 right-3 bg-slate-900/80 border border-slate-800 p-2 rounded-xl text-[11px] text-slate-400">
                  Scroll slider to Slice #{primaryFinding.sliceIndex} for calculus ROI
                </div>
              )}
            </div>
          </div>

          {/* Slice Controls Bar */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Axial Slice Navigator
              </span>
              <button
                onClick={() => setCurrentSlice(primaryFinding.sliceIndex)}
                className="text-cyan-400 hover:underline text-[11px] font-medium"
              >
                Jump to Calculus Slice #{primaryFinding.sliceIndex}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-500 font-mono">0</span>
              <input
                type="range"
                min={1}
                max={study.sliceCount}
                value={currentSlice}
                onChange={(e) => setCurrentSlice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="text-xs text-slate-500 font-mono">{study.sliceCount}</span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(1.0, prev - 0.25))}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(3.0, prev + 0.25))}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1.0)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <label className="flex items-center space-x-2 text-slate-300 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRoiBox}
                  onChange={(e) => setShowRoiBox(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Show Bounding Box</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section: Quantitative Findings Panel & Management Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Stone Metrics Card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Calculus Quantitative Metrics</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Location</span>
                <span className="font-bold text-cyan-300 text-sm">{primaryFinding.location}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Max Diameter</span>
                <span className="font-bold text-slate-100 text-sm">{primaryFinding.maxDiameterMm} mm</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">HU Density</span>
                <span className="font-bold text-amber-300 font-mono text-sm">{primaryFinding.densityHU} HU</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Hydronephrosis</span>
                <span className="font-semibold text-rose-300 text-xs">{primaryFinding.hydronephrosisGrade}</span>
              </div>
            </div>
          </div>

          {/* Clinical Notes & Action Summary */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Clinical Notes & Management Summary</span>
            </h3>

            {savedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Health record notes updated successfully!</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Status Classification</label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as ReviewStatus)}
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Pending Review">Pending Review</option>
                  <option value="In Review">In Review</option>
                  <option value="Approved">Verified Report</option>
                  <option value="Flagged">Flagged for Specialist Review</option>
                  <option value="Needs Verification">Needs Verification</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Specialist Notes & Impression</label>
                <textarea
                  rows={3}
                  value={impressionNotes}
                  onChange={(e) => setImpressionNotes(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Recommendation Checklist */}
              <div>
                <label className="block text-slate-300 font-medium mb-2">Recommended Clinical Actions</label>
                <div className="space-y-2">
                  {[
                    'Medical Expulsive Therapy (Tamsulosin 0.4mg)',
                    'Urology Consultation for URS / Laser Lithotripsy',
                    'Extracorporeal Shockwave Lithotripsy (ESWL)',
                    'Oral Urinary Alkalinization (Potassium Citrate)',
                    '3L Daily Fluid Intake Protocol'
                  ].map((action) => {
                    const isChecked = selectedActions.includes(action);
                    return (
                      <div
                        key={action}
                        onClick={() => toggleAction(action)}
                        className={`flex items-center space-x-2.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-cyan-950/60 border-cyan-700 text-cyan-200' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <span className="text-xs">{action}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Attestation Info Box */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 font-mono text-[11px] text-slate-400">
                <div>Report Reviewed By: <span className="text-slate-200 font-bold">{study.clinicianReview?.reviewedBy || 'Certified Specialist Consultation'}</span></div>
                <div>Last Updated: <span className="text-slate-300">{new Date().toISOString().replace('T', ' ').substring(0, 16)}</span></div>
              </div>

              <button
                onClick={handleSaveReview}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-cyan-950 transition-all cursor-pointer"
              >
                Save Health Record Notes
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
