import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ExternalLink, Sparkles, AlertCircle, ChevronDown, ChevronUp, Flag, FileText, X, RefreshCw } from 'lucide-react';

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
  { phrase: 'hardworking', suggestion: 'Show it with a result instead' },
  { phrase: 'team player', suggestion: 'Describe a specific time you collaborated on something real' },
  { phrase: 'detail-oriented', suggestion: 'Show it with a specific example' },
  { phrase: 'quick learner', suggestion: 'Replace with a specific example' },
  { phrase: 'results-driven', suggestion: 'Just show the results instead' },
  { phrase: 'dynamic', suggestion: 'This word means nothing to a hiring manager' },
  { phrase: 'synergy', suggestion: 'Delete this entirely' },
  { phrase: 'leveraged', suggestion: 'Just say "used"' },
  { phrase: 'utilized', suggestion: 'Just say "used"' },
  { phrase: 'spearheaded', suggestion: 'Try "led" or "started" instead' },
  { phrase: 'fostered', suggestion: 'Try "built" or "developed" instead' },
  { phrase: 'i am writing to express', suggestion: 'Most overused AI opener ever' },
  { phrase: 'excited to apply', suggestion: 'Show excitement through specifics instead' },
  { phrase: 'i look forward to hearing from you', suggestion: 'End with something stronger and more confident' },
  { phrase: 'to whom it may concern', suggestion: 'Find a real name or use a specific title' },
  { phrase: 'i am a dedicated', suggestion: 'Show dedication through a real example' },
  { phrase: 'i am committed', suggestion: 'Show commitment through a real example' },
  { phrase: 'go-getter', suggestion: 'Show initiative with a real example instead' },
  { phrase: 'self-starter', suggestion: 'Describe something you actually started instead' },
  { phrase: 'multitasker', suggestion: 'Show it with a specific situation' },
  { phrase: 'strong work ethic', suggestion: 'Show it with a specific achievement' },
  { phrase: 'excellent communication', suggestion: 'Give an example of when your communication made a difference' },
  { phrase: 'delve', suggestion: '"Delve" is one of the most flagged AI words — delete it' },
  { phrase: 'nuanced', suggestion: 'Overused by AI — replace with something specific' },
  { phrase: 'multifaceted', suggestion: 'Sounds like AI — be more direct' },
  { phrase: 'robust', suggestion: '"Robust" is an AI favorite — say what you actually mean' },
  { phrase: 'comprehensive', suggestion: 'Vague AI word — be specific instead' },
  { phrase: 'invaluable', suggestion: 'Overused by AI — show the value with specifics' },
  { phrase: 'eager to', suggestion: '"Eager to" is a major AI tell — rewrite naturally' },
  { phrase: 'keen interest', suggestion: '"Keen interest" sounds like AI — say it naturally' },
  { phrase: 'adept at', suggestion: '"Adept at" is an AI phrase — just say what you can do' },
  { phrase: 'proficient', suggestion: 'Overused — list the specific skill level or tool instead' },
  { phrase: 'seasoned', suggestion: 'No college student is "seasoned" — delete this' },
  { phrase: 'honed', suggestion: '"Honed my skills" is very AI — say what you actually did' },
  { phrase: 'showcase', suggestion: '"Showcase my abilities" is an AI cliche — be specific' },
  { phrase: 'tapestry', suggestion: 'This word exploded with AI use — delete it' },
  { phrase: 'craft ', suggestion: 'Using "craft" as a verb is an AI tell — try "build" or "create"' },
  { phrase: ' — ', suggestion: 'Em dashes are one of the biggest AI tells — use a comma or rewrite' },
];

const checkForAIFlags = (text) => {
  if (!text) return [];
  const lower = text.toLowerCase();
  return AI_FLAGS.filter(flag => lower.includes(flag.phrase.toLowerCase()));
};

const getRiskLevel = (count) => {
  if (count === 0) return { label: 'Looks Good', bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800' };
  if (count <= 2) return { label: 'Low Risk', bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800' };
  if (count <= 4) return { label: 'Medium Risk', bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800' };
  return { label: 'High Risk', bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800' };
};

const getReadabilityScore = (text) => {
  if (!text || text.trim().length < 50) return null;
  const words = text.trim().split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const avgWordsPerSentence = sentences > 0 ? words / sentences : 0;
  const longWords = text.split(/\s+/).filter(w => w.length > 8).length;
  const longWordRatio = words > 0 ? longWords / words : 0;
  if (avgWordsPerSentence > 25 || longWordRatio > 0.3) {
    return { label: 'Too Complex', detail: 'Sentences are too long or use too many big words. Simplify for a human feel.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', score: 'D' };
  }
  if (avgWordsPerSentence > 18 || longWordRatio > 0.2) {
    return { label: 'Slightly Formal', detail: 'A bit stiff. Try breaking up long sentences and using simpler words.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', score: 'B' };
  }
  if (avgWordsPerSentence < 8) {
    return { label: 'Too Choppy', detail: 'Sentences are very short. Try combining some for better flow.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', score: 'C' };
  }
  return { label: 'Easy to Read', detail: 'Good balance of sentence length and vocabulary. Reads naturally.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', score: 'A' };
};

const extractKeywords = (text) => {
  if (!text) return [];
  const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','be','been','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','need','must','that','this','these','those','it','its','we','our','you','your','they','their','i','my','me','he','she','his','her','as','if','when','which','who','what','how','all','any','both','each','few','more','most','other','some','such','into','through','during','before','after','above','below','between','out','off','over','under','again','further','then','once','here','there','about','against','while','also','than','very','just','not','no','nor','so','yet','either','neither','whether']);
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w)).filter((w, i, arr) => arr.indexOf(w) === i).slice(0, 50);
};

const buildPrompt = (data) => {
  const { jobTitle, company, major, school, gpa, strengths, tone, companyDetail } = data;
  const toneInstructions = {
    professional: 'Write in a professional, polished tone. Confident but not aggressive.',
    confident: 'Write in a direct, confident tone. Get to the point. No fluff.',
    friendly: 'Write in a warm, approachable tone. Professional but personable.',
    enthusiastic: 'Write with genuine enthusiasm and energy without being over the top.'
  };
  return `Write a cover letter for a college student. Follow ALL rules carefully.

JOB DETAILS:
- Position: ${jobTitle}
- Company: ${company}
- Major: ${major}
- School: ${school || 'not specified'}
${gpa ? `- GPA: ${gpa} (mention if strong)` : ''}

KEY STRENGTHS/EXPERIENCES:
${strengths}

${companyDetail ? `SPECIFIC COMPANY DETAIL:\n${companyDetail}\n` : ''}
TONE: ${toneInstructions[tone] || toneInstructions.professional}

STRICT RULES — every single one must be followed:
1. Keep it under 250 words total
2. Do NOT use these words or phrases: "passionate", "hardworking", "team player", "detail-oriented", "quick learner", "excited to apply", "I am writing to express my interest", "delve", "nuanced", "robust", "comprehensive", "invaluable", "eager", "keen", "adept", "seasoned", "honed", "showcase", "tapestry", "multifaceted", "leverage", "utilize", "spearhead", "foster"
3. Do NOT use em dashes (—) anywhere. Use commas or periods instead.
4. Start with a hook — NOT "My name is..." or "I am applying for..." or "I"
5. Do NOT start consecutive sentences with "I"
6. Write in first person, natural voice — sound like a real person wrote this
7. Vary paragraph lengths — do NOT make all paragraphs the same length
8. Include ONE specific concrete detail from the experiences listed
9. Where personal touch is needed, write [ADD YOUR SPECIFIC DETAIL HERE]
10. End with a clear confident call to action — not "I look forward to hearing from you"
11. Format: 3 short paragraphs max — NO bullet points in a cover letter
12. Do NOT include address blocks, dates, or salutation — start with the hook

After the letter, add "Make It Yours" with 3 specific personalization suggestions.`;
};

const AIFlagChecker = ({ text }) => {
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
          <button onClick={() => setExpanded(!expanded)} className={`text-xs font-semibold ${risk.text} flex items-center gap-1`}>
            {expanded ? 'Hide' : 'Show'} {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>
      {expanded && flags.length > 0 && (
        <div className="mt-2 space-y-1">
          {flags.map((flag, i) => (
            <div key={i} className="text-xs">
              <span className={`font-bold ${risk.text}`}>"{flag.phrase.trim()}"</span>
              <span className="text-gray-600"> — {flag.suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FormatModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-xl text-gray-900">Cover Letter Format</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-gray-600 mb-5">Use any AI tool, a template, or write it yourself — then drop your letter into this format before sending.</p>
        <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm space-y-3 text-gray-800">
          <div><span>[Your Name]</span><span className="ml-2 text-xs text-teal-600 font-sans">← Add in Word/Google Docs</span></div>
          <div>[Email | Phone | LinkedIn URL]</div>
          <div><span>[Date]</span><span className="ml-2 text-xs text-teal-600 font-sans">← Always include</span></div>
          <div className="pt-2">
            <div><span>[Hiring Manager Name]</span><span className="ml-2 text-xs text-orange-600 font-sans">← Research this!</span></div>
            <div>[Their Title]</div>
            <div>[Company Name]</div>
            <div>[Company Address]</div>
          </div>
          <div className="pt-2"><span>Dear [First Name],</span><span className="ml-2 text-xs text-orange-600 font-sans">← Never "To Whom It May Concern"</span></div>
          <div className="pt-2 space-y-2">
            <div className="text-gray-500 italic">[Opening hook]</div>
            <div className="text-gray-500 italic">[Skills/experience paragraph]</div>
            <div className="text-gray-500 italic">[Closing + call to action]</div>
          </div>
          <div className="pt-2"><div>Sincerely,</div><div>[Your Name]</div></div>
        </div>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-800"><strong>Pro tip:</strong> Find the hiring manager name on LinkedIn. "Dear Sarah," beats "Dear Hiring Manager," every time.</p>
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3">
  <p className="text-xs font-bold text-blue-900 mb-2">ATS Tips for Cover Letters</p>
  <ul className="text-xs text-blue-800 space-y-1">
    <li>Use the job title exactly as written in the posting</li>
    <li>No tables, columns, text boxes, or special formatting</li>
    <li>Save as .docx or PDF — not .pages or .odt</li>
    <li>Keep font simple — Arial, Calibri, or Times New Roman</li>
    <li>Do not put contact info in a header — type it in the body</li>
  </ul>
</div>
        <button onClick={onClose} className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-700">Got It</button>
      </div>
    </div>
  </div>
);

const CoverLetterGenerator = ({ setCurrentPage }) => {
  const [form, setForm] = useState({ jobTitle: '', company: '', major: 'Engineering/STEM', school: '', gpa: '', strengths: '', tone: 'professional', companyDetail: '' });
  const [copied, setCopied] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [errors, setErrors] = useState({});
  const [pastedLetter, setPastedLetter] = useState('');
  const [showOutputChecker, setShowOutputChecker] = useState(false);
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [rewriteCopied, setRewriteCopied] = useState(false);

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
      setTimeout(() => { setCopied(false); setShowOutputChecker(true); }, 3000);
      window.open(AI_PROVIDERS[provider].url, '_blank');
    });
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 10) setSelectedText(selection.toString().trim());
  };

  const rewriteSentence = (provider) => {
    if (!selectedText) return;
    const prompt = `Rewrite this sentence from a cover letter so it sounds more human and natural. Keep the same meaning but make it feel like a real person said it. Do NOT use em dashes, or words like "passionate", "leveraged", "utilized", "spearheaded", "delve", "robust", "keen", or "adept". Keep it concise.

Sentence: "${selectedText}"

Give 2-3 alternative versions.`;
    navigator.clipboard.writeText(prompt).then(() => {
      setRewriteCopied(true);
      setTimeout(() => setRewriteCopied(false), 3000);
      window.open(AI_PROVIDERS[provider].url, '_blank');
    });
  };

  const wordCount = pastedLetter.trim() ? pastedLetter.trim().split(/\s+/).length : 0;
  const readability = getReadabilityScore(pastedLetter);
  const outputFlags = checkForAIFlags(pastedLetter);
  const outputRisk = getRiskLevel(outputFlags.length);
  const isReady = form.jobTitle.trim() && form.company.trim() && form.strengths.trim().length >= 20;
  const jobKeywords = extractKeywords(jobDescription);
  const letterKeywords = extractKeywords(pastedLetter);
  const matchedKeywords = jobKeywords.filter(k => letterKeywords.includes(k));
  const missingKeywords = jobKeywords.filter(k => !letterKeywords.includes(k)).slice(0, 10);

  return (
    <>
      <Helmet>
        <title>Free Cover Letter Generator for College Students | MoreThanOneWay.org</title>
        <meta name="description" content="Generate a personalized cover letter for free. Built for college students with AI flag checker, word count, readability score, and job description matcher." />
        <meta name="keywords" content="free cover letter generator college students, AI cover letter, internship cover letter, cover letter template students" />
        <meta property="og:title" content="Free Cover Letter Generator | MoreThanOneWay.org" />
        <meta property="og:description" content="Free cover letter generator for college students with AI flag checker and job description matcher." />
        <link rel="canonical" href="https://morethanoneway.org/cover-letter" />
      </Helmet>

      {showFormatModal && <FormatModal onClose={() => setShowFormatModal(false)} />}

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">

          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Cover Letter{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-orange-400">Generator</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">Free. No sign-up. Get a strong draft in seconds — then make it sound like <em>you</em>.</p>
            <button onClick={() => setShowFormatModal(true)}
              className="mt-3 inline-flex items-center gap-2 text-sm text-teal-600 font-semibold hover:text-teal-800 border border-teal-200 rounded-xl px-4 py-2 bg-teal-50 hover:bg-teal-100 transition-all">
              <FileText className="w-4 h-4" /> See Cover Letter Format Example
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 text-sm">The #1 problem with AI cover letters</p>
                <p className="text-amber-800 text-sm mt-1">They all sound the same. Our AI Flag Checker, readability score, and job matcher help you fix that.</p>
                <button onClick={() => setShowTips(!showTips)} className="mt-2 text-amber-700 text-sm font-semibold flex items-center gap-1 hover:text-amber-900">
                  {showTips ? 'Hide' : 'Show'} personalization tips
                  {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showTips && (
                  <ul className="mt-3 space-y-1 text-sm text-amber-900">
                    <li>Add one specific thing about the company that shows you researched them</li>
                    <li>Replace "I am passionate about..." with a real moment that shows it</li>
                    <li>Delete the first sentence and rewrite it in your own words</li>
                    <li>Read it out loud — if it sounds robotic, rewrite it</li>
                    <li>Keep it under 250 words</li>
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
                  <input type="text" value={form.jobTitle} onChange={(e) => update('jobTitle', e.target.value)} placeholder="e.g. Software Engineering Intern"
                    className={`w-full p-3 border rounded-xl text-sm ${errors.jobTitle ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
                  {errors.jobTitle && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="e.g. Google"
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
                  <select value={form.major} onChange={(e) => update('major', e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-white">
                    {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">School (optional)</label>
                  <input type="text" value={form.school} onChange={(e) => update('school', e.target.value)} placeholder="e.g. University of Connecticut"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">GPA (optional — include if 3.3+)</label>
                  <input type="text" value={form.gpa} onChange={(e) => update('gpa', e.target.value)} placeholder="e.g. 3.7"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">3</span>
                Your Key Strengths & Experiences <span className="text-red-500">*</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">List 2-4 specific things about you relevant to this role.</p>
              <textarea value={form.strengths} onChange={(e) => update('strengths', e.target.value)}
                placeholder="e.g. Built a Python web scraper for a class project. Completed a data analysis internship. Strong in Python, SQL, and Excel. President of the CS club."
                rows={5} className={`w-full p-3 border rounded-xl text-sm resize-none ${errors.strengths ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
              {errors.strengths && <p className="text-red-500 text-xs mt-1">Please add at least a sentence or two</p>}
              <AIFlagChecker text={form.strengths} />
            </div>

            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-sm font-bold flex items-center justify-center">4</span>
                Something Specific About This Company
                <span className="text-xs font-normal text-gray-500 ml-1">(optional but powerful)</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">This separates your letter from everyone else. Look at their website, LinkedIn, or recent news.</p>
              <textarea value={form.companyDetail} onChange={(e) => update('companyDetail', e.target.value)}
                placeholder="e.g. I saw that Google recently launched AI Overviews and I am really interested in how search is evolving."
                rows={3} className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none" />
              <AIFlagChecker text={form.companyDetail} />
            </div>

            <div>
              <h2 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">5</span>
                Tone
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TONES.map(t => (
                  <button key={t.value} onClick={() => update('tone', t.value)}
                    className={`p-3 rounded-xl border text-sm font-semibold text-left transition-all ${form.tone === t.value ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
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
                    className={`${provider.color} text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-base transition-all ${isReady ? 'hover:scale-105' : 'opacity-40 cursor-not-allowed'}`}>
                    {provider.name} <ExternalLink className="w-4 h-4" />
                  </button>
                ))}
              </div>
              {copied && (
                <div className="mt-4 bg-green-50 border-2 border-green-400 rounded-xl p-4 text-center">
                  <Check className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="font-bold text-green-800">Prompt copied! {AI_PROVIDERS[selectedProvider]?.name} opened</p>
                  <p className="text-sm text-green-700 mt-1">Paste (Ctrl+V or Cmd+V) and press Enter</p>
                </div>
              )}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <p className="font-bold text-blue-900 mb-1">How it works:</p>
                <ol className="space-y-1">
                  <li>1. Click an AI tool above</li>
                  <li>2. Your info and instructions copy automatically</li>
                  <li>3. Paste and press Enter in the AI tool</li>
                  <li>4. Come back and paste your letter below to check it</li>
                </ol>
              </div>
            </div>
          </div>

          {showOutputChecker && (
            <div className="mt-8 bg-white rounded-2xl border-2 border-purple-200 p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Flag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Polish Your Letter</h3>
                  <p className="text-sm text-gray-500">Paste your generated cover letter here to run all checks</p>
                </div>
              </div>

              <textarea value={pastedLetter} onChange={(e) => setPastedLetter(e.target.value)}
                onMouseUp={handleTextSelection} onKeyUp={handleTextSelection}
                placeholder="Paste your cover letter here after getting it from ChatGPT, Claude, or Gemini..."
                rows={10} className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none" />

              {pastedLetter.trim().length > 50 && (
                <div className="space-y-4">

                  <div className={`rounded-xl border p-4 ${wordCount > 250 ? 'bg-red-50 border-red-300' : wordCount > 220 ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-sm ${wordCount > 250 ? 'text-red-800' : wordCount > 220 ? 'text-yellow-800' : 'text-green-800'}`}>
                        Word Count: {wordCount} words
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${wordCount > 250 ? 'bg-red-200 text-red-800' : wordCount > 220 ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                        {wordCount > 250 ? 'Too Long' : wordCount > 220 ? 'Getting long' : 'Good length'}
                      </span>
                    </div>
                    {wordCount > 250 && <p className="text-xs text-red-700 mt-1">Cut {wordCount - 250} words — remove filler and tighten sentences.</p>}
                  </div>

                  {readability && (
                    <div className={`rounded-xl border p-4 ${readability.bg} ${readability.border}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`font-bold text-sm ${readability.color}`}>Readability: {readability.label}</span>
                          <p className={`text-xs mt-1 ${readability.color}`}>{readability.detail}</p>
                        </div>
                        <span className={`text-2xl font-extrabold ${readability.color}`}>{readability.score}</span>
                      </div>
                    </div>
                  )}

                  <div className={`rounded-xl border-2 ${outputRisk.border} ${outputRisk.bg} p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className={`font-bold text-sm ${outputRisk.text}`}>AI Flag Check: {outputRisk.label}</p>
                        <p className={`text-xs ${outputRisk.text}`}>
                          {outputFlags.length === 0 ? 'No AI phrases detected' : `${outputFlags.length} AI phrase${outputFlags.length > 1 ? 's' : ''} to fix`}
                        </p>
                      </div>
                      <span className={`text-2xl font-extrabold ${outputRisk.text}`}>
                        {outputFlags.length === 0 ? 'A+' : outputFlags.length <= 2 ? 'B' : outputFlags.length <= 4 ? 'C' : 'D'}
                      </span>
                    </div>
                    {outputFlags.length > 0 && (
                      <div className="space-y-1 mt-2 border-t border-gray-200 pt-2">
                        {outputFlags.map((flag, i) => (
                          <div key={i} className="text-xs flex items-start gap-1">
                            <span className="text-red-500 font-bold">x</span>
                            <span><strong>"{flag.phrase.trim()}"</strong> — {flag.suggestion}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <RefreshCw className="w-4 h-4 text-gray-600" />
                      <p className="font-bold text-sm text-gray-900">Rewrite a Sentence</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Highlight any sentence in your letter above that sounds robotic, then click below to get human rewrites.</p>
                    {selectedText && (
                      <div className="bg-white border border-gray-200 rounded-lg p-2 mb-3 text-xs text-gray-700 italic">
                        Selected: "{selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}"
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
                        <button key={key} onClick={() => rewriteSentence(key)} disabled={!selectedText}
                          className={`${provider.color} text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${selectedText ? 'hover:scale-105' : 'opacity-40 cursor-not-allowed'}`}>
                          {provider.name} <ExternalLink className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                    {rewriteCopied && <p className="text-xs text-green-700 font-semibold mt-2 text-center">Rewrite prompt copied! Paste in the AI tool.</p>}
                    {!selectedText && <p className="text-xs text-gray-500 mt-2 text-center">Highlight text in your letter first</p>}
                  </div>

                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-bold text-gray-900 mb-1">Job Description Matcher</h4>
                <p className="text-sm text-gray-500 mb-3">Paste the job posting to see which keywords your letter hits and which it misses.</p>
                <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={5} className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none" />
                {jobDescription.trim().length > 50 && pastedLetter.trim().length > 50 && (
                  <div className="mt-4 space-y-3">
                    {matchedKeywords.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="font-bold text-green-800 text-sm mb-2">Keywords Your Letter Hits ({matchedKeywords.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {matchedKeywords.map((kw, i) => <span key={i} className="bg-green-200 text-green-900 text-xs px-2 py-1 rounded-full font-medium">{kw}</span>)}
                        </div>
                      </div>
                    )}
                    {missingKeywords.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="font-bold text-red-800 text-sm mb-2">Keywords Your Letter Misses</p>
                        <div className="flex flex-wrap gap-2">
                          {missingKeywords.map((kw, i) => <span key={i} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">{kw}</span>)}
                        </div>
                        <p className="text-xs text-red-700 mt-2">Only add keywords that genuinely apply to your experience — never fabricate skills.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">After You Get Your Draft — Make It Yours</h3>
            <div className="space-y-3">
              {[
                { tip: 'Rewrite the opening line', detail: 'AI always writes boring openers. Delete it and start with something real.' },
                { tip: 'Add the specific company detail', detail: 'If you skipped step 4 above, add something specific about why THIS company.' },
                { tip: 'Kill the cliches', detail: 'Search for "passionate", "hardworking", "team player" — delete and replace with proof.' },
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
            <button onClick={() => setCurrentPage('resume-builder')} className="bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all text-center">Build Your Resume</button>
            <button onClick={() => setCurrentPage('find-internships')} className="bg-white text-gray-900 border border-gray-200 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all text-center">Find Internships</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CoverLetterGenerator;
