import React, { useState } from 'react';
import { 
  Lightbulb, 
  ThumbsUp, 
  Award, 
  ExternalLink, 
  Code2, 
  MessageSquare, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  UserCheck,
  Zap,
  Tag
} from 'lucide-react';

export function IdeaShowcase({ ideas, onSelectIdea, onUpvoteIdea, onOpenSubmitModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Autonomous Agents', 'Generative Design', 'Zero-Knowledge Security', 'AI Diagnostics'];

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          idea.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || idea.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-10">
      
      {/* Header Info Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span>Public Idea Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore High-Impact Pitch Submissions</h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Browse through innovative prototypes, review evaluation scores, and support visionary teams by upvoting their ideas.
          </p>
        </div>

        <button 
          onClick={onOpenSubmitModal}
          className="btn btn-amber text-sm shrink-0 shadow-md"
        >
          <Zap className="w-4 h-4" />
          Pitch New Idea
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by title, team, or concept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* IDEAS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredIdeas.map((idea) => (
          <div 
            key={idea.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Bar */}
            <div className="p-6 space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="badge badge-blue">
                  <Tag className="w-3 h-3" />
                  {idea.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className="badge badge-amber font-bold">
                    <Award className="w-3.5 h-3.5" />
                    {idea.score} / 100 Score
                  </span>
                  <span className="badge badge-emerald">
                    {idea.status}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 
                  onClick={() => onSelectIdea(idea)}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {idea.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Event: <strong className="text-slate-700">{idea.eventTitle}</strong>
                </p>
                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {idea.tagline}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {idea.techStack.map((tech, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Team Info */}
              <div className="pt-3 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Team <strong className="text-slate-800">{idea.teamName}</strong> ({idea.teamLeader})</span>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onUpvoteIdea(idea.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all active:scale-95"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
                <span>{idea.upvotes} Upvotes</span>
              </button>

              <div className="flex items-center gap-3">
                {idea.githubRepo && (
                  <a 
                    href={idea.githubRepo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-700 transition-colors"
                    title="View GitHub Repository"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => onSelectIdea(idea)}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Inspect Idea Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
