import urllib.request
import json
import sys

BASE_URL = 'http://localhost:5000'

def post_json(path, data):
    req = urllib.request.Request(
        f"{BASE_URL}{path}",
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read().decode('utf-8'))

def get_json(path):
    with urllib.request.urlopen(f"{BASE_URL}{path}") as res:
        return json.loads(res.read().decode('utf-8'))

def run_e2e_tests():
    print("========================================")
    print("STARTING TRUTHLENS FULL E2E TEST SUITE")
    print("========================================")

    # 1. Health Check
    health = get_json('/api/health')
    assert health['status'] == 'healthy'
    print("[PASS] 1. Backend Health Check OK:", health['service'])

    # 2. Test Samples
    samples = get_json('/api/samples')['samples']
    assert len(samples) >= 6
    print(f"[PASS] 2. Pre-curated Test Samples Loaded: {len(samples)} samples available.")

    # 3. Test Feature 1 (Claim-by-Claim) & Feature 5 (Missing Context)
    rain_news = post_json('/api/verify', {
        'text': 'Heavy rainfall is expected in Chennai. Schools will remain closed tomorrow. All government offices will also remain closed.',
        'input_type': 'whatsapp',
        'language': 'en'
    })
    assert rain_news['verdict'] == 'Misleading'
    assert len(rain_news['claims']) == 3
    assert rain_news['missing_context']['has_missing_context'] == True
    print(f"[PASS] 3. Feature 1 & 5 Verified: Score={rain_news['credibility_score']}/100, Claims={len(rain_news['claims'])}, Missing Context Flagged.")

    # 4. Test Feature 2 (Old News Detector) & Feature 6 (Timeline)
    cyclone_news = post_json('/api/verify', {
        'text': 'Severe Cyclonic Storm Mandous approaching Tamil Nadu coast with 100 km/h wind alert.',
        'input_type': 'facebook',
        'language': 'en'
    })
    assert cyclone_news['old_news']['is_old_news'] == True
    assert '2022' in cyclone_news['old_news']['original_date']
    assert cyclone_news['verdict'] == 'Likely False'
    assert len(cyclone_news['timeline']) >= 4
    print(f"[PASS] 4. Feature 2 & 6 Verified: Old News Flagged ({cyclone_news['old_news']['time_gap']}), Timeline={len(cyclone_news['timeline'])} milestones.")

    # 5. Test Feature 3 (Evidence Comparison) & Feature 4 (Source Reliability)
    ginger_news = post_json('/api/verify', {
        'text': 'Drinking boiled ginger water with lemon completely cures viral infections in 24 hours without medicine as confirmed by WHO.',
        'input_type': 'article',
        'language': 'en'
    })
    assert len(ginger_news['supporting_evidence']) > 0
    assert len(ginger_news['contradicting_evidence']) > 0
    assert len(ginger_news['sources_catalog']) >= 2
    print(f"[PASS] 5. Feature 3 & 4 Verified: Side-by-side evidence ({len(ginger_news['supporting_evidence'])} supp vs {len(ginger_news['contradicting_evidence'])} contra), Sources={len(ginger_news['sources_catalog'])}.")

    # 6. Test Core Feature C (Tamil Support)
    tamil_news = post_json('/api/verify', {
        'text': 'தமிழ்நாட்டில் 10 மற்றும் 12-ஆம் வகுப்பு பொதுத்தேர்வுகள் ரத்து செய்யப்படுவதாக பள்ளிக்கல்வித்துறை அமைச்சர் அறிவித்துள்ளார்.',
        'input_type': 'instagram',
        'language': 'ta'
    })
    assert tamil_news['language'] == 'ta'
    assert '2021' in tamil_news['old_news']['original_date']
    print(f"[PASS] 6. Feature C (Tamil Support) Verified: Tamil Headline='{tamil_news['headline']}', Verdict={tamil_news['verdict']}.")

    # 7. Test Core Feature A (Ask TruthLens AI)
    ask_res = post_json('/api/ask', {
        'question': 'Why is this news misleading?',
        'report': rain_news,
        'language': 'en'
    })
    assert 'Misleading' in ask_res['answer']
    print("[PASS] 7. Feature A (Ask TruthLens AI) Verified: Grounded answer returned successfully.")

    # 8. Test Core Feature E (Duplicate News Detection)
    dup_res = post_json('/api/check-duplicate', {
        'text': 'Tomorrow schools in Chennai will remain closed due to heavy rain'
    })
    assert dup_res['has_duplicate'] == True
    print(f"[PASS] 8. Feature E (Duplicate Detection) Verified: Similar claim detected with headline: '{dup_res['match']['headline']}'.")

    # 9. Test History & Bookmarking
    v_id = rain_news['id']
    bm_res = post_json(f'/api/history/{v_id}/bookmark', {})
    assert bm_res['is_bookmarked'] == True
    history = get_json('/api/history?bookmarked=1')
    assert any(h['id'] == v_id for h in history['history'])
    print(f"[PASS] 9. History & Bookmark Verified: Report {v_id} saved and toggled.")

    # 10. Test Personal Dashboard Statistics
    stats = get_json('/api/stats')
    assert stats['total_verified'] >= 4
    print(f"[PASS] 10. User Dashboard Stats Verified: Total Verified={stats['total_verified']}, Reliable={stats['likely_reliable']}, Misleading={stats['misleading']}, False={stats['likely_false']}, Bookmarked={stats['bookmarked_count']}.")

    print("========================================")
    print("ALL 10 E2E AUTOMATED VERIFICATIONS PASSED!")
    print("========================================")

if __name__ == '__main__':
    run_e2e_tests()
