import React, { useState } from 'react';
import { Sparkles, Send, MessageSquare, RotateCw, User, HelpCircle } from 'lucide-react';

export default function AskTruthLensAI({ report, t, language }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: language === 'ta'
        ? `வணக்கம்! நான் ட்ரூத்லென்ஸ் AI உதவியாளர். "${report.headline}" பற்றிய உங்கள் கேள்விகளை கீழே கேட்கலாம்.`
        : `Hello! I am your TruthLens AI assistant. Feel free to ask any follow-up questions regarding the evidence, sources, or verdict for "${report.headline}".`
    }
  ]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    t.qWhyMisleading,
    t.qWhichSource,
    t.qWhatMissing,
    t.qSimpleEnglish,
    t.qNewerUpdate
  ];

  const handleSend = async (questionText) => {
    const q = (questionText || query).trim();
    if (!q || isLoading) return;

    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          report: report,
          language: language
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.answer }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: data.error || 'Unable to retrieve answer.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: 'Connection error while communicating with verification assistant.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-espresso/90 border border-coffee/70 p-6 space-y-5">
      
      {/* Assistant Header */}
      <div className="flex items-center justify-between pb-4 border-b border-coffee/40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-chocolate border border-coffee flex items-center justify-center text-cappuccino">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-cream">
              {t.askAITitle}
            </h3>
            <p className="text-xs text-cream/70">
              {t.askAISub}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-chocolate text-cappuccino border border-coffee">
          Evidence-Grounded
        </span>
      </div>

      {/* Suggested Query Chips */}
      <div>
        <span className="text-[11px] font-bold text-cappuccino uppercase tracking-wider block mb-2">
          {t.suggestedQuestions}
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((sq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(sq)}
              className="px-3 py-1.5 rounded-lg bg-chocolate/60 hover:bg-chocolate text-xs text-cream/90 hover:text-cream border border-coffee/60 hover:border-cappuccino/60 transition-all text-left"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="p-4 rounded-xl bg-chocolate/30 border border-coffee/40 max-h-80 overflow-y-auto space-y-3.5">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
              msg.sender === 'user' 
                ? 'bg-cappuccino text-espresso font-bold' 
                : 'bg-coffee text-cappuccino'
            }`}>
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            </div>

            <div className={`p-3 rounded-2xl max-w-lg text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-cappuccino text-espresso font-medium rounded-tr-none'
                : 'bg-espresso/90 text-cream/90 border border-coffee/60 rounded-tl-none whitespace-pre-line'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-cappuccino">
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
            <span>Consulting verification report records...</span>
          </div>
        )}
      </div>

      {/* Input query field */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center space-x-2 pt-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.askPlaceholder}
          className="flex-1 px-4 py-2.5 rounded-xl bg-espresso border border-coffee/70 text-cream placeholder-cream/40 text-xs focus:outline-none focus:border-cappuccino focus:ring-1 focus:ring-cappuccino transition-all"
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="px-5 py-2.5 rounded-xl bg-cappuccino text-espresso font-bold text-xs hover:bg-cream transition-all flex items-center space-x-1.5 disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{t.sendBtn}</span>
        </button>
      </form>

    </div>
  );
}
