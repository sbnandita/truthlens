import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Database, 
  Globe2, 
  Sparkles,
  GitBranch,
  SplitSquareVertical,
  Compass
} from 'lucide-react';

export default function LandingPage({ setCurrentView, onSelectSample, t, language }) {
  const samplePills = [
    {
      title: language === 'ta' ? 'சென்னை மழை & பள்ளி விடுமுறை வதந்தி' : 'Chennai Rain & School Holiday WhatsApp Forward',
      type: 'whatsapp',
      text: 'Heavy rainfall is expected in Chennai. Schools will remain closed tomorrow. All government offices will also remain closed.',
      verdict: 'Misleading',
      score: 62
    },
    {
      title: language === 'ta' ? '2022 மாண்டஸ் புயல் பழைய செய்தி' : 'Recycled 2022 Cyclone Mandous Alert',
      type: 'facebook',
      text: 'Severe Cyclonic Storm Mandous approaching Tamil Nadu coast with 100 km/h wind alert.',
      verdict: 'Likely False',
      score: 18
    },
    {
      title: language === 'ta' ? 'பிரதமர் கன்யா திட்ட போலி மானியம்' : 'PIB Debunked PM Kanya Rs.50k Phishing Link',
      type: 'whatsapp',
      text: 'Central government offering Rs 50,000 cash subsidy under PM Kanya Ayush Yojana via online link bit.ly/pm-kanya-free.',
      verdict: 'Likely False',
      score: 8
    },
    {
      title: language === 'ta' ? 'இஸ்ரோ என்விஎஸ்-02 வழிகாட்டி விண்கலம்' : 'ISRO NavIC NVS-02 Satellite Liftoff (Reliable)',
      type: 'headline',
      text: 'ISRO successfully launched the NVS-02 navigation satellite into GTO using GSLV-F12 from Sriharikota.',
      verdict: 'Likely Reliable',
      score: 96
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Subtle background ambient warmth */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-coffee/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and Call-to-actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-chocolate border border-coffee/70 text-cappuccino text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Fact Verification Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream tracking-tight leading-[1.15]">
                {t.heroHeadline}
              </h1>

              <p className="text-lg sm:text-xl text-cream/75 max-w-2xl leading-relaxed font-normal">
                {t.heroSubtext}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('verify')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cappuccino text-espresso font-bold text-base hover:bg-cream transition-all shadow-card-glow flex items-center justify-center space-x-2 group"
                >
                  <span>{t.verifyNowBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-chocolate/90 hover:bg-chocolate text-cream font-semibold text-base border border-coffee/80 transition-all flex items-center justify-center space-x-2"
                >
                  <Compass className="w-4 h-4 text-cappuccino" />
                  <span>{t.exploreFeaturesBtn}</span>
                </button>
              </div>

              {/* Sample news quick launcher */}
              <div className="pt-6 border-t border-coffee/30">
                <p className="text-xs uppercase tracking-wider text-cappuccino/90 font-semibold mb-3">
                  {t.quickTestSamples}
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {samplePills.map((pill, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectSample(pill)}
                      className="px-3 py-1.5 rounded-lg bg-chocolate/70 hover:bg-chocolate border border-coffee/60 hover:border-cappuccino/60 text-xs text-cream/90 flex items-center space-x-2 transition-all"
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        pill.verdict === 'Likely Reliable' ? 'bg-verdict-reliable' :
                        pill.verdict === 'Misleading' ? 'bg-verdict-misleading' : 'bg-verdict-false'
                      }`} />
                      <span>{pill.title}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Illustration / Claim Dissection Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-chocolate/90 border border-coffee/80 p-6 shadow-soft-warm">
                
                {/* Header preview banner */}
                <div className="flex items-center justify-between pb-4 border-b border-coffee/40">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-verdict-false/70" />
                    <div className="w-3 h-3 rounded-full bg-verdict-misleading/70" />
                    <div className="w-3 h-3 rounded-full bg-verdict-reliable/70" />
                    <span className="text-xs text-cappuccino/80 font-mono ml-2">TruthLens Decomposition</span>
                  </div>
                  <span className="text-[11px] font-semibold text-cream bg-coffee/60 px-2 py-0.5 rounded border border-coffee">
                    Live Sample
                  </span>
                </div>

                {/* Submitted text sample */}
                <div className="my-4 p-3.5 rounded-xl bg-espresso/80 border border-coffee/50">
                  <span className="text-[10px] uppercase font-semibold text-cappuccino block mb-1">
                    Incoming Viral Forward
                  </span>
                  <p className="text-xs text-cream/90 italic font-mono leading-relaxed">
                    "Heavy rainfall warning in Chennai. Schools closed tomorrow. All government offices also shut down."
                  </p>
                </div>

                {/* Claim-by-Claim Output Preview */}
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-espresso/50 border border-coffee/40 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-cappuccino/90 font-medium block">Claim 1: Heavy rainfall warning</span>
                      <span className="text-xs text-cream/80">Corroborated by IMD Orange Alert</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-verdict-reliable/20 text-emerald-300 border border-verdict-reliable/40">
                      Reliable
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-espresso/50 border border-coffee/40 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-cappuccino/90 font-medium block">Claim 2: Schools closed tomorrow</span>
                      <span className="text-xs text-cream/80">Confirmed by District Collectorate</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-verdict-reliable/20 text-emerald-300 border border-verdict-reliable/40">
                      Reliable
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-espresso/50 border border-coffee/40 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-cappuccino/90 font-medium block">Claim 3: Government offices closed</span>
                      <span className="text-xs text-cream/80">Refuted by Tamil Nadu Secretariat</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-verdict-false/20 text-rose-300 border border-verdict-false/40">
                      False
                    </span>
                  </div>
                </div>

                {/* Verdict Meter Summary */}
                <div className="mt-4 pt-4 border-t border-coffee/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-cappuccino/80 uppercase tracking-wider block font-semibold">
                      Synthesized Verdict
                    </span>
                    <span className="text-sm font-bold text-amber-300">
                      Misleading (62/100)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-cream/60 block">Context Flag</span>
                    <span className="text-xs font-medium text-cream/90">Scope Exaggerated</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOUR MAJOR FEATURE HIGHLIGHTS */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-cream tracking-tight">
            Designed for Deep Credibility, Not Shallow Labels
          </h2>
          <p className="mt-3 text-base text-cream/70">
            TruthLens breaks down misinformation systematically using multi-source verification and temporal analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-chocolate/80 border border-coffee/60 hover:border-cappuccino/60 transition-all hover:-translate-y-1 shadow-soft-warm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-coffee/40 border border-coffee flex items-center justify-center text-cappuccino mb-5">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-cream mb-2">
                {t.highlight1Title}
              </h3>
              <p className="text-sm text-cream/75 leading-relaxed">
                {t.highlight1Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-coffee/30 flex items-center text-xs text-cappuccino font-semibold">
              <span>Primary source corroboration</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-chocolate/80 border border-coffee/60 hover:border-cappuccino/60 transition-all hover:-translate-y-1 shadow-soft-warm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-coffee/40 border border-coffee flex items-center justify-center text-cappuccino mb-5">
                <SplitSquareVertical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-cream mb-2">
                {t.highlight2Title}
              </h3>
              <p className="text-sm text-cream/75 leading-relaxed">
                {t.highlight2Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-coffee/30 flex items-center text-xs text-cappuccino font-semibold">
              <span>Atomic claim extraction</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-chocolate/80 border border-coffee/60 hover:border-cappuccino/60 transition-all hover:-translate-y-1 shadow-soft-warm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-coffee/40 border border-coffee flex items-center justify-center text-cappuccino mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-cream mb-2">
                {t.highlight3Title}
              </h3>
              <p className="text-sm text-cream/75 leading-relaxed">
                {t.highlight3Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-coffee/30 flex items-center text-xs text-cappuccino font-semibold">
              <span>4-Pillar explainable index</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-chocolate/80 border border-coffee/60 hover:border-cappuccino/60 transition-all hover:-translate-y-1 shadow-soft-warm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-coffee/40 border border-coffee flex items-center justify-center text-cappuccino mb-5">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-cream mb-2">
                {t.highlight4Title}
              </h3>
              <p className="text-sm text-cream/75 leading-relaxed">
                {t.highlight4Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-coffee/30 flex items-center text-xs text-cappuccino font-semibold">
              <span>English & தமிழ் Support</span>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS (WORKFLOW) */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-chocolate/60 border border-coffee/70 p-8 sm:p-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-cream tracking-tight">
              {t.workflowTitle}
            </h2>
            <p className="mt-2 text-sm text-cream/70">
              {t.workflowSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-espresso border border-coffee flex items-center justify-center text-cappuccino font-bold text-lg mb-4 shadow-sm">
                1
              </div>
              <h4 className="text-base font-bold text-cream mb-1">
                {t.step1Title}
              </h4>
              <p className="text-xs text-cream/70 max-w-xs leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-espresso border border-coffee flex items-center justify-center text-cappuccino font-bold text-lg mb-4 shadow-sm">
                2
              </div>
              <h4 className="text-base font-bold text-cream mb-1">
                {t.step2Title}
              </h4>
              <p className="text-xs text-cream/70 max-w-xs leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-espresso border border-coffee flex items-center justify-center text-cappuccino font-bold text-lg mb-4 shadow-sm">
                3
              </div>
              <h4 className="text-base font-bold text-cream mb-1">
                {t.step3Title}
              </h4>
              <p className="text-xs text-cream/70 max-w-xs leading-relaxed">
                {t.step3Desc}
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-espresso border border-cappuccino/60 flex items-center justify-center text-cappuccino font-bold text-lg mb-4 shadow-sm">
                4
              </div>
              <h4 className="text-base font-bold text-cream mb-1">
                {t.step4Title}
              </h4>
              <p className="text-xs text-cream/70 max-w-xs leading-relaxed">
                {t.step4Desc}
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentView('verify')}
              className="px-6 py-3 rounded-xl bg-cappuccino text-espresso font-bold text-sm hover:bg-cream transition-all shadow-sm"
            >
              {t.verifyNowBtn}
            </button>
          </div>

        </div>
      </section>

      {/* DEMONSTRATION IMPACT METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-espresso border border-coffee/70">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-coffee/40 gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-cappuccino tracking-wider">
                {t.liveDemoMetrics}
              </span>
              <p className="text-sm text-cream/75 mt-0.5">
                Benchmark statistics for collegiate and public demonstration audits
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-coffee/50 text-cream/90 border border-coffee self-start md:self-auto">
              Live Prototype
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-center">
            <div className="p-4 rounded-xl bg-chocolate/40 border border-coffee/40">
              <div className="text-3xl font-extrabold text-cream">50,000+</div>
              <div className="text-xs text-cappuccino font-medium mt-1">{t.statChecks}</div>
            </div>

            <div className="p-4 rounded-xl bg-chocolate/40 border border-coffee/40">
              <div className="text-3xl font-extrabold text-cream">120+</div>
              <div className="text-xs text-cappuccino font-medium mt-1">{t.statSources}</div>
            </div>

            <div className="p-4 rounded-xl bg-chocolate/40 border border-coffee/40">
              <div className="text-3xl font-extrabold text-cream">EN / தமிழ்</div>
              <div className="text-xs text-cappuccino font-medium mt-1">{t.statLanguages}</div>
            </div>

            <div className="p-4 rounded-xl bg-chocolate/40 border border-coffee/40">
              <div className="text-3xl font-extrabold text-cream">100%</div>
              <div className="text-xs text-cappuccino font-medium mt-1">{t.statAccuracy}</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
