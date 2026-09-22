import React from 'react';
import { 
  User, 
  Sparkles, 
  History, 
  HardDrive, 
  Clock, 
  Download, 
  Trash2, 
  Star, 
  ArrowRight, 
  FileText, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { UserAccount, ProcessedFileRecord } from '../types';
import { TOOLS } from '../data/tools';

interface DashboardViewProps {
  user: UserAccount;
  history: ProcessedFileRecord[];
  onDownloadRecord: (record: ProcessedFileRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
  onSelectTool: (toolId: string) => void;
  onUpgradePlan: (plan: 'free' | 'pro' | 'business') => void;
  onToggleFavorite: (toolId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  history,
  onDownloadRecord,
  onDeleteRecord,
  onClearHistory,
  onSelectTool,
  onUpgradePlan,
  onToggleFavorite
}) => {
  const favoriteTools = TOOLS.filter(t => user.favorites?.includes(t.id));
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const opsRatio = Math.round((user.operationsToday / user.maxDailyOperations) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner / Welcome */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-indigo-500/20">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  user.plan === 'pro' 
                    ? 'bg-amber-100 text-amber-800' 
                    : user.plan === 'business' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {user.plan} plan
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{user.email}</p>
            </div>
          </div>

          {/* Quick Plan Switcher for Testing */}
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 px-2">Switch Plan:</span>
            <button
              onClick={() => onUpgradePlan('free')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                user.plan === 'free' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => onUpgradePlan('pro')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                user.plan === 'pro' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pro ⭐
            </button>
            <button
              onClick={() => onUpgradePlan('business')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                user.plan === 'business' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Business 🚀
            </button>
          </div>
        </div>

        {/* Quota & Limit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold">Daily Operations</span>
              <span className="font-bold text-slate-800">{user.operationsToday} / {user.maxDailyOperations}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, opsRatio)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Resets daily at 00:00 UTC</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold">Max File Upload</span>
              <span className="font-bold text-slate-800">{user.plan === 'free' ? '25 MB' : user.plan === 'pro' ? '200 MB' : '1 GB'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-3">
              <CheckCircle className="w-4 h-4" />
              <span>High-speed browser pipeline active</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold">Session Clean State</span>
              <span className="font-bold text-emerald-600">Zero Server Data</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Your processing cache is isolated in private browser storage.
            </p>
          </div>
        </div>
      </div>

      {/* Favorite Tools Grid */}
      {favoriteTools.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Your Favorite Tools</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {favoriteTools.map(tool => (
              <div
                key={tool.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <button
                      onClick={() => onToggleFavorite(tool.id)}
                      className="p-1 text-amber-500 hover:text-slate-400 transition-colors"
                      title="Remove from favorites"
                    >
                      <Star className="w-4 h-4 fill-amber-500" />
                    </button>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{tool.shortDesc}</p>
                </div>
                <button
                  onClick={() => onSelectTool(tool.id)}
                  className="mt-4 w-full py-1.5 rounded-lg bg-slate-50 group-hover:bg-indigo-600 text-slate-700 group-hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1"
                >
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processed Files History */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600" />
              <span>Processed Documents History</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Files processed in this browser session.</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">No documents processed yet</p>
            <p className="text-xs text-slate-500 mt-1">Your recent PDF conversions and operations will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">File Name</th>
                  <th className="py-3 px-4">Tool Used</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900 flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="truncate max-w-xs">{record.outputFileName || record.fileName || record.inputFileName || 'document.pdf'}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-[10px]">
                        {record.toolName || record.toolTitle || 'PDF Tool'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {formatSize(record.outputSizeBytes || record.fileSizeBytes || 0)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <button
                        onClick={() => onDownloadRecord(record)}
                        className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteRecord(record.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete from history"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
