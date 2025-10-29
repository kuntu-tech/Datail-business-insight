"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';
import { QuestionAccordion } from './QuestionAccordion';
import { AnalysisCard } from './AnalysisCard';
import { CompactAnalysisCard } from './CompactAnalysisCard';
interface Question {
  id: string;
  text: string;
  tags: string[];
  status: 'success' | 'warning' | 'error' | 'info';
}
interface Segment {
  id: string;
  name: string;
  subtitle: string;
  questions: Question[];
}
const segments: Segment[] = [{
  id: 'luxury-fashion',
  name: 'Luxury Fashion Sellers EU',
  subtitle: 'B2C Online Retailers',
  questions: [{
    id: 'q1',
    text: 'What is the average customer lifetime value by acquisition channel?',
    tags: ['Optimize marketing spend', 'Metric by dimension'],
    status: 'success'
  }, {
    id: 'q2',
    text: 'Which product categories have the highest return rates and why?',
    tags: ['Reduce operational costs', 'Ranked list with reasons'],
    status: 'warning'
  }, {
    id: 'q3',
    text: 'How does weather patterns correlate with luxury fashion purchases?',
    tags: ['Improve demand forecasting', 'Correlation analysis'],
    status: 'error'
  }, {
    id: 'q4',
    text: 'What percentage of VIP customers engage with personalized recommendations?',
    tags: ['Enhance personalization', 'Percentage with trend'],
    status: 'success'
  }, {
    id: 'q5',
    text: 'How do customer preferences vary across EU regions?',
    tags: ['Regional customization', 'Comparative analysis'],
    status: 'info'
  }, {
    id: 'q6',
    text: 'What is the optimal inventory level for seasonal collections?',
    tags: ['Inventory optimization', 'Predictive analysis'],
    status: 'success'
  }, {
    id: 'q7',
    text: 'Which customer segments show the highest conversion rates for new arrivals?',
    tags: ['Segment analysis', 'Conversion optimization'],
    status: 'info'
  }, {
    id: 'q8',
    text: 'How do shipping costs impact purchase decisions across different price points?',
    tags: ['Pricing strategy', 'Cost analysis'],
    status: 'warning'
  }, {
    id: 'q9',
    text: 'What is the relationship between social media engagement and sales?',
    tags: ['Marketing effectiveness', 'Social commerce'],
    status: 'success'
  }, {
    id: 'q10',
    text: 'Which loyalty program features drive the most repeat purchases?',
    tags: ['Customer retention', 'Program optimization'],
    status: 'info'
  }]
}, {
  id: 'saas-startups',
  name: 'SaaS Startups North America',
  subtitle: 'B2B Software Companies',
  questions: [{
    id: 'q11',
    text: 'What is the average time to first value for new customers?',
    tags: ['Improve onboarding', 'Time metric'],
    status: 'success'
  }, {
    id: 'q12',
    text: 'Which features correlate most strongly with customer retention?',
    tags: ['Product development', 'Feature analysis'],
    status: 'warning'
  }]
}, {
  id: 'healthcare-providers',
  name: 'Healthcare Providers APAC',
  subtitle: 'Medical Services',
  questions: [{
    id: 'q13',
    text: 'What is the patient satisfaction score by service type?',
    tags: ['Quality improvement', 'Satisfaction metrics'],
    status: 'success'
  }, {
    id: 'q14',
    text: 'How do appointment no-show rates vary by demographics?',
    tags: ['Operational efficiency', 'Demographic analysis'],
    status: 'info'
  }]
}];
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
const analysisData: AnalysisData[] = [{
  id: 'D1',
  dimensionName: 'Market Opportunity',
  score: 8.7,
  summary: 'Strong market demand with growing TAM of $2.4B. High customer acquisition potential in enterprise segment.',
  tags: ['High Growth', 'Enterprise Focus', 'B2B'],
  supportingIndicators: ['TAM growing at 23% CAGR', '67% of target customers actively seeking solutions', 'Low market saturation in key verticals'],
  fullDetails: 'Comprehensive market analysis shows exceptional opportunity. The total addressable market is expanding rapidly driven by digital transformation initiatives across Fortune 500 companies. Early adopter feedback indicates strong product-market fit with enterprise customers willing to pay premium pricing for comprehensive solutions.'
}, {
  id: 'D2',
  dimensionName: 'Customer Persona',
  score: 9.2,
  summary: 'Well-defined target persona with clear pain points. Decision makers show high intent and budget availability.',
  tags: ['Decision Maker', 'High Budget', 'Tech-Forward'],
  userPersona: {
    role: 'VP of Operations / CTO',
    companyType: 'Mid-market to Enterprise (500-5000 employees)',
    painPoints: ['Manual processes causing inefficiency', 'Lack of real-time visibility into operations', 'Difficulty scaling existing systems', 'High operational costs'],
    goals: ['Reduce operational costs by 30%', 'Improve process efficiency', 'Enable data-driven decision making', 'Scale operations without proportional headcount increase']
  },
  fullDetails: 'Target customers are technology-forward leaders in mid-market to enterprise organizations. They have clear mandates to modernize operations and significant budgets allocated for digital transformation. Our solution directly addresses their top 3 pain points with measurable ROI within 6 months.'
}, {
  id: 'D3',
  dimensionName: 'Competitive Advantage',
  score: 7.8,
  summary: 'Differentiated positioning with proprietary technology. Strong moat through network effects and integrations.',
  tags: ['Proprietary Tech', 'Network Effects', 'Integration Ecosystem'],
  supportingIndicators: ['Patent-pending AI algorithms', '50+ pre-built integrations', 'Exclusive partnerships with key platforms', 'First-mover advantage in emerging category'],
  fullDetails: 'Our competitive advantage stems from three core pillars: proprietary AI technology that delivers 10x faster processing, an extensive integration ecosystem that creates switching costs, and strategic partnerships that provide exclusive market access. Competitors are 18-24 months behind in core technology capabilities.'
}, {
  id: 'D4',
  dimensionName: 'Revenue Potential',
  score: 8.5,
  summary: 'Strong unit economics with LTV/CAC ratio of 5.2x. Multiple expansion opportunities through upsell and cross-sell.',
  tags: ['High LTV', 'Expansion Revenue', 'Predictable'],
  supportingIndicators: ['Average ACV: $85K', 'Net Revenue Retention: 132%', 'Gross Margin: 78%', 'Payback Period: 11 months'],
  fullDetails: 'Financial modeling shows exceptional unit economics with strong margins and rapid payback. Current customers demonstrate 132% net revenue retention through natural expansion and upsell opportunities. The land-and-expand model allows for efficient customer acquisition with significant lifetime value growth. Three-year revenue projection shows path to $50M ARR with sustainable growth rates.'
}];
type RefreshType = 'none' | 'domain' | 'segment' | 'question-list' | 'question' | 'add-segment' | 'merge-segments' | 'edit-d1' | 'edit-d2' | 'edit-d3' | 'edit-d4' | 'add-question' | 'edit-question' | 'delete-question';
interface ValueQuestionsSectionProps {
  onAnalysisClick: (analysis: AnalysisData) => void;
  isGenerating: boolean;
  generationProgress: number;
  refreshType: RefreshType;
  refreshKey: number;
}
// Helper function to generate random question
const generateRandomQuestion = (): string => {
  const templates = ['How can we optimize {metric} across {dimension}?', 'What factors influence {outcome} in {context}?', 'Which {category} shows the highest {performance}?', 'What is the correlation between {variable1} and {variable2}?', 'How do {segment} customers respond to {initiative}?'];
  const metrics = ['revenue', 'engagement', 'conversion', 'retention', 'satisfaction'];
  const dimensions = ['channels', 'regions', 'segments', 'time periods', 'product lines'];
  const outcomes = ['customer behavior', 'sales performance', 'user adoption', 'market share'];
  const contexts = ['different markets', 'seasonal trends', 'competitive landscape', 'economic conditions'];
  const categories = ['features', 'campaigns', 'products', 'services', 'initiatives'];
  const performances = ['ROI', 'growth rate', 'adoption', 'efficiency', 'impact'];
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.replace('{metric}', metrics[Math.floor(Math.random() * metrics.length)]).replace('{dimension}', dimensions[Math.floor(Math.random() * dimensions.length)]).replace('{outcome}', outcomes[Math.floor(Math.random() * outcomes.length)]).replace('{context}', contexts[Math.floor(Math.random() * contexts.length)]).replace('{category}', categories[Math.floor(Math.random() * categories.length)]).replace('{performance}', performances[Math.floor(Math.random() * performances.length)]).replace('{variable1}', metrics[Math.floor(Math.random() * metrics.length)]).replace('{variable2}', metrics[Math.floor(Math.random() * metrics.length)]).replace('{segment}', ['VIP', 'new', 'enterprise', 'SMB', 'premium'][Math.floor(Math.random() * 5)]).replace('{initiative}', ['pricing changes', 'new features', 'marketing campaigns', 'loyalty programs'][Math.floor(Math.random() * 4)]);
};
// Helper function to generate a new segment
const generateNewSegment = (): Segment => {
  const segmentTypes = [{
    name: 'Tech Startups Asia',
    subtitle: 'B2B SaaS Companies'
  }, {
    name: 'E-commerce Brands US',
    subtitle: 'D2C Retailers'
  }, {
    name: 'Financial Services EMEA',
    subtitle: 'FinTech Companies'
  }, {
    name: 'Manufacturing Companies',
    subtitle: 'Industrial B2B'
  }];
  const randomType = segmentTypes[Math.floor(Math.random() * segmentTypes.length)];
  return {
    id: `segment-${Date.now()}`,
    name: randomType.name,
    subtitle: randomType.subtitle,
    questions: Array.from({
      length: 5
    }, (_, i) => ({
      id: `q-${Date.now()}-${i}`,
      text: generateRandomQuestion(),
      tags: ['New Question', 'Analysis'],
      status: 'info' as const
    }))
  };
};
export function ValueQuestionsSection({
  onAnalysisClick,
  isGenerating,
  generationProgress,
  refreshType,
  refreshKey
}: ValueQuestionsSectionProps) {
  const [activeTab, setActiveTab] = useState(segments[0].id);
  const [isCompact, setIsCompact] = useState(false);
  const [currentSegments, setCurrentSegments] = useState(segments);
  const [currentAnalysisData, setCurrentAnalysisData] = useState(analysisData);
  // Handle segment refresh - switch to second tab
  useEffect(() => {
    if (refreshType === 'segment' && !isGenerating) {
      setActiveTab(segments[1].id);
    }
  }, [refreshType, isGenerating]);
  // Handle content refresh based on refresh type
  useEffect(() => {
    if (refreshKey > 0 && !isGenerating) {
      // Add segment - insert new segment at the beginning
      if (refreshType === 'add-segment') {
        const newSegment = generateNewSegment();
        setCurrentSegments([newSegment, ...currentSegments]);
        setActiveTab(newSegment.id);
      }
      // Merge segments - remove the last segment
      else if (refreshType === 'merge-segments') {
        if (currentSegments.length > 1) {
          const updatedSegments = currentSegments.slice(0, -1);
          setCurrentSegments(updatedSegments);
          setActiveTab(updatedSegments[0].id);
        }
      }
      // Edit D1 - add new segment at beginning (same as add-segment)
      else if (refreshType === 'edit-d1') {
        const newSegment = generateNewSegment();
        setCurrentSegments([newSegment, ...currentSegments]);
        setActiveTab(newSegment.id);
      }
      // Edit D2, D3, D4 - update analysis data
      else if (refreshType === 'edit-d2' || refreshType === 'edit-d3' || refreshType === 'edit-d4') {
        const dimensionMap = {
          'edit-d2': 'D2',
          'edit-d3': 'D3',
          'edit-d4': 'D4'
        };
        const targetId = dimensionMap[refreshType];
        setCurrentAnalysisData(currentAnalysisData.map(analysis => {
          if (analysis.id === targetId) {
            return {
              ...analysis,
              score: Math.random() * 2 + 8,
              summary: `Updated analysis for ${analysis.dimensionName}. ${generateRandomQuestion()}`
            };
          }
          return analysis;
        }));
      }
      // Add question - add a new question to the active segment
      else if (refreshType === 'add-question') {
        setCurrentSegments(currentSegments.map(segment => {
          if (segment.id === activeTab) {
            return {
              ...segment,
              questions: [...segment.questions, {
                id: `q-${Date.now()}`,
                text: generateRandomQuestion(),
                tags: ['New Question', 'Analysis'],
                status: 'info' as const
              }]
            };
          }
          return segment;
        }));
      }
      // Edit question - update first question in active segment
      else if (refreshType === 'edit-question') {
        setCurrentSegments(currentSegments.map(segment => {
          if (segment.id === activeTab) {
            return {
              ...segment,
              questions: segment.questions.map((q, index) => index === 0 ? {
                ...q,
                text: generateRandomQuestion()
              } : q)
            };
          }
          return segment;
        }));
      }
      // Delete question - remove last question from active segment
      else if (refreshType === 'delete-question') {
        setCurrentSegments(currentSegments.map(segment => {
          if (segment.id === activeTab && segment.questions.length > 1) {
            return {
              ...segment,
              questions: segment.questions.slice(0, -1)
            };
          }
          return segment;
        }));
      }
      // Existing refresh types
      else {
        const updatedSegments = currentSegments.map((segment, segmentIndex) => {
          // For domain refresh, update all segments
          if (refreshType === 'domain') {
            return {
              ...segment,
              questions: segment.questions.map(q => ({
                ...q,
                text: generateRandomQuestion()
              }))
            };
          }
          // For segment refresh, only update second segment
          if (refreshType === 'segment' && segmentIndex === 1) {
            return {
              ...segment,
              questions: segment.questions.map(q => ({
                ...q,
                text: generateRandomQuestion()
              }))
            };
          }
          // For question-list refresh, update all questions in first segment
          if (refreshType === 'question-list' && segmentIndex === 0) {
            return {
              ...segment,
              questions: segment.questions.map(q => ({
                ...q,
                text: generateRandomQuestion()
              }))
            };
          }
          // For single question refresh, update first question in first segment
          if (refreshType === 'question' && segmentIndex === 0) {
            return {
              ...segment,
              questions: segment.questions.map((q, qIndex) => qIndex === 0 ? {
                ...q,
                text: generateRandomQuestion()
              } : q)
            };
          }
          return segment;
        });
        setCurrentSegments(updatedSegments);
      }
    }
  }, [refreshKey, refreshType, isGenerating, activeTab, currentSegments, currentAnalysisData]);
  const activeSegment = currentSegments.find(s => s.id === activeTab) || currentSegments[0];
  const handleGenerateApp = () => {
    console.log('Generating app for segment:', activeSegment.name);
  };
  const showFullOverlay = isGenerating && (refreshType === 'domain' || refreshType === 'none' || refreshType === 'add-segment' || refreshType === 'merge-segments' || refreshType === 'edit-d1');
  const showSegmentOverlay = isGenerating && refreshType === 'segment';
  const show4DAndQuestionsOverlay = isGenerating && (refreshType === 'edit-d2' || refreshType === 'edit-d3' || refreshType === 'edit-d4');
  const showQuestionListOverlay = isGenerating && (refreshType === 'question-list' || refreshType === 'add-question' || refreshType === 'edit-question' || refreshType === 'delete-question');
  const showSingleQuestionOverlay = isGenerating && refreshType === 'question';
  return <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">
      {/* Full Page Generation Loading Overlay */}
      <AnimatePresence>
        {showFullOverlay && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} transition={{
          duration: 0.3,
          ease: 'easeOut'
        }} className="text-center">
              <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }} className="inline-block mb-6">
                <SparklesIcon className="w-16 h-16" style={{
              color: '#8F56BE'
            }} />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {refreshType === 'add-segment' || refreshType === 'edit-d1' ? 'Adding New Segment' : refreshType === 'merge-segments' ? 'Merging Segments' : 'Generating New Version'}
              </h3>
              <p className="text-gray-600 mb-6">
                Creating your customized experience...
              </p>
              <div className="w-80 mx-auto">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div initial={{
                width: '0%'
              }} animate={{
                width: `${generationProgress}%`
              }} transition={{
                duration: 0.3,
                ease: 'easeOut'
              }} className="h-full rounded-full" style={{
                backgroundColor: '#8F56BE'
              }} />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round(generationProgress)}%
                </p>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {currentSegments.map(segment => <button key={segment.id} onClick={() => setActiveTab(segment.id)} disabled={isGenerating} style={activeTab === segment.id ? {
          backgroundColor: '#000000'
        } : {}} className={`flex-1 px-6 py-4 font-medium transition-all duration-300 ${activeTab === segment.id ? 'text-white text-2xl scale-105 shadow-lg' : 'bg-white text-gray-600 hover:text-gray-900 text-sm hover:bg-gray-100'} ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {segment.name}
            </button>)}
        </div>
      </div>
      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{
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
      }} className="p-8 relative">
          {/* Segment-level overlay */}
          <AnimatePresence>
            {showSegmentOverlay && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} transition={{
            duration: 0.3
          }} className="absolute inset-0 z-40 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl">
                <motion.div initial={{
              scale: 0.9,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} exit={{
              scale: 0.9,
              opacity: 0
            }} transition={{
              duration: 0.3,
              ease: 'easeOut'
            }} className="text-center">
                  <motion.div animate={{
                rotate: 360
              }} transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }} className="inline-block mb-4">
                    <SparklesIcon className="w-12 h-12" style={{
                  color: '#8F56BE'
                }} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Refreshing Segment
                  </h3>
                  <p className="text-gray-600 text-sm">Updating content...</p>
                </motion.div>
              </motion.div>}
          </AnimatePresence>
          {/* 4D Market Analysis + Value Questions overlay */}
          <div className="relative">
            <AnimatePresence>
              {show4DAndQuestionsOverlay && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="absolute inset-0 z-40 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl" style={{
              minHeight: '500px'
            }}>
                  <motion.div initial={{
                scale: 0.9,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} exit={{
                scale: 0.9,
                opacity: 0
              }} transition={{
                duration: 0.3,
                ease: 'easeOut'
              }} className="text-center">
                    <motion.div animate={{
                  rotate: 360
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }} className="inline-block mb-4">
                      <SparklesIcon className="w-12 h-12" style={{
                    color: '#8F56BE'
                  }} />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Updating Analysis
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Refreshing{' '}
                      {refreshType === 'edit-d2' ? 'D2' : refreshType === 'edit-d3' ? 'D3' : 'D4'}{' '}
                      dimension...
                    </p>
                  </motion.div>
                </motion.div>}
            </AnimatePresence>
            {/* 4D Market Analysis Section */}
            <div className="mb-8" onMouseEnter={() => setIsCompact(false)}>
              <div>
                <AnimatePresence mode="wait">
                  {!isCompact && <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} exit={{
                  opacity: 0
                }} transition={{
                  duration: 0.3
                }} className="grid grid-cols-2 gap-6">
                      {currentAnalysisData.map((analysis, index) => <motion.div key={`${analysis.id}-${refreshKey}`} initial={{
                    opacity: 0,
                    scale: 0.95
                  }} animate={{
                    opacity: 1,
                    scale: 1
                  }} transition={{
                    duration: 0.3,
                    delay: index * 0.1
                  }}>
                          <AnalysisCard analysis={analysis} onClick={() => onAnalysisClick(analysis)} />
                        </motion.div>)}
                    </motion.div>}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  {isCompact && <motion.div initial={{
                  opacity: 0,
                  height: 0
                }} animate={{
                  opacity: 1,
                  height: 'auto'
                }} exit={{
                  opacity: 0,
                  height: 0
                }} transition={{
                  duration: 0.3
                }} className="grid grid-cols-4 gap-4">
                      {currentAnalysisData.map(analysis => <CompactAnalysisCard key={`${analysis.id}-${refreshKey}`} analysis={analysis} onClick={() => onAnalysisClick(analysis)} />)}
                    </motion.div>}
                </AnimatePresence>
              </div>
            </div>
            {/* Value Questions Section */}
            <div className="pt-2 relative" onMouseEnter={() => setIsCompact(true)}>
              {/* Question List overlay */}
              <AnimatePresence>
                {showQuestionListOverlay && <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} transition={{
                duration: 0.3
              }} className="absolute inset-0 z-30 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl">
                    <motion.div initial={{
                  scale: 0.9,
                  opacity: 0
                }} animate={{
                  scale: 1,
                  opacity: 1
                }} exit={{
                  scale: 0.9,
                  opacity: 0
                }} transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }} className="text-center">
                      <motion.div animate={{
                    rotate: 360
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }} className="inline-block mb-4">
                        <SparklesIcon className="w-12 h-12" style={{
                      color: '#8F56BE'
                    }} />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {refreshType === 'add-question' ? 'Adding Question' : refreshType === 'delete-question' ? 'Deleting Question' : refreshType === 'edit-question' ? 'Editing Question' : 'Refreshing Questions'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Updating question list...
                      </p>
                    </motion.div>
                  </motion.div>}
              </AnimatePresence>
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Value Questions
              </h2>
              <div className="space-y-1.5">
                {activeSegment.questions.map((question, index) => <motion.div key={`${question.id}-${refreshKey}`} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.3,
                delay: index * 0.05
              }} className="relative">
                    {/* Single question overlay - only on first question */}
                    {index === 0 && showSingleQuestionOverlay && <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} exit={{
                  opacity: 0
                }} transition={{
                  duration: 0.3
                }} className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl">
                        <motion.div animate={{
                    rotate: 360
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}>
                          <SparklesIcon className="w-8 h-8" style={{
                      color: '#8F56BE'
                    }} />
                        </motion.div>
                      </motion.div>}
                    <QuestionAccordion question={question} index={index + 1} />
                  </motion.div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>;
}