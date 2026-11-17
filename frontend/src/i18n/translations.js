export const translations = {
  en: {
    // Nav
    appName: "TruthLens",
    tagline: "Don't Just Read. Verify Before You Believe.",
    home: "Home",
    verify: "Verify News",
    features: "Features",
    howItWorks: "How It Works",
    history: "History",
    dashboard: "My Dashboard",
    loginProfile: "Demo Account",
    langToggle: "English",

    // Hero
    heroHeadline: "Is What You Read Really True?",
    heroSubtext: "Discover the truth behind online information with AI-powered analysis, atomic claim extraction, and reliable corroboration from verified sources.",
    verifyNowBtn: "Verify News Now",
    exploreFeaturesBtn: "Explore Features",
    liveDemoMetrics: "Demonstration System Metrics",
    statChecks: "Analyzed Claims",
    statSources: "Indexed Source Repositories",
    statLanguages: "Bilingual Engine",
    statAccuracy: "Transparent Audit Framework",

    // 4 Highlights
    highlight1Title: "Trusted Source Verification",
    highlight1Desc: "Corroborates claims directly against PIB Fact Check, Alt News, BOOM Live, Reuters, and official gazettes.",
    highlight2Title: "AI-Powered News Analysis",
    highlight2Desc: "Dissects convoluted forwards and articles into verifiable factual atoms and temporal events.",
    highlight3Title: "Instant Credibility Assessment",
    highlight3Desc: "Calculates an explainable 0–100 credibility score across evidence, sources, freshness, and scope.",
    highlight4Title: "Tamil & English Support",
    highlight4Desc: "Native support for Tamil (தமிழ்) and English news submissions, claims, and AI-grounded explanations.",

    // How it works
    workflowTitle: "How TruthLens Works",
    workflowSubtitle: "From viral forward to evidence-backed audit in 4 transparent steps",
    step1Title: "Submit News",
    step1Desc: "Paste headlines, long articles, WhatsApp forwards, social posts, or website URLs.",
    step2Title: "Analyse Content",
    step2Desc: "AI extracts individual factual claims, entities, dates, and geographic jurisdictions.",
    step3Title: "Verify Sources",
    step3Desc: "Retrieves corroborating releases, contradictory debunks, and historical publications.",
    step4Title: "Get Results",
    step4Desc: "Receive an explainable credibility report, claim breakdowns, timeline, and AI chat.",

    // Dashboard Input
    dashboardTitle: "News Verification Dashboard",
    dashboardSubtitle: "Paste any news or forwarded information you want to verify. TruthLens will analyse the content and search for supporting evidence.",
    inputTypeHeadline: "Headline",
    inputTypeArticle: "Full Article",
    inputTypeWhatsApp: "WhatsApp Forward",
    inputTypeInstagram: "Instagram Post",
    inputTypeFacebook: "Facebook Post",
    inputTypeUrl: "Website URL",
    placeholderText: "Paste news text, forwarded message, or statement here...",
    placeholderUrl: "Enter complete news article URL (e.g. https://...)",
    charCount: "Characters",
    wordCount: "Words",
    clearBtn: "Clear",
    analyseBtn: "Analyse News",
    quickTestSamples: "Or try a real-world test case:",

    // Duplicate Banner
    duplicateAlertTitle: "Similar Claim Previously Analysed",
    duplicateAlertDesc: "A closely matching claim was found in TruthLens records. You can inspect the existing report or re-verify fresh evidence.",
    viewExistingBtn: "View Saved Report",

    // Progress Stages
    progressStage1: "Stage 1: Content Understanding & Topic Identification",
    progressStage2: "Stage 2: Claim & Entity Extraction (Dates, Locations)",
    progressStage3: "Stage 3: Cross-Source Knowledge & Duplicate Search",
    progressStage4: "Stage 4: Supporting & Contradicting Evidence Retrieval",
    progressStage5: "Stage 5: Context, Freshness & Old News Analysis",
    progressStage6: "Stage 6: Multi-Pillar Credibility Assessment",
    analyzingText: "Synthesizing evidence-backed credibility report...",

    // Results Dashboard
    resultsTitle: "Credibility Analysis Report",
    credibilityScore: "Credibility Score",
    scoreExplain: "Explainable Indicator (0–100)",
    scoreDisclaimer: "This credibility score is an explainable prototype indicator based on retrieved evidence quality and source authority. It is not an automated absolute truth stamp.",
    verdictLabel: "Verification Status",
    verdictReliable: "Likely Reliable",
    verdictMisleading: "Misleading",
    verdictFalse: "Likely False",
    verdictUnverified: "Unverified",
    pillarEvidence: "Evidence Quality",
    pillarAuthority: "Source Authority",
    pillarFreshness: "Context Freshness",
    pillarScope: "Claim Consistency",
    executiveSummary: "Executive Summary",
    originalSubmission: "Submitted Content",
    verifiedOn: "Verified On",
    downloadReport: "Smart PDF Report",
    copySummary: "Copy Summary",
    copied: "Summary Copied!",
    bookmark: "Save Report",
    bookmarked: "Bookmarked",
    feedbackBtn: "Report Issue",

    // Tabs for 6 Features
    tabClaims: "1. Claim-by-Claim",
    tabOldNews: "2. Old News Alert",
    tabEvidence: "3. Evidence Comparison",
    tabSources: "4. Source Reliability",
    tabMissingContext: "5. Missing Context",
    tabTimeline: "6. Context Timeline",
    tabAskAI: "Ask TruthLens AI",

    // Feature 1
    claimsHeadline: "Atomic Claim-by-Claim Verification",
    claimsSub: "Evaluating individual statements prevents a single true sentence from making an entire article appear trustworthy.",
    claimStatus: "Claim Status",
    supportingEv: "Supporting Evidence",
    contradictingEv: "Contradicting Evidence",
    claimExpl: "AI Analysis",

    // Feature 2
    oldNewsTitle: "Old News & Recycled Announcement Detector",
    oldNewsSub: "Detects outdated news, archived weather warnings, or past pandemic orders being falsely recirculated as current.",
    circulatedAs: "Circulated As",
    originalDate: "Original Publication Date",
    timeElapsed: "Time Elapsed",
    currentStatusTitle: "Current Verified Reality",

    // Feature 3
    evidenceComparisonTitle: "Side-by-Side Evidence Comparison Panel",
    evidenceComparisonSub: "Examine corroborating official releases vs contradictory debunks side by side.",
    supportingColumn: "Supporting Corroboration",
    contradictingColumn: "Contradicting Rebuttals",

    // Feature 4
    sourceReliabilityTitle: "Source Reliability & Transparency Audit",
    sourceReliabilitySub: "Transparent classification of publishers without arbitrary or hidden scoring.",
    sourceCategory: "Source Category",
    authorityScore: "Authority Rating",
    independentCheck: "Independent Confirmation",
    available: "Available",
    notAvailable: "Not Available",
    methodologyNote: "Methodology: Sources are audited against public charter standards (official government portals, IFCN-certified fact-checkers, accredited news syndicates).",

    // Feature 5
    missingContextTitle: "Missing Context & Scope Distortion Detector",
    missingContextSub: "Highlights removed dates, exaggerated geographic boundaries, or cherry-picked quotes.",
    omittedScopeLabel: "Distorted / Omitted Scope",
    omittedEntitiesLabel: "Omitted Entities & Caveats",
    criticalCaveatsTitle: "Essential Background Information",

    // Feature 6
    timelineTitle: "Chronological News Evolution Timeline",
    timelineSub: "Understand how the story developed from initial incident to viral resurgence and formal debunk.",

    // Ask AI
    askAITitle: "Ask TruthLens AI Assistant",
    askAISub: "Ask follow-up questions strictly answered using the retrieved verification evidence.",
    suggestedQuestions: "Quick questions to ask:",
    qWhyMisleading: "Why is this news misleading?",
    qWhichSource: "Which source supports this claim?",
    qWhatMissing: "What information was left out?",
    qSimpleEnglish: "Explain this in simple English",
    qNewerUpdate: "Is there a newer update?",
    askPlaceholder: "Ask anything about this verification report...",
    sendBtn: "Ask",

    // History & User Dashboard
    historyTitle: "Verification Search History",
    historySub: "Browse, filter, and review previously verified news claims.",
    searchPlaceholder: "Search by headline, keyword, or topic...",
    filterStatusAll: "All Statuses",
    filterBookmarked: "Bookmarked Only",
    clearHistoryBtn: "Delete",
    noHistoryTitle: "No Verification History Yet",
    noHistoryDesc: "Verify your first news item from the dashboard to track your history here.",

    // Dashboard
    myDashboardTitle: "Personal Verification Dashboard",
    totalVerified: "Total News Analyzed",
    reliableCount: "Likely Reliable",
    misleadingCount: "Misleading",
    falseCount: "Likely False",
    unverifiedCount: "Unverified",
    bookmarkedReports: "Saved Reports",

    // Feedback
    feedbackTitle: "Submit Verification Feedback",
    feedbackSub: "Help us refine TruthLens by reporting issues or inaccuracies.",
    feedbackTypeLabel: "Feedback Type",
    typeIncorrect: "Incorrect Analysis / Rating",
    typeBrokenLink: "Broken Source Link",
    typeMissingContext: "Missing Context / Evidence",
    typeTranslation: "Translation Flaw",
    feedbackCommentPlaceholder: "Please describe the issue or provide a verified source link...",
    submitFeedbackBtn: "Submit Feedback",
    feedbackSuccess: "Thank you for helping keep TruthLens accurate and reliable!",

    // Footer
    footerAbout: "TruthLens is an AI-powered news credibility analysis platform designed to combat misinformation and promote critical media literacy through transparent, evidence-based verification.",
    footerDisclaimer: "Disclaimer: TruthLens provides prototype credibility indicators based on corroborating documentation from open sources and fact-checking registries. It does not replace independent critical judgment.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact Team"
  },

  ta: {
    // Nav
    appName: "ட்ரூத்லென்ஸ்",
    tagline: "படித்தவுடன் நம்பாதீர்கள். உண்மை அறிந்து நம்புங்கள்.",
    home: "முகப்பு",
    verify: "செய்தி சரிபார்ப்பு",
    features: "சிறப்பம்சங்கள்",
    howItWorks: "எவ்வாறு செயல்படுகிறது",
    history: "வரலாறு",
    dashboard: "என் பக்கம்",
    loginProfile: "மாதிரி கணக்கு",
    langToggle: "தமிழ்",

    // Hero
    heroHeadline: "நீங்கள் படிப்பது உண்மையா?",
    heroSubtext: "இணையத்தில் பகிரப்படும் செய்திகளின் உண்மையை AI பகுப்பாய்வு, தனித்தனி கூற்றுகளின் பிரித்தெடுப்பு மற்றும் நம்பகமான ஆதாரங்கள் மூலம் கண்டறியுங்கள்.",
    verifyNowBtn: "செய்தியை சரிபார்க்கவும்",
    exploreFeaturesBtn: "அம்சங்களை ஆராய்க",
    liveDemoMetrics: "செயல்திட்ட நேரடி அளவீடுகள்",
    statChecks: "சரிபார்க்கப்பட்ட கூற்றுகள்",
    statSources: "அங்கீகரிக்கப்பட்ட ஆதாரங்கள்",
    statLanguages: "இருமொழி பகுப்பாய்வு (தமிழ் & ஆங்கிலம்)",
    statAccuracy: "வெளிப்படையான தணிக்கை முறை",

    // 4 Highlights
    highlight1Title: "நம்பகமான ஆதார சரிபார்ப்பு",
    highlight1Desc: "அரசு உண்மை சரிபார்ப்பு பிரிவு (PIB), Alt News, BOOM, ராய்ட்டர்ஸ் மற்றும் அதிகாரப்பூர்வ அரசிதழ்கள் மூலம் சரிபார்க்கிறது.",
    highlight2Title: "AI வழி செய்தி பகுப்பாய்வு",
    highlight2Desc: "வாட்ஸ்அப் பகிர்வுகள் மற்றும் கட்டுரைகளை தனித்தனி உண்மை கூற்றுகளாகவும் கால நிகழ்வுகளாகவும் பிரிக்கிறது.",
    highlight3Title: "நம்பகத்தன்மை மதிப்பீடு",
    highlight3Desc: "ஆதாரங்களின் தரம், மூலங்களின் அதிகாரம், காலப் பொருத்தம் ஆகியவற்றின் அடிப்படையில் 0–100 மதிப்பீட்டை வழங்குகிறது.",
    highlight4Title: "தமிழ் மற்றும் ஆங்கில ஆதரவு",
    highlight4Desc: "தமிழில் பகிரப்படும் செய்திகளை நேரடியாக சமர்ப்பித்து தமிழிலேயே முழுமையான ஆதார அறிக்கையையும் விளக்கத்தையும் பெறலாம்.",

    // How it works
    workflowTitle: "ட்ரூத்லென்ஸ் எவ்வாறு செயல்படுகிறது?",
    workflowSubtitle: "வைரல் செய்தியிலிருந்து ஆதார அறிக்கை வரை 4 எளிய நிலைகள்",
    step1Title: "செய்தியை உள்ளிடவும்",
    step1Desc: "தலைப்பு, முழு கட்டுரை, வாட்ஸ்அப் பகிர்வு அல்லது இணைய முகவரியை பேஸ்ட் செய்யவும்.",
    step2Title: "AI பகுப்பாய்வு",
    step2Desc: "செய்தியிலுள்ள கூற்றுகள், இடங்கள், நபர்கள் மற்றும் தேதிகளை AI பிரித்தெடுக்கிறது.",
    step3Title: "ஆதாரங்கள் தேடல்",
    step3Desc: "அதிகாரப்பூர்வ அரசு வெளியீடுகள் மற்றும் செய்தி காப்பகங்களிலிருந்து சான்றுகளை தேடுகிறது.",
    step4Title: "முடிவுகளை பெறவும்",
    step4Desc: "நம்பகத்தன்மை மதிப்பெண், காலவரிசை மற்றும் AI உதவியாளருடன் கூடிய அறிக்கையை பெறுக.",

    // Dashboard Input
    dashboardTitle: "செய்தி சரிபார்ப்பு மையம்",
    dashboardSubtitle: "நீங்கள் சரிபார்க்க விரும்பும் எந்தவொரு செய்தி அல்லது வாட்ஸ்அப் தகவலையும் உள்ளிடவும். ட்ரூத்லென்ஸ் ஆதாரங்களை ஆராயும்.",
    inputTypeHeadline: "தலைப்பு",
    inputTypeArticle: "முழு கட்டுரை",
    inputTypeWhatsApp: "வாட்ஸ்அப் பகிர்வு",
    inputTypeInstagram: "இன்ஸ்டாகிராம் பதிவு",
    inputTypeFacebook: "பேஸ்புக் பதிவு",
    inputTypeUrl: "இணையதள முகவரி (URL)",
    placeholderText: "செய்தி, வாட்ஸ்அப் செய்தி அல்லது அறிக்கையை இங்கே ஒட்டவும்...",
    placeholderUrl: "முழு செய்தி இணையதள முகவரியை உள்ளிடவும் (எ.கா: https://...)",
    charCount: "எழுத்துக்கள்",
    wordCount: "சொற்கள்",
    clearBtn: "அழிக்க",
    analyseBtn: "செய்தியை சரிபார்க்க",
    quickTestSamples: "அல்லது உண்மை மாதிரி செய்தியை சோதிக்கவும்:",

    // Duplicate Banner
    duplicateAlertTitle: "இதேபோன்ற செய்தி ஏற்கனவே சரிபார்க்கப்பட்டுள்ளது",
    duplicateAlertDesc: "ட்ரூத்லென்ஸ் பதிவுகளில் இதற்கு இணையான தகவல் ஏற்கனவே உள்ளது. பழைய அறிக்கையைக் காணலாம் அல்லது மீண்டும் சரிபார்க்கலாம்.",
    viewExistingBtn: "சேமிக்கப்பட்ட அறிக்கையைக் காண்க",

    // Progress Stages
    progressStage1: "நிலை 1: உள்ளடக்கத்தை புரிந்துகொள்ளுதல் & தலைப்பு அடையாளம்",
    progressStage2: "நிலை 2: தனித்தனி கூற்றுகள் மற்றும் தரவுகள் பிரித்தெடுத்தல்",
    progressStage3: "நிலை 3: ஆதார காப்பகங்கள் & முந்தைய பதிவுகள் தேடல்",
    progressStage4: "நிலை 4: ஆதரவு மற்றும் முரண்பட்ட ஆதாரங்களை ஒப்பிடுதல்",
    progressStage5: "நிலை 5: சூழல் மற்றும் பழைய செய்தி ஆய்வு",
    progressStage6: "நிலை 6: முழுமையான நம்பகத்தன்மை அறிக்கை தயாரிப்பு",
    analyzingText: "ஆதாரங்களுடன் கூடிய உண்மை அறிக்கை தயாராகிறது...",

    // Results Dashboard
    resultsTitle: "நம்பகத்தன்மை பகுப்பாய்வு அறிக்கை",
    credibilityScore: "நம்பகத்தன்மை மதிப்பீடு",
    scoreExplain: "வெளிப்படையான அளவீடு (0–100)",
    scoreDisclaimer: "இந்த மதிப்பீடு கிடைக்கப்பெற்ற ஆதாரங்களின் அடிப்படையில் கணக்கிடப்பட்ட முன்மாதிரி வழிகாட்டியாகும். இது முழுமையான இறுதித் தீர்ப்பல்ல.",
    verdictLabel: "முடிவு நிலை",
    verdictReliable: "நம்பகமானது",
    verdictMisleading: "தவறாக வழிநடத்துகிறது",
    verdictFalse: "பொய்யானது",
    verdictUnverified: "உறுதிப்படுத்தப்படவில்லை",
    pillarEvidence: "ஆதாரங்களின் தரம்",
    pillarAuthority: "மூலங்களின் நம்பகத்தன்மை",
    pillarFreshness: "காலப் பொருத்தம்",
    pillarScope: "கூற்றின் நிலைத்தன்மை",
    executiveSummary: "முதன்மை சுருக்கம்",
    originalSubmission: "சமர்ப்பிக்கப்பட்ட செய்தி",
    verifiedOn: "சரிபார்க்கப்பட்ட நாள்",
    downloadReport: "PDF அறிக்கை பதிவிறக்கம்",
    copySummary: "சுருக்கத்தை நகலெடு",
    copied: "நகலெடுக்கப்பட்டது!",
    bookmark: "அறிக்கையை சேமிக்க",
    bookmarked: "சேமிக்கப்பட்டது",
    feedbackBtn: "கருத்து தெரிவிக்க",

    // Tabs for 6 Features
    tabClaims: "1. கூற்று வாரியாக",
    tabOldNews: "2. பழைய செய்தி எச்சரிக்கை",
    tabEvidence: "3. ஆதாரங்கள் ஒப்பீடு",
    tabSources: "4. மூலங்களின் நம்பகத்தன்மை",
    tabMissingContext: "5. மறைக்கப்பட்ட சூழல்",
    tabTimeline: "6. காலவரிசை",
    tabAskAI: "ட்ரூத்லென்ஸ் AI-யிடம் கேளுங்கள்",

    // Feature 1
    claimsHeadline: "தனித்தனி கூற்று வாரியான உண்மை சரிபார்ப்பு",
    claimsSub: "முழு செய்தியையும் ஒன்றாக பார்க்காமல், ஒவ்வொரு வாக்கியத்தையும் தனித்தனியாக பிரித்து உண்மை கண்டறிதல்.",
    claimStatus: "கூற்றின் நிலை",
    supportingEv: "ஆதரிக்கும் சான்றுகள்",
    contradictingEv: "மறுக்கும் சான்றுகள்",
    claimExpl: "AI விளக்கம்",

    // Feature 2
    oldNewsTitle: "பழைய செய்தி & மறுசுழற்சி எச்சரிக்கை",
    oldNewsSub: "பல ஆண்டுகளுக்கு முந்தைய பழைய இயற்கை பேரிடர் அல்லது கரோனா கால அறிவிப்புகளை தற்போது புதியது போல் பரப்புவதை கண்டறிதல்.",
    circulatedAs: "தற்போது பரப்பப்படும் சூழல்",
    originalDate: "அசல் செய்தி வெளியான நாள்",
    timeElapsed: "கடந்துவிட்ட காலம்",
    currentStatusTitle: "தற்போதைய உண்மை நிலைவரம்",

    // Feature 3
    evidenceComparisonTitle: "நேருக்கு நேர் ஆதாரங்கள் ஒப்பீட்டு பலகை",
    evidenceComparisonSub: "செய்தியை ஆதரிக்கும் அரசு சான்றுகளையும், அதனை மறுக்கும் உண்மை சரிபார்ப்புகளையும் ஒரே இடத்தில் காணுங்கள்.",
    supportingColumn: "ஆதரிக்கும் அதிகாரப்பூர்வ சான்றுகள்",
    contradictingColumn: "மறுக்கும் சான்றுகள் மற்றும் மறுப்புகள்",

    // Feature 4
    sourceReliabilityTitle: "மூலங்களின் நம்பகத்தன்மை தணிக்கை",
    sourceReliabilitySub: "செய்தி வெளியீட்டாளர்களின் நம்பகத்தன்மையை வெளிப்படையான அளவுகோல்களுடன் சரிபார்த்தல்.",
    sourceCategory: "மூல வகை",
    authorityScore: "அதிகார மதிப்பீடு",
    independentCheck: "சுயாதீன உறுதிப்படுத்தல்",
    available: "உள்ளது",
    notAvailable: "இல்லை",
    methodologyNote: "தணிக்கை நெறிமுறை: அரசு போர்ட்டல்கள், சர்வதேச IFCN சான்றளிக்கப்பட்ட அமைப்புகள் மற்றும் முன்னணி செய்தி நிறுவனங்களின் அடிப்படையில் வகைப்படுத்தப்படுகிறது.",

    // Feature 5
    missingContextTitle: "மறைக்கப்பட்ட சூழல் & எல்லை திரிபு கண்டறிதல்",
    missingContextSub: "அசல் செய்தியிலிருந்து நீக்கப்பட்ட முக்கிய தேதிகள், குறிப்பிட்ட மாவட்ட எல்லைகள் மற்றும் நிபந்தனைகளை அடையாளம் காணுதல்.",
    omittedScopeLabel: "திரிக்கப்பட்ட அல்லது நீக்கப்பட்ட எல்லை",
    omittedEntitiesLabel: "விடுபட்ட அரசு அமைப்புகள் & நிபந்தனைகள்",
    criticalCaveatsTitle: "அவசியம் தெரிந்துகொள்ள வேண்டிய பின்னணி",

    // Feature 6
    timelineTitle: "செய்தி பரிணாம காலவரிசை",
    timelineSub: "செய்தி தோன்றிய ஆரம்ப நாள் முதல், சமூக வலைத்தளங்களில் பரவி உண்மை சரிபார்க்கப்பட்டது வரையிலான காலவரிசை.",

    // Ask AI
    askAITitle: "ட்ரூத்லென்ஸ் AI உதவியாளர்",
    askAISub: "இந்த உண்மை அறிக்கையின் ஆதாரங்கள் அடிப்படையில் உங்கள் சந்தேகங்களை கேளுங்கள்.",
    suggestedQuestions: "பரிந்துரைக்கப்படும் கேள்விகள்:",
    qWhyMisleading: "இச்செய்தி ஏன் தவறாக வழிநடத்துகிறது?",
    qWhichSource: "இதை எந்த ஆதாரம் உறுதி செய்கிறது?",
    qWhatMissing: "இதில் என்ன தகவல் மறைக்கப்பட்டுள்ளது?",
    qSimpleEnglish: "இதை எளிய தமிழில் விவரிக்கவும்",
    qNewerUpdate: "இதற்கு புதிய அதிகாரப்பூர்வ அறிக்கை ஏதேனும் உள்ளதா?",
    askPlaceholder: "இந்த அறிக்கையைப் பற்றி எதையும் கேளுங்கள்...",
    sendBtn: "கேள்",

    // History & User Dashboard
    historyTitle: "சரிபார்ப்பு வரலாறு",
    historySub: "முன்னர் சரிபார்க்கப்பட்ட செய்திகளை தேடவும், வடிகட்டவும், பார்வையிடவும்.",
    searchPlaceholder: "தலைப்பு அல்லது முக்கிய சொல்லால் தேடவும்...",
    filterStatusAll: "அனைத்து நிலைகளும்",
    filterBookmarked: "சேமிக்கப்பட்டவை மட்டும்",
    clearHistoryBtn: "அழிக்க",
    noHistoryTitle: "சரிபார்ப்பு வரலாறு ஏதுமில்லை",
    noHistoryDesc: "உங்கள் முதல் செய்தியை முகப்பு பலகையில் சரிபார்த்து இங்கு கண்காணிக்கலாம்.",

    // Dashboard
    myDashboardTitle: "தனிநபர் சரிபார்ப்பு மேலாண்மை பலகை",
    totalVerified: "மொத்த சரிபார்ப்புகள்",
    reliableCount: "நம்பகமானது",
    misleadingCount: "தவறாக வழிநடத்துகிறது",
    falseCount: "பொய்யானது",
    unverifiedCount: "உறுதிப்படுத்தப்படவில்லை",
    bookmarkedReports: "சேமிக்கப்பட்ட அறிக்கைகள்",

    // Feedback
    feedbackTitle: "சரிபார்ப்பு குறித்த கருத்து தெரிவிக்க",
    feedbackSub: "ட்ரூத்லென்ஸை மேம்படுத்த உங்கள் கருத்துக்களை அல்லது தவறுகளை பகிருங்கள்.",
    feedbackTypeLabel: "கருத்து வகை",
    typeIncorrect: "தவறான மதிப்பீடு / முடிவு",
    typeBrokenLink: "செயல்படாத ஆதாரம் இணைப்பு",
    typeMissingContext: "விடுபட்ட சூழல் / புதிய ஆதாரம்",
    typeTranslation: "மொழிபெயர்ப்பு பிழை",
    feedbackCommentPlaceholder: "உங்கள் விளக்கத்தை அல்லது ஆதார இணைப்பை உள்ளிடவும்...",
    submitFeedbackBtn: "கருத்தை அனுப்பு",
    feedbackSuccess: "உங்கள் கருத்துக்கு நன்றி! இது ட்ரூத்லென்ஸை மேலும் துல்லியமாக்க உதவும்.",

    // Footer
    footerAbout: "ட்ரூத்லென்ஸ் என்பது இணையத்தில் பரவும் வதந்திகளை களைந்து, மக்கள் உண்மையை ஆதாரங்களுடன் அறிந்துகொள்ள உதவும் AI அடிப்படையிலான செய்தி சரிபார்ப்பு தளம்.",
    footerDisclaimer: "பொறுப்பு துறப்பு: ட்ரூத்லென்ஸ் வழங்கும் அறிக்கைகள் பொது ஆவணங்கள் மற்றும் உண்மை சரிபார்ப்பு அமைப்புகளின் அடிப்படையில் கணக்கிடப்பட்ட வழிகாட்டியாகும். தனிநபர் சிந்தனையுடன் செய்திகளை அணுகவும்.",
    privacy: "தனியுரிமைக் கொள்கை",
    terms: "விதிமுறைகள்",
    contact: "தொடர்புக்கு"
  }
};
