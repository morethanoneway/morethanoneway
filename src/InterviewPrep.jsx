import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  CheckCircle,
   Circle,
  ChevronDown,
  ChevronUp,
  Printer,
  RefreshCw,
  X,
  Sparkles,
  Lightbulb,
  MessageCircle,
  Video,
  UserCheck,
  Mail,
  Award,
  Check,
  Star,  
} from 'lucide-react';

const InterviewPrep = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [checklist, setChecklist] = useState({
    readQuestions: false,
    writeSTAR: false,
    prepareQuestions: false,
    practiceOutLoud: false,
    setupSpace: false,
    pickOutfit: false,
    researchCompany: false
  });
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Load checklist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mtow-interview-prep-checklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    }
  }, []);

  // Save checklist to localStorage whenever it changes
  const toggleChecklistItem = (key) => {
    const newChecklist = { ...checklist, [key]: !checklist[key] };
    setChecklist(newChecklist);
    localStorage.setItem('mtow-interview-prep-checklist', JSON.stringify(newChecklist));

    // Show save notification
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2000);
  };

  const clearProgress = () => {
    if (window.confirm('Clear all your interview prep progress? This cannot be undone.')) {
      const emptyChecklist = {
        readQuestions: false,
        writeSTAR: false,
        prepareQuestions: false,
        practiceOutLoud: false,
        setupSpace: false,
        pickOutfit: false,
        researchCompany: false
      };
      setChecklist(emptyChecklist);
      localStorage.removeItem('mtow-interview-prep-checklist');
    }
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;

  return (
    <>
    <Helmet>
  <title>Free Interview Prep for College Students | MoreThanOneWay.org</title>
  <meta name="description" content="Free interview preparation guide for college students and new grads. Common questions, how to answer them, and tips to calm your nerves." />
  <meta name="keywords" content="interview prep college students, common interview questions, how to prepare for interview, job interview tips, behavioral interview questions" />
  <meta property="og:title" content="Free Interview Prep Guide | MoreThanOneWay.org" />
  <meta property="og:description" content="Common interview questions, sample answers, and tips to calm your nerves — free for college students." />
 </Helmet>
      {/* HERO / HEADER */}
      <section className="bg-[#FFFBF7] py-10">
        <div className="mx-auto w-full max-w-6xl px-4 space-y-8">
          <main className="max-w-6xl mx-auto px-4 lg:pr-5">
            <header className="text-center max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Interviews Are Just {" "}
               <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">

                  Conversations
                </span>
              </h1>
              <p className="mt-6 mb-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
                You don’t need to be perfect — you just need to be prepared.
              </p>
            </header>
          </main>


          {/* Warm Introduction */}
          <div className="rounded-xl bg-tealBrand/5 border border-gray-200 p-3">
            <div className="flex items-start gap-4">
              <div>
                <Star className="w-7 h-7 text-tealBrand" />
              </div>
              <div>
                <p className="text-lg leading-relaxed opacity-95">
                  You’re not just trying to get hired — you’re choosing where your time, skills, and energy belong.
                </p>
              </div>
            </div>
          </div>

          {/* Preparation Checklist */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border-l-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className=" w-12 h-12 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-tealBrand/60" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Interview Prep Checklist</h2>
                  <p className="text-sm text-gray-600">Progress: {completedCount}/{totalCount} complete</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="bg-tealBrand text-white px-4 py-2 rounded-xl hover:gray-300 transform hover:scale-105 transition-all flex items-center gap-2 text-sm font-semibold"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={clearProgress}
                  className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              <ChecklistItem
                checked={checklist.readQuestions}
                onChange={() => toggleChecklistItem('readQuestions')}
                label="Read through common interview questions below"
              />
              <ChecklistItem
                checked={checklist.writeSTAR}
                onChange={() => toggleChecklistItem('writeSTAR')}
                label="Write out 3 STAR method examples from my experience"
              />
              <ChecklistItem
                checked={checklist.prepareQuestions}
                onChange={() => toggleChecklistItem('prepareQuestions')}
                label="Prepare 5 questions to ask the interviewer"
              />
              <ChecklistItem
                checked={checklist.practiceOutLoud}
                onChange={() => toggleChecklistItem('practiceOutLoud')}
                label="Practice answering out loud (yes, really—it helps!)"
              />
              <ChecklistItem
                checked={checklist.setupSpace}
                onChange={() => toggleChecklistItem('setupSpace')}
                label="Set up virtual interview space (test lighting, camera, background)"
              />
              <ChecklistItem
                checked={checklist.pickOutfit}
                onChange={() => toggleChecklistItem('pickOutfit')}
                label="Pick out interview outfit the night before"
              />
              <ChecklistItem
                checked={checklist.researchCompany}
                onChange={() => toggleChecklistItem('researchCompany')}
                label="Research the company (15+ minutes: mission, recent news, culture)"
              />
            </div>

            {/* Save Notification */}
            {showSaveNotification && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-sm text-green-700 font-semibold">✓ Progress saved!</p>
              </div>
            )}
          </div>

          {/* Encouragement Box */}
          <div className="bg-tealBrand/10 border-l-4 p-6 rounded-2xl shadow-soft">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-tealBrand/80"/>
                </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Remember This</h3>
                <p className="text-gray-700 leading-relaxed">
                  Interviews are conversations, not interrogations. They're trying to see if you're a good fit—
                  <strong> and you're trying to see if they're a good fit for you</strong>. It's okay to be nervous.
                  It's okay to take a second to think before answering. You've got this.
                </p>
              </div>
            </div>
          </div>

          {/* Section A: Common Interview Questions */}
          <ExpandableSection
            title="Common Interview Questions"
            subtitle="Practice these so you're not caught off guard"
            icon={<MessageCircle className="w-8 h-8 text-tealBrand/60" />}
            expanded={expandedSection === 'questions'}
            onToggle={() => setExpandedSection(expandedSection === 'questions' ? null : 'questions')}
            gradient=""
            borderColor="border-white"
          >
            <CommonQuestionsContent />
          </ExpandableSection>

          {/* Section B: STAR Method Guide */}
          <ExpandableSection
            title="STAR Method Guide"
            subtitle="How to answer behavioral questions like a pro"
            icon={<Award className="w-8 h-8 text-tealBrand/60" />}
            expanded={expandedSection === 'star'}
            onToggle={() => setExpandedSection(expandedSection === 'star' ? null : 'star')}
            gradient=""
            borderColor="border-white"
          >
            <STARMethodContent />
          </ExpandableSection>

          {/* Section C: Questions to Ask */}
          <ExpandableSection
            title="Questions to Ask the Interviewer"
            subtitle="Smart questions that show you're thinking critically"
            icon={<Lightbulb className="w-8 h-8 text-tealBrand/60" />}
            expanded={expandedSection === 'ask-questions'}
            onToggle={() => setExpandedSection(expandedSection === 'ask-questions' ? null : 'ask-questions')}
            gradient=""
            borderColor="white"
          >
            <QuestionsToAskContent />
          </ExpandableSection>

          {/* Section D: Virtual Interview Tips */}
          <ExpandableSection
            title="Virtual Interview Tips"
            subtitle="Nail the technical setup and avoid common mistakes"
            icon={<Video className="w-8 h-8 text-tealBrand/60" />}
            expanded={expandedSection === 'virtual'}
            onToggle={() => setExpandedSection(expandedSection === 'virtual' ? null : 'virtual')}
            gradient=""
            borderColor="border-white"
          >
            <VirtualInterviewContent />
          </ExpandableSection>

          {/* Section E: In-Person Interview Tips */}
          <ExpandableSection
            title="In-Person Interview Tips"
            subtitle="What to wear, bring, and when to arrive"
            icon={<UserCheck className="w-8 h-8 text-tealBrand/60" />}
            expanded={expandedSection === 'in-person'}
            onToggle={() => setExpandedSection(expandedSection === 'in-person' ? null : 'in-person')}
            gradient=" "
            borderColor="border-white"
          >
            <InPersonInterviewContent />
          </ExpandableSection>

          {/* Section F: After the Interview */}
          <ExpandableSection
            title="After the Interview"
            subtitle="Follow up the right way and manage the wait"
            icon={<Mail className="w-8 h-8 text-tealBrand/60" />}
            expanded={expandedSection === 'after'}
            onToggle={() => setExpandedSection(expandedSection === 'after' ? null : 'after')}
            gradient=""
            borderColor="border-white"
          >
            <AfterInterviewContent />
          </ExpandableSection>

          {/* Final Encouragement */}
          <div className="mt-8 rounded-3xl bg-[#006581] text-white p-10 md:p-12 shadow-lg shadow-black/10">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <div className="flex justify-center">
                <div className="rounded-xl bg-white/10 ring-1 ring-white/20 p-4">
                  <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">You're More Prepared Than You Think</h3>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                Every interview is practice. Every question you answer teaches you something.
                <br />Even if this one doesn't work out, you're building skills that will serve you for years.
                <br /><span className="font-semibold text-orange-300">Now go show them what you've got!</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Print Modal */}
      {showPrintModal && (
        <PrintModal
          checklist={checklist}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </>
  );
};

// Checklist Item Component
const ChecklistItem = ({ checked, onChange, label }) => (
  <button
    onClick={onChange}
    className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all w-full text-left border border-gray-100"
  >
    {checked ? (
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
    ) : (
      <Circle className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" />
    )}
    <span className={`text-gray-700 ${checked ? 'line-through opacity-60' : ''}`}>
      {label}
    </span>
  </button>
);

// Expandable Section Component
const ExpandableSection = ({ title, subtitle, icon, expanded, onToggle, children, gradient, borderColor }) => (
  <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full p-6 text-left hover:bg-gray-50 transition-all flex justify-between items-center border-l-4"
      style={{ borderColor: borderColor.replace('border-', '') }}
    >
      <div className="flex items-center gap-4">
        <div className={`bg-gradient-to-br ${gradient} w-14 h-14 rounded-2xl flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
      </div>
      {expanded ? (
        <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
      ) : (
        <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
      )}
    </button>

    {expanded && (
      <div className="p-6 border-t border-gray-100">
        {children}
      </div>
    )}
  </div>
);

// Common Questions Content
const CommonQuestionsContent = () => (
  <div className="space-y-8">
    {/* Behavioral Questions */}
    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">💭</span>
        Behavioral Questions ("Tell me about a time...")
      </h4>
      <div className="space-y-4">
        <QuestionItem
          question="Tell me about a time you faced a challenge and how you overcame it."
          tip="Pick a real challenge (not 'I'm a perfectionist'). Show problem-solving."
        />
        <QuestionItem
          question="Describe a time you worked on a team with someone difficult."
          tip="Focus on what YOU did, not just complaining about them. Show maturity."
        />
        <QuestionItem
          question="Tell me about a time you made a mistake. What did you learn?"
          tip="Pick a real mistake, own it, explain what you learned. Shows growth."
        />
        <QuestionItem
          question="Give an example of a time you had to learn something quickly."
          tip="Great for students! Class project, new software, internship—show you're adaptable."
        />
        <QuestionItem
          question="Tell me about a time you showed leadership."
          tip="Leadership isn't just official roles. Group project lead? That counts."
        />
        <QuestionItem
          question="Describe a time you went above and beyond."
          tip="Extra research, helped a teammate, added a feature—show initiative."
        />
        <QuestionItem
          question="Tell me about a time you had to meet a tight deadline."
          tip="Focus on HOW you managed your time, not just that you did it."
        />
        <QuestionItem
          question="Give an example of when you had to adapt to change."
          tip="Project pivot? Course change? Show flexibility."
        />
        <QuestionItem
          question="Tell me about a time you received criticism. How did you handle it?"
          tip="Show you can take feedback without getting defensive."
        />
        <QuestionItem
          question="Describe a time you had to explain something technical to a non-technical person."
          tip="Great for engineering students. Show communication skills."
        />
        <QuestionItem
          question="Tell me about a time you disagreed with a team member. What happened?"
          tip="Focus on respectful disagreement and finding a solution."
        />
        <QuestionItem
          question="Give an example of when you had to prioritize multiple tasks."
          tip="School is full of this! Show time management and decision-making."
        />
        <QuestionItem
          question="Tell me about a time you failed at something."
          tip="Be honest. What matters is what you learned and did differently next time."
        />
        <QuestionItem
          question="Describe a time you took initiative without being asked."
          tip="Saw a problem and fixed it? Suggested an improvement? That's initiative."
        />
        <QuestionItem
          question="Tell me about a time you had to work with limited resources."
          tip="Budget constraints? Time limits? Show resourcefulness and creativity."
        />
      </div>
    </div>

    {/* Technical/Engineering Questions */}
    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">⚙️</span>
        Technical Questions (Engineering/STEM)
      </h4>
      <div className="space-y-4">
        <QuestionItem
          question="Walk me through a recent project you worked on."
          tip="Use STAR method. What was it, what did YOU do, what was the result?"
        />
        <QuestionItem
          question="What's your experience with [specific software/tool]?"
          tip="Be honest about your level. 'I used it in X class' is better than pretending."
        />
        <QuestionItem
          question="How do you approach debugging or troubleshooting?"
          tip="Explain your process: identify problem, test theories, document what works."
        />
        <QuestionItem
          question="Tell me about a technical challenge you faced in a project."
          tip="Pick something real. Show problem-solving, not just 'I googled it.'"
        />
        <QuestionItem
          question="What programming languages/tools are you most comfortable with?"
          tip="List them with context: 'Python for data analysis in my ML class.'"
        />
        <QuestionItem
          question="How do you stay current with technology trends in your field?"
          tip="Clubs? YouTube? Online courses? Show you're curious and keep learning."
        />
        <QuestionItem
          question="Describe your approach to testing and validation."
          tip="Labs? Projects? Show you understand WHY testing matters."
        />
        <QuestionItem
          question="What's the most complex problem you've solved?"
          tip="Walk through your thinking. The process matters more than the solution."
        />
        <QuestionItem
          question="How do you handle incomplete or ambiguous requirements?"
          tip="Ask questions! Show you seek clarification rather than guess."
        />
        <QuestionItem
          question="Tell me about a time you optimized a process or improved efficiency."
          tip="Lab procedure? Code optimization? Show analytical thinking."
        />
        <QuestionItem
          question="What's your experience working with [specific technology stack]?"
          tip="Even class projects count! Be specific about what you did."
        />
        <QuestionItem
          question="How do you document your work?"
          tip="Lab reports? Comments in code? README files? Show organization."
        />
        <QuestionItem
          question="Describe your approach to learning a new technology quickly."
          tip="Docs? Tutorials? Practice projects? Show resourcefulness."
        />
        <QuestionItem
          question="What tools do you use for version control or collaboration?"
          tip="Git? GitHub? Even Google Drive for group projects shows collaboration."
        />
        <QuestionItem
          question="How do you balance quality with meeting deadlines?"
          tip="Show you understand trade-offs and can make practical decisions."
        />
      </div>
    </div>

    {/* "Why This Company?" Questions */}
    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🏢</span>
        "Why This Company?" / Motivation Questions
      </h4>
      <div className="space-y-4">
        <QuestionItem
          question="Why do you want to work here?"
          tip="DO YOUR RESEARCH. Mention specific projects, mission, or values. Not just 'good company.'"
          sampleAnswer="I'm really interested in [specific product/project]. I've been following [recent news], and the way you approach [specific thing] aligns with how I like to work."
        />
        <QuestionItem
          question="Why are you interested in this role specifically?"
          tip="Connect your skills/interests to the job description. Be specific."
        />
        <QuestionItem
          question="What do you know about our company?"
          tip="Mission, recent news, products. Spend 15 minutes on their website before the interview!"
        />
        <QuestionItem
          question="Where do you see yourself in 5 years?"
          tip="Don't say 'your job.' Show growth mindset: learning, developing skills in this field."
        />
        <QuestionItem
          question="Why should we hire you?"
          tip="Match your skills to their needs. What specific value do YOU bring?"
          sampleAnswer="I have experience with [relevant skill] from [project/class], and I'm excited to apply that to [specific aspect of the role]. I'm a fast learner and I genuinely care about [relevant aspect of their mission]."
        />
        <QuestionItem
          question="What interests you about this industry?"
          tip="Show genuine interest. What problems in this field excite you?"
        />
        <QuestionItem
          question="How did you hear about this position?"
          tip="Career fair? Company website? Connection? Be honest and show interest."
        />
        <QuestionItem
          question="What's your biggest strength?"
          tip="Pick ONE with a real example. Not just 'I'm hardworking'—prove it."
          sampleAnswer="I'm really good at breaking down complex problems. In my [specific project], I had to [explain what you did] and figure out [the challenge]."
        />
        <QuestionItem
          question="What's your biggest weakness?"
          tip="Pick a REAL weakness you're working on. Not 'I work too hard.'"
          sampleAnswer="I sometimes overthink decisions, which can slow me down. I've been working on setting time limits for research before committing to an approach, which has helped in recent projects."
        />
        <QuestionItem
          question="Why are you leaving your current job/internship?"
          tip="Focus on what you're moving TOWARD, not running from. Stay positive."
        />
        <QuestionItem
          question="What's your ideal work environment?"
          tip="Collaborative? Independent? Mention specific aspects of THEIR culture you've researched."
        />
        <QuestionItem
          question="How do you handle stress or pressure?"
          tip="Give a real example. Time management? Breaking tasks down? Show coping strategies."
        />
        <QuestionItem
          question="What motivates you?"
          tip="Be genuine. Learning? Problem-solving? Impact? Connect it to the role."
        />
        <QuestionItem
          question="Tell me about yourself."
          tip="2-minute elevator pitch: current situation → relevant experience → why you're here. NOT your life story."
          sampleAnswer="I'm a [year] studying [major] at [school]. I've worked on [relevant projects/experience], and I'm particularly interested in [specific aspect of the role]. I'm excited about this opportunity because [specific reason related to company]."
        />
        <QuestionItem
          question="Do you have any questions for us?"
          tip="ALWAYS have questions ready. See the 'Questions to Ask' section below!"
        />
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        Pro Tips for Answering
      </h4>
      <ul className="space-y-2 text-gray-700 text-sm">
        <li>• <strong>It's okay to pause and think.</strong> "That's a great question, let me think..." buys you 5 seconds.</li>
        <li>• <strong>Be specific.</strong> "I increased efficiency by 30%" beats "I made things better."</li>
        <li>• <strong>Use "I" not "we."</strong> What did YOU specifically do? Take credit for your work.</li>
        <li>• <strong>No negativity.</strong> Even when discussing challenges, focus on solutions and growth.</li>
        <li>• <strong>You don't have to be perfect.</strong> Authenticity &gt; rehearsed robot answers.</li>
      </ul>
    </div>
  </div>
);

// Question Item Component
const QuestionItem = ({ question, tip, sampleAnswer }) => (
  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
    <p className="font-semibold text-gray-800 mb-2">"{question}"</p>
    <p className="text-sm text-gray-600 italic">💡 {tip}</p>
    {sampleAnswer && (
      <div className="mt-3 bg-white p-3 rounded-lg border border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-1">SAMPLE ANSWER:</p>
        <p className="text-sm text-gray-700">{sampleAnswer}</p>
      </div>
    )}
  </div>
);

// STAR Method Content
const STARMethodContent = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-400">
      <h4 className="text-xl font-bold text-gray-800 mb-3">What is STAR?</h4>
      <p className="text-gray-700 mb-4">
        STAR is a framework for answering behavioral interview questions. It keeps your answers organized and complete.
      </p>
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-lg">
          <p className="font-bold text-blue-600">S = Situation</p>
          <p className="text-sm text-gray-600">Set the scene. What was the context? (1-2 sentences)</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p className="font-bold text-purple-600">T = Task</p>
          <p className="text-sm text-gray-600">What was YOUR responsibility? What needed to be done? (1 sentence)</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p className="font-bold text-pink-600">A = Action</p>
          <p className="text-sm text-gray-600">What did YOU specifically do? (Most important—spend the most time here!)</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p className="font-bold text-orange-600">R = Result</p>
          <p className="text-sm text-gray-600">What happened? Quantify if possible. What did you learn?</p>
        </div>
      </div>
    </div>

    {/* Student Examples */}
    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">📝</span>
        Real Student Examples
      </h4>

      {/* Example 1 */}
      <div className="bg-white border-2 border-green-200 p-6 rounded-xl mb-6">
        <p className="text-sm font-bold text-green-600 mb-3">EXAMPLE 1: Group Project Gone Wrong</p>
        <p className="text-sm italic text-gray-600 mb-4">Question: "Tell me about a time you dealt with a difficult team member."</p>

        <div className="space-y-3">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-green-700 mb-1">SITUATION:</p>
            <p className="text-sm text-gray-700">
              "In my Engineering Design class, I was part of a 4-person team building an automated sorting system.
              Two weeks before the deadline, one team member stopped responding to messages and missed meetings."
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-green-700 mb-1">TASK:</p>
            <p className="text-sm text-gray-700">
              "I needed to ensure the project was completed on time while keeping the team dynamic functional."
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-green-700 mb-1">ACTION:</p>
            <p className="text-sm text-gray-700">
              "First, I reached out privately to check if everything was okay—they were dealing with a family situation.
              Then I reorganized the remaining tasks among the three of us and updated our timeline.
              I also documented everyone's contributions so credit was fair when we presented to our professor."
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-green-700 mb-1">RESULT:</p>
            <p className="text-sm text-gray-700">
              "We completed the project on time and got an A. The team member appreciated that I checked in instead of just being frustrated.
              I learned that leadership sometimes means adapting to unexpected situations and focusing on solutions, not blame."
            </p>
          </div>
        </div>
      </div>

      {/* Example 2 */}
      <div className="bg-white border-2 border-blue-200 p-6 rounded-xl mb-6">
        <p className="text-sm font-bold text-blue-600 mb-3">EXAMPLE 2: Learning Under Pressure</p>
        <p className="text-sm italic text-gray-600 mb-4">Question: "Tell me about a time you had to learn something quickly."</p>

        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-blue-700 mb-1">SITUATION:</p>
            <p className="text-sm text-gray-700">
              "During my summer internship, my team needed to switch from MATLAB to Python for data analysis midproject because of licensing issues."
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-blue-700 mb-1">TASK:</p>
            <p className="text-sm text-gray-700">
              "I had to learn Python's NumPy and Pandas libraries within a week to continue my analysis work."
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-blue-700 mb-1">ACTION:</p>
            <p className="text-sm text-gray-700">
              "I spent evenings going through Python tutorials on YouTube and working through example problems.
              I also asked a colleague who knew Python to review my early code and give feedback.
              I converted my existing MATLAB script piece by piece to understand the differences."
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-blue-700 mb-1">RESULT:</p>
            <p className="text-sm text-gray-700">
              "By the end of the week, I was comfortable enough with Python to complete my analysis on schedule.
              The switch actually improved my code efficiency by 40% compared to MATLAB.
              I learned I can pick up new tools quickly when I break them down into manageable pieces."
            </p>
          </div>
        </div>
      </div>

      {/* Example 3 */}
      <div className="bg-white border-2 border-purple-200 p-6 rounded-xl mb-6">
        <p className="text-sm font-bold text-purple-600 mb-3">EXAMPLE 3: Taking Initiative</p>
        <p className="text-sm italic text-gray-600 mb-4">Question: "Describe a time you went above and beyond."</p>

        <div className="space-y-3">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-purple-700 mb-1">SITUATION:</p>
            <p className="text-sm text-gray-700">
              "While working as a lab assistant, I noticed students kept asking the same questions about a complex lab procedure."
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-purple-700 mb-1">TASK:</p>
            <p className="text-sm text-gray-700">
              "My role was to assist during lab hours, but I wanted to help students prepare better beforehand."
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-purple-700 mb-1">ACTION:</p>
            <p className="text-sm text-gray-700">
              "I created a simple step-by-step video tutorial breaking down the procedure with common troubleshooting tips.
              I shared it with the professor, who posted it on the course site."
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-purple-700 mb-1">RESULT:</p>
            <p className="text-sm text-gray-700">
              "Student confidence increased, and lab hours ran more smoothly since fewer students needed one-on-one help with basics.
              The professor now uses the video every semester.
              I learned that small improvements can have a big impact when you identify a real problem."
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* STAR Worksheet Template */}
    <div className="bg-gray-50 border-2 border-gray-300 p-6 rounded-xl">
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">✍️</span>
        Your STAR Template (Fill This Out!)
      </h4>
      <p className="text-gray-600 mb-4">Write out 3 stories using this template. Keep them saved on your phone/computer.</p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-gray-300">
          <label className="block text-sm font-bold text-gray-700 mb-2">Story 1: Your Challenge/Problem-Solving Example</label>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">SITUATION (1-2 sentences):</p>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none text-sm"
                rows="2"
                placeholder="Set the scene. What was happening?"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">TASK (1 sentence):</p>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none text-sm"
                rows="1"
                placeholder="What was YOUR responsibility?"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">ACTION (2-3 sentences - most important!):</p>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none text-sm"
                rows="3"
                placeholder="What specifically did YOU do? Be detailed."
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">RESULT (1-2 sentences + what you learned):</p>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none text-sm"
                rows="2"
                placeholder="What happened? Quantify if possible. What did you learn?"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-300">
          <label className="block text-sm font-bold text-gray-700 mb-2">Story 2: Your Teamwork Example</label>
          <p className="text-xs text-gray-500 mb-3">
            (Use the same STAR structure—practice filling this out yourself!)
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-300">
          <label className="block text-sm font-bold text-gray-700 mb-2">Story 3: Your Leadership/Initiative Example</label>
          <p className="text-xs text-gray-500 mb-3">
            (Use the same STAR structure—practice filling this out yourself!)
          </p>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>💡 Pro Tip:</strong> Write these out in a document and save them.
          Before every interview, read through your STAR stories so they're fresh in your mind.
          You can adapt them to fit different questions!
        </p>
      </div>
    </div>
  </div>
);

// Questions to Ask Content
const QuestionsToAskContent = () => (
  <div className="space-y-6">
    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-xl">
      <p className="text-gray-700">
        <strong>Why this matters:</strong> Asking good questions shows you're thinking critically about the role
        and that you care about finding the right fit. It's NOT just a formality!
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        Questions About the Role
      </h4>
      <div className="space-y-3">
        <AskQuestionItem question="What does a typical day look like in this role?" />
        <AskQuestionItem question="What are the biggest challenges someone in this position would face?" />
        <AskQuestionItem question="What would success look like in the first 3 months?" />
        <AskQuestionItem question="How does this role contribute to the team's goals?" />
        <AskQuestionItem question="What projects would I be working on?" />
      </div>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">👥</span>
        Questions About the Team
      </h4>
      <div className="space-y-3">
        <AskQuestionItem question="Can you tell me about the team I'd be working with?" />
        <AskQuestionItem question="Who would I be reporting to, and what's their management style?" />
        <AskQuestionItem question="How does the team collaborate—in person, remotely, or hybrid?" />
        <AskQuestionItem question="What do you like most about working on this team?" />
      </div>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🏢</span>
        Questions About Company Culture
      </h4>
      <div className="space-y-3">
        <AskQuestionItem question="How would you describe the company culture here?" />
        <AskQuestionItem question="What do you think makes someone successful at this company?" />
        <AskQuestionItem question="How does the company support work-life balance?" />
      </div>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">📈</span>
        Questions About Growth & Learning
      </h4>
      <div className="space-y-3">
        <AskQuestionItem question="What opportunities are there for professional development?" />
        <AskQuestionItem question="Do you offer mentorship programs or training?" />
        <AskQuestionItem question="What does career progression look like here?" />
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        Tips for Asking Questions
      </h4>
      <ul className="space-y-2 text-gray-700 text-sm">
        <li>• <strong>Prepare 5-6 questions</strong> (some may get answered during the interview)</li>
        <li>• <strong>Don't ask about salary/benefits in the first interview</strong> (wait for them to bring it up)</li>
        <li>• <strong>Avoid yes/no questions.</strong> Ask open-ended questions that spark conversation.</li>
        <li>• <strong>Listen to their answers!</strong> Ask follow-up questions based on what they say.</li>
        <li>• <strong>It's okay to say "That was covered earlier, thank you."</strong> Don't force unused questions.</li>
      </ul>
    </div>
  </div>
);

const AskQuestionItem = ({ question }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <p className="text-gray-800">"<span className="font-semibold">{question}</span>"</p>
  </div>
);

// Virtual Interview Content
const VirtualInterviewContent = () => (
  <div className="space-y-6">
    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl">
      <p className="text-gray-700">
        Virtual interviews are now standard, even for in-person roles. Get the tech right, and you're 80% there.
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">💻</span>
        Technical Setup
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Test your tech 30 minutes early.</strong> Camera working? Mic clear? Internet stable?</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Use a laptop, not your phone</strong> (unless absolutely necessary). More professional.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Have the interviewer's contact info ready</strong> in case you get disconnected.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Close all other tabs/programs.</strong> You don't want notifications popping up.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Use headphones if your audio echoes.</strong> Built-in mic is usually fine otherwise.</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">💡</span>
        Lighting & Camera
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Face a window or lamp.</strong> Light in front of you, not behind (avoid backlit silhouettes).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Camera at eye level.</strong> No looking up your nose or down at you.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Position yourself center-frame</strong> with some space above your head.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Look at the camera when talking,</strong> not the screen (makes "eye contact").</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🏠</span>
        Background & Environment
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Clean, simple background.</strong> Plain wall &gt; messy room. Virtual backgrounds can glitch—use sparingly.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Quiet space.</strong> Tell roommates/family you have an interview. Close the door.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Silence your phone</strong> (and put it out of reach so you're not tempted to look).</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">👔</span>
        What to Wear (Virtual)
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Business casual top.</strong> Button-down shirt, polo, or blouse. Solid colors work best on camera.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Avoid:</strong> Stripes (can look weird on camera), super bright colors, busy patterns, or anything low-cut.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-green-600">✓</span>
          <span><strong>Yes, wear pants.</strong> Just in case you have to stand up. (It happens.)</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        Common Virtual Mistakes to Avoid
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-red-600">✗</span>
          <span><strong>Joining late.</strong> Be in the "waiting room" 5 minutes early.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-red-600">✗</span>
          <span><strong>Multitasking.</strong> No texting, checking email, or eating during the interview.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-red-600">✗</span>
          <span><strong>Looking at yourself.</strong> Minimize the self-view if it's distracting.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-red-600">✗</span>
          <span><strong>Bad internet connection.</strong> If possible, plug in with ethernet cable or sit close to router.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-red-600">✗</span>
          <span><strong>Being too stiff.</strong> Virtual doesn't mean robotic—use hand gestures, smile, be human!</span>
        </li>
      </ul>
    </div>

    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        Pro Tip: The "Cheat Sheet"
      </h4>
      <p className="text-gray-700 text-sm">
        One advantage of virtual interviews: you can have notes nearby!
        Keep a document on your screen (out of camera view) with:
        <strong> Company research bullet points, your STAR stories, questions to ask them.</strong>
        Just don't read from it word-for-word—glance when needed.
      </p>
    </div>
  </div>
);

// In-Person Interview Content
const InPersonInterviewContent = () => (
  <div className="space-y-6">
    <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-xl">
      <p className="text-gray-700">
        In-person interviews feel more formal, but the prep is simpler than virtual in some ways—no tech to worry about!
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">👔</span>
        What to Wear (In-Person)
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Business casual is usually safe.</strong> Button-down shirt/blouse, slacks/khakis, closed-toe shoes.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>When in doubt, slightly overdressed &gt; underdressed.</strong> You can always remove a blazer.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Engineering/tech companies:</strong> Business casual leans casual (no suit needed).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Finance/consulting:</strong> Full business formal (suit, tie, dress).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Avoid:</strong> Jeans, sneakers, anything too casual, revealing, or wrinkled.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Keep accessories minimal.</strong> No jangly jewelry, strong perfume, or distracting patterns.</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">💼</span>
        What to Bring
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Multiple copies of your resume</strong> (3-5, printed on nice paper if possible).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Pen and small notebook</strong> (to write down names or take notes).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>List of questions you prepared</strong> (printed or on your phone).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Your ID</strong> (some companies require sign-in).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Mints or gum</strong> (finish before you go in—don't chew during interview!).</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">⏰</span>
        Timing & Arrival
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Arrive 10-15 minutes early.</strong> NOT 30 minutes (awkward), NOT late (disaster).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Scout the location the day before</strong> if you're unfamiliar (parking, entrance, etc.).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Plan for traffic/delays.</strong> Better to wait in your car than rush in flustered.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Use the restroom before going in.</strong> Check your appearance, take a breath.</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🤝</span>
        First Impressions
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Firm handshake</strong> (not bone-crushing, not limp). Make eye contact and smile.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Be polite to EVERYONE</strong> (receptionist, security, etc.)—they might report back.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Wait to sit until invited.</strong> Don't help yourself to their office chair.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Put your phone on silent</strong> (better yet, leave it in your bag).</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">💬</span>
        Body Language
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Sit up straight, but not stiff.</strong> Leaning slightly forward shows engagement.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Make eye contact</strong> (not staring, just normal conversational contact).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Smile genuinely.</strong> Friendly ≠ fake. Be yourself.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Use hand gestures naturally</strong> when explaining things (shows passion).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-pink-600">✓</span>
          <span><strong>Avoid:</strong> Crossing arms (looks defensive), fidgeting, checking your phone.</span>
        </li>
      </ul>
    </div>

    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        Pro Tip: The "Bathroom Mirror Pep Talk"
      </h4>
      <p className="text-gray-700 text-sm">
        Right before you walk in, find a restroom. Look at yourself in the mirror and take 3 deep breaths.
        Remind yourself: <strong>"I prepared. I belong here. This is just a conversation."</strong>
        Sounds cheesy, but it works. Your brain believes what you tell it.
      </p>
    </div>
  </div>
);

// After Interview Content
const AfterInterviewContent = () => (
  <div className="space-y-6">
    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-xl">
      <p className="text-gray-700">
        The interview doesn't end when you walk out. How you follow up matters.
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">✉️</span>
        Send a Thank-You Email
      </h4>
      <p className="text-gray-700 mb-4">
        Send this <strong>within 24 hours</strong> of your interview. Seriously—set a reminder if you need to.
      </p>

      <div className="bg-white border-2 border-indigo-200 p-6 rounded-xl">
        <p className="text-sm font-bold text-indigo-600 mb-3">THANK-YOU EMAIL TEMPLATE:</p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm space-y-3">
          <p><strong>Subject:</strong> Thank You - [Position Name] Interview</p>
          <p className="border-t border-gray-200 pt-3">
            Hi [Interviewer's Name],
          </p>
          <p>
            Thank you for taking the time to speak with me today about the [Position Name] role.
            I really enjoyed learning more about [specific thing they mentioned—project, team, company mission]
            and how the team approaches [specific challenge or process they discussed].
          </p>
          <p>
            Our conversation reinforced my interest in the position, especially [mention something specific from the interview that excited you].
            I'm confident my experience with [relevant skill or project] would allow me to contribute meaningfully to [specific team goal or project].
          </p>
          <p>
            Please don't hesitate to reach out if you need any additional information from me.
            I look forward to hearing about the next steps.
          </p>
          <p>
            Thank you again for the opportunity!
          </p>
          <p>
            Best regards,<br />
            [Your Name]
          </p>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>💡 Tips:</strong> Keep it brief (3-4 paragraphs). Personalize it—reference something specific from YOUR interview.
          Proofread for typos (seriously, read it twice). Send individual emails if you met multiple people.
        </p>
      </div>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">⏳</span>
        Follow-Up Timeline
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Within 24 hours:</strong> Send thank-you email</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>1-2 weeks:</strong> If they said they'd get back to you by X date, wait until that date passes</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>After 2 weeks:</strong> If you haven't heard anything, send a polite check-in email</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>After 3+ weeks:</strong> Assume it's a soft rejection and keep applying elsewhere</span>
        </li>
      </ul>

      <div className="bg-white border border-gray-300 p-4 rounded-xl mt-4">
        <p className="text-sm font-bold text-gray-700 mb-2">FOLLOW-UP EMAIL TEMPLATE (if no response after 2 weeks):</p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs space-y-2">
          <p><strong>Subject:</strong> Following Up - [Position Name] Interview</p>
          <p className="border-t border-gray-200 pt-2">
            Hi [Interviewer's Name],
          </p>
          <p>
            I wanted to follow up on my interview for the [Position Name] role on [date].
            I remain very interested in the opportunity and would love to hear about any updates on the hiring process.
          </p>
          <p>
            Please let me know if there's any additional information I can provide. Thank you again for your time and consideration!
          </p>
          <p>
            Best regards,<br />
            [Your Name]
          </p>
        </div>
      </div>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🧠</span>
        While You Wait
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Keep applying to other jobs.</strong> Don't put all your eggs in one basket.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Reflect on what went well and what didn't.</strong> Use it to improve for next time.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Don't obsessively check your email.</strong> Set aside specific times to check (morning, evening).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Do something productive:</strong> Work on a project, take an online course, network.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Be kind to yourself.</strong> Waiting is hard. Interview anxiety is real. You did your best.</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">❌</span>
        If You Get Rejected
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>It's okay to feel disappointed.</strong> Take a day to process.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Send a gracious response.</strong> "Thank you for letting me know. I enjoyed learning about [company]. Best of luck filling the position."</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Ask for feedback</strong> (politely). Some companies will give it, most won't—but it's worth asking.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Remember: One rejection ≠ you're not good enough.</strong> Fit matters. Timing matters. Sometimes it's just numbers.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Every interview is practice.</strong> You got better just by doing it.</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎉</span>
        If You Get an Offer
      </h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>CELEBRATE!</strong> This is a big deal. You earned it.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Ask for the offer in writing</strong> before you accept.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>It's okay to ask for time to think</strong> (2-3 days is normal).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Research fair pay on Glassdoor</strong> before negotiating (yes, interns can negotiate!).</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Ask questions about the role</strong> before you accept: hours, start date, logistics.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-indigo-600">✓</span>
          <span><strong>Once you accept, notify other companies</strong> you're no longer in their process (professional courtesy).</span>
        </li>
      </ul>
    </div>

    <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl mt-6">
      <div className="flex gap-3">
        <span className="text-3xl">💪</span>
        <div>
          <h4 className="font-bold text-gray-800 text-lg mb-2">Remember</h4>
          <p className="text-gray-700 leading-relaxed">
            Every interview—whether you get the job or not—teaches you something.
            You got better at talking about yourself. You practiced thinking on your feet.
            You learned what you want (or don't want) in a role.
            <strong> That's progress, even when it doesn't feel like it.</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Print Modal Component
const PrintModal = ({ checklist, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Print Interview Prep Checklist</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 print-content">
          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Interview Prep Checklist</h4>
            <div className="space-y-2">
              <PrintChecklistItem checked={checklist.readQuestions} label="Read through common interview questions" />
              <PrintChecklistItem checked={checklist.writeSTAR} label="Write out 3 STAR method examples from my experience" />
              <PrintChecklistItem checked={checklist.prepareQuestions} label="Prepare 5 questions to ask the interviewer" />
              <PrintChecklistItem checked={checklist.practiceOutLoud} label="Practice answering out loud" />
              <PrintChecklistItem checked={checklist.setupSpace} label="Set up virtual interview space" />
              <PrintChecklistItem checked={checklist.pickOutfit} label="Pick out interview outfit" />
              <PrintChecklistItem checked={checklist.researchCompany} label="Research the company (15+ minutes)" />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-sm text-gray-600 text-center">
              From MoreThanOneWay.org - You've got this! 💪
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-teal-600 font-semibold flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print Checklist
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const PrintChecklistItem = ({ checked, label }) => (
  <div className="flex items-center gap-3 p-2">
    <div className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center">
      {checked && <Check className="w-4 h-4 text-green-600" />}
    </div>
    <span className={`text-gray-700 ${checked ? 'line-through' : ''}`}>{label}</span>
  </div>
);

export default InterviewPrep;