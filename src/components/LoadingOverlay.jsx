import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Languages, Mic, Image as ImageIcon, Film, CheckCircle2 } from 'lucide-react';

const STAGES = [
  { label: "Processing press release...", icon: Sparkles, duration: 2500 },
  { label: "Translating text...", icon: Languages, duration: 3000 },
  { label: "Generating voiceover...", icon: Mic, duration: 3500 },
  { label: "Finding media & stock visuals...", icon: ImageIcon, duration: 3000 },
  { label: "Creating video & burning subtitles...", icon: Film, duration: 6000 },
  { label: "Finalizing video...", icon: CheckCircle2, duration: 2000 }
];

export default function LoadingOverlay({ isGenerating }) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStageIdx(0);
      setProgress(10);
      return;
    }

    // Step cycle
    let stageTimer;
    let progressInterval;

    const runStages = (idx) => {
      if (idx >= STAGES.length - 1) return;
      stageTimer = setTimeout(() => {
        setCurrentStageIdx(idx + 1);
        runStages(idx + 1);
      }, STAGES[idx].duration);
    };

    runStages(0);

    // Smooth progress increment
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 92; // Wait for real response to hit 100
        return prev + Math.floor(Math.random() * 3 + 1);
      });
    }, 400);

    return () => {
      clearTimeout(stageTimer);
      clearInterval(progressInterval);
    };
  }, [isGenerating]);

  if (!isGenerating) return null;

  const CurrentIcon = STAGES[currentStageIdx]?.icon || Loader2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gov-deep/80 backdrop-blur-md px-4">
      <div className="w-full max-w-lg bg-gov-navy border border-gov-cardBorder rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Top Tricolor Strip */}
        <div className="absolute top-0 left-0 right-0 tricolor-bar"></div>

        <div className="text-center">
          {/* Animated Spinner Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-gov-cardBorder border-t-gov-saffron animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CurrentIcon className="w-8 h-8 text-gov-saffron animate-pulse" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Synthesizing Video Broadcast
          </h3>
          <p className="text-sm text-gov-saffron font-medium mb-6">
            {STAGES[currentStageIdx]?.label}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gov-deep rounded-full h-3 mb-2 p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-gov-saffron via-amber-400 to-gov-green h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 font-mono mb-6">
            <span>Processing Media Pipeline</span>
            <span>{progress}%</span>
          </div>

          {/* Step Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-left pt-4 border-t border-slate-800">
            {STAGES.slice(0, 6).map((stage, idx) => {
              const isPast = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;
              const StepIcon = stage.icon;

              return (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-xs flex items-center space-x-2 border transition-all ${
                    isPast
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : isCurrent
                      ? 'bg-gov-saffron/10 border-gov-saffron text-gov-saffron font-semibold'
                      : 'bg-gov-deep/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <StepIcon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'animate-spin' : ''}`} />
                  <span className="truncate">{stage.label.replace('...', '')}</span>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Please wait while the AI neural pipeline processes translation, generates audio clips, and renders video frames.
          </p>

        </div>
      </div>
    </div>
  );
}
