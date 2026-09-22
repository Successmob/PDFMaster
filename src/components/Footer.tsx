import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Zap, 
  Heart,
  Globe,
  Twitter,
  Github,
  Linkedin,
  ArrowUpRight
} from 'lucide-react';
import { TOOLS } from '../data/tools';

interface FooterProps {
  onNavigate: (view: string, toolId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust highlights banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">100% Client-Side Privacy</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Your PDF documents are processed locally inside your web browser. No unauthorized storage or leaks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Instant Real-Time Processing</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Powered by modern WebAssembly and native PDF engines for lightning-fast merging, conversion, and compression.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Automatic Cleanup</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                All temporary buffers and memory streams are wiped immediately upon job completion or page refresh.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                PDF<span className="text-indigo-400">Master</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
              The modern, private, and all-in-one suite of PDF utilities. Merge, split, compress, convert, edit, and sign documents seamlessly without downloading software.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Popular Tools</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('tool', 'merge-pdf')} className="hover:text-white transition-colors">Merge PDF</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'split-pdf')} className="hover:text-white transition-colors">Split PDF</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'compress-pdf')} className="hover:text-white transition-colors">Compress PDF</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'rotate-pdf')} className="hover:text-white transition-colors">Rotate PDF</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'sign-pdf')} className="hover:text-white transition-colors">Sign PDF</button>
              </li>
            </ul>
          </div>

          {/* Conversion */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Convert</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('tool', 'pdf-to-word')} className="hover:text-white transition-colors">PDF to Word</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'word-to-pdf')} className="hover:text-white transition-colors">Word to PDF</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'pdf-to-jpg')} className="hover:text-white transition-colors">PDF to JPG</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'jpg-to-pdf')} className="hover:text-white transition-colors">JPG to PDF</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'pdf-to-excel')} className="hover:text-white transition-colors">PDF to Excel</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool', 'excel-to-pdf')} className="hover:text-white transition-colors">Excel to PDF</button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Company & Legal</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Pricing Plans</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Terms of Service</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Security Overview</button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1">
                  <span>Admin Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PDF Master. All rights reserved. Built with privacy-first browser architecture.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All systems operational
            </span>
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
