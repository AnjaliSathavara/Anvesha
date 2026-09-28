import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Filter, 
  X, 
  ChevronRight, 
  FileText, 
  AlertCircle, 
  ShieldAlert,
  Calendar,
  Phone,
  Activity,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { Patient, RiskLevel } from '../types';

interface PatientManagementProps {
  patients: Patient[];
  onAddPatient: (newPatient: Patient) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  searchQuery: string;
}

export const PatientManagement: React.FC<PatientManagementProps> = ({
  patients,
  onAddPatient,
  isAddModalOpen,
  setIsAddModalOpen,
  searchQuery,
}) => {
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Form local state
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState<number | ''>('');
  const [formGender, setFormGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [formMrn, setFormMrn] = useState(`ANV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [formContact, setFormContact] = useState('+91 98');
  const [formRisk, setFormRisk] = useState<RiskLevel>('Moderate');
  const [formHistory, setFormHistory] = useState('');
  const [formError, setFormError] = useState('');

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = filterRisk === 'ALL' || patient.riskCategory === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const handleSubmitPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAge || formAge <= 0) {
      setFormError('Please fill in a valid profile name and age.');
      return;
    }

    const newPatientObj: Patient = {
      id: `PAT-${Math.floor(8800 + Math.random() * 200)}`,
      mrn: formMrn,
      name: `${formName.trim()} (Family Record)`,
      age: Number(formAge),
      gender: formGender,
      contact: formContact,
      riskCategory: formRisk,
      medicalHistory: formHistory || 'No prior CT scans recorded in profile.',
      registeredDate: new Date().toISOString().split('T')[0],
      lastStudyDate: new Date().toISOString().split('T')[0],
      totalStudiesCount: 1,
    };

    onAddPatient(newPatientObj);
    setIsAddModalOpen(false);

    // Reset Form
    setFormName('');
    setFormAge('');
    setFormHistory('');
    setFormError('');
    setFormMrn(`ANV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Heart className="w-5 h-5 text-cyan-400" />
            <span>My Health Records & Profiles</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage personal health profiles, medical history, and CT scan record timelines.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950 transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Health Profile</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-300">Filter Risk Level:</span>
          {['ALL', 'Critical', 'High', 'Moderate', 'Low'].map((risk) => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterRisk === risk
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredPatients.length} of {patients.length} profiles
        </div>
      </div>

      {/* Health Directory Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] font-semibold text-slate-400 uppercase bg-slate-900/90 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Profile Name & Record ID</th>
                <th className="px-4 py-3">Age / Gender</th>
                <th className="px-4 py-3">Stone Concern Level</th>
                <th className="px-4 py-3">Last Scan Date</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No matching health records found in database.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <div className="text-slate-100 font-semibold">{patient.name}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">Record ID: {patient.mrn}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {patient.age} yrs • {patient.gender}
                    </td>
                    <td className="px-4 py-3">
                      <RiskBadge level={patient.riskCategory} />
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono">
                      {patient.lastStudyDate}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {patient.contact}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal / Drawer */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPatient(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center font-bold text-lg">
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <span>{selectedPatient.name}</span>
                  <RiskBadge level={selectedPatient.riskCategory} />
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  Record ID: {selectedPatient.mrn} • Profile ID: {selectedPatient.id}
                </p>
              </div>
            </div>

            {/* Demographics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-500 block">Age / Gender</span>
                <span className="font-semibold text-slate-200">{selectedPatient.age} yrs • {selectedPatient.gender}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Primary Contact</span>
                <span className="font-semibold text-slate-200">{selectedPatient.contact}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Registered Date</span>
                <span className="font-semibold text-slate-200 font-mono">{selectedPatient.registeredDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Scans</span>
                <span className="font-semibold text-cyan-400">{selectedPatient.totalStudiesCount} Scans</span>
              </div>
            </div>

            {/* Medical History */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Health Notes & Medical History</h4>
              <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                {selectedPatient.medicalHistory}
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">CT Scan Record Timeline</h4>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-mono text-cyan-400">NCCT Abdomen & Pelvis</span>
                  <span className="text-slate-500">{selectedPatient.lastStudyDate}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Non-contrast CT scan evaluated by Anvesha platform. Stone analysis record stored.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal Form */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                <span>Add New Personal / Family Health Profile</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter details to create a personal health record for kidney health tracking.
              </p>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitPatient} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Profile Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Age (Years) *</label>
                  <input
                    type="number"
                    placeholder="42"
                    value={formAge}
                    onChange={(e) => setFormAge(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Gender *</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as any)}
                    className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Generated Record ID</label>
                  <input
                    type="text"
                    value={formMrn}
                    readOnly
                    className="w-full bg-slate-950/60 text-cyan-400 font-mono rounded-xl px-3 py-2 border border-slate-800 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Calculus Risk Category *</label>
                  <select
                    value={formRisk}
                    onChange={(e) => setFormRisk(e.target.value as RiskLevel)}
                    className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Low">Low Concern</option>
                    <option value="Moderate">Moderate Concern</option>
                    <option value="High">High Concern</option>
                    <option value="Critical">Severe / Obstructive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={formContact}
                  onChange={(e) => setFormContact(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Medical History & Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g., History of stone formation, flank pain..."
                  value={formHistory}
                  onChange={(e) => setFormHistory(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-950"
                >
                  Save Health Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  switch (level) {
    case 'Critical':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
          Severe
        </span>
      );
    case 'High':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
          High Concern
        </span>
      );
    case 'Moderate':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-950 text-sky-300 border border-sky-800">
          Moderate
        </span>
      );
    default:
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
          Low Concern
        </span>
      );
  }
};
