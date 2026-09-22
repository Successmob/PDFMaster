import React, { useState } from 'react';
import { Shield, Lock, Zap, Cpu, Server, CheckCircle2, Send, HelpCircle, FileCheck } from 'lucide-react';

export const AboutView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-4">
          <Shield className="w-3.5 h-3.5" />
          Our Mission & Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Built for Privacy, Speed, and Simplicity
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          PDF Master is an independent, client-side PDF productivity suite engineered so you never have to surrender document privacy to unverified remote servers.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-2">WebAssembly & Canvas</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Operations like merging, page rotation, image extraction, and OCR run directly on your device's hardware using modern browser Web Workers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-2">Zero Data Storage</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your contracts, financial statements, and personal forms never leave your local browser RAM. Once a task finishes, buffers are instantly discarded.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-2">Zero Installation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No bulky desktop software or plugins required. PDF Master works smoothly across Windows, macOS, Linux, ChromeOS, iOS, and Android.
          </p>
        </div>
      </div>

      {/* Security & GDPR Accordion Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-20 shadow-xl">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Security Standard</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4">
            Enterprise-Grade Document Security
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-6">
            Unlike legacy PDF converters that upload entire documents to third-party cloud buckets, our browser-native engine parses the PDF binary tree locally.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GDPR and CCPA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TLS 256-bit In-Transit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Immediate Memory Garbage Collection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No Tracking of Document Content</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900 mb-1 text-center">Get in Touch</h3>
        <p className="text-xs text-slate-500 mb-6 text-center">Have suggestions, bug reports, or enterprise questions? Write to us.</p>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Message sent successfully!</p>
              <p className="text-emerald-700 mt-0.5">Thank you for reaching out. Our support team will reply to your email shortly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Sarah Connor"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-hidden font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="sarah@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-hidden font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
              <textarea
                required
                rows={4}
                placeholder="How can we help you?"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-hidden font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
