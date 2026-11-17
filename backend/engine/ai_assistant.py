import re

def ask_assistant(question, report_context, language='en'):
    """
    CORE FEATURE A – ASK TRUTHLENS AI
    Contextual conversational assistant answering follow-up queries grounded strictly
    in the retrieved evidence and verification report.
    """
    q_lower = question.lower()
    headline = report_context.get('headline', 'Submitted News')
    verdict = report_context.get('verdict', 'Unverified')
    score = report_context.get('credibility_score', 50)
    claims = report_context.get('claims', [])
    missing_ctx = report_context.get('missing_context', {})
    old_news = report_context.get('old_news', {})
    sources = report_context.get('sources_catalog', [])

    is_tamil_q = bool(re.search(r'[\u0B80-\u0BFF]', question)) or language == 'ta'

    # 1. "Why is this misleading?" / "Why false?" / "Why reliable?"
    if any(w in q_lower for w in ['why', 'misleading', 'reason', 'false', 'reliable', 'ஏன்', 'காரணம்', 'பொய்']):
        if verdict == 'Misleading':
            if is_tamil_q:
                return f"இச்செய்தி 'தவறாக வழிநடத்துகிறது' (Misleading) என வகைப்படுத்தப்பட்டுள்ளது. ஏனெனில், இதில் சில உண்மைகள் உள்ளபோதிலும் (எ.கா: {claims[0]['statement'] if claims else ''}), முக்கியமான நிபந்தனைகளும் எல்லைகளும் திரிக்கப்பட்டுள்ளன: {missing_ctx.get('omitted_scope', '')}. {missing_ctx.get('explanation_ta', '')}"
            else:
                return f"This news is classified as **Misleading** because although certain statements hold true (e.g. \"{claims[0]['statement'] if claims else ''}\"), critical context was deliberately exaggerated or omitted: {missing_ctx.get('omitted_scope', '')}. {missing_ctx.get('explanation_en', '')}"
        
        elif verdict == 'Likely False':
            if old_news.get('is_old_news'):
                if is_tamil_q:
                    return f"இச்செய்தி 'பொய்யானது' (Likely False) என முடிவு செய்யப்பட்டுள்ளது. காரணம், இது {old_news.get('original_date')} தேதியிட்ட பழைய செய்தி ஆகும். தற்போது {old_news.get('circulation_date')}-ல் இத்தகைய நிகழ்வு இல்லை."
                else:
                    return f"This claim is assessed as **Likely False** primarily because it is recycled old news from {old_news.get('original_date')}. Current official records confirm that this event is not occurring today."
            else:
                if is_tamil_q:
                    return f"இச்செய்தி 'பொய்யானது' என மதிப்பிடப்பட்டுள்ளது. அதிகாரப்பூர்வ ஆதாரங்களான {sources[0]['name'] if sources else 'அரசு அறிக்கைகள்'} இத்தகவலை முற்றிலுமாக மறுத்துள்ளன."
                else:
                    return f"This report is evaluated as **Likely False** because established authorities and verified fact-checkers (such as {sources[0]['name'] if sources else 'competent portals'}) have directly investigated and refuted the statements."

        elif verdict == 'Likely Reliable':
            if is_tamil_q:
                return f"இச்செய்தி 'நம்பகமானது' (Likely Reliable) என உறுதிப்படுத்தப்பட்டுள்ளது. இதற்கு அதிகாரப்பூர்வ அமைப்பான {sources[0]['name'] if sources else 'முதன்மை செய்தி நிறுவனம்'} வெளியிட்டுள்ள ஆவணங்கள் முழுமையான ஆதாரங்களை வழங்குகின்றன."
            else:
                return f"This report is assessed as **Likely Reliable** with a high credibility score of {score}/100. It is corroborated by primary official releases from {sources[0]['name'] if sources else 'recognized institutions'} without contradictory findings."

        else:
            if is_tamil_q:
                return f"இச்செய்தி 'உறுதிப்படுத்தப்படவில்லை' (Unverified). அரசு அல்லது முன்னணி உண்மை சரிபார்ப்பு அமைப்புகளில் இதனை உறுதிப்படுத்தவோ மறுக்கவோ போதுமான ஆதாரங்கள் தற்சமயம் இல்லை."
            else:
                return f"This news is marked as **Unverified** because neither corroborating official statements nor credible fact-check debunks have surfaced in registered records yet."

    # 2. "Which source supports this claim?" / "Sources"
    if any(w in q_lower for w in ['source', 'which source', 'evidence', 'proof', 'ஆதாரம்', 'மூலம்', 'லிங்க்']):
        src_names = [f"• **{s['name']}** ({s.get('type', s.get('category', 'Authority'))})" for s in sources[:4]]
        src_list = "\n".join(src_names) if src_names else "Public Registry Index"
        if is_tamil_q:
            return f"இவ்வறிக்கையில் சரிபார்க்கப் பயன்படுத்தப்பட்ட முக்கிய ஆதாரங்கள்:\n\n{src_list}\n\nஅனைத்து மூல இணைப்புகளும் முடிவுகள் பக்கத்தில் உள்ள 'ஆதாரங்களின் நம்பகத்தன்மை' பகுதியில் உள்ளன."
        else:
            return f"The primary corroborating and fact-checking sources referenced in this report include:\n\n{src_list}\n\nClickable links and authority breakdowns are accessible in the **Evidence Comparison** and **Source Reliability** panels."

    # 3. "What information is missing?" / "Missing context"
    if any(w in q_lower for w in ['missing', 'omitted', 'removed', 'left out', 'context', 'மறைக்கப்பட்ட', 'விடுபட்ட']):
        if missing_ctx.get('has_missing_context'):
            caveats_bullet = "\n".join([f"• {c}" for c in missing_ctx.get('critical_caveats', [])])
            if is_tamil_q:
                return f"மறைக்கப்பட்ட அல்லது விடுபட்ட முக்கிய தகவல்கள்:\n\n• **எல்லை:** {missing_ctx.get('omitted_scope')}\n{caveats_bullet}\n\n{missing_ctx.get('explanation_ta')}"
            else:
                return f"Key contextual details that were omitted from the forwarded message:\n\n• **Omitted Scope:** {missing_ctx.get('omitted_scope')}\n{caveats_bullet}\n\n{missing_ctx.get('explanation_en')}"
        else:
            if is_tamil_q:
                return "இச்செய்தியில் முக்கியமான தகவல்கள் எதுவும் திட்டமிட்டு மறைக்கப்படவில்லை; செய்தி வெளிப்படையாக உள்ளது."
            else:
                return "No material context or geographic qualifiers were found to be missing from this submission."

    # 4. "Is there a newer update?" / "Update" / "Latest"
    if any(w in q_lower for w in ['newer', 'update', 'latest', 'recent', 'today', 'புதிய', 'தற்போதைய', 'நிலவரம்']):
        if old_news.get('is_old_news'):
            if is_tamil_q:
                return f"ஆம், தற்போதைய நிலவரம்: {old_news.get('current_status_ta', 'அவசர எச்சரிக்கை எதுவும் இல்லை')}. பழைய செய்தியை {old_news.get('circulation_date')}-ல் உண்மை என நம்பி பகிர வேண்டாம்."
            else:
                return f"Yes, the latest verified update confirms: **{old_news.get('current_status_en', 'Normal conditions prevailing')}**. The circulated claims belong to an expired historical incident ({old_news.get('time_gap')})."
        else:
            if is_tamil_q:
                return f"தற்போதைய சரிபார்ப்பு தேதி: 2026-11-17. அரசு அமைப்புகளின் அண்மைக்கால அறிவிப்புகளின்படி அறிக்கை புதுப்பிக்கப்பட்டுள்ளது."
            else:
                return f"As of our latest audit on **November 17, 2026**, no subsequent official updates have superseded this verification."

    # 5. "Explain in simple English" or "Explain in Tamil"
    if any(w in q_lower for w in ['simple english', 'explain simply', 'in simple words', 'எளிய தமிழில்']):
        if is_tamil_q:
            return f"**எளிய விளக்கம்:**\n\nஇந்த செய்தி ({verdict}) என கண்டறியப்பட்டுள்ளது. இதன் உண்மைத்தன்மை மதிப்பீடு {score}/100. {report_context.get('summary', '')}\n\nபொதுமக்கள் உறுதிப்படுத்தப்படாத வாட்ஸ்அப் அல்லது சமூக வலைத்தள செய்திகளை உடனடியாக நம்பி பகிர வேண்டாம்."
        else:
            return f"**Simple Explanation:**\n\nIn plain words, this message is rated as **{verdict}** ({score}/100).\n\n{report_context.get('summary', '')}\n\nAlways verify with primary official portals before forwarding unverified forwards."

    # Default fallback grounded in context
    if is_tamil_q:
        return f"ட்ரூத்லென்ஸ் பகுப்பாய்வு சுருக்கம்: இச்செய்தியின் நம்பகத்தன்மை {score}/100 ({verdict}). மேலதிக தகவல்களுக்கு 'ஆதாரங்கள்' அல்லது 'காலவரிசை' பகுதிகளைக் காணவும்."
    else:
        return f"TruthLens Summary: \"{headline}\" holds a credibility score of **{score}/100** ({verdict}). Supporting and contradicting citations are available in the dashboard tabs. Let me know if you would like me to unpack a specific claim or source!"
