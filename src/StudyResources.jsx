import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BookOpen,
  Youtube,
  Globe,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Users,
  Sparkles,
  Search,
  Tag,
  X,
} from "lucide-react";

const StudyResources = ({ onBack }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState(new Set());

  const toggleSection = (key) => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  const toggleTag = (t) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery("");
    setActiveTags(new Set());
  };

  // -----------------------------
  // DATA (easy to add to later)
  // Add tags to each item/section.
  // -----------------------------
  const TAGS = useMemo(
    () => [
      "Math",
      "Chem",
      "Physics",
      "Biology",
      "CS",
      "Business",
      "Writing",
      "General",
    ],
    []
  );

  const YOUTUBE_SUBJECTS = useMemo(
    () => [
      {
        key: "math",
        label: "Mathematics",
        icon: "📐",
        tags: ["Math"],
        links: [
          { name: "Professor Leonard", url: "https://www.youtube.com/@ProfessorLeonard", tags: ["Math"] },
          { name: "Khan Academy Math", url: "https://www.youtube.com/@khanacademy", tags: ["Math", "General"] },
          { name: "3Blue1Brown (conceptual)", url: "https://www.youtube.com/@3blue1brown", tags: ["Math"] },
        ],
      },
      {
        key: "chem",
        label: "Chemistry",
        icon: "🧪",
        tags: ["Chem"],
        links: [
          { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor", tags: ["Chem", "Math", "Physics"] },
          { name: "Tyler DeWitt", url: "https://www.youtube.com/@tdewitt451", tags: ["Chem"] },
        ],
      },
      {
        key: "physics",
        label: "Physics",
        icon: "⚡",
        tags: ["Physics"],
        links: [
          { name: "Michel van Biezen", url: "https://www.youtube.com/@MichelvanBiezen", tags: ["Physics", "Math"] },
          { name: "Flipping Physics", url: "https://www.youtube.com/@FlippingPhysics", tags: ["Physics"] },
          { name: "MinutePhysics (conceptual)", url: "https://www.youtube.com/@minutephysics", tags: ["Physics"] },
        ],
      },
      {
        key: "bio",
        label: "Biology",
        icon: "🧬",
        tags: ["Biology"],
        links: [
          { name: "Amoeba Sisters", url: "https://www.youtube.com/@AmoebaSisters", tags: ["Biology"] },
          { name: "CrashCourse Biology", url: "https://www.youtube.com/@crashcourse", tags: ["Biology", "General"] },
        ],
      },
      {
        key: "cs",
        label: "Computer Science & Programming",
        icon: "💻",
        tags: ["CS"],
        links: [
          { name: "CS Dojo", url: "https://www.youtube.com/@CSDojo", tags: ["CS"] },
          { name: "freeCodeCamp.org", url: "https://www.youtube.com/@freecodecamp", tags: ["CS"] },
          { name: "The Coding Train", url: "https://www.youtube.com/@TheCodingTrain", tags: ["CS"] },
        ],
      },
      {
        key: "econ",
        label: "Economics & Business",
        icon: "📊",
        tags: ["Business"],
        links: [
          { name: "CrashCourse Economics", url: "https://www.youtube.com/@crashcourse", tags: ["Business", "General"] },
          { name: "Khan Academy Economics", url: "https://www.youtube.com/@khanacademy", tags: ["Business", "General"] },
        ],
      },
      {
        key: "writing",
        label: "Writing & Humanities",
        icon: "📚",
        tags: ["Writing"],
        links: [
          { name: "CrashCourse (history, etc.)", url: "https://www.youtube.com/@crashcourse", tags: ["Writing", "General"] },
          { name: "TED-Ed", url: "https://www.youtube.com/@TEDEd", tags: ["Writing", "General"] },
        ],
      },
    ],
    []
  );

  const ONLINE_PLATFORMS = useMemo(
    () => [
      {
        name: "Khan Academy",
        url: "https://www.khanacademy.org/",
        desc: "Interactive practice problems + video lessons",
        meta: "Subjects: Math, Science, Economics, History, SAT/ACT Prep",
        tags: ["General", "Math", "Chem", "Physics", "Biology", "Business", "Writing"],
      },
      {
        name: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu/",
        desc: "Full MIT course materials FREE — lectures, notes, problem sets, exams (often with solutions)",
        meta: null,
        tags: ["General", "Math", "Chem", "Physics", "CS", "Business"],
      },
      {
        name: "Coursera (Audit for Free)",
        url: "https://www.coursera.org/",
        desc: "Can audit most courses for free (no certificate) — university-level courses",
        meta: null,
        tags: ["General", "Math", "Chem", "Physics", "Biology", "CS", "Business", "Writing"],
      },
    ],
    []
  );

  const REDDIT = useMemo(
    () => ({
      general: [
        { name: "r/HomeworkHelp", url: "https://www.reddit.com/r/HomeworkHelp/", tags: ["General"] },
        { name: "r/GetStudying", url: "https://www.reddit.com/r/GetStudying/", tags: ["General"] },
        { name: "r/college", url: "https://www.reddit.com/r/college/", tags: ["General"] },
        { name: "r/AskAcademia", url: "https://www.reddit.com/r/AskAcademia/", tags: ["General"] },
        { name: "r/productivity", url: "https://www.reddit.com/r/productivity/", tags: ["General"] },
      ],
      subject: [
        { name: "r/learnmath", url: "https://www.reddit.com/r/learnmath/", tags: ["Math"] },
        { name: "r/chemhelp", url: "https://www.reddit.com/r/chemhelp/", tags: ["Chem"] },
        { name: "r/AskPhysics", url: "https://www.reddit.com/r/AskPhysics/", tags: ["Physics"] },
        { name: "r/learnprogramming", url: "https://www.reddit.com/r/learnprogramming/", tags: ["CS"] },
        { name: "r/EngineeringStudents", url: "https://www.reddit.com/r/EngineeringStudents/", tags: ["Physics", "Math", "CS"] },
      ],
    }),
    []
  );

  const DISCORD = useMemo(
    () => ({
      howToFind: [
        { text: 'Search "study discord" + your subject on Reddit', tags: ["General"] },
        { text: 'Search "homework help discord" on Google', tags: ["General"] },
        { text: "Many YouTube creators have Discord servers (check video descriptions)", tags: ["General"] },
      ],
      communities: [
        { name: "The Study Hall", note: "Mini-subject homework help", tags: ["General"] },
        { name: "Homework Help", note: "Live tutoring and study groups", tags: ["General"] },
        { name: "CS50 Discord", note: "Computer Science community", tags: ["CS"] },
        { name: 'Search for subject-specific servers like "Math Help Discord"', note: "", tags: ["General", "Math"] },
      ],
    }),
    []
  );

  const SUBJECT_FREE_RESOURCES = useMemo(
    () => [
      {
        title: "Mathematics",
        icon: "📐",
        tags: ["Math"],
        items: [
          {
            name: "Paul’s Online Math Notes",
            url: "https://tutorial.math.lamar.edu/",
            desc: "Algebra, Calculus, Differential Equations — clear explanations + practice problems",
            tags: ["Math"],
          },
          {
            name: "Symbolab",
            url: "https://www.symbolab.com/",
            desc: "Step-by-step math problem solver",
            tags: ["Math"],
          },
        ],
      },
      {
        title: "Chemistry",
        icon: "🧪",
        tags: ["Chem"],
        items: [
          {
            name: "ChemLibreTexts",
            url: "https://chem.libretexts.org/",
            desc: "Free chemistry textbooks",
            tags: ["Chem"],
          },
        ],
      },
      {
        title: "Physics",
        icon: "⚡",
        tags: ["Physics"],
        items: [
          {
            name: "HyperPhysics",
            url: "http://hyperphysics.phy-astr.gsu.edu/",
            desc: "Interactive physics concepts",
            tags: ["Physics"],
          },
        ],
      },
      {
        title: "Computer Science",
        icon: "💻",
        tags: ["CS"],
        items: [
          {
            name: "GeeksforGeeks",
            url: "https://www.geeksforgeeks.org/",
            desc: "Programming tutorials, data structures, algorithms",
            tags: ["CS"],
          },
        ],
      },
    ],
    []
  );

  const STUDY_TIPS = useMemo(
    () => [
      {
        title: "Don’t just watch — DO",
        body: "Pause the video, try the problem, then check the solution. Learning happens when you struggle a little.",
        tags: ["General"],
      },
      {
        title: "Use multiple teachers",
        body: "If one explanation doesn’t click, switch channels or websites. It’s normal.",
        tags: ["General"],
      },
      {
        title: "Study in bursts",
        body: "Try 25–45 minutes focused, then a short break. It reduces burnout and helps you remember more.",
        tags: ["General"],
      },
      {
        title: "Teach it back",
        body: "Explain the concept out loud (or to a friend). If you can teach it simply, you actually understand it.",
        tags: ["General"],
      },
      {
        title: "Ask sooner than you want to",
        body: "When you’re stuck, ask in a subreddit/Discord before the night of the exam. Small questions snowball fast.",
        tags: ["General"],
      },
    ],
    []
  );

  // -----------------------------
  // FILTER LOGIC
  // -----------------------------
  const q = query.trim().toLowerCase();

  const tagsMatch = (itemTags = []) => {
    if (activeTags.size === 0) return true;
    return itemTags.some((t) => activeTags.has(t));
  };

  const textMatch = (...fields) => {
    if (!q) return true;
    return fields
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q);
  };

  // Filtered views (don’t mutate original arrays)
  const filteredYouTube = useMemo(() => {
    return YOUTUBE_SUBJECTS
      .map((s) => {
        const links = s.links.filter((l) => tagsMatch(l.tags) && textMatch(s.label, l.name));
        const subjectHits = tagsMatch(s.tags) && textMatch(s.label);
        // Show subject if it matches OR any link matches
        if (!subjectHits && links.length === 0) return null;
        return { ...s, links };
      })
      .filter(Boolean);
  }, [YOUTUBE_SUBJECTS, activeTags, q]);

  const filteredPlatforms = useMemo(() => {
    return ONLINE_PLATFORMS.filter(
      (p) => tagsMatch(p.tags) && textMatch(p.name, p.desc, p.meta)
    );
  }, [ONLINE_PLATFORMS, activeTags, q]);

  const filteredReddit = useMemo(() => {
    const general = REDDIT.general.filter((r) => tagsMatch(r.tags) && textMatch(r.name));
    const subject = REDDIT.subject.filter((r) => tagsMatch(r.tags) && textMatch(r.name));
    return { general, subject };
  }, [REDDIT, activeTags, q]);

  const filteredDiscord = useMemo(() => {
    const howToFind = DISCORD.howToFind.filter((x) => tagsMatch(x.tags) && textMatch(x.text));
    const communities = DISCORD.communities.filter(
      (c) => tagsMatch(c.tags) && textMatch(c.name, c.note)
    );
    return { howToFind, communities };
  }, [DISCORD, activeTags, q]);

  const filteredSubjectFree = useMemo(() => {
    return SUBJECT_FREE_RESOURCES
      .map((b) => {
        const items = b.items.filter((it) => tagsMatch(it.tags) && textMatch(b.title, it.name, it.desc));
        const blockHits = tagsMatch(b.tags) && textMatch(b.title);
        if (!blockHits && items.length === 0) return null;
        return { ...b, items };
      })
      .filter(Boolean);
  }, [SUBJECT_FREE_RESOURCES, activeTags, q]);

  const filteredTips = useMemo(() => {
    return STUDY_TIPS.filter((t) => tagsMatch(t.tags) && textMatch(t.title, t.body));
  }, [STUDY_TIPS, activeTags, q]);

  // If filtering is active, it’s nice to auto-expand matching YouTube sections
  // but keep it simple: user controls accordion.

  // -----------------------------
  // Small UI helpers
  // -----------------------------
const Card = ({ children, className = "", id }) => (
  <div id={id} className={`bg-white rounded-2xl border border-gray-200 ${className}`}>
    {children}
  </div>
);
  const SectionHeader = ({ icon, title, subtitle }) => (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">{title}</h2>
        {subtitle ? <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p> : null}
      </div>
    </div>
  );

  const External = () => (
    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-tealBrand/90 transition" />
  );

  const TagChip = ({ t }) => {
    const on = activeTags.has(t);
    return (
      <button
        type="button"
        onClick={() => toggleTag(t)}
        className={[
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold border transition",
          on
            ? "bg-tealBrand/10 border-tealBrand/30 text-gray-900"
            : "bg-white border-gray-200 text-gray-700 hover:bg-[#FFFBF7]",
        ].join(" ")}
      >
        <Tag className="w-3.5 h-3.5 text-gray-500" />
        {t}
      </button>
    );
  };

  const hasAnyResults =
    filteredYouTube.length > 0 ||
    filteredPlatforms.length > 0 ||
    filteredReddit.general.length > 0 ||
    filteredReddit.subject.length > 0 ||
    filteredDiscord.howToFind.length > 0 ||
    filteredDiscord.communities.length > 0 ||
    filteredSubjectFree.length > 0 ||
    filteredTips.length > 0;

    const resultsCount = useMemo(() => {
  const ytLinks = filteredYouTube.reduce((sum, s) => sum + (s.links?.length || 0), 0);
  const redditCount = filteredReddit.general.length + filteredReddit.subject.length;
  const discordCount = filteredDiscord.howToFind.length + filteredDiscord.communities.length;
  const subjectFreeCount = filteredSubjectFree.reduce((sum, b) => sum + (b.items?.length || 0), 0);

  // “Units” here are individual links/resources + tips
  return (
    ytLinks +
    filteredPlatforms.length +
    redditCount +
    discordCount +
    subjectFreeCount +
    filteredTips.length
  );
}, [
  filteredYouTube,
  filteredPlatforms,
  filteredReddit,
  filteredDiscord,
  filteredSubjectFree,
  filteredTips,
]);

  return (
    <>
      <Helmet>
        <title>Free Study Resources - YouTube Channels & Learning Sites | MoreThanOneWay.org</title>
        <meta
          name="description"
          content="Can't understand your professor? Free YouTube channels, websites, and study tools for every subject. Better explanations, at your own pace."
        />
        <meta property="og:title" content="Free Study Resources for College Students" />
        <meta
          property="og:description"
          content="Best free YouTube channels and websites for learning math, science, engineering, and more."
        />
        <meta
          name="keywords"
          content="free study resources, college study help, YouTube learning channels, online tutoring free, study websites for students"
        />
      </Helmet>

      <section className="bg-[#FFFBF7] py-10">
        <div className="mx-auto w-full max-w-6xl px-4 space-y-10">
          

          {/* Header */}
          <header className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Study{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                Resources
              </span>
            </h1>

            <p className="mt-5 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
              Can’t understand your professor? Sometimes a different explanation makes it click.
            </p>

            <p className="mt-3 text-base md:text-lg text-gray-600 italic">
              You’re not “bad at this subject” — you just haven’t found the right teacher yet.
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-3">
  <a
    href="#youtube-section"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-teal-500 transition-all"
  >
    YouTube Channels
  </a>

  <a
    href="#platforms-section"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-teal-50 hover:border-teal-200 transition-all"
  >
    Learning Platforms
  </a>

  <a
    href="#reddit-section"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-teal-50 hover:border-teal-200 transition-all"
  >
    Reddit Help
  </a>

  <a
    href="#subjects-section"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-teal-50 hover:border-teal-200 transition-all"
  >
    Subject Resources
  </a>
</div>

          {/* Search + Tags */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700">Search</label>
                <div className="mt-2 relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by subject or resource name (e.g., “physics”, “Khan”, “resume”)"
                    className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-tealBrand/50"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="md:w-[320px]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">Quick tags</p>
                  {(query || activeTags.size > 0) ? (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <TagChip key={t} t={t} />
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600">
  Showing <span className="font-semibold text-gray-800">{resultsCount}</span>{" "}
  {resultsCount === 1 ? "result" : "results"}
  {(query || activeTags.size > 0) ? (
    <span className="text-gray-500"> for your filters</span>
  ) : null}
</p>

              </div>
            </div>

            {!hasAnyResults ? (
              <div className="mt-5 rounded-xl border border-gray-200 bg-[#FFFBF7] p-4 text-sm text-gray-700">
                No matches. Try a different keyword, or clear filters.
              </div>
            ) : null}
          </Card>

          {/* YouTube Channels */}
          <Card id="youtube-section" className="p-6 md:p-8">
            <SectionHeader
              icon={<Youtube className="w-6 h-6 text-tealBrand/80" />}
              title="YouTube Channels by Subject"
              
            />

            <div className="mt-6 space-y-3">
              {filteredYouTube.length === 0 ? (
                <p className="text-sm text-gray-600">No YouTube matches for your filters.</p>
              ) : (
                filteredYouTube.map((subject) => {
                  const open = expandedSection === subject.key;
                  return (
                    <div key={subject.key} className="rounded-2xl border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => toggleSection(subject.key)}
                        className="w-full flex items-center justify-between gap-4 px-4 py-4 text-left bg-white hover:bg-[#FFFBF7] transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-lg">{subject.icon}</span>
                          <span className="font-semibold text-gray-900 truncate">{subject.label}</span>
                        </div>
                        {open ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>

                      {open ? (
                        <div className="px-4 pb-4">
                          <div className="pt-2 border-t border-gray-100">
                            <ul className="mt-3 space-y-2">
                              {subject.links.map((ch) => (
                                <li key={ch.url}>
                                  <a
                                    href={ch.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-tealBrand/90 transition"
                                  >
                                    {ch.name}
                                    <External />
                                  </a>
                                </li>
                              ))}
                              {subject.links.length === 0 ? (
                                <li className="text-sm text-gray-600">
                                  No channels in this subject match your filters.
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-[#FFFBF7] p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-tealBrand/80 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">
                You’re doing the right thing by seeking out better explanations. That’s not giving up — that’s being
                smart about learning. Keep going!
              </p>
            </div>
          </Card>

          {/* Online Learning Platforms */}
          <Card id="platforms-section" className="p-6 md:p-8">
            <SectionHeader
              icon={<Globe className="w-6 h-6 text-tealBrand/80" />}
              title="Online Learning Platforms (Free)"
              subtitle="Interactive practice + full courses"
            />

            {filteredPlatforms.length === 0 ? (
              <p className="mt-6 text-sm text-gray-600">No platform matches for your filters.</p>
            ) : (
              <ul className="mt-6 divide-y divide-gray-100">
                {filteredPlatforms.map((p) => (
                  <li key={p.url} className="py-4">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                          {p.name}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                        {p.meta ? <p className="text-xs text-gray-500 mt-1">{p.meta}</p> : null}
                      </div>
                      <External />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Reddit Communities */}
          <Card id="reddit-section" className="p-6 md:p-8">
            <SectionHeader
              icon={<MessageCircle className="w-6 h-6 text-tealBrand/80" />}
              title="Reddit Study Communities"
              subtitle="Real students helping each other 24/7"
            />

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-gray-200 p-5">
                <p className="text-base font-bold text-gray-900 mb-3">General Study Help</p>
                {filteredReddit.general.length === 0 ? (
                  <p className="text-sm text-gray-600">No matches.</p>
                ) : (
                  <ul className="space-y-2">
                    {filteredReddit.general.map((r) => (
                      <li key={r.url}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-tealBrand transition"
                        >
                          {r.name}
                          <External />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-2xl border border-gray-200 p-5">
                <p className="text-base font-bold text-gray-900 mb-3">Subject-Specific Help</p>
                {filteredReddit.subject.length === 0 ? (
                  <p className="text-sm text-gray-600">No matches.</p>
                ) : (
                  <ul className="space-y-2">
                    {filteredReddit.subject.map((r) => (
                      <li key={r.url}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-tealBrand transition"
                        >
                          {r.name}
                          <External />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Card>

          {/* Discord Study Servers */}
         <Card id="discord-section" className="p-6 md:p-8">
            <SectionHeader
              icon={<Users className="w-6 h-6 text-tealBrand/80" />}
              title="Discord Study Servers"
              subtitle="Live homework help & study communities"
            />

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-gray-200 p-5 bg-[#FFFBF7]">
                <p className="text-base font-bold text-gray-900 mb-3">🔍 How to Find Discord Study Communities:</p>
                {filteredDiscord.howToFind.length === 0 ? (
                  <p className="text-sm text-gray-600">No matches.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-gray-700">
                    {filteredDiscord.howToFind.map((t) => (
                      <li key={t.text} className="flex gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{t.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-2xl border border-gray-200 p-5">
                <p className="text-base font-bold text-gray-900 mb-3">💬 Popular Communities:</p>
                {filteredDiscord.communities.length === 0 ? (
                  <p className="text-sm text-gray-600">No matches.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-gray-700">
                    {filteredDiscord.communities.map((c) => (
                      <li key={c.name} className="flex gap-2">
                        <span className="text-gray-400">•</span>
                        <span>
                          <span className="font-semibold text-gray-900">{c.name}</span>
                          {c.note ? <span className="text-gray-600"> — {c.note}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Card>

          {/* Subject-Specific Free Resources */}
          <Card id="subjects-section" className="p-6 md:p-8">
            <SectionHeader
              icon={<BookOpen className="w-6 h-6 text-tealBrand/80" />}
              title="Subject-Specific Free Resources"
              subtitle="Quick “go-to” links by subject"
            />

            {filteredSubjectFree.length === 0 ? (
              <p className="mt-6 text-sm text-gray-600">No matches for your filters.</p>
            ) : (
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                {filteredSubjectFree.map((block) => (
                  <div key={block.title} className="rounded-2xl border border-gray-200 p-5">
                    <p className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>{block.icon}</span>
                      {block.title}
                    </p>

                    {block.items.length === 0 ? (
                      <p className="text-sm text-gray-600">No matches inside this subject.</p>
                    ) : (
                      <ul className="space-y-3">
                        {block.items.map((it) => (
                          <li key={it.url}>
                            <a
                              href={it.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                                    {it.name}
                                  </p>
                                  <p className="text-sm text-gray-600 leading-relaxed">{it.desc}</p>
                                </div>
                                <External />
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Study tips */}
          <Card className="p-6 md:p-8">
            <SectionHeader
              icon={<Sparkles className="w-6 h-6 text-tealBrand/80" />}
              title="Study Tips for Using These Resources"
              subtitle="Small tweaks = big results"
            />

            {filteredTips.length === 0 ? (
              <p className="mt-6 text-sm text-gray-600">No tips match your filters.</p>
            ) : (
              <div className="mt-6 space-y-3">
                {filteredTips.map((tip, i) => (
                  <div key={tip.title} className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#FFFBF7] border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-800">
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900">{tip.title}</p>
                        <p className="text-sm text-gray-700 leading-relaxed mt-1">{tip.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Footer help note */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-gray-800 leading-relaxed">
              If you’re overwhelmed, start with just one thing:
              <span className="font-semibold"> pick one video + do 3 practice problems.</span> Momentum beats perfection.
            </p>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-gray-700">
                Want to suggest a resource? Email:{" "}
                <a
                  href="mailto:morethanoneway.org@gmail.com"
                  className="font-semibold text-tealBrand/90 hover:text-orange-600"
                >
                  morethanoneway.org@gmail.com
                </a>
              </div>
              <div className="text-xs text-gray-500 italic">
                (I’ll keep this updated — the goal is “helpful,” not “perfect.”)
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudyResources;
