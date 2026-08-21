import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Languages, 
  Film, 
  Layers, 
  Volume2, 
  CheckCircle, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Image as ImageIcon
} from 'lucide-react';

const SAMPLE_PRESS_RELEASE = 
  "The Government of India has launched a new public welfare initiative to promote digital literacy across the country. " +
  "The program aims to provide free digital skills training to students, senior citizens, and communities in rural and urban areas. " +
  "Through this initiative, citizens will learn essential skills such as using online government services, digital payments, cybersecurity awareness, and accessing educational resources. " +
  "The initiative will be implemented in phases across different states, with special focus on underserved communities. " +
  "The Government encourages citizens to participate and make full use of the available digital learning resources.";

const LANGUAGES = [
  { code: 'hi', name: 'Hindi (हिन्दी)', active: true, tag: 'Active' },
  { code: 'en', name: 'English', active: true, tag: 'Active' },
  { code: 'mr', name: 'Marathi (मराठी)', active: true, tag: 'Active' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)', active: true, tag: 'Active' },
  { code: 'bn', name: 'Bengali (বাংলা)', active: true, tag: 'Active' },
  { code: 'ta', name: 'Tamil (தமிழ்)', active: true, tag: 'Active' },
  { code: 'te', name: 'Telugu (తెలుగు)', active: true, tag: 'Active' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', active: true, tag: 'Active' },
  { code: 'ml', name: 'Malayalam (മലയാളം)', active: true, tag: 'Active' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', active: true, tag: 'Active' },
  { code: 'ur', name: 'Urdu (اردو)', active: true, tag: 'Active' },
  { code: 'or', name: 'Odia (ଓଡ଼ିଆ)', active: true, tag: 'Active' },
  { code: 'as', name: 'Assamese (অসমীয়া)', active: true, tag: 'Active' },
  { code: 'ne', name: 'Nepali (नेपाली)', active: true, tag: 'Active' }
];

export default function CreatorPage({ onGenerate, isGenerating, onOpenLanguageModal, backendStatus }) {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [avatarEnabled, setAvatarEnabled] = useState(false);

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const handleLoadSample = () => {
    setInputText(SAMPLE_PRESS_RELEASE);
  };

  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    setSelectedLanguage(langCode);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      text: inputText,
      language: selectedLanguage,
      avatarEnabled: avatarEnabled,
      avatarId: avatarEnabled ? 'pib_anchor_official' : null,
      avatarStyle: 'official_officer',
      avatarPosition: 'bottom_right'
    };
    console.log("AVATAR PAYLOAD (CreatorPage):", payload);
    onGenerate(payload);
  };



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Portal Hero Heading */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gov-saffron/15 border border-gov-saffron/30 text-gov-saffron text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Automated Cross-Lingual Media AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          PIB Press Release to Video Generation Portal
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Convert official Government Press Releases into localized short videos with synchronized voiceover, automated translation, and media overlay for public broadcast.
        </p>
      </div>

      {/* Main Input Form Card */}
      <div className="gov-card rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green"></div>

        <div className="flex items-center justify-between pb-5 border-b border-slate-700/70 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gov-navy border border-gov-saffron/40 text-gov-saffron">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">PIB Press Release Input</h2>
              <p className="text-xs text-slate-400">Official statement or public welfare scheme announcement</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLoadSample}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-gov-saffron border border-gov-saffron/30 hover:border-gov-saffron transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Sample Press Release</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Text Area */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="pressReleaseText" className="text-sm font-semibold text-slate-200">
                Press Release Text / Announcement <span className="text-gov-saffron">*</span>
              </label>
              <div className="text-xs text-slate-400 font-mono space-x-3">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{charCount} characters</span>
              </div>
            </div>

            <textarea
              id="pressReleaseText"
              rows={7}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste official Government Press Release text here (e.g. welfare schemes, digital literacy, infrastructure updates)..."
              className="w-full rounded-xl bg-gov-deep/90 border border-slate-700 focus:border-gov-saffron focus:ring-2 focus:ring-gov-saffron/20 text-white placeholder-slate-500 p-4 text-sm leading-relaxed transition-all resize-y font-sans"
            />
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            {/* Language Selector */}
            <div>
              <label htmlFor="languageSelect" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Broadcast Language
              </label>
              <div className="relative">
                <select
                  id="languageSelect"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="w-full rounded-xl bg-gov-deep border border-slate-700 focus:border-gov-saffron focus:ring-2 focus:ring-gov-saffron/20 text-white px-4 py-3 text-sm appearance-none cursor-pointer transition-all"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Languages className="w-4 h-4" />
                </div>
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                {selectedLanguage === 'en'
                  ? '✓ English: Direct Narration & Subtitles'
                  : `✓ ${LANGUAGES.find(l => l.code === selectedLanguage)?.name || selectedLanguage}: Live Translation, Voiceover & Subtitles`}
              </p>
            </div>


            {/* AI Avatar Presenter Option */}
            <div>
              <label htmlFor="avatarSelect" className="block text-xs font-semibold text-slate-300 mb-1.5">
                AI Avatar Presenter (Optional)
              </label>
              <div className="relative">
                <select
                  id="avatarSelect"
                  value={avatarEnabled ? 'official' : 'off'}
                  onChange={(e) => setAvatarEnabled(e.target.value === 'official')}
                  className="w-full rounded-xl bg-gov-deep border border-slate-700 focus:border-gov-saffron focus:ring-2 focus:ring-gov-saffron/20 text-white px-4 py-3 text-sm appearance-none cursor-pointer transition-all"
                >
                  <option value="off" className="bg-slate-900 text-white">Off (Voiceover Only)</option>
                  <option value="official" className="bg-slate-900 text-white">Official PIB Presenter (AI Anchor)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Zap className="w-4 h-4 text-gov-saffron" />
                </div>
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                {avatarEnabled ? '★ Official PIB AI Anchor Synchronized' : '○ Voiceover Narration Only'}
              </p>
            </div>


            {/* Action Button */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                disabled={isGenerating || !inputText.trim()}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center space-x-2 ${
                  isGenerating || !inputText.trim()
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gov-saffron via-amber-500 to-amber-600 text-slate-950 hover:brightness-110 hover:shadow-gov-saffron/20 active:scale-[0.99]'
                }`}
              >
                <Film className="w-5 h-5" />
                <span>{isGenerating ? 'Synthesizing Video...' : 'Generate Broadcast Video'}</span>
              </button>
            </div>

          </div>

        </form>
      </div>

      {/* Workflow Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="gov-card rounded-xl p-4 border border-gov-cardBorder">
          <div className="p-2 w-fit rounded-lg bg-sky-500/15 text-sky-400 mb-3">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">1. NLP Scene Split</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Segments press releases into 3–4 coherent scenes and translates to Hindi.
          </p>
        </div>

        <div className="gov-card rounded-xl p-4 border border-gov-cardBorder">
          <div className="p-2 w-fit rounded-lg bg-gov-saffron/15 text-gov-saffron mb-3">
            <Volume2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">2. Neural Voiceover</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Synthesizes official speech via gTTS in Hindi or English.
          </p>
        </div>

        <div className="gov-card rounded-xl p-4 border border-gov-cardBorder">
          <div className="p-2 w-fit rounded-lg bg-emerald-500/15 text-emerald-400 mb-3">
            <ImageIcon className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">3. Visual Stock Matching</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pexels API media integration with curated offline Asset Pool fallback.
          </p>
        </div>

        <div className="gov-card rounded-xl p-4 border border-gov-cardBorder">
          <div className="p-2 w-fit rounded-lg bg-purple-500/15 text-purple-400 mb-3">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">4. Officer Approval</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Preview HD MP4, verify metadata, and approve for mock broadcast.
          </p>
        </div>

      </div>

    </div>
  );
}
