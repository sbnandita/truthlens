import React from 'react';
import { CheckCircle2, XCircle, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

export default function EvidenceComparisonPanel({ 
  supporting = [], 
  contradicting = [], 
  t, 
  language 
}) {
  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="p-4 rounded-xl bg-espresso/70 border border-coffee/50">
        <h3 className="text-sm font-bold text-cream">
          {t.evidenceComparisonTitle}
        </h3>
        <p className="text-xs text-cream/70 mt-1 leading-relaxed">
          {t.evidenceComparisonSub}
        </p>
      </div>

      {/* Side-by-Side Dual Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Supporting Evidence Column */}
        <div className="rounded-2xl bg-espresso/80 border border-coffee/70 p-5 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-coffee/40">
            <div className="w-7 h-7 rounded-lg bg-emerald-950/70 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-cream">
                {t.supportingColumn}
              </h4>
              <span className="text-[11px] text-emerald-400 font-medium">
                {supporting.length} documented record{supporting.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {supporting.length === 0 ? (
            <div className="p-6 text-center text-xs text-cream/50 italic bg-chocolate/30 rounded-xl">
              No corroborating evidence located in verified repositories.
            </div>
          ) : (
            <div className="space-y-3">
              {supporting.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-chocolate/50 border border-coffee/50 hover:border-cappuccino/40 transition-all space-y-2.5"
                >
                  <span className="text-[11px] font-semibold text-cappuccino block line-clamp-1">
                    Related Claim: "{item.claim_statement}"
                  </span>
                  <p className="text-xs text-cream/90 leading-relaxed font-sans">
                    {item.evidence_text}
                  </p>

                  {/* Sources attached */}
                  {item.sources && item.sources.length > 0 && (
                    <div className="pt-2 border-t border-coffee/30 flex flex-wrap gap-1.5">
                      {item.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-espresso text-[10px] text-cream/80 hover:text-cream border border-coffee/60 transition-colors"
                        >
                          <span>{src.name}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-cappuccino" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contradicting Evidence Column */}
        <div className="rounded-2xl bg-espresso/80 border border-coffee/70 p-5 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-coffee/40">
            <div className="w-7 h-7 rounded-lg bg-rose-950/70 border border-rose-600/50 flex items-center justify-center text-rose-400">
              <XCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-cream">
                {t.contradictingColumn}
              </h4>
              <span className="text-[11px] text-rose-400 font-medium">
                {contradicting.length} conflicting rebuttal{contradicting.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {contradicting.length === 0 ? (
            <div className="p-6 text-center text-xs text-cream/50 italic bg-chocolate/30 rounded-xl">
              No direct contradictory debunks found on file.
            </div>
          ) : (
            <div className="space-y-3">
              {contradicting.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-chocolate/50 border border-coffee/50 hover:border-cappuccino/40 transition-all space-y-2.5"
                >
                  <span className="text-[11px] font-semibold text-cappuccino block line-clamp-1">
                    Contested Claim: "{item.claim_statement}"
                  </span>
                  <p className="text-xs text-cream/90 leading-relaxed font-sans">
                    {item.evidence_text}
                  </p>

                  {/* Sources attached */}
                  {item.sources && item.sources.length > 0 && (
                    <div className="pt-2 border-t border-coffee/30 flex flex-wrap gap-1.5">
                      {item.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-espresso text-[10px] text-cream/80 hover:text-cream border border-coffee/60 transition-colors"
                        >
                          <span>{src.name}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-cappuccino" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
