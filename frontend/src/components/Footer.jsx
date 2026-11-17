import React from 'react';
import { Search, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ setCurrentView, t }) {
  return (
    <footer className="no-print bg-espresso border-t border-coffee/50 text-cream/70 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-coffee/30">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-chocolate border border-coffee flex items-center justify-center text-cappuccino">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-cream">
                Truth<span className="text-cappuccino">Lens</span>
              </span>
            </div>
            <p className="text-xs text-cream/75 max-w-md leading-relaxed">
              {t.footerAbout}
            </p>
            <p className="text-[11px] text-cream/50 italic max-w-md">
              {t.footerDisclaimer}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-cappuccino uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setCurrentView('landing')} className="hover:text-cream transition-colors">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('verify')} className="hover:text-cream transition-colors">
                  {t.verify}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('history')} className="hover:text-cream transition-colors">
                  {t.history}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-cream transition-colors">
                  {t.dashboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Standards */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-cappuccino uppercase tracking-wider">
              Verification Standards
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <span className="text-cream/80">PIB Fact Check Registry</span>
              </li>
              <li>
                <span className="text-cream/80">IFCN Code of Principles</span>
              </li>
              <li>
                <span className="text-cream/80">{t.privacy}</span>
              </li>
              <li>
                <span className="text-cream/80">{t.terms}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} TruthLens AI. Built with transparent verification engineering.
          </div>
          <div className="flex items-center space-x-1">
            <span>Don't Just Read. Verify Before You Believe.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
