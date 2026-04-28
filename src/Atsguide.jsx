import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ChevronDown, ChevronUp, Copy, Check,
  FileText, Search, AlertCircle, CheckCircle, XCircle,
  Key, Mail, Shield, Zap, ClipboardList, Bot, Lightbulb
} from 'lucide-react';
import ShareButtons from './Sharebuttons';

// ── ExpandableSection — matches InterviewPrep exactly ──────────────────
const ExpandableSection = ({ title, subtitle, icon, expanded, onToggle }) => (
  <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-tealBrand/70">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {expanded
        ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
        : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
    </button>
    {expanded && (
      <div className="px-6 pb-6 border-t border-gray-100 pt-4">
        {/* children rendered by parent */}
      </div>
    )}
  </div>
);

const DoItem = ({ children }) => (
  <li className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
    <span>{children}</span>
  </li>
);

const DontItem = ({ children }) => (
  <li className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
    <span>{children}</span>
  </li>
);

const CopyPrompt = ({ label, prompt }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
      <p className="font-bold text-gray-800 mb-3">{label}</p>
      <pre className="text-sm text-gray-600 mb-4 whitespace-pre-wrap font-sans leading-relaxed bg-gray-50 rounded-xl p-4">{prompt}</pre>
      <button
        onClick={copy}
        className="bg-tealBrand text-white px-5 py-2 rounded-xl hover:opacity-90 transform hover:scale-105 transition-all flex items-center gap-2 text-sm font-semibold"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy Prompt'}
      </button>
    </div>
  );
};

// ── Main page ──────────────────────────────────────────────────────────
const ATSGuide = ({ setCurrentPage }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const toggle = (key) => setExpandedSection(expandedSection === key ? null : key);

  return (
    <>
      <Helmet>
        <title>ATS Resume Guide for College Students | MoreThanOneWay.org</title>
        <meta name="description" content="Free ATS guide for engineering and college students. Learn how to write a resume and cover letter that passes Applicant Tracking Systems — with AI review prompts included." />
        <meta name="keywords" content="ATS resume tips, applicant tracking system, college student resume, engineering internship resume, how to pass ATS, cover letter tips" />
        <meta property="og:title" content="ATS Guide: Beat the System | MoreThanOneWay.org" />
        <meta property="og:description" content="75% of resumes are rejected by ATS before a human reads them. Free guide for college students." />
      </Helmet>

      <section className="bg-[#FFFBF7] py-10">
        <div className="mx-auto w-full max-w-6xl px-4 space-y-8">

          {/* HERO — matches InterviewPrep header exactly */}
          <header className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              ATS Guide:{' '}
              <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                Beat the System
              </span>
            </h1>
            <p className="mt-6 mb-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
              75% of resumes are rejected before a human ever reads them. This guide shows you exactly how to fix that — for resumes and cover letters.
            </p>
          </header>

          {/* Tip strip — matches InterviewPrep's star strip */}
          <div className="rounded-xl bg-tealBrand/5 border border-gray-200 p-4">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-tealBrand flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 leading-relaxed">
                ATS rules are learnable. The same fixes that help your resume pass for one job will help it pass for every job you apply to. <strong>Learn it once — use it forever.</strong>
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { stat: '75%', label: 'of resumes rejected by ATS before a human reads them', border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-600' },
              { stat: '6 sec', label: 'average time a recruiter spends on a resume that passes', border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-600' },
              { stat: '3x', label: 'more interviews when resumes are properly ATS-optimized', border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-600' },
            ].map(({ stat, label, border, bg, text }) => (
              <div key={stat} className={`${bg} border ${border} rounded-2xl p-4 text-center`}>
                <p className={`text-3xl font-bold ${text} mb-1`}>{stat}</p>
                <p className="text-xs text-gray-600 leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* What is ATS */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <button
              onClick={() => toggle('what-is')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-tealBrand/70" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">What Is ATS and Why Does It Matter?</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Understand the gatekeeper before you can beat it</p>
                </div>
              </div>
              {expandedSection === 'what-is' ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </button>
            {expandedSection === 'what-is' && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  An <strong>Applicant Tracking System (ATS)</strong> is software companies use to automatically scan, sort, and filter job applications before a recruiter ever sees them. If your resume does not have the right keywords, structure, or formatting, it gets rejected automatically — even if you are perfectly qualified.
                </p>
                <p>
                  This is especially common at mid-to-large companies and structured internship programs that receive hundreds of applications. Once you understand the rules, you can work with the system instead of against it.
                </p>
              </div>
            )}
          </div>

          {/* Resume Formatting */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <button
              onClick={() => toggle('formatting')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-tealBrand/70" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Resume Formatting Rules</h3>
                  <p className="text-sm text-gray-500 mt-0.5">The structural rules ATS uses to accept or reject your resume</p>
                </div>
              </div>
              {expandedSection === 'formatting' ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </button>
            {expandedSection === 'formatting' && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                <p className="text-gray-600 mb-5 text-sm">ATS cannot read complex formatting. Clean and simple wins every time.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3 text-sm uppercase tracking-wide">Do This</h4>
                    <ul className="space-y-2.5">
                      <DoItem>Use simple fonts: Arial, Calibri, or Times New Roman (10–12pt)</DoItem>
                      <DoItem>Save as .docx or .pdf — check the job posting for preference</DoItem>
                      <DoItem>Use standard section headers: EDUCATION, EXPERIENCE, SKILLS, PROJECTS</DoItem>
                      <DoItem>Use standard bullet points, not arrows or decorative symbols</DoItem>
                      <DoItem>Keep margins between 0.5 and 1 inch</DoItem>
                      <DoItem>Spell out acronyms on first use: "American Society of Mechanical Engineers (ASME)"</DoItem>
                      <DoItem>Keep date formatting consistent throughout</DoItem>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-600 mb-3 text-sm uppercase tracking-wide">Never Do This</h4>
                    <ul className="space-y-2.5">
                      <DontItem>Tables, text boxes, or columns — ATS cannot parse them</DontItem>
                      <DontItem>Headers or footers — your contact info will get cut off</DontItem>
                      <DontItem>Graphics, logos, or photos</DontItem>
                      <DontItem>Canva or visual resume templates — pretty does not mean ATS-friendly</DontItem>
                      <DontItem>Underlining (use bold instead)</DontItem>
                      <DontItem>Color-coded sections or background shading</DontItem>
                      <DontItem>Creative section titles like "My Story" instead of "Experience"</DontItem>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Keywords */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <button
              onClick={() => toggle('keywords')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <Key className="w-6 h-6 text-tealBrand/70" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Keywords: The Most Important Thing You Can Do</h3>
                  <p className="text-sm text-gray-500 mt-0.5">How to match what employers are actually searching for</p>
                </div>
              </div>
              {expandedSection === 'keywords' ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </button>
            {expandedSection === 'keywords' && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-5">
                <p className="text-gray-700 leading-relaxed">
                  ATS scans for keywords from the job description. If you use different language than the employer — even if you mean the same thing — the system may not match you. Mirror their exact words wherever you honestly can.
                </p>
                <div className="rounded-xl bg-tealBrand/5 border border-gray-200 p-5">
                  <h4 className="font-bold text-gray-900 mb-3">The Keyword Matching Method</h4>
                  <ol className="space-y-2 text-gray-700 text-sm">
                    {[
                      'Copy the job description into a document',
                      'Highlight every skill, tool, and qualification they mention',
                      'Compare to your resume — what is missing?',
                      'Add missing keywords naturally into your bullets and skills section',
                      'Only add keywords you can genuinely speak to in an interview',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-bold text-tealBrand flex-shrink-0">{i + 1}.</span> {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="font-bold text-red-800 mb-2 text-sm">No Match — Likely Filtered Out</p>
                    <p className="text-xs text-gray-500 mb-1">Job posting says:</p>
                    <p className="text-sm text-gray-800 italic mb-2">"Experience with Python and data analysis"</p>
                    <p className="text-xs text-gray-500 mb-1">Resume says:</p>
                    <p className="text-sm text-gray-800 italic">"Comfortable with programming and working with numbers"</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="font-bold text-green-800 mb-2 text-sm">Strong Match — Passes ATS</p>
                    <p className="text-xs text-gray-500 mb-1">Job posting says:</p>
                    <p className="text-sm text-gray-800 italic mb-2">"Experience with Python and data analysis"</p>
                    <p className="text-xs text-gray-500 mb-1">Resume says:</p>
                    <p className="text-sm text-gray-800 italic">"Analyzed 500+ records using <strong>Python</strong> (Pandas) for <strong>data analysis</strong> class project"</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bullets */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <button
              onClick={() => toggle('bullets')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-tealBrand/70" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Writing Strong Resume Bullets</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Bullets that pass ATS and impress the human after</p>
                </div>
              </div>
              {expandedSection === 'bullets' ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </button>
            {expandedSection === 'bullets' && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-5">
                <p className="text-gray-700 leading-relaxed">
                  Your bullets need to pass ATS first, then impress the human who reads them. Use the <strong>STAR method</strong> — Situation, Task, Action, Result.
                </p>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="font-bold text-red-800 mb-1 text-sm">Weak Bullet</p>
                    <p className="text-gray-700 text-sm">"Helped with data things and worked on the team project"</p>
                    <p className="text-xs text-gray-500 mt-1">No keywords · no action verb · no result · no numbers</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
                    <p className="font-bold text-green-800 mb-1 text-sm">Strong Bullet</p>
                    <p className="text-gray-700 text-sm">"Analyzed 1,200+ sensor data points using Python (Pandas) to identify performance patterns, reducing test errors by 18%"</p>
                    <p className="text-xs text-gray-500 mt-1">Action verb + keywords + specific tool + quantified result</p>
                  </div>
                </div>
                <div className="rounded-xl bg-tealBrand/5 border border-gray-200 p-5">
                  <h4 className="font-bold text-gray-800 mb-3">Strong Action Verbs by Field</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold text-tealBrand mb-1 text-sm">Engineering / STEM</p>
                      <p className="text-gray-600 text-xs leading-relaxed">Designed, Analyzed, Implemented, Optimized, Developed, Tested, Automated, Calibrated, Simulated, Engineered</p>
                    </div>
                    <div>
                      <p className="font-semibold text-tealBrand mb-1 text-sm">Business</p>
                      <p className="text-gray-600 text-xs leading-relaxed">Led, Managed, Increased, Generated, Streamlined, Coordinated, Negotiated, Forecasted, Launched, Reduced</p>
                    </div>
                    <div>
                      <p className="font-semibold text-tealBrand mb-1 text-sm">Liberal Arts / All Majors</p>
                      <p className="text-gray-600 text-xs leading-relaxed">Researched, Presented, Wrote, Coordinated, Trained, Facilitated, Communicated, Collaborated, Assessed, Advised</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <button
              onClick={() => toggle('cover-letter')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-tealBrand/70" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Cover Letter ATS Tips</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Yes, ATS scans cover letters too — here is how to pass</p>
                </div>
              </div>
              {expandedSection === 'cover-letter' ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </button>
            {expandedSection === 'cover-letter' && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-5">
                <p className="text-gray-700 leading-relaxed">
                  ATS scans cover letters too. The rules are similar to resumes but with more flexibility since they are written in prose. Pass ATS while still sounding like a real person.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3 text-sm uppercase tracking-wide">Do This</h4>
                    <ul className="space-y-2.5">
                      <DoItem>Mirror keywords from the job posting naturally in your writing</DoItem>
                      <DoItem>Use the exact job title as it appears in the posting</DoItem>
                      <DoItem>Name the company specifically — generic letters get flagged</DoItem>
                      <DoItem>Keep formatting simple: plain paragraphs, no tables or columns</DoItem>
                      <DoItem>Include your name and contact info at the top</DoItem>
                      <DoItem>Save in the same format as your resume (.docx or .pdf)</DoItem>
                      <DoItem>Keep it to one page, 3–4 focused paragraphs</DoItem>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-600 mb-3 text-sm uppercase tracking-wide">Avoid This</h4>
                    <ul className="space-y-2.5">
                      <DontItem>A generic letter with no company name — instant flag</DontItem>
                      <DontItem>"To Whom It May Concern" — use "Dear Hiring Team" if unsure</DontItem>
                      <DontItem>Tables, columns, or text boxes</DontItem>
                      <DontItem>Repeating resume bullets verbatim — tell a story instead</DontItem>
                      <DontItem>Fancy fonts or colored text</DontItem>
                      <DontItem>Going over one page</DontItem>
                    </ul>
                  </div>
                </div>
                <div className="rounded-xl bg-tealBrand/5 border border-gray-200 p-5">
                  <h4 className="font-bold text-gray-800 mb-3">Cover Letter Structure That Works</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li><span className="font-bold text-tealBrand">Para 1:</span> Who you are, the exact role, and one specific reason you want to work at this company</li>
                    <li><span className="font-bold text-tealBrand">Para 2:</span> Your most relevant experience — work 2–3 job posting keywords in naturally</li>
                    <li><span className="font-bold text-tealBrand">Para 3:</span> A second strength or story that shows cultural fit or addresses a specific requirement</li>
                    <li><span className="font-bold text-tealBrand">Para 4:</span> Brief close — express interest in an interview, thank them, sign off professionally</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* AI Prompts */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <button
              onClick={() => toggle('ai-prompts')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-tealBrand/70" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Use AI to Check Your ATS Score</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Copy-paste prompts for ChatGPT, Claude, or Gemini</p>
                </div>
              </div>
              {expandedSection === 'ai-prompts' ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </button>
            {expandedSection === 'ai-prompts' && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Copy one of these prompts and paste it into ChatGPT, Claude, or Gemini along with your resume or cover letter. Always include the job description — targeted feedback beats generic every time.
                </p>
                <CopyPrompt
                  label="Resume ATS Check"
                  prompt={`Review my resume for ATS optimization. Please check:
1. Formatting issues that would prevent ATS from reading this correctly
2. Keywords from the job description missing from my resume
3. Whether my bullets use strong action verbs and quantifiable results
4. Whether my skills section is specific enough (e.g. "Python" vs "Python (NumPy, Pandas)")
5. Grammar, punctuation, and consistency issues
6. The top 3 changes I should make

Be specific. Keep my authentic experience — just present it more effectively.

[PASTE YOUR RESUME HERE]
[PASTE THE JOB DESCRIPTION HERE]`}
                />
                <CopyPrompt
                  label="Cover Letter ATS + Quality Check"
                  prompt={`Review my cover letter for ATS optimization and overall quality. Please check:
1. Whether it uses keywords that match the job posting
2. Whether the company and exact role are named
3. Formatting issues that would hurt ATS parsing
4. Whether it tells a story or just repeats my resume
5. Whether the tone is professional but human
6. The top 3 improvements

[PASTE YOUR COVER LETTER HERE]
[PASTE THE JOB DESCRIPTION HERE]`}
                />
                <CopyPrompt
                  label="Keyword Gap Analysis"
                  prompt={`Compare my resume to this job description and identify keyword gaps.

Please list:
1. Keywords in the job description NOT in my resume
2. Which missing keywords I likely have experience with and should add
3. How I could naturally add each one to my resume

[PASTE YOUR RESUME HERE]
[PASTE THE JOB DESCRIPTION HERE]`}
                />
                <div className="rounded-xl bg-tealBrand/5 border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-tealBrand flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      <strong>Pro tip:</strong> Run the Keyword Gap Analysis first, then use those results when you do the full Resume ATS Check. You will get much more targeted feedback.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <button
              onClick={() => toggle('checklist')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-tealBrand/70" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Quick Reference Checklist</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Run through this before you submit any application</p>
                </div>
              </div>
              {expandedSection === 'checklist' ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </button>
            {expandedSection === 'checklist' && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Resume</h4>
                    <ul className="space-y-2">
                      {[
                        'Simple font (Arial, Calibri, Times New Roman)',
                        'No tables, text boxes, or columns',
                        'Standard section headers used',
                        'Keywords from the job posting included',
                        'Bullets start with strong action verbs',
                        'Numbers or metrics in at least 2–3 bullets',
                        'Consistent date formatting throughout',
                        'Acronyms spelled out on first use',
                        'Saved as .docx or .pdf',
                        '1 page for students (2 pages max)',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-tealBrand flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Cover Letter</h4>
                    <ul className="space-y-2">
                      {[
                        'Company name mentioned specifically',
                        'Exact job title from posting used',
                        'Keywords woven in naturally',
                        '3–4 paragraphs, one page max',
                        'No tables, columns, or decorative formatting',
                        'Tells a story — does not just repeat the resume',
                        'Professional sign-off with full name',
                        'Proofread for grammar and spelling',
                        'Saved in same format as resume',
                        'Customized — not a copy-paste generic letter',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-tealBrand flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA — matches InterviewPrep closing teal card */}
          <div className="bg-tealBrand rounded-2xl p-8 text-center text-white">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Ready to Build Your Resume?</h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Use our Resume Builder to create an ATS-friendly resume from scratch, with field-specific examples and AI feedback built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('resume-builder')}
                className="bg-white text-tealBrand px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Resume Builder
              </button>
              <button
                onClick={() => setCurrentPage('search-guide')}
                className="bg-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 border border-white/30 transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Internship Search Guide
              </button>
            </div>
          </div>

          <ShareButtons
            url="https://morethanoneway.org"
            title="ATS Guide: Beat the System"
            description="Free ATS guide for college students — resume tips, cover letter tips, and AI review prompts."
          />

        </div>
      </section>
    </>
  );
};

export default ATSGuide;
