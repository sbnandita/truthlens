import React from 'react';
import { AlertCircle, CheckCircle2, Split, Info, Layers } from 'lucide-react';

export default function MissingContextDetector({ missingContext, t, language }) {
  if (!missingContext) return null;

  const hasMissing = missingContext.has_missing_context;

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="p-4 rounded-xl bg-espresso/70 border border-coffee/50">
        <h3 className="text-sm font-bold text-cream">
          {t.missingContextTitle}
        </h3>
        <p className="text-xs text-cream/70 mt-1 leading-relaxed">
          {t.missingContextSub}
        </p>
      </div>

      {hasMissing ? (
        <div className="space-y-4">
          
          {/* Main Distortion Card */}
          <div className="p-6 rounded-2xl bg-espresso/90 border border-amber-500/50 space-y-4 shadow-soft-warm">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-500/50 flex items-center justify-center text-amber-300 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-900/50 text-amber-200 border border-amber-600/40">
                  Critical Context Omission Detected
                </span>
                <h4 className="text-sm font-bold text-cream mt-1.5 leading-relaxed">
                  {language === 'ta' ? missingContext.explanation_ta : missingContext.explanation_en}
                </h4>
              </div>
            </div>

            {/* Scope Differential Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-xl bg-chocolate/60 border border-coffee/60">
                <span className="text-[10px] uppercase font-semibold text-cappuccino block mb-1">
                  {t.omittedScopeLabel}
                </span>
                <p className="text-xs text-cream/90 leading-relaxed font-sans">
                  {missingContext.omitted_scope}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-chocolate/60 border border-coffee/60">
                <span className="text-[10px] uppercase font-semibold text-cappuccino block mb-1">
                  {t.omittedEntitiesLabel}
                </span>
                <p className="text-xs text-cream/90 leading-relaxed font-sans">
                  {missingContext.omitted_entities}
                </p>
              </div>

            </div>

            {/* Essential Caveats List */}
            {missingContext.critical_caveats && missingContext.critical_caveats.length > 0 && (
              <div className="p-4 rounded-xl bg-chocolate/40 border border-coffee/50">
                <span className="text-xs font-bold text-cream block mb-2">
                  {t.criticalCaveatsTitle}
                </span>
                <ul className="space-y-1.5">
                  {missingContext.critical_caveats.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-cream/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-cappuccino shrink-0 mt-1.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>
      ) : (
        /* Complete Context state */
        <div className="rounded-2xl bg-espresso/80 border border-coffee/60 p-6 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-600/50 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-cream">
            Context Complete
          </h4>
          <p className="text-xs text-cream/70 max-w-md mx-auto leading-relaxed">
            {language === 'ta' ? missingContext.explanation_ta : missingContext.explanation_en}
          </p>
        </div>
      )}

    </div>
  );
}
