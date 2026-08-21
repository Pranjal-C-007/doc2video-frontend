import React from 'react';
import { Shield, Radio, Video, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header({ currentView, setCurrentView, backendStatus, generatedVideo, apiUrl = 'http://localhost:5001' }) {
  const apiLabel = (() => {
    try {
      const parsed = new URL(apiUrl);
      return `API: ${parsed.host}`;
    } catch {
      return 'API: Live';
    }
  })();

  return (
    <header className="sticky top-0 z-40 bg-gov-navy/95 backdrop-blur-md border-b border-gov-cardBorder shadow-lg">
      {/* National Tricolor Top Line */}
      <div className="tricolor-bar"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand & Logo */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setCurrentView('creator')}>
            {/* National Emblem / PIB Seal Placeholder */}
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gov-saffron to-amber-600 flex items-center justify-center shadow-md border border-amber-300/40">
              <Shield className="w-7 h-7 text-slate-900" />
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-wide text-white">
                  Press Information Bureau
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gov-saffron/20 text-gov-saffron border border-gov-saffron/30">
                  PIB
                </span>
              </div>
              <p className="text-xs font-medium text-slate-300 tracking-wider">
                GOVERNMENT OF INDIA • CROSS-LINGUAL VIDEO SYNTHESIS PORTAL
              </p>
            </div>
          </div>

          {/* Navigation & Live Status */}
          <div className="flex items-center space-x-6">
            
            {/* Navigation Tabs */}
            <nav className="flex space-x-1 bg-gov-darkblue/80 p-1 rounded-lg border border-gov-cardBorder">
              <button
                onClick={() => setCurrentView('creator')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === 'creator'
                    ? 'bg-gov-saffron text-slate-950 shadow font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Video Creator
              </button>

              <button
                onClick={() => setCurrentView('officer-dashboard')}
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2 ${
                  currentView === 'officer-dashboard'
                    ? 'bg-gov-saffron text-slate-950 shadow font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Officer Dashboard</span>
                {generatedVideo && (
                  <span className="w-2 h-2 rounded-full bg-gov-green animate-pulse"></span>
                )}
              </button>
            </nav>

            {/* Backend API Health Status */}
            <div className="hidden md:flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-gov-deep/90 border border-slate-700/60 shadow-inner">
              <div className="relative flex items-center justify-center">
                <span className={`w-2.5 h-2.5 rounded-full ${backendStatus === 'connected' ? 'bg-emerald-400' : backendStatus === 'checking' ? 'bg-amber-400' : 'bg-red-500'}`}></span>
                {backendStatus === 'connected' && (
                  <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
                )}
              </div>
              <div className="text-xs">
                <span className="text-slate-400 font-mono">{apiLabel}</span>
                <span className={`ml-2 font-semibold ${backendStatus === 'connected' ? 'text-emerald-400' : backendStatus === 'checking' ? 'text-amber-400' : 'text-red-400'}`}>
                  {backendStatus === 'connected' ? 'Connected' : backendStatus === 'checking' ? 'Checking...' : 'Disconnected'}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </header>
  );
}
