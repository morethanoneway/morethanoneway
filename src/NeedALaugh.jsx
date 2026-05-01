import React, { useRef } from "react";
import { Youtube, ExternalLink, Heart, Star, Smile, Globe, Wind } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const NeedALaugh = ({ onBack, setCurrentPage }) => {
  const refs = {
    featured: useRef(null),
    youtube: useRef(null),
    joy: useRef(null),
    cool: useRef(null),
    calm: useRef(null),
    crisis: useRef(null),
  };

  const scrollTo = (key) => {
    refs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const featured = {
    title: "Jim Carrey's Commencement Speech",
    subtitle: "Before you dive into cat videos… watch this first",
    description:
      "One of the most powerful (and funny) speeches out there — fear, failure, taking risks, and why the 'safe path' isn't actually safe.",
    note: "Short on time? Start at minute marker 10:10.",
    link: "https://www.youtube.com/watch?v=V80-gPkpH6M",
    meta: "≈ 26 minutes • Worth it",
  };

  const channels = [
    {
      name: "Hot Ones",
      description:
        "Celebrities eat increasingly spicy wings while answering questions. Hilarious reactions + surprisingly good interviews.",
      link: "https://www.youtube.com/@FirstWeFeast",
      tags: ["Funny", "Interviews"],
    },
    {
      name: "King Chilli The Pug",
      description: "Adorable pug videos that will make you smile. (Some videos may have adult humor.)",
      link: "https://www.youtube.com/@kingchillithepug",
      tags: ["Wholesome", "Pets"],
    },
    {
      name: "Viva La Dirt League",
      description: "Gaming/workplace comedy sketches. No thinking required, just laughs.",
      link: "https://www.youtube.com/@VivaLaDirtLeague",
      tags: ["Sketch", "Gaming"],
    },
    {
      name: "Daily Dose of Internet",
      description: "3-minute compilations of wholesome internet clips. Perfect study break length.",
      link: "https://www.youtube.com/@DailyDoseOfInternet",
      tags: ["Wholesome", "Quick"],
    },
    {
      name: "Gus Johnson",
      description: "Short comedy sketches about everyday annoying things. Often under 2 minutes.",
      link: "https://www.youtube.com/@GusJohnson",
      tags: ["Sketch", "Quick"],
    },
  ];

  const randomJoy = [
    {
      title: "r/AnimalsBeingDerps",
      description: "Instant brain reset. Just… animals being animals.",
      link: "https://www.reddit.com/r/AnimalsBeingDerps/",
      tags: ["Wholesome", "Quick"],
    },
    {
      title: "The Dodo",
      description: "Short rescue stories + happy endings.",
      link: "https://www.youtube.com/@TheDodo",
      tags: ["Wholesome", "Pets"],
    },
    {
      title: "GeoGuessr videos",
      description: "Low-stakes chaos + surprisingly entertaining.",
      link: "https://www.youtube.com/results?search_query=geoguessr+funny",
      tags: ["Funny", "Gaming"],
    },
  ];

  const coolThings = [
    {
      title: "Your Name in Landsat",
      description: "NASA shows your name as seen from space using satellite imagery. Genuinely cool.",
      link: "https://science.nasa.gov/specials/your-name-in-landsat/",
      tags: ["Interactive", "Space"],
    },
    {
      title: "Astronomy Picture of the Day",
      description: "NASA posts a new stunning space photo every single day. Good for perspective.",
      link: "https://apod.nasa.gov/apod/astropix.html",
      tags: ["Space", "Wholesome"],
    },
    {
      title: "The Useless Web",
      description: "Click the button. Get sent to a random pointless website. Oddly satisfying.",
      link: "https://theuselessweb.com/",
      tags: ["Interactive", "Funny"],
    },
    {
      title: "Pointer Pointer",
      description: "Move your mouse and it finds a photo of someone pointing exactly at your cursor.",
      link: "https://pointerpointer.com/",
      tags: ["Interactive", "Funny"],
    },
    {
      title: "Silk",
      description: "Generative art that follows your mouse. Strangely relaxing. Just move and see what happens.",
      link: "https://weavesilk.com/",
      tags: ["Interactive", "Wholesome"],
    },
    {
      title: "Windows 93",
      description: "A fake retro operating system you can explore in your browser. Surprisingly fun.",
      link: "https://www.windows93.net/",
      tags: ["Interactive", "Funny"],
    },
  ];

  return (
    <>
    <Helmet>
  <title>Need a Break? Memes & Humor for Stressed Students | MoreThanOneWay.org</title>
  <meta name="description" content="Sometimes you just need to laugh. Memes, jokes, and humor for stressed-out college students. Because laughter really is medicine." />
  <meta name="keywords" content="college student memes, stressed student humor, funny college memes, student life jokes, need a break" />
  <meta property="og:title" content="Need a Break? | MoreThanOneWay.org" />
  <meta property="og:description" content="Memes and humor for stressed-out college students. Sometimes laughter is the best medicine." />
</Helmet>
    <section className="bg-[#FFFBF7] py-10 rounded-2xl">
      <div className="mx-auto w-full max-w-6xl px-4 space-y-8">
        {/* Header */}
        <header className="text-center max-w-5xl mx-auto">
          {onBack && (
            <div className="flex justify-start mb-6">
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Need a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              Break?
            </span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
            Sometimes you just need a brain break. It won't fix everything — but it helps.
          </p>
        </header>

        {/* Jump buttons */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Jump to</p>
          <div className="flex flex-wrap gap-2">
           {[
              { label: 'Featured', key: 'featured', icon: <Star className="w-4 h-4" /> },
              { label: 'YouTube Breaks', key: 'youtube', icon: <Youtube className="w-4 h-4" /> },
              { label: 'Random Joy', key: 'joy', icon: <Smile className="w-4 h-4" /> },
              { label: 'Cool Things', key: 'cool', icon: <Globe className="w-4 h-4" /> },
              { label: 'Calm Down', key: 'calm', icon: <Wind className="w-4 h-4" /> },
              { label: 'Need More Help', key: 'crisis', icon: <Heart className="w-4 h-4" /> },
            ].map(item => (
              <button key={item.key} onClick={() => scrollTo(item.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#006581]/30 text-[#006581] bg-white hover:bg-[#006581] hover:text-white text-sm font-semibold transition-colors">
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div ref={refs.featured} className="bg-white rounded-2xl border border-gray-200 p-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Youtube className="w-4 h-4 text-tealBrand/80" />
                Featured
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{featured.subtitle}</h2>
              <p className="mt-3 text-gray-700 leading-relaxed max-w-3xl">{featured.description}</p>
              <p className="mt-3 text-sm text-gray-600 italic">{featured.note}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="text-xs text-gray-500">{featured.meta}</span>
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-tealBrand/90 text-white px-5 py-3 rounded-xl font-bold hover:bg-tealBrand transition shadow-soft"
              >
                Watch on YouTube <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-700">
              <strong> Why this matters right now:</strong> when you're stressed about grades, your major, or your future,
              this is a reminder that even wildly successful people had the same fear loop.
            </p>
          </div>
        </div>

        {/* YouTube section */}
        <div ref={refs.youtube} className="scroll-mt-24">
          <ResourceSection
            title="YouTube Study Breaks"
            subtitle="When you need 10 minutes of 'brain off' without doomscrolling."
            items={channels}
            renderItem={(item) => <LinkCard key={item.link} title={item.name} description={item.description} link={item.link} tags={item.tags} />}
          />
        </div>

        {/* Random joy */}
        <div ref={refs.joy} className="scroll-mt-24">
          <ResourceSection
            title="Random Joy"
            subtitle="Small things that reliably make people smile."
            items={randomJoy}
            renderItem={(item) => <LinkCard key={item.link} title={item.title} description={item.description} link={item.link} tags={item.tags} />}
          />
        </div>

        {/* Cool Things */}
        <div ref={refs.cool} className="scroll-mt-24">
          <ResourceSection
            title="Cool Things to Look At"
            subtitle="Interesting, beautiful, or just weird. Good for a genuine mental reset."
            items={coolThings}
            renderItem={(item) => <LinkCard key={item.link} title={item.title} description={item.description} link={item.link} tags={item.tags} />}
          />
        </div>

        {/* Calm/Focus */}
        <div ref={refs.calm} className="bg-white rounded-2xl border border-gray-200 p-6 scroll-mt-24">
          <h2 className="text-xl font-extrabold text-gray-900">If You Need to Calm Down</h2>
          <p className="mt-2 text-sm text-gray-600">Not laughing — just breathing. These actually help.</p>
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            {[
              { title: "Noisli", desc: "Mix background sounds — rain, coffee shop, white noise. Good for focus or winding down.", url: "https://www.noisli.com/" },
              { title: "Calm", desc: "Free breathing exercises and short meditations. No account needed for the basics.", url: "https://www.calm.com/" },
              { title: "The Quiet Place", desc: "Intentionally slow and calming. Just read and breathe.", url: "https://thequietplaceproject.com/thequietplace" },
            ].map(item => (
              <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer"
                className="group block bg-gray-50 rounded-2xl border border-gray-200 p-5 hover:bg-white transition">
                <p className="font-bold text-gray-900 group-hover:text-tealBrand transition">{item.title}</p>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                <p className="mt-3 text-xs text-tealBrand font-semibold flex items-center gap-1">Visit <ExternalLink className="w-3 h-3" /></p>
              </a>
            ))}
          </div>
        </div>

        {/* Crisis Resources */}
        <div ref={refs.crisis} className="bg-white rounded-2xl border border-gray-200 p-6 scroll-mt-24">
          <div className="flex items-start gap-3">
            <div className="bg-red-50 text-red-700 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold text-gray-900">If it's more than "need a break"</h3>
              <p className="mt-2 text-sm text-gray-700">
                If you're struggling right now, you don't have to tough it out alone.
              </p>
              <p className="mt-3 text-sm text-gray-700">
                <strong>988 Suicide &amp; Crisis Lifeline:</strong> Call or text <strong>988</strong> (24/7)
                <br />
                <strong>Crisis Text Line:</strong> Text <strong>HOME</strong> to <strong>741741</strong>
              </p>

              <button
                onClick={() => setCurrentPage?.("crisis")}
                className="mt-3 text-sm font-semibold text-red-700 hover:text-red-800 underline"
              >
                View all crisis resources →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

// ---------- helpers ----------

const ResourceSection = ({ title, subtitle, items, renderItem }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6">
    <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
    {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
    <div className="mt-5 grid md:grid-cols-2 gap-4">
      {items.map(renderItem)}
    </div>
  </div>
);

const LinkCard = ({ title, description, link, tags = [] }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group block bg-white rounded-2xl border border-gray-200 p-5 hover:bg-gray-50 transition"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-bold text-gray-900 group-hover:text-tealBrand transition">{title}</p>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{description}</p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
    </div>
  </a>
);

export default NeedALaugh;
