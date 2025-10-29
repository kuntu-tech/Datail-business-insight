"use client";
import React from 'react';
import { InfoIcon } from 'lucide-react';
interface AnalysisCardProps {
  analysis: {
    id: string;
    dimensionName: string;
    score: number;
    summary: string;
    tags: string[];
  };
  onClick: () => void;
}
export function AnalysisCard({
  analysis,
  onClick
}: AnalysisCardProps) {
  const {
    dimensionName,
    score,
    summary,
    tags,
    id
  } = analysis;
  // Calculate circle progress
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - score / 10 * circumference;
  // Determine color based on score
  const getScoreColor = (score: number) => {
    // All four cards use unified green brand color
    if (id === 'D1' || id === 'D2' || id === 'D3' || id === 'D4') return '#4D7327';
    if (score >= 8.5) return '#8F56BE';
    if (score >= 7.0) return '#8F56BE';
    return '#c57d56';
  };
  const getStrokeColor = (score: number) => {
    // All four cards use unified green brand color
    if (id === 'D1' || id === 'D2' || id === 'D3' || id === 'D4') return '#4D7327';
    if (score >= 9.0) return '#8F56BE';
    if (score >= 8.5) return '#8F56BE';
    if (score >= 7.0) return '#8F56BE';
    return '#c57d56';
  };
  // Get label based on card ID
  const getLabel = (id: string) => {
    switch (id) {
      case 'D1':
        return 'Huge Potential';
      case 'D2':
        return 'Clear Profile';
      case 'D3':
        return 'Strong Moat';
      case 'D4':
        return 'Low Retention';
      default:
        return '';
    }
  };
  // Function to highlight specific numbers with larger font
  const formatSummary = (text: string) => {
    return text.replace(/\$2\.4B/g, '<span class="text-3xl font-bold">$2.4B</span>').replace(/23%/g, '<span class="text-3xl font-bold">23%</span>').replace(/5\.2x/g, '<span class="text-5xl font-bold">5.2x</span>');
  };
  return <article onClick={onClick} onKeyDown={e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }} tabIndex={0} role="button" aria-label={`${dimensionName}, score ${score} out of 10. Click for details.`} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
      {/* Dimension Name - Moved to top */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-semibold text-gray-600">
          {dimensionName}
        </h2>
        <InfoIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" aria-label="View details" />
      </div>
      {/* Circular Progress Score with Label */}
      <div className="flex items-center justify-start gap-6 mb-6">
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90" aria-hidden="true">
            {/* Background circle */}
            <circle cx="48" cy="48" r="45" stroke="#e5e7eb" strokeWidth="6" fill="none" />
            {/* Progress circle */}
            <circle cx="48" cy="48" r="45" stroke={getStrokeColor(score)} strokeWidth="6" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-baseline gap-0.5">
              <span className="text-4xl font-semibold" style={{
              color: getScoreColor(score)
            }} aria-hidden="true">
                {score}
              </span>
            </div>
          </div>
        </div>
        <div className="text-2xl font-semibold" style={{
        color: getScoreColor(score)
      }}>
          {getLabel(id)}
        </div>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
            {tag}
          </span>)}
      </div>
      {/* Summary */}
      <p className="text-gray-600 leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{
      __html: formatSummary(summary)
    }} />
    </article>;
}