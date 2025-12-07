import React, { useState } from 'react';
import { ModelEntry } from '../types';
import { Database, RotateCcw, Check, Edit2, X } from 'lucide-react';
import { DEFAULT_MODEL_CATALOG } from '../constants';

interface CatalogEditorProps {
  catalog: ModelEntry[];
  setCatalog: (c: ModelEntry[]) => void;
}

const CatalogEditor: React.FC<CatalogEditorProps> = ({ catalog, setCatalog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(catalog, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setCatalog(DEFAULT_MODEL_CATALOG);
    setJsonInput(JSON.stringify(DEFAULT_MODEL_CATALOG, null, 2));
    setError(null);
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) throw new Error("Catalog must be an array of models.");
      setCatalog(parsed);
      setIsOpen(false);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
    }
  };

  const handleOpen = () => {
    setJsonInput(JSON.stringify(catalog, null, 2));
    setIsOpen(true);
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-200">
          <Database className="w-5 h-5 text-cyan-500" />
          <h3 className="font-semibold">Model Catalog</h3>
          <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
            {catalog.length} Models
          </span>
        </div>
        <button 
          onClick={handleOpen}
          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
        >
          <Edit2 className="w-3 h-3" /> Edit Catalog
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {catalog.map((model, idx) => (
          <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-700/50 text-sm flex justify-between items-center group hover:border-cyan-500/30 transition-colors">
            <div>
              <div className="font-medium text-slate-300">{model.model_name}</div>
              <div className="text-xs text-slate-500">{model.provider} • {model.capabilities[0]}</div>
            </div>
            <div className="text-xs font-mono text-slate-500">
              ${model.cost_per_1k_tokens}/1k
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 w-full max-w-4xl h-[80vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-cyan-500" />
                Edit Catalog JSON
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-0 relative">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-full bg-slate-950 text-slate-300 font-mono text-sm p-4 outline-none resize-none"
                spellCheck={false}
              />
              {error && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/50 text-red-200 p-2 rounded text-sm">
                  Error: {error}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-between items-center">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset to Default
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-cyan-900/20"
                >
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogEditor;
