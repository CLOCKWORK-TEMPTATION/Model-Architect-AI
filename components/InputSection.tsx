import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface InputSectionProps {
  task: string;
  setTask: (t: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ task, setTask, onAnalyze, isAnalyzing }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-semibold text-slate-100">Task Definition</h2>
      </div>
      
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Describe your AI task in detail (e.g., 'I need a system to process 10,000 PDF medical records daily, extracting patient names and diagnosis codes, with zero tolerance for hallucinations...')"
          className="relative w-full h-48 bg-slate-900 text-slate-200 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none font-sans text-base leading-relaxed placeholder-slate-500 shadow-xl"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={!task.trim() || isAnalyzing}
          className={`
            relative px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all
            ${!task.trim() || isAnalyzing 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5'
            }
          `}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Architectures...
            </>
          ) : (
            <>
              Initialize Analysis <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
