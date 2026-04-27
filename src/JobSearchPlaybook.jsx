import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Copy, Check, ChevronDown, ChevronUp, ExternalLink, FileText, Search, Briefcase, MessageCircle, TrendingUp, Mail, ArrowRight } from 'lucide-react';

const steps = [
{
    number: 1,
    title: "Build Your Master Resume",
    subtitle: "Do this once. Everything else builds from it.",
    icon: <FileText className="w-5 h-5" />,
    color: "teal",
    what: "Create one resume with everything in it — every job, project, skill, and achievement. Don't worry about length yet. This is your foundation. You'll tailor it down for each job later. The Resume Builder walks you through it section by section with major-specific tips, and has AI review built in so you don't need a separate prompt for this step.",
    tool: { label: "Resume Builder", page: "resume-builder" },
    prompt: null,
    example: null,
    tip: "Save this as \"Master Resume [Your Name].pdf\" — never send this version directly. It's your starting point for every application."
  },
  {
    number: 2,
    title: "Find a Job & Check Your Fit",
    subtitle: "Don't apply blindly. 60 seconds of AI analysis can save you hours.",
    icon: <Search className="w-5 h-5" />,
    color: "blue",
    what: "Found a job posting that looks interesting? Before you apply, paste your master resume and the job description into AI and ask if it's actually a good fit. Be honest about the result — if it's a 4/10, move on.",
    tool: { label: "Career Paths", page: "pivot" },
    prompt: `Here is my resume: [paste your resume]
Here is the job description: [paste job description]

1. Is this a good fit? Rate 1-10 and explain why.
2. What are my strongest qualifications for this role?
3. What gaps do I have and how should I address them?
4. Should I apply? Be honest.`,
    example: null,
    tip: "A 6/10 or higher is worth applying. Below that, your time is better spent elsewhere unless it's a dream company."
  },
  {
    number: 3,
    title: "Tailor Your Resume",
    subtitle: "Same experience, different story. This is what gets callbacks.",
    icon: <FileText className="w-5 h-5" />,
    color: "orange",
    what: "Take your master resume and adjust it specifically for this job. Add keywords from the posting, reorder bullets to match what they care about most, and cut anything irrelevant. Save the tailored version with the company and role in the filename.",
    tool: null,
    prompt: `Here is my resume: [paste your master resume]
Here is the job description: [paste job description]

Suggest 3-5 specific changes to my resume to better match this job. Focus on:
- Keywords from the job description I should include
- Bullets I should reorder or rewrite
- Skills I should emphasize or add

Keep my voice — don't make it sound robotic.`,
    example: null,
    tip: "Save each tailored resume as \"CompanyName_RoleName_Resume.pdf\" — example: \"Covestro_EngineeringIntern_Resume.pdf\". You'll thank yourself later."
  },
  {
    number: 4,
    title: "Write Your Cover Letter",
    subtitle: "Do this right after tailoring your resume — they work together.",
    icon: <FileText className="w-5 h-5" />,
    color: "purple",
    what: "Now that your resume is tailored, write a cover letter that matches it. Use your tailored resume as the source — specific examples, specific skills. A cover letter that could have been written for any company is worse than no cover letter.",
    tool: { label: "Cover Letter Generator", page: "cover-letter" },
    prompt: `Here is my tailored resume: [paste tailored resume]
Here is the job description: [paste job description]
Company name: [company]
Hiring manager name (if known): [name or "Hiring Manager"]

Write a cover letter that:
- Uses specific examples from MY resume (not generic statements)
- Addresses why I want THIS company specifically
- Is under 250 words
- Does not start with "I"
- Does not use: "passionate", "leverage", "utilize", "spearhead"
- Sounds like a real person, not AI`,
    example: null,
    tip: "The cover letter and tailored resume should feel like they're from the same person talking about the same experience. If they don't match, revise."
  },
  {
    number: 5,
    title: "Track Your Application",
    subtitle: "You will forget. Log it now.",
    icon: <Briefcase className="w-5 h-5" />,
    color: "green",
    what: "The moment you hit submit, log it. Company name, role, date applied, and most importantly — the link to the job posting. Job postings disappear. If you get an interview two weeks later and can't find the posting, you're going in blind.",
    tool: { label: "Application Tracker", page: "tracker" },
    prompt: null,
    example: null,
    tip: "Set a follow-up reminder for 1 week after applying. If you haven't heard back, that's when you send a polite follow-up email."
  },
  {
    number: 6,
    title: "Prepare for the Interview",
    subtitle: "The Covestro method — walk in knowing more than they expect.",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "teal",
    what: "Got an interview? This is where the system pays off. Paste your tailored resume and the job posting into AI and ask it to build you a full interview prep sheet. A student using this method walked into an interview knowing the names and roles of each interviewer, had STAR answers ready for 12 likely questions, knew exactly what the facility produced, and had 11 smart questions to ask. He got the offer an hour after the interview.",
    tool: { label: "Interview Prep", page: "interview-prep" },
    prompt: `Here is my resume: [paste tailored resume]
Here is the job description: [paste job description]
Company: [company name]
Interviewer names and roles (if known): [list them]
Interview date: [date]

Create a complete interview prep sheet with:
1. Company overview — what they do, what this specific location/team does, recent news
2. What each interviewer likely cares about based on their role
3. 10 most likely interview questions for this specific role
4. For each question: a STAR answer using specific examples from MY resume
5. My top 3 talking points matching my experience to this job
6. 10 smart questions I should ask them
7. Key terms or concepts I should know for this role
8. A pre-interview checklist
9. A suggested closing statement`,
    example: {
      title: "What a real prep sheet looks like",
      description: "Here's an example of what AI produced for a chemical engineering student interviewing for a process engineering co-op. This is the kind of output you're aiming for.",
      items: [
        "Company overview specific to the exact facility — not just what the company does globally",
        "Each interviewer's role and what they likely care about in a candidate",
        "A table matching every job requirement to specific resume experience, with exact language to use",
        "STAR answers for 12 likely questions using real examples from the resume",
        "11 smart questions organized by category (technical, role-specific, learning & development)",
        "Key technical terms to know (P&ID, DCS, GMP, IQ/OQ/PQ)",
        "A pre-interview checklist with specific items to review",
        "A closing statement ready to deliver"
      ]
    },
    tip: "The more detail you give AI — including interviewer names, the specific facility, and your actual resume — the better the prep sheet. Generic input gets generic output."
  },
  {
    number: 7,
    title: "Follow Up (Most Students Skip This)",
    subtitle: "One email can change everything.",
    icon: <Mail className="w-5 h-5" />,
    color: "orange",
    what: "Two things students almost never do that cost them opportunities every single time.",
    tool: null,
    prompt: null,
    example: null,
    tip: null,
    followUp: [
      {
        title: "Send a thank you within 24 hours of your interview",
        desc: "Keep it short. Thank them for their time, mention one specific thing from the conversation, and restate your interest. It takes 3 minutes and most candidates don't do it.",
        prompt: `I just interviewed for [role] at [company].
The interviewers were: [names and roles]
One specific thing we discussed that I found interesting: [detail]

Write a brief, genuine thank you email (under 150 words) that:
- Thanks them by name
- References that specific conversation detail
- Restates my interest without being desperate
- Sounds like a real person`
      },
      {
        title: "If you haven't heard back in a week, send this",
        desc: "Most students either do nothing or send a desperate \"just checking in\" email. Neither works. This approach does.",
        realStory: "A student interviewed, didn't hear back for a week, and sent a polite email saying he assumed the position had been filled and asked if they'd keep his resume on file. He got a call the next day. They were still interviewing — could he come in at 3pm? He did. Got the offer at 4pm.",
        prompt: `Write a brief, professional follow-up email for someone who interviewed for [role] at [company] one week ago and hasn't heard back.

The email should:
- Politely assume the position may have been filled
- Express continued interest in the company
- Ask if they'd keep the resume on file for future openings
- Be under 100 words
- Sound genuine, not desperate`
      }
    ]
  },
  {
    number: 8,
    title: "Find Your Strongest Resume",
    subtitle: "After 5+ applications, let AI tell you what's working.",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "blue",
    what: "After you've tailored your resume for several jobs, you'll have multiple versions. AI can look across all of them and tell you which version is strongest — and what patterns consistently work for you.",
    tool: null,
    prompt: `I have applied to [X] jobs and created these tailored resume versions:
[list the roles/companies]

Here are the different versions: [paste each one]

Based on these versions:
1. Which resume is strongest overall and why?
2. What patterns work best across all of them?
3. What should my new master resume look like based on what's working?
4. What should I stop doing?`,
    example: null,
    tip: "Do this after every 5-10 applications. Your master resume should get stronger over time, not stay the same."
  }
];

const colorMap = {
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-800', icon: 'text-teal-600', button: 'bg-[#006581] hover:bg-[#005470]' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', icon: 'text-blue-600', button: 'bg-blue-700 hover:bg-blue-800' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800', icon: 'text-orange-600', button: 'bg-orange-500 hover:bg-orange-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800', icon: 'text-purple-600', button: 'bg-purple-600 hover:bg-purple-700' },
  green: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800', icon: 'text-green-600', button: 'bg-green-700 hover:bg-green-800' },
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy}
      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors">
      {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy prompt</>}
    </button>
  );
};

const StepCard = ({ step, isUnlocked, isActive, onActivate, setCurrentPage }) => {
  const colors = colorMap[step.color];

return (
    <div className={`rounded-2xl border ${isUnlocked ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'} shadow-sm transition-all`}>
      {/* Step header */}
      <button
        onClick={onActivate}
        className="w-full text-left p-6 flex items-start gap-4"
        disabled={!isUnlocked}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isUnlocked ? colors.bg : 'bg-gray-100'}`}>
          <span className={`font-bold text-sm ${isUnlocked ? colors.icon : 'text-gray-400'}`}>{step.number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-bold text-lg ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</h3>
            {!isUnlocked && <span className="text-xs text-gray-400 font-medium">Complete previous step first</span>}
          </div>
          <p className={`text-sm mt-0.5 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>{step.subtitle}</p>
        </div>
        {isUnlocked && (
          <div className="flex-shrink-0 mt-1">
            {isActive ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </div>
        )}
      </button>

      {/* Step content */}
      {isActive && isUnlocked && (
        <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-5">

          {/* What to do */}
          <p className="text-gray-700 leading-relaxed text-base">{step.what}</p>

          {/* Tool link - now BEFORE the prompt */}
          {step.tool && (
            <button
              onClick={() => setCurrentPage(step.tool.page)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors ${colors.button}`}>
              {step.tool.label} <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Follow-up section (Step 7 only) */}
          {step.followUp && (
            <div className="space-y-4">
              {step.followUp.map((item, idx) => (
                <div key={idx} className={`rounded-xl border ${colors.border} ${colors.bg} p-4`}>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{item.desc}</p>
                  {item.realStory && (
                    <div className="bg-white rounded-lg border border-orange-200 p-3 mb-3">
                      <p className="text-xs font-semibold text-orange-700 mb-1">Real story</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.realStory}</p>
                    </div>
                  )}
                  <div className="bg-white rounded-lg border border-gray-200 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-500">AI PROMPT</p>
                      <CopyButton text={item.prompt} />
                    </div>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">{item.prompt}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI Prompt */}
          {step.prompt && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">AI Prompt</p>
                  <p className="text-xs text-gray-500 mt-0.5">Copy and paste into any AI tool you use</p>
                </div>
                <CopyButton text={step.prompt} />
              </div>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">{step.prompt}</pre>
            </div>
          )}

          {/* Real example */}
          {step.example && (
            <div className={`rounded-xl border ${colors.border} ${colors.bg} p-4`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">What good output looks like</p>
              <p className="text-sm text-gray-700 mb-3">{step.example.description}</p>
              <ul className="space-y-1.5">
                {step.example.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${colors.icon}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tip */}
          {step.tip && (
            <div className="flex items-start gap-2 bg-gray-50 rounded-xl border border-gray-200 p-3">
              <span className="text-base flex-shrink-0">💡</span>
              <p className="text-xs text-gray-600 leading-relaxed">{step.tip}</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

const JobSearchPlaybook = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [allUnlocked, setAllUnlocked] = useState(false);

  const isUnlocked = (stepNumber) => {
    if (allUnlocked) return true;
    if (stepNumber === 1) return true;
    return completedSteps.includes(stepNumber - 1);
  };

  const markComplete = (stepNumber) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    if (stepNumber < steps.length) {
      setActiveStep(stepNumber + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>The Job Search Playbook | MoreThanOneWay.org</title>
        <meta name="description" content="A proven step-by-step job search system. Build your resume, tailor applications, prep for interviews, and follow up the right way. How to actually get a job." />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">

          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-2">
              The Job Search <span className="text-[#006581]">Playbook</span>
            </h1>
            <p className="text-lg text-gray-500 italic mb-6">How to actually get a job</p>
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              This isn't generic advice. It's a real system — built from actually searching for internships and co-ops — that uses AI as a thinking partner at every step. Follow it in order the first time through.
            </p>

            {/* Unlock all button */}
            {!allUnlocked && (
              <button
                onClick={() => setAllUnlocked(true)}
                className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors">
                Already done some of this? Unlock all steps →
              </button>
            )}
            {allUnlocked && (
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-sm text-green-800">
                <CheckCircle className="w-4 h-4" /> All steps unlocked — jump to any step
              </div>
            )}
          </div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto space-y-4">
            {steps.map((step) => (
              <div key={step.number}>
                <StepCard
                  step={step}
                  isUnlocked={isUnlocked(step.number)}
                  isActive={activeStep === step.number}
                  onActivate={() => setActiveStep(activeStep === step.number ? null : step.number)}
                  setCurrentPage={setCurrentPage}
                />
                {/* Mark complete button */}
                {activeStep === step.number && isUnlocked(step.number) && !completedSteps.includes(step.number) && (
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => markComplete(step.number)}
                      className="flex items-center gap-2 text-sm font-semibold text-[#006581] hover:text-[#005470] transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      {step.number < steps.length ? "Mark complete & go to next step" : "Mark complete"}
                    </button>
                  </div>
                )}
                {completedSteps.includes(step.number) && (
                  <div className="flex justify-end mt-2">
                    <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                      <CheckCircle className="w-4 h-4" /> Completed
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="max-w-4xl mx-auto mt-12 rounded-3xl bg-[#006581] text-white p-10 text-center">
            <h3 className="text-2xl font-semibold mb-3">The system works if you work it.</h3>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              Most students apply to jobs the same way everyone else does and wonder why they get the same results. This approach is different. It takes more effort per application — and gets dramatically better results.
            </p>
            <button
              onClick={() => setCurrentPage('tracker')}
              className="bg-white text-[#006581] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Start tracking your applications →
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default JobSearchPlaybook;