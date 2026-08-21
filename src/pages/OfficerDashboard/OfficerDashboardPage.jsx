import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Youtube, 
  Twitter, 
  Film, 
  Clock, 
  FileText, 
  Calendar, 
  ArrowLeft, 
  Download,
  AlertTriangle,
  Radio,
  Sparkles,
  Layers,
  Pencil,
  RefreshCw,
  X,
  Loader
} from 'lucide-react';

const LANGUAGE_MAP = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  mr: 'Marathi (मराठी)',
  gu: 'Gujarati (ગુજરાતી)',
  bn: 'Bengali (বাংলা)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  pa: 'Punjabi (ਪੰਜਾਬੀ)',
  ur: 'Urdu (اردو)',
  or: 'Odia (ଓଡ଼ିଆ)',
  as: 'Assamese (অসমীয়া)',
  ne: 'Nepali (नेपाली)'
};

export default function OfficerDashboardPage({ videoData, onBackToCreator, onRegenerateScene, showToast }) {

  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedStatus, setPublishedStatus] = useState(false);

  // Single Scene Regeneration State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSceneIndex, setEditingSceneIndex] = useState(null);
  const [editedSentence, setEditedSentence] = useState('');
  const [editedKeyword, setEditedKeyword] = useState('');
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);

  // If no video is present, display empty state
  if (!videoData || !videoData.video_url) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gov-card border border-gov-cardBorder flex items-center justify-center text-slate-400">
          <Film className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">No Generated Video for Review</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Please enter a Government press release in the Video Creator to synthesize an official multi-lingual broadcast.
          </p>
        </div>
        <button
          onClick={onBackToCreator}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gov-saffron text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to Video Creator</span>
        </button>
      </div>
    );
  }

  const handleOpenEditModal = (idx, scene) => {
    setEditingSceneIndex(idx);
    setEditedSentence(scene.sentence || '');
    setEditedKeyword(scene.keyword || '');
    setEditModalOpen(true);
  };

  const handleRegenerateConfirm = async () => {
    if (editingSceneIndex === null) return;
    if (!editedSentence.trim()) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Scene text cannot be empty.' });
      return;
    }
    if (!editedKeyword.trim()) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Visual keyword cannot be empty.' });
      return;
    }

    const targetIdx = editingSceneIndex;
    setRegeneratingIndex(targetIdx);
    setEditModalOpen(false);

    try {
      await onRegenerateScene({
        targetIndex: targetIdx,
        newSentence: editedSentence.trim(),
        newKeyword: editedKeyword.trim()
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Regeneration Error',
        message: err.message || 'Unable to regenerate scene. Please try again.'
      });
    } finally {
      setRegeneratingIndex(null);
      setEditingSceneIndex(null);
    }
  };

  const handleApproveClick = () => {
    setPublishModalOpen(true);
    setIsPublishing(true);
    // Simulate multi-channel mock broadcast
    setTimeout(() => {
      setIsPublishing(false);
      setPublishedStatus(true);
      showToast({
        type: 'success',
        title: 'Mock Broadcast Dispatched',
        message: 'Video successfully auto-uploaded to YouTube & Twitter. [Demo / Mock Publishing]'
      });
    }, 2000);
  };

  const handleRejectConfirm = () => {
    setRejectModalOpen(false);
    showToast({
      type: 'warning',
      title: 'Video Rejected',
      message: 'Video rejected successfully. Returning to Creator portal.'
    });
    onBackToCreator();
  };

  const timestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gov-cardBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-gov-saffron uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Ministry of Information & Broadcasting • PIB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            PIB Officer Approval Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Review synthesized multi-lingual broadcast before official release
          </p>
        </div>

        <button
          onClick={onBackToCreator}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gov-card hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Create Another Release</span>
        </button>
      </div>

      {/* Main Grid: Video Player + Metadata & Approval */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Video Preview & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="gov-card rounded-2xl p-4 sm:p-5 border border-gov-cardBorder shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-200">Broadcast Preview (16:9 HD)</span>
              </div>
              <span className="text-xs font-mono text-gov-saffron bg-gov-saffron/10 px-2 py-0.5 rounded border border-gov-saffron/30 uppercase">
                {LANGUAGE_MAP[videoData.language] || videoData.language || 'ENGLISH'}
              </span>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner">
              <video
                key={videoData.video_url}
                src={videoData.video_url}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML5 MP4 video playback.
              </video>
            </div>

            {/* Quick Actions below video */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="font-mono truncate max-w-xs">{videoData.filename}</span>
              <a
                href={videoData.video_url}
                download={videoData.filename}
                className="flex items-center space-x-1.5 text-gov-saffron hover:underline font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download MP4</span>
              </a>
            </div>
          </div>

          {/* Scene Breakdown List */}
          {videoData.scenes && videoData.scenes.length > 0 && (
            <div className="gov-card rounded-2xl p-5 border border-gov-cardBorder space-y-3">
              <div className="flex items-center justify-between text-slate-200 font-bold text-xs uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-gov-saffron" />
                  <span>Synthesized Scenes ({videoData.scenes.length})</span>
                </div>
                <span className="text-[11px] text-slate-400 font-normal">Select scene to edit</span>
              </div>
              <div className="space-y-2.5">
                {videoData.scenes.map((s, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                    regeneratingIndex === idx 
                      ? 'bg-amber-500/10 border-gov-saffron animate-pulse' 
                      : 'bg-gov-deep/80 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between text-slate-400">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gov-saffron">Scene {idx + 1}</span>
                        {regeneratingIndex === idx ? (
                          <span className="inline-flex items-center space-x-1 text-amber-300 font-bold text-[11px]">
                            <Loader className="w-3 h-3 animate-spin text-gov-saffron" />
                            <span>Regenerating Scene...</span>
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-mono">{s.duration}s • Query: "{s.keyword}"</span>
                        <button
                          type="button"
                          disabled={regeneratingIndex !== null}
                          onClick={() => handleOpenEditModal(idx, s)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-gov-saffron border border-gov-saffron/30 hover:border-gov-saffron font-medium transition-all text-[11px]"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Edit Scene</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-200 font-medium leading-relaxed">{s.sentence}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Metadata & Decision Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Metadata Card */}
          <div className="gov-card rounded-2xl p-6 border border-gov-cardBorder shadow-2xl space-y-5">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gov-saffron" />
              <span>Release Metadata</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Target Language:</span>
                <span className="font-semibold text-white">
                  {LANGUAGE_MAP[videoData.language] || videoData.language || 'English'}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Generation Status:</span>
                <span className="inline-flex items-center space-x-1 font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ready for Approval</span>
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Duration:</span>
                <span className="font-mono font-semibold text-white">
                  {videoData.duration ? `${Math.round(videoData.duration)}s` : 'N/A'}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Resolution:</span>
                <span className="font-mono text-slate-300">1280 × 720 (16:9 HD)</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Date & Time:</span>
                <span className="text-slate-300">{timestamp}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">AI Avatar Presenter:</span>
                <span className="font-semibold">
                  {videoData.avatar_enabled ? (
                    <span className="text-amber-400 font-semibold">★ PIB Official Anchor</span>
                  ) : (
                    <span className="text-slate-400">Off (Voiceover Only)</span>
                  )}
                </span>
              </div>
            </div>


            {/* Officer Action Buttons */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleApproveClick}
                className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
              >
                <CheckCircle2 className="w-5 h-5 text-slate-950" />
                <span>Approve & Publish</span>
              </button>

              <button
                onClick={() => setRejectModalOpen(true)}
                className="w-full py-3 px-6 rounded-xl font-semibold text-xs bg-slate-800/80 hover:bg-red-950/50 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/50 flex items-center justify-center space-x-2 transition-all"
              >
                <XCircle className="w-4 h-4 text-red-400" />
                <span>Reject Video</span>
              </button>
            </div>
            
            <p className="text-[11px] text-center text-slate-400">
              * Official approval triggers mock multi-channel broadcast to government social feeds.
            </p>
          </div>

          {/* Social Distribution Status Card */}
          <div className="gov-card rounded-2xl p-5 border border-gov-cardBorder space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Connected Channels (Mock Broadcasting)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-gov-deep border border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span className="text-slate-300">PIB YouTube Shorts</span>
                </div>
                <span className={`text-[11px] font-semibold ${publishedStatus ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {publishedStatus ? 'Published' : 'Standby'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-gov-deep border border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <Twitter className="w-4 h-4 text-sky-400" />
                  <span className="text-slate-300">PIB India Official (X)</span>
                </div>
                <span className={`text-[11px] font-semibold ${publishedStatus ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {publishedStatus ? 'Published' : 'Standby'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Mock Publish Modal */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gov-deep/85 backdrop-blur-md px-4">
          <div className="w-full max-w-md bg-gov-navy border border-gov-cardBorder rounded-2xl p-6 shadow-2xl relative text-center space-y-4">
            
            {isPublishing ? (
              <div className="py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-700 border-t-emerald-400 animate-spin flex items-center justify-center">
                  <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white">Broadcasting to PIB Social Channels...</h3>
                <p className="text-xs text-slate-400">Dispatching multi-lingual video to YouTube Shorts & Twitter API feeds.</p>
              </div>
            ) : (
              <div className="py-2 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Video Published Successfully</h3>
                  <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-semibold">
                    Demo / Mock Publishing
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-gov-deep p-3 rounded-xl border border-slate-800">
                  Video successfully auto-uploaded to YouTube & Twitter.<br />
                  <span className="font-semibold text-emerald-400">Publication status: Successful</span>
                </p>
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setPublishModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setPublishModalOpen(false);
                      onBackToCreator();
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-gov-saffron text-slate-950 text-xs font-bold hover:brightness-110"
                  >
                    New Press Release
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gov-deep/85 backdrop-blur-md px-4">
          <div className="w-full max-w-md bg-gov-navy border border-gov-cardBorder rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Reject Video Broadcast?</h3>
                <p className="text-xs text-slate-400">This action will cancel release distribution.</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to reject this synthesized video? The video will not be published, and you will be returned to the Creator portal to edit the press release or select different parameters.
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Scene Edit & Regenerate Modal */}
      {editModalOpen && editingSceneIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="gov-card max-w-lg w-full rounded-2xl p-6 border border-gov-saffron/40 shadow-2xl space-y-5 bg-gov-darkNavy">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gov-saffron/20 border border-gov-saffron/40 flex items-center justify-center text-gov-saffron">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Edit Scene {editingSceneIndex + 1}</h3>
                  <p className="text-[11px] text-slate-400">Modify sentence text or visual search keyword for this scene</p>
                </div>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Sentence Text Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Scene Text / Subtitle Line
                </label>
                <textarea
                  rows={3}
                  value={editedSentence}
                  onChange={(e) => setEditedSentence(e.target.value)}
                  className="w-full rounded-xl bg-gov-deep border border-slate-700 focus:border-gov-saffron focus:ring-2 focus:ring-gov-saffron/20 text-white px-3.5 py-2.5 text-xs leading-relaxed transition-all"
                  placeholder="Enter scene subtitle text..."
                />
              </div>

              {/* Keyword Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Visual Keyword (Stock Image Search)
                </label>
                <input
                  type="text"
                  value={editedKeyword}
                  onChange={(e) => setEditedKeyword(e.target.value)}
                  className="w-full rounded-xl bg-gov-deep border border-slate-700 focus:border-gov-saffron focus:ring-2 focus:ring-gov-saffron/20 text-white px-3.5 py-2.5 text-xs transition-all font-mono"
                  placeholder="e.g. India solar energy, Prime Minister speech"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Changing the keyword fetches a fresh visual asset for this scene.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleRegenerateConfirm}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-gov-saffron via-amber-500 to-amber-600 text-slate-950 text-xs font-bold hover:brightness-110 shadow-lg flex items-center justify-center space-x-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate Scene</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
