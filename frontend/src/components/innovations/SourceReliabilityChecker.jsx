import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, ExternalLink, HelpCircle, Award } from 'lucide-react';

export default function SourceReliabilityChecker({ sources = [], t, language }) {
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Primary Official':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-600/50">
            Primary Official Authority
          </span>
        );
      case 'Verified Fact-Checker':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-950/70 text-sky-300 border border-sky-600/50">
            IFCN Fact-Checker
          </span>
        );
      case 'Established News':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/70 text-amber-300 border border-amber-600/50">
            Established News Media
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-900 text-stone-300 border border-stone-600">
            Unverified / Social Source
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="p-4 rounded-xl bg-espresso/70 border border-coffee/50">
        <h3 className="text-sm font-bold text-cream">
          {t.sourceReliabilityTitle}
        </h3>
        <p className="text-xs text-cream/70 mt-1 leading-relaxed">
          {t.sourceReliabilitySub}
        </p>
      </div>

      {/* Sources Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((src, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-espresso/80 border border-coffee/70 hover:border-cappuccino/50 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-cream">
                  {src.name}
                </h4>
                <div className="mt-1">
                  {getCategoryBadge(src.type || src.category)}
                </div>
              </div>
              
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-chocolate hover:bg-coffee text-cappuccino border border-coffee transition-colors"
                title="Visit source portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Source Details Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-coffee/30 text-xs">
              
              <div>
                <span className="text-[10px] text-cream/50 block font-medium">
                  {t.authorityScore}
                </span>
                <span className="font-bold text-cream">
                  {src.authority_score || 90}/100
                </span>
              </div>

              <div>
                <span className="text-[10px] text-cream/50 block font-medium">
                  {t.independentCheck}
                </span>
                <span className={`font-semibold ${src.confirmation_available ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {src.confirmation_available ? t.available : t.notAvailable}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-cream/50 block font-medium">
                  Source Typology
                </span>
                <span className="text-cream/80">
                  {src.is_independent ? 'Independent Publisher' : 'Institutional / Statutory Body'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-cream/50 block font-medium">
                  Reference Date
                </span>
                <span className="text-cream/80">
                  {src.date || '2026-11-16'}
                </span>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Methodology Transparency Note */}
      <div className="p-4 rounded-xl bg-chocolate/40 border border-coffee/50 text-xs text-cream/70 flex items-start space-x-3">
        <Award className="w-4 h-4 text-cappuccino shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t.methodologyNote}
        </p>
      </div>

    </div>
  );
}
