import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

const AI_PROVIDERS = {
  chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600 hover:bg-green-700' },
  claude: { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-600 hover:bg-orange-700' },
  gemini: { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-600 hover:bg-blue-700' }
};

const BULLET_PROMPTS = {
  'Engineering/STEM': (bullet) => `I'm an engineering/STEM student creating a resume. Review this bullet point:

"${bullet}"

Please check:
1. Does it use strong technical action verbs (Designed, Analyzed, Implemented, Optimized)?
2. Does it include specific numbers, metrics, or quantifiable results?
3. Does it mention specific tools, technologies, or methodologies?
4. Is it clear what I DID and what the IMPACT was?
5. Check grammar, punctuation, and clarity
6. Is it concise (under 2 lines when formatted)?

Suggest improvements while keeping it honest and authentic to my actual experience.`,

  'Business': (bullet) => `I'm a business student creating a resume. Review this bullet point:

"${bullet}"

Please check:
1. Does it use strong action verbs (Led, Managed, Increased, Generated, Analyzed)?
2. Does it include specific metrics (%, $, time saved, ROI)?
3. Does it show business impact or results?
4. Does it demonstrate skills like leadership, communication, or data analysis?
5. Check grammar, punctuation, and clarity
6. Is it concise and professional?

Suggest improvements while keeping it honest and authentic to my actual experience.`,

  'Liberal Arts': (bullet) => `I'm a liberal arts student creating a resume. Review this bullet point:

"${bullet}"

Please check:
1. Does it use strong action verbs (Researched, Analyzed, Wrote, Presented, Coordinated)?
2. Does it include specific outcomes or achievements?
3. Does it demonstrate skills like research, communication, writing, or critical thinking?
4. Is the impact or result clear?
5. Check grammar, punctuation, and clarity
6. Is it concise and compelling?

Suggest improvements while keeping it honest and authentic to my actual experience.`
};

export const BulletAIHelper = ({ bullet, major }) => {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  if (!bullet || bullet.trim().length < 10) return null;

  const prompt = BULLET_PROMPTS[major] ? BULLET_PROMPTS[major](bullet) : BULLET_PROMPTS['Engineering/STEM'](bullet);

  const copyAndOpen = (provider) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.open(AI_PROVIDERS[provider].url, '_blank');
      setShowOptions(false);
    });
  };

  return (
    <div className="mt-2 bg-purple-50 border border-purple-200 rounded-lg p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
          <p className="text-xs text-purple-800 font-semibold">Get AI feedback on this bullet</p>
        </div>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="text-purple-600 hover:text-purple-800 text-xs font-semibold flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copied!
            </>
          ) : (
            <>
              Choose AI <ExternalLink className="w-3 h-3" />
            </>
          )}
        </button>
      </div>

      {showOptions && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
            <button
              key={key}
              onClick={() => copyAndOpen(key)}
              className={`${provider.color} text-white px-3 py-2 rounded text-xs font-semibold flex items-center justify-center gap-1`}
            >
              {provider.name}
              <ExternalLink className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-600 mt-2 italic">
        Click button → Copies prompt → Opens AI → Paste & get suggestions
      </p>
    </div>
  );
};