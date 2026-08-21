import React from 'react';
import { ShieldCheck, Cpu, Code2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gov-cardBorder bg-gov-navy/80 backdrop-blur-md">
      <div className="tricolor-bar"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded bg-gov-card border border-gov-cardBorder">
              <ShieldCheck className="w-4 h-4 text-gov-saffron" />
            </div>
            <div>
              <p className="font-semibold text-slate-300">
                Press Information Bureau • Government of India
              </p>
              <p className="text-slate-400">
                National Portal for Automated Multi-Lingual Media Broadcast & Citizen Outreach
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-gov-saffron" />
              <span>MoviePy + gTTS Engine</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>14 Scheduled Languages</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Flask + React Stack</span>
            </div>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          Cross-Lingual Video Synthesis System • PIB Hackathon Edition • Local Windows Runtime
        </div>
      </div>
    </footer>
  );
}
