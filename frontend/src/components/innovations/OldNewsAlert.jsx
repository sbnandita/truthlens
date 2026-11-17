import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, History, ArrowRight } from 'lucide-react';

export default function OldNewsAlert({ oldNews, t, language }) {
  if (!oldNews) return null;

  const isOld = oldNews.is_old_news;

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="p-4 rounded-xl bg-espresso/70 border border-coffee/50">
        <h3 className="text-sm font-bold text-cream">
          {t.oldNewsTitle}
        </h3>
        <p className="text-xs text-cream/70 mt-1 leading-relaxed">
          {t.oldNewsSub}
        </p>
      </div>

      {isOld ? (
        <div className="rounded-2xl bg-espresso/90 border border-amber-500/50 p-6 shadow-soft-warm space-y-6">
          
          {/* Main Warning Banner */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-300 shrink-0">
              <History className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-600/50">
                Outdated Recycled Announcement
              </span>
              <h4 className="text-base font-bold text-cream mt-1.5">
                {language === 'ta' && oldNews.alert_title_ta ? oldNews.alert_title_ta : oldNews.alert_title_en}
              </h4>
              <p className="text-xs text-cream/80 mt-1 leading-relaxed">
                {language === 'ta' && oldNews.alert_message_ta ? oldNews.alert_message_ta : oldNews.alert_message_en}
              </p>
            </div>
          </div>

          {/* Temporal Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            <div className="p-4 rounded-xl bg-chocolate/60 border border-coffee/60">
              <span className="text-[10px] uppercase font-semibold text-cappuccino block mb-1">
                {t.originalDate}
              </span>
              <span className="text-sm font-bold text-cream">
                {oldNews.original_date}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-chocolate/60 border border-coffee/60">
              <span className="text-[10px] uppercase font-semibold text-cappuccino block mb-1">
                {t.timeElapsed}
              </span>
              <span className="text-sm font-bold text-amber-300">
                {oldNews.time_gap}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-chocolate/60 border border-coffee/60">
              <span className="text-[10px] uppercase font-semibold text-cappuccino block mb-1">
                {t.circulatedAs}
              </span>
              <span className="text-sm font-bold text-rose-300">
                {oldNews.circulation_date}
              </span>
            </div>

          </div>

          {/* Current Reality Status */}
          <div className="p-4 rounded-xl bg-chocolate/70 border border-coffee/70 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-cappuccino shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-cream block uppercase tracking-wide">
                {t.currentStatusTitle}
              </span>
              <p className="text-xs text-cream/85 mt-0.5 leading-relaxed">
                {language === 'ta' ? oldNews.current_status_ta : oldNews.current_status_en}
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* Fresh news state */
        <div className="rounded-2xl bg-espresso/80 border border-coffee/60 p-6 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-600/50 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-cream">
            Temporal Context Fresh
          </h4>
          <p className="text-xs text-cream/70 max-w-md mx-auto leading-relaxed">
            {language === 'ta' ? oldNews.current_status_ta : oldNews.current_status_en}
          </p>
        </div>
      )}

    </div>
  );
}
