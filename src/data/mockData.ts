import { Patient, CTStudy } from '../types';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'PAT-8812',
    mrn: 'ANV-2026-8812',
    name: 'Aarav Patel (My Profile)',
    age: 45,
    gender: 'Male',
    contact: '+91 98765 43210',
    riskCategory: 'High',
    medicalHistory: 'History of recurrent renal calculi (2022, 2024). Known hypercalciuria. Previous MET trial.',
    registeredDate: '2026-01-15',
    lastStudyDate: '2026-09-20',
    totalStudiesCount: 3,
  },
  {
    id: 'PAT-8813',
    mrn: 'ANV-2026-8813',
    name: 'Priya Sharma (Family Record)',
    age: 38,
    gender: 'Female',
    contact: '+91 98123 55432',
    riskCategory: 'Moderate',
    medicalHistory: 'Right flank pain radiating to groin for 3 days. Microscopic hematuria.',
    registeredDate: '2026-02-10',
    lastStudyDate: '2026-09-22',
    totalStudiesCount: 2,
  },
  {
    id: 'PAT-8814',
    mrn: 'ANV-2026-8814',
    name: 'Rajesh Verma (Family Record)',
    age: 52,
    gender: 'Male',
    contact: '+91 97654 32109',
    riskCategory: 'Critical',
    medicalHistory: 'Acute left renal colic, severe dysuria, fever (38.2 C). Grade 2 hydronephrosis on ultrasound.',
    registeredDate: '2026-03-04',
    lastStudyDate: '2026-09-25',
    totalStudiesCount: 4,
  },
  {
    id: 'PAT-8815',
    mrn: 'ANV-2026-8815',
    name: 'Sunita Reddy (Family Record)',
    age: 29,
    gender: 'Female',
    contact: '+91 96543 21098',
    riskCategory: 'Low',
    medicalHistory: 'Incidental 3mm lower pole non-obstructive calculus on screening CT.',
    registeredDate: '2026-05-18',
    lastStudyDate: '2026-09-18',
    totalStudiesCount: 1,
  },
  {
    id: 'PAT-8816',
    mrn: 'ANV-2026-8816',
    name: 'Vikram Singh (Family Record)',
    age: 61,
    gender: 'Male',
    contact: '+91 95432 10987',
    riskCategory: 'Moderate',
    medicalHistory: 'History of gout and hyperuricemia. Chronic stone former.',
    registeredDate: '2026-06-21',
    lastStudyDate: '2026-09-24',
    totalStudiesCount: 2,
  },
];

export const INITIAL_STUDIES: CTStudy[] = [
  {
    id: 'STD-9901',
    studyUid: '1.2.840.113619.2.55.3.42589.20260925.100122',
    patientId: 'PAT-8814',
    patientMrn: 'ANV-2026-8814',
    patientName: 'Rajesh Verma (Family Record)',
    patientAge: 52,
    patientGender: 'Male',
    studyDate: '2026-09-25 14:30',
    modality: 'NCCT Abdomen & Pelvis (Non-Contrast)',
    scannerModel: 'Siemens SOMATOM Force 64-Slice',
    sliceThicknessMm: 0.625,
    sliceCount: 240,
    kvp: 120,
    ma: 195,
    status: 'Pending Review',
    primaryStoneLocation: 'Left UPJ',
    maxStoneSizeMm: 8.4,
    maxStoneHU: 960,
    findings: [
      {
        id: 'FND-01',
        location: 'Left UPJ',
        maxDiameterMm: 8.4,
        volumeMm3: 188,
        densityHU: 960,
        compositionEstimate: 'Calcium Oxalate',
        hydronephrosisGrade: 'Grade 2 (Moderate)',
        sliceIndex: 68,
        roiBoundingBox: { x: 42, y: 38, width: 16, height: 16 },
      },
      {
        id: 'FND-02',
        location: 'Right Lower Calyx',
        maxDiameterMm: 3.2,
        volumeMm3: 24,
        densityHU: 620,
        compositionEstimate: 'Calcium Oxalate',
        hydronephrosisGrade: 'Grade 0 (None)',
        sliceIndex: 92,
        roiBoundingBox: { x: 70, y: 44, width: 10, height: 10 },
      }
    ],
  },
  {
    id: 'STD-9902',
    studyUid: '1.2.840.113619.2.55.3.42589.20260924.112044',
    patientId: 'PAT-8816',
    patientMrn: 'ANV-2026-8816',
    patientName: 'Vikram Singh (Family Record)',
    patientAge: 61,
    patientGender: 'Male',
    studyDate: '2026-09-24 11:15',
    modality: 'NCCT Renal Protocol',
    scannerModel: 'GE Revolution CT 128-Slice',
    sliceThicknessMm: 1.0,
    sliceCount: 180,
    kvp: 100,
    ma: 160,
    status: 'In Review',
    primaryStoneLocation: 'Right Vesicoureteral Junction (UVJ)',
    maxStoneSizeMm: 6.2,
    maxStoneHU: 480,
    findings: [
      {
        id: 'FND-03',
        location: 'Right Vesicoureteral Junction (UVJ)',
        maxDiameterMm: 6.2,
        volumeMm3: 112,
        densityHU: 480,
        compositionEstimate: 'Uric Acid',
        hydronephrosisGrade: 'Grade 1 (Mild)',
        sliceIndex: 54,
        roiBoundingBox: { x: 58, y: 62, width: 14, height: 14 },
      }
    ],
    clinicianReview: {
      reviewedBy: 'Certified Radiologist Consultation',
      reviewedAt: '2026-09-24 16:45',
      reviewStatus: 'In Review',
      clinicalImpression: 'Impaction at right UVJ causing mild proximal ureterostasis. Low HU (480) suggests probable uric acid calculus suitable for alkalinization therapy.',
      recommendedActions: [
        'Initiate Medical Expulsive Therapy (Tamsulosin 0.4mg)',
        'Oral Urinary Alkalinization (Potassium Citrate)',
        'Hydration Protocol (3L/day)'
      ],
      signatureHash: 'SHA256-REF-882A-991F'
    }
  },
  {
    id: 'STD-9903',
    studyUid: '1.2.840.113619.2.55.3.42589.20260922.091500',
    patientId: 'PAT-8813',
    patientMrn: 'ANV-2026-8813',
    patientName: 'Priya Sharma (Family Record)',
    patientAge: 38,
    patientGender: 'Female',
    studyDate: '2026-09-22 09:00',
    modality: 'NCCT KUB Protocol',
    scannerModel: 'Philips Brilliance iCT 256-Slice',
    sliceThicknessMm: 0.5,
    sliceCount: 300,
    kvp: 120,
    ma: 210,
    status: 'Approved',
    primaryStoneLocation: 'Right Mid-Kidney',
    maxStoneSizeMm: 4.8,
    maxStoneHU: 810,
    findings: [
      {
        id: 'FND-04',
        location: 'Right Mid-Kidney',
        maxDiameterMm: 4.8,
        volumeMm3: 65,
        densityHU: 810,
        compositionEstimate: 'Calcium Oxalate',
        hydronephrosisGrade: 'Grade 0 (None)',
        sliceIndex: 75,
        roiBoundingBox: { x: 35, y: 50, width: 12, height: 12 },
      }
    ],
    clinicianReview: {
      reviewedBy: 'Specialist Urology Consultation',
      reviewedAt: '2026-09-22 14:10',
      reviewStatus: 'Approved',
      clinicalImpression: 'Single non-obstructive 4.8mm calculus in right mid-kidney calyx. No obstruction or inflammation.',
      recommendedActions: [
        'Conservative Outpatient Management',
        'Follow-up Ultrasound in 6 months'
      ],
      signatureHash: 'SHA256-REF-994C-112B'
    }
  },
  {
    id: 'STD-9904',
    studyUid: '1.2.840.113619.2.55.3.42589.20260920.154512',
    patientId: 'PAT-8812',
    patientMrn: 'ANV-2026-8812',
    patientName: 'Aarav Patel (My Profile)',
    patientAge: 45,
    patientGender: 'Male',
    studyDate: '2026-09-20 15:45',
    modality: 'NCCT Abdomen & Pelvis',
    scannerModel: 'Canon Aquilion ONE Dual Source',
    sliceThicknessMm: 0.625,
    sliceCount: 220,
    kvp: 120,
    ma: 185,
    status: 'Flagged',
    primaryStoneLocation: 'Right Upper Calyx',
    maxStoneSizeMm: 11.5,
    maxStoneHU: 1120,
    findings: [
      {
        id: 'FND-05',
        location: 'Right Upper Calyx',
        maxDiameterMm: 11.5,
        volumeMm3: 420,
        densityHU: 1120,
        compositionEstimate: 'Calcium Oxalate',
        hydronephrosisGrade: 'Grade 1 (Mild)',
        sliceIndex: 42,
        roiBoundingBox: { x: 32, y: 28, width: 22, height: 22 },
      }
    ],
    clinicianReview: {
      reviewedBy: 'Specialist Urology Review',
      reviewedAt: '2026-09-21 09:30',
      reviewStatus: 'Flagged',
      clinicalImpression: 'Large 11.5mm high-density calculus (>1100 HU). High density and location suggest low success rate for ESWL. Recommend surgical evaluation (Flexible Ureteroscopy / RIRS).',
      recommendedActions: [
        'Urology Consultation for RIRS / Laser Lithotripsy',
        '24-hour Urine Metabolic Panel'
      ],
      signatureHash: 'SHA256-REF-773D-004A'
    }
  }
];

export const INITIAL_RUN_RESULT = {
  batchId: 'BATCH-2026-0927-9901',
  timestamp: '2026-09-27 19:00:00',
  durationSeconds: 3.62,
  status: 'success' as const,
  requestedSampleCount: 1,
  generatedSampleCount: 1,
  modality: 'NCCT Abdomen & Pelvis (Non-Contrast)',
  dimensions: '512 x 512 x 240 voxels',
  fileFormat: 'DICOM (.dcm) & NIfTI (.nii.gz)',
  modelName: 'Anvesha MONAI 3D-UNet Segmentation Pipeline',
  outputLocation: '/exports/results/STD-9901/',
  successfulSamples: ['STD-9901_volume_01.nii.gz'],
  failedSamples: [],
  outputFiles: [
    'STD-9901_segmentation_mask.nii.gz',
    'STD-9901_stone_metrics.json',
    'STD-9901_summary_manifest.json'
  ],
  datasetSizeBytes: 50855936, // ~48.5 MB
  missingOutputs: [],
  warnings: [
    'Scan Intake Notice: Processing executed in client environment.',
    'Educational Output: Results provided for personal health monitoring.'
  ],
  isDemoData: false,
};


