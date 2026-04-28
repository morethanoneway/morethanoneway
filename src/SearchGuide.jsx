import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Heart, Menu, X, ChevronDown, ChevronUp,
  Download, CheckSquare, Square, Phone, Calendar,
  Lightbulb, AlertCircle, Target, Search, FileText, Mail, MessageCircle, Sparkles,
  MessageSquare, TrendingUp, ClipboardList, Send, Mic, HeartHandshake, CalendarDays, HeartPulse
} from 'lucide-react';

// Recruiting Timeline Data
const RECRUITING_SECTIONS = [
  {
    key: "springSummerCoop",
    title: "Spring/Summer Co-ops (January - June)",
    recruiting: "August - November",
    bullets: [
      "Applications begin as early as August; interviews often run September - October.",
      "Many employers make offers by late November for January start dates.",
    ],
    duration: "Mid-January - End of June (4-6 months)",
    tip: "Start the search as fall semester begins - this cycle moves fast and can be very competitive.",
    earliestPostings: "August",
    termRange: "Jan - Jun",
  },
  {
    key: "summerInternship",
    title: "Summer Internships (May - August)",
    recruiting: "September - February",
    bullets: [
      "Large companies post September - November (many early deadlines).",
      "Smaller companies and late openings appear January - March.",
    ],
    duration: "May - August (10-12 weeks)",
    tip: "Apply early (by November) for competitive programs, but keep checking into spring.",
    earliestPostings: "September",
    termRange: "May - Aug",
  },
  {
    key: "summerWinterCoop",
    title: "Summer/Winter Co-ops (July - December)",
    recruiting: "March - August (some post the prior fall)",
    bullets: [
      "Early listings for next year can appear September - November.",
      "Peak recruiting typically runs March - May.",
    ],
    duration: "August - Early December (4-6 months)",
    tip: "Stay alert for early fall postings - larger employers often recruit far ahead.",
    earliestPostings: "September (prior fall)",
    termRange: "Jul - Dec",
  },
];

const MONTH_TIPS = {
  January: {
    title: "Right Now (January)",
    lines: [
      "Spring/Summer co-ops: Last-minute roles may pop up - check daily.",
      "Summer internships: Peak season (now - February), apply broadly and early.",
      "Summer/Winter co-ops: Fewer listings now; expect ramp-up by March.",
    ],
  },
  February: {
    title: "Right Now (February)",
    lines: [
      "Spring/Summer co-ops: Late openings and backfills - move fast.",
      "Summer internships: Peak window closing soon - submit remaining apps.",
      "Summer/Winter co-ops: Hiring begins ramping next month; prep materials now.",
    ],
  },
  March: {
    title: "Right Now (March)",
    lines: [
      "Summer internships: Still active; keep applying and interviewing.",
      "Summer/Winter co-ops: Peak recruiting starting - search and apply weekly.",
      "Line up references; practice interviews; refresh LinkedIn.",
    ],
  },
  April: {
    title: "Right Now (April)",
    lines: [
      "Summer internships: Many teams finalizing; smaller orgs still posting.",
      "Summer/Winter co-ops: Peak season; prioritize applications now.",
      "Confirm housing/transport plans for upcoming terms.",
    ],
  },
  May: {
    title: "Right Now (May)",
    lines: [
      "Summer internships: Late postings/rolling offers - watch job boards daily.",
      "Summer/Winter co-ops: Peak recruiting continues - target March-May lead times.",
      "Set up a simple application tracker (sheet/Notion).",
    ],
  },
  June: {
    title: "Right Now (June)",
    lines: [
      "Summer internships: Some late starts; consider research/projects if not placed.",
      "Summer/Winter co-ops: Early postings for next cycle may appear soon.",
      "Update resume with new coursework/projects.",
    ],
  },
  July: {
    title: "Right Now (July)",
    lines: [
      "Summer/Winter co-ops: Terms begin; continue applying for August/September starts.",
      "Prep for early fall recruiting (resume refresh, references, portfolio).",
      "Draft tailored cover letters for target employers.",
    ],
  },
  August: {
    title: "Right Now (August)",
    lines: [
      "Spring/Summer co-ops: EARLY postings begin - start searching and applying.",
      "Summer internships: Early large-company postings are around the corner.",
      "Set alerts on school board + LinkedIn for target roles.",
    ],
  },
  September: {
    title: "Right Now (September)",
    lines: [
      "Spring/Summer co-ops: Recruiting is hot now through November - apply weekly.",
      "Summer internships: Major companies start posting; watch early deadlines.",
      "Attend career fairs; schedule mock interviews.",
    ],
  },
  October: {
    title: "Right Now (October)",
    lines: [
      "Spring/Summer co-ops: PRIME time - many offers made by late November.",
      "Summer internships: Early/priority programs live; apply steadily.",
      "Summer/Winter co-ops: Early fall postings exist - more ramping by March.",
    ],
  },
  November: {
    title: "Right Now (November)",
    lines: [
      "Spring/Summer co-ops: Finalizing - get apps/interviews in ASAP.",
      "Summer internships: Continue applying; track December launches.",
      "Follow up on submitted applications within 10 - 14 days.",
    ],
  },
  December: {
    title: "Right Now (December)",
    lines: [
      "Spring/Summer co-ops: Some late openings; check daily.",
      "Summer internships: Peak begins soon (Dec- Feb), ready your materials.",
      "Polish resume/portfolio; practice interview stories (STAR).",
    ],
  },
};

// Checklist Items Data
const CHECKLIST_ITEMS = [
  {
    phase: "Phase 1: Prepare (Before You Apply)",
    sections: [
      {
        title: "Week 1-2: Self-Assessment",
        items: [
          { id: "p1-skills", label: "List out your skills (even if they feel basic)" },
          { id: "p1-interests", label: "Write down what actually interests you (not what you think should interest you)" },
          { id: "p1-career-tool", label: "Use our Career Paths tool to see traditional + alternative options" },
          { id: "p1-positions", label: "Decide which 2-3 types of positions to pursue" }
        ]
      },
      {
        title: "Week 3: Resume & Materials",
        items: [
          { id: "p1-resume", label: "Create or update your resume (use a template if needed)" },
          { id: "p1-translate", label: "Translate your experience into professional language (class projects = real projects)" },
          { id: "p1-review", label: "Get resume reviewed at career center or by a friend" },
          { id: "p1-cover", label: "Prepare 1-2 cover letter templates you can customize" }
        ]
      },
      {
        title: "Week 4: Set Up Systems",
        items: [
          { id: "p1-tracker", label: "Set up application tracker (use ours or a spreadsheet)" },
          { id: "p1-goals", label: "Set realistic weekly goals (2-5 applications per week)" },
          { id: "p1-calendar", label: "Block out 'application time' on your calendar (treat it like a class)" },
          { id: "p1-mental-health", label: "Identify who you'll talk to when you feel discouraged (because you will, and that's normal)" }
        ]
      }
    ],
    tip: "Feeling overwhelmed before you even start? That's normal. This process is hard. Take it one step at a time."
  },
  {
    phase: "Phase 2: Search & Research",
    sections: [
      {
        title: "Finding Opportunities",
        items: [
          { id: "p2-find", label: "Find 10-15 Opportunities (Indeed, LinkedIn, Handshake, Wellfound, Built In, company websites)" }
        ],
        bullets: [
          "Filter by 'entry level' and your location/remote",
          "Include traditional AND alternative paths",
          "Don't just apply to big-name companies"
        ]
      },
      {
        title: "Researching Companies",
        items: [
          { id: "p2-research", label: "Research Each Company (10 min each)" }
        ],
        bullets: [
          "Glassdoor reviews - Is it a good place to work? How do they treat interns?",
          "Company website - What do they do? What's their mission?",
          "LinkedIn - Do they have current interns? Can you message one?",
          "Is this somewhere you actually want to work?"
        ]
      }
    ],
    tip: "Small companies (under 100 employees) often provide better learning experiences, more responsibility, and are easier to get into."
  },
  {
    phase: "Phase 3: Apply Strategically",
    sections: [
      {
        title: "Customize Each Application",
        items: [
          { id: "p3-keywords", label: "Change 2-3 lines in resume to include keywords from job posting" },
          { id: "p3-cover-letter", label: "Personalize cover letter with company-specific details (if required)" },
          { id: "p3-thoughtful", label: "Answer application questions thoughtfully, not generically" }
        ],
        note: "Don't spend more than 20-30 minutes per application. Find the balance."
      },
      {
        title: "Track Everything",
        items: [
          { id: "p3-log", label: "Log: Company, position, date applied, application deadline" },
          { id: "p3-reminder", label: "Set reminder to follow up in 2 weeks (if no response)" },
          { id: "p3-celebrate", label: "Celebrate small wins: 'I submitted one - that's progress!'" }
        ]
      }
    ],
    tip: "10-20% response rate is NORMAL. You won't hear back from most applications. This is not personal. The system is broken, not you."
  },
  {
    phase: "Phase 4: Interview & Follow-Up",
    sections: [
      {
        title: "Before the Interview",
        items: [
          { id: "p4-research", label: "Research company deeply (30+ minutes) - mission, products, recent news" },
          { id: "p4-glassdoor", label: "Check Glassdoor for actual interview questions they've asked" },
          { id: "p4-star", label: "Prepare STAR stories (Situation, Task, Action, Result) from your experience" },
          { id: "p4-questions", label: "Prepare questions to ask them (shows genuine interest)" },
          { id: "p4-practice", label: "Practice - with a friend, career center, or in front of a mirror" }
        ]
      },
      {
        title: "After the Interview",
        items: [
          { id: "p4-thank-you", label: "Send thank-you email within 24 hours - brief, genuine, mention something specific" },
          { id: "p4-follow-up", label: "Add follow-up date to tracker (usually 1-2 weeks)" },
          { id: "p4-keep-applying", label: "Keep applying elsewhere - don't put all eggs in one basket" }
        ]
      }
    ],
    tip: "Interviews are a two-way street. They're evaluating you, but you're also evaluating them."
  }
];

// Generate printable HTML
const generatePrintableHTML = (checkedItems, showProgress) => {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Job Search Checklist - MoreThanOneWay.org</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 { font-size: 24pt; margin-bottom: 10px; }
        h2 { 
          font-size: 16pt; 
          color: #2563eb; 
          margin-top: 20px; 
          margin-bottom: 10px;
          page-break-after: avoid;
        }
        h3 { 
          font-size: 12pt; 
          margin-top: 15px; 
          margin-bottom: 8px;
          page-break-after: avoid;
        }
        .subtitle { color: #666; margin-bottom: 30px; }
        ul { list-style: none; padding: 0; margin: 0; }
        li { 
          display: flex; 
          align-items: flex-start; 
          margin-bottom: 8px;
          page-break-inside: avoid;
        }
        .checkbox { 
          width: 14px; 
          height: 14px; 
          border: 2px solid #666; 
          margin-right: 10px;
          margin-top: 2px;
          flex-shrink: 0;
          ${showProgress ? 'position: relative;' : ''}
        }
       ${showProgress ? '.checkbox.checked::after { content: "✓"; position: absolute; top: -2px; left: 1px; font-size: 14px; color: #16a34a; }' : ''}

        .label { font-size: 11pt; line-height: 1.4; }
        .bullets { 
          margin-left: 30px; 
          margin-top: 5px;
          font-size: 9pt;
          color: #666;
        }
        .bullets li { margin-bottom: 3px; }
        .note { 
          margin-left: 30px; 
          margin-top: 5px;
          font-size: 9pt;
          font-style: italic;
          color: #666;
        }
        .tip-box {
          background: #fef3c7;
          border: 1px solid #fbbf24;
          padding: 10px;
          margin: 15px 0;
          border-radius: 4px;
          font-size: 10pt;
          page-break-inside: avoid;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ccc;
          text-align: center;
          font-size: 9pt;
          color: #666;
        }
        .phase-section { margin-bottom: 30px; }
        @media print {
          body { padding: 10px; }
        }
      </style>
    </head>
    <body>
      <h1>Job Search Checklist</h1>
      <p class="subtitle">From MoreThanOneWay.org</p>
  `;

  CHECKLIST_ITEMS.forEach(phase => {
    html += `<div class="phase-section">`;
    html += `<h2>${phase.phase}</h2>`;

    phase.sections.forEach(section => {
      html += `<h3>${section.title}</h3>`;
      html += `<ul>`;

      section.items.forEach(item => {
        const isChecked = showProgress && checkedItems[item.id];
        html += `<li>`;
        html += `<span class="checkbox${isChecked ? ' checked' : ''}"></span>`;
        html += `<span class="label">${item.label}</span>`;
        html += `</li>`;
      });

      html += `</ul>`;

      if (section.bullets) {
        html += `<ul class="bullets">`;
        section.bullets.forEach(bullet => {
          html += `<li>• ${bullet}</li>`;
        });
        html += `</ul>`;
      }

      if (section.note) {
        html += `<p class="note">${section.note}</p>`;
      }
    });

    if (phase.tip) {
      html += `<div class="tip-box"><strong>💡 Tip:</strong> ${phase.tip}</div>`;

    }

    html += `</div>`;
  });

  html += `
      <div class="footer">
        <p>Crisis Support: Call or text 988 | Text HOME to 741741</p>
        <p>© 2025 MoreThanOneWay.org</p>
      </div>
    </body>
    </html>
  `;

  return html;
};

// Printable Checklist Modal Component
const PrintableChecklistModal = ({ isOpen, onClose, checkedItems }) => {
  const handlePrint = (withProgress) => {
    const html = generatePrintableHTML(checkedItems, withProgress);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();

    // Trigger print after content loads
    printWindow.onload = () => {
      printWindow.print();
    };

    // Close modal after opening print window
    onClose();
  };

  if (!isOpen) return null;

  return (
  <> 
    <Helmet>
   <title>Internship Search Guide for College Students | MoreThanOneWay.org</title>
   <meta name="description" content="Step-by-step internship search guide for college students. Learn where to look, how to apply, and how to stand out — even with no experience." />
   <meta name="keywords" content="how to find internships, internship search guide, college job search tips, apply for internships, no experience internship" />
   <meta property="og:title" content="Internship Search Guide | MoreThanOneWay.org" />
   <meta property="og:description" content="Step-by-step guide to finding internships as a college student — even with no experience." />
    </Helmet>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Print Job Search Checklist</h2>
            <p className="text-gray-600 text-sm mt-1">Choose which version you want to print</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <button
            onClick={() => handlePrint(false)}
            className="w-full bg-tealBrand text-white px-6 py-4 rounded-lg hover:bg-tealBrand/50 font-semibold text-left"
          >
            <Download className="w-5 h-5 inline mr-2" />
            Print Blank Checklist
            <p className="text-sm font-normal mt-1 ml-7">All checkboxes empty - perfect for starting fresh</p>
          </button>

          <button
            onClick={() => handlePrint(true)}
            className="w-full bg-orange-400 text-white px-6 py-4 rounded-lg hover:bg-orange-600 font-semibold text-left"
          >
            <Download className="w-5 h-5 inline mr-2" />
            Print My Progress
            <p className="text-sm font-normal mt-1 ml-7">Shows checkmarks for items you've completed</p>
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            A new window will open with your checklist, then print automatically
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

// Interactive Checkbox Component
const CheckboxItem = ({ id, label, checked, onChange }) => (
  <li className="flex items-start">
    <button
      onClick={() => onChange(id)}
      className="flex-shrink-0 mt-0.5"
    >
      {checked ? (
        <CheckSquare className="w-5 h-5 text-green-600" />
      ) : (
        <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
      )}
    </button>
    <span className={`ml-2 ${checked ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
      {label}
    </span>
  </li>
);

const SearchGuide = ({ onBack, setCurrentPage }) => {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [showSaveNotice, setShowSaveNotice] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const supportCloseTimer = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mtow-search-guide-progress');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(checkedItems).length > 0) {
      localStorage.setItem('mtow-search-guide-progress', JSON.stringify(checkedItems));
      setShowSaveNotice(true);
      const timer = setTimeout(() => setShowSaveNotice(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [checkedItems]);

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const togglePhase = (phase) => {
    setExpandedPhase(expandedPhase === phase ? null : phase);
  };

  const clearProgress = () => {
    if (window.confirm('Are you sure you want to clear all your progress? This cannot be undone.')) {
      setCheckedItems({});
      localStorage.removeItem('mtow-search-guide-progress');
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  // Get current month for dynamic tips
  const now = new Date();
  const currentMonth = now.toLocaleString("en-US", { month: "long" });
  const monthTip = MONTH_TIPS[currentMonth];

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">

        {/* Print Modal */}
        <PrintableChecklistModal
          isOpen={showPrintModal}
          onClose={() => setShowPrintModal(false)}
          checkedItems={checkedItems}
        />

        {/* Main Content */}
        <header className="text-center max-w-5xl mx-auto pt-2 mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Search{" "}
            <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              Guide
            </span>
          </h1>

          <p className="mt-3 text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
            A realistic job-search roadmap — built for how things actually work.
          </p>
         <p className="mt-2 text-base text-gray-700 max-w-3xl mx-auto">
  No hacks, no quick wins. Just a process that holds up when the market is rough.
</p>


          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">

            <button
              onClick={() => setShowPrintModal(true)}
               className="bg-[#006581] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#005570] hover:shadow-sm transition inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Print checklist
            </button>

            <button
              onClick={() => setCurrentPage?.("find-internships")}
              className="px-5 py-3 rounded-xl border border-gray-200 bg-white font-semibold text-gray-900 hover:bg-gray-100 transition"
            >
              Find internships
            </button>

          </div>
          <p className="mt-2 text-sm md:text-base text-gray-500">
            Progress saves in your browser. Print it if you want a backup.
          </p>
        </header>
        {/* Header */}


        {/* Jump tiles (home-style) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {[
            {
              id: "phase1",
              title: "Phase 1: Prepare",
              desc: "Get your resume + basics ready so you’re not scrambling later.",
              Icon: ClipboardList,
              kind: "phase",
            },
            {
              id: "phase2",
              title: "Phase 2: Search",
              desc: "Find roles faster with better keywords, filters, and targets.",
              Icon: Search,
              kind: "phase",
            },
            {
              id: "phase3",
              title: "Phase 3: Apply",
              desc: "Apply strategically — fewer spam apps, more real callbacks.",
              Icon: Send,
              kind: "phase",
            },
            {
              id: "phase4",
              title: "Phase 4: Interview",
              desc: "Prep, follow up, and show you’re solid without being scripted.",
              Icon: Mic,
              kind: "phase",
            },
            {
              id: "phase5",
              title: "Phase 5: Handle Rejection",
              desc: "Protect your momentum and mental health when things don’t work out.",
              Icon: HeartPulse,
              kind: "phase",
            },
            {
              id: "timeline",
              title: "Timeline by Year",
              desc: "Know what to do (and when) based on your year in school.",
              Icon: CalendarDays,
              kind: "scroll",
            },

          ].map(({ id, title, desc, Icon, kind }) => (
            <button
              key={id}
              onClick={() => {
                if (kind === "phase") togglePhase(id);

                const el =
                  kind === "phase"
                    ? document.getElementById(`${id}-section`)
                    : document.getElementById(`${id}-section`);

                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="
        group w-full text-left
        rounded-2xl bg-[#006581] text-white
        p-6 shadow-sm
        hover:shadow-lg 
        hover:-translate-y-1
        hover:bg-[#00465a]
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-white/20
      "
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-xl ">
                  <Icon className="h-6 w-6 text-white" />
                </span>

                <div className="min-w-0">
                  <div className="text-lg font-bold leading-snug">{title}</div>
                  <p className="mt-2 text-sm text-white/85 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>


        {/* Recruiting Timeline Section */}
        <section id="timeline" className="mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Calendar className="w-7 h-7 mr-2 text-teal-700" />
              Co-op & Internship Recruiting Timeline
            </h2>
            <p className="text-gray-600 mb-6">
              Don't miss your window - many employers hire months in advance. Use this guide to plan when to search, apply, and interview.
            </p>

            {/* Current Month Callout */}
            {monthTip && (
              <div className="rounded-2xl border border-[#006581]/30 bg-[#006581]/5 p-6">
                <span className="inline-flex items-center rounded-full bg-[#006581]/10 text-[#006581] px-3 py-1 text-xs font-semibold ring-1 ring-[#006581]/20">
                  Current focus
                </span>
                <h4 className="text-lg font-bold text-grey-600 mb-2">{monthTip.title}</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                  {monthTip.lines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timeline Cards */}
            <div className="mt-5 space-y-4">
              {RECRUITING_SECTIONS.map((section) => (
                <div key={section.key} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{section.title}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Recruiting Period:</span> {section.recruiting}
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        {section.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Duration:</span> {section.duration}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Tip:</span> {section.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Table */}
            <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Work Term</th>
                    <th className="px-4 py-3 font-semibold">Recruiting Window</th>
                    <th className="px-4 py-3 font-semibold">Earliest Postings</th>
                  </tr>
                </thead>
                <tbody>
                  {RECRUITING_SECTIONS.map((s) => (
                    <tr key={s.key} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-800">{s.title}</td>
                      <td className="px-4 py-3 text-gray-600">{s.termRange}</td>
                      <td className="px-4 py-3 text-gray-600">{s.recruiting}</td>
                      <td className="px-4 py-3 text-gray-600">{s.earliestPostings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* When YOU Should Start */}
            <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">

              <h4 className="font-bold text-lg mb-3">When YOU Should Start Applying:</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800">Freshmen & Sophomores:</p>
                  <p className="text-sm text-gray-700">Start looking in <strong>August-September</strong> if possible, but January-February works too. Don't stress if you don't get one - building skills through projects or a regular job is valuable.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Juniors & Seniors:</p>
                  <p className="text-sm text-gray-700">Start <strong>as early as August</strong>, no later than December. This is your critical year. Apply to 40-60 positions minimum across all three position types.</p>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">

              <p className="font-bold text-grey-800 mb-2">⚠️ Critical Info About Co-ops:</p>
              <p className="text-sm text-grey-700">
                During co-ops (4-6 months), you're still technically enrolled as a student. You keep university access (library, gym, resources) AND your student loans stay deferred - repayment doesn't start! ALWAYS double-check with your university's Career Center or Co-op Office, as they may have specific eligibility criteria and paperwork you'll need to complete.
              </p>
            </div>

          </div>
        </section>

        {/* The 5 Phases */}
        <div className="space-y-6">

          {/* PHASE 1: PREPARE */}
          <div id="phase1-section" className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase1')}
              className="w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all p-6 md:p-7 flex items-start justify-between gap-6 group"
            >
              {/* LEFT: accent + text */}
              <div className="flex items-start gap-4 min-w-0">
                {/* left accent bar */}
                <span className="mt-1 h-12 w-1.5 rounded-full bg-tealBrand/80" />

                <div className="min-w-0">
                  <div className="text-lg md:text-xl font-extrabold text-gray-900">
                    Phase 1: Prepare (Before You Apply)
                  </div>
                  <div className="mt-1 text-sm md:text-base text-gray-600">
                    Week 1–4 <span className="text-gray-300 mx-2">|</span> Get your materials and systems ready
                  </div>
                </div>
              </div>

              <ChevronDown className="h-6 w-6 text-bg-tealBrand/80" strokeWidth={1.75} />

            </button>

            {expandedPhase === 'phase1' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Week 1-2: Self-Assessment</h3>
                  <ul className="space-y-2">
                    <CheckboxItem id="p1-skills" label="List out your skills (even if they feel basic)" checked={checkedItems['p1-skills']} onChange={toggleItem} />
                    <CheckboxItem id="p1-interests" label="Write down what actually interests you (not what you think should interest you)" checked={checkedItems['p1-interests']} onChange={toggleItem} />
                    <CheckboxItem id="p1-career-tool" label="Use our Career Paths tool to see traditional + alternative options" checked={checkedItems['p1-career-tool']} onChange={toggleItem} />
                    <CheckboxItem id="p1-positions" label="Decide which 2-3 types of positions to pursue" checked={checkedItems['p1-positions']} onChange={toggleItem} />
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Week 3: Resume & Materials</h3>
                  <ul className="space-y-2">
                    <CheckboxItem id="p1-resume" label="Create or update your resume (use a template if needed)" checked={checkedItems['p1-resume']} onChange={toggleItem} />
                    <CheckboxItem id="p1-translate" label="Translate your experience into professional language (class projects = real projects)" checked={checkedItems['p1-translate']} onChange={toggleItem} />
                    <CheckboxItem id="p1-review" label="Get resume reviewed at career center or by a friend" checked={checkedItems['p1-review']} onChange={toggleItem} />
                    <CheckboxItem id="p1-cover" label="Prepare 1-2 cover letter templates you can customize" checked={checkedItems['p1-cover']} onChange={toggleItem} />
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Week 4: Set Up Systems</h3>
                  <ul className="space-y-2">
                    <CheckboxItem id="p1-tracker" label="Set up application tracker (use ours or a spreadsheet)" checked={checkedItems['p1-tracker']} onChange={toggleItem} />
                    <CheckboxItem id="p1-goals" label="Set realistic weekly goals (2-5 applications per week)" checked={checkedItems['p1-goals']} onChange={toggleItem} />
                    <CheckboxItem id="p1-calendar" label="Block out 'application time' on your calendar (treat it like a class)" checked={checkedItems['p1-calendar']} onChange={toggleItem} />
                    <CheckboxItem id="p1-mental-health" label="Identify who you'll talk to when you feel discouraged (because you will, and that's normal)" checked={checkedItems['p1-mental-health']} onChange={toggleItem} />
                  </ul>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">

                  <p className="font-semibold flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Mental Health Check-In
                  </p>
                  <p className="text-sm text-gray-700 mt-2">Feeling overwhelmed before you even start? That's normal. This process is hard. Take it one step at a time. You don't have to do everything in one week.</p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 2: SEARCH & RESEARCH */}
          <div id="phase2-section" className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase2')}
              className="w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all p-6 md:p-7 flex items-start justify-between gap-6 group"
            >
              {/* LEFT: accent + text */}
              <div className="flex items-start gap-4 min-w-0">
                {/* left accent bar */}
                <span className="mt-1 h-12 w-1.5 rounded-full bg-tealBrand/80" />

                <div className="min-w-0">
                  <div className="text-lg md:text-xl font-extrabold text-gray-900">
                    Phase 2: Search & Research
                  </div>
                  <div className="mt-1 text-sm md:text-base text-gray-600">
                    Ongoing <span className="text-gray-300 mx-2">|</span> Find opportunities and research companies
                  </div>
                </div>
              </div>
              <ChevronDown className="h-6 w-6 text-bg-tealBrand/80" strokeWidth={1.75} />

            </button>
            {expandedPhase === 'phase2' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <ul className="space-y-3">
                    <CheckboxItem id="p2-find" label="Step 1: Find 10-15 Opportunities" checked={checkedItems['p2-find']} onChange={toggleItem} />
                  </ul>
                  <div className="ml-8 mt-2">
                    <p className="text-gray-700 mb-2 text-sm">Search on:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Indeed</strong> - Filter by "entry level" and your location/remote</li>
                      <li>• <strong>LinkedIn</strong> - Use "Easy Apply" filter to save time</li>
                      <li>• <strong>Handshake</strong> - Your school's job board (free access)</li>
                      <li>• <strong>Wellfound</strong> - Startup jobs (often less competitive)</li>
                      <li>• <strong>Built In</strong> - Tech companies by city</li>
                      <li>• <strong>Company websites</strong> - Check "Careers" pages directly</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2 italic">Include traditional AND alternative paths. Don't just apply to big-name companies.</p>
                  </div>
                </div>

                <div>
                  <ul className="space-y-3">
                    <CheckboxItem id="p2-research" label="Step 2: Research Each Company (10 min each)" checked={checkedItems['p2-research']} onChange={toggleItem} />
                  </ul>
                  <div className="ml-8 mt-2">
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• <strong>Glassdoor reviews</strong> - Is it a good place to work? How do they treat interns?</li>
                      <li>• <strong>Company website</strong> - What do they do? What's their mission? Does it sound interesting?</li>
                      <li>• <strong>LinkedIn</strong> - Do they have current interns? Can you message one?</li>
                      <li>• Is this somewhere you actually want to work? (It's okay if it's just "fine")</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2 mt-4">Step 3: Prioritize Your List</h3>
                  <div className="space-y-2 text-gray-700 text-sm ml-4">
                    <p><strong>"Dream" companies</strong> - Reach, low odds, apply anyway (FAANG, top companies)</p>
                    <p><strong>"Target" companies</strong> - Good fit, realistic chance (mid-size companies, good reviews)</p>
                    <p><strong>"Safety" companies</strong> - Smaller, less competitive (startups, local companies)</p>
                    <p className="text-sm text-green-700 font-semibold mt-2">Apply to all three types. Diversify your odds.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">

                  <p className="font-semibold flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Pro Tip
                  </p>
                  <p className="text-sm text-gray-700 mt-2">Small companies (under 100 employees) often provide better learning experiences, more responsibility, and are easier to get into.</p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 3: APPLY STRATEGICALLY */}
          <div id="phase3-section" className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase3')}
              className="w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all p-6 md:p-7 flex items-start justify-between gap-6 group"
            >
              {/* LEFT: accent + text */}
              <div className="flex items-start gap-4 min-w-0">
                {/* left accent bar */}
                <span className="mt-1 h-12 w-1.5 rounded-full bg-tealBrand/80" />

                <div className="min-w-0">
                  <div className="text-lg md:text-xl font-extrabold text-gray-900">
                    Phase 3: Apply Strategically
                  </div>
                  <div className="mt-1 text-sm md:text-base text-gray-600">
                    Ongoing <span className="text-gray-300 mx-2">|</span> Submit quality applications consistently
                  </div>
                </div>
              </div>
              <ChevronDown className="h-6 w-6 text-bg-tealBrand/80" strokeWidth={1.75} />
            </button>

            {expandedPhase === 'phase3' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Customize Each Application</h3>
                  <ul className="space-y-2">
                    <CheckboxItem id="p3-keywords" label="Change 2-3 lines in resume to include keywords from job posting" checked={checkedItems['p3-keywords']} onChange={toggleItem} />
                    <CheckboxItem id="p3-cover-letter" label="Personalize cover letter with company-specific details (if required)" checked={checkedItems['p3-cover-letter']} onChange={toggleItem} />
                    <CheckboxItem id="p3-thoughtful" label="Answer application questions thoughtfully, not generically" checked={checkedItems['p3-thoughtful']} onChange={toggleItem} />
                  </ul>
                  <p className="text-sm text-gray-600 mt-2 italic ml-7">Don't spend more than 20-30 minutes per application. Find the balance.</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Track Everything</h3>
                  <ul className="space-y-2">
                    <CheckboxItem id="p3-log" label="Log: Company, position, date applied, application deadline" checked={checkedItems['p3-log']} onChange={toggleItem} />
                    <CheckboxItem id="p3-reminder" label="Set reminder to follow up in 2 weeks (if no response)" checked={checkedItems['p3-reminder']} onChange={toggleItem} />
                    <CheckboxItem id="p3-celebrate" label="Celebrate small wins: 'I submitted one - that's progress!'" checked={checkedItems['p3-celebrate']} onChange={toggleItem} />
                  </ul>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
                  <h4 className="font-semibold flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                    Manage Expectations
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• <strong>10-20% response rate is NORMAL</strong> - You won't hear back from most applications</li>
                    <li>• This is not personal. The system is broken, not you.</li>
                    <li>• Keep going. Every application is a lottery ticket.</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
                  <p className="font-semibold flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Mental Health Check-In
                  </p>
                  <p className="text-sm text-gray-700 mt-2">After 10-15 applications with no response, it's normal to feel discouraged. The average student applies to 30-50 positions before getting interviews.</p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 4: INTERVIEW & FOLLOW-UP */}
          <div id="phase4-section" className="bg-white rounded-lg shadow overflow-hidden">
            <button
              type="button"
              onClick={() => togglePhase("phase4")}
              className="w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all p-6 md:p-7 flex items-start justify-between gap-6 group"
            >
              {/* LEFT: accent + text */}
              <div className="flex items-start gap-4 min-w-0">
                <span className="mt-1 h-12 w-1.5 rounded-full bg-tealBrand/80" />
                <div className="min-w-0">
                  <div className="text-lg md:text-xl font-extrabold text-gray-900">
                    Phase 4: Interview & Follow-Up
                  </div>
                  <div className="mt-1 text-sm md:text-base text-gray-600">
                    When you get a response<span className="text-gray-300 mx-2">|</span> Prepare and perform well
                  </div>
                </div>
              </div>

              <ChevronDown className="h-6 w-6 text-bg-tealBrand/80" strokeWidth={1.75} />
            </button>

            {expandedPhase === "phase4" && (
              <div className="p-6 border-t space-y-4">
                <div className="bg-tealBrand/15 border border-tealBrand/10 rounded p-4">
                  <p className="font-bold text-gray-800">
                    🎉 YOU GOT AN INTERVIEW! Celebrate this - it means your application worked!
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Before the Interview</h3>
                  <ul className="space-y-2">
                    <CheckboxItem id="p4-research" label="Research company deeply (30+ minutes) - mission, products, recent news" checked={checkedItems['p4-research']} onChange={toggleItem} />
                    <CheckboxItem id="p4-glassdoor" label="Check Glassdoor for actual interview questions they've asked" checked={checkedItems['p4-glassdoor']} onChange={toggleItem} />
                    <CheckboxItem id="p4-star" label="Prepare STAR stories (Situation, Task, Action, Result) from your experience" checked={checkedItems['p4-star']} onChange={toggleItem} />
                    <CheckboxItem id="p4-questions" label="Prepare questions to ask them (shows genuine interest)" checked={checkedItems['p4-questions']} onChange={toggleItem} />
                    <CheckboxItem id="p4-practice" label="Practice - with a friend, career center, or in front of a mirror" checked={checkedItems['p4-practice']} onChange={toggleItem} />
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Good Questions to Ask Them</h3>
                  <ul className="space-y-1 text-gray-700 text-sm ml-7">
                    <li>• "What does a typical day look like for someone in this role?"</li>
                    <li>• "What projects would I work on?"</li>
                    <li>• "What do successful interns/employees have in common here?"</li>
                    <li>• "What are the biggest challenges facing the team right now?"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">After the Interview</h3>
                  <ul className="space-y-2">
                    <CheckboxItem id="p4-thank-you" label="Send thank-you email within 24 hours - brief, genuine, mention something specific" checked={checkedItems['p4-thank-you']} onChange={toggleItem} />
                    <CheckboxItem id="p4-follow-up" label="Add follow-up date to tracker (usually 1-2 weeks)" checked={checkedItems['p4-follow-up']} onChange={toggleItem} />
                    <CheckboxItem id="p4-keep-applying" label="Keep applying elsewhere - don't put all eggs in one basket" checked={checkedItems['p4-keep-applying']} onChange={toggleItem} />
                  </ul>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
                  <p className="font-semibold flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Remember
                  </p>
                  <p className="text-sm text-gray-700 mt-2">Interviews are a two-way street. They're evaluating you, but you're also evaluating them.</p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 5: HANDLE REJECTION */}
          <div id="phase5-section" className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase5')}
              className="w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all p-6 md:p-7 flex items-start justify-between gap-6 group"
            >
              {/* LEFT: accent + text */}
              <div className="flex items-start gap-4 min-w-0">
                {/* left accent bar */}
                <span className="mt-1 h-12 w-1.5 rounded-full bg-tealBrand/80" />

                <div className="min-w-0">
                  <div className="text-lg md:text-xl font-extrabold text-gray-900">
                    Phase 5: Manage Rejection & Keep Going
                  </div>
                  <div className="mt-1 text-sm md:text-base text-gray-600">
                    The hardest part <span className="text-gray-300 mx-2">|</span> Building resilience
                  </div>
                </div>
              </div>

              <ChevronDown className="h-6 w-6 text-bg-tealBrand/80" strokeWidth={1.75} />
            </button>

            {expandedPhase === 'phase5' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">When You Get Rejected (and you will)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>It's okay to feel disappointed.</strong> That's normal and healthy.</li>
                    <li>• <strong>One rejection â‰  you're not good enough.</strong> It means this specific role at this specific time wasn't the right fit.</li>
                    <li>• <strong>Ask yourself:</strong> Did I do something wrong, or was it just bad luck/timing?</li>
                    <li>• <strong>Take a break if needed</strong> (1-2 days), then keep applying.</li>
                    <li>• <strong>Don't spiral.</strong> One "no" doesn't predict future outcomes.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">After 20+ Applications with Few Responses</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Read our "The Honest Truth" page - you're not alone in this</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Read success stories from students who struggled too</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Talk to someone (career center, friend, family, counselor)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Consider alternative paths you haven't tried yet</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Get your resume reviewed again - fresh eyes can help</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-300 rounded p-4">
                  <p className="font-semibold flex items-center text-red-800">
                    <Heart className="w-5 h-5 mr-2" />
                    If You're Feeling Hopeless
                  </p>
                  <p className="text-sm text-gray-700 mt-2 mb-3">Job searching can trigger serious mental health struggles. If you're feeling depressed, anxious, or having thoughts of self-harm:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</li>
                    <li>• <strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                    <li>• <strong>Campus Counseling:</strong> Free for students - use it</li>
                  </ul>
                  <p className="text-sm text-red-700 mt-3 font-semibold">Your life is worth more than any job. Please reach out.</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">When You Get an Offer 🎉</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>CELEBRATE!</strong> This is a big deal. You did it.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Research fair pay on Glassdoor before accepting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Ask questions before accepting (day-to-day work, manager, expectations)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>You can negotiate (even interns can negotiate pay, start date, remote options)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Prepare for your first day - this is the beginning, not the end</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Action Buttons - TOP */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  <Download className="w-4 h-4" />
                  Print Checklist
                </button>
                {completedCount > 0 && (
                  <button
                    onClick={clearProgress}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Clear Progress
                  </button>
                )}
              </div>

              {showSaveNotice && (
                <div className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded">
                  Progress saved
                </div>
              )}

              <div className="rounded-xl bg-[#006581]/5 border border-[#006581]/10 p-4 text-sm text-gray-700">
                <p>
                  <strong>Progress saves automatically</strong> in this browser.
                  Switching devices? Use “Print checklist” for a backup.
                </p>
                <p className="mt-2 text-gray-600">
                  User accounts are coming — once we can do it without creating a privacy nightmare.
                </p>
              </div>

            </div>
          </div>
        </div>


        {/* Timeline by Year */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#006581]/10 text-[#006581] ring-1 ring-[#006581]/15">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Timeline by Year</h3>
              <p className="text-sm text-gray-600">Know what to do (and when) based on your year in school.</p>
            </div>
          </div>

          <div className="p-6">
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="font-bold text-lg">Freshmen</h3>
              <p className="text-gray-700">Don't stress if you don't get an internship. Use summer to build skills (personal projects, online courses), get a regular job, or just rest. Sophomore year is when it really starts to matter.</p>
            </div>

            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-bold text-lg">Sophomores</h3>
              <p className="text-gray-700">Start early (August-September, no later than January). Apply to 30-50 positions across all types. Include smaller companies and alternative paths. This is your practice year - even if you don't get one, you're learning the process.</p>
            </div>

            <div className="border-l-4 border-orange-400 pl-4">
              <h3 className="font-bold text-lg">Juniors</h3>
              <p className="text-gray-700 font-semibold">This is THE critical year before graduation. Start in August if possible, no later than December. Follow the full process carefully. Apply to 40-60 positions minimum. Don't give up - this internship/co-op can lead to a full-time offer.</p>
            </div>

            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-lg">Seniors</h3>
              <p className="text-gray-700">Whether looking for last internship or full-time roles, same process applies. Start early, apply broadly, don't limit yourself to "dream" companies. Many companies hire new grads year-round, not just in spring.</p>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 p-5">
          <h4 className="font-semibold text-gray-900 mb-3">Common mistakes to avoid</h4>
          <ul className="space-y-2 text-sm text-gray-700">

            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Only applying to big-name companies</strong> → Try small companies! Less competitive, better learning.</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span><strong>Generic, one-size-fits-all applications</strong> → Customize each one (just a little).</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span><strong>Not tracking applications</strong> → You'll forget what you applied to.</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Giving up after 10 rejections</strong> → 30-50 applications is completely normal!</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Ignoring mental health</strong> → Take breaks. Talk to people. This is hard.</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Only looking at traditional roles</strong> → Explore alternative paths in your field.</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Waiting until spring to start</strong> → By then, many positions are already filled.</li>
          </ul>
        </div>

        {/* Real Example */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Real Example Timeline</h2>
          <div className="bg-white rounded p-4 border border-green-300">
            <p className="font-bold mb-2">Sarah - Mechanical Engineering Sophomore</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• <strong>August:</strong> Created resume, set up tracker, researched companies</li>
              <li>• <strong>September:</strong> Applied to 15 positions (mix of traditional ME + alternatives like Quality Engineering)</li>
              <li>• <strong>October:</strong> Applied to 20 more. Got 2 rejections, felt discouraged but kept going.</li>
              <li>• <strong>November:</strong> Applied to 15 more. Got 3 interviews! One went badly, one went okay, one went great.</li>
              <li>• <strong>December:</strong> Got 1 offer from small manufacturing company for Quality Engineering co-op</li>
              <li>• <strong>January:</strong> Negotiated pay from $18/hr to $20/hr (they said yes!)</li>
              <li>• <strong>May:</strong> Started 4-month co-op, loved it, got full-time offer before graduating</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3 italic">Total applications: 50 | Interviews: 3 | Offers: 1 | Time to offer: 4 months</p>
          </div>
        </div>

        {/* Action Buttons - BOTTOM */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center gap-2 bg-orange-500  text-white px-6 py-3 rounded-lg hover:bg-orange-700"
            >
              <Download className="w-4 h-4" />
              Print Checklist
            </button>
            {completedCount > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">You've checked {completedCount} items!</p>
                <button
                  onClick={clearProgress}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm"
                >
                  Clear All Progress
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Final Encouragement – You Can Do This */}
        <div className="mt-8 rounded-3xl bg-[#006581] text-white p-10 md:p-12 shadow-lg shadow-black/10">
          <div className="max-w-3xl mx-auto text-center space-y-5">

            <div className="flex justify-center">
              <div className="rounded-xl bg-white/10 ring-1 ring-white/20 p-4">
                <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              You Can Do This
            </h3>

            <p className="text-base md:text-lg leading-relaxed text-white/90">
              This process is hard. It’s supposed to be hard.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-white/90">
              The job market is rough — and it’s{" "}
              <span className="font-semibold text-orange-200">not your fault</span>.
            </p>

            <p className="mt-4 text-sm md:text-base text-white/80">
              Thousands of students before you have walked this path and made it through.
            </p>

            <p className="text-sm md:text-base font-semibold text-white">
              You will too.
            </p>
            <ul className="mt-6 space-y-3 text-sm md:text-base text-white/90">
              <li className="flex items-center justify-center gap-3">
                <FileText className="w-4 h-4 opacity-80" />
                <span>Every application is <strong>progress</strong></span>
              </li>

              <li className="flex items-center justify-center gap-3">
                <Mail className="w-4 h-4 opacity-80" />
                <span>Every rejection is <strong>practice</strong></span>
              </li>

              <li className="flex items-center justify-center gap-3">
                <MessageCircle className="w-4 h-4 opacity-80" />
                <span>Every interview is a <strong>learning experience</strong></span>
              </li>
            </ul>

            <p className="mt-8 text-lg md:text-xl font-semibold tracking-tight">
              Keep going. You’re closer than you think.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchGuide;