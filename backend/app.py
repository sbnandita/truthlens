import os
import uuid
from datetime import datetime, timezone
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from database import (
    init_db,
    save_verification,
    get_history,
    get_verification_by_id,
    toggle_bookmark,
    delete_verification,
    save_feedback,
    get_statistics,
    find_duplicate_claim
)
from engine.claim_extractor import detect_language, clean_input_text, extract_claims_from_text, extract_entities
from engine.evidence_retriever import match_knowledge_base, retrieve_evidence_and_sources
from engine.old_news_detector import analyze_old_news
from engine.missing_context_detector import analyze_missing_context
from engine.timeline_builder import build_timeline
from engine.credibility_scorer import calculate_credibility
from engine.ai_assistant import ask_assistant

DIST_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'frontend', 'dist')
app = Flask(__name__, static_folder=DIST_DIR, static_url_path='')
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Ensure database is initialized
init_db()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path.startswith('api/'):
        return jsonify({'error': 'Not found'}), 404
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    elif os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    return "TruthLens API Server is Running.", 200

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'TruthLens AI Verification Engine',
        'version': '2.0.0',
        'timestamp': datetime.now(timezone.utc).isoformat()
    })

@app.route('/api/samples', methods=['GET'])
def get_samples():
    """
    Pre-curated demonstration test cases for testing all 6 innovative features.
    """
    samples = [
        {
            'id': 'sample-1',
            'tag': 'WhatsApp Rain Forward (Claim-by-Claim + Missing Context)',
            'input_type': 'whatsapp',
            'text': 'Heavy rainfall is expected in Chennai. Schools will remain closed tomorrow. All government offices will also remain closed.',
            'text_ta': 'சென்னையில் கனமழை எச்சரிக்கை. நாளை பள்ளிகளுக்கு விடுமுறை. அனைத்து அரசு அலுவலகங்களும் மூடப்படும்.',
            'category': 'Weather & Education',
            'highlight': 'Tests 3 atomic claims with mixed truth and missing context'
        },
        {
            'id': 'sample-2',
            'tag': 'Recycled Cyclone Warning (Old News Detector)',
            'input_type': 'facebook',
            'text': 'Severe Cyclonic Storm Mandous approaching Tamil Nadu coast with 100 km/h wind alert. Red alert declared for today.',
            'text_ta': 'மாண்டஸ் தீவிர புயல் சென்னை கடற்கரையை நெருங்குகிறது - ரெட் அலர்ட் எச்சரிக்கை.',
            'category': 'Disaster & Weather',
            'highlight': 'Tests 2022 recycled emergency warning in 2026'
        },
        {
            'id': 'sample-3',
            'tag': 'Government Scheme Phishing (Phishing Scam & PIB Fact Check)',
            'input_type': 'whatsapp',
            'text': 'Central government offering Rs 50,000 cash subsidy under PM Kanya Ayush Yojana via online link bit.ly/pm-kanya-free.',
            'text_ta': 'பிரதமர் கன்யா ஆயுஷ் திட்டத்தின் கீழ் ரூ.50,000 இலவச உதவித்தொகை - வைரல் இணைப்பு bit.ly/pm-kanya-free.',
            'category': 'Government Scheme',
            'highlight': 'Tests PIB Fact Check debunk of fake financial subsidy'
        },
        {
            'id': 'sample-4',
            'tag': 'Medical Home Remedy Cure (Health Claim & WHO Guidelines)',
            'input_type': 'article',
            'text': 'Drinking boiled ginger water with lemon completely cures viral infections in 24 hours without medicine as confirmed by WHO.',
            'text_ta': 'இஞ்சி மற்றும் எலுமிச்சை சாறு அருந்தினால் 24 மணி நேரத்தில் வைரஸ் தொற்று குணமாகும் என WHO உறுதிப்படுத்தியுள்ளது.',
            'category': 'Medical & Health',
            'highlight': 'Tests evidence comparison on viral healthcare claim'
        },
        {
            'id': 'sample-5',
            'tag': 'ISRO Satellite Launch (Reliable Benchmark)',
            'input_type': 'headline',
            'text': 'ISRO successfully launched the NVS-02 navigation satellite into GTO using GSLV-F12 from Sriharikota.',
            'text_ta': 'இஸ்ரோ ஸ்ரீஹரிகோட்டாவில் இருந்து ஜிஎஸ்எல்வி-எஃப்12 மூலம் என்விஎஸ்-02 வழிகாட்டுதல் செயற்கைக்கோளை வெற்றிகரமாக ஏவியது.',
            'category': 'Science & Space',
            'highlight': 'Tests verified reliable news with primary telemetry'
        },
        {
            'id': 'sample-6',
            'tag': 'Tamil Nadu Board Exam Cancellation (Altered Video & Tamil)',
            'input_type': 'instagram',
            'text': 'தமிழ்நாட்டில் 10 மற்றும் 12-ஆம் வகுப்பு பொதுத்தேர்வுகள் ரத்து செய்யப்படுவதாக பள்ளிக்கல்வித்துறை அமைச்சர் அறிவித்துள்ளார்.',
            'text_ta': 'தமிழ்நாட்டில் 10 மற்றும் 12-ஆம் வகுப்பு பொதுத்தேர்வுகள் ரத்து செய்யப்படுவதாக பள்ளிக்கல்வித்துறை அமைச்சர் அறிவித்துள்ளார்.',
            'category': 'Tamil Nadu Education',
            'highlight': 'Tests 2021 Covid clip recirculated in Tamil'
        }
    ]
    return jsonify({'samples': samples})

@app.route('/api/check-duplicate', methods=['POST'])
def check_duplicate():
    data = request.get_json() or {}
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'has_duplicate': False})

    duplicate = find_duplicate_claim(text)
    if duplicate:
        return jsonify({
            'has_duplicate': True,
            'match': duplicate
        })
    return jsonify({'has_duplicate': False})

@app.route('/api/verify', methods=['POST'])
def verify_news():
    """
    Main Multi-Stage Verification Pipeline (Stages 1-6)
    """
    data = request.get_json() or {}
    raw_text = data.get('text', '').strip()
    input_type = data.get('input_type', 'headline')
    user_lang = data.get('language')  # 'en' or 'ta'

    if not raw_text:
        return jsonify({'error': 'Input text cannot be empty. Please paste a headline, article, or URL.'}), 400

    if len(raw_text) < 5:
        return jsonify({'error': 'Input text is too short to extract verifiable factual claims.'}), 400

    # STAGE 1: Content Understanding & Language Identification
    detected_lang = detect_language(raw_text)
    active_lang = user_lang if user_lang in ['en', 'ta'] else detected_lang
    cleaned_text = clean_input_text(raw_text, input_type)

    # STAGE 2: Claim Extraction & Entity Extraction
    claims_extracted = extract_claims_from_text(cleaned_text, active_lang)
    entities = extract_entities(cleaned_text)

    # STAGE 3: Source Search & Duplicate Detection
    duplicate_match = find_duplicate_claim(cleaned_text)
    kb_match = match_knowledge_base(cleaned_text)

    # STAGE 4: Evidence Comparison & Source Reliability Audit
    evidence_bundle = retrieve_evidence_and_sources(claims_extracted, kb_match, active_lang)
    verified_claims = evidence_bundle['verified_claims']
    supporting_evidence = evidence_bundle['supporting_evidence']
    contradicting_evidence = evidence_bundle['contradicting_evidence']
    sources_catalog = evidence_bundle['sources_catalog']

    # STAGE 5: Context & Temporal Freshness Analysis
    old_news_result = analyze_old_news(cleaned_text, kb_match)
    missing_context_result = analyze_missing_context(cleaned_text, kb_match)

    # STAGE 6: Credibility Assessment & Timeline Construction
    timeline = build_timeline(verified_claims, kb_match, active_lang)
    scoring_result = calculate_credibility(
        verified_claims,
        old_news_result,
        missing_context_result,
        sources_catalog,
        kb_match,
        active_lang
    )

    # Determine Headline
    if kb_match:
        headline = kb_match.get('tamil_headline' if active_lang == 'ta' else 'canonical_headline')
        topic = kb_match.get('topic', 'General News')
    else:
        first_line = cleaned_text.split('\n')[0]
        headline = first_line[:120] + ('...' if len(first_line) > 120 else '')
        topic = "Current Affairs"

    v_id = f"tl-{uuid.uuid4().hex[:10]}"
    verification_date = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    result_payload = {
        'id': v_id,
        'headline': headline,
        'input_type': input_type,
        'input_text': raw_text,
        'topic': topic,
        'language': active_lang,
        'verification_date': verification_date,
        'credibility_score': scoring_result['score'],
        'verdict': scoring_result['verdict'],
        'score_factors': scoring_result['factors'],
        'summary': scoring_result['summary'],
        'claims': verified_claims,
        'claims_count': len(verified_claims),
        'entities': entities,
        'supporting_evidence': supporting_evidence,
        'contradicting_evidence': contradicting_evidence,
        'sources_catalog': sources_catalog,
        'old_news': old_news_result,
        'missing_context': missing_context_result,
        'timeline': timeline,
        'duplicate_match': duplicate_match,
        'is_bookmarked': False
    }

    # Save to SQLite Database
    save_verification({
        'id': v_id,
        'input_text': raw_text,
        'input_type': input_type,
        'headline': headline,
        'topic': topic,
        'credibility_score': scoring_result['score'],
        'verdict': scoring_result['verdict'],
        'language': active_lang,
        'result': result_payload,
        'is_bookmarked': 0,
        'created_at': datetime.now(timezone.utc).isoformat()
    })

    return jsonify(result_payload)

@app.route('/api/history', methods=['GET'])
def get_search_history():
    search = request.args.get('search', '').strip()
    status = request.args.get('status', '').strip()
    bookmarked = request.args.get('bookmarked')
    is_bm = True if bookmarked in ['1', 'true', 'True'] else None
    limit = int(request.args.get('limit', 50))

    history_items = get_history(search=search, status=status, bookmarked=is_bm, limit=limit)
    return jsonify({'history': history_items})

@app.route('/api/history/<v_id>', methods=['GET'])
def get_history_detail(v_id):
    item = get_verification_by_id(v_id)
    if not item:
        return jsonify({'error': 'Verification report not found'}), 404
    return jsonify(item['result'])

@app.route('/api/history/<v_id>/bookmark', methods=['POST'])
def bookmark_item(v_id):
    new_state = toggle_bookmark(v_id)
    if new_state is None:
        return jsonify({'error': 'Report not found'}), 404
    return jsonify({'id': v_id, 'is_bookmarked': new_state})

@app.route('/api/history/<v_id>', methods=['DELETE'])
def delete_item(v_id):
    deleted = delete_verification(v_id)
    if not deleted:
        return jsonify({'error': 'Report not found'}), 404
    return jsonify({'id': v_id, 'deleted': True})

@app.route('/api/ask', methods=['POST'])
def ask_ai():
    """
    CORE FEATURE A: ASK TRUTHLENS AI
    """
    data = request.get_json() or {}
    question = data.get('question', '').strip()
    report_context = data.get('report')
    v_id = data.get('verification_id')
    language = data.get('language', 'en')

    if not question:
        return jsonify({'error': 'Question cannot be empty.'}), 400

    if not report_context and v_id:
        db_item = get_verification_by_id(v_id)
        if db_item:
            report_context = db_item['result']

    if not report_context:
        return jsonify({'error': 'No report context provided to ground the answer.'}), 400

    answer = ask_assistant(question, report_context, language)
    return jsonify({
        'question': question,
        'answer': answer,
        'timestamp': datetime.now(timezone.utc).isoformat()
    })

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json() or {}
    v_id = data.get('verification_id')
    f_type = data.get('feedback_type', 'general')
    comment = data.get('comment', '').strip()

    if not comment:
        return jsonify({'error': 'Feedback comment cannot be empty.'}), 400

    f_id = save_feedback(v_id, f_type, comment)
    return jsonify({
        'success': True,
        'feedback_id': f_id,
        'message': 'Thank you! Your feedback helps refine our verification models.'
    })

@app.route('/api/stats', methods=['GET'])
def get_stats():
    stats = get_statistics()
    return jsonify(stats)

if __name__ == '__main__':
    # Run locally on port 5000
    app.run(host='0.0.0.0', port=5000, debug=False)
