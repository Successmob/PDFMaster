import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Sparkles, 
  Layers, 
  Sliders, 
  Lock, 
  ArrowRight, 
  Upload, 
  CheckCircle2, 
  Star,
  FileCheck,
  Zap,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { ToolCategory, ToolDefinition, UserAccount } from '../types';
import { TOOLS } from '../data/tools';

interface HomeViewProps {
  onSelectTool: (toolId: string) => void;
  user: UserAccount | null;
  onOpenAuth: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTool, user, onOpenAuth }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeroDragging, setIsHeroDragging] = useState(false);

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Tools', count: TOOLS.length },
    { id: 'organize', label: 'Organize PDF', count: TOOLS.filter(t => t.category === 'organize').length },
    { id: 'optimize', label: 'Optimize PDF', count: TOOLS.filter(t => t.category === 'optimize').length },
    { id: 'convert-to-pdf', label: 'Convert to PDF', count: TOOLS.filter(t => t.category === 'convert-to-pdf').length },
    { id: 'convert-from-pdf', label: 'Convert from PDF', count: TOOLS.filter(t => t.category === 'convert-from-pdf').length },
    { id: 'edit-security', label: 'Security & Edit', count: TOOLS.filter(t => t.category === 'edit-security').length },
  ];

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.acceptLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle hero smart drop
  const handleHeroDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHeroDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      const first = files[0];
      const ext = first.name.split('.').pop()?.toLowerCase() || '';

      if (files.length > 1) {
        if (files.every(f => f.name.endsWith('.pdf'))) {
          onSelectTool('merge-pdf');
          return;
        }
        if (files.every(f => /\.(jpg|jpeg|png|webp)$/i.test(f.name))) {
          onSelectTool('images-to-pdf');
          return;
        }
      }

      if (ext === 'pdf') {
        onSelectTool('compress-pdf');
      } else if (ext === 'docx' || ext === 'doc') {
        onSelectTool('word-to-pdf');
      } else if (ext === 'xlsx' || ext === 'xls') {
        onSelectTool('excel-to-pdf');
      } else if (ext === 'pptx' || ext === 'ppt') {
        onSelectTool('powerpoint-to-pdf');
      } else if (['jpg', 'jpeg', 'png'].includes(ext)) {
        onSelectTool('jpg-to-pdf');
      } else {
        onSelectTool('compress-pdf');
      }
    }
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-6 shadow-xs animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>100% Free & Client-Side Secure PDF Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Every tool you need to work with PDFs in one place
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Merge, split, compress, convert, edit, and sign your PDF documents with absolute privacy. No file size limits or server data retention.
          </p>

          {/* Quick Smart Upload Dropzone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsHeroDragging(true); }}
            onDragLeave={() => setIsHeroDragging(false)}
            onDrop={handleHeroDrop}
            className={`mt-10 max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border-2 border-dashed transition-all ${
              isHeroDragging 
                ? 'border-indigo-600 bg-indigo-50/80 scale-[1.01]' 
                : 'border-slate-300 hover:border-indigo-400 bg-white shadow-lg shadow-slate-200/50'
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Drop your file here to auto-detect the best tool
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Drop multiple PDFs to merge, images to convert, or a single PDF to compress
              </p>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => onSelectTool('merge-pdf')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                >
                  Merge PDF
                </button>
                <button
                  onClick={() => onSelectTool('compress-pdf')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  Compress PDF
                </button>
                <button
                  onClick={() => onSelectTool('pdf-to-word')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  PDF to Word
                </button>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search across all 28 PDF tools..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 shadow-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium"
            />
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedCategory === cat.id ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No tools found matching "{searchQuery}"</h3>
            <p className="text-xs text-slate-500 mt-1">Try another keyword or select All Tools.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredTools.map(tool => (
              <button
                key={tool.id}
                id={`tool-card-${tool.id}`}
                onClick={() => onSelectTool(tool.id)}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-200 text-left group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.accentColor || 'from-indigo-500 to-indigo-600'} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-gradient-to-tr ${tool.accentColor || 'from-indigo-500 to-indigo-600'} group-hover:text-white transition-all duration-200 shadow-xs`}>
                      <FileText className="w-6 h-6" />
                    </div>

                    {tool.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                        tool.badge === 'Popular'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          : tool.badge === 'Essential'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                          : 'bg-purple-50 text-purple-700 border border-purple-200/60'
                      }`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {tool.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <span className="text-[11px] font-mono capitalize">{tool.category.replace(/-/g, ' ')}</span>
                  <div className="flex items-center gap-1">
                    <span>Use tool</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Feature Value Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                Security & Privacy First
              </span>
              <h2 className="text-3xl font-extrabold mt-3 tracking-tight">
                Your Documents Never Leave Your Device
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                Unlike traditional online PDF editors that require uploading your private files to remote servers, PDF Master processes everything inside your web browser using WebAssembly.
              </p>
              <div className="flex flex-wrap gap-4 mt-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No server uploads</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant processing speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Works completely offline</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs">
                <div className="text-3xl font-extrabold text-indigo-400 font-mono">100%</div>
                <div className="text-xs font-bold text-white mt-1">Client-Side Engine</div>
                <p className="text-[11px] text-slate-400 mt-1">Direct WebAssembly and PDF.js execution</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs">
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">28</div>
                <div className="text-xs font-bold text-white mt-1">Specialized PDF Tools</div>
                <p className="text-[11px] text-slate-400 mt-1">Merge, convert, sign, crop, optimize & OCR</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs">
                <div className="text-3xl font-extrabold text-amber-400 font-mono">0 sec</div>
                <div className="text-xs font-bold text-white mt-1">Queue Waiting Time</div>
                <p className="text-[11px] text-slate-400 mt-1">Zero server queue delays or bottlenecks</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs">
                <div className="text-3xl font-extrabold text-purple-400 font-mono">0 KB</div>
                <div className="text-xs font-bold text-white mt-1">Permanent Data Kept</div>
                <p className="text-[11px] text-slate-400 mt-1">Wiped on completion or tab reload</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
