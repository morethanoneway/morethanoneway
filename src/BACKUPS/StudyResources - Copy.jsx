import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Youtube, Globe, MessageCircle, ExternalLink, ChevronDown, ChevronUp, Users, Sparkles } from 'lucide-react';

const StudyResources = ({ onBack }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Warm Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-8 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-blue-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📚</span>
            <h1 className="text-3xl md:text-4xl font-bold">Free Study Resources</h1>
          </div>
          <p className="text-blue-100 text-lg">100% free. No paywalls. No excuses. Just learn. 💪</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Warm Introduction */}
        <div className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 text-white rounded-2xl p-8 shadow-soft">
          <div className="flex items-start gap-4">
            <span className="text-5xl">🤔</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Can't Understand Your Professor?</h2>
              <p className="text-lg leading-relaxed opacity-95">
                Sometimes a different explanation makes everything click. These resources are <strong>100% free</strong> and used by millions of students worldwide who felt exactly like you do right now.
              </p>
              <p className="text-base mt-3 opacity-90 italic">
                You're not "bad at this subject" - you just haven't found the right teacher yet. 🌟
              </p>
            </div>
          </div>
        </div>

        {/* Student Quote */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 rounded-2xl shadow-soft">
          <div className="flex gap-3">
            <span className="text-4xl">💭</span>
            <div>
              <p className="text-gray-800 italic text-lg leading-relaxed mb-2">
                "My professor's calc lectures made zero sense. Found Professor Leonard on YouTube and EVERYTHING clicked. Went from failing to a B+."
              </p>
              <p className="text-sm text-gray-600">- Marcus, Engineering Student</p>
            </div>
          </div>
        </div>

        {/* YouTube Channels by Subject */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-red-100 to-pink-100 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Youtube className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">YouTube Channels by Subject</h2>
              <p className="text-sm text-gray-600">Click to expand each subject 👇</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Mathematics */}
            <div className="border-2 border-blue-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection('math')}
                className="w-full p-5 flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📐</span>
                  <h3 className="text-xl font-bold text-blue-900">Mathematics</h3>
                </div>
                {expandedSection === 'math' ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-blue-600" />}
              </button>
              
              {expandedSection === 'math' && (
                <div className="p-6 space-y-6 bg-gradient-to-br from-white to-blue-50">
                  <div className="border-l-4 border-green-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Khan Academy</h4>
                    <p className="text-sm text-gray-600 mb-2">Comprehensive math from arithmetic to calculus</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Algebra, Geometry, Trigonometry, Calculus, Statistics</p>
                    <a href="https://www.youtube.com/@khanacademy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-lg">Professor Leonard - HIGHLY RECOMMENDED for Calculus</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Deep, thorough math lectures with 40+ hour comprehensive courses</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Pre-Algebra, Algebra, Calculus I/II/III, Statistics, Differential Equations</p>
                    <a href="https://www.youtube.com/@ProfessorLeonard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-xs text-blue-700 italic mt-2">⭐ Students rave about this channel - saved countless calc grades!</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-lg">3Blue1Brown - BEST for Linear Algebra</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Visually stunning math explanations with beautiful animations that make concepts click</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Linear Algebra, Calculus, Differential Equations</p>
                    <p className="text-sm text-purple-700 mb-2"><strong>Famous for:</strong> "Essence of Linear Algebra" series</p>
                    <a href="https://www.youtube.com/@3blue1brown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-xs text-purple-700 italic mt-2">⭐ If linear algebra feels impossible, START HERE</p>
                  </div>

                  <div className="border-l-4 border-orange-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">PatrickJMT</h4>
                    <p className="text-sm text-gray-600 mb-2">Quick, focused math tutorials</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Algebra, Calculus, Differential Equations, Linear Algebra</p>
                    <a href="https://www.youtube.com/@patrickjmt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-red-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">The Organic Chemistry Tutor</h4>
                    <p className="text-sm text-gray-600 mb-2">2,900+ videos covering Math AND science</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Algebra, Trigonometry, Calculus, Statistics, Physics, Chemistry</p>
                    <a href="https://www.youtube.com/@TheOrganicChemistryTutor" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-pink-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Nancy Pi</h4>
                    <p className="text-sm text-gray-600 mb-2">Clear, concise math help (MIT graduate)</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Algebra, Calculus</p>
                    <a href="https://www.youtube.com/@NancyPi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-gray-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Michael Penn</h4>
                    <p className="text-sm text-gray-600 mb-2">Advanced math topics for students interested in theory</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Calculus, Differential Equations, Number Theory, Abstract Algebra</p>
                    <a href="https://www.youtube.com/@MichaelPennMath" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Chemistry */}
            <div className="border-2 border-green-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection('chemistry')}
                className="w-full p-5 flex justify-between items-center bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧪</span>
                  <h3 className="text-xl font-bold text-green-900">Chemistry</h3>
                </div>
                {expandedSection === 'chemistry' ? <ChevronUp className="text-green-600" /> : <ChevronDown className="text-green-600" />}
              </button>
              
              {expandedSection === 'chemistry' && (
                <div className="p-6 space-y-6 bg-gradient-to-br from-white to-green-50">
                  <div className="border-l-4 border-red-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">The Organic Chemistry Tutor</h4>
                    <p className="text-sm text-gray-600 mb-2">Comprehensive chemistry coverage</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> General Chemistry, Organic Chemistry, Stoichiometry, Chemical Reactions</p>
                    <a href="https://www.youtube.com/@TheOrganicChemistryTutor" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Professor Dave Explains</h4>
                    <p className="text-sm text-gray-600 mb-2">Clear, straightforward chemistry</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> General Chemistry, Organic Chemistry, Biochemistry</p>
                    <a href="https://www.youtube.com/@ProfessorDaveExplains" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Tyler DeWitt</h4>
                    <p className="text-sm text-gray-600 mb-2">Makes chemistry approachable</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> AP Chemistry, General Chemistry, Exam Prep</p>
                    <a href="https://www.youtube.com/@TylerDeWitt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Leah4Sci (Leah Fisch)</h4>
                    <p className="text-sm text-gray-600 mb-2">Organic chemistry specialist with step-by-step hand-drawn explanations</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Organic Chemistry mechanisms, reactions</p>
                    <a href="https://www.youtube.com/@Leah4sci" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-orange-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">NileRed</h4>
                    <p className="text-sm text-gray-600 mb-2">Chemistry experiments and demonstrations</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Real-world chemistry applications, lab experiments</p>
                    <a href="https://www.youtube.com/@NileRed" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-teal-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Periodic Videos</h4>
                    <p className="text-sm text-gray-600 mb-2">Element-by-element exploration by University of Nottingham</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Every element on the periodic table</p>
                    <a href="https://www.youtube.com/@periodicvideos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Physics */}
            <div className="border-2 border-purple-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection('physics')}
                className="w-full p-5 flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⚡</span>
                  <h3 className="text-xl font-bold text-purple-900">Physics</h3>
                </div>
                {expandedSection === 'physics' ? <ChevronUp className="text-purple-600" /> : <ChevronDown className="text-purple-600" />}
              </button>
              
              {expandedSection === 'physics' && (
                <div className="p-6 space-y-6 bg-gradient-to-br from-white to-purple-50">
                  <div className="border-l-4 border-red-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">The Organic Chemistry Tutor</h4>
                    <p className="text-sm text-gray-600 mb-2">Physics made clear</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Mechanics, Electricity, Magnetism, Waves, Thermodynamics</p>
                    <a href="https://www.youtube.com/@TheOrganicChemistryTutor" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Professor Dave Explains</h4>
                    <p className="text-sm text-gray-600 mb-2">Physics fundamentals</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Classical Mechanics, Electromagnetism, Modern Physics</p>
                    <a href="https://www.youtube.com/@ProfessorDaveExplains" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Michel van Biezen (ilectureonline)</h4>
                    <p className="text-sm text-gray-600 mb-2">Worked examples master with excellent problem-solving</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Physics, Chemistry, Astronomy, Math, Engineering</p>
                    <a href="https://www.youtube.com/@ilectureonline" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-yellow-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">MinutePhysics</h4>
                    <p className="text-sm text-gray-600 mb-2">Physics concepts explained simply in short videos</p>
                    <a href="https://www.youtube.com/@MinutePhysics" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Veritasium</h4>
                    <p className="text-sm text-gray-600 mb-2">Mind-bending physics explanations through experiments</p>
                    <a href="https://www.youtube.com/@veritasium" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Biology */}
            <div className="border-2 border-green-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection('biology')}
                className="w-full p-5 flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧬</span>
                  <h3 className="text-xl font-bold text-green-900">Biology</h3>
                </div>
                {expandedSection === 'biology' ? <ChevronUp className="text-green-600" /> : <ChevronDown className="text-green-600" />}
              </button>
              
              {expandedSection === 'biology' && (
                <div className="p-6 space-y-6 bg-gradient-to-br from-white to-green-50">
                  <div className="border-l-4 border-green-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Crash Course Biology</h4>
                    <p className="text-sm text-gray-600 mb-2">Biology overview</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Cell Biology, Genetics, Evolution, Ecology</p>
                    <a href="https://www.youtube.com/@crashcourse" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Khan Academy Biology</h4>
                    <p className="text-sm text-gray-600 mb-2">Comprehensive biology coverage</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Biology fundamentals, AP Biology</p>
                    <a href="https://www.youtube.com/@khanacademy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">AK Lectures</h4>
                    <p className="text-sm text-gray-600 mb-2">Medical/Biology focus (NYU Applied Math & MD graduate)</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Biochemistry, Cell Biology, Physiology</p>
                    <a href="https://www.youtube.com/@AKLectures" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Computer Science */}
            <div className="border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection('cs')}
                className="w-full p-5 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">💻</span>
                  <h3 className="text-xl font-bold text-indigo-900">Computer Science & Programming</h3>
                </div>
                {expandedSection === 'cs' ? <ChevronUp className="text-indigo-600" /> : <ChevronDown className="text-indigo-600" />}
              </button>
              
              {expandedSection === 'cs' && (
                <div className="p-6 space-y-6 bg-gradient-to-br from-white to-indigo-50">
                  <div className="border-l-4 border-green-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">freeCodeCamp</h4>
                    <p className="text-sm text-gray-600 mb-2">Full programming courses (complete multi-hour courses)</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Web Development, Python, JavaScript, Data Structures & Algorithms</p>
                    <a href="https://www.youtube.com/@freecodecamp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4 bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-red-600" />
                      <h4 className="font-bold text-lg">CS50 (Harvard) - HIGHLY RECOMMENDED</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Intro to Computer Science - Harvard's actual course, completely free</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Fundamentals of CS, Programming, Algorithms</p>
                    <a href="https://www.youtube.com/@cs50" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-xs text-red-700 italic mt-2">⭐ One of the best intro CS courses in the world - absolutely free!</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-lg">Abdul Bari - BEST for Data Structures & Algorithms</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Clear explanations with multiple examples</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Algorithms, Data Structures, Complexity Analysis</p>
                    <a href="https://www.youtube.com/c/abdulbari" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-xs text-blue-700 italic mt-2">⭐ If DSA doesn't make sense, watch Abdul Bari first!</p>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Neso Academy</h4>
                    <p className="text-sm text-gray-600 mb-2">CS fundamentals</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Data Structures, Algorithms, Operating Systems, DBMS</p>
                    <a href="https://www.youtube.com/@nesoacademy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-orange-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">MIT OpenCourseWare</h4>
                    <p className="text-sm text-gray-600 mb-2">Advanced CS topics</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Algorithms, Data Structures, AI, Machine Learning</p>
                    <a href="https://www.youtube.com/@mitocw" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-gray-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">mycodeschool</h4>
                    <p className="text-sm text-gray-600 mb-2">C/C++ Data Structures (one of the oldest, most respected channels)</p>
                    <a href="https://www.youtube.com/@mycodeschool" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-teal-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">William Fiset</h4>
                    <p className="text-sm text-gray-600 mb-2">Algorithm visualizations</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Graph algorithms, Dynamic programming</p>
                    <a href="https://www.youtube.com/@WilliamFiset-videos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-pink-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Back To Back SWE</h4>
                    <p className="text-sm text-gray-600 mb-2">Interview prep</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Coding interview problems, Data Structures</p>
                    <a href="https://www.youtube.com/@BackToBackSWE" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Economics & Business */}
            <div className="border-2 border-yellow-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection('econ')}
                className="w-full p-5 flex justify-between items-center bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  <h3 className="text-xl font-bold text-yellow-900">Economics & Business</h3>
                </div>
                {expandedSection === 'econ' ? <ChevronUp className="text-yellow-600" /> : <ChevronDown className="text-yellow-600" />}
              </button>
              
              {expandedSection === 'econ' && (
                <div className="p-6 space-y-6 bg-gradient-to-br from-white to-yellow-50">
                  <div className="border-l-4 border-green-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Jacob Clifford (ACDC Econ)</h4>
                    <p className="text-sm text-gray-600 mb-2">Micro & Macro Economics</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Microeconomics, Macroeconomics, AP Econ</p>
                    <a href="https://www.youtube.com/@ACDCLeadership" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-teal-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Khan Academy Economics</h4>
                    <p className="text-sm text-gray-600 mb-2">Comprehensive economics</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Micro, Macro, Finance basics</p>
                    <a href="https://www.youtube.com/@khanacademy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Edspira</h4>
                    <p className="text-sm text-gray-600 mb-2">Accounting & Finance</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Financial Accounting, Managerial Accounting, Finance</p>
                    <a href="https://www.youtube.com/@Edspira" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Farhat Lectures</h4>
                    <p className="text-sm text-gray-600 mb-2">Accounting tutorials</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Financial Accounting, Intermediate Accounting, Cost Accounting</p>
                    <a href="https://www.youtube.com/@AccountingLectures" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Writing & Humanities */}
            <div className="border-2 border-pink-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection('humanities')}
                className="w-full p-5 flex justify-between items-center bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📚</span>
                  <h3 className="text-xl font-bold text-pink-900">Writing & Humanities</h3>
                </div>
                {expandedSection === 'humanities' ? <ChevronUp className="text-pink-600" /> : <ChevronDown className="text-pink-600" />}
              </button>
              
              {expandedSection === 'humanities' && (
                <div className="p-6 space-y-6 bg-gradient-to-br from-white to-pink-50">
                  <div className="border-l-4 border-green-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">Crash Course</h4>
                    <p className="text-sm text-gray-600 mb-2">Philosophy, Literature, History</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Philosophy, World History, Literature, US History</p>
                    <a href="https://www.youtube.com/@crashcourse" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4 bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-lg">The School of Life</h4>
                    <p className="text-sm text-gray-600 mb-2">Philosophy & Psychology</p>
                    <p className="text-sm mb-2"><strong>Covers:</strong> Philosophy, Ethics, Emotional Intelligence</p>
                    <a href="https://www.youtube.com/@theschooloflifetv" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold">
                      Visit Channel <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Encouragement Break */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-400 p-6 rounded-2xl shadow-soft">
          <div className="flex gap-3">
            <span className="text-4xl">💪</span>
            <div>
              <p className="text-gray-800 text-lg leading-relaxed mb-2">
                <strong>You're doing the right thing</strong> by seeking out better explanations. That's not giving up - that's being smart about learning. Keep going!
              </p>
            </div>
          </div>
        </div>

        {/* Online Learning Platforms */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Online Learning Platforms (Free)</h2>
              <p className="text-sm text-gray-600">Interactive practice + full courses</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-green-400 pl-5 bg-gradient-to-r from-green-50 to-white p-5 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Khan Academy
              </h3>
              <p className="text-sm text-gray-600 mb-2">Interactive practice problems + video lessons</p>
              <p className="text-sm mb-3"><strong>Subjects:</strong> Math, Science, Economics, History, SAT/ACT Prep</p>
              <a href="https://www.khanacademy.org" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold transition-colors">
                Visit Website <ExternalLink className="w-4 h-4 inline ml-1" />
              </a>
            </div>

            <div className="border-l-4 border-red-400 pl-5 bg-gradient-to-r from-red-50 to-white p-5 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                MIT OpenCourseWare
              </h3>
              <p className="text-sm text-gray-600 mb-2">Full MIT course materials FREE - lecture notes, problem sets, exams with solutions</p>
              <a href="https://ocw.mit.edu" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-semibold transition-colors">
                Visit Website <ExternalLink className="w-4 h-4 inline ml-1" />
              </a>
            </div>

            <div className="border-l-4 border-blue-400 pl-5 bg-gradient-to-r from-blue-50 to-white p-5 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">📖</span>
                Coursera (Audit for Free)
              </h3>
              <p className="text-sm text-gray-600 mb-2">Can audit most courses for free (no certificate) - university-level courses</p>
              <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition-colors">
                Visit Website <ExternalLink className="w-4 h-4 inline ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Reddit Communities */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-orange-100 to-red-100 w-14 h-14 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Reddit Study Communities</h2>
              <p className="text-sm text-gray-600">Real students helping each other 24/7</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-white p-5 rounded-xl shadow-sm">
              <h3 className="font-bold mb-4 text-gray-900 text-lg">General Study Help</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://reddit.com/r/HomeworkHelp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/HomeworkHelp <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Get help with specific problems</p>
                </li>
                <li>
                  <a href="https://reddit.com/r/GetStudying" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/GetStudying <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Study techniques and motivation</p>
                </li>
                <li>
                  <a href="https://reddit.com/r/college" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/college <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">General college advice and support</p>
                </li>
                <li>
                  <a href="https://reddit.com/r/AskAcademia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/AskAcademia <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Academic advice and guidance</p>
                </li>
                <li>
                  <a href="https://reddit.com/r/productivity" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/productivity <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Time management and efficiency tips</p>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl shadow-sm">
              <h3 className="font-bold mb-4 text-gray-900 text-lg">Subject-Specific Help</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://reddit.com/r/learnmath" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/learnmath <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Math help and questions</p>
                </li>
                <li>
                  <a href="https://reddit.com/r/chemhelp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/chemhelp <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Chemistry homework help</p>
                </li>
                <li>
                  <a href="https://reddit.com/r/AskPhysics" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/AskPhysics <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Physics questions answered</p>
                </li>
                <li>
                  <a href="https://reddit.com/r/learnprogramming" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/learnprogramming <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Programming help and resources</p>
                </li>
                <li>
                  <a href="https://reddit.com/r/EngineeringStudents" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    r/EngineeringStudents <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-gray-600">Engineering student support</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Discord Study Servers */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Discord Study Servers</h2>
              <p className="text-sm text-gray-600">Live homework help & study communities</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              How to Find Discord Study Communities:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 mb-4">
              <li>• Search "study discord" + your subject on Reddit</li>
              <li>• Search "homework help discord" on Google</li>
              <li>• Many YouTube creators have Discord servers (check video descriptions)</li>
            </ul>

            <div className="mt-4 pt-4 border-t border-indigo-200">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">💬</span>
                Popular Communities:
              </h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>The Study Hall</strong> - Multi-subject homework help</li>
                <li>• <strong>Homework Help</strong> - Live tutoring and study groups</li>
                <li>• <strong>CS50 Discord</strong> - Computer Science community</li>
                <li>• Search for subject-specific servers like "Math Help Discord"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Subject-Specific Resources */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            Subject-Specific Free Resources
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-400 pl-5 bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">📐 Mathematics</h3>
              <div className="space-y-3">
                <div>
                  <a href="https://tutorial.math.lamar.edu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    Paul's Online Math Notes <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-sm text-gray-600">Algebra, Calculus, Differential Equations - clear explanations + practice problems</p>
                </div>
                <div>
                  <a href="https://www.symbolab.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    Symbolab <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-sm text-gray-600">Step-by-step math problem solver</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-400 pl-5 bg-gradient-to-r from-green-50 to-white p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">🧪 Chemistry</h3>
              <div>
                <a href="https://chem.libretexts.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                  ChemLibreTexts <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-sm text-gray-600">Free chemistry textbooks</p>
              </div>
            </div>

            <div className="border-l-4 border-purple-400 pl-5 bg-gradient-to-r from-purple-50 to-white p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">⚡ Physics</h3>
              <div>
                <a href="http://hyperphysics.phy-astr.gsu.edu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                  HyperPhysics <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-sm text-gray-600">Interactive physics concepts</p>
              </div>
            </div>

            <div className="border-l-4 border-indigo-400 pl-5 bg-gradient-to-r from-indigo-50 to-white p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">💻 Computer Science</h3>
              <div>
                <a href="https://www.geeksforgeeks.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                  GeeksforGeeks <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-sm text-gray-600">Programming tutorials, data structures, algorithms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-4xl">💡</span>
            Study Tips for Using These Resources
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white/10 p-4 rounded-xl backdrop-blur">
              <span className="text-3xl">1️⃣</span>
              <div>
                <p className="font-bold text-lg">Don't just watch - DO</p>
                <p className="text-blue-100">Pause videos and try problems yourself. Active learning &gt; passive watching.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 p-4 rounded-xl backdrop-blur">
              <span className="text-3xl">2️⃣</span>
              <div>
                <p className="font-bold text-lg">Use multiple sources</p>
                <p className="text-blue-100">If one explanation doesn't click, try another. Everyone learns differently.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 p-4 rounded-xl backdrop-blur">
              <span className="text-3xl">3️⃣</span>
              <div>
                <p className="font-bold text-lg">Join communities</p>
                <p className="text-blue-100">Reddit/Discord for when you're stuck. Real people who get it.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 p-4 rounded-xl backdrop-blur">
              <span className="text-3xl">4️⃣</span>
              <div>
                <p className="font-bold text-lg">Search strategically</p>
                <p className="text-blue-100">"[Your course name] + lecture notes" finds materials from other universities.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 p-4 rounded-xl backdrop-blur">
              <span className="text-3xl">5️⃣</span>
              <div>
                <p className="font-bold text-lg">Quality &gt; Quantity:</p>
                <p className="text-blue-100">One good 20-minute video beats hours of unfocused studying.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 rounded-2xl shadow-soft p-10 text-center">
          <span className="text-6xl block mb-4">🌟</span>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Remember</h3>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            These are supplemental resources. They work best <strong>ALONGSIDE</strong> your course materials, not as replacements.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-sm text-left max-w-xl mx-auto mb-6">
            <p className="font-semibold text-gray-900 mb-3">✅ Use them when:</p>
            <ul className="space-y-2 text-gray-700">
              <li>• Your professor's explanation didn't click</li>
              <li>• You need more practice problems</li>
              <li>• You're studying for an exam</li>
              <li>• You want to get ahead</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl shadow-lg inline-block">
            <p className="text-xl font-bold">All of these resources are 100% free.</p>
            <p className="text-lg opacity-90 mt-1">No excuses. Just learn. 💪</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyResources;