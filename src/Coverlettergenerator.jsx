import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Check, ExternalLink, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const AI_PROVIDERS = {
  chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600 hover:bg-green-700' },
  claude: { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-600 hover:bg-orange-700' },
  gemini: { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-600 hover:bg-blue-700' }
};

const MAJORS = [
  'Engineering/STEM',
  'Business',
  'Liberal Arts',
  'Health Sciences',
  'Education',
  'Computer Science',
  'Communications',
  'Psychology',
  'Biology/Pre-Med',
  'Other'
];

const TONES = [
  { value: 'professional', label: 'Professional & Polished' },
  { value: 'confident', label: 'Confident & Direct' },
  { value: 'friendly', label: 'Friendly & Approachable' },
  { value: 'enthusiastic', label: 'Enthusiastic & Motivated' }
];

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
${gpa ? `- GPA: ${gpa} (mention this if it's strong)` : ''}

STUDENT'S KEY STRENGTHS/EXPERIENCES:
${strengths}

${companyDetail ? `SPECIFIC COMPANY DETAIL TO INCLUDE:\n${companyDetail}\n` : ''}
TONE: ${toneInstructions[tone] || toneInstructions.professional}

STRICT RULES — follow every one of these:
1. Keep it under 250 words total
2. Do NOT use these overused phrases: "passionate", "hardworking", "team player", "detail-oriented", "quick learner", "excited to apply", "I am writing to express my interest"
3. Start with a hook — NOT "My name is..." or "I am applying for..."
4. Write in first person, natural voice — it should sound like a real person wrote this, not a template
5. Include exactly ONE specific, concrete detail from the student's experience (from the strengths they listed)
6. Where the student needs to add a personal touch, write [ADD YOUR SPECIFIC DETAIL HERE] as a placeholder
7. End with a clear, confident call to action — not "I look forward to hearing from you"
8. Format: 3 short paragraphs max
9. Do NOT include address blocks, dates, or "Dear Hiring Manager" — just start with the opening hook

After the cover letter, add a short section called "Make It Yours" with 3 specific suggestions for how this student can personalize it further so it doesn't sound like every other AI cover letter.`;
};

const CoverLetterGenerator = ({ setCurrentPage }) => {
  const [form, setForm] = useState({
    jobTitle: '',
    company: '',
    major: 'Engineering/STEM',
    school: '',
    gpa: '',
    strengths: '',
    tone: 'professional',
    companyDetail: ''
  });

  const [copied, setCopied] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [errors, setErrors] = useState({});

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
      setTimeout(() => setCopied(false), 3000);
      window.open(AI_PROVIDERS[provider].url, '_blank');
    });
  };

  const isReady = form.jobTitle.trim() && form.company.trim() && form.strengths.trim().length >= 20;

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

          {/* Header */}
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

          {/* Anti-generic warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 text-sm">The #1 problem with AI cover letters</p>
                <p className="text-amber-800 text-sm mt-1">
                  They all sound the same. That's why we built this differently — the AI draft will include <strong>[ADD YOUR SPECIFIC DETAIL HERE]</strong> placeholders and tell you exactly how to personalize it so yours stands out.
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
                    <li>✦ Add one specific thing about the company that shows you researched them — a project, a value, a recent news story</li>
                    <li>✦ Replace any phrase like "I am passionate about..." with a real moment that shows it</li>
                    <li>✦ Delete the first sentence the AI writes and rewrite it in your own words</li>
                    <li>✦ Read it out loud — if any part sounds robotic, rewrite it</li>
                    <li>✦ Keep it under 250 words — hiring managers skim</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">

            {/* Job Details */}
            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">1</span>
                Job Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.jobTitle}
                    onChange={(e) => update('jobTitle', e.target.value)}
                    placeholder="e.g. Software Engineering Intern"
                    className={`w-full p-3 border rounded-xl text-sm ${errors.jobTitle ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.jobTitle && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                    placeholder="e.g. Google"
                    className={`w-full p-3 border rounded-xl text-sm ${errors.company ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
              </div>
            </div>

            {/* About You */}
            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">2</span>
                About You
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Major</label>
                  <select
                    value={form.major}
                    onChange={(e) => update('major', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-white"
                  >
                    {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">School (optional)</label>
                  <input
                    type="text"
                    value={form.school}
                    onChange={(e) => update('school', e.target.value)}
                    placeholder="e.g. University of Connecticut"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">GPA (optional — include if 3.3+)</label>
                  <input
                    type="text"
                    value={form.gpa}
                    onChange={(e) => update('gpa', e.target.value)}
                    placeholder="e.g. 3.7"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">3</span>
                Your Key Strengths & Experiences <span className="text-red-500">*</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">List 2-4 things about you that are relevant to this role. Be specific — the more detail you give, the better the output.</p>
              <textarea
                value={form.strengths}
                onChange={(e) => update('strengths', e.target.value)}
                placeholder="e.g. Built a Python web scraper for a class project that collected 10,000 data points. Completed a data analysis internship at a local company. Strong in Python, SQL, and Excel. President of the Computer Science club."
                rows={5}
                className={`w-full p-3 border rounded-xl text-sm resize-none ${errors.strengths ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.strengths && <p className="text-red-500 text-xs mt-1">Please add at least a sentence or two about yourself</p>}
            </div>

            {/* Company Detail */}
            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-sm font-bold flex items-center justify-center">4</span>
                Something Specific About This Company
                <span className="text-xs font-normal text-gray-500 ml-1">(optional but powerful)</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">This is what separates your letter from everyone else's. Look at their website, LinkedIn, or recent news.</p>
              <textarea
                value={form.companyDetail}
                onChange={(e) => update('companyDetail', e.target.value)}
                placeholder="e.g. I saw that Google recently launched their AI Overviews feature and I'm really interested in how search is evolving. OR I love that the company has a strong focus on sustainability — it aligns with my capstone project on renewable energy."
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none"
              />
            </div>

            {/* Tone */}
            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">5</span>
                Tone
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TONES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => update('tone', t.value)}
                    className={`p-3 rounded-xl border text-sm font-semibold text-left transition-all ${
                      form.tone === t.value
                        ? 'border-teal-500 bg-teal-50 text-teal-800'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* AI Buttons */}
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
                  <button
                    key={key}
                    onClick={() => copyAndOpen(key)}
                    disabled={!isReady}
                    className={`${provider.color} text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-base transition-all ${
                      isReady ? 'hover:scale-105' : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                    {provider.name}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {copied && (
                <div className="mt-4 bg-green-50 border-2 border-green-400 rounded-xl p-4 text-center">
                  <Check className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="font-bold text-green-800">
                    ✅ Prompt copied! {AI_PROVIDERS[selectedProvider]?.name} opened in new tab
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Paste (Ctrl+V or Cmd+V) and press Enter to get your cover letter
                  </p>
                </div>
              )}

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm font-bold text-blue-900 mb-2">📝 How it works:</p>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1️⃣ Click an AI tool above</li>
                  <li>2️⃣ Your info + instructions are copied automatically</li>
                  <li>3️⃣ AI tool opens in a new tab</li>
                  <li>4️⃣ Paste (Ctrl+V or Cmd+V) and press Enter</li>
                  <li>5️⃣ Get your draft + personalization tips in ~30 seconds</li>
                </ol>
              </div>

              <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Important:</strong> The AI gives you a strong starting point — but read it carefully. 
                  Fill in the <strong>[ADD YOUR SPECIFIC DETAIL HERE]</strong> placeholders. 
                  Rewrite any part that doesn't sound like you. The goal is a letter that's yours, just polished.
                </p>
              </div>
            </div>
          </div>

          {/* Make It Yours tips */}
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">✏️ After You Get Your Draft — Make It Yours</h3>
            <div className="space-y-3">
              {[
                { tip: 'Rewrite the opening line', detail: 'AI always writes boring openers. Delete it and start with something real.' },
                { tip: 'Add the specific company detail', detail: 'If you skipped step 4 above, go back and add something specific about why THIS company.' },
                { tip: 'Kill the clichés', detail: 'Search for "passionate", "hardworking", "team player" — delete every one and replace with proof.' },
                { tip: 'Read it out loud', detail: 'If any sentence sounds robotic or like you\'d never say it, rewrite it in your own words.' },
                { tip: 'Cut it down', detail: 'If it\'s over 250 words, cut. Hiring managers skim. Less is more.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.tip}</p>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentPage('resume-builder')}
              className="bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all text-center"
            >
              Build Your Resume →
            </button>
            <button
              onClick={() => setCurrentPage('find-internships')}
              className="bg-white text-gray-900 border border-gray-200 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all text-center"
            >
              Find Internships →
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CoverLetterGenerator;
