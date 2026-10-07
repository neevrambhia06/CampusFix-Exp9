import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  MessageSquare, 
  Sliders, 
  Send, 
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function JuryEvaluation({ ideas, events, onSaveScore }) {
  const [selectedIdeaId, setSelectedIdeaId] = useState(ideas[0]?.id || '');
  const selectedIdea = ideas.find(i => i.id === selectedIdeaId) || ideas[0];
  const relatedEvent = events.find(e => e.id === selectedIdea?.eventId) || events[0];

  // Local state for scores per rubric dimension
  const [scores, setScores] = useState({
    innovation: selectedIdea?.scoresDetail?.innovation || 90,
    feasibility: selectedIdea?.scoresDetail?.feasibility || 90,
    ux: selectedIdea?.scoresDetail?.ux || 90,
    impact: selectedIdea?.scoresDetail?.impact || 90,
    pitch: selectedIdea?.scoresDetail?.pitch || 90
  });

  const [commentText, setCommentText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Compute weighted average
  const calcWeightedScore = () => {
    // 25% Innovation, 25% Feasibility, 20% UX, 20% Impact, 10% Pitch
    const total = (scores.innovation * 0.25) + 
                  (scores.feasibility * 0.25) + 
                  (scores.ux * 0.20) + 
                  (scores.impact * 0.20) + 
                  (scores.pitch * 0.10);
    return Math.round(total * 10) / 10;
  };

  const handleScoreChange = (key, val) => {
    setScores(prev => ({ ...prev, [key]: Number(val) }));
    setIsSaved(false);
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    const finalScore = calcWeightedScore();
    onSaveScore(selectedIdea.id, finalScore, scores, commentText);
    setIsSaved(true);
    setCommentText('');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="space-y-10">
      
      {/* JURY HEADER */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Jury & Mentor Scoring Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Evaluation Portal & Rubric Matrix</h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Evaluate submitted prototypes against standardized event rubrics, record comments, and issue final scores.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right shrink-0">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Jury Co-Chair Mode</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">Dr. Sarah Vance (Verified)</p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: IDEA SELECTOR & DETAILS */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Idea Submission to Grade:
            </label>
            <select
              value={selectedIdeaId}
              onChange={(e) => {
                const newId = e.target.value;
                setSelectedIdeaId(newId);
                const found = ideas.find(i => i.id === newId);
                if (found && found.scoresDetail) {
                  setScores(found.scoresDetail);
                }
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {ideas.map(i => (
                <option key={i.id} value={i.id}>
                  {i.title} — ({i.teamName})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Idea Summary Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="badge badge-purple">{selectedIdea.category}</span>
              <span className="text-xs font-bold text-slate-500">Event: {selectedIdea.eventTitle}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{selectedIdea.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Submitted by <strong className="text-slate-800">{selectedIdea.teamName}</strong></p>
            </div>

            <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <strong className="text-slate-900 block mb-1">Problem Statement:</strong>
                <p className="leading-relaxed">{selectedIdea.problemStatement}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <strong className="text-slate-900 block mb-1">Proposed Solution:</strong>
                <p className="leading-relaxed">{selectedIdea.solutionOverview}</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 text-xs">
              {selectedIdea.githubRepo && (
                <a 
                  href={selectedIdea.githubRepo} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-secondary flex-1 text-xs py-2"
                >
                  GitHub Source
                </a>
              )}
              {selectedIdea.liveDemo && (
                <a 
                  href={selectedIdea.liveDemo} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-primary flex-1 text-xs py-2"
                >
                  Live Prototype Demo
                </a>
              )}
            </div>

          </div>

          {/* Feedback & Comments list */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Existing Jury Feedback ({selectedIdea.comments?.length || 0})
            </h4>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {selectedIdea.comments?.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>{c.author} ({c.role})</span>
                    <span className="text-slate-400 font-normal">{c.time}</span>
                  </div>
                  <p className="text-slate-600">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SCORING RUBRIC FORM */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Scoring Rubric Form</h2>
              <p className="text-xs text-slate-500">Adjust parameters from 0 to 100 based on submission criteria</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 px-5 py-3 rounded-2xl text-center">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Weighted Score</p>
              <p className="text-3xl font-extrabold text-blue-900 mt-0.5">{calcWeightedScore()} <span className="text-sm font-medium text-slate-500">/ 100</span></p>
            </div>
          </div>

          {isSaved && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Score recorded successfully! Updated global leaderboard ratings.</span>
            </div>
          )}

          <form onSubmit={handleSubmitEvaluation} className="space-y-6">
            
            {/* Slider 1: Innovation */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>1. Innovation & Originality (25% Weight)</span>
                <span className="text-blue-600 font-extrabold">{scores.innovation} / 100</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scores.innovation}
                onChange={(e) => handleScoreChange('innovation', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[11px] text-slate-500">Is the concept novel? Does it introduce unique paradigms or tech advancements?</p>
            </div>

            {/* Slider 2: Technical Feasibility */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>2. Technical Architecture & Feasibility (25% Weight)</span>
                <span className="text-blue-600 font-extrabold">{scores.feasibility} / 100</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scores.feasibility}
                onChange={(e) => handleScoreChange('feasibility', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[11px] text-slate-500">Is the code architecture sound, scalable, and secure?</p>
            </div>

            {/* Slider 3: UX & Design */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>3. User Experience & Design Polish (20% Weight)</span>
                <span className="text-blue-600 font-extrabold">{scores.ux} / 100</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scores.ux}
                onChange={(e) => handleScoreChange('ux', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[11px] text-slate-500">Does the design feel premium, intuitive, accessible, and clean?</p>
            </div>

            {/* Slider 4: Business Impact */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>4. Market Viability & Real-World Impact (20% Weight)</span>
                <span className="text-blue-600 font-extrabold">{scores.impact} / 100</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scores.impact}
                onChange={(e) => handleScoreChange('impact', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[11px] text-slate-500">Does it address a substantial market need with high growth potential?</p>
            </div>

            {/* Slider 5: Pitch Clarity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>5. Pitch Clarity & Presentation (10% Weight)</span>
                <span className="text-blue-600 font-extrabold">{scores.pitch} / 100</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scores.pitch}
                onChange={(e) => handleScoreChange('pitch', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[11px] text-slate-500">Is the demonstration video clear, concise, and persuasive?</p>
            </div>

            {/* Jury Notes Input */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Jury Feedback & Guidance Notes:
              </label>
              <textarea 
                rows="3"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write actionable constructive feedback for the team..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50"
              />
            </div>

            {/* Submit Score Button */}
            <button 
              type="submit"
              className="w-full btn btn-primary py-3.5 shadow-lg text-sm"
            >
              <Send className="w-4 h-4" />
              Save Official Score ({calcWeightedScore()} Pts)
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
