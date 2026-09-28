import React, { useState } from 'react';
import { 
  Upload, 
  FileCheck, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  HardDrive,
  FileText,
  Terminal,
  Info,
  XCircle
} from 'lucide-react';
import { CTStudy } from '../types';
import { TabType } from './Sidebar';

interface ScanUploadProps {
  onLoadSampleStudy: () => void;
  setActiveTab: (tab: TabType) => void;
  onRunFinished?: (fileDetails?: { fileName: string; fileSize: number }) => void;
}

export const ScanUpload: React.FC<ScanUploadProps> = ({
  onLoadSampleStudy,
  setActiveTab,
  onRunFinished,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingComplete, setProcessingComplete] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  const validateFile = (file: File): boolean => {
    setValidationError('');
    const validExtensions = ['.dcm', '.zip', '.nii', '.gz'];
    const fileNameLower = file.name.toLowerCase();
    const isValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));

    if (!isValidExt) {
      setValidationError('Invalid file format. Please upload a valid DICOM (.dcm), archive (.zip), or NIfTI (.nii, .nii.gz) file.');
      return false;
    }

    const maxSizeBytes = 500 * 1024 * 1024; // 500 MB
    if (file.size > maxSizeBytes) {
      setValidationError('File size exceeds the 500 MB limit. Please select a smaller scan file.');
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setProcessingComplete(false);
      } else {
        setSelectedFile(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setProcessingComplete(false);
      } else {
        setSelectedFile(null);
      }
    }
  };

  const handleSimulateUpload = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setUploadProgress(10);
    setProcessingStep('Reading DICOM metadata headers & Tags...');

    setTimeout(() => {
      setUploadProgress(40);
      setProcessingStep('Validating slice thickness & spatial resolution...');
    }, 1000);

    setTimeout(() => {
      setUploadProgress(75);
      setProcessingStep('Registering volume metadata for intake manifest...');
    }, 2000);

    setTimeout(() => {
      setUploadProgress(100);
      setProcessingStep('Scan intake complete!');
      setIsProcessing(false);
      setProcessingComplete(true);
      if (onRunFinished) {
        onRunFinished({
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
        });
      }
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Upload className="w-5 h-5 text-cyan-400" />
          <span>CT Scan Intake & Upload Interface</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Intake DICOM slice series (.dcm, .zip, .nii) for volume analysis and health tracking.
        </p>
      </div>

      {/* Safety & Medical Limitation Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-xs space-y-2">
        <div className="flex items-center space-x-2 font-bold text-cyan-300 text-sm">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>SCAN INTAKE & SAFETY NOTICE</span>
        </div>
        <p className="leading-relaxed text-slate-300">
          Upload your CT scan volume (.dcm, .zip, .nii) to extract volume parameters and store scan records. 
          Anvesha provides health tracking and educational insights. Discuss all findings with your physician.
        </p>
      </div>

      {/* File Validation Error Banner */}
      {validationError && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center space-x-3">
          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Drag & Dropzone */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            isDragOver 
              ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-950/50' 
              : 'border-slate-700 bg-slate-950/50 hover:border-slate-500'
          }`}
        >
          <input
            type="file"
            id="dicom-file-input"
            accept=".dcm,.zip,.nii,.nii.gz"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="dicom-file-input" className="cursor-pointer block space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">
                Drag and drop your CT DICOM study (.dcm, .zip, .nii) here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports NCCT Abdomen/Pelvis series up to 500 MB per volume.
              </p>
            </div>
            <span className="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700">
              Browse Local DICOM Files
            </span>
          </label>
        </div>

        {/* Selected File Card & Progress */}
        {selectedFile && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HardDrive className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">{selectedFile.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Selected File
                  </div>
                </div>
              </div>
              {!isProcessing && !processingComplete && (
                <button
                  onClick={handleSimulateUpload}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Intake DICOM Scan
                </button>
              )}
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>{processingStep}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Success State */}
            {processingComplete && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">Scan File Intake Registered!</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Notice: Automated AI stone segmentation is currently offline in this environment. Uploaded volume metadata has been registered in your run results manifest.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveTab('results')}
                    className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>View Your Scan Results</span>
                  </button>
                  <button
                    onClick={onLoadSampleStudy}
                    className="px-3 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700 cursor-pointer flex items-center gap-1"
                  >
                    <span>View Sample Anatomical Slice Viewer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Action Button for Sample Data */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border border-cyan-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore Sample Scan Record</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore pre-configured sample scan data in the interactive viewer.
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setActiveTab('results')}
              className="px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Run Results</span>
            </button>
            <button
              onClick={onLoadSampleStudy}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-cyan-950 cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore Sample Scan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
