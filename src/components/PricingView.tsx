import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { UserAccount } from '../types';

interface PricingViewProps {
  user: UserAccount | null;
  onUpgradePlan: (plan: 'free' | 'pro' | 'business') => void;
  onOpenAuth: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ user, onUpgradePlan, onOpenAuth }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      badge: 'Current Standard',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'Essential PDF processing tools for everyday light use.',
      features: [
        'Access to all 28 basic PDF tools',
        'Max file size: 25 MB per file',
        'Up to 15 operations per day',
        'Standard processing queue',
        'Single file upload at a time',
        '100% In-Browser Privacy'
      ],
      ctaText: user?.plan === 'free' ? 'Current Plan' : 'Select Free',
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      badge: 'Most Popular',
      priceMonthly: 8,
      priceAnnual: 6, // $72/year
      description: 'Power tools, unlimited batch processing, and high-resolution conversions.',
      features: [
        'Everything in Free, plus:',
        'Unlimited operations per day',
        'Max file size: 200 MB per file',
        'Batch upload & merge up to 50 files',
        'High-resolution OCR text extraction',
        'Faster WebAssembly parallel workers',
        'Ad-free experience with priority queue',
        'Custom signature library saved locally'
      ],
      ctaText: user?.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      popular: true
    },
    {
      id: 'business',
      name: 'Team & Business',
      badge: 'Best Value',
      priceMonthly: 18,
      priceAnnual: 14, // $168/year
      description: 'For organizations demanding high-throughput document management.',
      features: [
        'Everything in Pro, plus:',
        'Unlimited file sizes (up to 1 GB)',
        'Unlimited multi-page batch processing',
        'Custom company watermark templates',
        'Admin dashboard & team audit logs',
        'Dedicated 24/7 priority support',
        'Custom invoice generation'
      ],
      ctaText: user?.plan === 'business' ? 'Current Plan' : 'Upgrade to Business',
      popular: false
    }
  ];

  const faqs = [
    {
      q: 'Are my uploaded PDF files safe and secure?',
      a: 'Yes, absolutely. PDF Master executes document manipulation directly inside your browser using client-side WebAssembly and JavaScript engines. Your private documents are never sent or stored on external servers.'
    },
    {
      q: 'Can I cancel or switch my subscription at any time?',
      a: 'Yes, you can upgrade, downgrade, or cancel your subscription anytime with zero penalties or hidden fees.'
    },
    {
      q: 'What payment methods do you support?',
      a: 'We accept all major credit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, and PayPal.'
    },
    {
      q: 'Do you offer refunds if I am not satisfied?',
      a: 'We offer a 14-day no-questions-asked money-back guarantee on all annual and monthly plans.'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    onUpgradePlan(planId as 'free' | 'pro' | 'business');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Simple, Transparent Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Pick the perfect plan for your PDF needs
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Start for free, or unlock unlimited batch operations, 200MB+ document size limits, and advanced OCR tools.
        </p>

        {/* Billing cycle toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full">
              Save 25%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
        {plans.map(plan => {
          const isCurrent = user?.plan === plan.id;
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-500/10 scale-105 z-10'
                  : 'bg-white border border-slate-200 shadow-md hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">{plan.name}</h3>
                  {isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 min-h-[36px]">{plan.description}</p>

                {/* Price display */}
                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">${price}</span>
                    <span className="text-xs font-semibold text-slate-500">/ month</span>
                  </div>
                  {billingCycle === 'annual' && price > 0 && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                      Billed annually (${price * 12}/year)
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Included Features</p>
                  <ul className="space-y-3 text-xs text-slate-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  id={`select-plan-${plan.id}-btn`}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 active:scale-98'
                      : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-98'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto border-t border-slate-200 pt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 mt-1">Everything you need to know about our service and billing</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
