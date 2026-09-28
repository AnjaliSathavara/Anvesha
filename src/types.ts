export type ReviewStatus = 'Pending Review' | 'In Review' | 'Approved' | 'Flagged' | 'Needs Verification';
export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type ExecutionStatus = 'success' | 'failure' | 'partial_completion';

export type StoneLocation = 
  | 'Right Upper Calyx' 
  | 'Right Mid-Kidney' 
  | 'Right Lower Calyx' 
  | 'Right Ureteropelvic Junction (UPJ)' 
  | 'Right Mid-Ureter' 
  | 'Right Vesicoureteral Junction (UVJ)' 
  | 'Left Upper Calyx' 
  | 'Left Mid-Kidney' 
  | 'Left Lower Calyx' 
  | 'Left UPJ' 
  | 'Left Mid-Ureter' 
  | 'Left UVJ' 
  | 'Bladder';

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  riskCategory: RiskLevel;
  medicalHistory: string;
  registeredDate: string;
  lastStudyDate: string;
  totalStudiesCount: number;
}

export interface StoneFinding {
  id: string;
  location: StoneLocation;
  maxDiameterMm: number;
  volumeMm3: number;
  densityHU: number; // Hounsfield Units
  compositionEstimate: 'Calcium Oxalate' | 'Uric Acid' | 'Struvite' | 'Cystine' | 'Indeterminate';
  hydronephrosisGrade: 'Grade 0 (None)' | 'Grade 1 (Mild)' | 'Grade 2 (Moderate)' | 'Grade 3 (Severe)';
  sliceIndex: number;
  roiBoundingBox: { x: number; y: number; width: number; height: number };
}

export interface CTStudy {
  id: string;
  studyUid: string;
  patientId: string;
  patientMrn: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  studyDate: string;
  modality: string; // e.g. "NCCT Abdomen/Pelvis"
  scannerModel: string;
  sliceThicknessMm: number;
  sliceCount: number;
  kvp: number;
  ma: number;
  status: ReviewStatus;
  primaryStoneLocation: StoneLocation;
  maxStoneSizeMm: number;
  maxStoneHU: number;
  findings: StoneFinding[];
  clinicianReview?: ClinicianReview;
}

export interface ClinicianReview {
  reviewedBy: string; // e.g. "Dr. Ananya Sharma, MD"
  reviewedAt: string;
  reviewStatus: ReviewStatus;
  clinicalImpression: string;
  recommendedActions: string[];
  signatureHash: string;
}

export interface DashboardMetrics {
  totalPatients: number;
  totalStudies: number;
  pendingReviews: number;
  completedReviews: number;
  highRiskCases: number;
}

export interface GenerationRunResult {
  batchId: string;
  timestamp: string;
  durationSeconds: number;
  status: ExecutionStatus;
  requestedSampleCount: number;
  generatedSampleCount: number;
  modality: string;
  dimensions: string;
  fileFormat: string;
  modelName: string;
  outputLocation: string;
  successfulSamples: string[];
  failedSamples: string[];
  outputFiles: string[];
  datasetSizeBytes: number;
  missingOutputs: string[];
  warnings: string[];
  fileName?: string;
  fileSizeMb?: number;
  evalMetrics?: {
    ssim?: number;
    psnr?: number;
    mse?: number;
    mae?: number;
  };
  isDemoData: boolean;
}
