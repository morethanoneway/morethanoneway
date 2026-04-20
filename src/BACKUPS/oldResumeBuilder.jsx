import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Copy, Check, ChevronDown, ChevronUp, AlertCircle, Lightbulb, X, Plus, Trash2, FileText, HelpCircle, TrendingUp, Search } from 'lucide-react';

// Expanded smart suggestions with context tags
const SMART_SUGGESTIONS = {
  // Jobs/Work
  barista: [
    { text: "Served 200+ customers daily in fast-paced environment maintaining 95% satisfaction rating", context: "work" },
    { text: "Processed payments and managed cash register with 99% accuracy", context: "work" }
  ],
  server: [
    { text: "Provided exceptional service to 50+ customers per shift resulting in 15% tip average", context: "work" },
    { text: "Managed multiple tables simultaneously while maintaining 98% order accuracy", context: "work" }
  ],
  waiter: [
    { text: "Delivered personalized dining experience to guests resulting in positive reviews", context: "work" },
    { text: "Coordinated with kitchen staff to ensure timely meal delivery during peak hours", context: "work" }
  ],
  cashier: [
    { text: "Processed 150+ transactions daily with zero cash discrepancies", context: "work" },
    { text: "Handled customer inquiries and resolved complaints maintaining 97% satisfaction", context: "work" }
  ],
  retail: [
    { text: "Assisted customers resulting in 20% increase in monthly sales", context: "work" },
    { text: "Maintained organized inventory and restocked merchandise during peak hours", context: "work" }
  ],
  receptionist: [
    { text: "Managed front desk operations greeting 100+ visitors daily", context: "work" },
    { text: "Coordinated scheduling for 15+ staff members using Microsoft Outlook", context: "work" }
  ],
  tutor: [
    { text: "Tutored 12 students in mathematics improving average grades by one letter", context: "work" },
    { text: "Developed customized study materials resulting in 90% exam pass rate", context: "work" }
  ],
  lifeguard: [
    { text: "Monitored pool safety for 200+ swimmers daily preventing incidents", context: "work" },
    { text: "Responded to 3 emergency situations providing first aid and CPR", context: "work" }
  ],
  
  // Academic/Research
  lab: [
    { text: "Conducted 50+ experiments analyzing data to identify trends and patterns", context: "academic" },
    { text: "Maintained laboratory equipment and prepared samples for research team", context: "academic" }
  ],
  laboratory: [
    { text: "Performed testing and analysis on 100+ samples using spectroscopy equipment", context: "academic" },
    { text: "Documented experimental procedures and results in detailed lab reports", context: "academic" }
  ],
  research: [
    { text: "Conducted research project analyzing dataset of 1000+ entries to identify trends", context: "academic" },
    { text: "Contributed to research findings presented at regional undergraduate symposium", context: "academic" }
  ],
  "group project": [
    { text: "Collaborated with 4-person team to design solution completing project 2 weeks ahead of schedule", context: "academic" },
    { text: "Coordinated team meetings and delegated tasks resulting in A grade on final deliverable", context: "academic" }
  ],
  "class project": [
    { text: "Designed and implemented project demonstrating proficiency in course concepts", context: "academic" },
    { text: "Built functional prototype following industry best practices and standards", context: "academic" }
  ],
  presentation: [
    { text: "Presented research findings to audience of 50+ students and faculty members", context: "academic" },
    { text: "Delivered 20-minute technical presentation explaining complex concepts clearly", context: "academic" }
  ],
  thesis: [
    { text: "Authored 60-page thesis analyzing topic through mixed-methods research approach", context: "academic" },
    { text: "Defended thesis before committee earning honors distinction", context: "academic" }
  ],
  capstone: [
    { text: "Led capstone project from conception to completion over 14-week semester", context: "academic" },
    { text: "Developed capstone solution addressing real-world problem for industry partner", context: "academic" }
  ],
  
  // Leadership/Activities
  president: [
    { text: "Led organization of 50+ members organizing 10 events throughout academic year", context: "leadership" },
    { text: "Managed $5,000 budget and coordinated executive board meetings weekly", context: "leadership" }
  ],
  "vice president": [
    { text: "Coordinated logistics for 8 campus events with attendance of 200+ students", context: "leadership" },
    { text: "Supervised 5 committee chairs and delegated responsibilities for major initiatives", context: "leadership" }
  ],
  organized: [
    { text: "Organized fundraising event raising $3,000 for local nonprofit organization", context: "leadership" },
    { text: "Planned and executed campus event with 150+ attendees managing all logistics", context: "leadership" }
  ],
  club: [
    { text: "Led team of 10 members coordinating weekly meetings and semester projects", context: "leadership" },
    { text: "Recruited 25 new members increasing club participation by 40%", context: "leadership" }
  ],
  volunteer: [
    { text: "Volunteered 80+ hours supporting organization's community outreach programs", context: "leadership" },
    { text: "Organized volunteer team of 15 students for monthly service projects", context: "leadership" }
  ],
  fundraiser: [
    { text: "Coordinated fundraising campaign raising $2,500 exceeding goal by 25%", context: "leadership" },
    { text: "Organized charity event with 100+ participants generating $1,800 in donations", context: "leadership" }
  ],
  mentor: [
    { text: "Mentored 8 first-year students providing academic guidance and campus resources", context: "leadership" },
    { text: "Facilitated weekly study sessions helping mentees improve average GPA by 0.5", context: "leadership" }
  ],
  
  // Technical
  python: [
    { text: "Developed Python script automating data processing reducing manual work by 10 hours weekly", context: "technical" },
    { text: "Built data analysis tool using Python and pandas processing 10,000+ records", context: "technical" }
  ],
  excel: [
    { text: "Created Excel dashboards with pivot tables and VLOOKUP analyzing sales data", context: "technical" },
    { text: "Automated reporting process using Excel macros saving 5 hours per week", context: "technical" }
  ],
  coding: [
    { text: "Developed web application using modern frameworks serving 500+ users", context: "technical" },
    { text: "Wrote clean, documented code following industry best practices and standards", context: "technical" }
  ],
  data: [
    { text: "Analyzed dataset of 5,000+ entries identifying key trends and insights", context: "technical" },
    { text: "Created data visualizations using Tableau presenting findings to stakeholders", context: "technical" }
  ],
  solidworks: [
    { text: "Designed 3D models and assemblies using SolidWorks for engineering projects", context: "technical" },
    { text: "Created technical drawings and specifications following ASME standards", context: "technical" }
  ],
  matlab: [
    { text: "Developed MATLAB simulations modeling complex systems and analyzing results", context: "technical" },
    { text: "Implemented algorithms in MATLAB processing experimental data efficiently", context: "technical" }
  ]
};

// Context priorities by major
const MAJOR_PRIORITIES = {
  'Engineering/STEM': ['technical', 'academic', 'work', 'leadership'],
  'Business': ['work', 'leadership', 'technical', 'academic'],
  'Liberal Arts': ['academic', 'leadership', 'work', 'technical']
};

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

const SmartSuggestions = ({ text, onSelect, major }) => {
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    if (!text || text.length < 3) { 
      setSuggestions([]); 
      return; 
    }
    
    const lowerText = text.toLowerCase();
    const found = [];
    const priorities = MAJOR_PRIORITIES[major] || ['work', 'academic', 'leadership', 'technical'];
    
    Object.keys(SMART_SUGGESTIONS).forEach(keyword => {
      if (lowerText.includes(keyword)) {
        SMART_SUGGESTIONS[keyword].forEach(suggestion => {
          found.push(suggestion);
        });
      }
    });
    
    const unique = [...new Map(found.map(item => [item.text, item])).values()];
    const sorted = unique.sort((a, b) => {
      return priorities.indexOf(a.context) - priorities.indexOf(b.context);
    });
    
    setSuggestions(sorted.slice(0, 3));
  }, [text, major]);

  if (suggestions.length === 0) return null;
  
  return (
    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-xs font-semibold text-blue-800 mb-2 flex items-center">
        <Lightbulb className="w-3 h-3 mr-1" />
        Smart Suggestions (click to use):
      </p>
      <div className="space-y-2">
        {suggestions.map((s, i) => (
          <button 
            key={i} 
            onClick={() => onSelect(s.text)} 
            className="w-full text-left text-sm p-2 bg-white border border-blue-300 rounded hover:bg-blue-100"
          >
            {s.text}
          </button>
        ))}
      </div>
    </div>
  );
};

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

const ResumeExamples = ({ major }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);
  
  const examples = {
    'Engineering/STEM': {
      'Mechanical Engineering': {
        traditional: `ALEX MORGAN
alex.morgan@statetech.edu | Hartford, CT | (555) 123-4567

EDUCATION
State Technical University – BS in Mechanical Engineering | GPA: 3.87 | Expected May 2027

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

Peer Tutor, Academic Success Center | Sept 2024 - Present
- Provided academic support in Calculus, Differential Equations, and Statics
- Facilitated one-on-one tutoring sessions adapting to learning styles`,
        
        qualityEngineer: `ALEX MORGAN
alex.morgan@statetech.edu | Hartford, CT | (555) 123-4567

EDUCATION
State Technical University – BS in Mechanical Engineering | GPA: 3.87 | Expected May 2027

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

Peer Tutor, Academic Success Center | Sept 2024 - Present
- Demonstrated ability to explain complex technical concepts clearly
- Adapted teaching methods showing flexibility in communication`,
        
        dataAnalyst: `ALEX MORGAN
alex.morgan@statetech.edu | Hartford, CT | (555) 123-4567

EDUCATION
State Technical University – BS in Mechanical Engineering | GPA: 3.87 | Expected May 2027

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

Peer Tutor, Academic Success Center | Sept 2024 - Present
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
jordan.taylor@statetech.edu | Hartford, CT | (555) 234-5678

EDUCATION
State Technical University – BS in Engineering Physics | GPA 3.67 | Expected May 2027

RELEVANT COURSEWORK
Calculus I-III; Physics I-III (Honors); Modern Physics; Differential Equations; Electromagnetism; Mechanics

SKILLS
Technical: Finite element modeling, structural testing, experimental design, data analysis
Software: LS-Dyna, Python, LaTeX, Colab, Microsoft Office Suite

PUBLICATIONS
- J. Taylor et al. Experimental Investigation of Material Properties. Journal of Applied Physics (2025)
- M. Anderson, J. Taylor et al. Finite Element Modeling with Experimental Validation (2025)

WORK EXPERIENCE
Research Lead, Applied Physics Lab | May 2025 – Present
- Lead team of 4 in testing program evaluating polymer materials across environmental conditions
- Designed and executed mechanical, thermal, and vibrational tests
- Developed finite element models correlating with experimental data
- Authored standard operating procedures for testing protocols

Research Assistant, Materials Analysis Team | May 2024 – May 2025
- Conducted physics research analyzing material properties to industry standards
- Implemented rigorous testing protocols measuring dynamic properties`,
        
        quantAnalyst: `JORDAN TAYLOR
jordan.taylor@statetech.edu | Hartford, CT | (555) 234-5678

EDUCATION
State Technical University – BS in Engineering Physics | GPA 3.67 | Expected May 2027

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
Quantitative Research Lead, Applied Physics Lab | May 2025 – Present
- Lead team analyzing 500+ samples, developing statistical models predicting outcomes with 92% accuracy
- Designed experiments collecting 10,000+ data points, performing regression analysis
- Validated finite element models, reducing prediction error by 18%
- Created algorithmic testing procedures ensuring statistical rigor

Quantitative Research Analyst, Materials Analysis Team | May 2024 – May 2025
- Analyzed datasets of 1,000+ samples using Python, identifying patterns leading to 15% improvement
- Implemented hypothesis testing with 95% confidence intervals`,
        
        dataScientist: `JORDAN TAYLOR
jordan.taylor@statetech.edu | Hartford, CT | (555) 234-5678

EDUCATION
State Technical University – BS in Engineering Physics | GPA 3.67 | Expected May 2027

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
Data Science Research Lead, Applied Physics Lab | May 2025 – Present
- Lead team analyzing 10,000+ data points, building predictive models with 92% accuracy
- Designed automated data pipelines using Python, reducing processing time by 75%
- Developed ML-enhanced simulation models training on experimental data
- Created interactive dashboards communicating findings to stakeholders

Data Analyst, Materials Analysis Team | May 2024 – May 2025
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
    }
  };
  
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
            {Object.keys(majorExamples).map((exampleKey) => (
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
                  {exampleKey === 'Mechanical Engineering' ? '🔧 Mechanical Engineering Student' : '⚛️ Engineering Physics Student'}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {exampleKey === 'Mechanical Engineering' 
                    ? 'See: Traditional ME vs Quality Engineer vs Data Analyst'
                    : 'See: Traditional Physics vs Quantitative Analyst vs Data Scientist'}
                </p>
              </button>
            ))}
          </div>
          
          {selectedExample && majorExamples[selectedExample] && (
            <div className="mt-6 space-y-6">
              {/* Traditional Version */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                <h4 className="font-bold text-xl mb-3 text-blue-900">
                  Version A: Traditional {selectedExample === 'Mechanical Engineering' ? 'Mechanical Engineering' : 'Engineering Physics'}
                </h4>
                <pre className="text-xs whitespace-pre-wrap font-mono bg-white p-4 rounded border overflow-x-auto">
                  {majorExamples[selectedExample].traditional}
                </pre>
              </div>
              
              {/* Alternative Path 1 */}
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                <h4 className="font-bold text-xl mb-3 text-green-900">
                  Version B: {selectedExample === 'Mechanical Engineering' ? 'Quality Engineer Focus' : 'Quantitative Analyst Focus'}
                </h4>
                <div className="mb-4 bg-yellow-100 border border-yellow-400 rounded p-3">
                  <p className="font-semibold text-sm mb-2">🔍 Key Changes Made:</p>
                  <ul className="text-xs space-y-1">
                    {majorExamples[selectedExample].changes[selectedExample === 'Mechanical Engineering' ? 'qualityEngineer' : 'quantAnalyst'].map((change, idx) => (
                      <li key={idx}>• {change}</li>
                    ))}
                  </ul>
                </div>
                <pre className="text-xs whitespace-pre-wrap font-mono bg-white p-4 rounded border overflow-x-auto">
                  {majorExamples[selectedExample][selectedExample === 'Mechanical Engineering' ? 'qualityEngineer' : 'quantAnalyst']}
                </pre>
              </div>
              
              {/* Alternative Path 2 */}
              <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6">
                <h4 className="font-bold text-xl mb-3 text-purple-900">
                  Version C: Data {selectedExample === 'Mechanical Engineering' ? 'Analyst' : 'Scientist'} Focus
                </h4>
                <div className="mb-4 bg-yellow-100 border border-yellow-400 rounded p-3">
                  <p className="font-semibold text-sm mb-2">🔍 Key Changes Made:</p>
                  <ul className="text-xs space-y-1">
                    {majorExamples[selectedExample].changes[selectedExample === 'Mechanical Engineering' ? 'dataAnalyst' : 'dataScientist'].map((change, idx) => (
                      <li key={idx}>• {change}</li>
                    ))}
                  </ul>
                </div>
                <pre className="text-xs whitespace-pre-wrap font-mono bg-white p-4 rounded border overflow-x-auto">
                  {majorExamples[selectedExample][selectedExample === 'Mechanical Engineering' ? 'dataAnalyst' : 'dataScientist']}
                </pre>
              </div>
              
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
    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-6 mb-8">
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
          {/* What is ATS */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">What is ATS?</h3>
            <p className="text-sm">
              Applicant Tracking Systems (ATS) scan your resume BEFORE humans see it. 75% of resumes are rejected by ATS due to poor formatting or missing keywords. This guide helps you beat the bots.
            </p>
          </div>
          
          {/* Formatting Rules */}
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
          
          {/* STAR Method */}
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
          
          {/* Quick Tips */}
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
          
          {/* AI as a Tool */}
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
          
          {/* Other Review Sources */}
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

const ResumeBuilder = ({ onBack }) => {
  const [major, setMajor] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFontGuide, setShowFontGuide] = useState(false);
  const [resumeData, setResumeData] = useState({
    contact: { name: '', email: '', phone: '', linkedin: '', location: '' },
    education: { school: '', degree: '', major: '', gpa: '', graduation: '', coursework: '' },
    skills: { category1: '', category2: '', category3: '', category4: '' },
    experience: [], projects: [], activities: []
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
      <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button onClick={onBack} className="flex items-center hover:text-blue-200">
            <ArrowLeft className="w-5 h-5 mr-2" />Back to Home
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 mt-4"><CrisisBanner /></div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
        <p className="text-xl text-gray-600 mb-8">Build an ATS-friendly resume that showcases YOUR experience.</p>

        {!major && (
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
        )}

        {major && config && (
          <>
            {/* Opening Message - More Than One Way Philosophy */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Build a Resume That Opens MULTIPLE Doors</h2>
              <p className="text-lg mb-4">
                Your {major} degree doesn't lock you into one path. This resume will help you apply to traditional roles AND the alternative career paths you discovered on our Find Internships page.
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
                          <SmartSuggestions text={bullet} onSelect={(s) => updateExperienceBullet(expIdx, bulletIdx, s)} major={major} />
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
                        <SmartSuggestions text={proj.description} onSelect={(s) => updateProject(projIdx, 'description', s)} major={major} />
                        <input type="url" value={proj.link} onChange={(e) => updateProject(projIdx, 'link', e.target.value)} placeholder="GitHub/Portfolio link (optional)" className="w-full p-3 border rounded-lg" />
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
                            <SmartSuggestions text={bullet} onSelect={(s) => updateActivityBullet(actIdx, bulletIdx, s)} major={major} />
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

            {/* FINAL CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-8 text-center">
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
            
            {/* Font Guide Popup */}
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
            
            {/* One Resume, Many Paths - MOVED HERE */}
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
              
              {/* Real Examples Section */}
              <ResumeExamples major={major} />
              
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
            
            {/* AI Tool Guidance */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 mt-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6" />
                Should You Use AI Tools?
              </h2>
              
              <div className="bg-white rounded-lg p-6 mb-4">
                <h3 className="font-bold text-lg mb-3 text-gray-900">⚠️ IMPORTANT: AI is a TOOL, Not a Writer</h3>
                <p className="text-gray-700 mb-4">
                  Use AI (ChatGPT, Claude, etc.) to <strong>refine</strong> what YOU wrote, not to write your resume for you.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-300 rounded p-4">
                    <p className="font-bold text-green-900 mb-2">✅ Good Uses (AFTER writing it yourself):</p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• "Check this bullet for ATS optimization"</li>
                      <li>• "Is this quantified enough? Does it show impact?"</li>
                      <li>• "Does this sound natural or too generic?"</li>
                      <li>• "Scan for grammar and typos"</li>
                      <li>• "Suggest stronger action verbs for this bullet"</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-300 rounded p-4">
                    <p className="font-bold text-red-900 mb-2">❌ Don't Do This:</p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• Copy-paste AI-generated bullets directly (sounds generic, recruiters notice)</li>
                      <li>• Let AI write your entire resume (loses YOUR voice and authenticity)</li>
                      <li>• Share sensitive personal information with AI tools</li>
                      <li>• Use AI as a substitute for doing the work yourself</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-bold text-lg text-center text-gray-900">
                  Write it yourself first using this guide → THEN use AI to polish
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-gray-900">Get Human Feedback Too</h3>
                <div className="space-y-3