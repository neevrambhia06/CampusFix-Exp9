import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Crown, 
  TrendingUp, 
  ThumbsUp, 
  User, 
  Zap,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';

export function Leaderboard({ ideas, onSelectIdea }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Autonomous Agents', 'Generative Design', 'Zero-Knowledge Security', 'AI Diagnostics'];

  // Sort ideas by overall score descending
  const sortedIdeas = [...ideas]
    .filter(i => filterCategory === 'All' || i.category === filterCategory)
    .sort((a, b) => b.score - a.score);

  const top3 = sortedIdeas.slice(0, 3);
  const remaining = sortedIdeas.slice(3);

  return (
    <div className="space-y-12">
      
      {/* HEADER */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Global Competition Standings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Leaderboard & Top Rated Ideas</h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Live weighted standings aggregated from jury panel scores, technical evaluations, and community upvotes.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PODIUM SECTION (TOP 3) */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* SILVER - 2ND PLACE */}
          {top3[1] && (
            <div 
              onClick={() => onSelectIdea(top3[1])}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group order-2 md:order-1 mt-0 md:mt-6"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-bl-full flex items-start justify-end p-4">
                <span className="text-2xl font-black text-slate-400">#2</span>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-lg border border-slate-200">
                  🥈
                </div>
                <div>
                  <span className="badge badge-purple">{top3[1].category}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                    {top3[1].title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">By {top3[1].teamName}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Jury Score</p>
                  <p className="text-xl font-extrabold text-slate-800">{top3[1].score} pts</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Upvotes</p>
                  <p className="text-sm font-bold text-blue-600">👍 {top3[1].upvotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* GOLD - 1ST PLACE */}
          {top3[0] && (
            <div 
              onClick={() => onSelectIdea(top3[0])}
              className="bg-gradient-to-b from-amber-50/70 via-white to-white rounded-3xl border-2 border-amber-300 p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group order-1 md:order-2"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-200/50 rounded-bl-full flex items-start justify-end p-4">
                <Crown className="w-8 h-8 text-amber-600" />
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-900 font-black text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  RANK #1 CHAMPION
                </div>
                <div>
                  <span className="badge badge-amber font-bold">{top3[0].category}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-2 group-hover:text-amber-700 transition-colors">
                    {top3[0].title}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold mt-1">By Team {top3[0].teamName}</p>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{top3[0].tagline}</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-amber-800 uppercase font-bold">Grand Score</p>
                  <p className="text-2xl font-black text-amber-600">{top3[0].score} pts</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Community Support</p>
                  <p className="text-base font-bold text-blue-600">👍 {top3[0].upvotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* BRONZE - 3RD PLACE */}
          {top3[2] && (
            <div 
              onClick={() => onSelectIdea(top3[2])}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group order-3 mt-0 md:mt-6"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-bl-full flex items-start justify-end p-4">
                <span className="text-2xl font-black text-amber-700">#3</span>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-lg border border-amber-200">
                  🥉
                </div>
                <div>
                  <span className="badge badge-rose">{top3[2].category}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                    {top3[2].title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">By {top3[2].teamName}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Jury Score</p>
                  <p className="text-xl font-extrabold text-slate-800">{top3[2].score} pts</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Upvotes</p>
                  <p className="text-sm font-bold text-blue-600">👍 {top3[2].upvotes}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* FULL RANKINGS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <h3 className="text-lg font-bold text-slate-900">Complete Leaderboard Standings</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Idea & Team</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Score</th>
                <th className="py-3.5 px-4 text-center">Upvotes</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {sortedIdeas.map((idea, index) => (
                <tr key={idea.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 text-sm">
                    #{index + 1}
                  </td>
                  <td className="py-4 px-4 space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer" onClick={() => onSelectIdea(idea)}>
                      {idea.title}
                    </p>
                    <p className="text-slate-400 text-[11px]">Team {idea.teamName} ({idea.teamLeader})</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="badge badge-blue">{idea.category}</span>
                  </td>
                  <td className="py-4 px-4 text-center font-extrabold text-blue-700 text-sm">
                    {idea.score}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-slate-700">
                    👍 {idea.upvotes}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onSelectIdea(idea)}
                      className="btn btn-secondary text-[11px] py-1.5 px-3"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
