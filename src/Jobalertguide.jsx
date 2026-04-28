import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  Bell,
  Mail,
  ExternalLink,
  Lightbulb,
  AlertCircle,
  Check,
  RefreshCw,
  Clock,
  CheckCircle2,
  Briefcase,
  Linkedin,
  Users,
  Zap,
  ListOrdered,
  TargetIcon,
  Download,
  Search,
  ListChecks,
} from 'lucide-react';


const JobAlertGuide = ({ setCurrentPage }) => {

  const [expandedSection, setExpandedSection] = useState(null);
  const [checklist, setChecklist] = useState({
    indeed: false,
    linkedin: false,
    handshake: false,
    ziprecruiter: false
  });
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Load checklist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mtow-job-alerts-checklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    }
  }, []);

  // Save checklist to localStorage whenever it changes
  const toggleChecklistItem = (key) => {
    const newChecklist = { ...checklist, [key]: !checklist[key] };
    setChecklist(newChecklist);
    localStorage.setItem('mtow-job-alerts-checklist', JSON.stringify(newChecklist));

    // Show save notification
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2000);
  };

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.print());
    });
  };

  useEffect(() => {
    const cleanup = () => setIsPrinting(false);
    window.addEventListener("afterprint", cleanup);
    return () => window.removeEventListener("afterprint", cleanup);
  }, []);




  const clearProgress = () => {
    if (window.confirm('Clear all your job alert setup progress? This cannot be undone.')) {
      const emptyChecklist = {
        indeed: false,
        linkedin: false,
        handshake: false,
        ziprecruiter: false
      };
      setChecklist(emptyChecklist);
      localStorage.removeItem('mtow-job-alerts-checklist');
    }
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;

  return (
    <> 
    <Helmet>
  <title>Job Alert Guide for College Students | MoreThanOneWay.org</title>
  <meta name="description" content="Set up job alerts so internships come to you. Step-by-step guide to setting up alerts on LinkedIn, Indeed, and Google — never miss a posting again." />
  <meta name="keywords" content="job alerts college students, LinkedIn job alerts, Indeed alerts, internship notifications, how to set up job alerts" />
  <meta property="og:title" content="Job Alert Setup Guide | MoreThanOneWay.org" />
  <meta property="og:description" content="Set up job alerts so internships come to you — step-by-step guide for LinkedIn, Indeed, and Google." />
 </Helmet>
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
        {/* Page Title */}
        <div>
          <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">Job Alert Setup {" "}
            <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">Guide</span> </h1>
          <p className="mt-3 text-center text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
  Stop refreshing job boards. Set this up once and let opportunities come to you.
</p>
<p className="mt-2 text-center text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
  30 minutes now saves hours every week — and early applicants get seen before the flood hits.
</p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
  onClick={handlePrint}
  className="px-5 py-3 rounded-xl bg-[#006581] text-white font-semibold hover:bg-[#005570] transition inline-flex items-center gap-2"
>
  Print guide
</button>



            <button
              onClick={() => setCurrentPage?.("find-internships")}
              className="px-5 py-3 rounded-xl border border-gray-200 bg-white font-semibold text-gray-900 hover:bg-gray-100 transition"
            >
              Find internships
            </button>
          </div>
        </div>

        {/* Setup Checklist (restyled to match site) */}
        <div className="mt-8 rounded-3xl bg-white border border-gray-200 p-7 md:p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-tealBrand/10 ring-1 ring-tealBrand/15 p-3">
                <CheckCircle className="w-6 h-6 text-tealBrand" />
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
                  Setup Progress
                </h2>
                <p className="text-sm text-gray-600">
                  {completedCount}/{totalCount} platforms configured
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={clearProgress}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-900 hover:bg-gray-50 transition"
            >
              <RefreshCw className="w-4 h-4 text-tealBrand" />
              Clear
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-5">
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#006581] transition-all duration-500"
                style={{ width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Platform Checklist */}
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            <ChecklistPlatform
              checked={checklist.indeed}
              onChange={() => toggleChecklistItem("indeed")}
              label="Indeed Job Alerts"
              Icon={Briefcase}
            />

            <ChecklistPlatform
              checked={checklist.linkedin}
              onChange={() => toggleChecklistItem("linkedin")}
              label="LinkedIn Job Alerts"
              Icon={Linkedin}
            />

            <ChecklistPlatform
              checked={checklist.handshake}
              onChange={() => toggleChecklistItem("handshake")}
              label="Handshake Job Alerts"
              Icon={Users}
            />

            <ChecklistPlatform
              checked={checklist.ziprecruiter}
              onChange={() => toggleChecklistItem("ziprecruiter")}
              label="ZipRecruiter Job Alerts"
              Icon={Zap}
            />

          </div>

          {/* Save Notification */}
          {showSaveNotification && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
              <p className="text-sm font-semibold text-emerald-800">✓ Progress saved</p>
            </div>
          )}
        </div>


        {/* Platform Setup Instructions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Platform Setup Guides</h2>
          <p className="text-gray-600 mb-6">Click each platform below to see detailed setup instructions. Do all 4 for maximum coverage! 👇</p>

          {/* Indeed */}
          <PlatformSection
            title="Indeed Job Alerts"
            Icon={Briefcase}
            expanded={isPrinting || expandedSection === "indeed"}

            onToggle={() =>
              setExpandedSection(expandedSection === "indeed" ? null : "indeed")
            }
            borderColor="border-[#006581]/30"
          >
            <IndeedContent />
          </PlatformSection>


          {/* LinkedIn */}
          <PlatformSection
            title="LinkedIn Job Alerts"
            Icon={Linkedin}
            expanded={isPrinting || expandedSection === "linkedin"}
            onToggle={() =>
              setExpandedSection(expandedSection === "linkedin" ? null : "linkedin")
            }
            borderColor="border-[#006581]/30"
          >
            <LinkedInContent />
          </PlatformSection>

          {/* Handshake */}
          <PlatformSection
            title="Handshake Job Alerts"
            Icon={Users}
            expanded={isPrinting || expandedSection === "handshake"}
            onToggle={() =>
              setExpandedSection(expandedSection === "handshake" ? null : "handshake")
            }
            borderColor="border-[#006581]/30"
          >
            <HandshakeContent />
          </PlatformSection>


          {/* ZipRecruiter */}
          <PlatformSection
            title="ZipRecruiter Job Alerts"
            Icon={Zap}
            expanded={isPrinting || expandedSection === "ziprecruiter"}
            onToggle={() =>
              setExpandedSection(expandedSection === "ziprecruiter" ? null : "ziprecruiter")
            }
            borderColor="border-[#006581]/30"
          >
            <ZipRecruiterContent />
          </PlatformSection>

        </div>

        {/* Email Management Tips */}
        {/* Managing Your Job Alert Emails */}
        <div className="mt-8 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          {/* header */}
          <div className="flex items-start gap-4 p-7 border-b border-gray-100">
            <div className="rounded-2xl bg-tealBrand/10 ring-1 ring-tealBrand/15 p-3">
              <Mail className="w-6 h-6 text-tealBrand" strokeWidth={1.75} />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                Managing your job alert emails
              </h3>
              <p className="mt-1 text-sm md:text-base text-gray-600 leading-relaxed">
                You’re about to get a lot of emails. Here’s how to stay organized without getting overwhelmed.
              </p>
            </div>
          </div>

          {/* tips */}
          <div className="p-7">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Set alerts to daily (not instant)", body: "Daily digests are manageable. Instant alerts will flood you." },
                { title: "Create a Gmail filter/folder", body: "Route alerts to one label so your main inbox stays clean." },
                { title: "Check alerts at set times", body: "Pick 2 times a day (morning + evening). Don’t let it hijack your day." },
                { title: "Unsubscribe from bad matches", body: "If it’s irrelevant after a week, tighten filters or unsubscribe. Quality > quantity." },
                { title: "Apply within 24–48 hours", body: "Many teams review as they come in. Waiting increases competition." },
              ].map((t) => (
                <div key={t.title} className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-sm transition">
                  <p className="font-semibold text-gray-900">{t.title}</p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>

            {/* optional “mini routine” strip (helps a lot visually) */}
            <div className="mt-6 rounded-2xl bg-[#006581]/5 border border-[#006581]/10 p-5">
              <p className="font-semibold text-gray-900">Simple routine</p>
              <p className="mt-1 text-sm text-gray-700">
                Morning: scan alerts → save 3–5 good ones. Evening: apply to the best 1–2.
              </p>
            </div>
          </div>
        </div>


        {/* Common Mistakes Warning */}
        <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 p-5">
          <h4 className="font-semibold text-gray-900 mb-3">Common mistakes to avoid</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Using "entry level" in search</strong> - Companies misuse this term. Many "entry level" jobs want 3-5 years of experience.</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Setting location too narrow</strong> - Use city OR state, not both. Many remote opportunities won't show up if you're too specific.</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Only one search per platform</strong> - Set up 2-3 different searches with different keywords (e.g., "Mechanical Engineer Intern", "Manufacturing Intern", "Product Design Intern").</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Ignoring email for days</strong> - By the time you check, the position may already be filled. Check daily or every other day minimum.</li>
            <li className="flex gap-2"><span className="text-[#006581]">•</span> <strong>Never updating your alerts</strong> - Refine your searches after 1-2 weeks based on what you're actually getting.</li>
          </ul>
        </div>


        {/* Final Encouragement */}
        <div className="mt-8 rounded-3xl bg-[#006581] text-white p-10 md:p-12 shadow-lg shadow-black/10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="flex justify-center">
              <div className="rounded-xl bg-white/10 ring-1 ring-white/20 p-4">
                <TargetIcon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">You Just Automated Your Job Search</h3>
            <p className="text-base md:text-lg leading-relaxed text-white/90">
              Setting this up takes 30 minutes now, but saves you <strong>hours every week</strong>.
              While other students are manually searching, opportunities are landing in your inbox automatically.
            </p>

            <p className="text-base md:text-lg font-semibold tracking-tight">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                That&apos;s working smarter,
              </span>{" "}
              <span className="text-white font-semibold">
                not harder.
              </span>
            </p>


          </div>
        </div>
      </div>
    </div>
    </>
  );
};

// Checklist Platform Item
const ChecklistPlatform = ({ checked, onChange, label, Icon }) => (
  <button
    type="button"
    onClick={onChange}
    className="group w-full flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all"
  >
    <div className="flex items-center gap-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#006581]/10 ring-1 ring-[#006581]/15">
        {Icon ? <Icon className="w-5 h-5 text-[#006581]" strokeWidth={1.75} /> : null}
      </span>

      <span className="font-semibold text-gray-900">{label}</span>
    </div>

    <span className="inline-flex items-center justify-center">
      {checked ? (
        <CheckCircle2 className="w-6 h-6 text-[#006581]" strokeWidth={1.75} />
      ) : (
        <Circle className="w-6 h-6 text-gray-300 group-hover:text-gray-400" strokeWidth={1.75} />
      )}
    </span>
  </button>
);

// Platform Section Component
const PlatformSection = ({
  title,
  Icon,
  expanded,
  onToggle,
  borderColor,
  children,
}) => (
  <div className={`rounded-2xl border ${borderColor} bg-white`}>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-4"
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#006581]/10 ring-1 ring-[#006581]/15">
            <Icon className="w-5 h-5 text-[#006581]" strokeWidth={1.75} />
          </span>
        )}

        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            Click to view step-by-step instructions
          </p>
        </div>
      </div>
    </button>

    {expanded && <div className="px-6 pb-6">{children}</div>}
  </div>
);

// Email Tip Component
const EmailTip = ({ title, tip }) => (
  <div className="bg-white p-4 rounded-xl border border-orange-200">
    <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{tip}</p>
  </div>
);

// Indeed Content
const IndeedContent = () => (
  <div className="space-y-6">
    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <p className="text-gray-700">
        <strong>Why Indeed:</strong> Largest job board with millions of postings. Most companies post here first.
        Setting up alerts is simple and their daily email format is clean and easy to scan.
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#006581]/10 ring-1 ring-[#006581]/15">
          <ListOrdered className="w-6 h-6 text-[#006581]" strokeWidth={1.75} />
        </span>
        Step-by-Step Instructions
      </h4>
      <div className="space-y-3">
        <Step number={1} text="Go to Indeed.com and create a free account (or log in if you have one)" />
        <Step number={2} text='In the search bar, type your search (e.g., "Mechanical Engineering Intern" or "Software Engineering Intern")' />
        <Step number={3} text="Add your location in the location field (city, state, or just state for broader results)" />
        <Step number={4} text='Click "Search" to see results' />
        <Step number={5} text='Look for the blue "Get new jobs for this search by email" link near the top of the results' />
        <Step number={6} text="Click it, and choose frequency: Daily recommended (Weekly is too slow for fast-moving internships)" />
        <Step number={7} text="Check your email and confirm the alert subscription" />
      </div>
    </div>

    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        Pro Tips for Indeed
      </h4>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>• <strong>Set up multiple alerts with different keywords.</strong> Try "Mechanical Engineer Intern", "Manufacturing Intern", "Product Development Intern"</li>
        <li>• <strong>Use the "Remote" filter</strong> if you want remote opportunities included</li>
        <li>• <strong>Save your resume to Indeed</strong> - makes applying with "Quick Apply" much faster</li>
        <li>• <strong>Check "Date Posted" filter for "Last 7 days"</strong> - older postings may already be filled</li>
        <li>• <strong>Don't use "entry level"</strong> in your search - it's often misused by employers</li>
      </ul>
    </div>

    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <h4 className="font-bold text-gray-600 mb-2">⚠️ Watch Out For</h4>
      <p className="text-sm text-gray-700">
        Indeed shows "sponsored" jobs at the top - these are paid placements. They're not necessarily bad, but scroll down to see organic results too.
        Also, some postings are duplicates from recruiting agencies - read carefully to make sure you're applying directly to the company.
      </p>
    </div>

    <div>
      <a
        href="https://support.indeed.com/hc/en-us/articles/360011450834-How-to-create-job-alerts"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
      >
        Official Indeed Help Guide <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
);

// LinkedIn Content
const LinkedInContent = () => (
  <div className="space-y-6">
    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <p className="text-gray-700">
        <strong>Why LinkedIn:</strong> Professional network with good internship postings, especially at tech companies and startups.
        Bonus: recruiters can see your profile, so keep it updated!
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#006581]/10 ring-1 ring-[#006581]/15">
          <ListOrdered className="w-6 h-6 text-[#006581]" strokeWidth={1.75} />
        </span>
        Step-by-Step Instructions
      </h4>
      <div className="space-y-3">
        <Step number={1} text="Log into LinkedIn.com (create a free account if you don't have one)" />
        <Step number={2} text='Click "Jobs" in the top navigation bar' />
        <Step number={3} text='In the search bar, enter your desired job (e.g., "Mechanical Engineering Intern")' />
        <Step number={4} text="Add location in the location field" />
        <Step number={5} text="Click Search, then look for filters on the left side" />
        <Step number={6} text='Under "Job Type", check "Internship"' />
        <Step number={7} text='Click the toggle for "Create job alert" at the top right of the results' />
        <Step number={8} text="Choose alert frequency (Daily or Weekly) and click Save" />
      </div>
    </div>

    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <h4 className="font-bold text-grey-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        Pro Tips for LinkedIn
      </h4>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>• <strong>Fill out your LinkedIn profile completely</strong> - recruiters search for candidates and may reach out to you</li>
        <li>• <strong>Use "Easy Apply"</strong> when available - but always customize your resume when uploading</li>
        <li>• <strong>Follow companies you're interested in</strong> - they often post jobs on their company page first</li>
        <li>• <strong>Set multiple alerts for different search terms</strong> - LinkedIn's algorithm isn't perfect</li>
        <li>• <strong>Check the "Date Posted" filter</strong> - apply to jobs within 1-3 days of posting for best odds</li>
      </ul>
    </div>

    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <h4 className="font-bold text-gray-600 mb-2">⚠️ Watch Out For</h4>
      <p className="text-sm text-gray-700">
        Some LinkedIn jobs are posted by recruiting agencies, not the actual company. If the company name looks generic ("Talent Solutions", "Staffing Pros"),
        it's probably a recruiter. Not necessarily bad, but you might have better luck applying directly to the company's website.
      </p>
    </div>

    <div>
      <a
        href="https://www.linkedin.com/help/linkedin/answer/a507508/creating-or-deleting-a-job-alert"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
      >
        Official LinkedIn Help Guide <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
);

// Handshake Content
const HandshakeContent = () => (
  <div className="space-y-6">
    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <p className="text-gray-700">
        <strong>Why Handshake:</strong> College-specific job board. Companies posting here WANT college students and recent grads.
        Your school's career center uses this, so jobs are often pre-vetted for students.
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">📝</span>
        Step-by-Step Instructions
      </h4>
      <div className="space-y-3">
        <Step number={1} text="Go to your school's Handshake portal (usually joinhandshake.com/schools/[your-school] or linked from your career center website)" />
        <Step number={2} text="Log in with your school credentials" />
        <Step number={3} text="Complete your profile (education, major, skills, resume upload) - this helps match you to relevant jobs" />
        <Step number={4} text='Click "Jobs" in the main navigation' />
        <Step number={5} text='Use search bar to enter job type (e.g., "Mechanical Engineering Intern") or browse by filters' />
        <Step number={6} text='After searching, click "Save This Search" (usually near top right of results)' />
        <Step number={7} text="Choose to receive email notifications: Daily or Weekly" />
        <Step number={8} text="Name your saved search so you remember what it's for" />
      </div>
    </div>

    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        Pro Tips for Handshake
      </h4>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>• <strong>Jobs on Handshake WANT college students</strong> - don't be intimidated if you lack experience</li>
        <li>• <strong>Apply through Handshake</strong> when possible - employers know you're from their target school</li>
        <li>• <strong>Check "Recommended for You" jobs</strong> - Handshake's algorithm is actually pretty good at matching</li>
        <li>• <strong>Your career center can see your activity</strong> - they may reach out with opportunities or advice</li>
        <li>• <strong>Some companies recruit exclusively on Handshake</strong> for certain schools - you won't find these jobs on Indeed</li>
      </ul>
    </div>

    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <h4 className="font-bold text-gray-600 mb-2">⚠️ Watch Out For</h4>
      <p className="text-sm text-gray-700">
        Handshake shows jobs from ALL schools, not just yours. Filter by "Targets my school" or "Posted to my school" to see opportunities
        specifically available to students at your college. These jobs tend to have better response rates.
      </p>
    </div>

    <div>
      <a
        href="https://support.joinhandshake.com/hc/en-us/articles/218693207-Save-Job-Searches"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
      >
        Official Handshake Help Guide <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
);

// ZipRecruiter Content
const ZipRecruiterContent = () => (
  <div className="space-y-6">
    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <p className="text-gray-700">
        <strong>Why ZipRecruiter:</strong> Good coverage of small-to-medium companies that might not post on Indeed/LinkedIn.
        Their matching algorithm sometimes surfaces opportunities you wouldn't find elsewhere.
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#006581]/10 ring-1 ring-[#006581]/15">
          <ListOrdered className="w-6 h-6 text-[#006581]" strokeWidth={1.75} />
        </span>
        Step-by-Step Instructions
      </h4>

      <div className="space-y-3">
        <Step number={1} text="Go to ZipRecruiter.com and create a free account" />
        <Step number={2} text='Enter your job search (e.g., "Mechanical Engineering Intern") in the search bar' />
        <Step number={3} text="Add your location" />
        <Step number={4} text="Click Search" />
        <Step number={5} text='Look for "Get new jobs for this search by email" link near the search results' />
        <Step number={6} text="Click it and select frequency: Daily recommended" />
        <Step number={7} text="ZipRecruiter will ask you to upload your resume - do this! It helps their matching algorithm" />
        <Step number={8} text="Confirm the job alert in your email" />
      </div>
    </div>

    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        Pro Tips for ZipRecruiter
      </h4>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>• <strong>Upload your resume to your profile</strong> - ZipRecruiter shows your resume to employers, and they may reach out</li>
        <li>• <strong>"1-Click Apply" is convenient</strong> - but still customize your resume when possible</li>
        <li>• <strong>Check your "Recommended Jobs"</strong> - their algorithm is decent at finding matches</li>
        <li>• <strong>Set up 2-3 different searches</strong> with varied keywords to get maximum coverage</li>
        <li>• <strong>Smaller companies use ZipRecruiter</strong> - don't overlook postings from companies you haven't heard of</li>
      </ul>
    </div>

    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <h4 className="font-bold text-gray-600 mb-2">⚠️ Watch Out For</h4>
      <p className="text-sm text-gray-700">
        ZipRecruiter sometimes sends a LOT of "recommended" jobs that don't quite match. If you're getting too many irrelevant suggestions,
        adjust your job preferences in your profile settings. Quality over quantity!
      </p>
    </div>

    <div>
      <a
        href="https://www.ziprecruiter.com/c/ZipRecruiter/s/job-alerts"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
      >
        Official ZipRecruiter Help Guide <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
);

const Step = ({ number, text, highlight = false }) => {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`
          mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold
          ${highlight
            ? "bg-tealBrand text-white"
            : "bg-tealBrand/50 text-white"}
        `}
      >
        {number}
      </span>
      <p className="text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
};


export default JobAlertGuide;