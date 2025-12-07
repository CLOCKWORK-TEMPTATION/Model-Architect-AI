import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { AnalysisResult, Candidate } from '../types';
import { FileText, CheckCircle, ChevronDown, ChevronUp, Terminal, BarChart2, DollarSign, Zap, Box, Wand2 } from 'lucide-react';

interface ResultDisplayProps {
  result: AnalysisResult | null;
}

const CandidateComparison: React.FC<{ candidates: Candidate[] }> = ({ candidates }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!candidates || candidates.length === 0) return null;

  // Find max values for progress bars
  const maxCost = Math.max(...candidates.map(c => c.cost_per_1k_tokens));
  const maxContext = Math.max(...candidates.map(c => c.context_window));
  const maxLatency = Math.max(...candidates.map(c => c.avg_latency));
  
  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden mb-6 transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-900/30 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BarChart2 className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-slate-200">Candidate Comparison Matrix</h3>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </button>

      {isOpen && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-2 fade-in duration-300">
          {candidates.map((candidate, idx) => (
            <div key={idx} className="bg-slate-950 rounded-lg p-4 border border-slate-800 hover:border-cyan-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-200">{candidate.model_name}</h4>
                <div className={`px-2 py-0.5 rounded text-xs font-bold ${idx === 0 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                  Score: {candidate.score}
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Cost Metric */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Cost/1k</span>
                    <span className="text-slate-300 font-mono">${candidate.cost_per_1k_tokens}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500/60 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${(candidate.cost_per_1k_tokens / maxCost) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Context Metric */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 flex items-center gap-1"><Box className="w-3 h-3" /> Context</span>
                    <span className="text-slate-300 font-mono">{(candidate.context_window / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500/60 rounded-full transition-all duration-1000 ease-out delay-100" 
                      style={{ width: `${(candidate.context_window / maxContext) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Latency Metric */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 flex items-center gap-1"><Zap className="w-3 h-3" /> Latency</span>
                    <span className="text-slate-300 font-mono">{candidate.avg_latency}ms</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500/60 rounded-full transition-all duration-1000 ease-out delay-200" 
                      style={{ width: `${(candidate.avg_latency / maxLatency) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-900 text-xs text-slate-400 italic">
                 "{candidate.reasoning_brief}"
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [showScratchpad, setShowScratchpad] = useState(false);

  if (!result) return null;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Recommendation Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)] overflow-hidden">
        <div className="bg-cyan-500/10 px-6 py-4 border-b border-cyan-500/20 flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <CheckCircle className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-cyan-50">Architect's Recommendation</h2>
        </div>
        <div className="p-8 prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-cyan-50 prose-strong:text-cyan-200">
          <ReactMarkdown>
            {result.recommendation}
          </ReactMarkdown>
        </div>
      </div>

      {/* Fine-Tuning Guidance (Conditional) */}
      {result.fine_tuning_tip && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wand2 className="w-24 h-24 text-amber-500" />
          </div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-2 bg-amber-500/20 rounded-lg shrink-0 mt-1">
              <Wand2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-200 mb-2">Fine-Tuning Strategy</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {result.fine_tuning_tip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Candidate Comparison */}
      {result.candidates && result.candidates.length > 0 && (
        <CandidateComparison candidates={result.candidates} />
      )}

      {/* Reasoning Section */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-3">
          <FileText className="w-5 h-5 text-slate-400" />
          <h3 className="font-semibold text-slate-200">Detailed Reasoning</h3>
        </div>
        <div className="p-6 prose prose-invert max-w-none prose-sm prose-p:text-slate-400 prose-li:text-slate-400 prose-table:border-collapse prose-th:bg-slate-800 prose-th:text-slate-200 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-slate-800/50">
          <ReactMarkdown>{result.reasoning}</ReactMarkdown>
        </div>
      </div>

      {/* Collapsible Scratchpad */}
      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowScratchpad(!showScratchpad)}
          className="w-full flex items-center justify-between px-6 py-3 bg-slate-900 hover:bg-slate-800/80 transition-colors"
        >
          <div className="flex items-center gap-2 text-slate-500 font-mono text-sm">
            <Terminal className="w-4 h-4" />
            <span>Process Log & Scratchpad</span>
          </div>
          {showScratchpad ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
        
        {showScratchpad && (
          <div className="bg-slate-950 p-6 border-t border-slate-800">
             <div className="prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 font-mono text-xs text-slate-400">
              <ReactMarkdown>{result.scratchpad}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;