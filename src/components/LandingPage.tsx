import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Droplets, 
  FileText, 
  FileCheck, 
  ShieldCheck, 
  Users, 
  Upload, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Sun, 
  Moon, 
  LogIn, 
  UserPlus, 
  Menu, 
  X, 
  Info,
  ChevronRight,
  PieChart,
  Clock,
  Stethoscope
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenDisclaimer: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  theme,
  onToggleTheme,
  onOpenDisclaimer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 transition-colors">
      
      {/* ==================================================
          1. PUBLIC LANDING HEADER
          ================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 lg:px-8 py-3.5 transition-colors shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-400 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  ANVESHA
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
                Kidney Health Intelligence Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={onOpenDisclaimer} 
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Info & Medical Disclaimer</span>
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-600" />
              )}
            </button>

            {/* Log In Button */}
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold border border-slate-300 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Log In</span>
            </button>

            {/* Get Started / Sign Up Button */}
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-4.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 dark:shadow-cyan-900/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 pb-2 text-xs font-medium">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              How It Works
            </button>
            <button
              onClick={onOpenDisclaimer}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Info & Medical Disclaimer</span>
            </button>
            <div className="pt-2 flex flex-col space-y-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth('signup'); }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold shadow flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==================================================
          2. HERO SECTION
          ================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-4 lg:px-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/80 text-cyan-900 dark:text-cyan-300 text-xs font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Patient-Centric Kidney Health Monitoring</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-100">
              Understand Your Kidney Health.{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 dark:from-cyan-400 dark:via-teal-300 dark:to-sky-400 bg-clip-text text-transparent">
                Take Control.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              Anvesha is your personal kidney health monitoring and CT scan management platform. Track your scan records, review stone density and location summaries, log hydration, and export health reports—all in one clear, organized place.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/20 dark:shadow-cyan-900/30 transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Log In to Account</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4 text-slate-700 dark:text-slate-400 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Personal Scan Records</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Hydration Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Printable Reports</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl border border-cyan-200 dark:border-cyan-800/60 shadow-xl dark:shadow-2xl bg-white dark:bg-slate-900 relative">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">Personal Health Telemetry</h3>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400">Kidney Monitoring Dashboard Preview</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                  LIVE OVERVIEW
                </span>
              </div>

              {/* Sample Metrics Cards inside Visual */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-600 dark:text-teal-400">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200 block">CT Scan Records</span>
                      <span className="text-[10px] text-slate-600 dark:text-slate-400">Calculus Density & Location Summary</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">Organized</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200 block">Daily Hydration Log</span>
                      <span className="text-[10px] text-slate-600 dark:text-slate-400">2,500 mL Target</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">85% Goal</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200 block">Physician Summary Report</span>
                      <span className="text-[10px] text-slate-600 dark:text-slate-400">Ready for Urologist Review</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400">Ready</span>
                </div>
              </div>

              {/* Patient Note */}
              <div className="mt-4 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-[11px] text-cyan-900 dark:text-cyan-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Keep your personal health data organized for doctor discussions.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          3. FEATURES SECTION
          ================================================== */}
      <section id="features" className="py-16 px-4 lg:px-8 bg-slate-100/80 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Designed for Patient Awareness & Monitoring
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Explore patient-tailored tools to monitor kidney health metrics, organize scan summaries, track fluid intake, and prepare for medical visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 shadow-sm dark:shadow-none transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Personal Kidney Health Dashboard</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Centralized overview of your personal health records, active scan history, key stone metrics, and upcoming appointment notifications.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 shadow-sm dark:shadow-none transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 flex items-center justify-center text-teal-700 dark:text-teal-400">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Scan Records & Summaries</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Organized directory of CT DICOM scan records detailing calculus dimensions, Hounsfield Unit (HU) stone density, and renal location annotations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 shadow-sm dark:shadow-none transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-sky-700 dark:text-sky-400">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Hydration Tracking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Monitor your daily fluid intake against recommended target hydration goals essential for kidney stone prevention and management.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 shadow-sm dark:shadow-none transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Symptom Tracking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Log discomfort, pain episodes, and urinary symptoms to keep an accurate timeline for your personal records and doctor consultations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 shadow-sm dark:shadow-none transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 flex items-center justify-center text-teal-700 dark:text-teal-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Health Reports & Export</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate structured, printable health summaries and scan documentation ready to share directly with your treating urologist.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 shadow-sm dark:shadow-none transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-sky-700 dark:text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Privacy & Profile Security</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Manage personal and family health profiles under single or multiple health records with persistent browser and cloud data controls.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          4. HOW IT WORKS SECTION
          ================================================== */}
      <section id="how-it-works" className="py-16 px-4 lg:px-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Simple 4-Step Patient Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              How Anvesha helps you organize your scan data and stay informed about your kidney health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none relative space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 text-cyan-900 dark:text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Create Account</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Register your free account and set up your personal health profile and monitoring preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none relative space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 border border-teal-300 dark:border-teal-800 text-teal-900 dark:text-teal-300 font-mono font-bold text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Upload CT Scan</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Upload CT DICOM files or load sample scan records to access organized calculus analysis.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none relative space-y-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-300 font-mono font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Monitor Metrics</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Track daily hydration goals, view stone density guides (HU), and keep a record of symptoms.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none relative space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 text-cyan-900 dark:text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Consult Specialist</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Export printable summary reports to share informed data during your physician consultation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          5. CTA BANNER
          ================================================== */}
      <section className="py-14 px-4 lg:px-8 bg-gradient-to-r from-cyan-900 via-teal-900 to-slate-900 dark:from-cyan-950 dark:via-slate-900 dark:to-teal-950 text-white border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Manage Your Kidney Health Records?
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join Anvesha today to organize your CT scans, track daily hydration, and access structured health reports.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-lg cursor-pointer flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Free Account</span>
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <LogIn className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. FOOTER WITH MEDICAL DISCLAIMER
          ================================================== */}
      <footer className="mt-auto bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-10 px-4 lg:px-8 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-bold text-slate-900 dark:text-slate-200 text-sm tracking-tight">ANVESHA</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Patient-facing kidney stone intelligence and personal health monitoring platform for organized scan records and health tracking.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">Quick Links</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">Home</button></li>
                <li><button onClick={() => scrollToSection('features')} className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">Features</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">How It Works</button></li>
                <li><button onClick={onOpenDisclaimer} className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">Medical Disclaimer</button></li>
              </ul>
            </div>

            {/* Account Links */}
            <div className="md:col-span-4 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">Patient Access</h4>
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 text-xs border border-slate-300 dark:border-slate-800 font-medium"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Health Information Disclaimer */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-900 text-[11px] leading-relaxed text-slate-600 dark:text-slate-500 space-y-1">
            <p className="font-semibold text-slate-900 dark:text-slate-300">Medical & Health Information Disclaimer:</p>
            <p>
              Anvesha is a personal health monitoring and scan-record management platform designed for patient awareness and record organization. It does not provide automated medical diagnosis, clinical treatment recommendations, or replace professional evaluation by a qualified physician or urologist. Always consult your healthcare provider for medical concerns.
            </p>
            <p className="pt-2 text-slate-500 dark:text-slate-600">
              © {new Date().getFullYear()} Anvesha Health. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
