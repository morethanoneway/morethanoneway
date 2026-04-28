import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Check, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const SECTIONS = [
  {
    id: 'situation',
    title: 'Your Situation',
    subtitle: 'Start with the basics. If you\'re early in school, some of these won\'t apply yet — just skip them or write "not sure yet."',
    fields: [
      {
        id: 'major',
        label: 'What are you studying, or what\'s your major?',
        hint: 'If you\'re undecided, say that — it\'s useful information.',
        placeholder: 'Example: Mechanical Engineering. Or: Undecided, leaning toward something in healthcare or business.',
        type: 'textarea',
        minLength: 10
      },
      {
        id: 'year',
        label: 'Where are you in school?',
        hint: null,
        placeholder: 'Example: Junior. Or: Returning student after 3 years away. Or: Not currently enrolled.',
        type: 'textarea',
        minLength: 5
      },
      {
        id: 'graduation',
        label: 'How far are you from graduating?',
        hint: null,
        placeholder: 'Example: About 14 months. Or: Unsure — depends on how many credits transfer.',
        type: 'textarea',
        minLength: 5
      },
      {
        id: 'work',
        label: 'What are you doing for work right now, and what role does that job play in your life?',
        hint: null,
        placeholder: 'Example: I work as an EMT — it pays my half of rent and I\'ve been doing it 3 years. It\'s stable but not where I want to stay. Or: Not working right now, living at home while finishing school.',
        type: 'textarea',
        minLength: 20
      },
      {
        id: 'lifeEvents',
        label: 'Any major life events coming up in the next 1-2 years?',
        hint: null,
        placeholder: 'Example: Graduating in May, getting married fall 2027, can\'t relocate until after wedding. Or: Nothing major, pretty flexible.',
        type: 'textarea',
        minLength: 10
      },
      {
        id: 'relocate',
        label: 'Can you relocate for work right now?',
        hint: null,
        placeholder: 'Example: Not until after graduation and my wedding — probably late 2027. Or: Yes, I\'m flexible. Or: No — I\'m caring for a family member.',
        type: 'textarea',
        minLength: 10
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Reality',
    subtitle: 'This section matters more than you think. If you\'re vague here, the AI will suggest paths you can\'t actually take right now. Be specific — real obligations, real constraints. A plan built on fantasy finances isn\'t a plan.',
    fields: [
      {
        id: 'financialObligations',
        label: 'What does your income need to protect right now?',
        hint: null,
        placeholder: 'Example: Half of $1,800/month rent, car insurance, phone, helping my mom with groceries sometimes. Or: Nothing major — I live at home and my parents cover tuition.',
        type: 'textarea',
        minLength: 20
      },
      {
        id: 'steppingStone',
        label: 'Could you realistically take a lower-paying stepping stone job right now?',
        hint: null,
        placeholder: 'Example: No — I need at least $40k to cover rent and bills. Or: Maybe, if it was part-time and I kept my current job. Or: Yes, I have some savings and flexibility.',
        type: 'textarea',
        minLength: 20
      },
      {
        id: 'riskTolerance',
        label: 'Do you need stability right now, or are you in a season where you can take more risk?',
        hint: 'Be honest. There\'s no wrong answer — but your plan needs to reflect your actual situation.',
        placeholder: 'Example: Need stability — too many fixed expenses and a wedding to plan. Or: I could take some risk, I have 6 months saved and my expenses are low.',
        type: 'textarea',
        minLength: 20
      }
    ]
  },
  {
    id: 'honestReality',
    title: 'Your Honest Reality',
    subtitle: 'This is the section most people rush through. Don\'t. The more specific you are, the better your career map will be.',
    fields: [
      {
        id: 'jobListingReaction',
        label: 'When you find a job listing that excites you, what usually happens next?',
        hint: null,
        placeholder: 'Example: I apply immediately without fully reading the requirements. Or: I save it, research the company, then usually talk myself out of applying. Or: I forward it to everyone I know and then forget about it.',
        type: 'textarea',
        minLength: 30
      },
      {
        id: 'bigDecisions',
        label: 'How do you handle big decisions?',
        hint: null,
        placeholder: 'Example: I research everything for weeks and still feel unsure. Or: I make fast decisions and sometimes regret them. Or: I avoid them until I have no choice.',
        type: 'textarea',
        minLength: 30
      },
      {
        id: 'habits',
        label: 'Describe your daily habits and routines. Are you structured or do you figure things out as you go?',
        hint: 'Think about: Do you make lists? Stick to a schedule? Need quiet to focus or work better with noise? Morning person or night owl? React well to unexpected changes or does it throw you off? If you have ADD, anxiety, tend to procrastinate, or need a lot of structure — say so. It helps the AI give you a plan that actually works for how your brain works.',
        placeholder: 'Example: Very regimented — I wake up at the same time, have a routine, plan my week in advance and don\'t like deviating from it. Or: Pretty spontaneous, I work in bursts and do my best thinking late at night. Or: I start things with a lot of energy and then struggle to finish them.',
        type: 'textarea',
        minLength: 40
      },
      {
        id: 'didntWork',
        label: 'What have you tried that didn\'t work out?',
        hint: 'This isn\'t failure. This is data. Answer both parts.',
        placeholder: 'What was it? Example: Planned to join the Navy — got injured at the end of bootcamp and was discharged. Tried community college right after — didn\'t do well. Worked as a line cook for a year thinking I\'d go to culinary school.\n\nWhy didn\'t it work? The discharge was out of my control. Community college — I wasn\'t ready and had no direction. Line cook — I liked cooking but hated the environment and the hours.',
        type: 'textarea',
        minLength: 50
      },
      {
        id: 'avoiding',
        label: 'What are you avoiding right now?',
        hint: 'Sometimes the real issue isn\'t confusion — it\'s avoiding the next hard thing. Be honest with yourself here.',
        placeholder: 'Example: Honestly, I\'m avoiding finishing my thesis because I\'m scared it won\'t be good enough. Or: I keep applying to things I\'m not qualified for because applying feels like progress even when it isn\'t. Or: I know I need to have a hard conversation with my parents about changing my major.',
        type: 'textarea',
        minLength: 30
      }
    ]
  },
  {
    id: 'selfKnowledge',
    title: 'What You Know About Yourself',
    subtitle: 'Some of this you\'ll know clearly. Some you\'ll have to think about. Both are fine.',
    fields: [
      {
        id: 'miserable',
        label: 'Think about a job, class, or experience that made you miserable or drained you. What specifically felt wrong?',
        hint: null,
        placeholder: 'Example: I worked retail for two years and it was the longest two years of my life. The problem wasn\'t the customers — it was the unpredictability, the pointlessness, and the feeling that nothing I did mattered. Or: I took a data analysis class and dreaded every session. Too abstract, too isolated, too disconnected from people.',
        type: 'textarea',
        minLength: 40
      },
      {
        id: 'naturallyGoodAt',
        label: 'What do people come to you for? What do you do naturally well — even if it seems ordinary to you?',
        hint: null,
        placeholder: 'Example: People always ask me to explain complicated things — I can break anything down so anyone can understand it. Or: I\'m the person who organizes everything. Events, projects, moves — I\'m the one who makes the list and keeps everyone on track. Or: People tell me I\'m easy to talk to. Strangers open up to me.',
        type: 'textarea',
        minLength: 40
      },
      {
  id: 'hobbies',
  label: 'What do you do in your free time? What are your hobbies and interests outside of school or work?',
  hint: 'Include everything — gaming, reading, sports, volunteering, building things, cooking, music, anything. If there are things you find hard to do — like sitting still, reading for long periods, or waiting around — mention that too. It\'s just as useful as what you enjoy.',
  placeholder: 'Example: I game a lot — I can focus for hours when something engages me. I play pickup basketball twice a week. I hate sitting still and reading is hard for me so I avoid it. Or: I cook, hike, and read constantly — I\'m happiest when I\'m learning something new on my own.',
  type: 'textarea',
  minLength: 30
},
      {
  id: 'strengthsWeaknesses',
  label: 'What are your strengths and weaknesses — be honest about both?',
  hint: 'Strengths: what you do well, what comes naturally, what others rely on you for. Weaknesses: what you avoid, what drains you, what you know needs work. Both matter for building a realistic plan.',
  placeholder: 'Example: Strengths — I am highly analytical, I finish work quickly, I explain complex things clearly. Weaknesses — I get bored when work is slow, I sometimes make fast decisions without enough research, I tend to ask others before trusting my own judgment.',
  type: 'textarea',
  minLength: 40
},
{
  id: 'targetRoles',
  label: 'Are there specific companies, roles, or industries you\'re drawn to — even if you\'re not sure why?',
  hint: 'Name them. Even a gut feeling counts. "I want to work somewhere like Raytheon" is useful information. "I don\'t know" is also fine — just say that.',
  placeholder: 'Example: I keep looking at defense companies like Raytheon and Lockheed Martin — I think it\'s the scale and the technical complexity. Or: I\'m drawn to startups but not sure if I could handle the instability. Or: Honestly no idea yet.',
  type: 'textarea',
  minLength: 20
},
      {
        id: 'workForFree',
        label: 'If money wasn\'t a factor, what kind of work would you want to spend your days doing?',
        hint: 'Think about the activity, not the job title — teaching, building, researching, helping, creating, organizing, leading, performing, fixing, protecting. We\'re not asking what you\'d do if you won the lottery. We\'re asking what kind of work feels right when money isn\'t the barrier.',
        placeholder: 'Example: I\'d spend my days doing historical research and talking to people about what I find. Or: Building things with my hands and solving mechanical problems. Or: I\'d be teaching — I love that moment when something clicks for someone.',
        type: 'textarea',
        minLength: 30
      }
    ]
  },
  {
    id: 'obstacles',
    title: 'What\'s Getting In The Way',
    subtitle: 'Be honest here. This is usually the most useful section.',
    fields: [
      {
        id: 'biggestChallenge',
        label: 'What\'s your biggest challenge right now?',
        hint: null,
        placeholder: 'Example: I keep applying to jobs I\'m not qualified for yet and then feel rejected. Or: I freeze when I have too many options and end up doing nothing. Or: My family expects me to go into medicine and I don\'t want to. Or: I genuinely don\'t know what I want and I\'m scared to admit that.',
        type: 'textarea',
        minLength: 30
      },
      {
        id: 'successIn2Years',
        label: 'What does success look like to you in 2 years?',
        hint: 'Not your dream end state — just 2 years from now. What would feel like real progress?',
        placeholder: 'Example: I\'d have my degree, be working in something museum or parks-related even if it\'s entry level, and not be drowning financially. Or: I\'d have finished school and be in a job that doesn\'t make me miserable while I figure out the next step.',
        type: 'textarea',
        minLength: 30
      }
    ]
  }
];

const EXAMPLE = {
  situation: 'History major, about 1 year from graduation. Currently working as an EMT — it covers my half of rent and I\'ve been doing it for 3 years. Getting married fall 2027. Cannot relocate until after the wedding.',
  financial: 'Need to cover half of $1,800/month rent plus car and phone. Cannot take a significant pay cut right now. Need stability until at least late 2027.',
  honestReality: 'When I find a job listing I get excited about, I usually apply immediately — even if I don\'t fully meet the requirements. I make fast decisions and sometimes regret them. I have ADD so I want things to happen now. I\'ve tried the Navy (injury ended it), community college right after discharge (wasn\'t ready), and working as a line cook (liked cooking, hated the environment). What I\'m avoiding: applying to jobs I actually qualify for because I keep going after ones that are out of reach.',
  selfKnowledge: 'I\'m genuinely good at talking to people — strangers open up to me easily. I love public speaking and historical research. I\'ve been obsessed with Civil War history since 3rd grade. I\'m drained by isolated desk work with no human connection.',
  obstacles: 'I keep applying to jobs that require a degree I don\'t have yet, or jobs that would require me to relocate before I can. My biggest challenge is slowing down and being strategic instead of reactive. Success in 2 years: degree in hand, working in something history-related even if entry level, financially stable through the wedding.'
};

const GENERATED_PROMPT = (answers) => `I need you to build me a personalized career clarity map.

Read my answers carefully before responding. Do not skim.

BEFORE YOU GIVE ANY ADVICE — DIAGNOSE FIRST:

1. What stage of career clarity am I actually in?
   (Exploring with no direction / Know what I want but stuck /
   Know what I want but can't get there yet / In crisis mode)

2. What is my primary decision pattern based on my answers?
   (Impulsive / Avoidant / Paralyzed by options /
   Chasing urgency / Realistic and methodical / Seeking approval)

3. If my stated goals and my actual behavior are contradicting
   each other, point that out directly.

4. If I am avoiding something, name it.

FINANCIAL REALITY — THIS IS NON-NEGOTIABLE:
Do not recommend anything that would destabilize my current
income or financial situation. If I cannot afford to take a
risk right now, say so and build the plan around that reality.
A move that destroys stability is not progress.

CAREER PATHS:
Suggest 2-3 realistic paths given my actual situation — not
my dream situation. For each one tell me:
- What I already have going for me
- What I am missing
- What the realistic first step is

Do not suggest paths that require credentials, money, or
geography I clearly don't have access to right now.

12-MONTH PLAN:
Build in 4 quarters. Each quarter gets:
- One theme
- Up to 3 specific, completable tasks (not vague goals)
- One thing to stop doing

FINISH WITH THESE THREE THINGS:
1. The ONE thing I should do this week — not eventually, this week
2. The ONE thing I should stop doing immediately
3. One honest sentence about where I actually am right now —
   not motivational, just true

RULES:
- No generic advice ("network more," "follow your passion")
- Be direct and honest, even if it's uncomfortable
- Challenge bad assumptions if you see them
- Focus on strategy, not motivation
- Be specific about timing — no "eventually"
- The financial constraints above are hard limits on every recommendation
- Do not moralize about personal habits (gaming, sleep schedule,
  hobbies). Only flag a habit if it directly conflicts with a
  specific career goal the student stated. Strategy only.
- Do not criticize who the student turns to for support. If they
  rely on a parent, friend, or mentor for guidance, that is their
  support system. Acknowledge it and suggest adding professional
  voices alongside it — never instead of it.

  PERSONAL JOB FILTER:
Based on my specific constraints above, create a personalized
3-question filter I can screenshot or write down and use every
time I find a job listing. Format it as a simple table or list:

Before applying to any job, ask:
1. [Question based on my degree/credential status]
2. [Question based on my financial floor]
3. [Question based on my timeline/relocation constraints]

If YES to any → Close the tab. Not this one. Not now.
If NO to all three → Worth researching further.

Label this section clearly: "YOUR PERSONAL JOB FILTER"
---

MY SITUATION:

Major or field of study: ${answers.major || '[not answered]'}

Where I am in school: ${answers.year || '[not answered]'}

How far from graduating: ${answers.graduation || '[not answered]'}

Current work and what role it plays in my life: ${answers.work || '[not answered]'}

Major life events in the next 1-2 years: ${answers.lifeEvents || '[not answered]'}

Can I relocate for work right now: ${answers.relocate || '[not answered]'}

MY FINANCIAL REALITY:

What my income needs to protect right now: ${answers.financialObligations || '[not answered]'}

Could I realistically take a lower-paying stepping stone job: ${answers.steppingStone || '[not answered]'}

Do I need stability right now or can I take more risk: ${answers.riskTolerance || '[not answered]'}

MY HONEST REALITY:

When I find an exciting job listing, what usually happens next: ${answers.jobListingReaction || '[not answered]'}

How I handle big decisions: ${answers.bigDecisions || '[not answered]'}

My daily habits and routines: ${answers.habits || '[not answered]'}

What I have tried that did not work out and why: ${answers.didntWork || '[not answered]'}

What I am avoiding right now: ${answers.avoiding || '[not answered]'}

WHAT I KNOW ABOUT MYSELF:

What has made me miserable or drained me and why: ${answers.miserable || '[not answered]'}

What I naturally do well: ${answers.naturallyGoodAt || '[not answered]'}

Hobbies and free time activities (including things I find hard or avoid): ${answers.hobbies || '[not answered]'}

My strengths and weaknesses: ${answers.strengthsWeaknesses || '[not answered]'}

Specific companies, roles, or industries I am drawn to: ${answers.targetRoles || '[not answered]'}

What kind of work I would do if money was not a factor: ${answers.workForFree || '[not answered]'}

WHAT IS GETTING IN THE WAY:

My biggest challenge right now: ${answers.biggestChallenge || '[not answered]'}

What success looks like to me in 2 years: ${answers.successIn2Years || '[not answered]'}`;

const MIN_CHARS = 20;

const CharCounter = ({ value, minLength }) => {
  const count = value.length;
  const enough = count >= (minLength || MIN_CHARS);
  if (count === 0) return null;
  return (
    <p className={`text-xs mt-1 ${enough ? 'text-green-600' : 'text-amber-600'}`}>
      {enough ? '✓ Good detail' : `A bit brief — more detail = better results (${count} characters)`}
    </p>
  );
};

const CopyButton = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button onClick={copy}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors">
      {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> {label}</>}
    </button>
  );
};


export default function CareerMap({ setCurrentPage }) {
  const [answers, setAnswers] = useState({});
  const [showExample, setShowExample] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const promptRef = useRef(null);

  const update = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }));

  const totalFields = SECTIONS.reduce((acc, s) => acc + s.fields.length, 0);
  const answeredFields = Object.values(answers).filter(v => v && v.trim().length >= MIN_CHARS).length;
  const progress = Math.round((answeredFields / totalFields) * 100);

  const generatedPrompt = GENERATED_PROMPT(answers);

  const handleGenerate = () => {
    setShowPrompt(true);
    setTimeout(() => {
      promptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      <Helmet>
        <title>Career Clarity & Decision System | MoreThanOneWay.org</title>
        <meta name="description" content="Build a personalized career map that accounts for your real constraints, timeline, and life. Free tool for college students and career changers." />
        <meta name="keywords" content="career map college students, career clarity tool, job search plan, career decision making, non-linear career path" />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-2">
              Career Clarity &{' '}
              <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">Decision System</span>
            </h1>
            <p className="text-lg text-gray-500 italic mb-4">Stop applying randomly. Start moving with a plan.</p>
            <p className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto">
              Fill this in honestly, copy the generated prompt, and paste it into any AI tool. 
              You'll get a personalized career map built around your actual situation — not a generic checklist.
            </p>
          </div>

          {/* Honesty note */}
          <div className="bg-gray-900 text-white rounded-2xl p-6 mb-8">
            <p className="text-base leading-relaxed">
              This works best when you're real with yourself. Not resume-real — actually real. 
              Nobody sees this except you and whatever AI you paste it into. The more honest you are 
              about where you actually are, the more useful your career map will be. Detours, dropped 
              majors, impulsive decisions, jobs that didn't work out — all of it is useful information. 
              Include it. <strong>You can't write too much.</strong>
            </p>
            <p className="text-sm text-gray-300 mt-3">
              Heads up: the AI prompt you generate asks the AI to be direct and honest — not to make you feel good. 
              It may challenge your assumptions or tell you something uncomfortable. That's the point. 
              A plan that tells you what you want to hear isn't a plan.
            </p>
          </div>

          {/* Progress bar */}
          {answeredFields > 0 && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{answeredFields} of {totalFields} fields completed</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#006581] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* See an example */}
          <div className="mb-8 rounded-2xl border border-[#006581]/20 overflow-hidden">
            <button
              onClick={() => setShowExample(!showExample)}
              className="w-full flex items-center justify-between p-5 bg-[#006581]/5 hover:bg-[#006581]/10 transition-colors text-left"
            >
              <div>
                <p className="font-semibold text-[#006581]">See a real example first</p>
                <p className="text-sm text-gray-600">How a history student with ADD used this to build a career map</p>
              </div>
              {showExample ? <ChevronUp className="w-5 h-5 text-[#006581]" /> : <ChevronDown className="w-5 h-5 text-[#006581]" />}
            </button>

            {showExample && (
              <div className="p-6 border-t border-[#006581]/20 space-y-5">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Example — History Major, Pre-Graduation</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">WHAT IS ACTUALLY TRUE</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• About 1 year from completing a history degree</li>
                      <li>• Financially stable working as an EMT</li>
                      <li>• Getting married in about 18 months</li>
                      <li>• Doing well academically right now</li>
                      <li>• Already building a history-focused resume</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                    <p className="text-xs font-semibold text-amber-700 mb-2">WHAT FEELS TRUE (BUT ISN'T)</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• That he is behind</li>
                      <li>• That he missed his window</li>
                      <li>• That everyone else is ahead</li>
                      <li>• That he needs to move NOW</li>
                      <li>• That the next listing is the one</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-3">THE 3-QUESTION FILTER (from his career map)</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="text-gray-500 font-medium pb-2 pr-4">Question</th>
                        <th className="text-gray-500 font-medium pb-2">If YES...</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2 pr-4 text-gray-700">Does it require a degree I don't have yet?</td>
                        <td className="py-2 font-semibold text-red-600">STOP</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-gray-700">Does it pay significantly less than my expenses require?</td>
                        <td className="py-2 font-semibold text-red-600">STOP</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-gray-700">Does it require relocation before my timeline allows?</td>
                        <td className="py-2 font-semibold text-red-600">STOP</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-gray-700">Passes all three?</td>
                        <td className="py-2 font-semibold text-green-600">Worth a conversation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">QUARTER 1 OF HIS 12-MONTH PLAN</p>
                  <p className="text-xs text-[#006581] font-semibold mb-2">Theme: Foundation + Focus</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Finalize a museum-focused resume and start a federal-style resume draft</li>
                    <li>• Research 5 real NPS ranger job postings — study the language and requirements</li>
                    <li>• Identify 3 local museums or historic sites to potentially volunteer with</li>
                    <li><span className="text-red-600 font-medium">Stop:</span> Applying to jobs that fail the 3-question filter</li>
                  </ul>
                </div>

                <div className="bg-[#006581]/5 rounded-xl border border-[#006581]/20 p-4">
                  <p className="text-xs font-semibold text-[#006581] mb-2">HIS STORY REFRAME</p>
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    "I've always been drawn to history — Civil War since third grade. I planned to serve in the Navy 
                    and build from there. An injury ended that, and I had to rebuild from scratch. I tried a few 
                    different paths before realizing I needed to pursue what had always mattered to me. I went back 
                    to school, I've done well, and I've been working as an EMT in parallel — which has taught me more 
                    about staying calm under pressure and connecting with people than almost anything else. That's 
                    exactly what interpretation and public history work requires."
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form sections */}
          <div className="space-y-8">
            {SECTIONS.map((section, sIdx) => (
              <div key={section.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-[#006581] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {sIdx + 1}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 ml-10 leading-relaxed">{section.subtitle}</p>
                </div>

                <div className="p-6 space-y-6">
                  {section.fields.map(field => (
                    <div key={field.id}>
                      <label className="block font-semibold text-gray-900 mb-1 text-sm">
                        {field.label}
                      </label>
                      {field.hint && (
                        <p className="text-xs text-gray-500 mb-2 leading-relaxed flex items-start gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5 text-[#006581]" />
                          {field.hint}
                        </p>
                      )}
                      <textarea
                        value={answers[field.id] || ''}
                        onChange={e => update(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#006581] focus:ring-1 focus:ring-[#006581] resize-y transition-colors"
                      />
                      <CharCounter value={answers[field.id] || ''} minLength={field.minLength} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Generate button */}
          <div className="mt-10 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-1">Ready to generate your prompt?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Click below to generate your personalized career map prompt. Copy it and paste it into 
              ChatGPT, Claude, Gemini, or any AI tool you use.
            </p>

            {answeredFields < 5 && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  You've only completed {answeredFields} fields. The more you fill in, the more useful your career map will be. 
                  You can still generate now, but consider going back and adding more detail.
                </p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              className="w-full bg-[#006581] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#005470] transition-colors"
            >
              Generate My Personalized Prompt →
            </button>
          </div>

          {/* Generated prompt */}
          {showPrompt && (
            <div ref={promptRef} className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden scroll-mt-24">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900">Your Personalized Prompt</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Copy this and paste it into any AI tool</p>
                </div>
                <CopyButton text={generatedPrompt} label="Copy Prompt" />
              </div>

              <div className="p-5">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
                  {generatedPrompt}
                </pre>
              </div>

              <div className="p-5 border-t border-gray-100">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
  <p className="text-sm text-amber-900 leading-relaxed">
    <strong>Heads up:</strong> The output will be long — that's normal. Read all of it. 
    The diagnosis at the top and the three things at the end are the most important parts. 
    Everything in between is context for why.
  </p>
</div>
<p className="text-sm font-semibold text-gray-900 mb-3">Paste into any of these:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
{[
  { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-600 hover:bg-orange-700', desc: 'Best for honest diagnosis — catches contradictions and challenges assumptions directly.' },
  { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600 hover:bg-green-700', desc: 'Best for structure — produces thorough, well-organized plans.' },
  { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-600 hover:bg-blue-700', desc: 'Most creative paths — good at unexpected connections. Read critically.' },
  { name: 'Other AI Tools', url: 'https://www.google.com/search?q=free+AI+chat+tool', color: 'bg-gray-700 hover:bg-gray-800', desc: 'Already use something else? The prompt works across platforms.' }
].map(tool => (
  <div key={tool.name} className="flex flex-col gap-1">
    <a href={tool.url} target="_blank" rel="noopener noreferrer"
      className={`${tool.color} text-white text-center py-2.5 rounded-xl text-sm font-semibold transition-colors`}>
      {tool.name}
    </a>
    <p className="text-xs text-gray-500 text-center leading-snug px-1">{tool.desc}</p>
  </div>
))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Click an AI tool above, then paste your prompt (Ctrl+V or Cmd+V) and press Enter.
                </p>
              </div>
            </div>
          )}

          {/* Next steps */}
          <div className="mt-10 rounded-3xl bg-[#006581] text-white p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Once you have your career map</h3>
            <p className="text-white/80 text-sm mb-6">Use these tools to act on it</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
  { label: 'Career Paths', page: 'pivot' },
  { label: 'Resume Builder', page: 'resume-builder' },
  { label: 'Job Search Playbook', page: 'job-search-playbook' },
  { label: 'Application Tracker', page: 'tracker' }
].map(item => (
  <button key={item.page} onClick={() => { setCurrentPage(item.page); window.scrollTo(0, 0); }}
                  className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors border border-white/20">
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
