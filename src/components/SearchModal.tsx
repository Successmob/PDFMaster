import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { ToolDefinition } from '../types';
import { TOOLS } from '../data/tools';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectTool }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectTool(''); // can trigger open in parent
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectTool]);

  if (!isOpen) return null;

  const filtered = TOOLS.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase()) ||
    t.acceptLabel.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tools (e.g. merge, compress, word, sign, ocr, split)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full py-4 text-base text-slate-800 placeholder-slate-400 bg-transparent outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[420px] overflow-y-auto p-3 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-medium">No PDF tools found matching "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try keywords like merge, compress, image, password, or excel</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filtered.map(tool => (
                <button
                  key={tool.id}
                  id={`search-item-${tool.id}`}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-indigo-50/70 text-left transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 flex items-center justify-center shrink-0 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-slate-900 group-hover:text-indigo-600">
                        {tool.title}
                      </span>
                      {tool.badge && (
                        <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-indigo-100 text-indigo-700">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {tool.shortDesc}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 shrink-0 self-center" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{filtered.length} of 28 tools available</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            100% In-Browser Real Processing
          </span>
        </div>
      </div>
    </div>
  );
};
