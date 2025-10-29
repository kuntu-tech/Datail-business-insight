"use client";
import React from 'react';
import { InfoIcon } from 'lucide-react';
interface CompactAnalysisCardProps {
  analysis: {
    id: string;
    dimensionName: string;
    score: number;
  };
  onClick: () => void;
}
export function CompactAnalysisCard({
  analysis,
  onClick
}: CompactAnalysisCardProps) {
  const {
    dimensionName,
    score,
    id
  } = analysis;
  // Calculate circle progress
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - score / 10 * circumference;
  // Determine color based on score
  const getScoreColor = (score: number) => {
    // Compact mode uses unified green brand color
    return '#4D7327';
  };
  const getStrokeColor = (score: number) => {
    // Compact mode uses unified green brand color
    return '#4D7327';
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
  return <div onClick={onClick} onKeyDown={e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }} tabIndex={0} role="button" aria-label={`${dimensionName}, score ${score} out of 10. Click for details.`} className="bg-white rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-100">
      {/* Header with title and info icon */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 flex-1">
          {dimensionName}
        </h3>
        <InfoIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2" />
      </div>
      {/* Score and Label */}
      <div className="flex items-center gap-3">
        {/* Compact Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg className="w-12 h-12 transform -rotate-90" aria-hidden="true">
            {/* Background circle */}
            <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="3" fill="none" />
            {/* Progress circle */}
            <circle cx="24" cy="24" r="20" stroke={getStrokeColor(score)} strokeWidth="3" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold" style={{
            color: getScoreColor(score)
          }} aria-hidden="true">
              {score}
            </span>
          </div>
        </div>
        {/* Label */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold" style={{
          color: getScoreColor(score)
        }}>
            {getLabel(id)}
          </p>
        </div>
      </div>
    </div>;
}