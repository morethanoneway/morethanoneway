import React, { useState, useEffect } from 'react';
import { Phone, Copy, Check, ChevronDown, ChevronUp, AlertCircle, Lightbulb, X, Plus, Trash2, FileText, HelpCircle, TrendingUp, Search, Heart, Menu } from 'lucide-react';

import { BulletAIHelper } from './BulletAIHelper';
import { FullResumeAIReview } from './FullResumeAIReview';
import { InstantBulletChecker } from './InstantBulletChecker';
import {ShareButtons} from './ShareButtons';

// Inspirational messages
const INSPIRATIONAL_MESSAGES = [
  {
    title: "You Have More Experience Than You Think",
    content: "Class projects ARE real projects. Part-time jobs taught valuable skills. We'll help you translate it into professional language."
  },
  {
    title: "Every Job Taught You Something",
    content: "That food service job? You learned customer service, multitasking under pressure, and teamwork. That's valuable to employers."
  },
  {
    title: "Non-Linear Paths Are Normal",
    content: "Most successful people didn't take a straight line to their career. Your diverse experience makes you adaptable and interesting."
  },
  {
    title: "Employers Value Problem Solvers",
    content: "Whether you debugged code or figured out how to handle a difficult customer, you've proven you can solve problems."
  },
  {
    title: "Your Story Matters",
    content: "You're not just a GPA and a major. You're a person who's learned, grown, and overcome challenges. Let that shine through."
  },
  {
    title: "It's Okay to Pivot",
    content: "You define you. Explore, learn, adjust."
  }
];

const EncouragementBox = () => {
  const [message] = useState(() => {
    const randomIndex = Math.floor(Math.random() * INSPIRATIONAL_MESSAGES.length);
    return INSPIRATIONAL_MESSAGES[randomIndex];
  });

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 mb-8">
      <div className="flex items-start gap-3">
        <div className="text-4xl">✨</div>
        <div>
          <h3 className="text-2xl font-bold mb-2">{message.title}</h3>
          <p className="text-lg">{message.content}</p>
        </div>
      </div>
    </div>
  );
};



// Context priorities by major


const MAJOR_CONFIG = {
  'Engineering/STEM': {
    skills: {
      categories: ['Technical Skills', 'Software', 'Mechanical Tools', 'Soft Skills'],
      placeholders: {
        'Technical Skills': 'Process validation, data analysis, mechanical design...',
        'Software': 'SolidWorks, MATLAB, Python, Excel...',
        'Mechanical Tools': 'Machining, 3D printing, calipers... (remove if not applicable)',
        'Soft Skills': 'Problem solving, communication, collaboration...'
      }
    },
    projectLabel: 'Technologies/Tools Used',
    projectPlaceholder: 'Python, SolidWorks, MATLAB, Arduino...',
    fontPreference: 'Engineering/STEM fields typically prefer sans-serif fonts (Arial, Calibri) for a clean, technical look.',
    experiencePlaceholders: {
      title: 'Engineering Intern, Lab Assistant, Research Assistant...',
      company: 'Company, Lab, Research Group...',
      bullet: '• Conducted experiments analyzing 100+ samples using spectroscopy equipment...'
    },
    projectPlaceholders: {
      name: 'Automated Sorting System, Data Analysis Tool, Arduino Robot...',
      description: '• Designed and implemented system using Arduino and sensors, reducing sorting time by 30%...'
    },
    activityPlaceholders: {
      role: 'President, Project Lead, Competition Team Member...',
      organization: 'Engineering Honor Society, Robotics Club, ASME...',
      bullet: '• Led team of 8 members in designing competition robot, placing 2nd regionally...'
    },
    exampleBullets: {
      experience: 'Performed testing and analysis on 100+ samples using spectroscopy equipment, documenting results in detailed lab reports',
      project: 'Developed automated sorting system using Arduino and sensors, reducing manual sorting time by 30% and improving accuracy to 95%',
      activity: 'Led engineering competition team of 8 members, designing and building robot that placed 2nd in regional competition'
    },
    alternativePaths: [
      { title: 'Data Analyst', emphasize: 'Excel, Python, data analysis, problem-solving' },
      { title: 'Technical Product Manager', emphasize: 'Project coordination, technical communication, cross-team collaboration' },
      { title: 'Business Analyst', emphasize: 'Process optimization, data interpretation, stakeholder communication' },
      { title: 'Quality Engineer', emphasize: 'Testing, validation, documentation, process improvement' }
    ]
  },
  'Business': {
    skills: {
      categories: ['Business & Analytical', 'Communication & Collaboration', 'Technical', 'Leadership & Management'],
      placeholders: {
        'Business & Analytical': 'Data interpretation, problem solving, financial analysis...',
        'Communication & Collaboration': 'Public speaking, client relations, teamwork...',
        'Technical': 'Excel, Power BI, Salesforce, Tableau...',
        'Leadership & Management': 'Team coordination, decision making, project planning...'
      }
    },
    projectLabel: 'Tools/Methods Used',
    projectPlaceholder: 'Excel, Market research, Salesforce, PowerPoint...',
    fontPreference: 'Business fields work well with either sans-serif (Calibri) or serif (Times New Roman) for a professional appearance.',
    experiencePlaceholders: {
      title: 'Sales Associate, Marketing Intern, Business Analyst Intern...',
      company: 'Retail Store, Company, Startup...',
      bullet: '• Assisted customers resulting in 20% increase in monthly sales...'
    },
    projectPlaceholders: {
      name: 'Market Analysis, Business Plan, Sales Dashboard...',
      description: '• Analyzed market data using Excel and Tableau, identifying growth opportunities worth $50K...'
    },
    activityPlaceholders: {
      role: 'Vice President, Fundraising Chair, Event Coordinator...',
      organization: 'Business Fraternity, Entrepreneurship Club, Student Government...',
      bullet: '• Organized networking event with 100+ attendees and 15 corporate sponsors...'
    },
    exampleBullets: {
      experience: 'Assisted customers with product selection resulting in 20% increase in monthly sales and 95% satisfaction rating',
      project: 'Conducted market research analyzing 500+ customer surveys, identifying 3 new market segments representing $50K opportunity',
      activity: 'Coordinated fundraising campaign raising $5,000 for nonprofit, exceeding goal by 25% through corporate sponsorships'
    },
    alternativePaths: [
      { title: 'Sales Operations', emphasize: 'CRM tools, data analysis, process optimization, communication' },
      { title: 'Customer Success Manager', emphasize: 'Client relationships, problem-solving, communication, retention metrics' },
      { title: 'Data Analyst', emphasize: 'Excel, data visualization, analytical thinking, reporting' },
      { title: 'Operations Analyst', emphasize: 'Process improvement, efficiency metrics, cross-functional collaboration' }
    ]
  },
  'Liberal Arts': {
    skills: {
      categories: ['Communication & Writing', 'Research & Analysis', 'Technology', 'Leadership & Collaboration'],
      placeholders: {
        'Communication & Writing': 'Academic writing, public speaking, editing...',
        'Research & Analysis': 'Qualitative research, critical evaluation, source synthesis...',
        'Technology': 'Google Workspace, Canva, Microsoft Office, Adobe...',
        'Leadership & Collaboration': 'Event planning, peer mentorship, team coordination...'
      }
    },
    projectLabel: 'Methods/Tools Used',
    projectPlaceholder: 'Research methods, Adobe Suite, Content creation...',
    fontPreference: 'Liberal Arts fields offer more flexibility, but stick to ATS-safe fonts like Arial, Calibri, or Times New Roman.',
    experiencePlaceholders: {
      title: 'Writing Tutor, Research Assistant, Content Creator...',
      company: 'Writing Center, Research Lab, Organization...',
      bullet: '• Tutored 15 students in academic writing, improving average grades by one letter...'
    },
    projectPlaceholders: {
      name: 'Research Paper, Documentary, Content Strategy...',
      description: '• Conducted qualitative research interviewing 20+ participants, presenting findings at symposium...'
    },
    activityPlaceholders: {
      role: 'Editor, Volunteer Coordinator, Peer Mentor...',
      organization: 'Student Newspaper, Community Service Org, Honors Program...',
      bullet: '• Edited 50+ articles for student publication, mentoring 10 new writers...'
    },
    exampleBullets: {
      experience: 'Tutored 15 students in academic writing improving average paper grades by one letter through personalized feedback',
      project: 'Conducted qualitative research interviewing 25 participants, analyzing data using thematic analysis and presenting findings at undergraduate symposium',
      activity: 'Edited 50+ articles for student newspaper with 5,000+ readership, mentoring 10 new writers in AP style'
    },
    alternativePaths: [
      { title: 'UX Researcher', emphasize: 'Research skills, user interviews, data analysis, presentation skills' },
      { title: 'Technical Writer', emphasize: 'Clear communication, documentation, explaining complex topics, editing' },
      { title: 'Content Strategist', emphasize: 'Writing, project management, analytics, creative thinking' },
      { title: 'Market Research Analyst', emphasize: 'Research methods, data interpretation, reporting, critical thinking' }
    ]
  }
};

const CrisisBanner = () => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
    <div className="flex items-start">
      <Phone className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
      <div>
        <h3 className="font-bold text-red-800">Need to talk to someone right now?</h3>
        <p className="text-red-700 mt-1 text-sm"><strong>988:</strong> Call or text 988 | <strong>Crisis Text Line:</strong> Text HOME to 741741</p>
      </div>
    </div>
  </div>
);



const KeywordGuide = ({ major }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const keywords = {
    'Jobs/Work': ['barista', 'server', 'waiter', 'waitress', 'cashier', 'retail', 'receptionist', 'tutor', 'lifeguard', 'sales associate', 'customer service', 'delivery driver', 'warehouse', 'teaching assistant', 'lab assistant'],
    'Academic/Research': ['lab', 'laboratory', 'research', 'group project', 'class project', 'presentation', 'thesis', 'capstone', 'internship', 'coding', 'programming', 'data', 'excel', 'analysis', 'experiment'],
    'Leadership/Activities': ['president', 'vice president', 'treasurer', 'organized', 'club', 'volunteer', 'fundraiser', 'mentor', 'event', 'recruited', 'managed', 'coordinated', 'led', 'team'],
    'Technical': ['python', 'excel', 'coding', 'data', 'solidworks', 'matlab', 'cad', 'microsoft office', 'google workspace', 'canva', 'photoshop', 'tableau', 'sql', 'crm', 'salesforce']
  };
  
  return (
    <div className="bg-gray-100 border border-gray-300 rounded p-3 mt-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-700"
      >
        <span className="flex items-center gap-1">
          <HelpCircle className="w-4 h-4" />
          See All Available Keywords
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isOpen && (
        <div className="mt-3 space-y-2 text-xs">
          {Object.entries(keywords).map(([category, words]) => (
            <div key={category}>
              <p className="font-bold text-gray-800">{category}:</p>
              <p className="text-gray-600">{words.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const examples = {
  'Engineering/STEM': {
    'Mechanical Engineering': {
      traditional: `ALEX MORGAN
alex.morgan@statetech.edu | Chicago, IL | (555) 123-4567

EDUCATION
State Technical University — BS in Mechanical Engineering | GPA: 3.87 | Expected May 2027

SKILLS
Technical: Process validation, equipment inspection, GMP documentation, mechanical design and analysis, data tracking and cost estimation, 5S methodology
Software: SolidWorks; MATLAB; Autodesk Inventor; Microsoft Excel, Word, PowerPoint
Mechanical Tools: Machining, laser cutting, 3D printing, precision measurement tools

WORK EXPERIENCE
Production Engineer Co-op, Advanced Manufacturing Corp | Jan 2025 - Present
- Conducted inspections of process equipment to ensure safety and operational compliance
- Performed validation testing on mechanical components and systems
- Implemented process improvement methodology in production areas
- Reviewed technical documentation ensuring regulatory compliance
- Managed equipment tracking program for 200+ components

Tutor, Academic Success Center | Sept 2024 - Present
- Provided academic support in Calculus, Differential Equations, and Statics
- Facilitated one-on-one tutoring sessions adapting to learning styles`,
      
      qualityEngineer: `ALEX MORGAN
alex.morgan@statetech.edu | Chicago, IL | (555) 123-4567

EDUCATION
State Technical University — BS in Mechanical Engineering | GPA: 3.87 | Expected May 2027

SKILLS
Technical: Quality assurance and validation, GMP documentation and compliance, equipment inspection, process improvement and 5S
Software: Microsoft Excel, Word, PowerPoint; SolidWorks; MATLAB
Quality Tools: Precision measurement tools, inspection equipment, validation protocols, regulatory documentation
Soft Skills: Meticulous attention to detail, compliance awareness, cross-functional collaboration

WORK EXPERIENCE
Production Engineer Co-op, Advanced Manufacturing Corp | Jan 2025 - Present
- Reviewed GMP documentation ensuring 100% compliance with FDA regulatory standards
- Conducted quality inspections of equipment to ensure adherence to safety, quality standards
- Performed validation and functionality checks documenting results for quality records
- Implemented 5S process improvement improving efficiency by 25%
- Managed lifecycle tracking program for 200+ components, analyzing failure data

Tutor, Academic Success Center | Sept 2024 - Present
- Demonstrated ability to explain complex technical concepts clearly
- Adapted teaching methods showing flexibility in communication`,
      
      dataAnalyst: `ALEX MORGAN
alex.morgan@statetech.edu | Chicago, IL | (555) 123-4567

EDUCATION
State Technical University — BS in Mechanical Engineering | GPA: 3.87 | Expected May 2027

SKILLS
Data & Analysis: Data tracking and analysis, cost forecasting, process metrics, trend identification
Software: Microsoft Excel (pivot tables, VLOOKUP, data visualization); MATLAB (data processing); SolidWorks
Technical: Process validation, data collection and documentation, process improvement

WORK EXPERIENCE
Production Engineer Co-op, Advanced Manufacturing Corp | Jan 2025 - Present
- Managed tracking program for 200+ components, analyzing failure data to generate cost forecasts reducing budget variance by 15%
- Collected and analyzed equipment data across 50+ items, identifying 3 recurring issues
- Leveraged Excel to track implementation metrics, demonstrating 25% efficiency improvement
- Compiled and analyzed documentation data contributing to 98% compliance rate
- Documented validation results in database for trend analysis

Tutor, Academic Success Center | Sept 2024 - Present
- Tracked session outcomes for 20+ students, identifying patterns to improve approach
- Demonstrated ability to break down complex quantitative concepts`,
      
      changes: {
        qualityEngineer: [
          'Skills: Reordered to put "Quality assurance" first, changed "Mechanical Tools" → "Quality Tools"',
          'Added "compliance", "validation protocols", "regulatory documentation"',
          'Reordered bullets: GMP compliance moved to #1 (most relevant for Quality)',
          'Added specifics: "100% compliance with FDA", "quality inspections"',
          'Quantified: Added "25% efficiency improvement"',
          'Language shift: Less mechanical, more quality/compliance focused'
        ],
        dataAnalyst: [
          'Skills: New "Data & Analysis" category at TOP',
          'Excel specifics: "pivot tables, VLOOKUP, data visualization"',
          'MATLAB emphasized for "data processing"',
          'Reordered bullets: Data analysis moved to #1',
          'Quantified everything: "200+ components", "15% variance reduction", "50+ items", "25% improvement"',
          'Added data language: "analyzing failure data", "tracking metrics", "trend analysis"',
          'Tutoring reframed: "tracked outcomes", "identifying patterns"'
        ]
      }
    },
    
    'Engineering Physics': {
      traditional: `JORDAN TAYLOR
jordan.taylor@statetech.edu | Santa Fe, NM | (555) 234-5678

EDUCATION
State Technical University — BS in Engineering Physics | GPA 3.67 | Expected May 2027

RELEVANT COURSEWORK
Calculus I-III; Physics I-III (Honors); Modern Physics; Differential Equations; Electromagnetism; Mechanics

SKILLS
Technical: Finite element modeling, structural testing, experimental design, data analysis
Software: LS-Dyna, Python, LaTeX, Colab, Microsoft Office Suite

PUBLICATIONS
- J. Taylor et al. Experimental Investigation of Material Properties. Journal of Applied Physics (2025)
- M. Anderson, J. Taylor et al. Finite Element Modeling with Experimental Validation (2025)

WORK EXPERIENCE
Research Lead, Applied Physics Lab | May 2025 — Present
- Lead team of 4 in testing program evaluating polymer materials across environmental conditions
- Designed and executed mechanical, thermal, and vibrational tests
- Developed finite element models correlating with experimental data
- Authored standard operating procedures for testing protocols

Research Assistant, Materials Analysis Team | May 2024 — May 2025
- Conducted physics research analyzing material properties to industry standards
- Implemented rigorous testing protocols measuring dynamic properties`,
      
      quantAnalyst: `JORDAN TAYLOR
jordan.taylor@statetech.edu | Santa Fe, NM | (555) 234-5678

EDUCATION
State Technical University — BS in Engineering Physics | GPA 3.67 | Expected May 2027

RELEVANT COURSEWORK
Quantitative & Mathematical: Calculus I-III, Differential Equations, Math Physics, Statistical analysis
Computational Physics: Modern Physics, Electromagnetism, Mechanics

SKILLS
Quantitative Analysis: Mathematical modeling, statistical analysis, predictive modeling, risk assessment
Software: Python (data analysis, statistical modeling); Excel (advanced functions); LS-Dyna

PUBLICATIONS
- J. Taylor et al. Quantitative Characterization of Material Properties. Journal of Applied Physics (2025)
- M. Anderson, J. Taylor et al. Predictive Modeling Using Statistical Validation (2025)

WORK EXPERIENCE
Quantitative Research Lead, Applied Physics Lab | May 2025 — Present
- Lead team analyzing 500+ samples, developing statistical models predicting outcomes with 92% accuracy
- Designed experiments collecting 10,000+ data points, performing regression analysis
- Validated finite element models, reducing prediction error by 18%
- Created algorithmic testing procedures ensuring statistical rigor

Quantitative Research Analyst, Materials Analysis Team | May 2024 — May 2025
- Analyzed datasets of 1,000+ samples using Python, identifying patterns leading to 15% improvement
- Implemented hypothesis testing with 95% confidence intervals`,
      
      dataScientist: `JORDAN TAYLOR
jordan.taylor@statetech.edu | Santa Fe, NM | (555) 234-5678

EDUCATION
State Technical University — BS in Engineering Physics | GPA 3.67 | Expected May 2027

RELEVANT COURSEWORK
Data Science & Programming: Python, Discrete Structures (algorithms), Differential Equations (numerical methods)
Applied Mathematics: Calculus I-III, Math Physics

SKILLS
Data Science: Python (NumPy, Pandas, Matplotlib), Machine learning, Predictive modeling, Statistical analysis
Analysis: Experimental design, Feature engineering, Model validation, Time-series analysis
Data Tools: Data pipelines, Automated collection, Hypothesis testing, Data visualization

PUBLICATIONS
- J. Taylor et al. Data-Driven Analysis of Environmental Effects. Journal submission (2025)
- M. Anderson, J. Taylor et al. Predictive Modeling Using ML-Enhanced Analysis (2025)

WORK EXPERIENCE
Data Science Research Lead, Applied Physics Lab | May 2025 — Present
- Lead team analyzing 10,000+ data points, building predictive models with 92% accuracy
- Designed automated data pipelines using Python, reducing processing time by 75%
- Developed ML-enhanced simulation models training on experimental data
- Created interactive dashboards communicating findings to stakeholders

Data Analyst, Materials Analysis Team | May 2024 — May 2025
- Processed datasets of 1,000+ samples using Python, identifying patterns leading to 15% improvement
- Built predictive models achieving R² of 0.89 through feature engineering
- Automated analysis tasks reducing report time from 3 days to 2 hours`,
      
      changes: {
        quantAnalyst: [
          'Coursework reordered: "Quantitative & Mathematical" moved to front',
          'Skills reframed: "Statistical analysis", "Risk assessment", "Predictive modeling"',
          'Python emphasis: "statistical modeling, numerical methods"',
          'Quantified heavily: "500+ samples", "10,000+ data points", "92% accuracy", "18% error reduction"',
          'Finance language: "Risk assessment", "Confidence intervals", "Statistical rigor"',
          'Publications retitled with quantitative focus'
        ],
        dataScientist: [
          'Coursework: "Data Science & Programming" category first',
          'Python dominant: Added NumPy, Pandas, Matplotlib',
          'ML terminology: "Machine learning", "Feature engineering", "Data pipelines"',
          'Data wrangling emphasized: "Automated pipelines", "75% time reduction"',
          'Visualization: "Dashboards", "Interactive visualizations"',
          'Added metrics: "R² of 0.89", "3 days to 2 hours"',
          'Publications reframed with ML/data science angle'
        ]
      }
    }
  },
  
  'Business': {
    'Marketing': {
      traditional: `JORDAN CHEN
jordan.chen@stateuniversity.edu | Chicago, IL | (555) 234-5678

EDUCATION
State University — BS in Marketing | GPA: 3.72 | Expected May 2027

RELEVANT COURSEWORK
Marketing Research, Consumer Behavior, Digital Marketing, Business Analytics, Strategic Marketing

SKILLS
Marketing & Communication: Market research, campaign development, social media strategy, brand management, customer engagement
Digital Tools: Google Analytics, Canva, Adobe Creative Suite, Hootsuite, Mailchimp
Business: Microsoft Excel, PowerPoint, market analysis, data interpretation
Leadership: Event planning, team coordination, public speaking, budget management

WORK EXPERIENCE
Sales Associate, Target | June 2024 — Present
- Assisted customers with product selection resulting in 20% increase in monthly sales and 95% satisfaction rating
- Maintained organized inventory and restocked merchandise during peak hours ensuring product availability
- Processed 150+ transactions daily with zero cash discrepancies while maintaining friendly customer service
- Trained 3 new employees on POS system and customer service best practices

Volunteer, Local Food Bank | Sept 2023 — Present
- Coordinated weekly volunteer shifts for team of 15 volunteers
- Organized donation drives collecting 500+ items per semester

LEADERSHIP & ACTIVITIES
Vice President, Business Fraternity | Jan 2024 — Present
- Coordinated 8 campus events with attendance of 200+ students managing logistics and promotion
- Managed $3,000 event budget ensuring all activities stayed within financial constraints
- Led marketing committee developing social media strategy increasing membership by 40%
- Organized networking event with 15 corporate sponsors connecting students with industry professionals`,

      salesOperations: `JORDAN CHEN
jordan.chen@stateuniversity.edu | Chicago, IL | (555) 234-5678

EDUCATION
State University — BS in Marketing | GPA: 3.72 | Expected May 2027

RELEVANT COURSEWORK
Business Analytics, Marketing Research, Sales Management, CRM Systems, Data Analysis

SKILLS
Sales Operations: CRM systems, sales process optimization, pipeline management, performance metrics, data-driven decision making
Data & Analytics: Microsoft Excel (pivot tables, VLOOKUP, data visualization), Google Analytics, sales forecasting, KPI tracking
Technical: Salesforce basics, PowerPoint presentations, database management
Communication: Cross-functional collaboration, stakeholder management, process documentation

WORK EXPERIENCE
Sales Associate, Target | June 2024 — Present
- Analyzed sales data using Excel to identify top-performing products generating 20% increase in monthly revenue
- Tracked 150+ daily transactions in POS system maintaining 99.8% accuracy rate in inventory management
- Optimized checkout process reducing average transaction time by 15% through efficiency improvements
- Trained 3 new associates on sales system procedures documenting process in training manual
- Collaborated with management to forecast inventory needs based on sales trends reducing stockouts by 25%

Volunteer, Local Food Bank | Sept 2023 — Present
- Implemented volunteer scheduling system improving operational efficiency by 30%
- Tracked donation metrics using spreadsheets to optimize collection strategies

LEADERSHIP & ACTIVITIES
Vice President, Business Fraternity | Jan 2024 — Present
- Managed operations for 8 events tracking attendance metrics and analyzing engagement data to improve future events
- Oversaw $3,000 budget using Excel to track spending and forecast costs with 98% accuracy
- Developed recruitment pipeline process increasing membership by 40% through data-driven targeting
- Created partnership database tracking 15 corporate sponsors and maintaining relationship metrics`,

      dataAnalyst: `JORDAN CHEN
jordan.chen@stateuniversity.edu | Chicago, IL | (555) 234-5678

EDUCATION
State University — BS in Marketing | GPA: 3.72 | Expected May 2027

RELEVANT COURSEWORK
Business Analytics, Statistical Analysis, Marketing Research, Data Visualization, Quantitative Methods

SKILLS
Data Analysis: Excel (pivot tables, VLOOKUP, statistical functions, data visualization), statistical analysis, trend identification, predictive modeling
Tools & Software: Google Analytics, Tableau fundamentals, data cleaning and validation, dashboard creation
Business Intelligence: KPI development, performance metrics, A/B testing, customer segmentation, reporting
Communication: Data visualization, presenting insights to stakeholders, translating data into actionable recommendations

WORK EXPERIENCE
Sales Associate, Target | June 2024 — Present
- Analyzed sales data from 150+ daily transactions identifying patterns that increased revenue by 20%
- Built Excel dashboards tracking product performance metrics across 500+ SKUs enabling data-driven inventory decisions
- Conducted customer behavior analysis segmenting shoppers into 4 distinct groups to improve targeting strategies
- Reduced inventory discrepancies by 25% through systematic data validation and trend analysis
- Presented monthly sales reports to management using visualizations highlighting key performance indicators
- Leveraged POS system data to forecast peak shopping times optimizing staff scheduling and reducing wait times by 15%

Volunteer, Local Food Bank | Sept 2023 — Present
- Analyzed donation patterns identifying seasonal trends to optimize collection timing
- Created database tracking 500+ items per semester with 98% accuracy

LEADERSHIP & ACTIVITIES
Vice President, Business Fraternity | Jan 2024 — Present
- Tracked event attendance data across 8 events analyzing participation metrics to identify engagement drivers
- Managed $3,000 budget using Excel models to forecast costs and analyze spending patterns with 98% accuracy
- Conducted membership analysis resulting in 40% growth through data-driven recruitment targeting
- Built dashboard tracking 15 corporate partnerships measuring ROI and engagement metrics to optimize sponsor relationships`,

      changes: {
        salesOperations: [
          'Coursework reordered: "Business Analytics" and "Sales Management" moved to front',
          'Skills reframed: "CRM systems", "Pipeline management", "Sales process optimization"',
          'Excel emphasized: "pivot tables, VLOOKUP, data visualization"',
          'Reordered bullets: Sales data analysis moved to #1',
          'Added operations language: "Optimized process", "efficiency improvements", "system procedures"',
          'Quantified everything: "99.8% accuracy", "15% reduction", "25% fewer stockouts"',
          'Added CRM/process terminology: "pipeline", "operational efficiency", "partnership database"',
          'Club role reframed: "recruitment pipeline process", "relationship metrics"'
        ],
        dataAnalyst: [
          'Coursework: "Business Analytics", "Statistical Analysis" first',
          'Skills: New "Data Analysis" category at TOP',
          'Excel specifics added: "pivot tables, VLOOKUP, statistical functions, data visualization"',
          'Tools emphasized: "Tableau", "dashboards", "data cleaning"',
          'Reordered all bullets: Data analysis #1 for every section',
          'Added data terminology: "patterns", "segmentation", "validation", "forecast", "KPIs"',
          'Quantified with data focus: "500+ SKUs", "4 distinct segments", "98% accuracy"',
          'Visualization emphasis: "dashboards", "visualizations", "presenting insights"',
          'Volunteer & club reframed: "analyzed patterns", "database tracking", "dashboard tracking ROI"'
        ]
      }
    },
    
    'General Business': {
      traditional: `ALEX RIVERA
alex.rivera@stateuniversity.edu | Austin, TX | (555) 789-0123

EDUCATION
State University — BS in Business Administration | GPA: 3.58 | Expected May 2027

RELEVANT COURSEWORK
Financial Accounting, Business Statistics, Operations Management, Business Strategy, Organizational Behavior

SKILLS
Business & Analytical: Financial analysis, budget management, process improvement, strategic planning, problem solving
Communication & Collaboration: Client relations, team coordination, presentation skills, stakeholder communication
Technical: Microsoft Excel, PowerPoint, QuickBooks basics, Google Workspace, data entry and organization
Leadership: Financial planning, event management, decision making, cross-functional teamwork

WORK EXPERIENCE
Server, Olive Garden | May 2024 — Present
- Provided exceptional service to 50+ customers per shift resulting in 18% average tip rate and positive reviews
- Managed multiple tables simultaneously while maintaining 98% order accuracy during peak dinner hours
- Processed payments and handled cash register operations with zero discrepancies
- Collaborated with kitchen staff and management to ensure timely meal delivery and resolve customer concerns
- Trained 2 new servers on POS system, menu knowledge, and customer service protocols

Intern, Campus Bookstore | Jan 2024 — May 2024
- Assisted with inventory management tracking 1,000+ items and identifying stock needs
- Processed customer transactions and answered inquiries about textbook orders and supplies
- Supported special event coordination for 3 campus-wide book fairs

LEADERSHIP & ACTIVITIES
Treasurer, Entrepreneurship Club | Sept 2023 — Present
- Managed club budget of $2,500 tracking all expenses and revenue using Excel spreadsheets
- Presented monthly financial reports to executive board and general membership meetings
- Coordinated fundraising event raising $1,200 exceeding goal by 20%
- Collaborated with 5-person executive team planning 12 events throughout academic year`,

      operationsAnalyst: `ALEX RIVERA
alex.rivera@stateuniversity.edu | Austin, TX | (555) 789-0123

EDUCATION
State University — BS in Business Administration | GPA: 3.58 | Expected May 2027

RELEVANT COURSEWORK
Operations Management, Business Statistics, Process Improvement, Supply Chain Management, Data Analytics

SKILLS
Operations & Process Improvement: Workflow optimization, efficiency analysis, operational metrics, process documentation, bottleneck identification
Data & Analysis: Microsoft Excel (data analysis, forecasting, process modeling), statistical analysis, performance metrics, KPI tracking
Business Systems: Process mapping, inventory management, quality control, resource allocation
Communication: Cross-functional collaboration, process documentation, stakeholder reporting, data-driven recommendations

WORK EXPERIENCE
Server, Olive Garden | May 2024 — Present
- Optimized table management process reducing average wait time by 12% through strategic seating arrangements
- Analyzed service flow patterns identifying bottlenecks and implementing solutions improving order accuracy to 98%
- Streamlined payment processing workflow decreasing transaction time by 15% during peak hours
- Collaborated with kitchen operations to coordinate meal timing reducing customer complaints by 20%
- Documented training procedures for 2 new employees creating standardized onboarding process

Intern, Campus Bookstore | Jan 2024 — May 2024
- Improved inventory tracking system managing 1,000+ SKUs and reducing stock discrepancies by 30%
- Analyzed transaction data identifying peak purchasing periods to optimize staff scheduling
- Coordinated logistics for 3 campus events streamlining setup process and reducing preparation time by 25%

LEADERSHIP & ACTIVITIES
Treasurer, Entrepreneurship Club | Sept 2023 — Present
- Implemented budget tracking system using Excel improving expense visibility and reducing overspending by 15%
- Analyzed past event costs forecasting future budgets with 95% accuracy for 12 annual events
- Optimized fundraising process increasing revenue by 20% through data-driven strategy adjustments
- Coordinated cross-functional operations with 5-person executive team improving workflow efficiency`,

      customerSuccess: `ALEX RIVERA
alex.rivera@stateuniversity.edu | Austin, TX | (555) 789-0123

EDUCATION
State University — BS in Business Administration | GPA: 3.58 | Expected May 2027

RELEVANT COURSEWORK
Organizational Behavior, Customer Relationship Management, Business Communication, Conflict Resolution, Marketing

SKILLS
Customer Success: Relationship building, customer satisfaction, retention strategies, problem resolution, client onboarding
Communication: Active listening, empathy, clear communication, presenting to diverse audiences, conflict de-escalation
Account Management: Customer needs assessment, success metrics tracking, feedback collection, stakeholder management
Technical: Excel (customer data tracking), CRM systems basics, Google Workspace, customer communication tools

WORK EXPERIENCE
Server, Olive Garden | May 2024 — Present
- Built rapport with 50+ customers per shift resulting in 18% tip rate and multiple positive online reviews
- Resolved customer concerns quickly and professionally maintaining 95% satisfaction rating during peak hours
- Anticipated customer needs proactively addressing issues before escalation reducing complaints by 20%
- Maintained ongoing relationships with regular customers remembering preferences and creating personalized experiences
- Mentored 2 new team members on customer service best practices fostering supportive team environment

Intern, Campus Bookstore | Jan 2024 — May 2024
- Supported customers with textbook orders and inquiries handling 30+ interactions daily with 97% satisfaction
- Gathered customer feedback identifying pain points and recommending process improvements to management
- Assisted with event coordination for 3 campus book fairs ensuring positive attendee experience

LEADERSHIP & ACTIVITIES
Treasurer, Entrepreneurship Club | Sept 2023 — Present
- Communicated financial updates to 50+ members presenting complex budget information clearly at monthly meetings
- Collaborated with executive board addressing concerns and building consensus on financial decisions
- Led fundraising initiative building relationships with 10 local business sponsors resulting in $1,200 raised
- Supported team of 5 executives fostering collaborative environment and ensuring all voices were heard`,

      changes: {
        operationsAnalyst: [
          'Coursework reordered: "Operations Management" and "Process Improvement" moved to front',
          'Skills reframed: "Workflow optimization", "Process documentation", "Bottleneck identification"',
          'Added operations language: "Optimized", "Streamlined", "Efficiency", "Workflow"',
          'Reordered bullets: Process improvement moved to #1 in all sections',
          'Quantified operational impact: "12% reduction", "15% faster", "30% fewer discrepancies"',
          'Server job reframed: From customer service → process optimization and workflow improvement',
          'Bookstore reframed: From basic tasks → inventory system improvements and logistics',
          'Club role reframed: "Implemented system", "forecasting", "optimized process", "workflow efficiency"',
          'Removed soft skills emphasis, added systems/process focus'
        ],
        customerSuccess: [
          'Coursework: "Organizational Behavior", "Customer Relationship Management" first',
          'Skills: New "Customer Success" category at TOP',
          'Soft skills emphasized: "Relationship building", "Active listening", "Empathy", "Conflict resolution"',
          'Removed hard numbers focus, added relationship language',
          'Reordered bullets: Customer interaction #1 everywhere',
          'Server job reframed: From efficiency → building relationships, satisfaction, personalization',
          'Changed metrics: From process metrics → satisfaction scores, feedback, reviews',
          'Added people-focused language: "Built rapport", "Anticipated needs", "Mentored", "Supportive"',
          'Club role reframed: "Communicated updates", "Building consensus", "Building relationships", "Collaborative"',
          'Bookstore reframed: Customer support focus, gathering feedback, positive experience'
        ]
      }
    }
  },

'Liberal Arts': {
    'English/Writing': {
      traditional: `TAYLOR MITCHELL
taylor.mitchell@stateuniversity.edu | Portland, OR | (555) 345-6789

EDUCATION
State University — BA in English | GPA: 3.81 | Expected May 2027

RELEVANT COURSEWORK
Advanced Composition, Technical Writing, Digital Media Writing, Rhetoric and Persuasion, Creative Nonfiction

SKILLS
Writing & Communication: Academic writing, editing and proofreading, AP style, content creation, storytelling
Research & Analysis: Literary analysis, critical thinking, source evaluation, qualitative research
Technology: Microsoft Office Suite, Google Workspace, Grammarly, basic HTML/CSS
Collaboration: Peer review, workshop facilitation, client communication, deadline management

WORK EXPERIENCE
Writing Tutor, Campus Writing Center | Sept 2024 — Present
- Tutored 15 students per week in academic writing improving average paper grades by one letter
- Provided feedback on essays, research papers, and creative writing across disciplines
- Facilitated writing workshops for first-year students on thesis development and citation practices
- Adapted teaching approach to different learning styles and skill levels

Student Newspaper Contributor | Jan 2024 — Present
- Researched and wrote 8 articles on campus events and student issues with 2,000+ readership
- Conducted interviews with students, faculty, and administrators for feature stories
- Met weekly deadlines while balancing coursework and other commitments

LEADERSHIP & ACTIVITIES
Vice President, English Club | Sept 2023 — Present
- Organized 6 literary events including author visits and poetry readings with 100+ total attendance
- Managed club communications including social media and email newsletters
- Coordinated book club discussions facilitating conversations among 20+ members`,

      uxWriter: `TAYLOR MITCHELL
taylor.mitchell@stateuniversity.edu | Portland, OR | (555) 345-6789

EDUCATION
State University — BA in English | GPA: 3.81 | Expected May 2027

RELEVANT COURSEWORK
Technical Writing, Digital Media Writing, Rhetoric and Persuasion, User Experience (audit), Web Design Basics

SKILLS
UX Writing & Content: Microcopy, user-centered writing, interface copy, content strategy, information architecture
Writing & Editing: Clear and concise communication, editing for clarity, AP style, tone and voice consistency
User Research: User empathy, audience analysis, usability considerations, iterative writing
Technology: Figma basics, Google Workspace, Microsoft Office, basic HTML/CSS, content management systems

WORK EXPERIENCE
Writing Tutor, Campus Writing Center | Sept 2024 — Present
- Guided 15 students per week through writing process focusing on clarity and audience awareness
- Simplified complex academic concepts into clear explanations demonstrating ability to make content accessible
- Adapted communication style based on individual student needs showing user empathy
- Iterated on feedback approach based on student outcomes improving effectiveness by 30%

Student Newspaper Contributor | Jan 2024 — Present
- Wrote clear, concise articles with attention to word count and reader comprehension
- Researched user needs by interviewing diverse student populations to understand their perspectives
- Edited headlines and subheads for scannability and engagement increasing click-through rates
- Collaborated with design team to ensure text complemented visual layout

LEADERSHIP & ACTIVITIES
Vice President, English Club | Sept 2023 — Present
- Wrote user-friendly event descriptions and social media copy resulting in 40% increase in attendance
- Created email newsletters with clear calls-to-action and scannable formatting
- Designed information architecture for club website improving member navigation`,

      technicalWriter: `TAYLOR MITCHELL
taylor.mitchell@stateuniversity.edu | Portland, OR | (555) 345-6789

EDUCATION
State University — BA in English | GPA: 3.81 | Expected May 2027

RELEVANT COURSEWORK
Technical Writing, Advanced Composition, Digital Media Writing, Information Design, Research Methods

SKILLS
Technical Communication: Documentation, user guides, process documentation, API documentation basics, instructional design
Writing & Editing: Clear technical explanations, editing for precision, style guide adherence, version control
Research & Analysis: Information gathering, subject matter expert interviews, audience analysis, content organization
Technology: Microsoft Office Suite, Google Workspace, Markdown, basic HTML/CSS, documentation tools (exploring)

WORK EXPERIENCE
Writing Tutor, Campus Writing Center | Sept 2024 — Present
- Created documentation for 10+ tutoring processes and best practices used by staff of 25 tutors
- Translated complex academic concepts into step-by-step guides for students at varying skill levels
- Interviewed professors to understand assignment requirements and documented guidelines for tutors
- Maintained consistency across tutoring materials following established style guide

Student Newspaper Contributor | Jan 2024 — Present
- Researched and documented complex campus policies translating administrative language for student readers
- Interviewed subject matter experts (faculty, administrators) to gather accurate information for articles
- Edited articles for accuracy, clarity, and completeness ensuring readers understood key details
- Met strict deadlines while maintaining quality standards across 8+ published articles

LEADERSHIP & ACTIVITIES
Vice President, English Club | Sept 2023 — Present
- Documented club procedures and event planning processes creating reference materials for future officers
- Organized information logically for member communications improving clarity and reducing confusion
- Created templates for recurring content ensuring consistency across all club communications`,

      changes: {
        uxWriter: [
          'Coursework reordered: "Technical Writing", "Digital Media Writing" moved to front, added "User Experience"',
          'Skills reframed: New "UX Writing & Content" category at TOP with microcopy, user-centered writing',
          'Added UX terminology: "user empathy", "audience awareness", "accessible", "iterative"',
          'Technology updated: Added "Figma basics", "content management systems"',
          'Tutoring reframed: "clarity and audience awareness", "accessible", "user empathy", "iterated on feedback"',
          'Newspaper reframed: "scannability", "click-through rates", "user needs", "collaborated with design"',
          'Quantified UX impact: "30% improvement", "40% increase in attendance"',
          'Club activities reframed: "user-friendly copy", "calls-to-action", "information architecture"'
        ],
        technicalWriter: [
          'Coursework: "Technical Writing" first, added "Information Design", "Research Methods"',
          'Skills: New "Technical Communication" category at TOP with documentation focus',
          'Added technical writing terms: "documentation", "user guides", "process documentation", "API documentation"',
          'Technology updated: Added "Markdown", "documentation tools"',
          'Tutoring reframed: "created documentation", "step-by-step guides", "interviewed SMEs", "style guide"',
          'Newspaper reframed: "documented policies", "interviewed subject matter experts", "accuracy and completeness"',
          'Removed creative elements, emphasized: "precision", "consistency", "reference materials"',
          'Club activities reframed: "documented procedures", "organized information logically", "templates for consistency"'
        ]
      }
    },

    'Psychology': {
      traditional: `JORDAN SANTOS
jordan.santos@stateuniversity.edu | Boston, MA | (555) 456-7890

EDUCATION
State University — BS in Psychology | GPA: 3.65 | Expected May 2027

RELEVANT COURSEWORK
Research Methods, Statistics for Psychology, Cognitive Psychology, Developmental Psychology, Abnormal Psychology

SKILLS
Research & Analysis: Experimental design, data collection and analysis, SPSS, qualitative and quantitative methods
Psychology Knowledge: Human behavior, cognitive processes, developmental theories, research ethics, DSM-5 familiarity
Communication: Active listening, empathy, interviewing techniques, presenting research findings
Technology: SPSS, Microsoft Excel, PowerPoint, Google Workspace, Qualtrics (survey design)

WORK EXPERIENCE
Server, Local Restaurant | May 2024 — Present
- Provided attentive service to 40+ customers per shift maintaining 95% satisfaction rating
- Handled customer concerns with patience and problem-solving skills ensuring positive experiences
- Collaborated with team of 8 staff members coordinating efficiently during peak hours
- Trained 2 new servers on procedures and customer service best practices

Research Volunteer, Psychology Department | Jan 2024 — Present
- Assisted with cognitive psychology study on memory and attention involving 50+ participants
- Conducted participant screening interviews following IRB-approved protocols
- Collected and organized experimental data maintaining 100% accuracy in record-keeping
- Presented preliminary findings at undergraduate research symposium

LEADERSHIP & ACTIVITIES
Peer Mentor, First-Year Student
Program | Sept 2023 — Present
- Mentored 8 first-year students providing academic guidance and emotional support
- Facilitated weekly check-ins listening to concerns and connecting students with campus resources
- Organized 4 social events fostering sense of community among mentees`,

      uxResearcher: `JORDAN SANTOS
jordan.santos@stateuniversity.edu | Boston, MA | (555) 456-7890

EDUCATION
State University — BS in Psychology | GPA: 3.65 | Expected May 2027

RELEVANT COURSEWORK
Research Methods, Statistics for Psychology, Cognitive Psychology, Human-Computer Interaction (audit), User Experience Research

SKILLS
UX Research: User interviews, usability testing, qualitative and quantitative research, participant recruitment, research synthesis
Research & Analysis: Experimental design, data analysis, behavioral observation, pattern identification, research ethics
User Empathy: Active listening, understanding user needs, empathy mapping, persona development
Tools & Technology: SPSS, Microsoft Excel, PowerPoint, Google Workspace, Qualtrics, survey design, data visualization

WORK EXPERIENCE
Server, Local Restaurant | May 2024 — Present
- Observed customer behavior patterns identifying pain points in ordering process leading to 15% faster service
- Conducted informal user research asking customers about preferences and gathering feedback on menu items
- Adapted service approach based on individual customer needs demonstrating user empathy and flexibility
- Trained 2 new staff members on customer interaction techniques emphasizing active listening and responsiveness

Research Volunteer, Psychology Department | Jan 2024 — Present
- Conducted 50+ participant interviews for cognitive psychology study using semi-structured interview protocol
- Analyzed qualitative and quantitative data identifying behavioral patterns and user insights
- Synthesized research findings into actionable recommendations presented at undergraduate symposium
- Collaborated with research team translating complex findings into accessible presentations for non-expert audiences

LEADERSHIP & ACTIVITIES
Peer Mentor, First-Year Student Program | Sept 2023 — Present
- Conducted one-on-one interviews with 8 mentees to understand their needs, goals, and pain points
- Used active listening and empathy to identify underlying concerns and provide appropriate support
- Gathered feedback on program effectiveness through surveys and informal conversations informing program improvements`,

      hrSpecialist: `JORDAN SANTOS
jordan.santos@stateuniversity.edu | Boston, MA | (555) 456-7890

EDUCATION
State University — BS in Psychology | GPA: 3.65 | Expected May 2027

RELEVANT COURSEWORK
Organizational Psychology, Research Methods, Developmental Psychology, Conflict Resolution, Communication Psychology

SKILLS
People & Organizational: Employee relations, conflict resolution, training and development, performance management awareness
Psychology & Behavior: Understanding motivation, workplace behavior, individual differences, communication styles
Interpersonal: Active listening, empathy, relationship building, confidentiality, professional communication
Technology: Microsoft Excel, PowerPoint, Google Workspace, HRIS basics (learning), data tracking and reporting

WORK EXPERIENCE
Server, Local Restaurant | May 2024 — Present
- Built positive relationships with 40+ customers per shift creating welcoming environment and encouraging repeat business
- Resolved customer complaints diplomatically maintaining 95% satisfaction rating through empathetic problem-solving
- Collaborated with diverse team of 8 staff members navigating different personalities and communication styles
- Trained and onboarded 2 new employees teaching procedures and modeling professional customer service behaviors

Research Volunteer, Psychology Department | Jan 2024 — Present
- Managed participant recruitment and scheduling coordinating with 50+ individuals across multiple time zones
- Maintained confidential participant records following strict ethical guidelines and data privacy protocols
- Communicated research procedures clearly to diverse participant populations adapting explanation style as needed
- Collected feedback from participants about research experience identifying areas for process improvement

LEADERSHIP & ACTIVITIES
Peer Mentor, First-Year Student Program | Sept 2023 — Present
- Supported 8 first-year students through academic and personal challenges providing guidance and resources
- Facilitated conflict resolution between mentees and roommates using mediation and active listening techniques
- Tracked mentee progress and engagement documenting interactions and outcomes for program evaluation
- Organized team-building events fostering inclusive environment and sense of belonging among diverse student group`,

      changes: {
        uxResearcher: [
          'Coursework reordered: "Research Methods", "Cognitive Psychology" front, added "Human-Computer Interaction", "UX Research"',
          'Skills reframed: New "UX Research" category at TOP with user interviews, usability testing',
          'Added UX terminology: "user interviews", "usability testing", "user empathy", "persona development"',
          'Technology updated: Added "survey design", "data visualization"',
          'Server job reframed: "observed behavior patterns", "user research", "pain points", "user empathy"',
          'Quantified UX impact: "15% faster service"',
          'Research reframed: "participant interviews", "user insights", "actionable recommendations", "non-expert audiences"',
          'Peer mentor reframed: "one-on-one interviews", "understand needs and pain points", "gathered feedback", "program improvements"',
          'Emphasized: Pattern identification, synthesis, translating findings for stakeholders'
        ],
        hrSpecialist: [
          'Coursework: "Organizational Psychology" first, added "Conflict Resolution", "Communication Psychology"',
          'Skills: New "People & Organizational" category at TOP with employee relations, conflict resolution',
          'Added HR terminology: "employee relations", "performance management", "training and development", "HRIS"',
          'Removed research-heavy language, emphasized: "relationships", "collaboration", "communication"',
          'Server job reframed: "built relationships", "resolved complaints diplomatically", "team collaboration", "onboarded employees"',
          'Research reframed: "participant recruitment and scheduling", "confidential records", "ethical guidelines", "process improvement"',
          'Peer mentor reframed: "supported students through challenges", "conflict resolution", "tracked progress", "team-building"',
          'Emphasized: Confidentiality, relationship-building, creating welcoming environments, working with diverse populations'
        ]
      }
    }
  }
};

const ResumeExamples = ({ major }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);
  
  const majorExamples = examples[major];
  
  if (!majorExamples) return null;
  
  return (
    <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg border-4 border-orange-500 p-2">
      <div className="bg-white rounded-lg p-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-3 rounded-lg">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-gray-900 group-hover:text-orange-600 transition">
                📋 See Real Student Resume Examples
              </h3>
              <p className="text-sm text-gray-600 mt-1">
  Click to see how students tailored ONE resume for MULTIPLE career paths
</p>
            </div>
          </div>
          <div className="bg-orange-100 p-2 rounded-full">
            {isOpen ? <ChevronUp className="w-6 h-6 text-orange-600" /> : <ChevronDown className="w-6 h-6 text-orange-600" />}
          </div>
        </button>
      
      {isOpen && (
        <div className="mt-6 space-y-4 bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4 text-lg">
            <strong>👇 Click a student to see their resume examples:</strong>
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {Object.keys(majorExamples).map((exampleKey) => {
 // Define display info for each example type
const exampleInfo = {
  'Mechanical Engineering': {
    icon: '🔧',
    title: 'Mechanical Engineering Student',
    subtitle: 'See: Traditional ME vs Quality Engineer vs Data Analyst'
  },
  'Engineering Physics': {
    icon: '⚛️',
    title: 'Engineering Physics Student',
    subtitle: 'See: Traditional Physics vs Quantitative Analyst vs Data Scientist'
  },
  'Marketing': {
    icon: '📊',
    title: 'Marketing Student',
    subtitle: 'See: Traditional Marketing vs Sales Operations vs Data Analyst'
  },
  'General Business': {
    icon: '💼',
    title: 'General Business Student',
    subtitle: 'See: Traditional Business vs Operations Analyst vs Customer Success'
  },
  'English/Writing': {
    icon: '✏️',
    title: 'English/Writing Student',
    subtitle: 'See: Traditional Editorial vs UX Writer vs Technical Writer'
  },
  'Psychology': {
    icon: '🧠',
    title: 'Psychology Student',
    subtitle: 'See: Traditional Research vs UX Researcher vs HR Specialist'
  }
};
  
  const info = exampleInfo[exampleKey] || { icon: '📄', title: exampleKey, subtitle: 'See resume examples' };
  
  return (
    <button
      key={exampleKey}
      onClick={() => setSelectedExample(selectedExample === exampleKey ? null : exampleKey)}
      className={`p-4 rounded-lg border-2 text-left transition-all ${
        selectedExample === exampleKey
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-300 hover:border-purple-300 bg-white'
      }`}
    >
      <h4 className="font-bold text-lg">
        {info.icon} {info.title}
      </h4>
      <p className="text-sm text-gray-600 mt-1">
        {info.subtitle}
      </p>
    </button>
  );
})}
          </div>
          
          {selectedExample && majorExamples[selectedExample] && (
  <div className="mt-6 space-y-6">
    {/* Define version info for each example */}
    {(() => {
  const versionInfo = {
  'Mechanical Engineering': {
    traditional: 'Traditional Mechanical Engineering',
    alt1: { name: 'Quality Engineer', key: 'qualityEngineer' },
    alt2: { name: 'Data Analyst', key: 'dataAnalyst' },
    icon: '🔧',
    title: 'Mechanical Engineering Student',
    subtitle: 'See: Traditional ME vs Quality Engineer vs Data Analyst'
  },
  'Engineering Physics': {
    traditional: 'Traditional Engineering Physics',
    alt1: { name: 'Quantitative Analyst', key: 'quantAnalyst' },
    alt2: { name: 'Data Scientist', key: 'dataScientist' },
    icon: '⚛️',
    title: 'Engineering Physics Student',
    subtitle: 'See: Traditional Physics vs Quantitative Analyst vs Data Scientist'
  },
  'Marketing': {
    traditional: 'Traditional Marketing',
    alt1: { name: 'Sales Operations', key: 'salesOperations' },
    alt2: { name: 'Data Analyst', key: 'dataAnalyst' },
    icon: '📊',
    title: 'Marketing Student',
    subtitle: 'See: Traditional Marketing vs Sales Operations vs Data Analyst'
  },
  'General Business': {
    traditional: 'Traditional Business',
    alt1: { name: 'Operations Analyst', key: 'operationsAnalyst' },
    alt2: { name: 'Customer Success', key: 'customerSuccess' },
    icon: '💼',
    title: 'General Business Student',
    subtitle: 'See: Traditional Business vs Operations Analyst vs Customer Success'
  },
  'English/Writing': {
    traditional: 'Traditional Editorial',
    alt1: { name: 'UX Writer', key: 'uxWriter' },
    alt2: { name: 'Technical Writer', key: 'technicalWriter' },
    icon: '✏️',
    title: 'English/Writing Student',
    subtitle: 'See: Traditional Editorial vs UX Writer vs Technical Writer'
  },
  'Psychology': {
    traditional: 'Traditional Research',
    alt1: { name: 'UX Researcher', key: 'uxResearcher' },
    alt2: { name: 'HR Specialist', key: 'hrSpecialist' },
    icon: '🧠',
    title: 'Psychology Student',
    subtitle: 'See: Traditional Research vs UX Researcher vs HR Specialist'
  }
};
      
      const info = versionInfo[selectedExample];
      
      return (
        <>
          {/* Traditional Version */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
            <h4 className="font-bold text-xl mb-3 text-blue-900">
              Version A: {info.traditional}
            </h4>
            <pre className="text-xs whitespace-pre-wrap font-mono bg-white p-4 rounded border overflow-x-auto">
              {majorExamples[selectedExample].traditional}
            </pre>
          </div>
          
          {/* Alternative Path 1 */}
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
            <h4 className="font-bold text-xl mb-3 text-green-900">
              Version B: {info.alt1.name}
            </h4>
            <div className="mb-4 bg-yellow-100 border border-yellow-400 rounded p-3">
              <p className="font-semibold text-sm mb-2">🔍 Key Changes Made:</p>
              <ul className="text-xs space-y-1">
                {majorExamples[selectedExample].changes[info.alt1.key].map((change, idx) => (
                  <li key={idx}>• {change}</li>
                ))}
              </ul>
            </div>
            <pre className="text-xs whitespace-pre-wrap font-mono bg-white p-4 rounded border overflow-x-auto">
              {majorExamples[selectedExample][info.alt1.key]}
            </pre>
          </div>
          
          {/* Alternative Path 2 */}
          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6">
            <h4 className="font-bold text-xl mb-3 text-purple-900">
              Version C: {info.alt2.name}
            </h4>
            <div className="mb-4 bg-yellow-100 border border-yellow-400 rounded p-3">
              <p className="font-semibold text-sm mb-2">🔍 Key Changes Made:</p>
              <ul className="text-xs space-y-1">
                {majorExamples[selectedExample].changes[info.alt2.key].map((change, idx) => (
                  <li key={idx}>• {change}</li>
                ))}
              </ul>
            </div>
            <pre className="text-xs whitespace-pre-wrap font-mono bg-white p-4 rounded border overflow-x-auto">
              {majorExamples[selectedExample][info.alt2.key]}
            </pre>
          </div>
        </>
      );
    })()}
              
              <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">💡 Notice the Pattern:</h4>
                <ul className="text-sm space-y-2">
                  <li>✅ <strong>Same experience</strong> - all 3 versions use the exact same jobs and projects</li>
                  <li>✅ <strong>Different emphasis</strong> - bullets reordered and reworded to highlight relevant skills</li>
                  <li>✅ <strong>Tailored language</strong> - terminology matches each career path's expectations</li>
                  <li>✅ <strong>Skills reordered</strong> - most relevant skills moved to the top</li>
                  <li>✅ <strong>Quantified differently</strong> - same numbers, different focus</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

const ATSGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <div className="text-left">
          <h2 className="text-2xl font-bold mb-2">📋 ATS & Resume Writing Guide</h2>
          <p className="text-sm">Learn how to write resumes that pass Applicant Tracking Systems</p>
        </div>
        {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
      </button>
      
      {isOpen && (
        <div className="mt-6 space-y-6 text-left">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">What is ATS?</h3>
            <p className="text-sm">
              Applicant Tracking Systems (ATS) scan your resume BEFORE humans see it. 75% of resumes are rejected by ATS due to poor formatting or missing keywords. This guide helps you beat the bots.
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Universal Formatting Rules</h3>
            <ul className="text-sm space-y-1">
              <li>✅ Use simple fonts: Arial, Calibri, Times New Roman (10-12pt)</li>
              <li>✅ Save as .docx or .pdf (check job posting for preference)</li>
              <li>✅ Use standard section headers: EDUCATION, EXPERIENCE, SKILLS</li>
              <li>✅ NO tables, text boxes, headers, or footers (ATS can't read them)</li>
              <li>✅ Use bullet points (•) not fancy symbols</li>
              <li>✅ Spell out acronyms first time: "American Society of Mechanical Engineers (ASME)"</li>
            </ul>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">The STAR Method (Situation, Task, Action, Result)</h3>
            <p className="text-sm mb-3">Transform weak bullets into powerful accomplishments:</p>
            
            <div className="space-y-4">
              <div className="bg-white/20 rounded p-3">
                <p className="font-semibold mb-1">Example 1: Work Experience</p>
                <p className="text-sm">❌ <span className="line-through">Worked as barista at coffee shop</span></p>
                <p className="text-sm">✅ <strong>Served 200+ customers daily</strong> in fast-paced environment, <strong>maintaining 95% satisfaction rating</strong> through efficient order processing and friendly service</p>
                <p className="text-xs mt-1 italic">Why better: Quantifies work (200+ customers), shows result (95% satisfaction), includes action verbs</p>
              </div>
              
              <div className="bg-white/20 rounded p-3">
                <p className="font-semibold mb-1">Example 2: Academic Project</p>
                <p className="text-sm">❌ <span className="line-through">Did group project for engineering class</span></p>
                <p className="text-sm">✅ <strong>Collaborated with 4-person team</strong> to design automated sorting system using Arduino, <strong>completing project 2 weeks ahead of schedule</strong> and earning A grade</p>
                <p className="text-xs mt-1 italic">Why better: Shows teamwork, technical skills (Arduino), quantifies timeline, demonstrates success (A grade)</p>
              </div>
              
              <div className="bg-white/20 rounded p-3">
                <p className="font-semibold mb-1">Example 3: Leadership/Activities</p>
                <p className="text-sm">❌ <span className="line-through">President of engineering club</span></p>
                <p className="text-sm">✅ <strong>Led organization of 50+ members</strong>, organizing 10 technical workshops and <strong>increasing membership by 40%</strong> through targeted recruitment campaign</p>
                <p className="text-xs mt-1 italic">Why better: Quantifies scope (50+ members, 10 workshops), shows initiative (recruitment), demonstrates impact (40% growth)</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Quick Tips</h3>
            <ul className="text-sm space-y-1">
              <li>🎯 Use keywords from the job description naturally in your bullets</li>
              <li>📊 Quantify everything: numbers, percentages, timeframes, team sizes</li>
              <li>💪 Start bullets with strong action verbs: Led, Designed, Analyzed, Managed</li>
              <li>🎓 Class projects ARE real projects - include them!</li>
              <li>⏱️ Keep resume to 1 page (students/recent grads)</li>
            </ul>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">💡 Using AI Tools (ChatGPT, Claude, etc.)</h3>
            <p className="text-sm mb-3 font-semibold">IMPORTANT: AI is a TOOL to refine YOUR resume, not write it for you.</p>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">✅ Good uses (AFTER you write it yourself):</p>
                <ul className="ml-4 space-y-1">
                  <li>• "Check this bullet for ATS optimization and suggest improvements"</li>
                  <li>• "Is this bullet specific enough? Does it quantify results?"</li>
                  <li>• "Does this sound natural or too generic?"</li>
                  <li>• "Scan for grammar, typos, and clarity"</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold mb-1">❌ Don't do this:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Copy-paste AI-generated bullets directly (sounds generic, employers notice)</li>
                  <li>• Let AI write your resume from scratch (loses YOUR voice)</li>
                  <li>• Share sensitive personal information with AI tools</li>
                </ul>
              </div>
              
              <p className="font-semibold italic mt-2">Bottom line: Write it yourself using this guide first, THEN use AI to help improve what YOU wrote.</p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Get Human Feedback Too</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Career Center:</strong> Free resume reviews at most schools</li>
              <li><strong>Reddit:</strong> Find subreddits for your major (r/EngineeringResumes, r/BusinessResumes, etc.) - <span className="font-bold text-yellow-300">⚠️ BLACK OUT ALL PERSONAL INFO</span> (name, phone, email, address, school name) before posting</li>
              <li><strong>Peers:</strong> Classmates in your major who've landed internships</li>
              <li><strong>ATS Scanners:</strong> Resume Worded, Jobscan (free tools)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const ResumeBuilder = ({ onBack, setCurrentPage }) => {
  const [major, setMajor] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFontGuide, setShowFontGuide] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [findOpportunitiesOpen, setFindOpportunitiesOpen] = useState(false);
  const [applicationToolsOpen, setApplicationToolsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [resumeData, setResumeData] = useState({
    contact: { name: '', email: '', phone: '', linkedin: '', location: '' },
    education: { school: '', degree: '', major: '', gpa: '', graduation: '', coursework: '' },
    skills: { category1: '', category2: '', category3: '', category4: '' },
    experience: [], 
    projects: [], 
    activities: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('mtow-resume-builder');
    if (saved) {
      const parsed = JSON.parse(saved);
      setResumeData(parsed.data || resumeData);
      setMajor(parsed.major || '');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mtow-resume-builder', JSON.stringify({ data: resumeData, major }));
  }, [resumeData, major]);

  const config = MAJOR_CONFIG[major];
  const updateContact = (field, value) => setResumeData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  const updateEducation = (field, value) => setResumeData(prev => ({ ...prev, education: { ...prev.education, [field]: value } }));
  const updateSkills = (category, value) => setResumeData(prev => ({ ...prev, skills: { ...prev.skills, [category]: value } }));

  const addExperience = () => setResumeData(prev => ({ ...prev, experience: [...prev.experience, { title: '', company: '', dates: '', bullets: [''] }] }));
  const updateExperience = (index, field, value) => {
    setResumeData(prev => {
      const newExp = [...prev.experience];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };
  const updateExperienceBullet = (expIndex, bulletIndex, value) => {
    setResumeData(prev => {
      const newExp = [...prev.experience];
      const bullets = [...newExp[expIndex].bullets];
      bullets[bulletIndex] = value;
      newExp[expIndex] = { ...newExp[expIndex], bullets };
      return { ...prev, experience: newExp };
    });
  };
  const addExperienceBullet = (expIndex) => {
    setResumeData(prev => {
      const newExp = [...prev.experience];
      newExp[expIndex].bullets.push('');
      return { ...prev, experience: newExp };
    });
  };
  const deleteExperience = (index) => setResumeData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));

  const addProject = () => setResumeData(prev => ({ ...prev, projects: [...prev.projects, { name: '', technologies: '', description: '', link: '' }] }));
  const updateProject = (index, field, value) => {
    setResumeData(prev => {
      const newProj = [...prev.projects];
      newProj[index] = { ...newProj[index], [field]: value };
      return { ...prev, projects: newProj };
    });
  };
  const deleteProject = (index) => setResumeData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));

  const addActivity = () => setResumeData(prev => ({ ...prev, activities: [...prev.activities, { role: '', organization: '', dates: '', bullets: [''] }] }));
  const updateActivity = (index, field, value) => {
    setResumeData(prev => {
      const newAct = [...prev.activities];
      newAct[index] = { ...newAct[index], [field]: value };
      return { ...prev, activities: newAct };
    });
  };
  const updateActivityBullet = (actIndex, bulletIndex, value) => {
    setResumeData(prev => {
      const newAct = [...prev.activities];
      const bullets = [...newAct[actIndex].bullets];
      bullets[bulletIndex] = value;
      newAct[actIndex] = { ...newAct[actIndex], bullets };
      return { ...prev, activities: newAct };
    });
  };
  const addActivityBullet = (actIndex) => {
    setResumeData(prev => {
      const newAct = [...prev.activities];
      newAct[actIndex].bullets.push('');
      return { ...prev, activities: newAct };
    });
  };
  const deleteActivity = (index) => setResumeData(prev => ({ ...prev, activities: prev.activities.filter((_, i) => i !== index) }));

  const generateResumeText = () => {
    let text = `${resumeData.contact.name.toUpperCase()}\n`;
    const contactLine = [resumeData.contact.phone, resumeData.contact.email, resumeData.contact.linkedin, resumeData.contact.location].filter(Boolean).join(' | ');
    text += `${contactLine}\n\n`;

    if (resumeData.education.school) {
      text += `EDUCATION\n${resumeData.education.school}\n`;
      if (resumeData.education.degree || resumeData.education.major) {
        text += `${resumeData.education.degree} in ${resumeData.education.major}`;
        if (resumeData.education.graduation) text += ` | Expected: ${resumeData.education.graduation}`;
        text += `\n`;
      }
      if (resumeData.education.gpa) text += `GPA: ${resumeData.education.gpa}\n`;
      if (resumeData.education.coursework) text += `Relevant Coursework: ${resumeData.education.coursework}\n`;
      text += `\n`;
    }

    if (config && Object.values(resumeData.skills).some(v => v)) {
      text += `SKILLS\n`;
      config.skills.categories.forEach((category, idx) => {
        const skillValue = resumeData.skills[`category${idx + 1}`];
        if (skillValue) text += `${category}: ${skillValue}\n`;
      });
      text += `\n`;
    }

    if (resumeData.experience.length > 0) {
      text += `WORK EXPERIENCE\n`;
      resumeData.experience.forEach(exp => {
        if (exp.title || exp.company) {
          text += `${exp.title}${exp.company ? ' | ' + exp.company : ''}${exp.dates ? ' | ' + exp.dates : ''}\n`;
          exp.bullets.forEach(bullet => { if (bullet.trim()) text += `• ${bullet}\n`; });
          text += `\n`;
        }
      });
    }

    if (resumeData.projects.length > 0) {
      text += `PROJECTS\n`;
      resumeData.projects.forEach(proj => {
        if (proj.name) {
          text += `${proj.name}${proj.technologies ? ' | ' + proj.technologies : ''}${proj.link ? ' | ' + proj.link : ''}\n`;
          if (proj.description) text += `• ${proj.description}\n`;
          text += `\n`;
        }
      });
    }

    if (resumeData.activities.length > 0) {
      text += `ACTIVITIES & LEADERSHIP\n`;
      resumeData.activities.forEach(act => {
        if (act.role || act.organization) {
          text += `${act.role}${act.organization ? ', ' + act.organization : ''}${act.dates ? ' | ' + act.dates : ''}\n`;
          act.bullets.forEach(bullet => { if (bullet.trim()) text += `• ${bullet}\n`; });
          text += `\n`;
        }
      });
    }

    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateResumeText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clearAllData = () => {
    if (window.confirm('Clear all? Cannot be undone.')) {
      setResumeData({
        contact: { name: '', email: '', phone: '', linkedin: '', location: '' },
        education: { school: '', degree: '', major: '', gpa: '', graduation: '', coursework: '' },
        skills: { category1: '', category2: '', category3: '', category4: '' },
        experience: [], projects: [], activities: []
      });
      setMajor('');
      localStorage.removeItem('mtow-resume-builder');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Navigation */}
            

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
        <p className="text-xl text-gray-600 mb-8">Build an ATS-friendly resume that showcases YOUR experience.</p>
       	
        {!major && (
          <>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Build a Resume That Opens MULTIPLE Doors</h2>
              <p className="text-lg mb-4">
                Your degree doesn't lock you into one path. This resume builder helps you apply to traditional roles AND the alternative career paths you'll discover on our Find Internships page.
              </p>
              <div className="bg-white/20 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-2">You Have More Experience Than You Think</h3>
                <p className="text-md">
                  <strong>Class projects ARE real projects.</strong> Part-time jobs taught valuable skills. We'll help you translate it into professional language.
                </p>
              </div>
              <p className="text-md mt-4">
                <strong>Remember:</strong> Same experience, different emphasis = different opportunities. We'll show you how.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-bold text-lg mb-3">Select Your Field:</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.keys(MAJOR_CONFIG).map(m => (
                  <button key={m} onClick={() => setMajor(m)} className="p-4 border-2 border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-500">
                    <p className="font-semibold">{m}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setMajor('Engineering/STEM')} className="mt-3 text-sm text-gray-600 underline">Skip</button>
            </div>
          </>
        )}

        {major && config && (
          <>
 {/* ADD THIS BACK BUTTON */}
    <div className="mb-6">
      <button
        onClick={() => setMajor('')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
      >
        <ChevronDown className="w-5 h-5 rotate-90" />
        Back to Field Selection
      </button>
    </div>

    {/* ADD THIS TITLE */}
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8 text-center">
      <h2 className="text-3xl font-bold mb-2">
        {major === 'Engineering/STEM' && '🔧 Engineering & STEM Resume Builder'}
        {major === 'Business' && '💼 Business Resume Builder'}
        {major === 'Liberal Arts' && '📚 Liberal Arts Resume Builder'}
      </h2>
      <p className="text-lg">
        Tailored guidance and examples for {major} students
      </p>
    </div>
            <EncouragementBox />
                    
            <ATSGuide />
            
            

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => setShowPreview(!showPreview)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  {showPreview ? 'Hide' : 'Show'} Preview
                </button>
                <button onClick={copyToClipboard} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2">
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />} {copied ? 'Copied!' : 'Copy Resume'}
                </button>
                <button onClick={clearAllData} className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600">Clear All</button>
              </div>
            </div>

            {showPreview && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold text-lg">Preview</h3>
                  <button onClick={() => setShowPreview(false)}><X className="w-5 h-5" /></button>
                </div>
                <div className="bg-gray-50 p-4 rounded max-h-96 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap font-sans">{generateResumeText()}</pre>
                </div>
              </div>
            )}

            {/* CONTACT */}
            <div className="bg-white rounded-lg shadow mb-6">
              <button onClick={() => setExpandedSection(expandedSection === 'contact' ? null : 'contact')} className="w-full p-6 text-left hover:bg-gray-50 flex justify-between border-l-4 border-blue-500">
                <div><h2 className="text-2xl font-bold">1. Contact Info</h2></div>
                {expandedSection === 'contact' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'contact' && (
                <div className="p-6 border-t space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                    <p className="text-sm text-blue-800">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      <strong>Quick Tips:</strong> Use professional email. NO headers/footers in Word - ATS can't read them. <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="underline">See full guide above</a>
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" value={resumeData.contact.name} onChange={(e) => updateContact('name', e.target.value)} placeholder="Full Name" className="p-3 border rounded-lg" />
                    <input type="email" value={resumeData.contact.email} onChange={(e) => updateContact('email', e.target.value)} placeholder="Email" className="p-3 border rounded-lg" />
                    <input type="tel" value={resumeData.contact.phone} onChange={(e) => updateContact('phone', e.target.value)} placeholder="Phone" className="p-3 border rounded-lg" />
                    <input type="url" value={resumeData.contact.linkedin} onChange={(e) => updateContact('linkedin', e.target.value)} placeholder="LinkedIn (optional)" className="p-3 border rounded-lg" />
                    <input type="text" value={resumeData.contact.location} onChange={(e) => updateContact('location', e.target.value)} placeholder="City, State" className="md:col-span-2 p-3 border rounded-lg" />
                  </div>
                </div>
              )}
            </div>

            {/* EDUCATION */}
            <div className="bg-white rounded-lg shadow mb-6">
              <button onClick={() => setExpandedSection(expandedSection === 'education' ? null : 'education')} className="w-full p-6 text-left hover:bg-gray-50 flex justify-between border-l-4 border-purple-500">
                <div><h2 className="text-2xl font-bold">2. Education</h2></div>
                {expandedSection === 'education' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'education' && (
                <div className="p-6 border-t space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded p-3 mb-3">
                    <p className="text-sm text-purple-800">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      <strong>Quick Tips:</strong> Include GPA only if 3.0+. List 3-5 relevant courses max. <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="underline">See full guide above</a>
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" value={resumeData.education.school} onChange={(e) => updateEducation('school', e.target.value)} placeholder="University Name" className="md:col-span-2 p-3 border rounded-lg" />
                    <input type="text" value={resumeData.education.degree} onChange={(e) => updateEducation('degree', e.target.value)} placeholder="Bachelor of Science" className="p-3 border rounded-lg" />
                    <input type="text" value={resumeData.education.major} onChange={(e) => updateEducation('major', e.target.value)} placeholder="Major" className="p-3 border rounded-lg" />
                    <input type="text" value={resumeData.education.graduation} onChange={(e) => updateEducation('graduation', e.target.value)} placeholder="May 2026" className="p-3 border rounded-lg" />
                    <input type="text" value={resumeData.education.gpa} onChange={(e) => updateEducation('gpa', e.target.value)} placeholder="GPA (if 3.0+)" className="p-3 border rounded-lg" />
                    <input type="text" value={resumeData.education.coursework} onChange={(e) => updateEducation('coursework', e.target.value)} placeholder="Relevant Coursework" className="md:col-span-2 p-3 border rounded-lg" />
                  </div>
                </div>
              )}
            </div>

            {/* SKILLS */}
            <div className="bg-white rounded-lg shadow mb-6">
              <button onClick={() => setExpandedSection(expandedSection === 'skills' ? null : 'skills')} className="w-full p-6 text-left hover:bg-gray-50 flex justify-between border-l-4 border-green-500">
                <div><h2 className="text-2xl font-bold">3. Skills</h2></div>
                {expandedSection === 'skills' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'skills' && (
                <div className="p-6 border-t space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                    <p className="text-sm text-green-800 mb-2">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      <strong>Quick Tips:</strong> List specific tools/software. Only include skills you can discuss in interview. <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="underline">See full guide above</a>
                    </p>
                    <div className="bg-white rounded p-2 text-xs">
                      <p className="mb-1">❌ <span className="line-through">Microsoft Office, good communicator, team player</span></p>
                      <p>✅ <strong>Excel (pivot tables, VLOOKUP), PowerPoint, Python, data visualization</strong></p>
                    </div>
                  </div>
                  {config.skills.categories.map((category, idx) => (
                    <div key={idx}>
                      <label className="block font-semibold mb-1">{category}</label>
                      <textarea value={resumeData.skills[`category${idx + 1}`]} onChange={(e) => updateSkills(`category${idx + 1}`, e.target.value)} placeholder={config.skills.placeholders[category]} rows="2" className="w-full p-3 border rounded-lg" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* EXPERIENCE */}
            <div className="bg-white rounded-lg shadow mb-6">
              <button onClick={() => setExpandedSection(expandedSection === 'experience' ? null : 'experience')} className="w-full p-6 text-left hover:bg-gray-50 flex justify-between border-l-4 border-orange-500">
                <div><h2 className="text-2xl font-bold">4. Work Experience</h2></div>
                {expandedSection === 'experience' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'experience' && (
                <div className="p-6 border-t space-y-6">
                  <div className="bg-orange-50 border border-orange-200 rounded p-3">
                    <p className="text-sm text-orange-800 mb-2">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      <strong>Quick Tips:</strong> Start bullets with action verbs. Quantify with numbers. Part-time jobs count! <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="underline">See full guide above</a>
                    </p>
                    <div className="bg-white rounded p-2 text-xs space-y-1">
                      <p>❌ <span className="line-through">Worked as {major === 'Engineering/STEM' ? 'lab assistant' : major === 'Business' ? 'sales associate' : 'writing tutor'}</span></p>
                      <p>✅ <strong>{config.exampleBullets.experience}</strong></p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm text-blue-800 flex items-center gap-1">
                      <Lightbulb className="w-4 h-4" />
                      <strong>Get Smart Suggestions:</strong> Type keywords like <span className="font-mono">barista, server, tutor, lab, receptionist, cashier</span> in your bullets below
                    </p>
                    <KeywordGuide major={major} />
                  </div>
                  
                  {resumeData.experience.map((exp, expIdx) => (
                    <div key={expIdx} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-bold">Experience {expIdx + 1}</h4>
                        <button onClick={() => deleteExperience(expIdx)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 mb-3">
                        <input type="text" value={exp.title} onChange={(e) => updateExperience(expIdx, 'title', e.target.value)} placeholder={config.experiencePlaceholders.title} className="p-3 border rounded-lg" />
                        <input type="text" value={exp.company} onChange={(e) => updateExperience(expIdx, 'company', e.target.value)} placeholder={config.experiencePlaceholders.company} className="p-3 border rounded-lg" />
                        <input type="text" value={exp.dates} onChange={(e) => updateExperience(expIdx, 'dates', e.target.value)} placeholder="Jan 2024 - Present" className="md:col-span-2 p-3 border rounded-lg" />
                      </div>
                      {exp.bullets.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="mb-2">
                          <textarea value={bullet} onChange={(e) => updateExperienceBullet(expIdx, bulletIdx, e.target.value)} placeholder={config.experiencePlaceholders.bullet} rows="2" className="w-full p-3 border rounded-lg" />
                          <InstantBulletChecker text={bullet} major={major} />
                          <BulletAIHelper bullet={bullet} major={major} />
			</div>
                      ))}
                      <button onClick={() => addExperienceBullet(expIdx)} className="text-orange-600 text-sm flex items-center gap-1">
                        <Plus className="w-4 h-4" /> Add Bullet
                      </button>
                    </div>
                  ))}
                  <button onClick={addExperience} className="w-full bg-orange-100 border-2 border-dashed border-orange-400 rounded-lg p-4 hover:bg-orange-200 flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Add Experience
                  </button>
                </div>
              )}
            </div>

            {/* PROJECTS */}
            <div className="bg-white rounded-lg shadow mb-6">
              <button onClick={() => setExpandedSection(expandedSection === 'projects' ? null : 'projects')} className="w-full p-6 text-left hover:bg-gray-50 flex justify-between border-l-4 border-indigo-500">
                <div><h2 className="text-2xl font-bold">5. Projects</h2></div>
                {expandedSection === 'projects' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'projects' && (
                <div className="p-6 border-t space-y-6">
                  <div className="bg-indigo-50 border border-indigo-200 rounded p-3">
                    <p className="text-sm text-indigo-800 mb-2">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      <strong>Quick Tips:</strong> Class projects ARE real projects. Include 2-4 most relevant. <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="underline">See full guide above</a>
                    </p>
                    <div className="bg-white rounded p-2 text-xs space-y-1">
                      <p>❌ <span className="line-through">Made {major === 'Engineering/STEM' ? 'Arduino project' : major === 'Business' ? 'business plan' : 'research paper'} for class</span></p>
                      <p>✅ <strong>{config.exampleBullets.project}</strong></p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm text-blue-800 flex items-center gap-1">
                      <Lightbulb className="w-4 h-4" />
                      <strong>Get Smart Suggestions:</strong> Type keywords like <span className="font-mono">project, research, designed, built, analyzed, python</span> in descriptions below
                    </p>
                    <KeywordGuide major={major} />
                  </div>
                  
                  {resumeData.projects.map((proj, projIdx) => (
                    <div key={projIdx} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-bold">Project {projIdx + 1}</h4>
                        <button onClick={() => deleteProject(projIdx)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="space-y-3">
                        <input type="text" value={proj.name} onChange={(e) => updateProject(projIdx, 'name', e.target.value)} placeholder={config.projectPlaceholders.name} className="w-full p-3 border rounded-lg" />
                        <input type="text" value={proj.technologies} onChange={(e) => updateProject(projIdx, 'technologies', e.target.value)} placeholder={config.projectLabel + ': ' + config.projectPlaceholder} className="w-full p-3 border rounded-lg" />
                        <textarea value={proj.description} onChange={(e) => updateProject(projIdx, 'description', e.target.value)} placeholder={config.projectPlaceholders.description} rows="2" className="w-full p-3 border rounded-lg" />
                        <InstantBulletChecker text={bullet} major={major} />
                        <input type="url" value={proj.link} onChange={(e) => updateProject(projIdx, 'link', e.target.value)} placeholder="GitHub/Portfolio link (optional)" className="w-full p-3 border rounded-lg" />
                      <BulletAIHelper bullet={proj.description} major={major} />
			</div>
                    </div>
                  ))}
                  <button onClick={addProject} className="w-full bg-indigo-100 border-2 border-dashed border-indigo-400 rounded-lg p-4 hover:bg-indigo-200 flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Add Project
                  </button>
                </div>
              )}
            </div>

            {/* ACTIVITIES */}
            <div className="bg-white rounded-lg shadow mb-6">
              <button onClick={() => setExpandedSection(expandedSection === 'activities' ? null : 'activities')} className="w-full p-6 text-left hover:bg-gray-50 flex justify-between border-l-4 border-pink-500">
                <div><h2 className="text-2xl font-bold">6. Activities & Leadership</h2></div>
                {expandedSection === 'activities' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'activities' && (
                <div className="p-6 border-t space-y-6">
                  <div className="bg-pink-50 border border-pink-200 rounded p-3">
                    <p className="text-sm text-pink-800 mb-2">
                      <strong>Quick Tips:</strong> For simple membership, just fill Role + Organization + Dates. Use bullets only for leadership roles. <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="underline">See full guide above</a>
                    </p>
                    <div className="bg-white rounded p-2 text-xs space-y-1">
                      <p>❌ <span className="line-through">{major === 'Engineering/STEM' ? 'Member of engineering club' : major === 'Business' ? 'Treasurer of business fraternity' : 'Editor of student newspaper'}</span></p>
                      <p>✅ <strong>{config.exampleBullets.activity}</strong></p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm text-blue-800 flex items-center gap-1">
                      <Lightbulb className="w-4 h-4" />
                      <strong>Get Smart Suggestions:</strong> Type keywords like <span className="font-mono">president, organized, volunteer, fundraiser, led, mentor</span> in bullets below
                    </p>
                    <KeywordGuide major={major} />
                  </div>
                  
                  {resumeData.activities.map((act, actIdx) => (
                    <div key={actIdx} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-bold">Activity {actIdx + 1}</h4>
                        <button onClick={() => deleteActivity(actIdx)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="space-y-3">
                        <input type="text" value={act.role} onChange={(e) => updateActivity(actIdx, 'role', e.target.value)} placeholder={config.activityPlaceholders.role} className="w-full p-3 border rounded-lg" />
                        <input type="text" value={act.organization} onChange={(e) => updateActivity(actIdx, 'organization', e.target.value)} placeholder={config.activityPlaceholders.organization} className="w-full p-3 border rounded-lg" />
                        <input type="text" value={act.dates} onChange={(e) => updateActivity(actIdx, 'dates', e.target.value)} placeholder="Spring 2024 - Present" className="w-full p-3 border rounded-lg" />
                        <p className="text-xs font-semibold text-gray-600">Bullet Points (Optional - for leadership roles):</p>
                        {act.bullets.map((bullet, bulletIdx) => (
                          <div key={bulletIdx}>
                            <textarea value={bullet} onChange={(e) => updateActivityBullet(actIdx, bulletIdx, e.target.value)} placeholder={config.activityPlaceholders.bullet} rows="2" className="w-full p-3 border rounded-lg" />
                            <InstantBulletChecker text={bullet} major={major} />
                            <BulletAIHelper bullet={bullet} major={major} />
			</div>
                        ))}
                        <button onClick={() => addActivityBullet(actIdx)} className="text-pink-600 text-sm flex items-center gap-1">
                          <Plus className="w-4 h-4" /> Add Bullet
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={addActivity} className="w-full bg-pink-100 border-2 border-dashed border-pink-400 rounded-lg p-4 hover:bg-pink-200 flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Add Activity
                  </button>
                </div>
              )}
            </div>
{/* Full Resume AI Review */}
<div className="mb-8">
  <FullResumeAIReview 
    resumeText={generateResumeText()} 
    major={major} 
  />
</div>

{/* Your Resume is Ready! */}
<div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-8 text-center">
  <h2 className="text-3xl font-bold mb-4">Your Resume is Ready!</h2>
  ...

                          <h2 className="text-3xl font-bold mb-4">Your Resume is Ready!</h2>
              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-xl mb-3">Next Steps:</h3>
                <ol className="text-left space-y-2 max-w-2xl mx-auto">
                  <li>1️⃣ Copy your resume using the button below</li>
                  <li>2️⃣ Paste into Word/Google Docs and format with recommended fonts</li>
                  <li>3️⃣ <strong>Customize for EACH PATH</strong> - traditional OR alternative roles</li>
                  <li>4️⃣ Explore alternative career paths if you haven't already</li>
                </ol>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4">
                <button onClick={copyToClipboard} className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-bold flex items-center gap-2">
                  {copied ? <Check /> : <Copy />} {copied ? 'Copied!' : 'Copy Resume Now'}
                </button>
                
                <button 
                  onClick={() => setShowFontGuide(true)}
                  className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-bold flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Font Recommendations
                </button>
                
                <button 
                  onClick={onBack}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 font-bold flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Find Internships
                </button>
              </div>
              
              <p className="mt-6 text-sm italic">
                Remember: There's More Than One Way. Your resume works for ALL paths with small tweaks!
              </p>
            </div>
            
            {showFontGuide && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-2xl flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        Font Recommendations
                      </h3>
                      <button onClick={() => setShowFontGuide(false)} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      After pasting into Word/Google Docs, format your resume with these ATS-friendly fonts:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-semibold text-lg mb-2">Your Name:</p>
                        <p className="text-gray-700">16-18pt, Bold</p>
                        <p className="text-sm text-gray-500 mt-1">Arial or Calibri</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-semibold text-lg mb-2">Headers:</p>
                        <p className="text-gray-700">12pt, Bold</p>
                        <p className="text-sm text-gray-500 mt-1">Same as name</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-semibold text-lg mb-2">Body Text:</p>
                        <p className="text-gray-700">10-11pt, Normal</p>
                        <p className="text-sm text-gray-500 mt-1">Same as name</p>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                      <p className="text-sm text-gray-800">
                        <strong>Note:</strong> All fonts listed are ATS-safe. {config.fontPreference}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setShowFontGuide(false)}
                      className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Got It!
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-8 mt-8">
              <h2 className="text-3xl font-bold mb-4 text-purple-900 flex items-center gap-2">
                <TrendingUp className="w-8 h-8" />
                One Resume, Many Paths
              </h2>
              
              <p className="text-gray-700 mb-6">
                Your resume above can be tailored for MULTIPLE career paths. Here's how to emphasize different aspects for alternative roles:
              </p>
              
              <div className="space-y-4">
                {config.alternativePaths.map((path, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-5 border-l-4 border-purple-500">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      For {path.title} Roles:
                    </h3>
                    <p className="text-sm text-gray-700">
                      <strong>Emphasize these skills/experiences:</strong> {path.emphasize}
                    </p>
                    <p className="text-xs text-gray-600 mt-2 italic">
                      → Review your bullets and make sure these elements are prominent when applying to {path.title} positions
                    </p>
                  </div>
                ))}
              </div>
             

              <div className="bg-purple-100 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-lg mb-3 text-purple-900">💡 How to Tailor Your Resume:</h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li><strong>1.</strong> Copy your base resume (the one you built above)</li>
                  <li><strong>2.</strong> For each job, reorder your bullet points to put the most relevant ones first</li>
                  <li><strong>3.</strong> Adjust 2-3 words in key bullets to match the job description language</li>
                  <li><strong>4.</strong> In your Skills section, move the most relevant skills to the front</li>
                  <li><strong>5.</strong> Same experience + different emphasis = perfect fit for multiple paths!</li>
                </ol>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-700 mb-3">
                  <strong>Not sure which alternative paths exist for your major?</strong>
                </p>
                <button 
                  onClick={onBack}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold inline-flex items-center gap-2"
                >
              <Search className="w-5 h-5" />
                  Explore Career Paths on Find Internships
                </button>
              </div>
            </div>
            
          </>
        )}

        {/* Share Buttons */}
        <ShareButtons 
          title="Free Resume Builder for Students - MoreThanOneWay.org"
          message="Know someone who needs help with their resume?"
        />

      </main>
    </div>
  );
};

export default ResumeBuilder;