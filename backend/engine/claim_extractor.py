import re

def detect_language(text):
    # Tamil Unicode block: \u0B80 - \u0BFF
    tamil_chars = len(re.findall(r'[\u0B80-\u0BFF]', text))
    total_alpha = len(re.findall(r'[\w]', text))
    if total_alpha > 0 and (tamil_chars / total_alpha) > 0.15:
        return 'ta'
    return 'en'

def clean_input_text(raw_text, input_type='headline'):
    text = raw_text.strip()
    
    # Strip URL formatting if given a website URL
    if input_type == 'url' or text.startswith(('http://', 'https://')):
        # Extract title-like slug or readable phrase from URL if raw URL passed
        match = re.search(r'https?://(?:www\.)?([^/]+)(?:/(.+))?', text)
        if match:
            domain, path = match.groups()
            path_words = re.sub(r'[-_/.]+', ' ', path or '').strip()
            if path_words:
                text = f"News report from {domain}: {path_words}"
            else:
                text = f"Content from {domain}"
        return text

    # Strip typical WhatsApp forward banners
    text = re.sub(r'^\s*[*_~]?Forwarded as received[*_~]?\s*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^\s*[*_~]?Forwarded[*_~]?\s*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^\s*[*_~]?BREAKING NEWS[*_~]?:?\s*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^\s*[*_~]?முக்கிய செய்தி[*_~]?:?\s*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^\s*[*_~]?அதிர்ச்சி செய்தி[*_~]?:?\s*', '', text, flags=re.IGNORECASE)

    # Clean redundant whitespaces
    text = re.sub(r'\r\n|\r', '\n', text)
    text = re.sub(r'\n{2,}', '\n', text)
    return text.strip()

def extract_entities(text):
    entities = {
        'dates': [],
        'locations': [],
        'organizations': [],
        'amounts': []
    }

    # Extract dates / years
    year_matches = re.findall(r'\b(19\d\d|20\d\d)\b', text)
    entities['dates'].extend(list(set(year_matches)))
    
    date_words = re.findall(r'\b(?:tomorrow|today|yesterday|tomorrow morning|tonight|நாளை|இன்று|நேற்று)\b', text, flags=re.IGNORECASE)
    entities['dates'].extend(list(set(date_words)))

    # Extract locations (Tamil and English)
    loc_keywords = [
        'chennai', 'tamil nadu', 'coimbatore', 'madurai', 'tiruvallur', 'kanchipuram', 'delhi', 'mumbai',
        'sriharikota', 'mamallapuram', 'இந்தியா', 'சென்னை', 'தமிழ்நாடு', 'கோவை', 'மதுரை'
    ]
    for loc in loc_keywords:
        if re.search(r'\b' + re.escape(loc) + r'\b', text, flags=re.IGNORECASE):
            entities['locations'].append(loc.title())

    # Extract organizations / government bodies
    org_keywords = [
        'imd', 'collector', 'isro', 'who', 'pib', 'government', 'ministry', 'collectorate', 'cert-in',
        'வானிலை ஆய்வு மையம்', 'மாவட்ட ஆட்சியர்', 'இஸ்ரோ', 'அரசு', 'அமைச்சகம்'
    ]
    for org in org_keywords:
        if re.search(r'\b' + re.escape(org) + r'\b', text, flags=re.IGNORECASE):
            entities['organizations'].append(org.upper())

    # Extract monetary figures
    amount_matches = re.findall(r'(?:rs\.?|inr|₹|ரூ\.?)\s*[\d,]+(?:\s*(?:crore|lakh|thousand))?', text, flags=re.IGNORECASE)
    entities['amounts'].extend(amount_matches)

    return entities

def extract_claims_from_text(text, language='en'):
    """
    Deconstructs an article or forwarded message into atomic factual claims.
    Feature 1: Claim-by-Claim Verification
    """
    clean = clean_input_text(text)
    
    # Split by sentence terminators or bullet points
    raw_sentences = re.split(r'(?<=[.!?।])\s+|\n+|(?:(?<=[a-zA-Z0-9\u0B80-\u0BFF])\.\s+)', clean)
    sentences = [s.strip() for s in raw_sentences if s and len(s.strip()) > 10]

    # If only 1 sentence or short input, check for coordinating conjunctions
    if len(sentences) <= 1:
        parts = re.split(r'\s+(?:and also|and|மேலும்|மற்றும்)\s+', clean, flags=re.IGNORECASE)
        if len(parts) > 1:
            sentences = [p.strip() for p in parts if len(p.strip()) > 8]

    if not sentences:
        sentences = [clean] if clean else ["No verifiable statement found."]

    extracted = []
    for idx, s in enumerate(sentences[:6], start=1):
        extracted.append({
            'claim_id': f"claim-{idx}",
            'statement': s,
            'extracted_entities': extract_entities(s)
        })

    return extracted
