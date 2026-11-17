def calculate_credibility(claims, old_news_result, missing_context_result, sources_catalog, kb_match=None, language='en'):
    """
    Computes an explainable 0–100 prototype credibility indicator based on 4 transparent pillars:
    1. Evidence Quality (0-35 pts)
    2. Source Authority (0-25 pts)
    3. Context Freshness (0-20 pts)
    4. Scope & Claim Consistency (0-20 pts)
    """
    if kb_match:
        base_score = kb_match.get('credibility_score', 50)
        verdict = kb_match.get('overall_verdict', 'Unverified')
        summary = kb_match.get('summary_ta' if language == 'ta' else 'summary_en', '')
    else:
        # Evaluate dynamically
        total_claims = len(claims)
        if total_claims == 0:
            return {
                'score': 50,
                'verdict': 'Unverified',
                'factors': {
                    'evidence_quality': 10,
                    'source_authority': 10,
                    'context_freshness': 15,
                    'scope_consistency': 15
                },
                'summary': 'No claims identified for verification.'
            }

        reliable_claims = sum(1 for c in claims if c['status'] == 'Likely Reliable')
        false_claims = sum(1 for c in claims if c['status'] == 'Likely False')
        unverified_claims = sum(1 for c in claims if c['status'] == 'Unverified')

        # Pillar 1: Evidence Quality (35 pts max)
        evidence_quality = int((reliable_claims / total_claims) * 35) if total_claims else 12

        # Pillar 2: Source Authority (25 pts max)
        has_official = any(s.get('type') == 'Primary Official' or s.get('category') == 'Primary Official' for s in sources_catalog)
        has_fact_checker = any(s.get('type') == 'Verified Fact-Checker' or s.get('category') == 'Verified Fact-Checker' for s in sources_catalog)
        if has_official:
            source_authority = 24
        elif has_fact_checker:
            source_authority = 20
        else:
            source_authority = 10

        # Pillar 3: Context Freshness (20 pts max)
        if old_news_result.get('is_old_news'):
            context_freshness = 2
        else:
            context_freshness = 19

        # Pillar 4: Scope & Claim Consistency (20 pts max)
        if missing_context_result.get('has_missing_context'):
            scope_consistency = 6
        else:
            scope_consistency = 18

        base_score = evidence_quality + source_authority + context_freshness + scope_consistency
        base_score = max(5, min(98, base_score))

        # Assign verdict category
        if old_news_result.get('is_old_news') or false_claims > reliable_claims:
            verdict = 'Likely False'
        elif missing_context_result.get('has_missing_context') or (reliable_claims > 0 and false_claims > 0):
            verdict = 'Misleading'
        elif reliable_claims >= 1 and false_claims == 0 and unverified_claims == 0:
            verdict = 'Likely Reliable'
        else:
            verdict = 'Unverified'

        if language == 'ta':
            summary = f"ஆய்வு முடிவு: {verdict}. இச்செய்தியின் நம்பகத்தன்மை மதிப்பீடு {base_score}/100. இது கிடைக்கப்பெற்ற ஆதாரங்கள் மற்றும் அதிகாரப்பூர்வ தரவுகளின் அடிப்படையில் கணக்கிடப்பட்ட முன்மாதிரி குறிகாட்டியாகும்."
        else:
            summary = f"Verification assessment: {verdict} with an explainable credibility score of {base_score}/100 based on corroborating documentation and source reliability audits."

    # Map factors
    if kb_match:
        is_false = verdict == 'Likely False'
        is_misleading = verdict == 'Misleading'
        is_reliable = verdict == 'Likely Reliable'
        factors = {
            'evidence_quality': 34 if is_reliable else (18 if is_misleading else 4),
            'source_authority': 24 if is_reliable else (20 if is_misleading else 15),
            'context_freshness': 19 if not kb_match.get('is_outdated') else 2,
            'scope_consistency': 19 if is_reliable else (8 if is_misleading else 2)
        }
    else:
        factors = {
            'evidence_quality': evidence_quality,
            'source_authority': source_authority,
            'context_freshness': context_freshness,
            'scope_consistency': scope_consistency
        }

    return {
        'score': base_score,
        'verdict': verdict,
        'factors': factors,
        'summary': summary
    }
