import React, { useState } from 'react';
import { 
  X, 
  ThumbsUp, 
  Award, 
  Code2, 
  ExternalLink, 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  Send,
  Zap,
  CheckCircle,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function IdeaDetailModal({ idea, onClose, onUpvote, onAddComment }) {
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!idea) return null;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(idea.id, {
      author: "You (Verified Member)",
      role: "Innovator",
      text: commentText,
      time: "Just now"
    });
    setCommentText('');
  };

  const handleUpvoteClick = () => {
    onUpvote(idea.id);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* TOP BAR */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="badge badge-blue">{idea.category}</span>
            <span className="text-xs font-semibold text-slate-500">Event: {idea.eventTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-200/60 hover:bg-slate-200 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BODY DETAILS */}
        <div className="p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* TITLE & HIGHLIGHT SCORE */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">{idea.title}</h2>
              <p className="text-xs text-slate-500 font-medium">
                Team <strong className="text-slate-800">{idea.teamName}</strong> • Led by {idea.teamLeader}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-center">
                <p className="text-[10px] uppercase font-bold text-amber-700">Official Score</p>
                <p className="text-xl font-black text-amber-600">{idea.score} / 100</p>
              </div>

              <button
                onClick={handleUpvoteClick}
                className="btn btn-primary px-4 py-3 text-xs shadow-md"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{idea.upvotes} Upvotes</span>
              </button>
            </div>
          </div>

          {/* TAGLINE & PROBLEM STATEMENT */}
          <div className="space-y-4">
            <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 text-slate-800 text-xs leading-relaxed font-medium">
              "{idea.tagline}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Problem Statement</h4>
                <p className="text-slate-600 leading-relaxed">{idea.problemStatement}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Solution Architecture</h4>
                <p className="text-slate-600 leading-relaxed">{idea.solutionOverview}</p>
              </div>
            </div>
          </div>

          {/* TECH STACK & LINKS */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tech Stack & External Links</h4>
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-wrap gap-1.5">
                {idea.techStack.map((tech, idx) => (
                  <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {idea.githubRepo && (
                  <a 
                    href={idea.githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary text-xs py-2 px-3.5"
                  >
                    <Code2 className="w-4 h-4" />
                    Source
                  </a>
                )}
                {idea.liveDemo && (
                  <a 
                    href={idea.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-amber text-xs py-2 px-3.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* COMMENTS & DISCUSSION STREAM */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Community Discussion ({idea.comments?.length || 0})
            </h4>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask a question or leave feedback for the team..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50"
              />
              <button type="submit" className="btn btn-primary text-xs px-4">
                <Send className="w-3.5 h-3.5" />
                Post
              </button>
            </form>

            {/* List */}
            <div className="space-y-3 pt-2">
              {idea.comments?.map((c, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>{c.author} <span className="text-slate-400 font-normal">({c.role})</span></span>
                    <span className="text-slate-400 font-normal text-[11px]">{c.time}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
