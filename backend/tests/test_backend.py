import sys
import os
import unittest
import json

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from database import init_db

class TruthLensBackendTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_db()
        cls.client = app.test_client()

    def test_health_check(self):
        res = self.client.get('/api/health')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data['status'], 'healthy')

    def test_samples_endpoint(self):
        res = self.client.get('/api/samples')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(len(data['samples']), 5)

    def test_verify_empty_input(self):
        res = self.client.post('/api/verify', json={'text': ''})
        self.assertEqual(res.status_code, 400)

    def test_verify_school_rain_forward(self):
        """Tests Feature 1 (Claim-by-claim) and Feature 5 (Missing Context)"""
        text = "Heavy rainfall is expected in Chennai. Schools will remain closed tomorrow. All government offices will also remain closed."
        res = self.client.post('/api/verify', json={
            'text': text,
            'input_type': 'whatsapp',
            'language': 'en'
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        
        self.assertIn('claims', data)
        self.assertGreaterEqual(len(data['claims']), 2)
        self.assertEqual(data['verdict'], 'Misleading')
        self.assertGreaterEqual(data['credibility_score'], 50)
        self.assertLessEqual(data['credibility_score'], 80)
        self.assertTrue(data['missing_context']['has_missing_context'])
        self.assertIn('timeline', data)
        self.assertIn('sources_catalog', data)

    def test_verify_cyclone_outdated(self):
        """Tests Feature 2 (Old News Detector)"""
        text = "Severe Cyclonic Storm Mandous approaching Tamil Nadu coast with 100 km/h wind alert."
        res = self.client.post('/api/verify', json={
            'text': text,
            'input_type': 'facebook',
            'language': 'en'
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()

        self.assertTrue(data['old_news']['is_old_news'])
        self.assertIn('2022', data['old_news']['original_date'])
        self.assertEqual(data['verdict'], 'Likely False')
        self.assertLessEqual(data['credibility_score'], 30)

    def test_ask_ai_endpoint(self):
        """Tests Core Feature A (Ask TruthLens AI)"""
        # First verify
        res = self.client.post('/api/verify', json={
            'text': "Drinking boiled ginger water with lemon completely cures viral infections in 24 hours.",
            'input_type': 'article',
            'language': 'en'
        })
        report = res.get_json()

        # Follow-up question
        q_res = self.client.post('/api/ask', json={
            'question': "Why is this news misleading?",
            'report': report,
            'language': 'en'
        })
        self.assertEqual(q_res.status_code, 200)
        ans = q_res.get_json()['answer']
        self.assertIn('Misleading', ans)

    def test_history_and_bookmark(self):
        """Tests Core Feature D (Search History & Bookmarks)"""
        # Verify an item
        v_res = self.client.post('/api/verify', json={
            'text': "ISRO successfully launched the NVS-02 navigation satellite into GTO using GSLV-F12 from Sriharikota.",
            'input_type': 'headline',
            'language': 'en'
        })
        v_data = v_res.get_json()
        v_id = v_data['id']

        # Check history list
        h_res = self.client.get('/api/history')
        self.assertEqual(h_res.status_code, 200)
        history = h_res.get_json()['history']
        self.assertTrue(any(item['id'] == v_id for item in history))

        # Toggle bookmark
        bm_res = self.client.post(f'/api/history/{v_id}/bookmark')
        self.assertEqual(bm_res.status_code, 200)
        self.assertTrue(bm_res.get_json()['is_bookmarked'])

    def test_feedback_and_stats(self):
        """Tests Supporting Features (Feedback & Dashboard Stats)"""
        fb_res = self.client.post('/api/feedback', json={
            'verification_id': 'test-123',
            'feedback_type': 'missing_context',
            'comment': 'Good explanation of the district limits.'
        })
        self.assertEqual(fb_res.status_code, 200)
        self.assertTrue(fb_res.get_json()['success'])

        stats_res = self.client.get('/api/stats')
        self.assertEqual(stats_res.status_code, 200)
        stats = stats_res.get_json()
        self.assertIn('total_verified', stats)
        self.assertGreater(stats['total_verified'], 0)

if __name__ == '__main__':
    unittest.main()
