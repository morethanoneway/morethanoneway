import React, { useMemo, useState } from "react";
import { Helmet } from 'react-helmet-async';
import {
  Heart,
  Users,
  Clock,
  MapPin,
  Laptop,
  Calendar,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";

const Volunteer = ({ onBack, setCurrentPage }) => {
  const [open, setOpen] = useState({
    why: true,
    commitment: false,
    types: false,
  });

  const benefitCards = useMemo(
    () => [
      {
        icon: "🧠",
        title: "Gets you out of your head",
        description:
          "When you're spiraling about your own stuff, helping someone else can shift your perspective — even for just a few hours.",
      },
      {
        icon: "🫂",
        title: "Builds real connections",
        description:
          "It’s easier to make friends while doing something meaningful than at forced networking events. These connections stick.",
      },
      {
        icon: "💪",
        title: "Reminds you you’re capable",
        description:
          "When everything feels shaky, helping someone is proof you still have value to offer. That matters.",
      },
      {
        icon: "📝",
        title: "Looks good on resumes",
        description:
          "Employers like seeing you care about something beyond yourself. It’s a practical benefit too.",
      },
    ],
    []
  );

  const commitmentOptions = useMemo(
    () => [
      {
        level: "One-time events",
        time: "2–4 hours, one day",
        description:
          "Help with a single event — food drives, campus clean-ups, charity runs. Low pressure, easy to fit in.",
        examples:
          "Habitat for Humanity build day, local food bank sorting, campus blood drive",
        icon: Calendar,
      },
      {
        level: "Ongoing (flexible)",
        time: "A few hours per month",
        description:
          "Regular volunteering, but on your schedule. Pick it up when you can. No guilt when you can’t.",
        examples: "Tutoring kids, animal shelter visits, meal delivery",
        icon: Users,
      },
      {
        level: "Virtual volunteering",
        time: "From your room, whenever",
        description:
          "Help remotely. Great for busy schedules, anxiety, or when leaving campus is just not happening.",
        examples:
          "Crisis Text Line counselor, online tutoring, transcription for accessibility",
        icon: Laptop,
      },
      {
        level: "Regular commitment",
        time: "Weekly, set schedule",
        description:
          "More involved but often more rewarding. You build deeper relationships and see real impact over time.",
        examples:
          "Big Brothers Big Sisters, hospital volunteering, youth mentoring",
        icon: Heart,
      },
    ],
    []
  );

  const opportunities = useMemo(
    () => [
      {
        name: "VolunteerMatch",
        description:
          "Search by location, cause, and time commitment. Has filters for virtual opportunities too.",
        link: "https://www.volunteermatch.org/",
        highlight: "Best for: finding local opportunities",
      },
      {
        name: "Idealist",
        description:
          "Nonprofit job board + volunteer opportunities. Good for ongoing commitments.",
        link: "https://www.idealist.org/",
        highlight: "Best for: long-term volunteering",
      },
      {
        name: "Crisis Text Line",
        description:
          "Become a crisis counselor (virtual). Requires training, but it’s genuinely impactful.",
        link: "https://www.crisistextline.org/volunteer/",
        highlight: "Best for: making a real difference remotely",
      },
      {
        name: "Habitat for Humanity",
        description:
          "Build houses for families in need. Physical work with visible impact.",
        link: "https://www.habitat.org/volunteer",
        highlight: "Best for: hands-on, one-day commitments",
      },
      {
        name: "Local food banks",
        description:
          'Google “[your city] food bank volunteer” — they almost always need help sorting and packing.',
        link: "",
        highlight: "Best for: drop-in volunteering",
      },
    ],
    []
  );

  const volunteerTypes = useMemo(
    () => [
      {
        emoji: "🐕",
        title: "Animals",
        examples: "Shelters, wildlife rehab, fostering",
        personality:
          "Good for: animal lovers who want lower-pressure social interaction",
      },
      {
        emoji: "👶",
        title: "Kids & youth",
        examples: "Tutoring, mentoring, coaching",
        personality: "Good for: patient people who like direct impact",
      },
      {
        emoji: "🌳",
        title: "Environment",
        examples: "Park clean-ups, tree planting, trail maintenance",
        personality: "Good for: outdoor people and movement lovers",
      },
      {
        emoji: "🍲",
        title: "Food security",
        examples: "Food banks, soup kitchens, meal delivery",
        personality: "Good for: hands-on helpers and community builders",
      },
      {
        emoji: "🏥",
        title: "Healthcare support",
        examples: "Hospital volunteers, patient transport, companionship",
        personality:
          "Good for: empathetic people comfortable around illness",
      },
      {
        emoji: "💻",
        title: "Tech & skills",
        examples:
          "Website building for nonprofits, resume help, teaching tech skills",
        personality: "Good for: using your strengths to help quickly",
      },
      {
        emoji: "🎨",
        title: "Arts & culture",
        examples: "Museum docent, theater usher, community art projects",
        personality: "Good for: creative types who like cultural events",
      },
      {
        emoji: "📞",
        title: "Crisis support",
        examples: "Hotlines, disaster relief, outreach",
        personality: "Good for: resilient people who want high-impact work",
      },
    ],
    []
  );

  return (
    <>
    <Helmet>
  <title>Volunteer Opportunities for College Students | MoreThanOneWay.org</title>
  <meta name="description" content="Find volunteer opportunities that build real skills and look great on a resume. Free resources for college students looking to give back and grow." />
  <meta name="keywords" content="volunteer opportunities college students, volunteering for resume, student volunteer programs, community service college, build skills volunteering" />
  <meta property="og:title" content="Volunteer Opportunities | MoreThanOneWay.org" />
  <meta property="og:description" content="Find volunteer opportunities that build real skills and look great on a resume — free resources for college students." />
</Helmet>
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header */}
        <header className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Volunteer{" "}
            <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              & Help Others
            </span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
            Sometimes helping others helps you too. Get out of your own head,
            build connections, and remember you have something valuable to give.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          {/* Why Volunteer (collapsible) */}
          <Card>
            <CollapsibleHeader
              title="Why volunteer when you’re already overwhelmed?"
              subtitle="It sounds counterintuitive — but here’s why it can actually help."
              open={open.why}
              onToggle={() => setOpen((p) => ({ ...p, why: !p.why }))}
              icon={<MessageCircle className="w-6 h-6 text-tealBrand/80" />}
            />
            {open.why && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {benefitCards.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-gray-200 bg-white p-5"
                  >
                    <div className="text-3xl">{b.icon}</div>
                    <h3 className="mt-3 font-bold text-gray-900">{b.title}</h3>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Commitment Level (collapsible) */}
          <Card>
            <CollapsibleHeader
              title="Choose your commitment level"
              subtitle="Even small commitments count. Pick what’s realistic right now."
              open={open.commitment}
              onToggle={() =>
                setOpen((p) => ({ ...p, commitment: !p.commitment }))
              }
              icon={<Clock className="w-6 h-6 text-tealBrand/80" />}
            />
            {open.commitment && (
              <div className="mt-6 space-y-4">
                {commitmentOptions.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.level}
                      className="rounded-2xl border border-gray-200 bg-white p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Icon className="w-5 h-5 text-tealBrand/80" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="font-bold text-gray-900">
                              {c.level}
                            </h3>
                            <span className="text-sm font-semibold text-gray-600">
                              {c.time}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                            {c.description}
                          </p>
                          <p className="mt-2 text-xs text-gray-500">
                            <span className="font-semibold text-gray-600">
                              Examples:
                            </span>{" "}
                            {c.examples}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Where to find opportunities */}
          <Card>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-tealBrand/80" />
              <h2 className="text-2xl font-bold text-gray-900">
                Where to find opportunities
              </h2>
            </div>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Not sure where to start? These connect you with opportunities that
              actually need help.
            </p>

            <div className="mt-6 space-y-3">
              {opportunities.map((o) =>
                o.link ? (
                  <a
                    key={o.name}
                    href={o.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-gray-200 bg-white p-5 hover:border-gray-300 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-gray-900">{o.name}</p>
                        <p className="mt-1 text-sm text-gray-700">
                          {o.description}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-tealBrand/90">
                          {o.highlight}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    </div>
                  </a>
                ) : (
                  <div
                    key={o.name}
                    className="rounded-2xl border border-gray-200 bg-white p-5"
                  >
                    <p className="font-bold text-gray-900">{o.name}</p>
                    <p className="mt-1 text-sm text-gray-700">{o.description}</p>
                    <p className="mt-2 text-xs font-semibold text-tealBrand/90">
                      {o.highlight}
                    </p>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Types (collapsible) */}
          <Card>
            <CollapsibleHeader
              title="What kind of volunteering?"
              subtitle="Pick something that fits your personality — you’re more likely to stick with it."
              open={open.types}
              onToggle={() => setOpen((p) => ({ ...p, types: !p.types }))}
              icon={<Sparkles className="w-6 h-6 text-tealBrand/80" />}
            />
            {open.types && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {volunteerTypes.map((t) => (
                  <div
                    key={t.title}
                    className="rounded-2xl border border-gray-200 bg-white p-5"
                  >
                    <div className="text-3xl">{t.emoji}</div>
                    <h3 className="mt-2 font-bold text-gray-900">{t.title}</h3>
                    <p className="mt-1 text-sm text-gray-700">{t.examples}</p>
                    <p className="mt-2 text-xs text-gray-500 italic">
                      {t.personality}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Real Talk */}
          <Card>
            <div className="flex items-start gap-3">
              <div className="text-3xl">💬</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Real talk about volunteering
                </h2>
                <p className="mt-1 text-sm text-gray-600 italic">
                  Things people don’t always say
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-gray-700">
              <RealTalkItem
                icon="✅"
                bold="It’s okay to be selfish about it."
                text="Volunteer because it helps you. The impact on others is a bonus."
              />
              <RealTalkItem
                icon="⏰"
                bold="You don’t have to commit forever."
                text="Try it once. If you hate it, don’t go back. No guilt."
              />
              <RealTalkItem
                icon="🤝"
                bold="Networking happens naturally."
                text="You’ll meet people without trying. Way better than cold LinkedIn messages."
              />
              <RealTalkItem
                icon="📝"
                bold="One day counts."
                text="Even if you volunteer once, it’s resume-worthy and conversation-worthy."
              />
              <RealTalkItem
                icon="💭"
                bold="It’s okay if you’re doing it to feel better."
                text="Most people are. That’s kind of the point."
              />
            </ul>
          </Card>

          {/* Final encouragement */}
          <div className="rounded-2xl  bg-tealBrand p-8 text-center">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              You have something to give
            </h3>
            <p className="mt-4 text-white leading-relaxed max-w-3xl mx-auto">
              Even when you feel like you’re barely holding it together, you
              still have value to offer. Volunteering can remind you of that —
              and sometimes that’s exactly what you need.
            </p>
            <p className="mt-4 text-white">
              Start small. Pick one thing. See how it feels. 
            </p>
          </div>

                   
        </div>
      </div>
    </div>
    </>
  );
};

function Card({ children }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      {children}
    </section>
  );
}

function CollapsibleHeader({ title, subtitle, open, onToggle, icon }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-start justify-between gap-3 text-left"
      type="button"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 flex-shrink-0">{icon}</div>
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-1 flex-shrink-0 text-gray-500">
        {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
    </button>
  );
}

function RealTalkItem({ icon, bold, text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-lg">{icon}</span>
      <span className="text-sm leading-relaxed">
        <span className="font-semibold text-gray-900">{bold}</span>{" "}
        <span className="text-gray-700">{text}</span>
      </span>
    </li>
  );
}

export default Volunteer;
