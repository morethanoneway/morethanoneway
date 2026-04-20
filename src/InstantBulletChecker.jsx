import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

// Weak verbs to avoid
const WEAK_VERBS = {
  'helped': ['Led', 'Managed', 'Coordinated', 'Facilitated'],
  'helped with': ['Led', 'Managed', 'Coordinated', 'Facilitated'],
  'worked on': ['Developed', 'Built', 'Designed', 'Implemented', 'Created'],
  'was responsible for': ['Managed', 'Oversaw', 'Directed', 'Led'],
  'responsible for': ['Managed', 'Oversaw', 'Directed', 'Led'],
  'did': ['Completed', 'Executed', 'Performed', 'Conducted'],
  'made': ['Created', 'Developed', 'Built', 'Designed', 'Established'],
  'got': ['Achieved', 'Obtained', 'Secured', 'Earned'],
  'was in charge of': ['Managed', 'Led', 'Directed', 'Oversaw'],
  'duties included': ['Action verb + specific task', 'Led', 'Managed', 'Developed'],
  'handled': ['Managed', 'Processed', 'Resolved', 'Coordinated'],
  'assisted': ['Supported', 'Collaborated with', 'Contributed to', 'Partnered with'],
  'dealt with': ['Resolved', 'Managed', 'Handled', 'Addressed']
};

export const InstantBulletChecker = ({ text, major }) => {
  const [feedback, setFeedback] = useState({ type: null, messages: [] });

  useEffect(() => {
    if (!text || text.trim().length < 10) {
      setFeedback({ type: null, messages: [] });
      return;
    }

    const issues = [];
    const warnings = [];
    const successes = [];
    
    const lowerText = text.toLowerCase().trim();
    
    // Check 1: Weak verbs
    let hasWeakVerb = false;
    let weakVerbFound = null;
    Object.keys(WEAK_VERBS).forEach(weakVerb => {
      if (lowerText.includes(weakVerb.toLowerCase())) {
        hasWeakVerb = true;
        weakVerbFound = weakVerb;
      }
    });
    
    if (hasWeakVerb && weakVerbFound) {
      issues.push({
        icon: '❌',
        text: `Weak phrase: "${weakVerbFound}"`,
        suggestion: `Try: ${WEAK_VERBS[weakVerbFound].join(', ')}`
      });
    } else {
      const firstWord = lowerText.split(' ')[0];
      const strongVerbs = ['led', 'managed', 'developed', 'built', 'designed', 'analyzed', 'created', 'implemented', 'coordinated', 'presented', 'achieved', 'improved', 'increased', 'reduced'];
      if (strongVerbs.includes(firstWord)) {
        successes.push({ icon: '✓', text: 'Strong action verb' });
      }
    }
    
    // Check 2: Numbers/metrics
    const hasNumbers = /\d/.test(text);
    const hasPercentage = /%/.test(text);
    const hasDollar = /\$/.test(text);
    const hasMetrics = hasNumbers || hasPercentage || hasDollar;
    
    if (!hasMetrics) {
      issues.push({
        icon: '❌',
        text: 'No numbers or metrics found',
        suggestion: 'Add specific numbers: How many? What %? How much $ or time?'
      });
    } else {
      successes.push({ icon: '✓', text: 'Includes metrics' });
    }
    
    // Check 3: Length
    const charCount = text.length;
    if (charCount > 150) {
      warnings.push({
        icon: '⚠️',
        text: `Too long (${charCount} characters)`,
        suggestion: 'Aim for under 150 characters (about 2 lines when formatted)'
      });
    } else if (charCount > 120) {
      warnings.push({
        icon: '⚠️',
        text: `A bit long (${charCount} characters)`,
        suggestion: 'Consider trimming for better readability'
      });
    } else {
      successes.push({ icon: '✓', text: 'Good length' });
    }
    
    // Check 4: Starts with bullet character
    if (lowerText.startsWith('•') || lowerText.startsWith('-') || lowerText.startsWith('*')) {
      warnings.push({
        icon: '⚠️',
        text: 'Remove bullet character',
        suggestion: 'Start directly with action verb'
      });
    }
    
    // Check 5: Passive voice
    const passiveIndicators = ['was', 'were', 'been', 'being'];
    let hasPassiveVoice = false;
    passiveIndicators.forEach(indicator => {
      if (lowerText.includes(` ${indicator} `)) {
        hasPassiveVoice = true;
      }
    });
    
    if (hasPassiveVoice) {
      warnings.push({
        icon: '⚠️',
        text: 'Possible passive voice',
        suggestion: 'Use active voice for stronger impact'
      });
    }
    
    let feedbackType = 'success';
    if (issues.length > 0) {
      feedbackType = 'error';
    } else if (warnings.length > 0) {
      feedbackType = 'warning';
    }
    
    setFeedback({ type: feedbackType, issues, warnings, successes });
    
  }, [text, major]);

  if (!text || text.trim().length < 10) return null;

  const { type, issues = [], warnings = [], successes = [] } = feedback;
  if (!type) return null;

  return (
    <div className={`mt-2 rounded-lg border-2 p-3 ${
      type === 'success' ? 'bg-green-50 border-green-300' :
      type === 'warning' ? 'bg-yellow-50 border-yellow-300' :
      'bg-red-50 border-red-300'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        {type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
        {type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
        {type === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
        <h4 className={`font-bold text-sm ${
          type === 'success' ? 'text-green-800' :
          type === 'warning' ? 'text-yellow-800' :
          'text-red-800'
        }`}>
          {type === 'success' ? '✅ Strong bullet!' :
           type === 'warning' ? '⚠️ Could be stronger' :
           '❌ Needs improvement'}
        </h4>
      </div>

      {issues.length > 0 && (
        <div className="space-y-2 mb-2">
          {issues.map((issue, idx) => (
            <div key={idx} className="text-sm">
              <p className="text-red-800 font-semibold">{issue.icon} {issue.text}</p>
              <p className="text-red-700 text-xs ml-5">→ {issue.suggestion}</p>
            </div>
          ))}
        </div>
      )}

      {warnings.length > 0 && (
        <div className="space-y-2 mb-2">
          {warnings.map((warning, idx) => (
            <div key={idx} className="text-sm">
              <p className="text-yellow-800 font-semibold">{warning.icon} {warning.text}</p>
              {warning.suggestion && (
                <p className="text-yellow-700 text-xs ml-5">→ {warning.suggestion}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {successes.length > 0 && type === 'success' && (
        <div className="space-y-1">
          {successes.map((success, idx) => (
            <p key={idx} className="text-sm text-green-800">{success.icon} {success.text}</p>
          ))}
        </div>
      )}

      {type === 'success' && (
        <p className="text-xs text-green-700 mt-2 italic">
          Great job! This bullet is clear, specific, and impactful.
        </p>
      )}
    </div>
  );
};