import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Trash2, 
  Link as LinkIcon, 
  MessageSquare, 
  Camera, 
  Share2, 
  FileText, 
  Heading, 
  AlertCircle, 
  HelpCircle,
  Sparkles,
  ExternalLink,
  RotateCw
} from 'lucide-react';

export default function NewsInputDashboard({ 
  inputText, 
  setInputText, 
  inputType, 
  setInputType, 
  onAnalyse, 
  isAnalyzing, 
  duplicateMatch, 
  onViewDuplicate,
  t, 
  language 
}) {
  const [samples, setSamples] = useState([]);
  const [validationError, setValidationError] = useState('');

  // Fetch sample test cases from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/samples')
      .then(res => res.json())
      .then(data => {
        if (data && data.samples) {
          setSamples(data.samples);
        }
      })
      .catch(err => {
        console.warn('Backend samples fallback used:', err);
      });
  }, []);

  const inputTypes = [
    { id: 'headline', label: t.inputTypeHeadline, icon: Heading },
    { id: 'article', label: t.inputTypeArticle, icon: FileText },
    { id: 'whatsapp', label: t.inputTypeWhatsApp, icon: MessageSquare },
    { id: 'instagram', label: t.inputTypeInstagram, icon: Camera },
    { id: 'facebook', label: t.inputTypeFacebook, icon: Share2 },
    { id: 'url', label: t.inputTypeUrl, icon: LinkIcon }
  ];

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setValidationError(language === 'ta' ? 'செய்தி உள்ளீட்டை உள்ளிடவும்.' : 'Please enter or paste the news content you wish to verify.');
      return;
    }
    if (inputText.trim().length < 8) {
      setValidationError(language === 'ta' ? 'கூற்றை சரிபார்க்க குறைந்தது 8 எழுத்துக்கள் தேவை.' : 'Text is too short. Please provide a complete headline or claim (at least 8 characters).');
      return;
    }
    setValidationError('');
    onAnalyse(inputText, inputType);
  };

  const handleClear = () => {
    setInputText('');
    setValidationError('');
  };

  const loadSample = (sample) => {
    const text = (language === 'ta' && sample.text_ta) ? sample.text_ta : sample.text;
    setInputText(text);
    setInputType(sample.input_type || 'headline');
    setValidationError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Title & Guidance Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-chocolate border border-coffee/70 text-cappuccino text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Verification Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight">
          {t.dashboardTitle}
        </h1>
        <p className="mt-2 text-sm text-cream/70 max-w-xl mx-auto leading-relaxed">
          {t.dashboardSubtitle}
        </p>
      </div>

      {/* Main Submission Card */}
      <div className="rounded-2xl bg-chocolate/90 border border-coffee/80 p-6 sm:p-8 shadow-soft-warm">
        
        {/* Input Type Selector Pills */}
        <div className="mb-6">
          <label className="text-xs uppercase font-bold text-cappuccino/80 tracking-wider block mb-3">
            Select Source Format
          </label>
          <div className="flex flex-wrap gap-2">
            {inputTypes.map(item => {
              const Icon = item.icon;
              const isActive = inputType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setInputType(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cappuccino text-espresso shadow-sm'
                      : 'bg-espresso/70 text-cream/80 hover:bg-espresso border border-coffee/50 hover:border-cappuccino/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duplicate News Alert Banner (Feature E) */}
        {duplicateMatch && (
          <div className="mb-6 p-4 rounded-xl bg-espresso border border-amber-500/40 flex items-start justify-between gap-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  {t.duplicateAlertTitle}
                </h4>
                <p className="text-xs text-cream/80 mt-0.5">
                  "{duplicateMatch.headline}" — Verified with score {duplicateMatch.credibility_score}/100 ({duplicateMatch.verdict}).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onViewDuplicate(duplicateMatch.id)}
              className="px-3 py-1.5 rounded-lg bg-coffee/80 hover:bg-coffee text-cream text-xs font-medium border border-coffee shrink-0 flex items-center space-x-1.5 transition-all"
            >
              <span>{t.viewExistingBtn}</span>
              <ExternalLink className="w-3 h-3 text-cappuccino" />
            </button>
          </div>
        )}

        {/* Input Area Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="relative">
            {inputType === 'url' ? (
              <div className="relative">
                <input
                  type="url"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder={t.placeholderUrl}
                  className="w-full pl-11 pr-4 py-4 rounded-xl bg-espresso/90 border border-coffee/70 text-cream placeholder-cream/40 text-sm focus:outline-none focus:border-cappuccino focus:ring-1 focus:ring-cappuccino font-mono transition-all"
                />
                <LinkIcon className="w-5 h-5 text-cappuccino absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            ) : (
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (validationError) setValidationError('');
                }}
                rows={6}
                placeholder={t.placeholderText}
                className="w-full p-4 rounded-xl bg-espresso/90 border border-coffee/70 text-cream placeholder-cream/40 text-sm focus:outline-none focus:border-cappuccino focus:ring-1 focus:ring-cappuccino transition-all resize-y leading-relaxed font-sans"
              />
            )}
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div className="flex items-center space-x-2 text-rose-300 text-xs px-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Bottom Bar: Word/Char count + Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            
            <div className="flex items-center space-x-4 text-xs text-cream/60">
              <span>{wordCount} {t.wordCount}</span>
              <span className="w-1 h-1 rounded-full bg-coffee" />
              <span>{charCount} {t.charCount}</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleClear}
                disabled={!inputText || isAnalyzing}
                className="px-4 py-2.5 rounded-xl bg-espresso/60 hover:bg-espresso text-cream/70 hover:text-cream border border-coffee/60 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearBtn}</span>
              </button>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-cappuccino text-espresso font-bold text-sm hover:bg-cream transition-all shadow-card-glow flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                {isAnalyzing ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-espresso" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-espresso" />
                    <span>{t.analyseBtn}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </form>

        {/* Pre-Curated One-Click Test Cases */}
        {samples.length > 0 && (
          <div className="mt-8 pt-6 border-t border-coffee/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold text-cappuccino tracking-wider">
                {t.quickTestSamples}
              </span>
              <span className="text-[11px] text-cream/50">
                Click any real sample to populate input
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {samples.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => loadSample(sample)}
                  className="p-3 rounded-xl bg-espresso/60 hover:bg-espresso border border-coffee/50 hover:border-cappuccino/60 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-cream group-hover:text-cappuccino transition-colors line-clamp-1">
                      {sample.tag}
                    </span>
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-chocolate text-cappuccino border border-coffee/80">
                      {sample.category}
                    </span>
                  </div>
                  <p className="text-xs text-cream/70 line-clamp-2 italic font-mono">
                    "{language === 'ta' && sample.text_ta ? sample.text_ta : sample.text}"
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
