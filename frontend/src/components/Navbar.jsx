import React from 'react';
import { ShieldCheck, Search, BookOpen, Clock, LayoutDashboard, Globe, User } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, language, setLanguage, t }) {
  return (
    <header className="sticky top-0 z-50 bg-espresso/95 backdrop-blur-md border-b border-coffee/40 shadow-soft-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-11 h-11 rounded-xl bg-chocolate border border-coffee/60 flex items-center justify-center shadow-card-glow group-hover:border-cappuccino/70 transition-all">
              <div className="relative">
                <Search className="w-6 h-6 text-cappuccino" />
                <ShieldCheck className="w-3.5 h-3.5 text-cream absolute -bottom-1 -right-1 bg-chocolate rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold tracking-tight text-cream">
                  Truth<span className="text-cappuccino">Lens</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-coffee/50 text-cappuccino border border-coffee">
                  AI Fact-Check
                </span>
              </div>
              <p className="text-xs text-cappuccino/80 hidden sm:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'landing'
                  ? 'text-cream bg-chocolate border border-coffee/70'
                  : 'text-cream/75 hover:text-cream hover:bg-chocolate/40'
              }`}
            >
              {t.home}
            </button>

            <button
              onClick={() => setCurrentView('verify')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'verify'
                  ? 'text-cream bg-chocolate border border-coffee/70'
                  : 'text-cream/75 hover:text-cream hover:bg-chocolate/40'
              }`}
            >
              {t.verify}
            </button>

            <button
              onClick={() => {
                setCurrentView('landing');
                setTimeout(() => {
                  document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-cream/75 hover:text-cream hover:bg-chocolate/40 transition-all"
            >
              {t.features}
            </button>

            <button
              onClick={() => {
                setCurrentView('landing');
                setTimeout(() => {
                  document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-cream/75 hover:text-cream hover:bg-chocolate/40 transition-all"
            >
              {t.howItWorks}
            </button>

            <button
              onClick={() => setCurrentView('history')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'history'
                  ? 'text-cream bg-chocolate border border-coffee/70'
                  : 'text-cream/75 hover:text-cream hover:bg-chocolate/40'
              }`}
            >
              {t.history}
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'text-cream bg-chocolate border border-coffee/70'
                  : 'text-cream/75 hover:text-cream hover:bg-chocolate/40'
              }`}
            >
              {t.dashboard}
            </button>
          </nav>

          {/* Right Controls: Language Selector + User Badge */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector */}
            <div className="flex items-center bg-chocolate border border-coffee/70 rounded-lg p-1 text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-cappuccino text-espresso shadow-sm'
                    : 'text-cream/80 hover:text-cream'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  language === 'ta'
                    ? 'bg-cappuccino text-espresso shadow-sm'
                    : 'text-cream/80 hover:text-cream'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* User Profile Pill */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-chocolate/80 border border-coffee/60 text-cream/90 hover:border-cappuccino/60 hover:text-cream transition-all text-xs font-medium"
            >
              <div className="w-6 h-6 rounded-full bg-coffee flex items-center justify-center text-cappuccino">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="hidden lg:inline">{t.loginProfile}</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
