import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PatientManagement } from './components/PatientManagement';
import { StudyManagement } from './components/StudyManagement';
import { ScanUpload } from './components/ScanUpload';
import { FinalResults } from './components/FinalResults';
import { FindingsReview } from './components/FindingsReview';
import { Reports } from './components/Reports';
import { DemoDisclaimerModal } from './components/DemoDisclaimerModal';
import { AuthModal } from './components/AuthModal';
import { Patient, CTStudy, GenerationRunResult } from './types';
import { INITIAL_PATIENTS, INITIAL_STUDIES, INITIAL_RUN_RESULT } from './data/mockData';
import { supabase } from './lib/supabase';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeClinician, setActiveClinician] = useState<string>('Aarav Patel (My Profile)');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState<boolean>(false);

  // Accessible Theme State (Light / Dark)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('anvesha_theme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
  });

  // Supabase Auth State
  const [authUser, setAuthUser] = useState<any | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('anvesha_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Check initial Supabase Auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user ?? null);
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Persistent Local State for Patients
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('anvesha_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  // Persistent Local State for CT Studies
  const [studies, setStudies] = useState<CTStudy[]>(() => {
    const saved = localStorage.getItem('anvesha_studies');
    return saved ? JSON.parse(saved) : INITIAL_STUDIES;
  });

  // Persistent Local State for Pipeline Run Result
  const [runResult, setRunResult] = useState<GenerationRunResult>(() => {
    const saved = localStorage.getItem('anvesha_run_result');
    return saved ? JSON.parse(saved) : INITIAL_RUN_RESULT;
  });

  // Selected Study for Review & Report
  const [selectedStudy, setSelectedStudy] = useState<CTStudy>(() => {
    return studies[0] || INITIAL_STUDIES[0];
  });

  useEffect(() => {
    localStorage.setItem('anvesha_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('anvesha_studies', JSON.stringify(studies));
  }, [studies]);

  useEffect(() => {
    localStorage.setItem('anvesha_run_result', JSON.stringify(runResult));
  }, [runResult]);

  // Handler: Add Patient
  const handleAddPatient = (newPatient: Patient) => {
    setPatients([newPatient, ...patients]);
  };

  // Handler: Update Study Review
  const handleUpdateStudyReview = (updatedStudy: CTStudy) => {
    setStudies(studies.map(s => s.id === updatedStudy.id ? updatedStudy : s));
    setSelectedStudy(updatedStudy);
  };

  // Handler: Load Sample Synthetic Study from Upload
  const handleLoadSampleStudy = () => {
    setSelectedStudy(studies[0]);
    setActiveTab('findings');
  };

  // Handler: Run Finished from Upload -> Updates Run Result & Allows Navigation to Results
  const handleRunFinished = (fileDetails?: { fileName: string; fileSize: number }) => {
    const newRunObj: GenerationRunResult = {
      ...INITIAL_RUN_RESULT,
      batchId: `BATCH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      durationSeconds: 3.62,
      status: 'success',
      fileName: fileDetails?.fileName || 'Uploaded_CT_Scan.dcm',
      fileSizeMb: fileDetails?.fileSize ? Number((fileDetails.fileSize / (1024 * 1024)).toFixed(2)) : 48.5,
      outputFiles: [
        fileDetails?.fileName ? `${fileDetails.fileName}.manifest.json` : 'Uploaded_CT_Scan.manifest.json',
        'scan_intake_metadata.json'
      ],
      isDemoData: false,
    };
    setRunResult(newRunObj);
  };

  const pendingCount = studies.filter(s => s.status === 'Pending Review' || s.status === 'In Review').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        activeClinician={activeClinician}
        setActiveClinician={setActiveClinician}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        onToggleTheme={toggleTheme}
        authUser={authUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingCount={pendingCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              patients={patients}
              studies={studies}
              setActiveTab={setActiveTab}
              onSelectStudy={(s) => setSelectedStudy(s)}
              onOpenAddPatient={() => {
                setActiveTab('patients');
                setIsAddPatientModalOpen(true);
              }}
            />
          )}

          {activeTab === 'patients' && (
            <PatientManagement
              patients={patients}
              onAddPatient={handleAddPatient}
              isAddModalOpen={isAddPatientModalOpen}
              setIsAddModalOpen={setIsAddPatientModalOpen}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'studies' && (
            <StudyManagement
              studies={studies}
              onSelectStudy={(s) => setSelectedStudy(s)}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'upload' && (
            <ScanUpload
              onLoadSampleStudy={handleLoadSampleStudy}
              setActiveTab={setActiveTab}
              onRunFinished={handleRunFinished}
            />
          )}

          {activeTab === 'results' && (
            <FinalResults
              runResult={runResult}
              setActiveTab={setActiveTab}
              onResetUpload={() => setActiveTab('upload')}
            />
          )}

          {activeTab === 'findings' && (
            <FindingsReview
              study={selectedStudy}
              onUpdateStudyReview={handleUpdateStudyReview}
              activeClinician={activeClinician}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'reports' && (
            <Reports
              study={selectedStudy}
              activeClinician={activeClinician}
              setActiveTab={setActiveTab}
            />
          )}
        </main>
      </div>

      {/* Prototype Scope Information Modal */}
      <DemoDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      {/* Supabase Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={(user) => setAuthUser(user)}
      />
    </div>
  );
}

export default App;
