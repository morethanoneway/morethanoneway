import React, { useEffect, useState } from 'react';

import ShareButtons from './Sharebuttons';
import { Helmet } from 'react-helmet-async';
import {
  BookOpen, Users, Heart, DollarSign, HelpCircle, AlertCircle, Phone,
  ExternalLink, ChevronDown, ChevronUp, Search, CheckSquare, Mail,
  Building, GraduationCap, LifeBuoy, X
} from 'lucide-react';

const YoureNotAlone = ({ setCurrentPage, setSelectedPostSlug }) => {
  const [openSection, setOpenSection] = useState(null);
  const [universityName, setUniversityName] = useState('');

  // ✅ NEW: top quick buttons popups
  const [openQuick, setOpenQuick] = useState(null);
  const toggleQuick = (key) => setOpenQuick((prev) => (prev === key ? null : key));
  const closeQuick = () => setOpenQuick(null);

  // ESC closes popup
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeQuick();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const findCampusResources = () => {
    if (!universityName.trim()) {
      alert('Please enter your university name');
      return;
    }

    const searches = [
      `${universityName} wellness center`,
      `${universityName} counseling services`,
      `${universityName} disability services`,
      `${universityName} financial aid emergency fund`,
      `${universityName} academic advising`,
    ];

    searches.forEach((search) => {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(search)}`, '_blank');
    });
  };


  const sections = [
    {
      id: 'failing',
      icon: <BookOpen className="w-5 h-5" />,
      title: "I'm Failing or Struggling in Classes",
      color: 'blue',
      content: (
        <div className="space-y-6">
          {/* DO THIS TODAY - Directive Section */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-orange-600" />
              Do These 3 Things Today
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-900">Schedule a wellness center appointment</p>
                  <p className="text-sm text-gray-600">Use the campus finder above. When you're this overwhelmed, getting help IS the most productive thing you can do. A 50-minute appointment could save you dozens of hours of unproductive studying.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-900">Email your professors</p>
                  <p className="text-sm text-gray-600">Template below. Do this BEFORE grades are finalized. Most professors want to help students who are actively seeking support.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-900">Contact disability services</p>
                  <p className="text-sm text-gray-600">Even if you don't think you have a "disability" - ADHD, anxiety, depression all qualify. You can get extended test time, note-taking support, reduced-distraction testing. It's not too late.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specific Scenarios */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border-l-4 border-purple-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">💊 "I think I have ADHD"</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Yes, most college wellness centers can evaluate and prescribe ADHD medication.</strong> There's usually an evaluation process first. Call and ask specifically about their ADHD assessment timeline - some schools can move quickly. If you've been succeeding through sheer willpower but now you're maxed out, you need proper support.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">📊 "My grades are slipping and I'll lose my scholarship"</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Most scholarships have more flexibility than students realize.</strong> They often look at cumulative GPA or give warnings before revoking anything. Check your specific scholarship terms - a couple of lower grades during the most stressful semester probably isn't the catastrophe you fear. Also, contact financial aid about emergency appeals.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-green-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">🚗 "I had an emergency (car accident, family crisis, etc.)"</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Document everything and contact your professors and financial aid immediately.</strong> Many schools have emergency funds specifically for situations like this. Don't wait on people who ghosted you - go directly to the offices. Explain the situation (including current mental health struggles). Ask about crisis funds, hardship withdrawals, or grade appeals.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-orange-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">🧠 "I can't focus or retain anything"</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>This is what accommodations are for.</strong> When stress maxes out your coping capacity, you're not functioning at baseline. Register with disability services - accommodations like extended time, reduced-distraction environments, and note-taking support can make a huge difference. It's not "cheating" - it's leveling the playing field.
              </p>
            </div>
          </div>

          {/* Email Template */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <h5 className="font-bold text-gray-900">Email Template for Professors</h5>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 font-mono text-sm text-gray-700 leading-relaxed">
              <p>Subject: [Your Name] - Request for Meeting About [Course Name]</p>
              <br />
              <p>Dear Professor [Name],</p>
              <br />
              <p>I'm currently struggling in your class and wanted to reach out before grades are finalized. I've been dealing with [brief, honest explanation: overwhelming stress, family emergency, untreated ADHD, etc.] and it's impacting my ability to perform at my usual level.</p>
              <br />
              <p>I'm actively seeking help through [wellness center/disability services/counseling] and want to discuss if there are any options for [make-up work/extra credit/incomplete grade/hardship withdrawal].</p>
              <br />
              <p>I take full responsibility and am committed to improving. Could we schedule a brief meeting to discuss next steps?</p>
              <br />
              <p>Thank you for your time.</p>
              <p>[Your Name]</p>
            </div>
            <p className="text-xs text-gray-600 mt-3 italic">
              💡 Pro tip: Send this ASAP. Professors are more flexible when you're proactive about getting help.
            </p>
          </div>

          {/* Study Resources Link */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-l-4 border-green-400">
            <h5 className="font-bold text-gray-900 mb-2">📚 Can't understand your professor?</h5>
            <p className="text-gray-700 text-sm mb-3">
              Sometimes you just need someone to explain it differently. Check out our free study resources.
            </p>
            <button
              onClick={() => setCurrentPage('study-resources')}
              className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-1 text-sm"
            >
              View Free Study Resources <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'family',
      icon: <Heart className="w-5 h-5" />,
      title: "My Family Isn't Supportive / I'm Doing This Alone",
      color: 'purple',
      content: (
        <div className="space-y-6">
          {/* Intro */}
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-xl">
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Not having family support is more common than you think.</strong> Whether it's because of your identity, your choices, or circumstances beyond your control—you don't have to navigate college alone.
            </p>
            <p className="text-gray-700 leading-relaxed">
              There are actual organizations run by real parents, grandparents, and adults who volunteer to be "chosen family" for students who need them.
            </p>
          </div>

          {/* Organizations */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border-l-4 border-pink-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                💙 PFLAG (Parents, Families & Friends of Lesbians and Gays)
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <strong>Largest LGBTQ+ family support organization.</strong> Local chapters connect you with supportive parents who want to help students whose families rejected them. Support groups, one-on-one connections, help navigating tough situations.
              </p>
              <a
                href="https://pflag.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 font-semibold text-sm flex items-center gap-1"
              >
                Find Your Local Chapter <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                🤗 Free Mom Hugs
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <strong>Affirming moms for LGBTQ+ people.</strong> They show up at Pride events, college campuses, offering literal hugs, emotional support, and "mom" advice. For LGBTQ+ students whose moms aren't supportive.
              </p>
              <a
                href="https://freemomhugs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1"
              >
                Visit Free Mom Hugs <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-green-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                👨 Free Dad Hugs
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <strong>Supportive father figures for LGBTQ+ people.</strong> Same concept as Free Mom Hugs—dads who show up when biological dads can't or won't.
              </p>
              <a
                href="https://freedadhugs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 font-semibold text-sm flex items-center gap-1"
              >
                Visit Free Dad Hugs <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-purple-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                📞 The Trevor Project (LGBTQ+ Youth)
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <strong>Crisis support + resources for LGBTQ+ youth (13-24).</strong> 24/7 crisis line, plus connection to local support networks and chosen family resources.
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Call:</strong> <a href="tel:1-866-488-7386" className="text-purple-600 hover:underline">1-866-488-7386</a></p>
                <p><strong>Text:</strong> START to 678-678</p>
                <p><strong>Chat:</strong> <a href="https://www.thetrevorproject.org/get-help" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">thetrevorproject.org/get-help</a></p>
              </div>
            </div>
          </div>

          {/* Campus Resources */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-blue-400">
            <h5 className="font-bold text-gray-900 mb-2">🎓 On Your Campus</h5>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Most colleges have resources that can help:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>LGBTQ+ Resource Center:</strong> Mentor programs, support groups, "chosen family" dinners</li>
              <li><strong>First-Generation Student Programs:</strong> If your family can't guide you through college</li>
              <li><strong>Campus Counseling:</strong> Support for navigating family rejection or estrangement</li>
              <li><strong>Student Organizations:</strong> Found family through communities that accept you</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3 italic">
              Use the Campus Resource Finder in the sidebar to find these at your school
            </p>
          </div>

          {/* First-Gen Specific */}
          <div className="bg-white p-5 rounded-xl border-l-4 border-orange-400 shadow-soft">
            <h5 className="font-bold text-gray-900 mb-2">👥 "I'm the first in my family to go to college"</h5>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              <strong>First-generation students have specific challenges.</strong> Your family might be supportive but unable to help with college navigation. Many schools have dedicated first-gen programs with mentors who can fill that gap.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Search "[Your University] First-Generation Student Programs" or ask your academic advisor. These programs connect you with faculty/staff mentors, peer support, and guidance your family can't provide.
            </p>
          </div>

          {/* During Holidays */}
          <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
            <h5 className="font-bold text-gray-900 mb-2">🍂 Holidays Are the Hardest</h5>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              <strong>When everyone else goes home and you can't (or don't want to):</strong>
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Some PFLAG families invite students for holidays</li>
              <li>• Many campuses offer housing/meals for students who can't go home</li>
              <li>• Create "Friendsgiving" with other students in similar situations</li>
              <li>• Volunteer at shelters or soup kitchens—gives purpose and community</li>
            </ul>
            <p className="text-sm text-gray-700 mt-3 italic">
              You're allowed to create new traditions.
            </p>
          </div>

          {/* Bottom Support */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-l-4 border-purple-400">
            <h5 className="font-bold text-gray-900 mb-2">💜 You Deserve Support</h5>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              <strong>If your family isn't there for you, it's not because you're unlovable.</strong> Sometimes families fail us because of their own biases, beliefs, or limitations.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              That's on them, not you.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Thousands of students navigate college without family support. Thousands have found chosen family. You can too.
            </p>
          </div>

          {/* Learn More - Link to Blog Post */}
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <h5 className="font-bold text-gray-900 mb-2">📖 Learn More</h5>
            <p className="text-gray-700 text-sm mb-3">
              We wrote a comprehensive guide to these resources.
            </p>
            <button
              onClick={() => {
                setCurrentPage('blog-post');
                setSelectedPostSlug('chosen-family-resources');
              }}
              className="text-purple-700 font-semibold hover:text-purple-800 flex items-center gap-1 text-sm"
            >
              Read: Finding Chosen Family Resources <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'alone',
      icon: <Users className="w-5 h-5" />,
      title: "I Feel Completely Alone",
      color: 'green',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            You're not alone in feeling alone. That's the cruel irony - thousands of students feel exactly this way, but everyone's hiding it.
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-l-4 border-purple-400">
            <h5 className="font-bold text-gray-900 mb-3">Where to find connection:</h5>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>Campus counseling groups</strong> - Many schools offer free support groups for students</li>
              <li>• <strong>Study groups</strong> - Even if you're struggling, showing up builds connection</li>
              <li>• <strong>Student organizations</strong> - Especially identity-based groups (LGBTQ+, first-gen, cultural orgs)</li>
              <li>• <strong>Online communities</strong> - r/college, r/CollegeRant can be surprisingly supportive</li>
              <li>• <strong>Wellness center</strong> - Individual counseling helps you process isolation</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-soft">
            <p className="text-gray-700 text-sm italic leading-relaxed">
              💭 "I started going to the campus mental health support group even though I was terrified. Everyone there felt as alone as I did. Just knowing I wasn't the only one drowning made it easier to breathe."
            </p>
            <p className="text-xs text-gray-600 mt-2">- Jamie, Sophomore</p>
          </div>
          <button
            onClick={() => setCurrentPage('stories')}
            className="text-purple-700 font-semibold hover:text-purple-800 flex items-center gap-1 text-sm"
          >
            Read more stories like this <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )
    },
    {
      id: 'dont-want',
      icon: <AlertCircle className="w-5 h-5" />,
      title: "I Don't Even Want to Be Here",
      color: 'purple',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            That's a valid feeling. Not everyone needs to finish college right now - or at all. Let's figure out what makes sense for YOUR situation.
          </p>
          <div className="space-y-3">
            <div className="bg-white p-5 rounded-xl border-l-4 border-orange-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">Option 1: Take a Leave of Absence</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                Most schools allow 1-2 semesters off without losing your status. You can work, travel, figure things out, then return. Talk to your academic advisor about the process.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">Option 2: Change Your Major</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                If you hate your classes but not college itself, maybe you're in the wrong program. Check out our Career Paths tool to see what else your skills could lead to.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border-l-4 border-green-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">Option 3: Alternative Paths</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                Trade schools, bootcamps, apprenticeships, military - plenty of successful people never finished traditional college. That's okay. Not finishing doesn't mean you failed.
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>⚠️ Important:</strong> Don't make major decisions while you're in crisis. Get some support first (wellness center, trusted advisor, family), THEN decide your next move. Depression tells lies about your options.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'career-services',
      icon: <Building className="w-5 h-5" />,
      title: "Went to Career Services, Still Have No Idea",
      color: 'indigo',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            You did the "responsible" thing - made an appointment, showed up, talked to someone. But you left feeling just as lost, or maybe even more overwhelmed. That's not because you failed - it's because knowing what questions to ask is a skill nobody teaches you.
          </p>

          {/* BEFORE YOUR NEXT APPOINTMENT */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-6 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              Before Your Next Appointment: Do This Prep
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Career counselors can't read your mind. The more specific you are, the more they can help.</p>

              <div className="bg-white p-4 rounded-lg border-l-2 border-green-400">
                <p className="font-bold text-gray-900 mb-2">✅ Come prepared with:</p>
                <ul className="space-y-1">
                  <li>• A list of 3-5 skills you're good at (even if they feel basic)</li>
                  <li>• 2-3 things you definitely DON'T want to do</li>
                  <li>• Your biggest concern (money? job security? not being bored?)</li>
                  <li>• Whether you want to stay local or are willing to relocate</li>
                  <li>• A rough timeline (graduating when? need internship by when?)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-2 border-orange-400">
                <p className="font-bold text-gray-900 mb-2">❌ Don't say:</p>
                <ul className="space-y-1">
                  <li>• "I don't know what I want to do" (too vague)</li>
                  <li>• "I'll do anything" (not helpful for them either)</li>
                  <li>• "Whatever pays well" (doesn't narrow it down)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* QUESTIONS TO ASK */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-4">🎯 Specific Questions That Get Better Answers</h4>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Instead of: "What jobs can I get with my major?"</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Ask:</strong></p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• "Can you show me LinkedIn profiles of 5 recent [your major] grads from our school?"</li>
                  <li>• "What are 3 jobs I could apply to RIGHT NOW with my current skills?"</li>
                  <li>• "Which of these paths has the most open positions for entry-level?"</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Instead of: "Help me find an internship"</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Ask:</strong></p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• "What companies hired [your major] interns from our school last year?"</li>
                  <li>• "Are there smaller local companies I should look at that aren't on Handshake?"</li>
                  <li>• "Can you connect me with a student who got an internship in [specific field]?"</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Instead of: "I don't know what career path to choose"</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Ask:</strong></p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• "I'm good at [X] and [Y] but hate [Z]. What roles match that?"</li>
                  <li>• "Can we look at 3 different career paths and map out what I'd need for each?"</li>
                  <li>• "Which paths have the best work-life balance / highest pay / most remote options?"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* MAJOR-SPECIFIC GUIDANCE */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-6 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-4">📚 Major-Specific Guidance (Pick Yours)</h4>
            <p className="text-gray-700 text-sm mb-4">
              Some majors are especially overwhelming because they're too broad or unclear. Click yours for specific questions to ask:
            </p>

            <div className="space-y-3">
              {/* Business Major */}
              <details className="bg-white rounded-lg border border-gray-200">
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                  📊 Business Major
                </summary>
                <div className="p-4 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">"Business" is too broad. Even career counselors struggle with this because there are 50+ directions you could go.</p>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">Ask them to help you narrow it down:</p>
                    <ul className="space-y-1">
                      <li>• "What's the difference between business analyst, operations analyst, and financial analyst roles?"</li>
                      <li>• "Can we look at entry-level job postings in [marketing/finance/operations] and see which sounds most interesting?"</li>
                      <li>• "Which business track has the most entry-level openings right now?"</li>
                      <li>• "Can you connect me with business alumni working in [specific industry]?"</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-1">💡 Quick direction-finder:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Like numbers/analysis? → Finance, Accounting, Business Analytics</li>
                      <li>• Like people/creativity? → Marketing, HR, Sales</li>
                      <li>• Like solving problems/systems? → Operations, Supply Chain, Consulting</li>
                      <li>• Like starting things? → Entrepreneurship, Business Development</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setCurrentPage('pivot')}
                    className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1"
                  >
                    See business career paths with salary data <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </details>

              {/* Liberal Arts/Humanities */}
              <details className="bg-white rounded-lg border border-gray-200">
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                  📖 English, History, Philosophy, or Other Liberal Arts
                </summary>
                <div className="p-4 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">Everyone asks "What will you do with that?" and you're tired of hearing it. Your skills are valuable - you just need to translate them.</p>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">Ask career services:</p>
                    <ul className="space-y-1">
                      <li>• "What companies value strong writers/researchers outside of teaching or academia?"</li>
                      <li>• "Can you show me tech companies that hire liberal arts majors?"</li>
                      <li>• "What alumni with my major are working in [tech/business/nonprofit] sectors?"</li>
                      <li>• "How do I translate 'wrote 20-page research paper' into professional skills?"</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-1">Your transferable skills include:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Research & analysis → Market research, UX research, Data analysis</li>
                      <li>• Writing & communication → Technical writing, Content strategy, Copywriting</li>
                      <li>• Critical thinking → Consulting, Policy analysis, Business analysis</li>
                      <li>• Attention to detail → Editing, Quality assurance, Operations</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setCurrentPage('pivot')}
                    className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1"
                  >
                    See alternative career paths for your major <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </details>

              {/* Psychology */}
              <details className="bg-white rounded-lg border border-gray-200">
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                  🧠 Psychology Major
                </summary>
                <div className="p-4 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">Not everyone wants to be a therapist (and grad school isn't required for lots of psych-related careers).</p>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">Ask career services:</p>
                    <ul className="space-y-1">
                      <li>• "What psychology-related jobs don't require a master's or PhD?"</li>
                      <li>• "Can we look at UX research roles? What would I need to add to my resume?"</li>
                      <li>• "What companies hire psych majors for HR, market research, or user research?"</li>
                      <li>• "How do I position my research methods coursework for non-academic jobs?"</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-1">Paths that use psych skills:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• UX Researcher (how people use products)</li>
                      <li>• HR Specialist (people management)</li>
                      <li>• Market Research Analyst (consumer behavior)</li>
                      <li>• Behavioral Health Technician (direct care work)</li>
                      <li>• Training & Development (adult learning)</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setCurrentPage('pivot')}
                    className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1"
                  >
                    See psychology career paths <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </details>

              {/* Communications */}
              <details className="bg-white rounded-lg border border-gray-200">
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                  📢 Communications Major
                </summary>
                <div className="p-4 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">"Communications" covers everything from PR to social media to corporate comms. You need to specialize.</p>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">Ask career services:</p>
                    <ul className="space-y-1">
                      <li>• "What's the difference between PR, corporate communications, and marketing communications?"</li>
                      <li>• "Are there companies hiring entry-level social media managers?"</li>
                      <li>• "Can you show me internal communications roles? What do they actually do?"</li>
                      <li>• "Which track has better job prospects: digital marketing or traditional PR?"</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-1">Pick a specialty:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Digital Marketing (ads, campaigns, metrics)</li>
                      <li>• Public Relations (media, crisis management)</li>
                      <li>• Corporate Communications (internal messaging)</li>
                      <li>• Social Media Management (content, community)</li>
                      <li>• Content Strategy (planning, editorial)</li>
                    </ul>
                  </div>
                </div>
              </details>

              {/* Biology/Life Sciences */}
              <details className="bg-white rounded-lg border border-gray-200">
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                  🔬 Biology or Life Sciences Major
                </summary>
                <div className="p-4 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">Not going to med school? Didn't get into grad school? There are SO many other paths.</p>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">Ask career services:</p>
                    <ul className="space-y-1">
                      <li>• "What biotech/pharma companies hire at the bachelor's level?"</li>
                      <li>• "Can we look at clinical research coordinator roles? What's the career path?"</li>
                      <li>• "Are there science-adjacent careers I'm not thinking of?"</li>
                      <li>• "What alumni decided not to do med school - where are they now?"</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-1">Non-med school options:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Clinical Research Coordinator (trials, studies)</li>
                      <li>• Lab Technician (biotech, pharma, hospitals)</li>
                      <li>• Medical/Science Writer (content for healthcare)</li>
                      <li>• Regulatory Affairs (FDA compliance)</li>
                      <li>• Science Sales (lab equipment, pharma)</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setCurrentPage('pivot')}
                    className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1"
                  >
                    See biology career alternatives <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </details>

              {/* Computer Science */}
              <details className="bg-white rounded-lg border border-gray-200">
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                  💻 Computer Science Major (Overwhelmed by Options)
                </summary>
                <div className="p-4 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">CS has the opposite problem - too many options, everyone wants something different, hard to know which path to pick.</p>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">Ask career services:</p>
                    <ul className="space-y-1">
                      <li>• "What's the difference between software engineer, data engineer, and DevOps roles?"</li>
                      <li>• "Which tech companies hire the most from our school?"</li>
                      <li>• "Are there CS-adjacent roles that are less coding-intensive?"</li>
                      <li>• "What's realistic for someone without a ton of side projects?"</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-1">If you're not sure which CS path:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Like building things? → Software Engineer, Full Stack Developer</li>
                      <li>• Like data/analysis? → Data Engineer, Analytics Engineer</li>
                      <li>• Like security? → Cybersecurity Analyst, Security Engineer</li>
                      <li>• Don't love coding all day? → Product Manager, Technical Writer, UX</li>
                    </ul>
                  </div>
                </div>
              </details>

              {/* Undecided/Exploring */}
              <details className="bg-white rounded-lg border border-gray-200">
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                  ❓ Undecided / Still Exploring Majors
                </summary>
                <div className="p-4 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">It's okay to not know yet. You're not behind.</p>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">Ask career services:</p>
                    <ul className="space-y-1">
                      <li>• "Can we do a career assessment to narrow down my interests?"</li>
                      <li>• "What majors have the most flexible career paths?"</li>
                      <li>• "Can you show me what students with different majors are doing now?"</li>
                      <li>• "Is it okay to explore internships in different fields before declaring?"</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-bold text-gray-900 mb-1">Ways to figure it out:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Take diverse classes (see what you don't hate)</li>
                      <li>• Try different part-time jobs or volunteer roles</li>
                      <li>• Talk to upperclassmen about their majors</li>
                      <li>• Shadow professionals in fields you're curious about</li>
                      <li>• Use our Career Paths tool to see what's out there</li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>

            <p className="text-xs text-gray-600 mt-4 italic">
              💡 Don't see your major? Use the general questions above and adapt them to your field.
            </p>
          </div>

          {/* HOW TO ADVOCATE FOR YOURSELF */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-400 p-6 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-4">💪 How to Advocate for Yourself</h4>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">1. If the advice is too vague, ask for specifics</p>
                <p><strong>They say:</strong> "You should network more"</p>
                <p><strong>You say:</strong> "Can you give me 3 specific people I should reach out to and what to say in my message?"</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">2. If you don't understand, say so</p>
                <p><strong>They say:</strong> "You need to leverage your transferable skills"</p>
                <p><strong>You say:</strong> "Can we go through my resume line by line and identify what those are?"</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">3. Ask for next steps before you leave</p>
                <p className="font-semibold text-gray-900 mb-1">End every appointment with:</p>
                <ul className="space-y-1 ml-4">
                  <li>• "What should I do before our next meeting?"</li>
                  <li>• "Can you send me those resources you mentioned?"</li>
                  <li>• "Who else should I talk to about this?"</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">4. If one counselor isn't helpful, try another</p>
                <p>Career centers have multiple counselors. Some specialize in certain majors or industries. Ask the front desk: "Who's the best person to talk to about [your specific situation]?"</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">5. Ask for concrete tools, not just advice</p>
                <p className="font-semibold text-gray-900 mb-1">Request:</p>
                <ul className="space-y-1 ml-4">
                  <li>• "Can I see example resumes from [your major] students who got hired?"</li>
                  <li>• "What companies have hired from our school in the past 2 years?"</li>
                  <li>• "Can you share the alumni contact list for [your major]?"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AFTER CAREER SERVICES - STILL STUCK */}
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-soft">
            <h4 className="font-bold text-gray-900 mb-4">🔄 You Went, You Asked Good Questions, Still Stuck?</h4>
            <p className="text-gray-700 text-sm mb-4">
              Sometimes you can do everything "right" and still feel lost. That's normal. Here's what to do next:
            </p>

            <div className="space-y-3 text-sm">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Option 1: Use our tools to explore on your own</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setCurrentPage('find-internships')}
                    className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1"
                  >
                    → Search actual internship postings by major
                  </button>
                  <button
                    onClick={() => setCurrentPage('pivot')}
                    className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1"
                  >
                    → See what jobs your major leads to (with salary data)
                  </button>
                  <button
                    onClick={() => setCurrentPage('search-guide')}
                    className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1"
                  >
                    → Step-by-step internship search guide
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Option 2: Talk to people doing actual jobs</p>
                <p className="text-gray-700">LinkedIn informational interviews &gt; career counselor advice. Find 5 people working in roles that sound interesting. Message them: "I'm a [major] student at [school] trying to learn about [their field]. Could I ask you 3 quick questions about your career path?"</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Option 3: Just start applying</p>
                <p className="text-gray-700">Sometimes you figure it out by trying stuff. Apply to 10-15 internships in different areas. See which ones you're excited to hear back from. That tells you something.</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Option 4: It's okay to not know yet</p>
                <p className="text-gray-700">If you're a freshman or sophomore, you're not behind. Try different classes, join clubs, get a part-time job. Sometimes career clarity comes from what you DON'T want to do.</p>
              </div>
            </div>
          </div>

          {/* STUDENT QUOTE */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-soft">
            <p className="text-gray-700 text-sm italic leading-relaxed">
              💭 "I went to career services three times and kept leaving more confused. Then I started asking 'Can you show me exactly what that looks like?' instead of just nodding along. The fourth appointment was way more helpful because I made them give me concrete examples."
            </p>
            <p className="text-xs text-gray-600 mt-2">- Alex, Business Major, Junior</p>
          </div>
        </div>
      )
    },
    {
      id: 'afford',
      icon: <DollarSign className="w-5 h-5" />,
      title: "I Can't Afford This",
      color: 'orange',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Financial stress is one of the top reasons students struggle. Here are resources that actually exist (but schools don't always advertise):
          </p>
          <div className="space-y-3">
            <div className="bg-white p-5 rounded-xl border-l-4 border-green-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">💰 Emergency Funds</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                Most colleges have emergency grant programs for students facing unexpected hardship. Search "[your school] emergency fund" or ask financial aid directly. These are often grants (not loans) ranging from $500-$5,000.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">🍽️ Food Insecurity Resources</h5>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Campus food pantries (usually free, no questions asked)</li>
                <li>• SNAP benefits (many students qualify - apply at benefits.gov)</li>
                <li>• Meal plan waivers if you live off-campus</li>
                <li>• Emergency meal vouchers from student affairs</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl border-l-4 border-purple-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">🏠 Housing Support</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                Some schools offer emergency housing, rent assistance, or can connect you with local resources. Also check if you qualify for year-round housing (some schools offer this free or reduced for students who can't go "home").
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border-l-4 border-orange-400 shadow-soft">
              <h5 className="font-bold text-gray-900 mb-2">📚 Textbook Alternatives</h5>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Library reserves (often have textbooks you can check out)</li>
                <li>• OpenStax (free textbooks for many courses)</li>
                <li>• Libgen / Z-Library (we won't tell)</li>
                <li>• Course reserves - ask your professor</li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl border-l-4 border-red-400">
            <h5 className="font-bold text-gray-900 mb-2">🆘 If you're facing immediate financial crisis:</h5>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>1. Contact financial aid office TODAY - explain your situation</li>
              <li>2. Ask specifically about emergency grants, not just loans</li>
              <li>3. Talk to your academic advisor about hardship withdrawal if needed</li>
              <li>4. Check if your state has emergency rental assistance</li>
              <li>5. Call 211 for local emergency resources (food, rent, utilities)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'no-idea',
      icon: <HelpCircle className="w-5 h-5" />,
      title: "No Idea What I Want to Do",
      color: 'indigo',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Good news: You don't have to have it all figured out. Most people change careers 3-7 times in their lifetime anyway.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-blue-400">
            <h5 className="font-bold text-gray-900 mb-3">Start here:</h5>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentPage('pivot')}
                className="w-full bg-white p-4 rounded-lg text-left hover:shadow-md transition-all border border-gray-200"
              >
                <h6 className="font-semibold text-gray-900 mb-1">Career Path Explorer</h6>
                <p className="text-sm text-gray-600">See what your current major could lead to (including non-obvious paths)</p>
              </button>
              <button
                onClick={() => setCurrentPage('find-internships')}
                className="w-full bg-white p-4 rounded-lg text-left hover:shadow-md transition-all border border-gray-200"
              >
                <h6 className="font-semibold text-gray-900 mb-1">Try Internships</h6>
                <p className="text-sm text-gray-600">Best way to figure out what you don't want (that's progress too)</p>
              </button>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-soft">
            <p className="text-gray-700 text-sm italic leading-relaxed">
              💭 "I spent 3 years panicking about not having a 'passion.' Then I realized most people just pick something they're decent at and don't hate. That's okay. Work doesn't have to be your identity."
            </p>
            <p className="text-xs text-gray-600 mt-2">- Marcus, Recent Grad</p>
          </div>
        </div>
      )
    },
    {
      id: 'everything',
      icon: <AlertCircle className="w-5 h-5" />,
      title: "It's Just... Everything",
      color: 'red',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            When everything is falling apart at once, you need to triage. You can't fix everything today - and that's okay.
          </p>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-400">
            <h5 className="font-bold text-gray-900 mb-4">Today's Priority: Survival</h5>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">1.</span>
                <p className="text-gray-700">Are you safe? Do you have somewhere to sleep tonight? Enough food? If no, use campus finder above for emergency resources.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">2.</span>
                <p className="text-gray-700">Are you in danger of hurting yourself? If yes, call 988 or go to emergency room. Everything else can wait.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">3.</span>
                <p className="text-gray-700">Can you do ONE small thing today? Schedule one appointment. Send one email. Eat one meal. That's enough.</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-soft">
            <h5 className="font-bold text-gray-900 mb-3">This Week's Goal: Ask for Help</h5>
            <p className="text-gray-700 text-sm mb-3">
              You can't fix everything alone. Pick ONE person to tell:
            </p>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Wellness center counselor (use campus finder)</li>
              <li>• Academic advisor</li>
              <li>• Trusted professor</li>
              <li>• Parent/family member</li>
              <li>• Friend who's been through something hard</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-l-4 border-green-400">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Remember:</strong> The fact that you're here, reading this, looking for help - that means you haven't given up. That's huge. Keep going. One day, one hour, one minute at a time.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'crisis',
      icon: <Phone className="w-5 h-5" />,
      title: "I'm in Crisis Right Now",
      color: 'red',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border-l-4 border-red-500">
            <h5 className="font-bold text-red-900 mb-4 text-lg">If you're thinking about hurting yourself, please reach out RIGHT NOW:</h5>
            <div className="space-y-4 text-sm">
              <div className="bg-white p-4 rounded-lg border-2 border-red-400">
                <p className="font-bold text-red-900 mb-1">988 Suicide & Crisis Lifeline</p>
                <p className="text-2xl font-bold text-red-700 mb-2">Call or text: 988</p>
                <p className="text-gray-700">Available 24/7. Free. Confidential. Someone will listen.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-red-400">
                <p className="font-bold text-red-900 mb-1">Crisis Text Line</p>
                <p className="text-2xl font-bold text-red-700 mb-2">Text HOME to 741741</p>
                <p className="text-gray-700">If you prefer texting. 24/7. Trained counselors.</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-soft">
            <h5 className="font-bold text-gray-900 mb-3">Other immediate options:</h5>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• <strong>Campus Emergency Services:</strong> Most schools have 24/7 crisis counselors. Use campus finder above to find yours.</li>
              <li>• <strong>Emergency Room:</strong> If you're in immediate danger, go to ER. They can help.</li>
              <li>• <strong>Campus Police (non-emergency):</strong> Can transport you to crisis services if needed</li>
              <li>• <strong>The Trevor Project (LGBTQ+ youth):</strong> 1-866-488-7386 or text START to 678-678</li>
              <li>• <strong>Trans Lifeline:</strong> 1-877-565-8860</li>
              <li>• <strong>National Domestic Violence Hotline:</strong> 1-800-799-SAFE (7233)</li>
              <li>• <strong>National Maternal Mental Health Hotline:</strong> 1-833-TLC-MAMA (833-852-6262)</li>
              <li>• <strong>Blackline (Black, Brown, Native & Muslim Support):</strong> 1-800-604-5841</li>
              <li>• <strong>National Substance Abuse & Mental Health Services Administration Helpline:</strong> 1-800-622-HELP (4357)</li>
            </ul>
          </div>
          <button
            onClick={() => setCurrentPage('crisis')}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold hover:from-red-700 hover:to-pink-700 shadow-lg transition-all"
          >
            View All Crisis Resources →
          </button>
          <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>You matter.</strong> This feeling is temporary. You've survived 100% of your worst days so far. People want to help - let them. ❤️
            </p>
          </div>
        </div>
      )
    }
  ];

  const sectionColors = {
    blue: { border: 'border-blue-400', bg: 'bg-blue-50', hover: 'hover:bg-blue-100' },
    green: { border: 'border-green-400', bg: 'bg-green-50', hover: 'hover:bg-green-100' },
    purple: { border: 'border-purple-400', bg: 'bg-purple-50', hover: 'hover:bg-purple-100' },
    orange: { border: 'border-orange-400', bg: 'bg-orange-50', hover: 'hover:bg-orange-100' },
    indigo: { border: 'border-indigo-400', bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100' },
    red: { border: 'border-red-400', bg: 'bg-red-50', hover: 'hover:bg-red-100' }
  };


  return (
    <>
    <Helmet>
  <title>Struggling with College? You're Not Alone | MoreThanOneWay.org</title>
  <meta name="description" content="Feeling overwhelmed, burnt out, or like you're the only one struggling? You're not. Real support and honest resources for college students going through a hard time." />
  <meta name="keywords" content="struggling in college, college burnout, overwhelmed student, college mental health, academic stress, you are not alone" />
  <meta property="og:title" content="You're Not Alone | MoreThanOneWay.org" />
  <meta property="og:description" content="Feeling overwhelmed or burnt out in college? You're not alone — real support for students going through a hard time." />
</Helmet>
      <Helmet>
        <title>I'm Struggling in College - Academic & Mental Health Support | MoreThanOneWay.org</title>
        <meta
          name="description"
          content="Failing classes? Can't afford college? Feeling alone? Get real help for academic struggles, financial stress, and mental health."
        />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">

        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          {/* ✅ KEY FIX: grid reserves space for sidebar so it never overlaps */}

          {/* MAIN */}
          <main className="min-w-0">
            {/* Header */}
            <header className="text-center max-w-5xl mx-auto pt-2 mb-8">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                You Are Not{' '}
                <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                  Alone
                </span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
                Real support for real struggles. No judgement, just options.
              </p>
            </header>
            <div className="max-w-5xl mx-auto mb-8">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <button
      onClick={() => toggleQuick('crisis')}
      className="bg-gray-900 text-white px-7 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all"
    >
      <h3 className="font-bold text-white text-base mb-1">
        Need help right now?
      </h3>
      <p className="text-sm text-white leading-snug">
        Immediate crisis and support resources
      </p>
    </button>

    <button
      onClick={() => toggleQuick('campus')}
      className="bg-gray-100 text-gray-700 px-7 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-white transition-all"
    >
      <h3 className="font-bold text-gray-900 text-base mb-1">
        Find help at your school
      </h3>
      <p className="text-sm text-gray-600 leading-snug">
        Wellness, disability, and academic support
      </p>
    </button>

    <button
      onClick={() => toggleQuick('more')}
      className="bg-white text-gray-700 px-7 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-100 transition-all"
    >
      <h3 className="font-bold text-gray-900 text-base mb-1">
        Explore more resources
      </h3>
      <p className="text-sm text-gray-600 leading-snug">
        Stories, study help, and career tools
      </p>
    </button>
  </div>
</div>


            {/* Intro */}
            <div className="mb-8 bg-white rounded-2xl shadow-soft p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Whatever you're going through right now, you're not alone.
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  We're not here to judge or tell you to "just push through." We're here to remind you that you have more options — and more strength — than you might realize.
                </p>
                <p>
                  College can be tough. Sometimes, it can feel really tough. If you're struggling — with classes, loneliness, pressure, or just everything all at once — this page is for you.
                </p>
                <p className="font-semibold text-gray-900">
                  👇 Click on what you're experiencing below. Each section has real options and resources — not platitudes, not judgment, just practical paths forward.
                </p>
              </div>

            </div>


            {/* Expandable Sections */}
            <div className="space-y-3">
              {sections.map((section) => {
                const colors = sectionColors[section.color];
                const isOpen = openSection === section.id;

                return (
                  <div key={section.id} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full p-5 flex items-center justify-between ${colors.hover} transition-all border-l-4 ${colors.border}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${colors.bg} p-2 rounded-lg`}>
                          {section.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 text-left">
                          {section.title}
                        </h3>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-6 border-t border-gray-100">
                        {section.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Encouragement */}
            <div className="rounded-3xl bg-tealBrand text-white mt-8 px-8 py-12 md:px-14 text-center shadow-soft">
              <div className="flex justify-center mb-6">
                <div className="rounded-xl bg-white/10 ring-1 ring-white/20 p-4">
                  <Heart className="w-8 h-8 text-white" strokeWidth={1.75} />
                </div>
              </div>

              <h3 className="font-bold text-white mb-2 text-xl">You're Still Here</h3>
              <p className="text-white leading-relaxed mb-3">
                The fact that you're on this page, looking for resources, asking for help — that takes courage.
                You haven't given up. That matters more than you realize.
              </p>
              <p className="text-white leading-relaxed">
                Keep going. One day at a time. One hour at a time. You've got this.
              </p>
            </div>

            {/* Share Buttons */}
            <div className="mt-6">
              <ShareButtons
                title="Support Resources for Struggling Students - MoreThanOneWay.org"
                message="If you know someone who's struggling, share this with them"
              />
            </div>
          </main>

          {/* ✅ Popup / Modal */}
          {openQuick && (
            <div
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
              onClick={closeQuick}
            >
              <div
                className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeQuick}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {openQuick === 'crisis' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-red-500" />
                      In Crisis Right Now?
                    </h3>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-gray-800 space-y-2">
                      <p>
                        <strong>988 Suicide & Crisis Lifeline:</strong> Call or text <strong>988</strong> (24/7)
                      </p>
                      <p>
                        <strong>Crisis Text Line:</strong> Text <strong>HOME</strong> to <strong>741741</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        closeQuick();
                        setCurrentPage('crisis');
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-soft"
                    >
                      See all crisis resources →
                    </button>
                  </div>
                )}

                {openQuick === 'campus' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <LifeBuoy className="w-5 h-5 text-orange-500" />
                      Find Help at Your School
                    </h3>

                    <div className="bg-orange-50 rounded-xl p-4">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        University name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your university name"
                        value={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 text-sm mb-3 placeholder-gray-500 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && findCampusResources()}
                      />
                      <button
                        onClick={findCampusResources}
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all flex items-center justify-center gap-2 text-sm shadow-soft"
                      >
                        <Search className="w-4 h-4" />
                        Search Resources
                      </button>
                      <p className="text-xs mt-2 text-gray-600">
                        Opens: Wellness Center, Counseling, Disability Services, Emergency Aid, Advising
                      </p>
                    </div>
                  </div>
                )}

                {openQuick === 'more' && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      More Resources
                    </h3>

                    <button
                      onClick={() => {
                        closeQuick();
                        setCurrentPage('stories');
                      }}
                      className="w-full bg-purple-50 p-4 rounded-xl text-left hover:shadow-md transition-all border border-purple-100"
                    >
                      <div className="font-semibold text-gray-900">Real Stories</div>
                      <div className="text-sm text-gray-600">Students who struggled and made it through</div>
                    </button>

                    <button
                      onClick={() => {
                        closeQuick();
                        setCurrentPage('study-resources');
                      }}
                      className="w-full bg-green-50 p-4 rounded-xl text-left hover:shadow-md transition-all border border-green-100"
                    >
                      <div className="font-semibold text-gray-900">Free Study Help</div>
                      <div className="text-sm text-gray-600">Different explanations, at your pace</div>
                    </button>

                    <button
                      onClick={() => {
                        closeQuick();
                        setCurrentPage('pivot');
                      }}
                      className="w-full bg-blue-50 p-4 rounded-xl text-left hover:shadow-md transition-all border border-blue-100"
                    >
                      <div className="font-semibold text-gray-900">Career Paths</div>
                      <div className="text-sm text-gray-600">Your major doesn’t lock you in</div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default YoureNotAlone;
