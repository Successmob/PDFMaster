import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileCheck, 
  HardDrive, 
  TrendingUp, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Settings, 
  Lock, 
  Activity,
  ArrowLeft
} from 'lucide-react';

interface AdminViewProps {
  onExitAdmin: () => void;
}

interface MockUser {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'business';
  status: 'active' | 'suspended';
  filesProcessed: number;
  joinedDate: string;
}

export const AdminView: React.FC<AdminViewProps> = ({ onExitAdmin }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'settings'>('analytics');
  const [userSearch, setUserSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');

  // Platform settings state
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [adBannersEnabled, setAdBannersEnabled] = useState(false);
  const [maxUploadLimitMb, setMaxUploadLimitMb] = useState(250);

  const [users, setUsers] = useState<MockUser[]>([
    { id: '1', name: 'Alex Johnson', email: 'alex.j@company.com', plan: 'pro', status: 'active', filesProcessed: 142, joinedDate: '2025-01-12' },
    { id: '2', name: 'Elena Rostova', email: 'elena@designstudio.io', plan: 'business', status: 'active', filesProcessed: 890, joinedDate: '2024-11-04' },
    { id: '3', name: 'Marcus Sterling', email: 'marcus@legalgroup.com', plan: 'business', status: 'active', filesProcessed: 1240, joinedDate: '2024-09-18' },
    { id: '4', name: 'Chloe Dubois', email: 'chloe.dubois@freelance.org', plan: 'free', status: 'active', filesProcessed: 18, joinedDate: '2025-02-01' },
    { id: '5', name: 'David Kim', email: 'dkim@fintech.kr', plan: 'pro', status: 'suspended', filesProcessed: 430, joinedDate: '2024-12-22' },
    { id: '6', name: 'Liam Davies', email: 'liam@oxford.edu', plan: 'free', status: 'active', filesProcessed: 27, joinedDate: '2025-02-14' },
  ]);

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesPlan = planFilter === 'all' || u.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  const toolStats = [
    { name: 'Merge PDF', count: '14,210 jobs', share: 29, color: 'bg-blue-600' },
    { name: 'Compress PDF', count: '11,450 jobs', share: 23, color: 'bg-emerald-600' },
    { name: 'PDF to Word', count: '8,920 jobs', share: 18, color: 'bg-indigo-600' },
    { name: 'Sign PDF', count: '5,800 jobs', share: 12, color: 'bg-purple-600' },
    { name: 'PDF to Images', count: '4,140 jobs', share: 9, color: 'bg-amber-600' },
    { name: 'Protect & Unlock', count: '4,400 jobs', share: 9, color: 'bg-rose-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">PDF Master Admin Console</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-500">System metrics, real-time analytics & user permissions</p>
          </div>
        </div>

        <button
          onClick={onExitAdmin}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Website</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 my-6 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'analytics' ? 'bg-purple-50 text-purple-700 font-extrabold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Analytics & Metrics
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'users' ? 'bg-purple-50 text-purple-700 font-extrabold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          User Accounts ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'settings' ? 'bg-purple-50 text-purple-700 font-extrabold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Global Configuration
        </button>
      </div>

      {/* Tab 1: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                <span className="font-semibold">Total Registered Users</span>
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">14,892</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.4% this month</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                <span className="font-semibold">PDFs Processed</span>
                <FileCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">48,920</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24.1% this week</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                <span className="font-semibold">Total Bandwidth Saved</span>
                <HardDrive className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">3.4 TB</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">
                via client compression
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                <span className="font-semibold">Engine Health</span>
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-600">99.98%</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">
                Zero reported crashes
              </div>
            </div>
          </div>

          {/* Tool Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-sm text-slate-900 mb-4">Most Popular PDF Tools</h3>
              <div className="space-y-4">
                {toolStats.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{item.count} ({item.share}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.share * 3}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 mb-2">Real-Time System Logs</h3>
                <p className="text-xs text-slate-500 mb-4">Latest execution events from browser workers</p>
                <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl font-mono text-[11px] space-y-2">
                  <p className="text-emerald-400">[INFO] WebAssembly PDF Engine initialized (v2.8.1)</p>
                  <p className="text-slate-400">[2026-09-22 13:41] Merged 4 files: 18 pages saved</p>
                  <p className="text-slate-400">[2026-09-22 13:42] Split range '1-4, 8': 5 pages created</p>
                  <p className="text-emerald-400">[2026-09-22 13:43] Compression completed: 62% reduction</p>
                  <p className="text-purple-400">[2026-09-22 13:44] Digital signature placed: Page 1, coords (45%, 82%)</p>
                  <p className="text-slate-400">[2026-09-22 13:45] Client buffer garbage collection executed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Accounts */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden animate-in fade-in">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user name or email..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-purple-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-500 font-semibold">Plan:</span>
              <select
                value={planFilter}
                onChange={e => setPlanFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-hidden font-medium"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">User</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Processed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">
                      <div>{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.plan === 'business' ? 'bg-purple-100 text-purple-800' :
                        u.plan === 'pro' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {u.filesProcessed} files
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{u.joinedDate}</td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          u.status === 'active'
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs max-w-2xl space-y-6 animate-in fade-in">
          <h3 className="font-extrabold text-base text-slate-900">Platform Global Configurations</h3>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <p className="font-bold text-xs text-slate-900">Maintenance Mode</p>
              <p className="text-[11px] text-slate-500">Temporarily disable processing for engine upgrades</p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                maintenanceMode ? 'bg-purple-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <p className="font-bold text-xs text-slate-900">Advertising Banners</p>
              <p className="text-[11px] text-slate-500">Show sponsor announcements to free tier users</p>
            </div>
            <button
              onClick={() => setAdBannersEnabled(!adBannersEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                adBannersEnabled ? 'bg-purple-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold text-xs text-slate-900">Global Upload Size Limit</p>
              <span className="font-mono text-xs font-bold text-purple-700">{maxUploadLimitMb} MB</span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={25}
              value={maxUploadLimitMb}
              onChange={e => setMaxUploadLimitMb(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>50 MB</span>
              <span>500 MB</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
