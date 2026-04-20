import React, { useState, useEffect } from 'react';

import { ArrowLeft, Phone, BookOpen, Users, DollarSign, HelpCircle, AlertCircle, ChevronDown, ChevronUp, Heart } from 'lucide-react';

const YoureNotAlone = ({ onBack, setCurrentPage }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'failing',
      icon: <BookOpen className="w-6 h-6" />,
      title: "I'm Failing or Struggling in Classes",
      color: 'blue',
      validation: "Struggling academically doesn't mean you're not smart enough or don't belong here. College courses are designed to be challenging, and many students struggle—even if they don't talk about it.",
      options: [
        {
          title: "Talk to your professor during office hours - explain you're struggling and ask for guidance. While you're there, ask if switching to pass/fail grading is an option.",
          sectionHeader: "Immediate Actions (This Week)",
          items: [
            "Real talk: Some professors are out of touch with today's pressures. Some are just assholes. If your professor dismisses you or makes you feel worse, know this: you have options. Keep your cool—not because they deserve it, but because it keeps you in control. Go above or around them: department chair, dean, or advisor. You have the right to advocate for yourself. This is YOUR education, and you're paying for access to support. One dismissive professor doesn't get to decide your path forward. Their attitude says more about them than you—don't let it make you feel powerless",
            "About pass/fail: Not all classes allow it, and there are usually deadlines. Ask your professor first, but if they're unhelpful, your advisor or registrar's office can tell you the rules. Just know: pass/fail can affect GPA calculations and some majors/grad schools don't accept it for required courses. It's a tool, not always the answer—but worth exploring if you're drowning.",
            "Grade forgiveness exists: Many colleges have a grade forgiveness policy—you can retake the course and the new grade replaces the old one in your GPA calculation. There are usually limits (like you can only do it once or twice), but it means a bad grade doesn't have to haunt you forever. Check your school's academic policies or ask your advisor about 'grade replacement' or 'grade forgiveness.'"
          ]
        },
        {
          title: "Visit your school's tutoring center or academic support services (usually free)",
          items: [
            "Real talk: Not every tutor will click with you. Many are students themselves, still learning how to explain what they're good at. If the tutor's approach isn't working, you're not stuck with them. Tell them directly, or tell whoever oversees the tutors—just say 'I don't feel a connection, when is someone else available for this subject?' It's okay to advocate for yourself.",
            "Also real talk: If you waited until the day before a test to get help, don't expect a miracle. What you CAN do: go to the tutor, get what help you can, take the test, and accept the outcome. THEN go back to the tutor, get caught up on what you didn't understand, and keep going the rest of the semester. Sometimes we make poor decisions and that's okay—what matters is what you do next."
          ]
        },
        {
          title: "Form or join a study group - you're probably not the only one confused",
          items: [
            "Easier options if starting a group feels overwhelming:",
            "Ask just ONE person sitting near you: 'Hey, want to compare notes sometime?' That's it. One person is better than none.",
            "Look for existing groups: Check if your class has a Discord server, GroupMe, or group chat already going. Lurk and learn from others' questions - you don't even have to talk.",
            "Use online study communities: Subreddits for your subject (r/learnprogramming, r/askmath, etc.), Discord study servers, Chegg Study groups. Anonymous, no pressure.",
            "Study 'near' people, not 'with' them: Just go to the library or coffee shop where other students study. Being around focused people helps, even if you don't talk to them.",
            "Office hours count as a study group: You + professor + other students who show up = instant study group, and the professor leads it.",
            "If you have ANY classmate's number: Text them one question. That's all. 'Did you understand the homework?' You don't need a formal group.",
            "Remember: You don't need a perfect study group to get help. Even small connections make a difference."
          ]
        },
        {
          title: "Figure out where you actually stand (do this first)",
          sectionHeader: "Figure out where you actually stand (do this first)",
          items: [
            "Real talk: When you're panicking, everything feels like an emergency. Take 30-60 minutes to assess the real damage - it's usually not as catastrophic as it feels.",
            "Check the syllabus and grading breakdown: What's actually coming up? What's worth the most points? (A final worth 40% matters more than weekly quizzes worth 2% each.)",
            "Calculate what you actually need: If you have a 60% and need a 70% to pass, figure out what scores you need on remaining work. Sometimes it's doable; sometimes it's not. Either way, knowing is better than guessing.",
            "Identify what's NOT working: Is it unclear lectures? Confusing textbook? Not enough practice problems? Knowing the specific problem helps you find the right solution."
          ]
        },
        {
          title: "Work smarter, not just harder",
          sectionHeader: "Work smarter, not just harder",
          items: [
            "If the way you've been studying isn't working, doing more of it won't help. Try different resources:",
            "Use the textbook differently: Skip to chapter summaries and worked examples first. Read those until they make sense, THEN go back and read the full chapter if needed.",
            "Find alternate explanations: Khan Academy, MIT OpenCourseWare, YouTube channels (Professor Leonard, Organic Chemistry Tutor, etc.). Sometimes hearing it explained differently makes it click.",
            "Use other schools' materials: Google '[your course name] lecture notes' or '[course] problem sets' - you'll find resources from other universities. Sometimes their version is clearer.",
            "Focus on high-impact work: If you have a midterm worth 30% coming up, that matters WAY more than a homework assignment worth 2%. Prioritize accordingly."
          ],
          afterItems: (setCurrentPage) => (
            <div className="mt-3 p-4 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300 rounded-xl shadow-soft">
              <p className="text-gray-700">
                <span className="text-xl mr-2">📚</span>
                Looking for specific help with tough classes?{' '}
                <button
                  onClick={() => setCurrentPage && setCurrentPage('study-resources')}
                  className="text-blue-600 hover:text-blue-800 underline font-bold"
                >
                  See our complete list of free study resources →
                </button>
              </p>
            </div>
          )
        },
        {
          title: "Short-Term Options (This Semester)",
          sectionHeader: "Short-Term Options (This Semester)",
          items: [
            "Consider dropping the class if you're still in the add/drop period",
            "Look into an incomplete grade (talk to your advisor)",
            "Reduce your course load next semester to focus on fewer classes",
            "Meet with an academic advisor to discuss alternatives"
          ]
        },
        {
          title: "Bigger Picture Options",
          sectionHeader: "Bigger Picture Options",
          items: [
            "Switch majors - failing in one field doesn't mean you'll fail in another",
            "Take a lighter course load and graduate later - there's no shame in taking extra time",
            "Consider a gap semester to regroup and come back stronger",
            "Explore if college is the right path right now (see 'I Don't Even Want to Be Here' section)"
          ]
        }
      ],
      resources: "Read stories from students who failed classes and found their way forward.",
      linkText: "Read Recovery Stories",
      linkPage: "stories"
    },
    {
      id: 'alone',
      icon: <Users className="w-6 h-6" />,
      title: "I Feel Completely Alone",
      color: 'green',
      validation: "Loneliness in college is incredibly common, even though it feels like everyone else has found their people. Social media makes it worse—everyone looks happy and connected, but most people are struggling to connect too.",
      options: [
        {
          title: "Small Steps You Can Take",
          items: [
            "Start with one thing: one club meeting, one study group, one campus event",
            "Look for clubs related to your interests (not just social ones)",
            "Sit in common areas to study - being around people helps even without talking",
            "Online communities count too - Discord servers, subreddits for your school",
            "Volunteer - helping others is a natural way to connect"
          ]
        },
        {
          title: "For Introverts",
          items: [
            "Join clubs with structured activities (you don't have to be 'on' the whole time)",
            "Study groups give you a reason to be around people without pressure",
            "Campus jobs create natural interactions without forced socializing",
            "One good friend is worth more than 20 acquaintances"
          ]
        },
        {
          title: "If You're Really Struggling",
          items: [
            "Campus counseling can help with social anxiety and loneliness",
            "Call home - missing your old life doesn't mean you're failing",
            "Remember: freshman year is the hardest for making friends. It gets easier.",
            "Transfer is an option if the school truly isn't a good fit"
          ]
        }
      ],
      resources: "Read stories from students who felt invisible and found their community.",
      linkText: "Read Connection Stories",
      linkPage: "stories"
    },
    {
      id: 'dont-want',
      icon: <HelpCircle className="w-6 h-6" />,
      title: "I Don't Even Want to Be Here",
      color: 'purple',
      validation: "If you're only in college because someone else wanted it for you, or because it felt like the only option, you're not alone. And questioning whether you should be here doesn't make you a failure.",
      options: [
        {
          title: "Questions to Ask Yourself",
          items: [
            "Am I here because I want to be, or because someone else expects me to be?",
            "Is there a specific career I need college for, or am I here 'just because'?",
            "Would I be happier learning a trade, starting a business, or working first?",
            "Am I trying to make someone else proud at the expense of my own happiness?"
          ]
        },
        {
          title: "Alternative Paths That Are Valid",
          items: [
            "Trade schools (plumbing, electrical, HVAC - often make more than college grads)",
            "Apprenticeships (paid while you learn)",
            "Gap year (work, travel, figure out what you actually want)",
            "Starting a business or freelancing",
            "Military service (with education benefits for later if you want)",
            "Community college first (cheaper, and you can always transfer)"
          ]
        },
        {
          title: "If You Decide to Leave",
          items: [
            "It's not quitting - it's choosing a different path",
            "You can always come back to college later if you want",
            "Taking time off doesn't mean you failed",
            "Plenty of successful people never finished college (or never went)"
          ]
        },
        {
          title: "If You Decide to Stay",
          items: [
            "Find something - one class, one club, one project - that makes it worth it",
            "Remember you're here for YOU, not for anyone else's expectations",
            "Consider switching majors to something you actually care about",
            "Set a timeline: 'I'll give it one more semester' - then reassess honestly"
          ]
        }
      ],
      resources: "Read stories from people who left college and found success anyway.",
      linkText: "Read Alternative Path Stories",
      linkPage: "stories"
    },
    {
      id: 'money',
      icon: <DollarSign className="w-6 h-6" />,
      title: "I Can't Afford This",
      color: 'orange',
      validation: "Financial stress is one of the most common reasons students struggle. You're not being dramatic - money problems are real and can feel overwhelming.",
      options: [
        {
          title: "Immediate Help",
          items: [
            "Emergency funds: Many colleges have emergency grants for students in crisis",
            "Food pantries: Most campuses have them - no shame in using them",
            "Talk to financial aid office: They may have options you don't know about",
            "Delay dropping out: Explore every financial option before making this decision"
          ]
        },
        {
          title: "Longer-Term Options",
          items: [
            "Transfer to a cheaper school (community college, in-state public)",
            "Take a semester off, work, save money, come back",
            "Reduce course load and work more (takes longer but may be sustainable)",
            "Look into work-study programs if eligible",
            "Research scholarships - there are weird, specific ones you might qualify for"
          ]
        },
        {
          title: "Real Talk About Student Loans",
          items: [
            "Federal loans have income-based repayment - you won't be crushed if you don't make much",
            "Private loans are riskier - exhaust federal options first",
            "It's okay to borrow reasonable amounts for a degree that leads to a job",
            "It's NOT okay to borrow $100k for a degree with no job prospects",
            "If you're drowning in debt, leaving might be the smarter financial choice"
          ]
        }
      ],
      resources: "Financial stress is real and valid. Here are more resources.",
      linkText: "See Financial Resources",
      linkPage: "resources"
    },
    {
      id: 'no-direction',
      icon: <HelpCircle className="w-6 h-6" />,
      title: "No Idea What I Want to Do",
      color: 'indigo',
      validation: "Most people don't have it figured out—they just pretend they do. Not knowing what you want at 18, 20, or even 25 is completely normal. Your major doesn't lock you into one career forever.",
      options: [
        {
          title: "It's Okay to Explore",
          items: [
            "Take classes in different areas - you might surprise yourself",
            "Internships and part-time jobs show you what you DON'T want (that's valuable too)",
            "Talk to people in different careers - most people love sharing their path",
            "Your major matters less than you think - many people work in unrelated fields"
          ]
        },
        {
          title: "Reduce the Pressure",
          items: [
            "You don't need a 'dream job' - you need something that pays bills and doesn't make you miserable",
            "Career paths aren't linear - most people change careers multiple times",
            "Start with 'what do I NOT want' - sometimes that's clearer",
            "Skills matter more than passion - you can build a good life in many fields"
          ]
        },
        {
          title: "Practical Steps",
          items: [
            "Take career assessments (free ones online or through your career center)",
            "Job shadow or informational interviews in fields that seem interesting",
            "Look at our alternative career paths - see what skills transfer where",
            "Remember: choosing wrong is temporary. Not choosing keeps you stuck."
          ]
        }
      ],
      resources: "See how your skills can apply to careers you haven't considered.",
      linkText: "Explore Career Paths",
      linkPage: "pivot"
    },
    {
      id: 'everything',
      icon: <AlertCircle className="w-6 h-6" />,
      title: "It's Just... Everything",
      color: 'red',
      validation: "Sometimes it's not one thing - it's everything all at once. You're failing AND lonely AND stressed AND broke AND exhausted. That's a lot. Anyone would struggle.",
      options: [
        {
          title: "When Everything Feels Like Too Much",
          items: [
            "You don't have to fix everything at once",
            "Pick ONE thing to address this week - just one",
            "It's okay to lower your standards temporarily (pass instead of excel)",
            "Taking an incomplete or withdrawing from a class might give you breathing room",
            "Consider a reduced course load next semester"
          ]
        },
        {
          title: "Signs You Need Professional Help (and that's okay)",
          items: [
            "Can't get out of bed / sleeping all the time or not at all",
            "Not eating or eating way too much as a coping mechanism",
            "Can't focus on anything / mind constantly racing",
            "Thinking about hurting yourself or that people would be better off without you",
            "Using alcohol/drugs to cope more than occasionally"
          ]
        },
        {
          title: "Where to Get Help",
          items: [
            "Campus counseling center (usually free, confidential)",
            "Crisis text line: Text HOME to 741741",
            "988 Suicide & Crisis Lifeline (call or text)",
            "Your doctor (can prescribe medication if needed, covered by student health)",
            "Online therapy (BetterHelp, Talkspace - check if your school offers discounts)"
          ]
        },
        {
          title: "Permission to Step Back",
          items: [
            "Taking a mental health leave doesn't make you weak",
            "Dropping to part-time doesn't mean you failed",
            "Taking an extra year to graduate is common and okay",
            "Leaving college temporarily (or permanently) might be the healthiest choice",
            "Your mental health matters more than finishing on time"
          ]
        }
      ],
      resources: "Sometimes you just need to know you're not alone in feeling this way.",
      linkText: "Read Real Stories",
      linkPage: "stories"
      },
    {
      id: 'crisis',
      icon: <Phone className="w-6 h-6" />,
      title: "I'm in Crisis Right Now ❗",
      color: 'red',
      validation: "If you're thinking about hurting yourself, please reach out right now. This feeling is temporary. You matter—even if it doesn't feel like it right now.",
      options: [
        {
          title: "Immediate Help (24/7)",
          items: [
            "988 Suicide & Crisis Lifeline: Call or text 988",
            "Crisis Text Line: Text HOME to 741741",
            "National Alliance on Mental Illness (NAMI): Text 'NAMI' to 741741",
            "Trevor Project (LGBTQ+ youth): 1-866-488-7386 or text START to 678-678"
          ]
        },
        {
          title: "On Campus",
          items: [
            "Campus counseling center - they HAVE to see enrolled students",
            "Campus police/security - they can connect you to resources immediately",
            "Go to your RA, a professor you trust, or student health center",
            "If you're in immediate danger, go to the nearest emergency room"
          ]
        },
        {
          title: "If Calling Feels Impossible",
          items: [
            "Text is okay - Crisis Text Line is staffed 24/7",
            "Tell someone in person - 'I'm not okay' is enough",
            "Go somewhere public - coffee shop, library, don't be alone",
            "Call even if you don't know what to say - they'll guide you"
          ]
        },
        {
          title: "After the Crisis",
          items: [
            "Getting help is hard. If one provider says 'not accepting patients,' call another.",
            "Be direct: 'I'm struggling and need help soon' - not 'I'm fine waiting'",
            "Campus counseling is required to serve students - start there",
            "Sliding scale therapy: OpenPath Collective, TherapyDen, Psychology Today",
            "Your insurance company can provide a list of in-network providers"
          ]
        }
      ],
      resources: "You've survived 100% of your worst days so far. You can get through this one too.",
      linkText: "Full Crisis Resources",
      linkPage: "crisis"
    }
   ];

  const colorClasses = {
    blue: 'border-blue-400 hover:bg-blue-50',
    green: 'border-green-400 hover:bg-green-50',
    purple: 'border-purple-400 hover:bg-purple-50',
    orange: 'border-orange-400 hover:bg-orange-50',
    red: 'border-red-400 hover:bg-red-50'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Warm Header */}
<section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-8 shadow-xl">
  <div className="max-w-4xl mx-auto px-4">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-white hover:text-blue-100 mb-4 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
    <h1 className="text-4xl font-bold mb-2">You're Not Alone ✨</h1>
    <p className="text-blue-100 text-lg">Real support for real struggles. No judgement, just options.</p>
  </div>
</section>


      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Warm Crisis Banner */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-6 rounded-2xl shadow-soft">
          <div className="flex items-start gap-3">
            <span className="text-4xl">☎️</span>
            <div>
              <h3 className="font-bold text-red-800 mb-2 text-lg">In Crisis Right Now?</h3>
              <p className="text-red-700 mb-3">
                <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (24/7)<br />
                <strong>Crisis Text Line:</strong> Text HOME to 741741
              </p>
              <p className="text-sm text-red-600 italic">
                You matter. This feeling is temporary. People want to help. ❤️{' '}
                <button
                  onClick={() => setCurrentPage('crisis')}
                  className="underline hover:text-red-800 font-bold"
                >
                  See all crisis resources →
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Opening Message */}
        <div className="bg-white rounded-2xl shadow-soft p-8 hover:shadow-lg transition-all">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Whatever you're going through right now, you're not alone. 💪
          </h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              We're not here to judge or tell you to "just push through." We're here to remind you that you have more options — and more strength — than you might realize.
            </p>
            <p>
              College can be tough. Sometimes, it can feel really tough. If you're struggling — with classes, loneliness, pressure, or just everything all at once — this page is for you.
            </p>
            <p className="font-bold text-gray-900 text-lg">
              👇 Click on what you're experiencing below. Each section has real options and resources — not platitudes, not judgment, just practical paths forward.
            </p>
          </div>
        </div>

        {/* Struggle Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all">
              {/* Section Header - Clickable */}
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full p-6 flex items-center justify-between border-l-4 rounded-2xl transition-all ${colorClasses[section.color]}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-${section.color}-600`}>
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-left text-gray-900">
                    {section.title}
                  </h3>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </button>

              {/* Section Content - Expandable */}
              {expandedSection === section.id && (
                <div className="p-6 border-t space-y-6">
                  {/* Validation */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200">
                    <p className="text-gray-800 italic leading-relaxed">💭 {section.validation}</p>
                  </div>

                  {/* Options with Section Headers */}
                  {section.options.map((optionGroup, idx) => (
                    <div key={idx}>
                      {/* Section Header (if present) */}
                      {optionGroup.sectionHeader && (
                        <h4 className="text-xl font-bold text-gray-900 mb-4 mt-6 flex items-center gap-2">
                          <span className="text-2xl">🎯</span>
                          {optionGroup.sectionHeader}
                        </h4>
                      )}
                      
                      {/* Option Title (only show if it's different from section header) */}
                      {optionGroup.title !== optionGroup.sectionHeader && (
                        <h5 className="font-bold text-gray-900 mb-3 text-lg">{optionGroup.title}</h5>
                      )}
                      
                      <ul className="space-y-3 ml-4">
                        {optionGroup.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex gap-3">
                            <span className="text-blue-600 font-bold text-lg">•</span>
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* After Items Custom Content */}
                      {optionGroup.afterItems && optionGroup.afterItems(setCurrentPage)}
                    </div>
                  ))}

                  {/* Related Resources */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-2 border-blue-300 shadow-soft">
                    <p className="text-gray-800 mb-3 font-semibold">📖 {section.resources}</p>
                    <button
                      onClick={() => setCurrentPage(section.linkPage)}
                      className="text-blue-600 font-bold hover:text-blue-800 underline text-lg flex items-center gap-1 group"
                    >
                      {section.linkText}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-2xl p-10 text-center shadow-xl">
          <div className="text-5xl mb-4">❤️</div>
          <h3 className="text-3xl font-bold mb-4">You Matter</h3>
          <p className="text-xl mb-6 leading-relaxed">
            Even when it doesn't feel like it. Even when the people around you don't show it. Even to strangers who built this site because they care.
          </p>
          <p className="text-xl font-semibold">
            There is more than one way forward. Always. 🌈
          </p>
        </div>
      </main>

      {/* Footer with Crisis Resources */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm mb-3 text-gray-300">
            <strong className="text-white text-base">Crisis Resources (24/7):</strong><br/>
            Call/text 988 | Text HOME to 741741 | Campus Counseling
          </p>
          <button
            onClick={() => setCurrentPage('crisis')}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 font-bold shadow-lg transform hover:scale-105 transition-all"
          >
            View All Crisis Resources →
          </button>
        </div>
      </footer>
    </div>
  );
};

export default YoureNotAlone;