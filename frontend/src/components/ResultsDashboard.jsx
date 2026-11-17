import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  FileText, 
  Share2, 
  Bookmark, 
  Printer, 
  MessageSquare, 
  Clock, 
  ExternalLink, 
  Check, 
  RotateCcw,
  Sparkles,
  Layers,
  SplitSquareVertical,
  History,
  GitCompare,
  Compass,
  AlertCircle
} from 'lucide-react';

import ClaimByClaimView from './innovations/ClaimByClaimView';
import OldNewsAlert from './innovations/OldNewsAlert';
import EvidenceComparisonPanel from './innovations/EvidenceComparisonPanel';
import SourceReliabilityChecker from './innovations/SourceReliabilityChecker';
import MissingContextDetector from './innovations/MissingContextDetector';
import NewsContextTimeline from './innovations/NewsContextTimeline';
import AskTruthLensAI from './features/AskTruthLensAI';

export default function ResultsDashboard({ 
  report, 
  onReset, 
  onOpenReportModal, 
  onOpenFeedbackModal, 
  onToggleBookmark, 
  t, 
  language 
}) {
  const [activeTab, setActiveTab] = useState('claims');
  const [copied, setCopied] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  if (!report) return null;

  const score = report.credibility_score || 50;
  const factors = report.score_factors || {
    evidence_quality: 18,
    source_authority: 20,
    context_freshness: 18,
    scope_consistency: 18
  };

  const getVerdictStyle = (verdict) => {
    switch (verdict) {
      case 'Likely Reliable':
        return {
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-600/40',
          icon: ShieldCheck
        };
      case 'Misleading':
        return {
          badge: 'bg-amber-950/80 text-amber-300 border-amber-500/50',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/40',
          icon: AlertTriangle
        };
      case 'Likely False':
        return {
          badge: 'bg-rose-950/80 text-rose-300 border-rose-600/50',
          textColor: 'text-rose-400',
          borderColor: 'border-rose-600/40',
          icon: XCircle
        };
      default:
        return {
          badge: 'bg-stone-900 text-stone-300 border-stone-600',
          textColor: 'text-stone-300',
          borderColor: 'border-stone-600',
          icon: HelpCircle
        };
    }
  };

  const verdictStyle = getVerdictStyle(report.verdict);
  const VerdictIcon = verdictStyle.icon;

  const handleCopySummary = () => {
    const text = `[TruthLens Report] ${report.headline} - Verdict: ${report.verdict} (${report.credibility_score}/100). Summary: ${report.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'claims', label: t.tabClaims, icon: SplitSquareVertical, count: report.claims?.length },
    { id: 'old_news', label: t.tabOldNews, icon: History, alert: report.old_news?.is_old_news },
    { id: 'evidence', label: t.tabEvidence, icon: GitCompare },
    { id: 'sources', label: t.tabSources, icon: ShieldCheck, count: report.sources_catalog?.length },
    { id: 'missing_context', label: t.tabMissingContext, icon: AlertCircle, alert: report.missing_context?.has_missing_context },
    { id: 'timeline', label: t.tabTimeline, icon: Clock, count: report.timeline?.length },
    { id: 'ask_ai', label: t.tabAskAI, icon: Sparkles }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Action Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-coffee/40">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-cappuccino hover:text-cream transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Verify Another News Item</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={onOpenReportModal}
            className="px-3.5 py-1.5 rounded-lg bg-chocolate hover:bg-coffee text-cream text-xs font-semibold border border-coffee/70 flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-cappuccino" />
            <span>{t.downloadReport}</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="px-3.5 py-1.5 rounded-lg bg-chocolate hover:bg-coffee text-cream text-xs font-semibold border border-coffee/70 flex items-center space-x-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cappuccino" />}
            <span>{copied ? t.copied : t.copySummary}</span>
          </button>

          <button
            onClick={() => onToggleBookmark(report.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center space-x-1.5 transition-all ${
              report.is_bookmarked
                ? 'bg-cappuccino text-espresso border-cappuccino'
                : 'bg-chocolate hover:bg-coffee text-cream border-coffee/70'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{report.is_bookmarked ? t.bookmarked : t.bookmark}</span>
          </button>

          <button
            onClick={onOpenFeedbackModal}
            className="px-3.5 py-1.5 rounded-lg bg-chocolate hover:bg-coffee text-cream/80 hover:text-cream text-xs font-semibold border border-coffee/70 transition-colors"
          >
            {t.feedbackBtn}
          </button>

        </div>
      </div>

      {/* Main Credibility Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-chocolate/90 border ${verdictStyle.borderColor} shadow-soft-warm relative overflow-hidden`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Headline & Verification Details */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${verdictStyle.badge}`}>
                <VerdictIcon className="w-3.5 h-3.5" />
                <span>{report.verdict}</span>
              </span>

              <span className="text-[11px] font-mono text-cappuccino px-2.5 py-0.5 rounded-md bg-espresso/70 border border-coffee">
                {report.topic}
              </span>

              <span className="text-xs text-cream/60">
                {t.verifiedOn}: {report.verification_date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-cream leading-tight">
              {report.headline}
            </h1>

            {/* AI Executive Explanation */}
            <div className="p-4 rounded-xl bg-espresso/80 border border-coffee/60">
              <span className="text-[10px] uppercase font-bold text-cappuccino block mb-1">
                {t.executiveSummary}
              </span>
              <p className="text-xs sm:text-sm text-cream/90 leading-relaxed font-sans">
                {report.summary}
              </p>
            </div>

            {/* Collapsible Original Submission */}
            <div>
              <button
                type="button"
                onClick={() => setShowOriginal(!showOriginal)}
                className="text-xs text-cappuccino hover:underline font-semibold"
              >
                {showOriginal ? 'Hide original submitted text' : 'View original submitted text'}
              </button>
              {showOriginal && (
                <div className="mt-2 p-3.5 rounded-xl bg-espresso/60 border border-coffee/40 text-xs text-cream/70 font-mono italic leading-relaxed">
                  "{report.input_text}"
                </div>
              )}
            </div>

          </div>

          {/* Right: Explainable 0-100 Credibility Score Meter */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-espresso/90 border border-coffee/70 flex flex-col items-center text-center">
            
            <span className="text-[11px] uppercase font-bold text-cappuccino tracking-wider block">
              {t.credibilityScore}
            </span>

            {/* Circular / Large Gauge Display */}
            <div className="relative my-3 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-4 border-coffee/40 flex items-center justify-center relative">
                <div className="text-center">
                  <span className="text-4xl font-black text-cappuccino block">
                    {score}
                  </span>
                  <span className="text-[10px] text-cream/60 uppercase font-mono block">
                    out of 100
                  </span>
                </div>
              </div>
            </div>

            <span className="text-xs font-semibold text-cream mb-4">
              {report.verdict} Indicator
            </span>

            {/* 4 Pillars Breakdown Bars */}
            <div className="w-full space-y-2 pt-3 border-t border-coffee/40 text-left text-xs">
              
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-cream/70">{t.pillarEvidence}</span>
                  <span className="font-mono text-cappuccino">{factors.evidence_quality}/35</span>
                </div>
                <div className="h-1.5 rounded-full bg-coffee/40 overflow-hidden">
                  <div className="h-full bg-cappuccino" style={{ width: `${(factors.evidence_quality / 35) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-cream/70">{t.pillarAuthority}</span>
                  <span className="font-mono text-cappuccino">{factors.source_authority}/25</span>
                </div>
                <div className="h-1.5 rounded-full bg-coffee/40 overflow-hidden">
                  <div className="h-full bg-cappuccino" style={{ width: `${(factors.source_authority / 25) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-cream/70">{t.pillarFreshness}</span>
                  <span className="font-mono text-cappuccino">{factors.context_freshness}/20</span>
                </div>
                <div className="h-1.5 rounded-full bg-coffee/40 overflow-hidden">
                  <div className="h-full bg-cappuccino" style={{ width: `${(factors.context_freshness / 20) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-cream/70">{t.pillarScope}</span>
                  <span className="font-mono text-cappuccino">{factors.scope_consistency}/20</span>
                </div>
                <div className="h-1.5 rounded-full bg-coffee/40 overflow-hidden">
                  <div className="h-full bg-cappuccino" style={{ width: `${(factors.scope_consistency / 20) * 100}%` }} />
                </div>
              </div>

            </div>

            <p className="text-[10px] text-cream/50 mt-4 leading-tight">
              {t.scoreDisclaimer}
            </p>

          </div>

        </div>

      </div>

      {/* Navigation Tabs for the 6 Innovative Features + AI */}
      <div className="rounded-2xl bg-chocolate/80 border border-coffee/70 p-1.5 overflow-x-auto">
        <div className="flex items-center space-x-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-cappuccino text-espresso shadow-sm'
                    : 'text-cream/80 hover:text-cream hover:bg-espresso/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-espresso text-cappuccino' : 'bg-coffee text-cream'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {tab.alert && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab View Container */}
      <div className="rounded-3xl bg-chocolate/60 border border-coffee/70 p-6 sm:p-8 shadow-soft-warm min-h-[400px]">
        {activeTab === 'claims' && (
          <ClaimByClaimView claims={report.claims} t={t} language={language} />
        )}

        {activeTab === 'old_news' && (
          <OldNewsAlert oldNews={report.old_news} t={t} language={language} />
        )}

        {activeTab === 'evidence' && (
          <EvidenceComparisonPanel 
            supporting={report.supporting_evidence} 
            contradicting={report.contradicting_evidence} 
            t={t} 
            language={language} 
          />
        )}

        {activeTab === 'sources' && (
          <SourceReliabilityChecker sources={report.sources_catalog} t={t} language={language} />
        )}

        {activeTab === 'missing_context' && (
          <MissingContextDetector missingContext={report.missing_context} t={t} language={language} />
        )}

        {activeTab === 'timeline' && (
          <NewsContextTimeline timeline={report.timeline} t={t} language={language} />
        )}

        {activeTab === 'ask_ai' && (
          <AskTruthLensAI report={report} t={t} language={language} />
        )}
      </div>

    </div>
  );
}
