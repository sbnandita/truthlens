import sqlite3
import json
import os
import re
from datetime import datetime, timezone

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'truthlens.db')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS verifications (
        id TEXT PRIMARY KEY,
        input_text TEXT NOT NULL,
        input_type TEXT DEFAULT 'headline',
        headline TEXT,
        topic TEXT,
        credibility_score INTEGER DEFAULT 50,
        verdict TEXT DEFAULT 'Unverified',
        language TEXT DEFAULT 'en',
        result_json TEXT NOT NULL,
        is_bookmarked INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        verification_id TEXT,
        feedback_type TEXT NOT NULL,
        comment TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (verification_id) REFERENCES verifications (id)
    )
    ''')
    conn.commit()
    conn.close()

def save_verification(record):
    conn = get_connection()
    cursor = conn.cursor()
    created_at = record.get('created_at', datetime.now(timezone.utc).isoformat())
    cursor.execute('''
    INSERT OR REPLACE INTO verifications 
    (id, input_text, input_type, headline, topic, credibility_score, verdict, language, result_json, is_bookmarked, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        record['id'],
        record['input_text'],
        record.get('input_type', 'headline'),
        record.get('headline', ''),
        record.get('topic', 'General'),
        int(record.get('credibility_score', 50)),
        record.get('verdict', 'Unverified'),
        record.get('language', 'en'),
        json.dumps(record.get('result', {}), ensure_ascii=False),
        int(record.get('is_bookmarked', 0)),
        created_at
    ))
    conn.commit()
    conn.close()
    return record['id']

def get_history(search='', status='', bookmarked=None, limit=50):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT id, input_text, input_type, headline, topic, credibility_score, verdict, language, is_bookmarked, created_at FROM verifications WHERE 1=1"
    params = []

    if search:
        query += " AND (headline LIKE ? OR input_text LIKE ? OR topic LIKE ?)"
        s = f"%{search}%"
        params.extend([s, s, s])

    if status and status != 'all':
        query += " AND verdict = ?"
        params.append(status)

    if bookmarked is not None and bookmarked:
        query += " AND is_bookmarked = 1"

    query += " ORDER BY created_at DESC LIMIT ?"
    params.append(limit)

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]

def get_verification_by_id(v_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM verifications WHERE id = ?", (v_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return None
    data = dict(row)
    data['result'] = json.loads(data['result_json'])
    return data

def toggle_bookmark(v_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT is_bookmarked FROM verifications WHERE id = ?", (v_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None
    new_status = 1 if row['is_bookmarked'] == 0 else 0
    cursor.execute("UPDATE verifications SET is_bookmarked = ? WHERE id = ?", (new_status, v_id))
    conn.commit()
    conn.close()
    return bool(new_status)

def delete_verification(v_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM verifications WHERE id = ?", (v_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted

def save_feedback(v_id, f_type, comment):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.now(timezone.utc).isoformat()
    cursor.execute(
        "INSERT INTO feedback (verification_id, feedback_type, comment, created_at) VALUES (?, ?, ?, ?)",
        (v_id, f_type, comment, now)
    )
    conn.commit()
    f_id = cursor.lastrowid
    conn.close()
    return f_id

def get_statistics():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) AS total FROM verifications")
    total = cursor.fetchone()['total']

    cursor.execute("SELECT verdict, COUNT(*) as cnt FROM verifications GROUP BY verdict")
    verdict_counts = {row['verdict']: row['cnt'] for row in cursor.fetchall()}

    cursor.execute("SELECT COUNT(*) AS bookmarked FROM verifications WHERE is_bookmarked = 1")
    bookmarked = cursor.fetchone()['bookmarked']

    cursor.execute("SELECT AVG(credibility_score) AS avg_score FROM verifications")
    avg_score = cursor.fetchone()['avg_score'] or 0

    conn.close()

    return {
        'total_verified': total,
        'likely_reliable': verdict_counts.get('Likely Reliable', 0),
        'misleading': verdict_counts.get('Misleading', 0),
        'likely_false': verdict_counts.get('Likely False', 0),
        'unverified': verdict_counts.get('Unverified', 0),
        'bookmarked_count': bookmarked,
        'average_score': round(avg_score, 1)
    }

def normalize_text_tokens(text):
    clean = re.sub(r'[^\w\s]', '', text.lower())
    stop_words = {'the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'will', 'be', 'by', 'as', 'that', 'this', 'it'}
    return set([w for w in clean.split() if len(w) > 2 and w not in stop_words])

def find_duplicate_claim(query_text, threshold=0.55):
    """
    Checks if a query text matches any previously verified record in the database
    using Jaccard word token similarity and substring overlap.
    """
    tokens_q = normalize_text_tokens(query_text)
    if not tokens_q:
        return None

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, headline, input_text, credibility_score, verdict, created_at FROM verifications ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()

    best_match = None
    best_sim = 0.0

    for row in rows:
        cand_tokens = normalize_text_tokens(row['headline'] + " " + row['input_text'])
        if not cand_tokens:
            continue
        intersection = tokens_q.intersection(cand_tokens)
        union = tokens_q.union(cand_tokens)
        
        # Jaccard and Query Coverage Overlap
        jaccard_sim = len(intersection) / len(union) if union else 0.0
        query_coverage = len(intersection) / len(tokens_q) if tokens_q else 0.0
        
        # Weighted similarity taking into account high keyphrase overlap
        sim = max(jaccard_sim, query_coverage * 0.9)

        # Substring / exact phrases boost
        if query_text.lower().strip() in row['input_text'].lower() or row['headline'].lower() in query_text.lower():
            sim = max(sim, 0.95)

        if sim > best_sim:
            best_sim = sim
            best_match = {
                'id': row['id'],
                'headline': row['headline'],
                'credibility_score': row['credibility_score'],
                'verdict': row['verdict'],
                'created_at': row['created_at'],
                'similarity': round(sim, 2)
            }

    if best_match and best_sim >= threshold:
        return best_match
    return None
