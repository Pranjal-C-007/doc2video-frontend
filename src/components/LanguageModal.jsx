import React from 'react';
import { Globe, ArrowRight, X } from 'lucide-react';

export default function LanguageModal({ isOpen, onClose, selectedLangName, onSelectSupported }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gov-deep/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-gov-navy border border-gov-cardBorder rounded-2xl p-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Language Notice</h3>
            <p className="text-xs text-amber-300 font-medium">{selectedLangName} Selected</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          The cross-lingual synthesis portal UI is configured for all 14 official scheduled languages. 
          In this local hackathon release, <strong>Hindi (हिन्दी)</strong> and <strong>English</strong> are fully active with automated translation, speech synthesis, and video rendering.
        </p>

        <div className="space-y-2.5 mb-6">
          <button
            onClick={() => {
              onSelectSupported('hi');
              onClose();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gov-card hover:bg-slate-800 border border-gov-saffron/40 text-left transition-all group"
          >
            <div>
              <span className="text-sm font-semibold text-white group-hover:text-gov-saffron">Switch to Hindi (हिन्दी)</span>
              <p className="text-xs text-slate-400">Full Translation + Neural Voiceover</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gov-saffron group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              onSelectSupported('en');
              onClose();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gov-card hover:bg-slate-800 border border-slate-700 text-left transition-all group"
          >
            <div>
              <span className="text-sm font-semibold text-white group-hover:text-sky-400">Switch to English</span>
              <p className="text-xs text-slate-400">English Speech + Subtitles</p>
            </div>
            <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
        >
          Close & Keep Browsing
        </button>

      </div>
    </div>
  );
}
