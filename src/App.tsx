"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendIcon, PaperclipIcon, SparklesIcon, RotateCcwIcon, ChevronDownIcon, ArrowRightIcon } from 'lucide-react';
import { DetailModal } from './components/DetailModal';
import { ValueQuestionsSection } from './components/ValueQuestionsSection';
interface AnalysisData {
  id: string;
  dimensionName: string;
  score: number;
  summary: string;
  tags: string[];
  supportingIndicators?: string[];
  userPersona?: {
    role: string;
    companyType: string;
    painPoints: string[];
    goals: string[];
  };
  fullDetails: string;
}
type RefreshType = 'none' | 'domain' | 'segment' | 'question-list' | 'question' | 'add-segment' | 'merge-segments' | 'edit-d1' | 'edit-d2' | 'edit-d3' | 'edit-d4' | 'add-question' | 'edit-question' | 'delete-question';
export function App() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState('v12');
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);
  const [refreshType, setRefreshType] = useState<RefreshType>('none');
  const [refreshKey, setRefreshKey] = useState(0);
  const versions = ['v12', 'v11', 'v10', 'v9', 'v8'];
  const handleSend = () => {
    if (inputValue.trim()) {
      const lowerInput = inputValue.toLowerCase();
      const isVersionChange = lowerInput.includes('change segment');
      // Determine refresh type based on keywords (check in priority order)
      let detectedRefreshType: RefreshType = 'none';
      if (lowerInput.includes('add segment')) {
        detectedRefreshType = 'add-segment';
      } else if (lowerInput.includes('merge segments')) {
        detectedRefreshType = 'merge-segments';
      } else if (lowerInput.includes('edit d1')) {
        detectedRefreshType = 'edit-d1';
      } else if (lowerInput.includes('edit d2')) {
        detectedRefreshType = 'edit-d2';
      } else if (lowerInput.includes('edit d3')) {
        detectedRefreshType = 'edit-d3';
      } else if (lowerInput.includes('edit d4')) {
        detectedRefreshType = 'edit-d4';
      } else if (lowerInput.includes('add question')) {
        detectedRefreshType = 'add-question';
      } else if (lowerInput.includes('delete question')) {
        detectedRefreshType = 'delete-question';
      } else if (lowerInput.includes('edit question')) {
        detectedRefreshType = 'edit-question';
      } else if (lowerInput.includes('domain')) {
        detectedRefreshType = 'domain';
      } else if (lowerInput.includes('segment')) {
        detectedRefreshType = 'segment';
      } else if (lowerInput.includes('question list')) {
        detectedRefreshType = 'question-list';
      } else if (lowerInput.includes('question')) {
        detectedRefreshType = 'question';
      }
      setRefreshType(detectedRefreshType);
      setIsGenerating(true);
      setGenerationProgress(0);
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      setTimeout(() => {
        clearInterval(interval);
        setGenerationProgress(100);
        setTimeout(() => {
          // For version change, keep loading and switch version
          if (isVersionChange) {
            const currentVersionNumber = parseInt(selectedVersion.replace('v', ''));
            const nextVersion = `v${currentVersionNumber + 1}`;
            setSelectedVersion(nextVersion);
            // Slow smooth scroll to top
            const scrollToTop = () => {
              const currentPosition = window.pageYOffset;
              if (currentPosition > 0) {
                window.scrollTo(0, currentPosition - currentPosition / 15);
                requestAnimationFrame(scrollToTop);
              }
            };
            scrollToTop();
            // Keep loading for version change animation
            setTimeout(() => {
              setIsGenerating(false);
              setInputValue('');
              setGenerationProgress(0);
              setRefreshType('none');
            }, 1000);
          } else {
            // For other refresh types, proceed normally
            setIsGenerating(false);
            setInputValue('');
            setGenerationProgress(0);
            setRefreshType('none');
            setRefreshKey(prev => prev + 1);
          }
        }, 500);
      }, 3000);
    }
  };
  const handleGenerateApp = () => {
    console.log('Generating ChatApp');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return <div className="w-full min-h-screen bg-white pb-32">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-900">Business Insight</h1>
          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Version Selector */}
            <div className="relative">
              <button onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RotateCcwIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {selectedVersion}
                </span>
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
              </button>
              {/* Dropdown Menu */}
              {isVersionDropdownOpen && <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {versions.map(version => <button key={version} onClick={() => {
                setSelectedVersion(version);
                setIsVersionDropdownOpen(false);
              }} className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${version === selectedVersion ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-700'}`}>
                      {version}
                    </button>)}
                </div>}
            </div>
            {/* Generate ChatApp Button */}
            <button onClick={handleGenerateApp} disabled={isGenerating} className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-black rounded-lg font-medium text-white transition-all duration-200 hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-black disabled:hover:text-white">
              <ArrowRightIcon className="w-4 h-4" />
              <span className="whitespace-nowrap">Generate</span>
            </button>
          </div>
        </div>
        {/* ValueQuestionsSection with version-based animation */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedVersion} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}>
            <ValueQuestionsSection onAnalysisClick={setSelectedAnalysis} isGenerating={isGenerating} generationProgress={generationProgress} refreshType={refreshType} refreshKey={refreshKey} />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Bottom Input Box */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-6 px-8 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-300 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
            <div className="flex items-end gap-3 p-4">
              {/* Text Input */}
              <textarea value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} disabled={isGenerating} placeholder="Edit D2 Persona to xxx" rows={1} className="flex-1 resize-none bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-base py-2 max-h-48 overflow-y-auto disabled:opacity-50" style={{
              minHeight: '24px'
            }} />
              {/* Send Button */}
              <button type="button" onClick={handleSend} disabled={!inputValue.trim() || isGenerating} className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${inputValue.trim() && !isGenerating ? 'text-black hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`} aria-label="Send message">
                <SendIcon className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedAnalysis && <DetailModal analysis={selectedAnalysis} onClose={() => setSelectedAnalysis(null)} />}
    </div>;
}