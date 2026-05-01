import React, { useEffect, useRef, useState } from "react";

const NavLink = ({ label, onClick, isActive = false }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
      ${isActive ? "text-gray-900" : "text-gray-700 hover:text-gray-900"}
      hover:bg-gray-100`}
  >
    {label}
  </button>
);

const Dropdown = ({ label, children, open, setOpen }) => {
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [setOpen]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors inline-flex items-center gap-1"
      >
        {label}
        <span className="text-gray-400">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-sm p-2 z-50">
          {children}
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ label, desc, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
  >
    <div className="text-sm font-semibold text-gray-900">{label}</div>
    {desc ? <div className="text-xs text-gray-500 mt-0.5">{desc}</div> : null}
  </button>
);

export default function NavBar({ currentPage, setCurrentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [currentPage]);

  const go = (pageKey) => setCurrentPage(pageKey);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="w-full px-6 lg:px-12">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 font-extrabold tracking-tight text-gray-900 hover:opacity-90 transition-opacity"
          >
            <span className="text-lg">💛</span>
            <span className="text-lg">More Than One Way</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Opportunities */}
            
            {/* Job Tools */}
           <Dropdown
  label="Job Tools"
  open={openMenu === "jobtools"}
  setOpen={(v) => setOpenMenu(v ? "jobtools" : null)}
>
  <div className="px-3 pt-1 pb-1 text-xs font-semibold text-gray-400">EXPLORE</div>
  <MenuItem
    label="Career Paths"
    desc="See what your degree can do"
    onClick={() => go("pivot")}
  />

  <div className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400">BUILD</div>
  <MenuItem
    label="Resume Builder"
    desc="Turn projects into bullets"
    onClick={() => go("resume-builder")}
  />
  <MenuItem
    label="Cover Letter Generator"
    desc="Free, no sign-up"
    onClick={() => go("cover-letter")}
  />
  <MenuItem
    label="ATS Guide"
    desc="Make sure it gets through"
    onClick={() => go("ats-guide")}
  />

  <div className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400">APPLY & TRACK</div>
  <MenuItem
    label="Application Tracker"
    desc="Stay organized"
    onClick={() => go("application-tracker")}
  />
  <MenuItem
    label="Search Guide"
    desc="Search smarter, not longer"
    onClick={() => go("search-guide")}
  />
  <MenuItem
    label="Job Alert Guide"
    desc="Let opportunities come to you"
    onClick={() => go("job-alert")}
  />

  <div className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400">PREPARE</div>
  <MenuItem
    label="Interview Prep"
    desc="Answer well without sounding scripted"
    onClick={() => go("interview-prep")}
  />
</Dropdown>

            {/* Stories */}
            <NavLink
              label="Stories"
              isActive={currentPage === "stories"}
              onClick={() => go("stories")}
            />

            {/* Resources */}
            <Dropdown
              label="Resources"
              open={openMenu === "resources"}
              setOpen={(v) => setOpenMenu(v ? "resources" : null)}
            >
              <MenuItem
                label="Career Resources"
                desc="Templates + guides"
                onClick={() => go("career-resources")}
              />
              <MenuItem
                label="Free Study Help"
                desc="When the lecture isn’t clicking"
                onClick={() => go("free-study-help")}
              />
              <MenuItem
                label="Volunteer Opportunities"
                desc="Give back, build experience"
                onClick={() => go("volunteer-opportunities")}
              />
              <MenuItem
                label="Take a Breather"
                desc="Need a break?"
                onClick={() => go("take-a-breather")}
              />
            </Dropdown>

            {/* About */}
            <NavLink
              label="About"
              isActive={currentPage === "about"}
              onClick={() => go("about")}
            />

            {/* Need Help Now */}
            <button
              onClick={() => go("crisis")}
              className="ml-2 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Need Help Now
            </button>
          </nav>

          {/* Mobile button */}
          <button
            className="md:hidden px-3 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-3 space-y-2">
              <div className="grid gap-1">
                <button onClick={() => go("home")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                  Home
                </button>

<div className="px-3 pt-2 text-xs font-semibold text-gray-500">EXPLORE</div>
<button onClick={() => go("pivot")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
  Career Paths
</button>

<div className="px-3 pt-2 text-xs font-semibold text-gray-500">BUILD</div>
<button onClick={() => go("resume-builder")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
  Resume Builder
</button>
<button onClick={() => go("cover-letter")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
  Cover Letter Generator
</button>
<button onClick={() => go("ats-guide")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
  ATS Guide
</button>

<div className="px-3 pt-2 text-xs font-semibold text-gray-500">APPLY & TRACK</div>
<button onClick={() => go("application-tracker")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
  Application Tracker
</button>
<button onClick={() => go("search-guide")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
  Search Guide
</button>
<button onClick={() => go("job-alert")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
  Job Alert Guide
</button>

<div className="px-3 pt-2 text-xs font-semibold text-gray-500">PREPARE</div>
<button onClick={() => go("interview-prep")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
  Interview Prep
</button>

                <div className="px-3 pt-2 text-xs font-semibold text-gray-500">STORIES</div>
                <button onClick={() => go("stories")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                  Real Stories
                </button>

                <div className="px-3 pt-2 text-xs font-semibold text-gray-500">RESOURCES</div>
                <button onClick={() => go("career-resources")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                  Career Resources
                </button>
                <button onClick={() => go("free-study-help")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                  Free Study Help
                </button>
                <button onClick={() => go("volunteer-opportunities")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                  Volunteer Opportunities
                </button>
                <button onClick={() => go("take-a-breather")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                  Take a Breather
                </button>

                <div className="px-3 pt-2 text-xs font-semibold text-gray-500">ABOUT</div>
                <button onClick={() => go("about")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                  About
                </button>

                <button
                  onClick={() => go("crisis")}
                  className="mt-2 bg-red-600 text-white px-3 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Need Help Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
