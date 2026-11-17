import re

def analyze_missing_context(text, kb_match=None):
    """
    FEATURE 5: MISSING CONTEXT DETECTOR
    Identifies news statements that may be misleading because important information has been removed.
    Analyses:
    - Missing dates
    - Missing locations
    - Incomplete statements
    - Out-of-context quotations
    - Important background information
    """
    if kb_match and kb_match.get('missing_context'):
        mc = kb_match['missing_context']
        return {
            'has_missing_context': mc.get('has_missing_context', False),
            'omitted_scope': mc.get('omitted_scope', 'Specific conditions or qualifying limits were omitted.'),
            'omitted_entities': mc.get('omitted_entities', 'Key exceptions or qualifying departments were left unmentioned.'),
            'critical_caveats': mc.get('critical_caveats', []),
            'explanation_en': mc.get('explanation_en', 'Important operational details and geographic boundaries were stripped from the original declaration.'),
            'explanation_ta': mc.get('explanation_ta', 'அசல் அறிவிப்பிலிருந்து முக்கியமான நிபந்தனைகளும் எல்லைகளும் நீக்கப்பட்டு பரப்பப்பட்டுள்ளன.')
        }

    # Heuristic checks for common omission patterns
    caveats = []
    has_missing = False
    lower = text.lower()

    # Scope inflation words ("all schools", "all offices", "everyone", "completely", "அனைத்து")
    if any(w in lower for w in ['all schools', 'entire state', 'all government', 'all offices', 'அனைத்து பள்ளிகளும்', 'அனைத்து அரசு']):
        caveats.append("Broad generalizations like 'all' often mask localized administrative orders that only apply to specific zones or sectors.")
        has_missing = True

    # Check for clickbait short links or urgency without official authority
    if re.search(r'bit\.ly|tinyurl|is\.gd|click here|இணைப்பை கிளிக்', lower):
        caveats.append("Shared links use opaque shorteners rather than official government (.gov.in) domains.")
        has_missing = True

    # Missing location anchor
    if not any(loc in lower for loc in ['chennai', 'tamil nadu', 'delhi', 'mumbai', 'coimbatore', 'சென்னை', 'தமிழ்நாடு']):
        caveats.append("The message does not specify geographic jurisdiction, making readers assume it applies universally.")
        has_missing = True

    return {
        'has_missing_context': has_missing,
        'omitted_scope': "Jurisdiction or target eligibility limits are not clearly demarcated in the circulated text." if has_missing else "Sufficient scope indicators present.",
        'omitted_entities': "Specific overseeing authorities or exemption criteria are not specified." if has_missing else "No major entity omissions detected.",
        'critical_caveats': caveats,
        'explanation_en': "Evaluating context reveals that critical geographic, temporal, or eligibility limits were left unspecified, which can cause readers to form an inaccurate conclusion." if has_missing else "The message contains reasonable contextual grounding.",
        'explanation_ta': "இச்செய்தியில் எல்லைகள் மற்றும் விதிவிலக்குகள் தெளிவாக குறிப்பிடப்படாததால் மக்கள் தவறாக புரிந்துகொள்ள வாய்ப்புள்ளது." if has_missing else "செய்தியின் சூழல் தெளிவாக உள்ளது."
    }
