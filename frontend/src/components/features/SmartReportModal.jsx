import React, { useState } from 'react';
import { X, Printer, Share2, Check, Download, ShieldCheck, ExternalLink } from 'lucide-react';

export default function SmartReportModal({ isOpen, onClose, report, t, language }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !report) return null;

  const handleCopySummary = () => {
    const summaryText = `[TruthLens Verification Report]
Headline: ${report.headline}
Status: ${report.verdict} (Score: ${report.credibility_score}/100)
Verified On: ${report.verification_date}
Executive Summary: ${report.summary}

Claims Breakdown:
${report.claims.map((c, i) => `${i + 1}. ${c.statement} [${c.status}]`).join('\n')}

Verify more on TruthLens: Don't Just Read. Verify Before You Believe.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-chocolate border border-coffee/90 shadow-2xl overflow-hidden print-card my-8">
        
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print flex items-center justify-between p-4 bg-espresso border-b border-coffee/60">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-cappuccino" />
            <span className="text-xs font-bold text-cream uppercase tracking-wider">
              {t.downloadReport}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg bg-chocolate hover:bg-coffee text-cream text-xs font-semibold border border-coffee/70 flex items-center space-x-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cappuccino" />}
              <span>{copied ? t.copied : t.copySummary}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-cappuccino text-espresso text-xs font-bold hover:bg-cream flex items-center space-x-1.5 transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-chocolate hover:bg-coffee text-cream/70 hover:text-cream border border-coffee/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Verification Certificate Content */}
        <div className="p-6 sm:p-10 space-y-6 text-cream font-sans">
          
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-coffee/40 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black text-cream tracking-tight">
                  Truth<span className="text-cappuccino">Lens</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-coffee/60 text-cappuccino border border-coffee">
                  OFFICIAL AUDIT REPORT
                </span>
              </div>
              <p className="text-xs text-cappuccino/80 mt-0.5">
                {t.tagline}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-cream/60 font-mono">
              <div>Report ID: <span className="text-cream font-bold">{report.id}</span></div>
              <div>{t.verifiedOn}: {report.verification_date}</div>
            </div>
          </div>

          {/* Headline & Credibility Score Banner */}
          <div className="p-6 rounded-2xl bg-espresso/80 border border-coffee/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] uppercase font-bold text-cappuccino tracking-wider block">
                Headline / Verified Inquiry
              </span>
              <h2 className="text-xl font-extrabold text-cream leading-snug">
                {report.headline}
              </h2>
              <div className="flex items-center space-x-3 text-xs text-cream/60 pt-1">
                <span>Format: {report.input_type}</span>
                <span>•</span>
                <span>Topic: {report.topic}</span>
              </div>
            </div>

            <div className="text-center sm:text-right shrink-0 p-4 rounded-xl bg-chocolate/60 border border-coffee/60">
              <span className="text-[10px] uppercase font-bold text-cream/60 block">
                {t.credibilityScore}
              </span>
              <div className="text-4xl font-black text-cappuccino mt-0.5">
                {report.credibility_score}<span className="text-lg text-cream/60 font-normal">/100</span>
              </div>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold border ${
                report.verdict === 'Likely Reliable' ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600/50' :
                report.verdict === 'Misleading' ? 'bg-amber-950/70 text-amber-300 border-amber-500/50' :
                report.verdict === 'Likely False' ? 'bg-rose-950/70 text-rose-300 border-rose-600/50' :
                'bg-stone-900 text-stone-300 border-stone-600'
              }`}>
                {report.verdict}
              </span>
            </div>
          </div>

          {/* AI Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-cappuccino tracking-wider">
              {t.executiveSummary}
            </h4>
            <p className="text-xs sm:text-sm text-cream/85 leading-relaxed p-4 rounded-xl bg-espresso/60 border border-coffee/50">
              {report.summary}
            </p>
          </div>

          {/* Claims Breakdown Table */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-cappuccino tracking-wider">
              {t.claimsHeadline} ({report.claims.length})
            </h4>
            <div className="space-y-2.5">
              {report.claims.map((claim, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-espresso/60 border border-coffee/50 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cream">
                      Claim {idx + 1}: "{claim.statement}"
                    </span>
                    <span className="font-semibold text-cappuccino">
                      [{claim.status}]
                    </span>
                  </div>
                  <p className="text-cream/70 text-[11px]">
                    <strong className="text-cream/90">Supporting:</strong> {claim.supporting_evidence}
                  </p>
                  <p className="text-cream/70 text-[11px]">
                    <strong className="text-cream/90">Contradicting:</strong> {claim.contradicting_evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Source Citations */}
          {report.sources_catalog && report.sources_catalog.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold text-cappuccino tracking-wider">
                Audited Sources & Citations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {report.sources_catalog.map((src, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-espresso/60 border border-coffee/40 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-cream block">{src.name}</span>
                      <span className="text-[10px] text-cream/60">{src.type || src.category}</span>
                    </div>
                    <span className="text-[11px] font-mono text-cappuccino">
                      {src.authority_score || 90}/100
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Footer / Disclaimer */}
          <div className="pt-6 border-t border-coffee/40 text-[10px] text-cream/50 space-y-1">
            <p>{t.scoreDisclaimer}</p>
            <p>Generated by TruthLens AI News Verification Platform. Authenticated open-source fact-checking repository.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
