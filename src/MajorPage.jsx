import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, TrendingUp, DollarSign, ExternalLink, BookOpen, FileText, Search } from 'lucide-react';

const CAREER_KEY_MAP = {
  'UX Researcher': 'ux-researcher',
  'HR Specialist': 'hr-specialist',
  'Market Research Analyst': 'market-research-analyst',
  'Training & Development': 'training-development',
  'Behavioral Health Technician': 'behavioral-health-technician',
  'Case Manager': 'case-manager',
  'Operations Analyst': 'operations-analyst',
  'Business Analyst': 'business-analyst',
  'Financial Analyst': 'financial-analyst',
  'Supply Chain Analyst': 'supply-chain-analyst',
  'Sales Development Representative': 'sales-development-rep',
  'Clinical Research Coordinator': 'clinical-research-coordinator',
  'Medical Writer': 'medical-writer',
  'Regulatory Affairs Specialist': 'regulatory-affairs',
  'Data Analyst (Healthcare)': 'healthcare-data-analyst',
  'Pharmaceutical Sales Rep': 'pharmaceutical-sales',
  'Lab Technician': 'lab-technician',
  'Data Analyst': 'data-analyst',
  'Product Manager': 'product-manager',
  'Technical Writer': 'technical-writer',
  'Software Engineer': 'software-engineer',
  'Cybersecurity Analyst': 'cybersecurity-analyst',
  'Corporate Communications Specialist': 'corporate-communications',
  'Public Relations Specialist': 'public-relations',
  'Social Media Manager': 'social-media-manager',
  'Content Marketing Specialist': 'content-marketing',
  'Digital Marketing Specialist': 'digital-marketing',
  'UX Writer': 'ux-writer',
  'Content Strategist': 'content-strategist',
  'Grant Writer': 'grant-writer',
  'Actuarial Analyst': 'actuary',
  'Operations Research Analyst': 'operations-research',
  'Data Scientist': 'data-scientist',
  'Quantitative Analyst': 'quantitative-analyst',
  'Sales Operations': 'sales-operations',
  'Customer Success Manager': 'customer-success',
  'Product Marketing': 'product-marketing',
  'Corporate Trainer': 'corporate-trainer',
  'Instructional Designer': 'instructional-designer',
  'Compliance Officer': 'compliance-officer',
  'Corporate Security Analyst': 'corporate-security',
  'Policy Analyst': 'policy-analyst',
  'Government Relations Specialist': 'government-relations',
};

const CAREER_PIVOTS = {
  'anthropology': {
    title: 'Anthropology',
    intro: 'Anthropology teaches you to understand human behavior, culture, and systems — skills that translate surprisingly well into tech, business, and social sectors.',
    careers: [
      { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior and culture is exactly what product teams need', salary: '$70k-95k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Study consumer behavior and cultural trends', salary: '$55k-80k' },
      { career: 'HR Specialist', growth: '10%', why: 'Your understanding of people and culture is valuable in every organization', salary: '$50k-70k' },
      { career: 'Grant Writer', growth: '8%', why: 'Nonprofits need people who understand communities and can build compelling cases', salary: '$50k-70k' },
    ],
    struggles: 'Many anthropology students feel their degree is "too broad" or worry employers won\'t understand it. The key is learning to translate your skills — research, analysis, understanding behavior — into language employers recognize.',
    honest: 'Anthropology is genuinely versatile but you\'ll need to do more work connecting your degree to specific roles. Double majoring or adding a minor in business, data, or communications significantly expands your options.',
  },
  'art': {
    title: 'Art / Fine Arts',
    intro: 'Design skills are in higher demand than ever — especially as tech companies compete to make their products beautiful and intuitive.',
    careers: [
      { career: 'UX Researcher', growth: '18%', why: 'Your design eye and understanding of aesthetics applies directly to product design', salary: '$70k-95k' },
      { career: 'Social Media Manager', growth: '10%', why: 'Visual content creation is your strength — every brand needs this', salary: '$50k-75k' },
      { career: 'Content Marketing Specialist', growth: '15%', why: 'Companies need people who can create compelling visual content', salary: '$50k-70k' },
      { career: 'Corporate Communications Specialist', growth: '8%', why: 'Design-minded communicators are rare and valuable', salary: '$55k-80k' },
    ],
    struggles: 'The biggest challenge is convincing employers that creative skills have business value. Build a strong portfolio and focus on results — not just aesthetics.',
    honest: 'Traditional fine arts careers are highly competitive and often low-paying early on. The strongest path for most art grads is toward design, UX, or content roles where your visual skills have direct business applications.',
  },
  'biology': {
    title: 'Biology',
    intro: 'A biology degree opens more doors than most students realize — especially if you\'re not going to med school. Life sciences employment hit a record 2.1 million in 2025.',
    careers: [
      { career: 'Clinical Research Coordinator', growth: '14%', why: 'Your science background without needing a PhD — runs clinical trials', salary: '$50k-70k' },
      { career: 'Pharmaceutical Sales Rep', growth: '6%', why: 'Biology knowledge + communication skills = very accessible path with good pay', salary: '$55k-75k + commission' },
      { career: 'Lab Technician', growth: '5%', why: 'Most accessible entry point — tons of openings in pharma, biotech, hospitals', salary: '$40k-55k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA processes for biotech/pharma — underrated and well-paid', salary: '$65k-90k' },
      { career: 'Medical Writer', growth: '9%', why: 'Write about science for non-scientific audiences', salary: '$55k-75k' },
      { career: 'Data Analyst (Healthcare)', growth: '23%', why: 'Health data is exploding — your science background helps you understand it', salary: '$60k-85k' },
    ],
    struggles: 'Many biology students feel stuck between "I didn\'t get into med/grad school" and "I don\'t know what else to do." There are strong career paths that don\'t require additional degrees.',
    honest: 'Entry-level biology salaries start lower than some fields (often $40-55k for lab roles) but grow significantly. Pharma sales and data roles pay the most at entry level without additional degrees.',
  },
  'business': {
    title: 'Business',
    intro: 'Business is one of the most flexible degrees — but "business" is too broad to be useful on its own. The students who succeed know which track they\'re on.',
    careers: [
      { career: 'Business Analyst', growth: '14%', why: 'Bridge between business needs and tech solutions — high demand everywhere', salary: '$65k-90k' },
      { career: 'Operations Analyst', growth: '16%', why: 'Make businesses run more efficiently — clear career path', salary: '$60k-80k' },
      { career: 'Financial Analyst', growth: '9%', why: 'Steady field with predictable career progression', salary: '$65k-85k' },
      { career: 'Supply Chain Analyst', growth: '18%', why: 'Growing field, especially post-pandemic disruptions', salary: '$60k-85k' },
      { career: 'Sales Development Representative', growth: '15%', why: 'Most accessible entry point — fastest path to $80k+ with commission', salary: '$45k-65k + commission' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Help clients succeed — relationship-focused, growing rapidly', salary: '$55k-80k' },
    ],
    struggles: 'Business majors often feel lost because the degree is so broad. The students who get hired fastest know their specific track — finance, operations, marketing, sales — before they graduate.',
    honest: 'Average starting salary for business grads in 2025 is $65k per NACE data. MIS and finance tracks pay the most. Sales roles pay less base but can hit $80k+ quickly with commission. Pick a track.',
  },
  'chemistry': {
    title: 'Chemistry',
    intro: 'Chemistry is one of the most practical science degrees — your lab skills and analytical thinking apply directly to pharma, food, manufacturing, and environmental sectors.',
    careers: [
      { career: 'Lab Technician', growth: '5%', why: 'Your lab skills apply directly across pharma, food, and manufacturing', salary: '$45k-60k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA/EPA compliance — chemistry knowledge essential', salary: '$65k-90k' },
      { career: 'Pharmaceutical Sales Rep', growth: '6%', why: 'Your chemistry background gives you credibility with medical professionals', salary: '$55k-75k + commission' },
      { career: 'Quality Control Analyst', growth: '9%', why: 'Every pharma, food, and manufacturing company needs QC', salary: '$50k-70k' },
    ],
    struggles: 'Many chemistry grads feel pressure to go to grad school. You don\'t have to. Regulatory affairs and pharma sales are strong paths that value your degree without requiring more school.',
    honest: 'Chemistry entry-level roles often start lower than other STEM fields but grow well. Regulatory affairs is the highest-paying non-grad-school path for most chemistry majors.',
  },
  'communications': {
    title: 'Communications',
    intro: 'Communications is broader than most people realize — it\'s not just PR. Every company needs people who can communicate clearly, manage messaging, and connect with audiences.',
    careers: [
      { career: 'Social Media Manager', growth: '10%', why: 'Your understanding of messaging and audience applies directly', salary: '$50k-75k' },
      { career: 'Corporate Communications Specialist', growth: '8%', why: 'Every company needs internal and external communication strategy', salary: '$55k-80k' },
      { career: 'Content Marketing Specialist', growth: '15%', why: 'High demand — companies need people who can create compelling content', salary: '$50k-70k' },
      { career: 'Digital Marketing Specialist', growth: '17%', why: 'Data-driven marketing — less saturated than traditional comms roles', salary: '$45k-65k' },
      { career: 'Public Relations Specialist', growth: '8%', why: 'Manage company reputation and media relations', salary: '$45k-65k' },
    ],
    struggles: 'Traditional PR and journalism have been disrupted by digital media. The communications grads who thrive today have digital skills — SEO, analytics, content strategy — not just writing.',
    honest: 'Starting salaries in communications are often lower than other fields ($40-55k). The path to higher pay is specializing in digital marketing, content strategy, or corporate communications rather than staying generalist.',
  },
  'computer-science': {
    title: 'Computer Science',
    intro: 'CS has the opposite problem of most majors — too many options. The job market tightened in 2024-2025 after pandemic hiring surges, but demand remains strong for the right roles.',
    careers: [
      { career: 'Software Engineer', growth: '22%', why: 'Core CS path — still strong demand despite recent tech layoffs', salary: '$85k-120k' },
      { career: 'Data Analyst', growth: '23%', why: 'Uses your logic and problem-solving — less coding-intensive than SWE', salary: '$65k-85k' },
      { career: 'Cybersecurity Analyst', growth: '32%', why: 'Massive shortage of workers — one of the fastest growing fields', salary: '$70k-95k' },
      { career: 'Product Manager', growth: '19%', why: 'Technical background helps you understand what engineers are building', salary: '$80k-120k' },
      { career: 'Technical Writer', growth: '7%', why: 'Explain complex tech — your CS knowledge is a major differentiator', salary: '$60k-80k' },
    ],
    struggles: 'CS students often feel overwhelmed by options or paralyzed by the gap between school projects and industry expectations. Side projects and internships matter more for CS than any other major.',
    honest: 'The CS job market is more competitive than it was in 2021-2022. Entry-level roles at big tech are harder to get. Smaller companies, startups, and non-tech companies that need tech talent are often better entry points.',
  },
  'criminal-justice': {
    title: 'Criminal Justice',
    intro: 'Criminal justice teaches you how systems work, how to analyze risk, and how to follow complex regulations — skills that translate directly into corporate compliance and security roles.',
    careers: [
      { career: 'Compliance Officer', growth: '8%', why: 'Ensure companies follow laws and regulations — underrated and well-paid', salary: '$60k-85k' },
      { career: 'Corporate Security Analyst', growth: '9%', why: 'Risk assessment and security planning for businesses', salary: '$55k-80k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Your understanding of law and policy applies beyond government', salary: '$55k-80k' },
      { career: 'HR Specialist', growth: '10%', why: 'Your understanding of rules, compliance, and people management fits HR well', salary: '$50k-70k' },
    ],
    struggles: 'Many CJ grads feel limited to law enforcement or legal careers. Corporate compliance is a significantly underutilized path that pays well and has strong demand.',
    honest: 'Law enforcement and legal careers are the obvious paths but often the most competitive and lowest-paying at entry level. Corporate compliance and security roles offer better starting pay for most graduates.',
  },
  'education': {
    title: 'Education',
    intro: 'Teaching skills are valuable far beyond the classroom. Companies spend billions on training their employees — and they need people who actually know how to teach.',
    careers: [
      { career: 'Corporate Trainer', growth: '11%', why: 'Companies need people who can teach — often pays better than K-12', salary: '$55k-85k' },
      { career: 'Instructional Designer', growth: '9%', why: 'Create online courses and training programs — growing with remote work', salary: '$60k-90k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Helping customers succeed is just teaching in a business context', salary: '$55k-80k' },
      { career: 'HR Specialist', growth: '10%', why: 'Training and development is a core HR function', salary: '$50k-70k' },
    ],
    struggles: 'Education majors often feel stuck between teaching (lower pay) and "I don\'t know what else to do." Corporate training and instructional design pay significantly more and use the same core skills.',
    honest: 'K-12 teaching salaries have improved but remain below other fields requiring similar education. Corporate training and L&D roles typically pay $15-25k more for similar work. Worth seriously considering.',
  },
  'english': {
    title: 'English / Journalism',
    intro: 'Strong writers are rare. In a world where everyone is producing content, the ability to write clearly and compellingly is genuinely valuable — especially in tech.',
    careers: [
      { career: 'UX Writer', growth: '23%', why: 'Make apps and websites easier to understand — storytelling for digital products', salary: '$75k-100k' },
      { career: 'Content Strategist', growth: '15%', why: 'Plan and manage content across organizations — strategic role', salary: '$65k-90k' },
      { career: 'Technical Writer', growth: '7%', why: 'Your writing skills are desperately needed in tech companies', salary: '$60k-80k' },
      { career: 'Grant Writer', growth: '8%', why: 'Nonprofits need great writers — less competitive field', salary: '$50k-70k' },
    ],
    struggles: 'Traditional journalism has contracted dramatically. The English grads who are thriving have moved toward content strategy, UX writing, and technical writing — not traditional media.',
    honest: 'Journalism as a career path has very limited openings and often low pay. UX writing and content strategy pay significantly more and have much stronger job growth. Be honest with yourself about which path makes sense.',
  },
  'foreign-languages': {
    title: 'Foreign Languages',
    intro: 'Global companies need people who can navigate different cultures and languages — and there are more opportunities than you might think beyond translation.',
    careers: [
      { career: 'Corporate Communications Specialist', growth: '8%', why: 'Multilingual communication skills are increasingly valued', salary: '$55k-80k' },
      { career: 'Content Marketing Specialist', growth: '15%', why: 'Companies need content created for global markets', salary: '$50k-70k' },
      { career: 'HR Specialist', growth: '10%', why: 'Multilingual HR professionals are in demand at global companies', salary: '$50k-70k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Serving international clients requires exactly your skills', salary: '$55k-80k' },
    ],
    struggles: 'Foreign language majors often feel limited to teaching or translation. The most valuable application of language skills is in global business roles where language is one skill among several.',
    honest: 'Language skills alone rarely command premium salaries. The strongest path is combining language skills with another area — business, tech, marketing — where bilingual ability is a differentiator.',
  },
  'history': {
    title: 'History',
    intro: 'History teaches you to analyze complex information, construct arguments, and write clearly — skills that are genuinely transferable, but you have to learn to translate them.',
    careers: [
      { career: 'Content Strategist', growth: '15%', why: 'Research, analysis, and storytelling — your core skills applied to business', salary: '$60k-85k' },
      { career: 'Compliance Officer', growth: '8%', why: 'Understanding regulations, documentation, and institutional history fits compliance', salary: '$60k-85k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Historical context and research skills are directly applicable', salary: '$55k-80k' },
      { career: 'Grant Writer', growth: '8%', why: 'Research and persuasive writing — nonprofits need this combination', salary: '$50k-70k' },
    ],
    struggles: 'History majors face the hardest translation challenge of any humanities degree. You need to proactively connect your research and writing skills to specific business problems.',
    honest: 'History has one of the harder job markets outside of law school or academia. Starting salaries are often lower. Consider adding a minor in business, data, or a technical skill to significantly improve your options.',
  },
  'marketing': {
    title: 'Marketing',
    intro: 'Marketing has evolved dramatically — today the strongest marketing roles are data-driven and require analytical skills alongside creativity.',
    careers: [
      { career: 'Digital Marketing Specialist', growth: '17%', why: 'Data-driven marketing — the fastest growing part of the field', salary: '$45k-65k' },
      { career: 'Content Marketing Specialist', growth: '15%', why: 'Creating and managing content strategy across channels', salary: '$50k-70k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Help clients succeed — relationship-focused and growing rapidly', salary: '$55k-80k' },
      { career: 'Sales Operations', growth: '23%', why: 'Your communication skills plus analytics — one of the fastest growing roles', salary: '$60k-85k' },
      { career: 'Product Marketing', growth: '16%', why: 'Bridge between product teams and customers — strategic and well-paid', salary: '$70k-95k' },
    ],
    struggles: 'Traditional marketing roles are increasingly being replaced by data-driven alternatives. Marketing grads who don\'t develop analytical skills are at a significant disadvantage.',
    honest: 'Entry-level marketing roles often pay $40-50k, which feels low for a business degree. Product marketing and sales operations pay much more. Learning Google Analytics, SEO, and basic data skills dramatically improves your starting salary.',
  },
  'mathematics': {
    title: 'Mathematics',
    intro: 'Math is one of the strongest degrees for the current job market. Analytical and quantitative skills are in high demand across finance, tech, insurance, and consulting.',
    careers: [
      { career: 'Data Analyst', growth: '23%', why: 'Your analytical and statistical skills are in extremely high demand', salary: '$65k-90k' },
      { career: 'Actuarial Analyst', growth: '21%', why: 'Math background is perfect for risk assessment — well-paid with clear exams path', salary: '$70k-100k' },
      { career: 'Financial Analyst', growth: '9%', why: 'Modeling and forecasting — your quantitative skills shine', salary: '$65k-95k' },
      { career: 'Operations Research Analyst', growth: '23%', why: 'Optimize business processes using mathematical models', salary: '$70k-100k' },
      { career: 'Data Scientist', growth: '35%', why: 'Fastest growing field — math background is ideal foundation', salary: '$85k-120k' },
    ],
    struggles: 'Math majors sometimes undersell themselves because they think employers only want CS degrees. Data analyst and data science roles actively seek strong math backgrounds.',
    honest: 'Math is genuinely one of the best degrees for salary potential right now. Actuarial science requires passing exams but has very strong job security. Data science and analytics are the highest-growth paths.',
  },
  'music': {
    title: 'Music / Theater',
    intro: 'Performance skills, discipline, collaboration under pressure, and creative problem-solving — these translate into real business value in the right roles.',
    careers: [
      { career: 'Corporate Trainer', growth: '11%', why: 'Teaching and performing skills make you exceptional at presentations and training', salary: '$55k-80k' },
      { career: 'Instructional Designer', growth: '9%', why: 'Creating engaging learning experiences requires exactly your performance instincts', salary: '$60k-90k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Your comfort performing and connecting with people translates to client work', salary: '$55k-80k' },
      { career: 'Content Marketing Specialist', growth: '15%', why: 'Audio and video content creation is a major growth area', salary: '$50k-70k' },
    ],
    struggles: 'Performance careers are extremely competitive and often low-paying. Most music and theater grads need a parallel career path to achieve financial stability.',
    honest: 'This is one of the harder degrees for immediate career translation. The graduates who do best typically either pursue performance seriously (accepting financial instability) or actively pivot to a business role using their performance skills.',
  },
  'philosophy': {
    title: 'Philosophy',
    intro: 'Philosophy trains you to think clearly, argue rigorously, and understand how systems work — surprisingly valuable in business, law, and tech.',
    careers: [
      { career: 'Business Analyst', growth: '14%', why: 'Your logic and critical thinking skills are exactly what companies need', salary: '$70k-95k' },
      { career: 'UX Researcher', growth: '18%', why: 'Understanding how people think and make decisions — philosophy applied to products', salary: '$75k-105k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Ethical reasoning and systematic analysis fit government and think tanks', salary: '$60k-90k' },
      { career: 'Compliance Officer', growth: '8%', why: 'Understanding rule systems and ethical frameworks fits compliance perfectly', salary: '$65k-90k' },
    ],
    struggles: 'Philosophy majors face the same translation challenge as other humanities — you need to proactively connect abstract thinking skills to specific business outcomes.',
    honest: 'Philosophy actually has stronger outcomes than its reputation suggests — especially for law school and consulting. Business analyst and UX researcher roles are the strongest direct career paths.',
  },
  'physics': {
    title: 'Physics',
    intro: 'Physics is one of the most versatile STEM degrees. Your problem-solving and mathematical skills are in high demand in finance, tech, and data science.',
    careers: [
      { career: 'Data Scientist', growth: '35%', why: 'Physics problem-solving and math skills are ideal for data science', salary: '$85k-120k' },
      { career: 'Software Engineer', growth: '22%', why: 'Strong analytical problem-solving transfers directly to coding', salary: '$80k-130k' },
      { career: 'Quantitative Analyst', growth: '11%', why: 'Finance firms actively recruit physics grads for modeling roles', salary: '$90k-150k' },
      { career: 'Cybersecurity Analyst', growth: '32%', why: 'Analytical and systems thinking is essential for security work', salary: '$70k-100k' },
    ],
    struggles: 'Physics grads sometimes feel they need a graduate degree to do anything meaningful. You don\'t. Data science and software engineering actively recruit strong physics bachelor graduates.',
    honest: 'Physics is genuinely one of the strongest degrees for salary potential. Data science and quant finance are the highest-paying paths. The main challenge is learning to code if you haven\'t already.',
  },
  'political-science': {
    title: 'Political Science',
    intro: 'Political science teaches you how institutions work, how to analyze policy, and how to communicate persuasively — more applicable to business than most people realize.',
    careers: [
      { career: 'Policy Analyst', growth: '6%', why: 'Work for government, nonprofits, or think tanks analyzing policy impact', salary: '$60k-90k' },
      { career: 'Government Relations Specialist', growth: '7%', why: 'Help companies navigate regulation and policy — well-paid corporate role', salary: '$70k-110k' },
      { career: 'Compliance Officer', growth: '8%', why: 'Your understanding of regulations and institutions fits compliance perfectly', salary: '$65k-90k' },
      { career: 'Corporate Communications Specialist', growth: '8%', why: 'Political comms skills translate directly to corporate messaging', salary: '$55k-80k' },
    ],
    struggles: 'Many polisci grads default to law school or government without considering corporate paths. Government relations and compliance are well-paying corporate roles that directly use your degree.',
    honest: 'Law school is the traditional path but expensive and competitive. Government relations and compliance offer strong salaries without additional degrees. Worth seriously considering before assuming law school is required.',
  },
  'psychology': {
    title: 'Psychology',
    intro: 'Psychology teaches you to understand human behavior — one of the most valuable skills in the modern workplace. You don\'t need a graduate degree to use it.',
    careers: [
      { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior is exactly what tech product teams need', salary: '$70k-95k' },
      { career: 'HR Specialist', growth: '10%', why: 'Your understanding of people is valuable in every organization', salary: '$50k-70k' },
      { career: 'Case Manager', growth: '12%', why: 'High demand in healthcare and social services — directly uses your degree', salary: '$40k-55k' },
      { career: 'Behavioral Health Technician', growth: '15%', why: 'Tons of openings, directly accessible with a bachelor\'s degree', salary: '$35k-50k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Study consumer behavior and trends — psychology applied to business', salary: '$55k-75k' },
      { career: 'Training & Development', growth: '11%', why: 'Help employees learn and grow — your understanding of behavior is central', salary: '$55k-80k' },
    ],
    struggles: 'Most psychology students feel pressure to go to grad school. Many good careers don\'t require it. UX research and market research are the highest-paying non-grad-school paths.',
    honest: 'Clinical work requires graduate degrees but many other strong careers don\'t. UX researcher roles pay significantly more than clinical positions at bachelor\'s level. Be intentional about which path you\'re choosing.',
  },
  'sociology': {
    title: 'Sociology',
    intro: 'Sociology teaches you to understand how groups and systems work — directly applicable to HR, organizational behavior, market research, and community-focused roles.',
    careers: [
      { career: 'HR Specialist', growth: '10%', why: 'Understanding group dynamics and organizational behavior is core to HR', salary: '$50k-75k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Study social trends and consumer behavior patterns', salary: '$55k-80k' },
      { career: 'Case Manager', growth: '12%', why: 'High demand in social services — directly uses your degree', salary: '$40k-55k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Your understanding of social systems applies directly to policy work', salary: '$55k-80k' },
    ],
    struggles: 'Sociology shares the translation challenge of other social sciences. Learning to connect your understanding of social systems to specific business or organizational problems is key.',
    honest: 'Sociology has similar outcomes to psychology at bachelor\'s level. HR and market research are the strongest direct paths. Adding data skills significantly improves starting salary.',
  },
};

const formatJobCount = (count) => {
  if (!count) return null;
  if (count >= 100000) return `${(count / 1000).toFixed(0)}k+`;
  if (count >= 10000) return `${(count / 1000).toFixed(0)}k+`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toLocaleString();
};

const MajorPage = ({ setCurrentPage }) => {
  const { majorSlug } = useParams();
  const navigate = useNavigate();
  const [jobCounts, setJobCounts] = useState(null);
  const [jobsUpdated, setJobsUpdated] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const majorData = CAREER_PIVOTS[majorSlug];

  useEffect(() => {
    const fetchJobCounts = async () => {
      try {
        const response = await fetch('https://adzuna-jobs-updater.msroper2.workers.dev/data');
        const data = await response.json();
        if (data.counts) {
          setJobCounts(data.counts);
          setJobsUpdated(data.updated);
        }
      } catch (e) {
        // silently fail - job counts are optional
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobCounts();
  }, []);

  if (!majorData) {
    return (
      <div className="bg-[#FFFBF7] min-h-screen">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Major not found</h1>
          <button onClick={() => navigate('/pivot')} className="text-teal-600 font-semibold">
            ← Browse all career paths
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>What Can I Do With a {majorData.title} Degree? | MoreThanOneWay.org</title>
        <meta name="description" content={`Real career paths for ${majorData.title} majors — with salary data, job growth rates, and live job counts. No grad school required for most.`} />
        <meta name="keywords" content={`${majorData.title} degree jobs, what to do with ${majorData.title} degree, ${majorData.title} major careers, ${majorData.title} degree career paths`} />
        <meta property="og:title" content={`What Can I Do With a ${majorData.title} Degree? | MoreThanOneWay.org`} />
        <link rel="canonical" href={`https://morethanoneway.org/major/${majorSlug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": `Career Paths for ${majorData.title} Majors`,
          "description": `Real career paths, salary data, and job counts for ${majorData.title} degree graduates.`,
          "url": `https://morethanoneway.org/major/${majorSlug}`
        })}</script>
      </Helmet>

      <div className="bg-[#FFFBF7] min-h-screen">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">

          <button onClick={() => setCurrentPage('pivot')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Career Paths
          </button>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
              What Can I Do With a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-orange-400">
                {majorData.title} Degree?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
              {majorData.intro}
            </p>
          </div>

          {/* Job counts updated badge */}
          {jobsUpdated && (
            <div className="mb-6 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-sm text-green-800">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Job counts updated {jobsUpdated === new Date().toISOString().split('T')[0] ? 'today' : `on ${jobsUpdated}`}
            </div>
          )}

          {/* Career Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {majorData.careers.map((career, idx) => {
              const jobKey = CAREER_KEY_MAP[career.career];
              const jobCount = jobKey && jobCounts ? jobCounts[jobKey] : null;
              const formattedCount = formatJobCount(jobCount);

              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{career.career}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 flex-shrink-0">
                      +{career.growth}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{career.why}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <DollarSign className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span className="font-semibold">{career.salary}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{career.growth} projected growth</span>
                    </div>

                    {formattedCount && (
                      <div className="flex items-start gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-orange-700">{formattedCount} open jobs today</span>
                          <span className="text-gray-500 text-xs block">includes all experience levels • via Adzuna</span>
                        </div>
                      </div>
                    )}

                    {loadingJobs && !jobCounts && (
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Briefcase className="w-3 h-3" />
                        <span>Loading job counts...</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Honest talk section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Common Struggles for {majorData.title} Majors</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{majorData.struggles}</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Honest Reality Check</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{majorData.honest}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <h3 className="font-bold text-xl text-gray-900 mb-5">Your Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => setCurrentPage('find-internships')}
                className="flex items-center gap-3 bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-700 transition-all text-left">
                <Search className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Find Internships</p>
                  <p className="text-xs text-gray-300">Search by your major</p>
                </div>
              </button>
              <button onClick={() => setCurrentPage('resume-builder')}
                className="flex items-center gap-3 bg-teal-600 text-white p-4 rounded-xl hover:bg-teal-700 transition-all text-left">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Build Your Resume</p>
                  <p className="text-xs text-teal-100">Free, ATS-friendly</p>
                </div>
              </button>
              <button onClick={() => setCurrentPage('cover-letter')}
                className="flex items-center gap-3 bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition-all text-left">
                <BookOpen className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Cover Letter Generator</p>
                  <p className="text-xs text-purple-100">Free, no sign-up</p>
                </div>
              </button>
            </div>
          </div>

          {/* All majors link */}
          <div className="text-center">
            <button onClick={() => setCurrentPage('pivot')}
              className="text-teal-600 font-semibold hover:text-teal-800 flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" /> Browse all majors
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default MajorPage;
