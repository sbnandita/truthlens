import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, ExternalLink, Sparkles } from 'lucide-react';

export default function ClaimByClaimView({ claims = [], t, language }) {
  if (!claims || claims.length === 0) {
    return (
      <div className="p-8 text-center text-cream/60">
        No individual claims parsed.
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Likely Reliable':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-600/50">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.verdictReliable}</span>
          </span>
        );
      case 'Misleading':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-500/50">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.verdictMisleading}</span>
          </span>
        );
      case 'Likely False':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/70 text-rose-300 border border-rose-600/50">
            <XCircle className="w-3.5 h-3.5" />
            <span>{t.verdictFalse}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-stone-300 border border-stone-600">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.verdictUnverified}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header explanation */}
      <div className="p-4 rounded-xl bg-espresso/70 border border-coffee/50">
        <h3 className="text-sm font-bold text-cream">
          {t.claimsHeadline}
        </h3>
        <p className="text-xs text-cream/70 mt-1 leading-relaxed">
          {t.claimsSub}
        </p>
      </div>

      {/* Claim Cards List */}
      <div className="space-y-4">
        {claims.map((claim, idx) => (
          <div 
            key={claim.claim_id || idx}
            className="p-5 rounded-2xl bg-espresso/80 border border-coffee/70 hover:border-cappuccino/50 transition-all shadow-sm"
          >
            {/* Claim Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-coffee/40">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-chocolate text-cappuccino border border-coffee font-mono text-xs font-bold">
                  Claim #{idx + 1}
                </span>
                <span className="text-xs text-cream/60">
                  Confidence: {Math.round((claim.confidence || 0.9) * 100)}%
                </span>
              </div>
              <div>
                {getStatusBadge(claim.status)}
              </div>
            </div>

            {/* Claim Statement */}
            <div className="my-3">
              <p className="text-sm font-semibold text-cream leading-relaxed">
                "{claim.statement}"
              </p>
            </div>

            {/* Evidence Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              
              {/* Supporting Evidence */}
              <div className="p-3 rounded-xl bg-chocolate/50 border border-coffee/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  {t.supportingEv}
                </span>
                <p className="text-xs text-cream/80 leading-relaxed">
                  {claim.supporting_evidence || "No supporting documentation found in official records."}
                </p>
              </div>

              {/* Contradicting Evidence */}
              <div className="p-3 rounded-xl bg-chocolate/50 border border-coffee/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  {t.contradictingEv}
                </span>
                <p className="text-xs text-cream/80 leading-relaxed">
                  {claim.contradicting_evidence || "No contradictory rebuttal reported."}
                </p>
              </div>

            </div>

            {/* AI Explanation & Sources */}
            <div className="mt-4 pt-3 border-t border-coffee/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              
              <div className="flex items-start space-x-2 text-cream/75 max-w-xl">
                <Sparkles className="w-3.5 h-3.5 text-cappuccino shrink-0 mt-0.5" />
                <span>
                  <strong className="text-cream">{t.claimExpl}:</strong> {claim.explanation}
                </span>
              </div>

              {/* Sources link chips */}
              {claim.sources && claim.sources.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  {claim.sources.map((src, sIdx) => (
                    <a
                      key={sIdx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-chocolate hover:bg-coffee text-[11px] text-cream border border-coffee/80 transition-all"
                    >
                      <span>{src.name}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-cappuccino" />
                    </a>
                  ))}
                </div>
              )}

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
