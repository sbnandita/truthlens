import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import NewsInputDashboard from './components/NewsInputDashboard';
import ResultsDashboard from './components/ResultsDashboard';
import HistoryView from './components/features/HistoryView';
import UserDashboard from './components/features/UserDashboard';
import AnalysisProgressModal from './components/AnalysisProgressModal';
import SmartReportModal from './components/features/SmartReportModal';
import FeedbackModal from './components/features/FeedbackModal';
import Footer from './components/Footer';

import { translations } from './i18n/translations';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'verify' | 'results' | 'history' | 'dashboard'
  const [language, setLanguage] = useState('en'); // 'en' | 'ta'
  
  const [inputText, setInputText] = useState('');
  const [inputType, setInputType] = useState('headline');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeReport, setActiveReport] = useState(null);
  const [duplicateMatch, setDuplicateMatch] = useState(null);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const t = translations[language] || translations.en;

  // Debounced duplicate detection as user types
  useEffect(() => {
    if (!inputText || inputText.trim().length < 15) {
      setDuplicateMatch(null);
      return;
    }

    const timer = setTimeout(() => {
      fetch('/api/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText.trim() })
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.has_duplicate) {
            setDuplicateMatch(data.match);
          } else {
            setDuplicateMatch(null);
          }
        })
        .catch(() => setDuplicateMatch(null));
    }, 600);

    return () => clearTimeout(timer);
  }, [inputText]);

  // Main verification trigger
  const handleAnalyse = async (textToVerify, formatType) => {
    const text = textToVerify || inputText;
    const format = formatType || inputType;
    if (!text.trim()) return;

    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          input_type: format,
          language: language
        })
      });

      const data = await res.json();
      if (res.ok) {
        // Keep animation active for at least 2.5 seconds to display the 6 stages cleanly
        setTimeout(() => {
          setActiveReport(data);
          setIsAnalyzing(false);
          setCurrentView('results');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2700);
      } else {
        alert(data.error || 'Verification encountered an error.');
        setIsAnalyzing(false);
      }
    } catch (err) {
      alert('Unable to connect to TruthLens backend on port 5000.');
      setIsAnalyzing(false);
    }
  };

  // 1-Click sample launcher from Landing Page
  const handleSelectSample = (sample) => {
    const text = (language === 'ta' && sample.text_ta) ? sample.text_ta : sample.text;
    setInputText(text);
    setInputType(sample.type || 'headline');
    setCurrentView('verify');
    setTimeout(() => {
      handleAnalyse(text, sample.type || 'headline');
    }, 150);
  };

  // Open saved report from history or duplicate alert
  const handleSelectReport = async (reportId) => {
    try {
      const res = await fetch(`/api/history/${reportId}`);
      const data = await res.json();
      if (res.ok) {
        setActiveReport(data);
        setCurrentView('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle bookmark
  const handleToggleBookmark = async (id) => {
    try {
      const res = await fetch(`/api/history/${id}/bookmark`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && activeReport && activeReport.id === id) {
        setActiveReport(prev => ({ ...prev, is_bookmarked: data.is_bookmarked }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-espresso text-cream flex flex-col font-sans selection:bg-cappuccino selection:text-espresso">
      
      {/* Top Sticky Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Main App View Routing */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            setCurrentView={setCurrentView}
            onSelectSample={handleSelectSample}
            t={t}
            language={language}
          />
        )}

        {currentView === 'verify' && (
          <NewsInputDashboard
            inputText={inputText}
            setInputText={setInputText}
            inputType={inputType}
            setInputType={setInputType}
            onAnalyse={handleAnalyse}
            isAnalyzing={isAnalyzing}
            duplicateMatch={duplicateMatch}
            onViewDuplicate={handleSelectReport}
            t={t}
            language={language}
          />
        )}

        {currentView === 'results' && activeReport && (
          <ResultsDashboard
            report={activeReport}
            onReset={() => {
              setInputText('');
              setActiveReport(null);
              setCurrentView('verify');
            }}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onOpenFeedbackModal={() => setIsFeedbackModalOpen(true)}
            onToggleBookmark={handleToggleBookmark}
            t={t}
            language={language}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            onSelectReport={handleSelectReport}
            t={t}
            language={language}
          />
        )}

        {currentView === 'dashboard' && (
          <UserDashboard
            setCurrentView={setCurrentView}
            onSelectReport={handleSelectReport}
            t={t}
            language={language}
          />
        )}
      </main>

      {/* 6-Stage Analysis Progress Modal */}
      <AnalysisProgressModal
        isOpen={isAnalyzing}
        t={t}
      />

      {/* Smart Printable PDF Report Modal */}
      <SmartReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={activeReport}
        t={t}
        language={language}
      />

      {/* User Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        verificationId={activeReport?.id}
        t={t}
      />

      {/* Global Footer */}
      <Footer
        setCurrentView={setCurrentView}
        t={t}
      />

    </div>
  );
}
