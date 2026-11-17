import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Clock, 
  AlertCircle,
  Inbox
} from 'lucide-react';

export default function HistoryView({ onSelectReport, t, language }) {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
      if (bookmarkedOnly) params.append('bookmarked', '1');

      const res = await fetch(`/api/history?${params.toString()}`);
      const data = await res.json();
      if (data && data.history) {
        setHistory(data.history);
      }
    } catch (err) {
      console.warn('Failed to load history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [search, statusFilter, bookmarkedOnly]);

  const handleToggleBookmark = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/history/${id}/bookmark`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setHistory(prev => prev.map(item => item.id === id ? { ...item, is_bookmarked: data.is_bookmarked ? 1 : 0 } : item));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/history/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHistory(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (verdict) => {
    switch (verdict) {
      case 'Likely Reliable':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-600/50';
      case 'Misleading':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/50';
      case 'Likely False':
        return 'bg-rose-950/70 text-rose-300 border-rose-600/50';
      default:
        return 'bg-stone-900 text-stone-300 border-stone-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-extrabold text-cream tracking-tight">
          {t.historyTitle}
        </h1>
        <p className="text-sm text-cream/70 mt-1">
          {t.historySub}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-chocolate/80 border border-coffee/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-espresso border border-coffee/60 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-cappuccino focus:ring-1 focus:ring-cappuccino"
          />
          <Search className="w-4 h-4 text-cappuccino absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-espresso border border-coffee/60 text-xs text-cream focus:outline-none focus:border-cappuccino"
          >
            <option value="all">{t.filterStatusAll}</option>
            <option value="Likely Reliable">{t.verdictReliable}</option>
            <option value="Misleading">{t.verdictMisleading}</option>
            <option value="Likely False">{t.verdictFalse}</option>
            <option value="Unverified">{t.verdictUnverified}</option>
          </select>

          <button
            type="button"
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center space-x-1.5 transition-all ${
              bookmarkedOnly
                ? 'bg-cappuccino text-espresso border-cappuccino shadow-sm'
                : 'bg-espresso text-cream/80 border-coffee/60 hover:text-cream'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t.filterBookmarked}</span>
          </button>

        </div>

      </div>

      {/* History Items List */}
      {history.length === 0 && !isLoading ? (
        <div className="p-12 rounded-2xl bg-chocolate/40 border border-coffee/50 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-espresso border border-coffee mx-auto flex items-center justify-center text-cream/40">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-cream">
            {t.noHistoryTitle}
          </h3>
          <p className="text-xs text-cream/60 max-w-sm mx-auto">
            {t.noHistoryDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectReport(item.id)}
              className="p-4 rounded-xl bg-chocolate/70 hover:bg-chocolate border border-coffee/60 hover:border-cappuccino/60 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-[11px] text-cream/60">
                  <span className="uppercase px-1.5 py-0.2 rounded bg-espresso text-cappuccino border border-coffee text-[10px] font-mono">
                    {item.input_type}
                  </span>
                  <span>•</span>
                  <span>{item.topic}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-cream group-hover:text-cappuccino transition-colors truncate">
                  {item.headline || item.input_text}
                </h3>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center space-x-3 shrink-0">
                
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(item.verdict)}`}>
                  {item.verdict} ({item.credibility_score}/100)
                </span>

                <button
                  type="button"
                  onClick={(e) => handleToggleBookmark(item.id, e)}
                  className={`p-2 rounded-lg border transition-colors ${
                    item.is_bookmarked
                      ? 'bg-cappuccino text-espresso border-cappuccino'
                      : 'bg-espresso text-cream/60 hover:text-cream border-coffee/60'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-2 rounded-lg bg-espresso text-cream/50 hover:text-rose-400 border border-coffee/60 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
