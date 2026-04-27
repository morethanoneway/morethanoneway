import React, { useState } from 'react';
import { Check, ExternalLink, Sparkles, MessageCircle, Flag, ChevronDown, ChevronUp } from 'lucide-react';

const AI_PROVIDERS = {
  chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600 hover:bg-green-700' },
  claude: { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-600 hover:bg-orange-700' },
  gemini: { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-600 hover:bg-blue-700' },
  other: { name: 'Other AI Tools', url: 'https://www.google.com/search?q=free+AI+chat+tool', color: 'bg-gray-700 hover:bg-gray-800' }
};

const RESUME_AI_FLAGS = [
  { phrase: 'responsible for', suggestion: 'Start with an action verb instead' },
  { phrase: 'helped with', suggestion: 'Be specific about YOUR contribution' },
  { phrase: 'worked on', suggestion: 'Too vague — say what you built or delivered' },
  { phrase: 'assisted with', suggestion: 'Say exactly what you did' },
  { phrase: 'participated in', suggestion: 'Say what you contributed specifically' },
  { phrase: 'was involved in', suggestion: 'Replace with a specific action verb' },
  { phrase: 'passionate about', suggestion: 'Remove from resume — show it with results' },
  { phrase: 'leveraged', suggestion: 'Just say "used"' },
  { phrase: 'utilized', suggestion: 'Just say "used"' },
  { phrase: 'spearheaded', suggestion: 'Try "led" or "launched"' },
  { phrase: 'dynamic', suggestion: 'Meaningless word — delete it' },
  { phrase: 'results-driven', suggestion: 'Show the results instead' },
  { phrase: 'detail-oriented', suggestion: 'Show it with a specific example' },
  { phrase: 'team player', suggestion: 'Show collaboration with a specific example' },
  { phrase: 'synergy', suggestion: 'Delete this entirely' },
  { phrase: 'fostered', suggestion: 'Try "built" or "developed"' },
  { phrase: 'robust', suggestion: 'Be specific instead' },
  { phrase: 'various', suggestion: 'List the specific things' },
  { phrase: ' — ', suggestion: 'Em dashes are an AI tell — use a comma or rewrite' },
];

const checkResumeFlags = (text) => {
  if (!text) return [];
  const lower = text.toLowerCase();
  return RESUME_AI_FLAGS.filter(flag => lower.includes(flag.phrase.toLowerCase()));
};

const stopWords = new Set([
  // Common words
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','be','been','have','has','had','do','does','did','will','would','could','should','may','might','can','that','this','these','those','it','its','we','our','you','your','they','their','i','my','me','as','if','when','which','who','what','how','all','any','both','each','more','most','other','some','into','through','before','after','about','while','also','than','very','just','not','no','nor','so','yet','either','whether','must','shall','need',
  // Job posting filler words
  'apply','applying','applicant','applicants','candidate','candidates','equal','opportunity','employer','employment','qualified','qualify','position','role','join','team','company','organization','including','include','includes','included','such','please','submit','resume','cover','letter','email','send','contact','click','here','learn','more','about','view','see','visit','website','page','link','click','related','relevant','required','requirements','preferred','plus','bonus','nice','have','strong','ability','work','working','works','worked','experience','years','year','degree','field','knowledge','understanding','familiarity','familiar','demonstrated','proven','track','record','record','history','background','skill','skills','using','use','used','uses','make','making','made','take','taking','taken','help','helping','helped','support','supporting','supported','ensure','ensuring','ensures','provide','providing','provided','manage','managing','managed','develop','developing','developed','build','building','built','create','creating','created','lead','leading','led','drive','driving','drove','grow','growing','grew','increase','increasing','increased','improve','improving','improved','maintain','maintaining','maintained','collaborate','collaborating','collaborated','communicate','communicating','communicated','learn','learning','learned','identify','identifying','identified','implement','implementing','implemented','monitor','monitoring','monitored','review','reviewing','reviewed','report','reporting','reported','perform','performing','performed','complete','completing','completed','assist','assisting','assisted','participate','participating','participated','contribute','contributing','contributed','utilize','utilizing','utilized','leverage','leveraging','leveraged','spearhead','spearheading','spearheaded',
  // Generic business words
  'fast','paced','dynamic','innovative','passionate','dedicated','motivated','proactive','detail','oriented','results','driven','self','starter','team','player','various','multiple','different','new','current','future','next','first','last','high','low','large','small','great','good','best','top','key','main','primary','secondary','additional','general','specific','overall','based','related','focused','driven','oriented','ready','able','willing','excited','looking','seeking','interested','opportunity','opportunities','responsibilities','responsibility','duties','tasks','projects','initiatives','goals','objectives','mission','vision','values','culture','environment','growth','success','impact','value','quality','excellence','innovation','collaboration','communication','leadership','management','development','strategy','process','system','solution','approach','method','framework','model','platform','product','service','customer','client','user','market','industry','business','company','organization','team','group','department','division','function',
  // Numbers and short words that slip through
  'iscore','match','missing','adding','chances','getting','interview','resume','learn','role','chance','rate','score'
]);

const extractKeywords = (text) => {
  if (!text) return [];
  const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','be','been','have','has','had','do','does','did','will','would','could','should','may','might','can','that','this','these','those','it','its','we','our','you','your','they','their','i','my','me','as','if','when','which','who','what','how','all','any','both','each','more','most','other','some','into','through','before','after','about','while','also','than','very','just','not','no','nor','so','yet','either','whether','must','shall','need',
  'description','looking','people','innovation','success','joining','secure','world','advance','ensure','ensures','connect','protect','customers','inventive','electrical','solutions','organization','opportunities','opportunity','program','programs','provide','provides','provided','during','within','across','between','without','around','global','local','national','international','company','companies','position','positions','candidate','candidates','applicant','applicants','employee','employees','employer','unique','talent','talents','impact','making','impactful','strides','today','bright','ambition','vision','sustainable','empower','welcome','cultivate','ideas','personal','professional','skills','formal','informal','training','leadership','variety','projects','experiences','learned','courses','others','involved','designing','manufacturing','optimizing','systems','plants','facilities','currently','recruiting','start','assignments','include','generating','conducting','studies','participating','manufacture','perform','research','development','activities','conduct','testing','troubleshooting','participate','improvement','beyond','daily','addition','support','manager','expect','exposure','engaging','networking','career','professionals','invited','special','events','volunteer','throughout','promote','inclusion','respect','embrace','diversity','network','peers','managers','senior','leaders','growth','competitive','hourly','relocation','housing','eligible','receive','toward','outstanding','performance','offered','subsequent','pursuing','bachelor','desire','least','sophomore','later','graduating','written','communication','ability','interface','multiple','functional','areas','leading','provider','believe','enable','safer','design','market','install','service','comprehensive','range','recognized','quality','reliability','principal','office','london','management','minneapolis','robust','portfolio','brands','dates','includes','encourage','philanthropic','worldwide','matching','nonprofit','educational','donate','values','culture','deliver','known','innovative','adaptable','dedicated','absolute','integrity','focused','customer','respectful','oriented','optimistic','energizing','accountable','health','wellbeing','broad','package','meaningful','dental','vision','plans','along','flexible','spending','accounts','short','term','long','disability','benefits','critical','illness','accident','insurance','retirement','purchase','match','supplemental','tuition','reimbursement','caregiver','parental','leave','backup','services','celebrate','authenticity','understand','uniqueness','sparks']);
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 5 && !stopWords.has(w)).filter((w, i, arr) => arr.indexOf(w) === i).slice(0, 40);
};

const FULL_RESUME_PROMPTS = {
  'Engineering/STEM': (resume) => `I am an engineering/STEM student. Review my entire resume for ATS optimization and effectiveness. Be honest and specific.

${resume}

Check:
1. ATS Compatibility: Any formatting issues?
2. Technical Skills: Specific enough? Most relevant listed first?
3. Experience/Project Bullets: Do they quantify results? Include specific tools? Use strong action verbs (Designed, Built, Implemented, Optimized)?
4. Weak phrases to flag: "responsible for", "helped with", "worked on", "assisted with"
5. AI words to flag: "leveraged", "utilized", "spearheaded", em dashes
6. Grammar and clarity: Typos, awkward phrasing, inconsistent formatting?
7. Overall: Is it 1 page? Are accomplishments highlighted over responsibilities?

Be specific about what to change and why. Keep my authentic experience.`,

  'Business': (resume) => `I am a business student. Review my entire resume for ATS optimization and effectiveness. Be honest and specific.

${resume}

Check:
1. ATS Compatibility: Any formatting issues?
2. Skills: Business and analytical skills prominent? Metrics-focused skills listed?
3. Experience Bullets: Do they quantify impact (%, $, ROI)? Use strong verbs (Led, Managed, Increased, Generated)?
4. Weak phrases to flag: "responsible for", "helped with", "assisted with"
5. AI words to flag: "leveraged", "utilized", "spearheaded", em dashes
6. Grammar and clarity: Typos, awkward phrasing, inconsistent formatting?
7. Overall: Results-driven? Accomplishments over responsibilities? Professional and concise?

Be specific about what to change and why. Keep my authentic experience.`,

  'Liberal Arts': (resume) => `I am a liberal arts student. Review my entire resume for ATS optimization and effectiveness. Be honest and specific.

${resume}

Check:
1. ATS Compatibility: Any formatting issues?
2. Skills: Communication and analytical skills highlighted? Relevant tools mentioned?
3. Experience Bullets: Do they show impact? Use strong verbs (Researched, Analyzed, Coordinated, Presented)?
4. Weak phrases to flag: "responsible for", "helped with", "participated in"
5. AI words to flag: "leveraged", "utilized", em dashes
6. Grammar and clarity: Typos, awkward phrasing, inconsistent formatting?
7. Overall: Accomplishments clear? Well-organized? Compelling?

Be specific about what to change and why. Keep my authentic experience.`
};

export const FullResumeAIReview = ({ resumeText, major }) => {
  const [copied, setCopied] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [showJobMatcher, setShowJobMatcher] = useState(false);
  const [showFlags, setShowFlags] = useState(false);

  const prompt = FULL_RESUME_PROMPTS[major] ? FULL_RESUME_PROMPTS[major](resumeText) : FULL_RESUME_PROMPTS['Engineering/STEM'](resumeText);

  const copyAndOpen = (provider) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      window.open(AI_PROVIDERS[provider].url, '_blank');
      setSelectedProvider(provider);
    });
  };

  const resumeFlags = checkResumeFlags(resumeText);
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobDescription);
  const matchedKeywords = jobKeywords.filter(k => resumeKeywords.includes(k));
  const missingKeywords = jobKeywords.filter(k => !resumeKeywords.includes(k)).slice(0, 12);

  if (!resumeText || resumeText.trim().length < 50) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
        <MessageCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
        <h3 className="font-bold text-lg text-gray-900 mb-2">Resume Too Short for AI Review</h3>
        <p className="text-gray-700">Fill out more sections above before getting AI feedback.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* AI Flag Check */}
      {resumeFlags.length > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-bold text-yellow-900">AI/Weak Phrase Check</p>
                <p className="text-sm text-yellow-800">{resumeFlags.length} issue{resumeFlags.length > 1 ? 's' : ''} detected in your resume</p>
              </div>
            </div>
            <button onClick={() => setShowFlags(!showFlags)} className="text-yellow-700 text-sm font-semibold flex items-center gap-1">
              {showFlags ? 'Hide' : 'Show'} {showFlags ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          {showFlags && (
            <div className="mt-3 space-y-1 border-t border-yellow-200 pt-3">
              {resumeFlags.map((flag, i) => (
                <div key={i} className="text-sm flex items-start gap-2">
                  <span className="text-red-500 font-bold flex-shrink-0">x</span>
                  <span><strong>"{flag.phrase.trim()}"</strong> — {flag.suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Job Description Matcher */}
      <div className="bg-white border-2 border-teal-200 rounded-xl p-5">
        <button onClick={() => setShowJobMatcher(!showJobMatcher)} className="w-full flex items-center justify-between">
          <div className="text-left">
            <p className="font-bold text-gray-900">Job Description Keyword Matcher</p>
            <p className="text-sm text-gray-500">Paste a job posting to see which keywords your resume hits and misses</p>
          </div>
          {showJobMatcher ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>

        {showJobMatcher && (
          <div className="mt-4 space-y-4">
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={5} className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-y min-h-[120px]" />

            {jobDescription.trim().length > 50 && (
              <div className="space-y-3">
                {matchedKeywords.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="font-bold text-green-800 text-sm mb-2">Keywords Your Resume Hits ({matchedKeywords.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {matchedKeywords.map((kw, i) => <span key={i} className="bg-green-200 text-green-900 text-xs px-2 py-1 rounded-full font-medium">{kw}</span>)}
                    </div>
                  </div>
                )}
                {missingKeywords.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="font-bold text-red-800 text-sm mb-2">Keywords Your Resume Misses — Consider Adding</p>
                    <div className="flex flex-wrap gap-2">
                      {missingKeywords.map((kw, i) => <span key={i} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">{kw}</span>)}
                    </div>
                    <p className="text-xs text-red-700 mt-2">Only add keywords that genuinely apply to your experience — never fabricate skills.</p>
                  </div>
                )}
                {matchedKeywords.length === 0 && missingKeywords.length === 0 && (
                  <p className="text-sm text-gray-500 text-center">Add more content to both fields for keyword analysis.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full AI Review */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-1 shadow-xl">
        <div className="bg-white rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-purple-500 text-white p-4 rounded-full">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get AI Feedback on Your Entire Resume</h2>
<p className="text-gray-700 text-sm">Comprehensive feedback on ATS optimization, grammar, clarity, and professional presentation</p>
            <p className="text-gray-600 text-sm mt-2">Get feedback on clarity, impact, and ATS-readability — without making it sound robotic.</p>
            <p className="text-xs text-gray-500 mt-1 italic">Tip: This won't replace your voice — it just tightens wording and highlights gaps.</p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-purple-900 mb-3 text-sm">What the AI will check:</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-800">
              <li>ATS compatibility (formatting issues)</li>
              <li>Grammar, spelling and punctuation</li>
              <li>Action verb strength</li>
              <li>Quantifiable results (numbers, %)</li>
              <li>Weak phrases ("responsible for", etc.)</li>
              <li>AI words to remove</li>
              <li>Skills emphasis for your field</li>
              <li>Overall structure and impact</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-center">Choose Your AI Tool:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
                <button key={key} onClick={() => copyAndOpen(key)}
                  className={`${provider.color} text-white px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-lg transition-transform hover:scale-105`}>
                  {provider.name} <ExternalLink className="w-5 h-5" />
                </button>
              ))}
            </div>

            {copied && (
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4 text-center">
                <Check className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="font-bold text-green-800">Prompt Copied! {AI_PROVIDERS[selectedProvider]?.name} opened in new tab</p>
                <p className="text-sm text-green-700 mt-1">Paste (Ctrl+V or Cmd+V) and press Enter</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-bold text-sm text-blue-900 mb-2">How it works:</p>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Click an AI tool above</li>
                <li>2. Your resume + feedback instructions copy automatically</li>
                <li>3. Paste and press Enter in the AI tool</li>
                <li>4. Get detailed, major-specific feedback in about 30 seconds</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <p className="text-sm text-yellow-900">
                <strong>Important:</strong> AI gives suggestions, but YOU decide what to change.
                Only use feedback that feels authentic to your actual experience.
                Do not let AI rewrite your resume — use it to polish what YOU wrote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
