"use client";
import React, { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';
interface DetailModalProps {
  analysis: {
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
  };
  onClose: () => void;
}
export function DetailModal({
  analysis,
  onClose
}: DetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Focus trap and keyboard handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    // Focus the close button when modal opens
    closeButtonRef.current?.focus();
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);
  const getScoreColor = (score: number) => {
    if (score >= 8.5) return '#8F56BE';
    if (score >= 7.0) return '#8F56BE';
    return '#c57d56';
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={modalRef} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-semibold" style={{
            color: getScoreColor(analysis.score)
          }} aria-label={`Score: ${analysis.score} out of 10`}>
              {analysis.score}
            </span>
            <h2 id="modal-title" className="text-2xl font-semibold text-gray-900">
              {analysis.dimensionName}
            </h2>
          </div>
          <button ref={closeButtonRef} onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Close modal">
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        {/* Content */}
        <div className="px-8 py-6 space-y-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {analysis.tags.map((tag, index) => <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
                {tag}
              </span>)}
          </div>
          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
          </div>
          {/* Full Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Detailed Analysis
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {analysis.fullDetails}
            </p>
          </div>
          {/* Supporting Indicators */}
          {analysis.supportingIndicators && <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Key Indicators
              </h3>
              <ul className="space-y-2">
                {analysis.supportingIndicators.map((indicator, index) => <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1.5" style={{
                color: '#8F56BE'
              }}>
                      •
                    </span>
                    <span>{indicator}</span>
                  </li>)}
              </ul>
            </div>}
          {/* User Persona */}
          {analysis.userPersona && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Target Role
                </h3>
                <p className="text-gray-700">{analysis.userPersona.role}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Company Type
                </h3>
                <p className="text-gray-700">
                  {analysis.userPersona.companyType}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Pain Points
                </h3>
                <ul className="space-y-2">
                  {analysis.userPersona.painPoints.map((point, index) => <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-red-600 mt-1.5">•</span>
                      <span>{point}</span>
                    </li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Goals
                </h3>
                <ul className="space-y-2">
                  {analysis.userPersona.goals.map((goal, index) => <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-green-600 mt-1.5">•</span>
                      <span>{goal}</span>
                    </li>)}
                </ul>
              </div>
            </div>}
        </div>
      </div>
    </div>;
}