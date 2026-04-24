import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Check, ExternalLink, Sparkles, AlertCircle, ChevronDown, ChevronUp, Flag } from 'lucide-react';

const AI_PROVIDERS = {
  chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600 hover:bg-green-700' },
  claude: { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-600 hover:bg-orange-700' },
  gemini: { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-600 hover:bg-blue-700' }
};

const MAJORS = [
  'Engineering/STEM', 'Business', 'Liberal Arts', 'Health Sciences',
  'Education', 'Computer Science', 'Communications', 'Psychology', 'Biology/Pre-Med', 'Other'
];

const TONES = [
  { value: 'professional', label: 'Professional & Polished' },
  { value: 'confident', label: 'Confident & Direct' },
  { value: 'friendly', label: 'Friendly & Approachable' },
  { value: 'enthusiastic', label: 'Enthusiastic & Motivated' }
];

const AI_FLAGS = [
  { phrase: 'passionate about', suggestion: 'Replace with a specific moment that shows your passion' },
  { phrase: 'passionate', suggestion: 'Replace with a specific example that shows it, not tells it' },
  { phrase: 'hardworking', suggestion: 'Show it with a result — "completed X ahead of deadline"' },
  { phrase: 'team player', suggestion: 'Describe a specific time you collaborated on something real' },
  { phrase: 'detail-oriented', suggestion: 'Show it — "caught X error" or "reduced Y by Z%"' },
  { phrase: 'quick learner', suggestion: 'Replace with "learned X in Y weeks" or a specific example' },
  { phrase: 'results-driven', suggestion: 'Just show the results — skip this phrase entirely' },
  { phrase: 'dynamic', suggestion: 'This word means nothing — delete it' },
  { phrase: 'synergy', suggestion: 'Delete this — no one talks like this in real life' },
  { phrase: 'leveraged', suggestion: 'Just say "used" — "leveraged" sounds like AI wrote it' },
  { phrase: 'utilized', suggestion: 'Just say "used"' },
  { phrase: 'spearheaded', suggestion: 'Try "led" or "started" instead' },
  { phrase: 'fostered', suggestion: 'Try "built" or "developed" instead' },
  { phrase: 'i am writing to express', suggestion: 'Most overused AI opener — delete and start with something real' },
  { phrase: 'excited to apply', suggestion: 'Show excitement through specifics, not this phrase' },
  { phrase: 'i look forward to hearing from you', suggestion: 'End with something stronger and more confident' },
  { phrase: 'to whom it may concern', suggestion: 'Find a real name or use a specific title' },
  { phrase: 'i am a dedicated', suggestion: 'Show dedication through a real example instead' },
  { phrase: 'i am committed', suggestion: 'Show commitment through a real example instead' },
  { phrase: 'go-getter', suggestion: 'Delete this — show initiative with a real example' },
  { phrase: 'self-starter', suggestion: 'Delete this — describe something you actually started' },
  { phrase: 'multitasker', suggestion: 'Show it with a specific situation instead' },
  { phrase: 'strong work ethic', suggestion: 'Show it with a specific achievement instead' },
  { phrase: 'excellent communication', suggestion: 'Give an example of when your communication made a difference' },
];

const checkForAIFlags = (text) => {
  if (!text) return [];
  const lower = text.toLowerCase();
  return AI_FLAGS.filter(flag => lower.includes(flag.phrase.toLowerCase()));
};

const getRiskLevel = (count) => {
  if (count === 0) return { label: 'Looks Good', color: 'green', bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800' };
  if (count <= 2) return { label: 'Low Risk', color: 'yellow', bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800' };
  if (count <= 4) return { label: 'Medium Risk', color: 'orange', bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800' };
  return { label: 'High Risk', color: 'red', bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800' };
};

const buildPrompt = (data) => {
  const { jobTitle, company, major, school, gpa, strengths, tone, companyDetail } = data;
  const toneInstructions = {
    professional: 'Write in a professional, polished tone. Confident but not aggressive.',
    confident: 'Write in a direct, confident tone. Get to the point. No fluff.',
    friendly: 'Write in a warm, approachable tone. Professional but personable.',
    enthusiastic: 'Write with genuine enthusiasm and energy. Show real excitement without being over the top.'
  };
  return `Write a cover letter for a college student applying for the following role. Follow ALL instructions carefully.

JOB DETAILS:
- Position: ${jobTitle}
- Company: ${company}
- Student's Major: ${major}
- School: ${school || 'not specified'}
${gpa ? `- GPA: ${gpa} (mention this if it is strong)` : ''}

STUDENT'S KEY STRENGTHS/EXPERIENCES:
${strengths}

${companyDetail ? `SPECIFIC COMPANY DETAIL TO INCLUDE:\n${companyDetail}\n` : ''}
TONE: ${toneInstructions[tone] || toneInstructions.professional}

STRICT RULES:
1. Keep it under 250 words total
2. Do NOT use these overused phrases: "passionate", "hardworking", "team player", "detail-oriented", "quick learner", "excited to apply", "I am writing to express my interest"
3. Start with a hook — NOT "My name is..." or "I am applying for..."
4. Write in first person, natural voice — it should sound like a real person wrote this, not a template
5. Include exactly ONE specific, concrete detail from the student's experience
6. Where the student needs to add a personal touch, write [ADD YOUR SPECIFIC DETAIL HERE] as a placeholder
7. End with a clear, confident call to action — not "I look forward to hearing from you"
8. Format: 3 short paragraphs max
9. Do NOT include address blocks, dates, or "Dear Hiring Manager" — just start with the opening hook

After the cover letter, add a section called "Make It Yours" with 3 specific suggestions for how this student can personalize it further.`;
};

const AIFlagChecker = ({ text, label }) => {
  const flags = checkForAIFlags(text);
  const risk = getRiskLevel(flags.length);
  const [expanded, setExpanded] = useState(false);

  if (!text || text.trim().length < 10) return null;

  return (
    <div className={`mt-2 rounded-xl border ${risk.border} ${risk.bg} p-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag className={`w-4 h-4 ${risk.text}`} />
          <span className={`text-xs font-bold ${risk.text}`}>
            AI Risk: {risk.label} {flags.length > 0 ? `— ${flags.length} flag${flags.length > 1 ? 's' : ''} detected` : '— No AI phrases found'}
          </span>
        </div>
        {flags.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`text-xs font-semibold ${risk.text} flex items-center gap-1`}
          >
            {expanded ? 'Hide' : 'Show'}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>
      {expanded && flags.length > 0 && (
        <div className="mt-2 space-y-1">
          {flags.map((flag, i) => (
            <div key={i} className="text-xs">
              <span className={`font-bold ${risk.text}`}>"{flag.phrase}"</span>
              <span className="text-gray-600"> — {flag.suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CoverLetterGenerator = ({ setCurrentPage }) => {
  const [form, setForm] = useState({
    jobTitle: '', company: '', major: 'Engineering/STEM',
    school: '', gpa: '', strengths: '', tone: 'professional', companyDetail: ''
  });
  const [copied, setCopied] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [errors, setErrors] = useState({});
  const [pastedLetter, setPastedLetter] = useState('');
  const [showOutputChecker, setShowOutputChecker] = useState(false);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.jobTitle.trim()) newErrors.jobTitle = true;
    if (!form.company.trim()) newErrors.company = true;
    if (!form.strengths.trim() || form.strengths.trim().length < 20) newErrors.strengths = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const copyAndOpen = (provider) => {
    if (!validate()) return;
    const prompt = buildPrompt(form);
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setSelectedProvider(provider);
      setTimeout(() => {
        setCopied(false);
        setShowOutputChecker(true);
      }, 3000);
      window.open(AI_PROVIDERS[provider].url, '_blank');
    });
  };

  const isReady = form.jobTitle.trim() && form.company.trim() && form.strengths.trim().length >= 20;
  const outputFlags = checkForAIFlags(pastedLetter);
  const outputRisk = getRiskLevel(outputFlags.length);

  return (
    <>
      <Helmet>
        <title>Free Cover Letter Generator for College Students | MoreThanOneWay.org</title>
        <meta name="description" content="Generate a personalized cover letter for free. Built for college students — no sign-up, no paywall. Get a draft in seconds using AI, then make it yours." />
        <meta name="keywords" content="free cover letter generator college students, AI cover letter, internship cover letter, cover letter template students" />
        <meta property="og:title" content="Free Cover Letter Generator | MoreThanOneWay.org" />
        <meta property="og:description" content="Free AI-powered cover letter generator for college students. No sign-up required." />
        <link rel="canonical" href="https://morethanoneway.org/cover-letter" />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Cover Letter{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-orange-400">
                Generator
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Free. No sign-up. Get a strong draft in seconds — then make it sound like <em>you</em>.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 text-sm">The #1 problem with AI cover letters</p>
                <p className="text-amber-800 text-sm mt-1">
                  They all sound the same. That is why we built this differently — our AI Flag Checker scans for
                  overused AI phrases in both your input AND your generated letter.
                </p>
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="mt-2 text-amber-700 text-sm font-semibold flex items-center gap-1 hover:text-amber-900"
                >
                  {showTips ? 'Hide' : 'Show'} personalization tips
                  {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showTips && (
                  <ul className="mt-3 space-y-2 text-sm text-amber-900">
                    <li>Add one specific thing about the company that shows you researched them</li>
                    <li>Replace any phrase like "I am passionate about..." with a real moment that shows it</li>
                    <li>Delete the first sentence the AI writes and rewrite it in your own words</li>
                    <li>Read it out loud — if any part sounds robotic, rewrite it</li>
                    <li>Keep it under 250 words — hiring managers skim</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">

            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">1</span>
                Job Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title <span className="text-red-500">*</span></label>
                  <input type="text" value={form.jobTitle} onChange={(e) => update('jobTitle', e.target.value)}
                    placeholder="e.g. Software Engineering Intern"
                    className={`w-full p-3 border rounded-xl text-sm ${errors.jobTitle ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
                  {errors.jobTitle && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.company} onChange={(e) => update('company', e.target.value)}
                    placeholder="e.g. Google"
                    className={`w-full p-3 border rounded-xl text-sm ${errors.company ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
                  {errors.company && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">2</span>
                About You
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Major</label>
                  <select value={form.major} onChange={(e) => update('major', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-white">
                    {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">School (optional)</label>
                  <input type="text" value={form.school} onChange={(e) => update('school', e.target.value)}
                    placeholder="e.g. University of Connecticut"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">GPA (optional — include if 3.3+)</label>
                  <input type="text" value={form.gpa} onChange={(e) => update('gpa', e.target.value)}
                    placeholder="e.g. 3.7" className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">3</span>
                Your Key Strengths & Experiences <span className="text-red-500">*</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">List 2-4 things about you that are relevant to this role. Be specific.</p>
              <textarea value={form.strengths} onChange={(e) => update('strengths', e.target.value)}
                placeholder="e.g. Built a Python web scraper for a class project that collected 10,000 data points. Completed a data analysis internship. Strong in Python, SQL, and Excel. President of the Computer Science club."
                rows={5}
                className={`w-full p-3 border rounded-xl text-sm resize-none ${errors.strengths ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
              {errors.strengths && <p className="text-red-500 text-xs mt-1">Please add at least a sentence or two about yourself</p>}
              <AIFlagChecker text={form.strengths} label="strengths" />
            </div>

            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-sm font-bold flex items-center justify-center">4</span>
                Something Specific About This Company
                <span className="text-xs font-normal text-gray-500 ml-1">(optional but powerful)</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">This is what separates your letter from everyone else. Look at their website, LinkedIn, or recent news.</p>
              <textarea value={form.companyDetail} onChange={(e) => update('companyDetail', e.target.value)}
                placeholder="e.g. I saw that Google recently launched their AI Overviews feature and I am really interested in how search is evolving."
                rows={3} className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none" />
              <AIFlagChecker text={form.companyDetail} label="company" />
            </div>

            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">5</span>
                Tone
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TONES.map(t => (
                  <button key={t.value} onClick={() => update('tone', t.value)}
                    className={`p-3 rounded-xl border text-sm font-semibold text-left transition-all ${
                      form.tone === t.value ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-1 shadow-lg">
            <div className="bg-white rounded-2xl p-6">
              <div className="text-center mb-5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">Generate Your Cover Letter</h3>
                <p className="text-sm text-gray-500 mt-1">Choose your AI tool — your prompt copies automatically</p>
              </div>

              {!isReady && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-center">
                  <p className="text-sm text-yellow-800">Fill in Job Title, Company, and Your Strengths to continue</p>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
                  <button key={key} onClick={() => copyAndOpen(key)} disabled={!isReady}
                    className={`${provider.color} text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-base transition-all ${
                      isReady ? 'hover:scale-105' : 'opacity-40 cursor-not-allowed'
                    }`}>
                    {provider.name}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {copied && (
                <div className="mt-4 bg-green-50 border-2 border-green-400 rounded-xl p-4 text-center">
                  <Check className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="font-bold text-green-800">Prompt copied! {AI_PROVIDERS[selectedProvider]?.name} opened in new tab</p>
                  <p className="text-sm text-green-700 mt-1">Paste (Ctrl+V or Cmd+V) and press Enter to get your cover letter</p>
                </div>
              )}

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm font-bold text-blue-900 mb-2">How it works:</p>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Click an AI tool above</li>
                  <li>2. Your info + instructions are copied automatically</li>
                  <li>3. AI tool opens in a new tab</li>
                  <li>4. Paste (Ctrl+V or Cmd+V) and press Enter</li>
                  <li>5. Get your draft + personalization tips in about 30 seconds</li>
                </ol>
              </div>
            </div>
          </div>

          {showOutputChecker && (
            <div className="mt-8 bg-white rounded-2xl border-2 border-purple-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Flag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">AI Flag Checker</h3>
                  <p className="text-sm text-gray-500">Paste your generated cover letter here to scan it for AI phrases</p>
                </div>
              </div>

              <textarea
                value={pastedLetter}
                onChange={(e) => setPastedLetter(e.target.value)}
                placeholder="Paste your cover letter here after getting it from ChatGPT, Claude, or Gemini..."
                rows={8}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none"
              />

              {pastedLetter.trim().length > 50 && (
                <div className={`mt-4 rounded-xl border-2 ${outputRisk.border} ${outputRisk.bg} p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className={`font-bold text-lg ${outputRisk.text}`}>
                        AI Risk Score: {outputRisk.label}
                      </p>
                      <p className={`text-sm ${outputRisk.text}`}>
                        {outputFlags.length === 0
                          ? 'No AI phrases detected — your letter looks human!'
                          : `${outputFlags.length} AI phrase${outputFlags.length > 1 ? 's' : ''} detected — fix these before sending`}
                      </p>
                    </div>
                    <div className={`text-3xl font-extrabold ${outputRisk.text}`}>
                      {outputFlags.length === 0 ? 'A+' : outputFlags.length <= 2 ? 'B' : outputFlags.length <= 4 ? 'C' : 'D'}
                    </div>
                  </div>

                  {outputFlags.length > 0 && (
                    <div className="space-y-2 mt-3 border-t border-gray-200 pt-3">
                      {outputFlags.map((flag, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                          <div>
                            <span className="font-bold text-gray-900">"{flag.phrase}"</span>
                            <span className="text-gray-600"> — {flag.suggestion}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {outputFlags.length === 0 && (
                    <div className="flex items-center gap-2 text-green-700 text-sm mt-2">
                      <Check className="w-4 h-4" />
                      <span>This letter passed the AI flag check. Make sure it still sounds like you before sending!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">After You Get Your Draft — Make It Yours</h3>
            <div className="space-y-3">
              {[
                { tip: 'Rewrite the opening line', detail: 'AI always writes boring openers. Delete it and start with something real.' },
                { tip: 'Add the specific company detail', detail: 'If you skipped step 4 above, go back and add something specific about why THIS company.' },
                { tip: 'Kill the cliches', detail: 'Search for "passionate", "hardworking", "team player" — delete every one and replace with proof.' },
                { tip: 'Read it out loud', detail: 'If any sentence sounds robotic or like you would never say it, rewrite it.' },
                { tip: 'Cut it down', detail: 'If it is over 250 words, cut. Hiring managers skim. Less is more.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.tip}</p>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <button onClick={() => setCurrentPage('resume-builder')}
              className="bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all text-center">
              Build Your Resume
            </button>
            <button onClick={() => setCurrentPage('find-internships')}
              className="bg-white text-gray-900 border border-gray-200 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all text-center">
              Find Internships
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CoverLetterGenerator;
