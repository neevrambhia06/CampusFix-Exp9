import React, { useState } from 'react';
import { 
  Sliders, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ArrowRightLeft,
  Award,
  Layers,
  Code
} from 'lucide-react';

export function CompareIdeas({ ideas }) {
  const [idea1Id, setIdea1Id] = useState(ideas[0]?.id || '');
  const [idea2Id, setIdea2Id] = useState(ideas[1]?.id || ideas[0]?.id || '');

  const idea1 = ideas.find(i => i.id === idea1Id) || ideas[0];
  const idea2 = ideas.find(i => i.id === idea2Id) || ideas[1] || ideas[0];

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">
          <Sliders className="w-4 h-4 text-purple-600" />
          <span>Interactive Pitch Comparison Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Side-by-Side Idea Analysis</h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Compare innovation metrics, team tech stacks, jury rubric sub-scores, and project specs head-to-head.
        </p>
      </div>

      {/* SELECTORS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
        
        {/* Selector 1 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-slate-500">First Idea (Option A):</label>
          <select
            value={idea1Id}
            onChange={(e) => setIdea1Id(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {ideas.map(i => (
              <option key={i.id} value={i.id}>{i.title} ({i.teamName})</option>
            ))}
          </select>
        </div>

        {/* Selector 2 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-slate-500">Second Idea (Option B):</label>
          <select
            value={idea2Id}
            onChange={(e) => setIdea2Id(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {ideas.map(i => (
              <option key={i.id} value={i.id}>{i.title} ({i.teamName})</option>
            ))}
          </select>
        </div>

      </div>

      {/* COMPARISON CARDS MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* IDEA 1 CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="badge badge-blue">{idea1.category}</span>
              <span className="text-2xl font-black text-blue-600">{idea1.score} <span className="text-xs text-slate-400 font-normal">pts</span></span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">{idea1.title}</h2>
              <p className="text-xs text-slate-500 font-medium">Team {idea1.teamName} • Led by {idea1.teamLeader}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{idea1.tagline}</p>
            </div>

            {/* Rubric Breakdown */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detailed Rubric Sub-Scores</h4>
              {idea1.scoresDetail && Object.entries(idea1.scoresDetail).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 capitalize">
                    <span>{key}</span>
                    <span>{val}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {idea1.techStack?.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Community Support: 👍 {idea1.upvotes}</span>
            <span>Status: <strong className="text-emerald-600">{idea1.status}</strong></span>
          </div>
        </div>

        {/* IDEA 2 CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="badge badge-amber">{idea2.category}</span>
              <span className="text-2xl font-black text-amber-600">{idea2.score} <span className="text-xs text-slate-400 font-normal">pts</span></span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">{idea2.title}</h2>
              <p className="text-xs text-slate-500 font-medium">Team {idea2.teamName} • Led by {idea2.teamLeader}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{idea2.tagline}</p>
            </div>

            {/* Rubric Breakdown */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detailed Rubric Sub-Scores</h4>
              {idea2.scoresDetail && Object.entries(idea2.scoresDetail).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 capitalize">
                    <span>{key}</span>
                    <span>{val}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {idea2.techStack?.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Community Support: 👍 {idea2.upvotes}</span>
            <span>Status: <strong className="text-emerald-600">{idea2.status}</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
}
