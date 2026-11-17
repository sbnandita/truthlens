import React from 'react';
import { Clock, Calendar, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

export default function NewsContextTimeline({ timeline = [], t, language }) {
  if (!timeline || timeline.length === 0) return null;

  const getTypeStyle = (type) => {
    switch (type) {
      case 'official':
        return {
          badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-600/50',
          dot: 'bg-emerald-400 border-emerald-800'
        };
      case 'fact_check':
        return {
          badge: 'bg-sky-950/70 text-sky-300 border-sky-600/50',
          dot: 'bg-sky-400 border-sky-800'
        };
      case 'rumor':
        return {
          badge: 'bg-rose-950/70 text-rose-300 border-rose-600/50',
          dot: 'bg-rose-400 border-rose-800'
        };
      case 'verification':
        return {
          badge: 'bg-amber-950/70 text-amber-300 border-amber-600/50',
          dot: 'bg-cappuccino border-coffee'
        };
      default:
        return {
          badge: 'bg-chocolate text-cappuccino border-coffee',
          dot: 'bg-coffee border-espresso'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="p-4 rounded-xl bg-espresso/70 border border-coffee/50">
        <h3 className="text-sm font-bold text-cream">
          {t.timelineTitle}
        </h3>
        <p className="text-xs text-cream/70 mt-1 leading-relaxed">
          {t.timelineSub}
        </p>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-coffee/60">
        {timeline.map((event, idx) => {
          const style = getTypeStyle(event.type);
          const title = (language === 'ta' && event.title_ta) ? event.title_ta : event.title_en;
          const desc = (language === 'ta' && event.description_ta) ? event.description_ta : event.description_en;

          return (
            <div key={idx} className="relative group">
              
              {/* Event node dot */}
              <div 
                className={`absolute -left-[19px] sm:-left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${style.dot} transition-transform group-hover:scale-125`} 
              />

              {/* Event Card Content */}
              <div className="p-4 rounded-2xl bg-espresso/80 border border-coffee/70 hover:border-cappuccino/50 transition-all space-y-1.5 shadow-sm">
                
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-cappuccino">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>

                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
                    {event.type}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-cream">
                  {title}
                </h4>

                <p className="text-xs text-cream/80 leading-relaxed font-sans">
                  {desc}
                </p>

                {event.source && (
                  <div className="pt-2 text-[11px] text-cream/50 flex items-center space-x-1.5">
                    <span>Source Authority:</span>
                    <strong className="text-cream/80 font-medium">{event.source}</strong>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
