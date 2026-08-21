import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100',
    error: 'bg-red-950/90 border-red-500/50 text-red-100',
    warning: 'bg-amber-950/90 border-amber-500/50 text-amber-100',
    info: 'bg-sky-950/90 border-sky-500/50 text-sky-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slide-up">
      <div className={`flex items-start space-x-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${bgStyles[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <div className="flex-1 pr-2">
          {toast.title && <h4 className="text-sm font-semibold mb-0.5">{toast.title}</h4>}
          <p className="text-xs text-slate-200 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
