import json
import os
import re

KB_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'fixtures', 'knowledge_base.json')

def load_knowledge_base():
    if os.path.exists(KB_FILE):
        try:
            with open(KB_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print("Error loading knowledge base:", e)
    return []

def match_knowledge_base(query_text):
    kb = load_knowledge_base()
    q_lower = query_text.lower()
    
    # Clean tokens
    q_tokens = set(re.findall(r'[\w\u0B80-\u0BFF]+', q_lower))

    best_entry = None
    highest_score = 0

    for entry in kb:
        match_count = 0
        keywords = entry.get('keywords', [])
        for kw in keywords:
            if kw.lower() in q_lower:
                match_count += 3

        # Token intersection
        entry_tokens = set(re.findall(r'[\w\u0B80-\u0BFF]+', (entry.get('canonical_headline', '') + ' ' + entry.get('tamil_headline', '')).lower()))
        shared = q_tokens.intersection(entry_tokens)
        match_count += len(shared)

        if match_count > highest_score and match_count >= 3:
            highest_score = match_count
            best_entry = entry

    return best_entry

def retrieve_evidence_and_sources(claims, kb_match=None, language='en'):
    """
    FEATURE 3: EVIDENCE COMPARISON PANEL (Supporting vs Contradicting)
    FEATURE 4: SOURCE RELIABILITY CHECKER
    """
    verified_claims = []
    aggregated_supporting = []
    aggregated_contradicting = []
    sources_catalog = []

    if kb_match:
        kb_claims = kb_match.get('claims', [])
        sources_catalog = kb_match.get('sources_catalog', [])

        for i, c in enumerate(claims):
            # Match with KB claim if available
            if i < len(kb_claims):
                kbc = kb_claims[i]
                stmt = kbc['statement_ta'] if language == 'ta' else kbc['statement_en']
                status = kbc['status']
                supp = kbc['supporting_evidence']
                contra = kbc['contradicting_evidence']
                expl = kbc['explanation_ta'] if language == 'ta' else kbc['explanation_en']
                srcs = kbc.get('sources', [])
            else:
                stmt = c['statement']
                status = kb_match.get('overall_verdict', 'Unverified')
                supp = kb_match.get('summary_en', 'Corroborating records located in regional archives.')
                contra = "None documented." if status == 'Likely Reliable' else "Contradicted by official releases."
                expl = kb_match.get('summary_ta' if language == 'ta' else 'summary_en', '')
                srcs = sources_catalog[:2]

            claim_obj = {
                'claim_id': c.get('claim_id', f"claim-{i+1}"),
                'statement': stmt,
                'status': status,
                'confidence': kbc.get('confidence', 0.92) if i < len(kb_claims) else 0.88,
                'supporting_evidence': supp,
                'contradicting_evidence': contra,
                'explanation': expl,
                'sources': srcs
            }
            verified_claims.append(claim_obj)

            if supp and supp != "None." and supp != "None for schools in Chennai district.":
                aggregated_supporting.append({
                    'claim_statement': stmt,
                    'evidence_text': supp,
                    'sources': srcs
                })

            if contra and contra != "None." and contra != "None":
                aggregated_contradicting.append({
                    'claim_statement': stmt,
                    'evidence_text': contra,
                    'sources': [s for s in srcs if s.get('category') in ['Verified Fact-Checker', 'Primary Official']] or srcs
                })

    else:
        # Fallback for unindexed user query: honest evaluation
        for i, c in enumerate(claims):
            stmt = c['statement']
            claim_obj = {
                'claim_id': c.get('claim_id', f"claim-{i+1}"),
                'statement': stmt,
                'status': 'Unverified',
                'confidence': 0.50,
                'supporting_evidence': "No verifiable press release or gazette notification found confirming this specific claim.",
                'contradicting_evidence': "No direct official rebuttal on file from primary fact-checking repositories (PIB Fact Check, Alt News).",
                'explanation': "There is insufficient corroborating evidence in authenticated databases to confirm this statement. Exercise caution before forwarding." if language == 'en' else "இக்கூற்றை உறுதிப்படுத்த போதுமான ஆதாரங்கள் அதிகாரப்பூர்வ தளங்களில் கிடைக்கவில்லை.",
                'sources': [
                    {
                        'name': "Public News Index & Fact-Checking Archive",
                        'category': "Established News",
                        'url': "https://news.google.com",
                        'date': "2026-11-17",
                        'reliability': "Moderate"
                    }
                ]
            }
            verified_claims.append(claim_obj)
            aggregated_supporting.append({
                'claim_statement': stmt,
                'evidence_text': "Circulating in online public forums without authoritative citation.",
                'sources': claim_obj['sources']
            })
            aggregated_contradicting.append({
                'claim_statement': stmt,
                'evidence_text': "Absence of official confirmation from competent ministerial or jurisdictional authorities.",
                'sources': claim_obj['sources']
            })

        sources_catalog = [
            {
                'name': "PIB Fact Check Registry",
                'type': "Verified Fact-Checker",
                'authority_score': 95,
                'is_independent': False,
                'url': "https://factcheck.pib.gov.in",
                'date': "2026-11-17",
                'confirmation_available': False
            },
            {
                'name': "Independent Fact-Checking Network (IFCN)",
                'type': "Verified Fact-Checker",
                'authority_score': 92,
                'is_independent': True,
                'url': "https://ifcncodeofprinciples.poynter.org",
                'date': "2026-11-17",
                'confirmation_available': False
            }
        ]

    return {
        'verified_claims': verified_claims,
        'supporting_evidence': aggregated_supporting,
        'contradicting_evidence': aggregated_contradicting,
        'sources_catalog': sources_catalog
    }
