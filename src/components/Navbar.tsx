import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles, 
  User, 
  LogOut, 
  Settings, 
  History, 
  Menu, 
  X,
  Layers,
  Scissors,
  Minimize2,
  PenTool,
  RotateCw,
  Lock
} from 'lucide-react';
import { ToolDefinition, UserAccount } from '../types';
import { TOOLS } from '../data/tools';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, toolId?: string) => void;
  user: UserAccount | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onOpenAuth,
  onLogout,
  onOpenSearch
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const popularTools = TOOLS.filter(t => t.badge === 'Popular').slice(0, 6);

  const handleToolSelect = (tool: ToolDefinition) => {
    setIsToolsOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate('tool', tool.id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    PDF<span className="text-indigo-600">Master</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded">
                    SaaS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">All-in-One PDF Suite</p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-600">
              <button
                id="nav-home-btn"
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'home' ? 'text-indigo-600 bg-indigo-50/70' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Home
              </button>

              {/* All Tools Dropdown */}
              <div className="relative">
                <button
                  id="nav-tools-dropdown-btn"
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  onBlur={() => setTimeout(() => setIsToolsOpen(false), 200)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <span>PDF Tools</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isToolsOpen && (
                  <div className="absolute left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Popular Quick Tools</span>
                      <button
                        onClick={() => { setIsToolsOpen(false); onOpenSearch(); }}
                        className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <Search className="w-3 h-3" /> View all 28 tools
                      </button>
                    </div>
                    {popularTools.map(tool => (
                      <button
                        key={tool.id}
                        id={`nav-quick-tool-${tool.id}`}
                        onClick={() => handleToolSelect(tool)}
                        className="flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-indigo-50/60 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-xs group-hover:text-indigo-600">{tool.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{tool.shortDesc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Quick Shortcuts */}
              <button
                id="nav-compress-btn"
                onClick={() => onNavigate('tool', 'compress-pdf')}
                className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Compress
              </button>

              <button
                id="nav-merge-btn"
                onClick={() => onNavigate('tool', 'merge-pdf')}
                className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Merge
              </button>

              <button
                id="nav-convert-btn"
                onClick={() => onNavigate('tool', 'pdf-to-word')}
                className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Convert
              </button>

              <button
                id="nav-edit-btn"
                onClick={() => onNavigate('tool', 'rotate-pdf')}
                className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Edit
              </button>

              <button
                id="nav-sign-btn"
                onClick={() => onNavigate('tool', 'sign-pdf')}
                className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <span>Sign</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </button>

              <button
                id="nav-pricing-btn"
                onClick={() => onNavigate('pricing')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'pricing' ? 'text-indigo-600 bg-indigo-50/70' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Pricing
              </button>

              <button
                id="nav-about-btn"
                onClick={() => onNavigate('about')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'about' ? 'text-indigo-600 bg-indigo-50/70' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                About
              </button>
            </nav>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              id="global-search-trigger-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium transition-all"
              title="Search all tools (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-white border border-slate-300 rounded font-mono text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Admin Switcher */}
            <button
              id="admin-panel-toggle-btn"
              onClick={() => onNavigate(currentView === 'admin' ? 'home' : 'admin')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'admin'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Admin Control Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentView === 'admin' ? 'Exit Admin' : 'Admin'}</span>
            </button>

            {/* User Account / Auth */}
            {user ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:ring-2 hover:ring-indigo-300 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="hidden md:block text-xs font-semibold text-slate-800 max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <span className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    user.plan === 'pro' 
                      ? 'bg-amber-100 text-amber-800' 
                      : user.plan === 'business' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.plan}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                        <span>Daily ops:</span>
                        <span className="font-bold text-indigo-600">{user.operationsToday} / {user.maxDailyOperations}</span>
                      </div>
                    </div>

                    <button
                      id="menu-dashboard-btn"
                      onClick={() => { setIsUserMenuOpen(false); onNavigate('dashboard'); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 mt-1 rounded-xl text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-left"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>User Dashboard</span>
                    </button>

                    <button
                      id="menu-pricing-btn"
                      onClick={() => { setIsUserMenuOpen(false); onNavigate('pricing'); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-left"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Manage Plan & Pro</span>
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      id="menu-logout-btn"
                      onClick={() => { setIsUserMenuOpen(false); onLogout(); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="auth-login-trigger-btn"
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Log in
                </button>
                <button
                  id="auth-register-trigger-btn"
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold shadow-xs shadow-indigo-500/20 transition-all active:scale-95"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 animate-in fade-in">
            <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('home'); }}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
              >
                Home
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onOpenSearch(); }}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 text-left text-indigo-600 flex items-center justify-between"
              >
                <span>All 28 Tools</span>
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('tool', 'merge-pdf'); }}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
              >
                Merge PDF
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('tool', 'split-pdf'); }}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
              >
                Split PDF
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('tool', 'compress-pdf'); }}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
              >
                Compress PDF
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('tool', 'sign-pdf'); }}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
              >
                Sign PDF
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('pricing'); }}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
              >
                Pricing Plans
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('about'); }}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
              >
                About & Security
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('admin'); }}
                className="px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 text-left font-bold"
              >
                Admin Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
