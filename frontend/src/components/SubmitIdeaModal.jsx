import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Upload, 
  Code, 
  Users, 
  Video, 
  Code2, 
  Layers, 
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function SubmitIdeaModal({ isOpen, onClose, events, onSubmitIdea, preselectedEvent }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    eventId: preselectedEvent?.id || events[0]?.id || '',
    title: '',
    tagline: '',
    category: 'Autonomous Agents',
    teamName: '',
    teamLeader: '',
    teamMembers: '',
    techStack: 'React 19, Python, FastAPI, Tailwind CSS',
    problemStatement: '',
    solutionOverview: '',
    pitchVideoUrl: '',
    githubRepo: '',
    liveDemo: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventObj = events.find(ev => ev.id === formData.eventId) || events[0];
    
    const newIdeaObj = {
      id: `idea-${Date.now()}`,
      eventId: eventObj.id,
      eventTitle: eventObj.title,
      title: formData.title || "Untitled Pitch Concept",
      tagline: formData.tagline || "Innovative tech solution generated during event sprint.",
      teamName: formData.teamName || "Innovation Squad",
      teamLeader: formData.teamLeader || "Alex Creator",
      teamMembers: formData.teamMembers ? formData.teamMembers.split(',').map(s => s.trim()) : ["Alex Creator"],
      category: formData.category,
      status: "Under Evaluation",
      upvotes: 1,
      score: 88.5,
      techStack: formData.techStack ? formData.techStack.split(',').map(s => s.trim()) : ["React", "Node.js"],
      githubRepo: formData.githubRepo || "https://github.com",
      liveDemo: formData.liveDemo || "https://demo.internal",
      submissionDate: new Date().toISOString().split('T')[0],
      problemStatement: formData.problemStatement || "Addressing key challenges in modern technology workflows.",
      solutionOverview: formData.solutionOverview || "A high-performance scalable solution leveraging novel algorithms.",
      scoresDetail: {
        innovation: 88,
        feasibility: 89,
        ux: 90,
        impact: 87,
        pitch: 88
      },
      comments: [
        { author: "System", role: "Auto Verification", text: "Submission received and passed syntax check.", time: "Just now" }
      ]
    };

    onSubmitIdea(newIdeaObj);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Submit Pitch & Prototype</h2>
              <p className="text-xs text-slate-500 font-medium">Step {step} of 3 — Idea Registration Wizard</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PROGRESS STEPPER */}
        <div className="px-8 py-3 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between text-xs font-bold text-blue-800">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
            <span>Vision & Pitch</span>
          </div>
          <div className="h-0.5 w-12 bg-blue-200" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
            <span>Team & Stack</span>
          </div>
          <div className="h-0.5 w-12 bg-blue-200" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
            <span>Links & Prototype</span>
          </div>
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Vision & Pitch */}
          {step === 1 && (
            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Target Event Competition:</label>
                <select
                  value={formData.eventId}
                  onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.title} ({ev.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Idea / Product Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. AetherOps, VeriShield, PulseGuard"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">One-Sentence Elevator Pitch Tagline *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Summarize your breakthrough in 10-15 words..."
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Problem Statement</label>
                <textarea 
                  rows="2"
                  placeholder="What friction or market gap does this address?"
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Solution & Key Innovations</label>
                <textarea 
                  rows="3"
                  placeholder="Describe your technical solution and workflow..."
                  value={formData.solutionOverview}
                  onChange={(e) => setFormData({ ...formData, solutionOverview: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

            </div>
          )}

          {/* STEP 2: Team & Tech Stack */}
          {step === 2 && (
            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Team Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. NeuroStack Labs, Pixel Pioneers"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Team Captain / Leader *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Full name"
                    value={formData.teamLeader}
                    onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category Track</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Autonomous Agents">Autonomous Agents</option>
                    <option value="Generative Design">Generative Design</option>
                    <option value="Zero-Knowledge Security">Zero-Knowledge Security</option>
                    <option value="AI Diagnostics">AI Diagnostics</option>
                    <option value="Smart Payments">Smart Payments</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Co-Creators (Comma Separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Elena Rostova, Marcus Chen, Sarah Jenkins"
                  value={formData.teamMembers}
                  onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Technologies & Frameworks Used</label>
                <input 
                  type="text" 
                  placeholder="e.g. React 19, Python, FastAPI, Tailwind CSS, Ollama"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

            </div>
          )}

          {/* STEP 3: Links & Prototype */}
          {step === 3 && (
            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">GitHub Repository URL</label>
                <div className="relative">
                  <Code2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="url" 
                    placeholder="https://github.com/org/repo"
                    value={formData.githubRepo}
                    onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Live Demo / Deployed Link</label>
                <input 
                  type="url" 
                  placeholder="https://my-idea-demo.com"
                  value={formData.liveDemo}
                  onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Pitch Video Demonstration Link</label>
                <div className="relative">
                  <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="url" 
                    placeholder="https://youtube.com/watch?v=..."
                    value={formData.pitchVideoUrl}
                    onChange={(e) => setFormData({ ...formData, pitchVideoUrl: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Upload Dropzone Placeholder */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center space-y-2 bg-slate-50">
                <Upload className="w-8 h-8 text-blue-500 mx-auto" />
                <p className="text-xs font-bold text-slate-800">Drag & Drop Pitch Deck (PDF) or Architecture Schematics</p>
                <p className="text-[11px] text-slate-400">Max size 25MB • PDF, PNG, SVG</p>
              </div>

            </div>
          )}

          {/* MODAL FOOTER BUTTONS */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-secondary text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back Step
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary text-xs"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-amber text-xs shadow-lg px-6"
              >
                Submit Pitch Idea 🎉
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
