import React, { useRef } from "react";
import { useState } from "react";
import { Mail, ExternalLink, MessageCircle } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const Contact = ({ setCurrentPage }) => {
  const formRef = useRef(null);

  const [copied, setCopied] = useState(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText("support@morethanoneway.org");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy email");
  }
};

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ Put your real links here
  const socials = [
    { label: "Instagram", href: "https://instagram.com/morethanonewayproject" },
    { label: "Facebook", href: "https://facebook.com/morethanonewayproject" },
  ];

  // ✅ Google Form embed URL (NOT the normal share link)
  // In Google Forms: Send -> <> Embed -> copy the iframe src
  const googleFormEmbedSrc =
    "https://docs.google.com/forms/d/e/1FAIpQLSeJG30gsSLWH5NU1jYSf-nyBjrGAlT0uWwrcMcQvPtdw5nUAQ/viewform?embedded=true";

  return (
    <>
    <Helmet>
  <title>Contact Us | MoreThanOneWay.org</title>
  <meta name="description" content="Have a question, suggestion, or want to share your story? Get in touch with the MoreThanOneWay team." />
  <meta name="keywords" content="contact morethanoneway, get in touch, student support contact, share your story" />
  <meta property="og:title" content="Contact Us | MoreThanOneWay.org" />
  <meta property="og:description" content="Have a question or want to share your story? Get in touch with the MoreThanOneWay team." />
</Helmet>
    <div className="bg-[#FFFBF7]">
      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10 space-y-8">
        {/* Hero */}
        <header className="text-center max-w-5xl mx-auto pt-2">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Contact{" "}
            <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              More Than One Way
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Feedback, questions, or something you’d rather share privately — send it here.
            <br className="hidden md:block" />
            <span className="text-gray-600">No pressure. No weirdness.</span>
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
  <button
    onClick={() => window.location.href = "mailto:support@morethanoneway.org"}
    className="px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition inline-flex items-center gap-2"
  >
    <Mail className="w-5 h-5" />
    Email us
  </button>

<a
  href="https://docs.google.com/forms/d/e/1FAIpQLSeJG30gsSLWH5NU1jYSf-nyBjrGAlT0uWwrcMcQvPtdw5nUAQ/viewform"
  target="_blank"
  rel="noopener noreferrer"
  className="px-5 py-3 rounded-xl border border-gray-200 bg-white font-semibold text-gray-900 hover:bg-gray-50 transition inline-flex items-center gap-2"
>
  <MessageCircle className="w-5 h-5" />
  Contact form
</a>

</div>
        </header>
<div className="grid gap-4 lg:grid-cols-2">
  {/* LEFT: Quick note (keep) */}
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
    <h3 className="text-lg font-bold text-gray-900 mb-2">A quick note</h3>

    <p className="text-sm text-gray-700 leading-relaxed">
      This form/email isn’t a crisis line. If you’re in immediate danger or thinking about hurting yourself,
      please call or text <span className="font-semibold">988</span> (24/7) or text <span className="font-semibold">HOME</span> to{" "}
      <span className="font-semibold">741741</span>.
    </p>

    <button
      onClick={() => setCurrentPage?.("crisis")}
      className="mt-3 font-semibold text-[#006581] hover:text-[#005A73] underline underline-offset-2 text-sm"
    >
      See all crisis resources →
    </button>

    <div className="mt-4 rounded-xl bg-[#006581]/5 border border-[#006581]/10 p-4">
      <p className="text-sm font-semibold text-gray-900 mb-2">
        If you’re contacting about the site, include:
      </p>
      <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
        <li>what page you were on</li>
        <li>what you expected</li>
        <li>what actually happened</li>
      </ul>
    </div>
  </div>

  {/* RIGHT: Other ways to contact us */}
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className="h-10 w-10 rounded-2xl bg-[#006581]/10 ring-1 ring-[#006581]/15 flex items-center justify-center">
        <Mail className="w-5 h-5 text-[#006581]" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">Other ways to contact us</h3>
    </div>

    <p className="text-sm text-gray-600 mb-3">
      Prefer email or socials? Totally fine.
    </p>

    <div className="rounded-xl border border-[#006581]/25 bg-white p-4">
  <button
    onClick={copyEmail}
    className="
      w-full flex items-center justify-between gap-3
      rounded-lg px-4 py-3
      font-semibold text-[#006581]
      hover:bg-[#006581]/10
      transition
    "
  >
    <span className="truncate">support@morethanoneway.org</span>
    <span className="text-sm text-gray-500">
      {copied ? "Copied!" : "Copy"}
    </span>
  </button>

  <p className="mt-2 text-xs text-gray-500">
    We’ll do our best to respond soon (not a 24/7 support line).
  </p>
</div>


    <div className="mt-4 grid gap-2">
      <a
        href="https://instagram.com/morethanonewayproject"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition"
      >
        Instagram <ExternalLink className="w-4 h-4 text-gray-500" />
      </a>
    

      <a
        href="https://facebook.com/morethanonewayproject"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition"
      >
        Facebook <ExternalLink className="w-4 h-4 text-gray-500" />
      </a>
    </div>
  
  </div>
</div>

        
      </div>
    </div>
    </>
  );
};

export default Contact;
