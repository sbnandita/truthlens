import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  RotateCw, 
  Search, 
  SplitSquareVertical, 
  Database, 
  GitCompare, 
  Clock, 
  Award 
} from 'lucide-react';

export default function AnalysisProgressModal({ isOpen, onComplete, t }) {
  const [currentStage, setCurrentStage] = useState(1);

  const stages = [
    { num: 1, label: t.progressStage1, icon: Search },
    { num: 2, label: t.progressStage2, icon: SplitSquareVertical },
    { num: 3, label: t.progressStage3, icon: Database },
    { num: 4, label: t.progressStage4, icon: GitCompare },
    { num: 5, label: t.progressStage5, icon: Clock },
    { num: 6, label: t.progressStage6, icon: Award }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStage(1);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < 6) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 6;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const percent = Math.min(100, Math.round((currentStage / 6) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-chocolate border border-coffee/90 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-coffee/40">
          <div 
            className="h-full bg-cappuccino transition-all duration-300 ease-out" 
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-espresso border border-coffee mx-auto flex items-center justify-center text-cappuccino mb-3 shadow-card-glow">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-cream tracking-tight">
            AI News Analysis Engine
          </h3>
          <p className="text-xs text-cream/70 mt-1">
            {t.analyzingText} ({percent}%)
          </p>
        </div>

        {/* 6 Stage Items */}
        <div className="space-y-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isDone = stage.num < currentStage;
            const isCurrent = stage.num === currentStage;
            const isPending = stage.num > currentStage;

            return (
              <div
                key={stage.num}
                className={`flex items-center space-x-3.5 p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-espresso/90 border-cappuccino/70 shadow-sm'
                    : isDone
                    ? 'bg-espresso/50 border-coffee/40 opacity-80'
                    : 'bg-espresso/20 border-coffee/20 opacity-40'
                }`}
              >
                <div className="shrink-0">
                  {isDone ? (
                    <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-7 h-7 rounded-lg bg-coffee/80 border border-cappuccino flex items-center justify-center text-cappuccino">
                      <RotateCw className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-espresso border border-coffee/40 flex items-center justify-center text-cream/40 text-xs font-mono">
                      {stage.num}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-medium block truncate ${isCurrent ? 'text-cream font-semibold' : 'text-cream/70'}`}>
                    {stage.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
