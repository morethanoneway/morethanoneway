import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Menu, X, ChevronDown, ChevronUp,
  Download, CheckSquare, Square, Phone, Calendar,
  Lightbulb, AlertCircle, Target, Search, FileText,
  MessageSquare, TrendingUp
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
    tip: "Start the search as fall semester beginsâ€”this cycle moves fast and can be very competitive.",
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
    tip: "Stay alert for early fall postingsâ€”larger employers often recruit far ahead.",
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
      "Spring/Summer co-ops: Late openings and backfillsâ€”move fast.",
      "Summer internships: Peak window closing soonâ€”submit remaining apps.",
      "Summer/Winter co-ops: Hiring begins ramping next month; prep materials now.",
    ],
  },
  March: {
    title: "Right Now (March)",
    lines: [
      "Summer internships: Still active; keep applying and interviewing.",
      "Summer/Winter co-ops: Peak recruiting startingâ€”search and apply weekly.",
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
      "Summer internships: Late postings/rolling offersâ€”watch job boards daily.",
      "Summer/Winter co-ops: Peak recruiting continuesâ€”target March-May lead times.",
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
      "Spring/Summer co-ops: EARLY postings beginâ€”start searching and applying.",
      "Summer internships: Early large-company postings are around the corner.",
      "Set alerts on school board + LinkedIn for target roles.",
    ],
  },
  September: {
    title: "Right Now (September)",
    lines: [
      "Spring/Summer co-ops: Recruiting is hot now through Novemberâ€”apply weekly.",
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
      "Spring/Summer co-ops: Finalizingâ€”get apps/interviews in ASAP.",
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
        ${showProgress ? '.checkbox.checked::after { content: "âœ“"; position: absolute; top: -2px; left: 1px; font-size: 14px; color: #16a34a; }' : ''}
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
      html += `<div class="tip-box"><strong>ðŸ’¡ Tip:</strong> ${phase.tip}</div>`;
    }
    
    html += `</div>`;
  });

  html += `
      <div class="footer">
        <p>Crisis Support: Call or text 988 | Text HOME to 741741</p>
        <p>Â© 2025 MoreThanOneWay.org</p>
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
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 font-semibold text-left"
          >
            <Download className="w-5 h-5 inline mr-2" />
            Print Blank Checklist
            <p className="text-sm font-normal mt-1 ml-7">All checkboxes empty - perfect for starting fresh</p>
          </button>
          
          <button
            onClick={() => handlePrint(true)}
            className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 font-semibold text-left"
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
  
const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ADD THESE THREE NEW STATE VARIABLES:
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [findOpportunitiesOpen, setFindOpportunitiesOpen] = useState(false);
  const [applicationToolsOpen, setApplicationToolsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [closeTimer, setCloseTimer] = useState(null);

  const closeAllMenus = () => {
    setSupportOpen(false);
    setResourcesOpen(false);
    setFindOpportunitiesOpen(false);
    setApplicationToolsOpen(false);
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Print Modal */}
      <PrintableChecklistModal 
        isOpen={showPrintModal} 
        onClose={() => setShowPrintModal(false)}
        checkedItems={checkedItems}
      />

  {/* Navigation */}
{/* Navigation */}
<nav className={`nav-gradient text-white shadow-lg sticky top-0 z-50 header`}>
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center py-4">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 hover:text-blue-200"
      >
        <Heart className="w-6 h-6" />
        <span className="text-xl font-bold">More Than One Way</span>
      </button>

      <div className="hidden md:flex items-center space-x-6">
        <button onClick={onBack} className="hover:text-blue-200">Home</button>
        
        {/* SUPPORT */}
        <div
          className="relative"
          onMouseEnter={() => {
            if (closeTimer) clearTimeout(closeTimer);
            closeAllMenus();
            setSupportOpen(true);
          }}
          onMouseLeave={() => {
            const timer = setTimeout(() => setSupportOpen(false), 200);
            setCloseTimer(timer);
          }}
        >
          <button 
            onClick={() => setSupportOpen(!supportOpen)}
            className="hover:text-blue-200 flex items-center"
          >
            Support <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {supportOpen && (
            <div
              className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48"
              onMouseEnter={() => {
                // if we actually moved into the dropdown, cancel the pending close
                if (closeTimer) clearTimeout(closeTimer);
              }}
              onMouseLeave={() => {
                // leaving the dropdown too → now we can close
                const timer = setTimeout(() => setSupportOpen(false), 200);
                setCloseTimer(timer);
              }}
            >
              <button
                onClick={() => {
                  setCurrentPage('youre-not-alone');
                  setSupportOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Struggling with School
              </button>
              <button
                onClick={() => {
                  setCurrentPage('crisis');
                  setSupportOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Crisis Resources
              </button>
              <button
                onClick={() => {
                  setCurrentPage('stories');
                  setSupportOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Real Stories
              </button>
            </div>
          )}
        </div>

        {/* RESOURCES */}
        <div
          className="relative"
          onMouseEnter={() => {
            if (closeTimer) clearTimeout(closeTimer);
            closeAllMenus();
            setResourcesOpen(true);
          }}
          onMouseLeave={() => {
            const timer = setTimeout(() => setResourcesOpen(false), 200);
            setCloseTimer(timer);
          }}
        >
          <button 
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className="hover:text-blue-200 flex items-center"
          >
            Resources <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {resourcesOpen && (
            <div
              className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48"
              onMouseEnter={() => {
                if (closeTimer) clearTimeout(closeTimer);
              }}
              onMouseLeave={() => {
                const timer = setTimeout(() => setResourcesOpen(false), 200);
                setCloseTimer(timer);
              }}
            >
              <button
                onClick={() => {
                  setCurrentPage('resources');
                  setResourcesOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Career Resources
              </button>
              <button
                onClick={() => {
                  setCurrentPage('study-resources');
                  setResourcesOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Free Study Help
              </button>
              <button
                onClick={() => {
                  setCurrentPage('recommended-reading');
                  setResourcesOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Recommended Reading
              </button>
            </div>
          )}
        </div>

        {/* the rest of your menus stay the same */}
      <div
  className="relative"
  onMouseEnter={() => {
    if (closeTimer) clearTimeout(closeTimer);
    closeAllMenus();
    setFindOpportunitiesOpen(true);
  }}
  onMouseLeave={() => {
    const timer = setTimeout(() => setFindOpportunitiesOpen(false), 200);
    setCloseTimer(timer);
  }}
>
  <button 
    onClick={() => setFindOpportunitiesOpen(!findOpportunitiesOpen)}
    className="hover:text-blue-200 flex items-center"
  >
    Find Opportunities <ChevronDown className="w-4 h-4 ml-1" />
  </button>
  {findOpportunitiesOpen && (
    <div
      className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48"
      onMouseEnter={() => {
        if (closeTimer) clearTimeout(closeTimer);
      }}
      onMouseLeave={() => {
        const timer = setTimeout(() => setFindOpportunitiesOpen(false), 200);
        setCloseTimer(timer);
      }}
    >
      <button
        onClick={() => {
          setCurrentPage('find-internships');
          setFindOpportunitiesOpen(false);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Find Internships
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 bg-blue-50 font-semibold"
      >
        Search Guide
      </button>
      <button
        onClick={() => {
          setCurrentPage('job-alert');
          setFindOpportunitiesOpen(false);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Job Alert Guide
      </button>
    </div>
  )}
</div>


<div
  className="relative"
  onMouseEnter={() => {
    if (closeTimer) clearTimeout(closeTimer);
    closeAllMenus();
    setApplicationToolsOpen(true);
  }}
  onMouseLeave={() => {
    const timer = setTimeout(() => setApplicationToolsOpen(false), 200);
    setCloseTimer(timer);
  }}
>
  <button 
    onClick={() => setApplicationToolsOpen(!applicationToolsOpen)}
    className="hover:text-blue-200 flex items-center"
  >
    Application Tools <ChevronDown className="w-4 h-4 ml-1" />
  </button>
  {applicationToolsOpen && (
    <div
      className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48"
      onMouseEnter={() => {
        if (closeTimer) clearTimeout(closeTimer);
      }}
      onMouseLeave={() => {
        const timer = setTimeout(() => setApplicationToolsOpen(false), 200);
        setCloseTimer(timer);
      }}
    >
      <button
        onClick={() => {
          setCurrentPage('resume-builder');
          setApplicationToolsOpen(false);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Resume Builder
      </button>
      <button
        onClick={() => {
          setCurrentPage('tracker');
          setApplicationToolsOpen(false);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Application Tracker
      </button>
      <button
        onClick={() => {
          setCurrentPage('interview-prep');
          setApplicationToolsOpen(false);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Interview Prep
      </button>
    </div>
  )}
</div>


        <button onClick={() => setCurrentPage('pivot')} className="hover:text-blue-200">Career Paths</button>
        <button onClick={() => setCurrentPage('crisis')} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 whitespace-nowrap">Need Help Now?</button>
      </div>

      <button 
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>

    {/* mobile menu unchanged */}
    {mobileMenuOpen && (
      <div className="md:hidden pb-4 space-y-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
        {/* ... your existing mobile items ... */}
      </div>
    )}
  </div>
</nav>



      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Your Complete Job Search Guide</h1>
          <p className="text-xl text-gray-600">A step-by-step roadmap from "I need a job" to "I got an offer" - with realistic expectations and mental health check-ins along the way.</p>
        </div>

        {/* Action Buttons - TOP */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
                  âœ“ Progress saved
                </div>
              )}
              
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
                <p className="text-xs text-yellow-800">
                  <strong>📁 Progress Saving:</strong> Your checkmarks save automatically in this browser. Using a different device? They won't transfer (yet!). Click "Print Checklist" for a backup. 
                  <strong className="block mt-1">📁 User accounts coming soon!</strong> (So you can access anywhere... once we figure out how not to make it a privacy nightmare. We're working on it. Probably. Maybe. Eventually.)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3">Why This Guide Exists</h2>
          <p className="mb-3">Most students know WHERE to apply (Indeed, LinkedIn, etc.) but not HOW to search effectively. This guide teaches you the process - not just the tools.</p>
          <p className="text-blue-100 text-sm">This isn't about getting a job in 2 weeks. It's about building a sustainable strategy that works even when the job market is brutal.</p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Jump to a Section:</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <button onClick={() => {
              togglePhase('phase1'); 
              document.getElementById('phase1-section')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-left p-3 border border-blue-200 rounded hover:bg-blue-50">
              <span className="font-semibold text-blue-600">Phase 1:</span> Prepare
            </button>

            <button onClick={() => {
              togglePhase('phase2'); 
              document.getElementById('phase2-section')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-left p-3 border border-green-200 rounded hover:bg-green-50">
              <span className="font-semibold text-green-600">Phase 2:</span> Search
            </button>

            <button onClick={() => {
              togglePhase('phase3'); 
              document.getElementById('phase3-section')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-left p-3 border border-purple-200 rounded hover:bg-purple-50">
              <span className="font-semibold text-purple-600">Phase 3:</span> Apply
            </button>

            <button onClick={() => {
              togglePhase('phase4'); 
              document.getElementById('phase4-section')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-left p-3 border border-orange-200 rounded hover:bg-orange-50">
              <span className="font-semibold text-orange-600">Phase 4:</span> Interview
            </button>

            <button onClick={() => {
              togglePhase('phase5'); 
              document.getElementById('phase5-section')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-left p-3 border border-red-200 rounded hover:bg-red-50">
              <span className="font-semibold text-red-600">Phase 5:</span> Handle Rejection
            </button>
          </div>
        </div>

        {/* Recruiting Timeline Section */}
        <section id="timeline" className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Calendar className="w-7 h-7 mr-2 text-blue-600" />
              Co-op & Internship Recruiting Timeline
            </h2>
            <p className="text-gray-600 mb-6">
              Don't miss your window - many employers hire months in advance. Use this guide to plan when to search, apply, and interview.
            </p>

            {/* Important Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="font-bold text-blue-800 mb-2">⚠️ Critical Info About Co-ops:</p>
              <p className="text-sm text-blue-700">
                During co-ops (4-6 months), you're still technically enrolled as a student. You keep university access (library, gym, resources) AND your student loans stay deferred - repayment doesn't start! ALWAYS double-check with your university's Career Center or Co-op Office, as they may have specific eligibility criteria and paperwork you'll need to complete.
              </p>
            </div>

            {/* Timeline Cards */}
            <div className="space-y-4">
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
            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
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

            {/* Current Month Callout */}
            {monthTip && (
              <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-5">
                <h4 className="text-lg font-bold text-indigo-800 mb-2">{monthTip.title}</h4>
                <ul className="list-disc pl-5 text-sm text-indigo-900 space-y-1">
                  {monthTip.lines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* When YOU Should Start */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-5">
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
          </div>
        </section>

        {/* The 5 Phases */}
        <div className="space-y-6">
          
          {/* PHASE 1: PREPARE */}
          <div id="phase1-section" className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase1')}
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-blue-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 1: Prepare (Before You Apply)</h2>
                <p className="text-gray-600">Week 1-4 | Get your materials and systems ready</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
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

                <div className="bg-blue-50 border border-blue-200 rounded p-4">
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
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-green-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 2: Search & Research</h2>
                <p className="text-gray-600">Ongoing | Find opportunities and research companies</p>
              </div>
              <Search className="w-8 h-8 text-green-500" />
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

                <div className="bg-green-50 border border-green-200 rounded p-4">
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
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-purple-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 3: Apply Strategically</h2>
                <p className="text-gray-600">Ongoing | Submit quality applications consistently</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
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

                <div className="bg-yellow-50 border border-yellow-400 rounded p-4">
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

                <div className="bg-purple-50 border border-purple-200 rounded p-4">
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
              onClick={() => togglePhase('phase4')}
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-orange-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 4: Interview & Follow-Up</h2>
                <p className="text-gray-600">When you get a response | Prepare and perform well</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-500" />
            </button>
            
            {expandedPhase === 'phase4' && (
              <div className="p-6 border-t space-y-4">
                <div className="bg-green-100 border border-green-300 rounded p-4">
                  <p className="font-bold text-green-800">ðŸŽ‰ YOU GOT AN INTERVIEW! Celebrate this - it means your application worked!</p>
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

                <div className="bg-orange-50 border border-orange-200 rounded p-4">
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
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-red-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 5: Manage Rejection & Keep Going</h2>
                <p className="text-gray-600">The hardest part | Building resilience</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
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
                  <h3 className="font-bold text-lg mb-2">When You Get an Offer ðŸŽ‰</h3>
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

        {/* Timeline by Year */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Timeline by Year</h2>
          
          <div className="space-y-4">
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
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Common Mistakes to Avoid</h2>
          <ul className="space-y-2 text-gray-700">
            <li>❌ <strong>Only applying to big-name companies</strong> → Try small companies! Less competitive, better learning.</li>
            <li>❌ <strong>Generic, one-size-fits-all applications</strong> → Customize each one (just a little).</li>
            <li>❌ <strong>Not tracking applications</strong> → You'll forget what you applied to.</li>
            <li>❌ <strong>Giving up after 10 rejections</strong> → 30-50 applications is completely normal!</li>
            <li>❌ <strong>Ignoring mental health</strong> → Take breaks. Talk to people. This is hard.</li>
            <li>❌ <strong>Only looking at traditional roles</strong> → Explore alternative paths in your field.</li>
            <li>❌ <strong>Waiting until spring to start</strong> → By then, many positions are already filled.</li>
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
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
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

        {/* Final Encouragement - You Can Do This */}
<div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-2xl p-10 text-center shadow-xl">
  <div className="text-5xl mb-4">✨</div>
  <h3 className="text-3xl font-bold mb-6">You Can Do This</h3>
  <div className="max-w-3xl mx-auto space-y-4">
    <p className="text-xl mb-4 leading-relaxed opacity-95">
      This process is hard. It's supposed to be hard. <br />The job market is brutal, and it's <strong>not your fault</strong>.
    </p>
    <p className="text-xl mb-4 leading-relaxed opacity-95">
      But thousands of students before you have walked this path and made it through. <br /><strong>You will too</strong>.
    </p>
    <div className="bg-white bg-opacity-10 rounded-xl p-6 my-6">
      <ul className="space-y-3 text-lg">
        <li className="flex items-center justify-center gap-3">
          <span className="text-2xl">📝</span>
          <span>Every application is <strong>progress</strong></span>
        </li>
        <li className="flex items-center justify-center gap-3">
          <span className="text-2xl">📧</span>
          <span>Every rejection is <strong>practice</strong></span>
        </li>
        <li className="flex items-center justify-center gap-3">
          <span className="text-2xl">💬</span>
          <span>Every interview is a <strong>learning experience</strong></span>
        </li>
      </ul>
    </div>
    <p className="text-2xl font-bold">
      Keep going. You're closer than you think. 🌟
    </p>
  </div>
</div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            Always confirm eligibility and paperwork with your university's Career Center or Co-op Office. Maintaining student status can preserve access and keep loans deferred.
          </p>
          <p className="text-sm text-gray-400 mt-3">If you're in crisis: Call or text 988 | Text HOME to 741741</p>
          <p className="text-sm text-gray-400 mt-2">Â© 2025 MoreThanOneWay.org</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchGuide;