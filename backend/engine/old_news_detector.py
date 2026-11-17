import re
from datetime import datetime

CURRENT_YEAR = 2026

def analyze_old_news(text, kb_match=None):
    """
    FEATURE 2: OLD NEWS DETECTOR
    Identifies outdated news or announcements being shared as recent information.
    Checks:
    - Original publication date
    - Date of current announcement
    - Previous related reports
    - Latest available updates
    """
    if kb_match and kb_match.get('is_outdated'):
        details = kb_match.get('old_news_details', {})
        orig_year = details.get('original_year', 'Previous Year')
        orig_date = details.get('original_event_date', orig_year)
        gap = details.get('time_gap_years', 3)
        return {
            'is_old_news': True,
            'original_date': orig_date,
            'circulation_date': f"November {CURRENT_YEAR}",
            'time_gap': f"{gap} years ago",
            'alert_title_en': f"Old News Alert: Recycled Report from {orig_year}",
            'alert_title_ta': f"பழைய செய்தி எச்சரிக்கை: {orig_year}-ஆம் ஆண்டின் தகவல்",
            'alert_message_en': f"This report originated in {orig_date} and is being circulated as current news in {CURRENT_YEAR}. Official records confirm this event is not happening today.",
            'alert_message_ta': f"இந்த செய்தி {orig_date} அன்று நிகழ்ந்தது. தற்போது {CURRENT_YEAR}-ல் இது மீண்டும் புதிய செய்தி போல் பரப்பப்படுகிறது. தற்போது இத்தகைய நிகழ்வு ஏதும் இல்லை.",
            'current_status_en': details.get('current_status', 'No active emergency or event under this title today.'),
            'current_status_ta': 'தற்போது இத்தகைய அவசர எச்சரிக்கை ஏதும் நடைமுறையில் இல்லை.',
            'newer_update_available': details.get('newer_update_available', True)
        }

    # Heuristic detection for past years embedded in text
    years = re.findall(r'\b(201\d|202[0-4])\b', text)
    if years:
        earliest_year = min([int(y) for y in years])
        gap = CURRENT_YEAR - earliest_year
        if gap >= 2:
            return {
                'is_old_news': True,
                'original_date': str(earliest_year),
                'circulation_date': f"November {CURRENT_YEAR}",
                'time_gap': f"{gap} years ago",
                'alert_title_en': f"Potential Outdated Information (Dated {earliest_year})",
                'alert_title_ta': f"பழைய செய்தி எச்சரிக்கை ({earliest_year})",
                'alert_message_en': f"The submitted text explicitly references records or timestamps from {earliest_year} ({gap} years ago). Verify whether this is being shared out of historical context.",
                'alert_message_ta': f"இச்செய்தி {earliest_year}-ஆம் ஆண்டுடன் தொடர்புடையது. {gap} வருட பழைய செய்தி தற்போதைய சூழலுக்கு பொருந்தாது.",
                'current_status_en': f"Circulated in {CURRENT_YEAR} without clarifying historical context.",
                'current_status_ta': f"பழைய சூழல் மறைக்கப்பட்டு {CURRENT_YEAR}-ல் பகிரப்பட்டுள்ளது.",
                'newer_update_available': True
            }

    return {
        'is_old_news': False,
        'original_date': f"November {CURRENT_YEAR}",
        'circulation_date': f"November {CURRENT_YEAR}",
        'time_gap': "Current",
        'alert_title_en': None,
        'alert_title_ta': None,
        'alert_message_en': None,
        'alert_message_ta': None,
        'current_status_en': "No historical timestamp discrepancy detected.",
        'current_status_ta': "பழைய செய்தி முரண்பாடுகள் ஏதும் கண்டறியப்படவில்லை.",
        'newer_update_available': False
    }
