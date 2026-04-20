import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';

const AI_PROVIDERS = {
  chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600 hover:bg-green-700' },
  claude: { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-600 hover:bg-orange-700' },
  gemini: { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-600 hover:bg-blue-700' }
};

const FULL_RESUME_PROMPTS = {
  'Engineering/STEM': (resume) => `I'm an engineering/STEM student. Please review my entire resume for ATS optimization and effectiveness:

${resume}

Please provide feedback on:

1. **ATS Compatibility**: Are there any formatting issues that would prevent ATS from reading this correctly?

2. **Technical Skills Section**: 
   - Are the technical skills specific enough (e.g., "Python" vs "Python (NumPy, Pandas)")?
   - Are the most relevant skills listed first?

3. **Experience & Project Bullets**:
   - Do they quantify results with numbers/metrics?
   - Do they include specific technologies and tools used?
   - Do they follow the STAR method (Situation, Task, Action, Result)?
   - Are technical action verbs used (Designed, Implemented, Optimized, Analyzed)?

4. **Grammar, Punctuation & Clarity**:
   - Check for typos, grammatical errors, and punctuation mistakes
   - Flag any awkward phrasing or unclear statements
   - Ensure consistency in formatting (dates, bullet styles, etc.)

5. **Overall Structure**:
   - Is the most relevant experience emphasized?
   - Are accomplishments highlighted rather than just responsibilities?
   - Is it concise (ideally 1 page for students)?

Please be specific about what to change and why. Remember: I want honest feedback that keeps my authentic experience while presenting it professionally.`,

  'Business': (resume) => `I'm a business student. Please review my entire resume for ATS optimization and effectiveness:

${resume}

Please provide feedback on:

1. **ATS Compatibility**: Are there any formatting issues that would prevent ATS from reading this correctly?

2. **Skills Section**:
   - Are business and analytical skills prominent?
   - Are metrics-focused skills highlighted (data analysis, Excel, etc.)?

3. **Experience & Activity Bullets**:
   - Do they quantify business impact (%, $, ROI, time saved)?
   - Do they demonstrate leadership, communication, and results?
   - Do they follow the STAR method (Situation, Task, Action, Result)?
   - Are business action verbs used (Led, Managed, Increased, Generated, Optimized)?

4. **Grammar, Punctuation & Clarity**:
   - Check for typos, grammatical errors, and punctuation mistakes
   - Flag any awkward phrasing or unclear statements
   - Ensure consistency in formatting (dates, bullet styles, etc.)

5. **Overall Impact**:
   - Does it show results-driven thinking?
   - Are accomplishments emphasized over responsibilities?
   - Is it professional and concise?

Please be specific about what to change and why. Remember: I want honest feedback that keeps my authentic experience while presenting it professionally.`,

  'Liberal Arts': (resume) => `I'm a liberal arts student. Please review my entire resume for ATS optimization and effectiveness:

${resume}

Please provide feedback on:

1. **ATS Compatibility**: Are there any formatting issues that would prevent ATS from reading this correctly?

2. **Skills Section**:
   - Are communication and analytical skills highlighted?
   - Are relevant tools/software mentioned (research tools, Adobe, etc.)?

3. **Experience, Projects & Activities**:
   - Do they show impact and outcomes?
   - Do they demonstrate research, writing, communication, and critical thinking skills?
   - Do they follow the STAR method (Situation, Task, Action, Result)?
   - Are strong action verbs used (Researched, Analyzed, Coordinated, Presented)?

4. **Grammar, Punctuation & Clarity**:
   - Check for typos, grammatical errors, and punctuation mistakes
   - Flag any awkward phrasing or unclear statements
   - Ensure consistency in formatting (dates, bullet styles, etc.)

5. **Overall Presentation**:
   - Are accomplishments and skills presented clearly?
   - Is academic/research work framed professionally?
   - Is it compelling and well-organized?

Please be specific about what to change and why. Remember: I want honest feedback that keeps my authentic experience while presenting it professionally.`
};

export const FullResumeAIReview = ({ resumeText, major }) => {
  const [copied, setCopied] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const prompt = FULL_RESUME_PROMPTS[major] ? FULL_RESUME_PROMPTS[major](resumeText) : FULL_RESUME_PROMPTS['Engineering/STEM'](resumeText);

  const copyAndOpen = (provider) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      window.open(AI_PROVIDERS[provider].url, '_blank');
      setSelectedProvider(provider);
    });
  };

  if (!resumeText || resumeText.trim().length < 50) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
        <MessageCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
        <h3 className="font-bold text-lg text-gray-900 mb-2">Resume Too Short for AI Review</h3>
        <p className="text-gray-700">
          Fill out more sections above (at least Contact, Education, and one Experience/Project) before getting AI feedback.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-2 shadow-xl">
      <div className="bg-white rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-purple-500 text-white p-4 rounded-full">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🤖 Get AI Feedback on Your Entire Resume</h2>
          <p className="text-gray-700">
            Get comprehensive feedback on ATS optimization, grammar, clarity, and professional presentation
          </p>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-lg text-purple-900 mb-3">What the AI will check:</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-800">
            <li>✅ ATS compatibility (formatting issues)</li>
            <li>✅ Grammar, spelling & punctuation</li>
            <li>✅ Action verb strength</li>
            <li>✅ Quantifiable results (numbers, %)</li>
            <li>✅ Clarity and conciseness</li>
            <li>✅ Professional presentation</li>
            <li>✅ Skills emphasis for your field</li>
            <li>✅ Overall structure and impact</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900 text-center">Choose Your AI Tool:</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
              <button
                key={key}
                onClick={() => copyAndOpen(key)}
                className={`${provider.color} text-white px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-lg transition-transform hover:scale-105`}
              >
                {provider.name}
                <ExternalLink className="w-5 h-5" />
              </button>
            ))}
          </div>

          {copied && (
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4 text-center">
              <Check className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="font-bold text-green-800">
                ✅ Prompt Copied! {AI_PROVIDERS[selectedProvider]?.name} opened in new tab
              </p>
              <p className="text-sm text-green-700 mt-1">
                Now paste (Ctrl+V or Cmd+V) in {AI_PROVIDERS[selectedProvider]?.name} and press Enter
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-sm text-blue-900 mb-2">📝 How it works:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1️⃣ Click an AI tool above (ChatGPT, Claude, or Gemini)</li>
              <li>2️⃣ Your resume + feedback instructions are copied automatically</li>
              <li>3️⃣ AI tool opens in a new tab</li>
              <li>4️⃣ Paste (Ctrl+V or Cmd+V) and press Enter</li>
              <li>5️⃣ Get detailed, major-specific feedback in ~30 seconds!</li>
            </ol>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
            <p className="text-sm text-yellow-900">
              <strong>⚠️ Important:</strong> AI gives suggestions, but YOU decide what to change. 
              Only use feedback that feels authentic to your actual experience. 
              Don't let AI rewrite your resume—use it to polish what YOU wrote!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};