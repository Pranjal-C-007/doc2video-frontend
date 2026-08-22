import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import LoadingOverlay from './components/LoadingOverlay';
import LanguageModal from './components/LanguageModal';
import CreatorPage from './pages/Creator/CreatorPage';
import OfficerDashboardPage from './pages/OfficerDashboard/OfficerDashboardPage';

// Automatically connect to local backend (http://localhost:5001) when running locally, or Railway when deployed on Vercel
const getApiUrl = () => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5001';
  }
  const raw = (import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'https://docs2video-backend-production.up.railway.app').trim();
  return raw.startsWith('http') ? raw.replace(/\/+$/, '') : `https://${raw.replace(/^\/+/, '').replace(/\/+$/, '')}`;
};

const API_URL = getApiUrl();


/**
 * Ensure a video/asset URL is served over HTTPS when the page itself is HTTPS.
 * Prevents Chrome Mixed Content errors.
 */
const ensureHttps = (url) => {
  if (!url) return url;
  if (window.location.protocol === 'https:') {
    return url.replace(/^http:\/\//i, 'https://');
  }
  return url;
};

export default function App() {
  const [currentView, setCurrentView] = useState('creator'); // 'creator' | 'officer-dashboard'
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'disconnected' | 'checking'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  
  // Toast state
  const [toast, setToast] = useState(null);

  // Language Notice Modal state
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [selectedNoticeLang, setSelectedNoticeLang] = useState('');
  const [onSelectSupportedCb, setOnSelectSupportedCb] = useState(null);

  const showToast = useCallback(({ type, title, message }) => {
    setToast({ type, title, message });
  }, []);

  // Check Backend Health on load and interval
  const checkBackendHealth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/health`, { timeout: 4000 });
      if (res.status === 200 && res.data?.status === 'ok') {
        setBackendStatus('connected');
      } else {
        setBackendStatus('disconnected');
      }
    } catch {
      setBackendStatus('disconnected');
    }
  }, []);

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 15000);
    return () => clearInterval(interval);
  }, [checkBackendHealth]);

  const handleOpenLanguageModal = (langName, onSelectSupported) => {
    setSelectedNoticeLang(langName);
    setOnSelectSupportedCb(() => onSelectSupported);
    setLangModalOpen(true);
  };

  const handleGenerate = async ({ text, language, avatarEnabled, avatarId, avatarStyle, avatarPosition }) => {
    if (!text || !text.trim()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please provide a valid Government Press Release text before generating video.'
      });
      return;
    }

    if (backendStatus === 'disconnected') {
      showToast({
        type: 'warning',
        title: 'Backend Disconnected',
        message: `Flask backend is not reachable at ${API_URL}. Please ensure the backend server is running.`
      });
    }

    setIsGenerating(true);

    const payload = {
      text: text.trim(),
      language: language || 'hi',
      avatar_enabled: Boolean(avatarEnabled),
      avatar_id: avatarId || (avatarEnabled ? 'pib_anchor_official' : null),
      avatar_style: avatarStyle || 'official_officer',
      avatar_position: avatarPosition || 'bottom_right'
    };

    console.log("AVATAR PAYLOAD:", payload);

    try {
      const response = await axios.post(`${API_URL}/generate`, payload, {
        timeout: 300000 // 5 minutes max for MoviePy synthesis
      });


      if (response.data && response.data.success) {
        // Ensure video_url is absolute and served over HTTPS
        const rawUrl = response.data.video_url || '';
        const resolvedVideoUrl = ensureHttps(
          rawUrl.startsWith('http') ? rawUrl : `${API_URL}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`
        );
        const finalData = { ...response.data, video_url: resolvedVideoUrl };

        setGeneratedVideo(finalData);
        setIsGenerating(false);
        setCurrentView('officer-dashboard');
        showToast({
          type: 'success',
          title: 'Video Synthesized',
          message: `Cross-lingual video successfully rendered (${response.data.scenes_count || 3} scenes). Ready for Officer Review.`
        });
      } else {
        throw new Error(response.data?.message || 'Video synthesis failed.');
      }
    } catch (err) {
      setIsGenerating(false);
      const errMsg = err.response?.data?.message || err.message || 'An unexpected error occurred during synthesis.';
      showToast({
        type: 'error',
        title: 'Synthesis Error',
        message: errMsg
      });
    }
  };

  const handleRegenerateScene = async ({ targetIndex, newSentence, newKeyword }) => {
    if (!generatedVideo || !generatedVideo.scenes) {
      throw new Error('No active video session available for scene regeneration.');
    }

    const payload = {
      scenes: generatedVideo.scenes,
      target_index: targetIndex,
      new_sentence: newSentence,
      new_keyword: newKeyword,
      language: generatedVideo.language || 'hi',
      avatar_enabled: Boolean(generatedVideo.avatar_enabled),
      avatar_id: generatedVideo.avatar_id || 'pib_anchor_official',
      avatar_style: generatedVideo.avatar_style || 'official_officer',
      avatar_position: generatedVideo.avatar_position || 'bottom_right'
    };

    const response = await axios.post(`${API_URL}/regenerate-scene`, payload, {
      timeout: 120000 // 2 minutes max for single scene MoviePy re-compositing
    });


    if (response.data && response.data.success) {
      const rawUrl = response.data.video_url || '';
      const resolvedVideoUrl = ensureHttps(
        rawUrl.startsWith('http') ? rawUrl : `${API_URL}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`
      );
      const finalData = { ...response.data, video_url: resolvedVideoUrl };

      setGeneratedVideo(finalData);
      showToast({
        type: 'success',
        title: 'Scene Regenerated',
        message: `Scene ${targetIndex + 1} successfully regenerated and video updated.`
      });
      return finalData;
    } else {
      throw new Error(response.data?.message || 'Scene regeneration failed.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Official Government Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        backendStatus={backendStatus}
        generatedVideo={generatedVideo}
        apiUrl={API_URL}
      />


      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'creator' ? (
          <CreatorPage
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            onOpenLanguageModal={handleOpenLanguageModal}
            backendStatus={backendStatus}
          />
        ) : (
          <OfficerDashboardPage
            videoData={generatedVideo}
            onBackToCreator={() => setCurrentView('creator')}
            onRegenerateScene={handleRegenerateScene}
            showToast={showToast}
          />
        )}
      </main>

      {/* Official Footer */}
      <Footer />

      {/* Multi-stage Progress Overlay */}
      <LoadingOverlay isGenerating={isGenerating} />

      {/* Regional Language Notice Modal */}
      <LanguageModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        selectedLangName={selectedNoticeLang}
        onSelectSupported={(code) => {
          if (onSelectSupportedCb) onSelectSupportedCb(code);
        }}
      />

      {/* Toast Notification Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
