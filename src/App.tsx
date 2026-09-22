import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ToolInterface } from './components/ToolInterface';
import { PricingView } from './components/PricingView';
import { AboutView } from './components/AboutView';
import { DashboardView } from './components/DashboardView';
import { AdminView } from './components/AdminView';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { UserAccount, ProcessedFileRecord, ToolDefinition } from './types';
import { TOOLS } from './data/tools';

const LOCAL_STORAGE_USER_KEY = 'pdfmaster_user';
const LOCAL_STORAGE_HISTORY_KEY = 'pdfmaster_history';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'tool' | 'pricing' | 'about' | 'dashboard' | 'admin'>('home');
  const [activeToolId, setActiveToolId] = useState<string>('merge-pdf');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize or load user from localStorage
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    // Default guest profile
    return {
      id: 'usr_guest_demo',
      name: 'Guest User',
      email: 'guest@pdfmaster.io',
      plan: 'free',
      operationsToday: 1,
      maxDailyOperations: 15,
      storageUsedBytes: 1024 * 1024 * 2.5,
      maxStorageBytes: 1024 * 1024 * 100,
      favorites: ['merge-pdf', 'compress-pdf', 'pdf-to-word', 'sign-pdf'],
      isVerified: true
    };
  });

  // Load history from localStorage
  const [history, setHistory] = useState<ProcessedFileRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [user]);

  // Sync history to localStorage (excluding direct blob objects for safety)
  useEffect(() => {
    try {
      const safeHistory = history.slice(0, 30).map(item => ({
        id: item.id,
        toolId: item.toolId,
        toolTitle: item.toolTitle,
        fileName: item.fileName,
        originalSizeBytes: item.originalSizeBytes,
        outputSizeBytes: item.outputSizeBytes,
        timestamp: item.timestamp,
        blobUrl: item.blobUrl
      }));
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(safeHistory));
    } catch (_) {}
  }, [history]);

  // Handle Navigation
  const handleNavigate = (view: string, toolId?: string) => {
    if (toolId) {
      setActiveToolId(toolId);
      setCurrentView('tool');
    } else {
      setCurrentView(view as any);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (toolId: string) => {
    setActiveToolId(toolId);
    setCurrentView('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveRecord = (record: ProcessedFileRecord) => {
    setHistory(prev => [record, ...prev]);
    if (user) {
      setUser(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          operationsToday: prev.operationsToday + 1,
          storageUsedBytes: prev.storageUsedBytes + record.outputSizeBytes
        };
      });
    }
  };

  const handleDownloadRecord = (record: ProcessedFileRecord) => {
    if (record.blobUrl) {
      const a = document.createElement('a');
      a.href = record.blobUrl;
      a.download = record.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleDeleteRecord = (id: string) => {
    setHistory(prev => prev.filter(r => r.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleUpgradePlan = (plan: 'free' | 'pro' | 'business') => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        plan,
        maxDailyOperations: plan === 'business' ? 1000 : plan === 'pro' ? 100 : 15,
        maxStorageBytes: plan === 'business' ? 1024 * 1024 * 1024 * 50 : plan === 'pro' ? 1024 * 1024 * 1024 * 5 : 1024 * 1024 * 100
      };
    });
  };

  const handleToggleFavorite = (toolId: string) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setUser(prev => {
      if (!prev) return prev;
      const current = prev.favorites || [];
      const updated = current.includes(toolId)
        ? current.filter(id => id !== toolId)
        : [...current, toolId];
      return { ...prev, favorites: updated };
    });
  };

  const activeTool: ToolDefinition = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onSelectTool={handleSelectTool}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentView === 'tool' && (
          <ToolInterface
            tool={activeTool}
            user={user}
            onBack={() => setCurrentView('home')}
            onSaveRecord={handleSaveRecord}
            onSelectTool={handleSelectTool}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentView === 'pricing' && (
          <PricingView
            user={user}
            onUpgradePlan={handleUpgradePlan}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView />
        )}

        {currentView === 'dashboard' && user && (
          <DashboardView
            user={user}
            history={history}
            onDownloadRecord={handleDownloadRecord}
            onDeleteRecord={handleDeleteRecord}
            onClearHistory={handleClearHistory}
            onSelectTool={handleSelectTool}
            onUpgradePlan={handleUpgradePlan}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            onExitAdmin={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Global SaaS Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={newUser => setUser(newUser)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
