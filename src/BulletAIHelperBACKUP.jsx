import React, { useState } from 'react';
import { Check, ExternalLink, Sparkles, Flag, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

const AI_PROVIDERS = {
  chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600 hover:bg-green-700' },
  claude: { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-600 hover:bg-orange-700' },
  gemini: { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-600 hover:bg-blue-700' }
};

const RESUME_AI_FLAGS = [
  { phrase: 'responsible for', suggestion: 'Start with an action verb instead — "Led", "Built", "Managed"' },
  { phrase: 'helped with', suggestion: 'Be specific about YOUR contribution — what did YOU do?' },
  { phrase: 'worked on', suggestion: 'Too vague — say what you built, designed, or delivered' },
  { phrase: 'assisted with', suggestion: 'Say exactly what you did — "assisted" undersells you' },
  { phrase: 'participated in', suggestion: 'Say what you contributed specifically' },
  { phrase: 'was involved in', suggestion: 'Replace with a specific action verb' },
  { phrase: 'passionate about', suggestion: 'AI flag — remove from resume bullets entirely' },
  { phrase: 'leveraged', suggestion: 'Just say "used"' },
  { phrase: 'utilized', suggestion: 'Just say "used"' },
  { phrase: 'spearheaded', suggestion: 'Try "led" or "launched" instead' },
  { phrase: 'dynamic', suggestion: 'Meaningless word — delete it' },
  { phrase: 'results-driven', suggestion: 'Show the results instead of saying this' },
  { phrase: 'detail-oriented', suggestion: 'Show it with a specific example' },
  { phrase: 'team player', suggestion: 'Show collaboration with a specific example' },
  { phrase: 'synergy', suggestion: 'Delete this entirely' },
  { phrase: 'fostered', suggestion: 'Try "built" or "developed"' },
  { phrase: 'robust', suggestion: '"Robust" is an AI word — be specific instead' },
  { phrase: 'comprehensive', suggestion: 'Vague — say what it actually included' },
  { phrase: 'various', suggestion: 'List the specific things instead of saying "various"' },
  { phrase: 'etc', suggestion: 'End with the specific last item — "etc" looks lazy on a resume' },
  { phrase: ' — ', suggestion: 'Em dashes are an AI tell — use a comma or rewrite' },
];

const checkBulletFlags = (text) => {
  if (!text) return [];
  const lower = text.toLowerCase();
  return RESUME_AI_FLAGS.filter(flag => lower.includes(flag.phrase.toLowerCase()));
};

const getBulletWordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
};

const BULLET_PROMPTS = {
  'Engineering/STEM': (bullet) => `I am an engineering/STEM student creating a resume. Review this bullet point and help me improve it:

"${bullet}"

Check:
1. Does it start with a strong technical action verb (Designed, Built, Implemented, Optimized, Analyzed)?
2. Does it include specific numbers, metrics, or quantifiable results?
3. Does it mention specific tools, technologies, or methodologies?
4. Is it clear what I did AND what the impact was?
5. Is it concise (under 20 words ideally)?
6. Does it avoid weak phrases like "responsible for", "helped with", "worked on"?
7. Does it avoid AI words like "leveraged", "utilized", "spearheaded"?
8. Does it avoid em dashes?

Give me 2 improved versions that keep my authentic experience but present it more powerfully.`,

  'Business': (bullet) => `I am a business student creating a resume. Review this bullet point and help me improve it:

"${bullet}"

Check:
1. Does it start with a strong action verb (Led, Managed, Increased, Generated, Analyzed, Built)?
2. Does it include specific metrics (%, $, time saved, ROI, headcount)?
3. Does it show business impact or results?
4. Is it concise (under 20 words ideally)?
5. Does it avoid weak phrases like "responsible for", "helped with", "assisted with"?
6. Does it avoid AI words like "leveraged", "utilized", "spearheaded"?
7. Does it avoid em dashes?

Give me 2 improved versions that keep my authentic experience but present it more powerfully.`,

  'Liberal Arts': (bullet) => `I am a liberal arts student creating a resume. Review this bullet point and help me improve it:

"${bullet}"

Check:
1. Does it start with a strong action verb (Researched, Analyzed, Wrote, Presented, Led, Coordinated)?
2. Does it include specific outcomes or achievements?
3. Does it demonstrate research, writing, communication, or critical thinking skills?
4. Is the impact or result clear?
5. Is it concise (under 20 words ideally)?
6. Does it avoid weak phrases like "responsible for", "helped with", "participated in"?
7. Does it avoid AI words like "leveraged", "utilized"?
8. Does it avoid em dashes?

Give me 2 improved versions that keep my authentic experience but present it more powerfully.`
};

export const BulletAIHelper = ({ bullet, major }) => {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showFlags, setShowFlags] = useState(false);
  const [mode, setMode] = useState('feedback'); // 'feedback' or 'rewrite'

  if (!bullet || bullet.trim().length < 10) return null;

  const wordCount = getBulletWordCount(bullet);
  const flags = checkBulletFlags(bullet);
  const isLong = wordCount > 25;
  const hasFlags = flags.length > 0;

  const feedbackPrompt = BULLET_PROMPTS[major] ? BULLET_PROMPTS[major](bullet) : BULLET_PROMPTS['Engineering/STEM'](bullet);

  const rewritePrompt = `Rewrite this resume bullet point to be stronger, more specific, and more impactful. Keep it honest and authentic — do not fabricate metrics or skills.

Current bullet: "${bullet}"

Rules:
1. Start with a strong action verb
2. Include or suggest where to add a specific number/metric
3. Keep it under 20 words
4. Do NOT use em dashes
5. Do NOT use: "leveraged", "utilized", "spearheaded", "fostered", "robust", "dynamic"
6. Do NOT use weak phrases: "responsible for", "helped with", "worked on"

Give 2-3 improved versions with a brief note on what you changed.`;

  const copyAndOpen = (provider) => {
    const prompt = mode === 'rewrite' ? rewritePrompt : feedbackPrompt;
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.open(AI_PROVIDERS[provider].url, '_blank');
      setShowOptions(false);
    });
  };

  return (
    <div className="mt-2 space-y-1">

      {/* Word count warning */}
      {isLong && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
          <p className="text-xs text-orange-800">
            <strong>Word count: {wordCount}</strong> — Bullets over 25 words are too long. Cut to the key action + result.
          </p>
        </div>
      )}

      {/* AI flag warning */}
      {hasFlags && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Flag className="w-3 h-3 text-yellow-600" />
              <p className="text-xs text-yellow-800 font-semibold">
                {flags.length} AI/weak phrase{flags.length > 1 ? 's' : ''} detected
              </p>
            </div>
            <button onClick={() => setShowFlags(!showFlags)} className="text-yellow-700 text-xs flex items-center gap-1">
              {showFlags ? 'Hide' : 'Show'} {showFlags ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
          {showFlags && (
            <div className="mt-1 space-y-1">
              {flags.map((flag, i) => (
                <div key={i} className="text-xs">
                  <span className="font-bold text-yellow-800">"{flag.phrase.trim()}"</span>
                  <span className="text-gray-600"> — {flag.suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI helper */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <p className="text-xs text-purple-800 font-semibold">AI Bullet Helper</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => { setMode('feedback'); setShowOptions(!showOptions); }}
              className="text-purple-600 hover:text-purple-800 text-xs font-semibold flex items-center gap-1"
            >
              {copied && mode === 'feedback' ? <><Check className="w-3 h-3" /> Copied!</> : <>Feedback <ExternalLink className="w-3 h-3" /></>}
            </button>
            <span className="text-purple-300 text-xs">|</span>
            <button
              onClick={() => { setMode('rewrite'); setShowOptions(!showOptions); }}
              className="text-purple-600 hover:text-purple-800 text-xs font-semibold flex items-center gap-1"
            >
              {copied && mode === 'rewrite' ? <><Check className="w-3 h-3" /> Copied!</> : <><RefreshCw className="w-3 h-3" /> Rewrite</>}
            </button>
          </div>
        </div>

        {showOptions && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
              <button key={key} onClick={() => copyAndOpen(key)}
                className={`${provider.color} text-white px-3 py-2 rounded text-xs font-semibold flex items-center justify-center gap-1`}>
                {provider.name} <ExternalLink className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2 italic">
          {mode === 'rewrite' ? 'Rewrite: copies a prompt to make this bullet stronger' : 'Feedback: copies a prompt for detailed suggestions'}
        </p>
      </div>
    </div>
  );
};
