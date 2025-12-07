import React, { useState } from 'react';
import { ModelEntry, AnalysisResult, AppStatus } from './types';
import { DEFAULT_MODEL_CATALOG } from './constants';
import { analyzeTask } from './services/geminiService';
import InputSection from './components/InputSection';
import CatalogEditor from './components/CatalogEditor';
import ResultDisplay from './components/ResultDisplay';
import { Layers } from 'lucide-react';

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [catalog, setCatalog] = useState<ModelEntry[]>(DEFAULT_MODEL_CATALOG);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!task.trim()) return;
    
    setStatus(AppStatus.ANALYZING);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeTask(task, catalog);
      setResult(analysis);
      setStatus(AppStatus.COMPLETE);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <header className="mb-12 flex flex-col items-start gap-4 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-cyan-900/20">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Model Architect AI</h1>
              <p className="text-slate-400 text-sm mt-0.5">Automated Model Selection & Optimization Framework</p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <InputSection 
              task={task} 
              setTask={setTask} 
              onAnalyze={handleAnalyze} 
              isAnalyzing={status === AppStatus.ANALYZING} 
            />
            
            <div className="h-px bg-slate-800 w-full" />
            
            <CatalogEditor catalog={catalog} setCatalog={setCatalog} />
            
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-500">Methodology:</strong> This system applies a hierarchical selection framework (Constraints → Performance → Optimization) to match tasks with the optimal model from the provided catalog. Analysis is performed by Gemini 2.5 Flash.
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            {status === AppStatus.IDLE && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-2xl p-12 min-h-[400px]">
                <Layers className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium">Ready for input</p>
                <p className="text-sm opacity-60 max-w-xs text-center mt-2">Define your task and configure the catalog to receive an expert architectural recommendation.</p>
              </div>
            )}
            
            {status === AppStatus.ERROR && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-200">
                <h3 className="font-semibold mb-2">Analysis Failed</h3>
                <p>{error}</p>
                <button 
                  onClick={() => setStatus(AppStatus.IDLE)}
                  className="mt-4 text-sm font-medium hover:underline"
                >
                  Try again
                </button>
              </div>
            )}

            {(status === AppStatus.COMPLETE || status === AppStatus.ANALYZING) && (
              <div className={status === AppStatus.ANALYZING ? "opacity-50 blur-sm transition-all duration-500 pointer-events-none" : ""}>
                 {result && <ResultDisplay result={result} />}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
