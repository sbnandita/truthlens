import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose, verificationId, t }) {
  const [feedbackType, setFeedbackType] = useState('incorrect_analysis');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verification_id: verificationId,
          feedback_type: feedbackType,
          comment: comment.trim()
        })
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setComment('');
          onClose();
        }, 2200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl bg-chocolate border border-coffee/90 p-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-cream/60 hover:text-cream bg-espresso/50 border border-coffee/40"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950/70 border border-emerald-600/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-cream">
              Feedback Submitted
            </h4>
            <p className="text-xs text-cream/70 max-w-xs mx-auto">
              {t.feedbackSuccess}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex items-center space-x-2.5 pb-3 border-b border-coffee/40">
              <div className="w-8 h-8 rounded-lg bg-espresso border border-coffee flex items-center justify-center text-cappuccino">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-cream">
                  {t.feedbackTitle}
                </h3>
                <p className="text-xs text-cream/60">
                  {t.feedbackSub}
                </p>
              </div>
            </div>

            {/* Feedback category */}
            <div>
              <label className="text-xs font-semibold text-cappuccino block mb-1.5">
                {t.feedbackTypeLabel}
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-espresso border border-coffee/70 text-xs text-cream focus:outline-none focus:border-cappuccino"
              >
                <option value="incorrect_analysis">{t.typeIncorrect}</option>
                <option value="broken_link">{t.typeBrokenLink}</option>
                <option value="missing_context">{t.typeMissingContext}</option>
                <option value="translation_flaw">{t.typeTranslation}</option>
              </select>
            </div>

            {/* Comment Area */}
            <div>
              <label className="text-xs font-semibold text-cappuccino block mb-1.5">
                Detailed Feedback
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                required
                placeholder={t.feedbackCommentPlaceholder}
                className="w-full p-3 rounded-xl bg-espresso border border-coffee/70 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-cappuccino focus:ring-1 focus:ring-cappuccino resize-none leading-relaxed"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!comment.trim() || isSending}
                className="w-full py-2.5 rounded-xl bg-cappuccino text-espresso font-bold text-xs hover:bg-cream transition-all flex items-center justify-center space-x-1.5 disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? 'Submitting...' : t.submitFeedbackBtn}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
