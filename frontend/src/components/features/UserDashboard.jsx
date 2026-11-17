import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  Clock, 
  TrendingUp, 
  PlusCircle, 
  ArrowRight 
} from 'lucide-react';

export default function UserDashboard({ setCurrentView, onSelectReport, t, language }) {
  const [stats, setStats] = useState({
    total_verified: 0,
    likely_reliable: 0,
    misleading: 0,
    likely_false: 0,
    unverified: 0,
    bookmarked_count: 0,
    average_score: 0
  });

  const [bookmarkedList, setBookmarkedList] = useState([]);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data) setStats(data);
      })
      .catch(console.warn);

    fetch('/api/history?bookmarked=1&limit=6')
      .then(res => res.json())
      .then(data => {
        if (data && data.history) setBookmarkedList(data.history);
      })
      .catch(console.warn);
  }, []);

  const total = stats.total_verified || 1;
  const relPct = Math.round((stats.likely_reliable / total) * 100);
  const misPct = Math.round((stats.misleading / total) * 100);
  const falPct = Math.round((stats.likely_false / total) * 100);
  const unvPct = Math.round((stats.unverified / total) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-cream tracking-tight">
            {t.myDashboardTitle}
          </h1>
          <p className="text-sm text-cream/70 mt-1">
            Personal credibility overview, verification ratios, and saved investigations.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('verify')}
          className="px-5 py-2.5 rounded-xl bg-cappuccino text-espresso font-bold text-xs hover:bg-cream transition-all shadow-sm flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.verifyNowBtn}</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-chocolate/80 border border-coffee/60 space-y-2">
          <span className="text-[11px] font-semibold text-cappuccino uppercase tracking-wider block">
            {t.totalVerified}
          </span>
          <div className="text-3xl font-black text-cream">
            {stats.total_verified}
          </div>
          <span className="text-[11px] text-cream/60 block">All submitted inquiries</span>
        </div>

        <div className="p-5 rounded-2xl bg-chocolate/80 border border-coffee/60 space-y-2">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
            {t.reliableCount}
          </span>
          <div className="text-3xl font-black text-emerald-300">
            {stats.likely_reliable}
          </div>
          <span className="text-[11px] text-cream/60 block">{relPct}% of total audits</span>
        </div>

        <div className="p-5 rounded-2xl bg-chocolate/80 border border-coffee/60 space-y-2">
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
            {t.misleadingCount}
          </span>
          <div className="text-3xl font-black text-amber-300">
            {stats.misleading}
          </div>
          <span className="text-[11px] text-cream/60 block">{misPct}% context distortions</span>
        </div>

        <div className="p-5 rounded-2xl bg-chocolate/80 border border-coffee/60 space-y-2">
          <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block">
            {t.falseCount}
          </span>
          <div className="text-3xl font-black text-rose-300">
            {stats.likely_false}
          </div>
          <span className="text-[11px] text-cream/60 block">{falPct}% refuted claims</span>
        </div>

      </div>

      {/* Verification Distribution Ratio Bar */}
      <div className="p-6 rounded-2xl bg-chocolate/80 border border-coffee/70 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-cream tracking-wide">
            Credibility Category Distribution
          </span>
          <span className="text-xs font-mono text-cappuccino">
            Avg Score: {stats.average_score}/100
          </span>
        </div>

        {/* Multi-segmented distribution bar */}
        <div className="h-3.5 w-full rounded-full bg-espresso flex overflow-hidden border border-coffee/50">
          <div style={{ width: `${relPct}%` }} className="bg-emerald-500 h-full transition-all" title={`Reliable: ${relPct}%`} />
          <div style={{ width: `${misPct}%` }} className="bg-amber-500 h-full transition-all" title={`Misleading: ${misPct}%`} />
          <div style={{ width: `${falPct}%` }} className="bg-rose-500 h-full transition-all" title={`False: ${falPct}%`} />
          <div style={{ width: `${unvPct}%` }} className="bg-stone-500 h-full transition-all" title={`Unverified: ${unvPct}%`} />
        </div>

        {/* Distribution Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-cream/70 pt-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Reliable ({relPct}%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Misleading ({misPct}%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>False ({falPct}%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-500" />
            <span>Unverified ({unvPct}%)</span>
          </div>
        </div>
      </div>

      {/* Bookmarked Reports Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-cappuccino" />
            <h3 className="text-base font-bold text-cream">
              {t.bookmarkedReports} ({bookmarkedList.length})
            </h3>
          </div>
          <button
            onClick={() => setCurrentView('history')}
            className="text-xs text-cappuccino hover:text-cream flex items-center space-x-1 transition-colors"
          >
            <span>View Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {bookmarkedList.length === 0 ? (
          <div className="p-8 rounded-2xl bg-chocolate/40 border border-coffee/40 text-center text-xs text-cream/50 italic">
            No saved reports yet. Click the bookmark icon on any verification result to preserve it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bookmarkedList.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectReport(item.id)}
                className="p-4 rounded-xl bg-chocolate/70 hover:bg-chocolate border border-coffee/60 hover:border-cappuccino/60 cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] text-cappuccino font-mono uppercase block">
                    {item.topic}
                  </span>
                  <h4 className="text-xs font-bold text-cream group-hover:text-cappuccino transition-colors line-clamp-1">
                    {item.headline || item.input_text}
                  </h4>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-espresso text-cream border border-coffee shrink-0">
                  {item.credibility_score}/100
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
