export interface KnowledgeEntry {
  topics: string[];
  answer: string;
}

// Answers are taken only from Mohamed's CV so the assistant never invents facts.
export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    topics: ['experience', 'years', 'how long', 'background', 'summary', 'about', 'who', 'introduce', 'yourself'],
    answer: 'Mohamed is a Senior Full Stack Developer with 12+ years of experience in front-end, full-stack and API development — building enterprise web applications, REST APIs, dashboards and customer-facing portals across banking, healthcare, telecom and SaaS.',
  },
  {
    topics: ['current', 'now', 'cognizant', 'dll', 'one source', 'banking', 'present', 'today', 'job'],
    answer: 'Since July 2025 he has been a Senior Associate – Projects at Cognizant, working as a MERN stack developer on DLL One Source, an enterprise banking application. He builds React.js UIs, Node.js/Express REST APIs over MongoDB and Oracle, optimises SQL, and ships through Azure DevOps CI/CD with GitHub Copilot-assisted development.',
  },
  {
    topics: ['skills', 'stack', 'technologies', 'tech', 'tools', 'know', 'languages'],
    answer: 'Front-end: Angular, React.js, TypeScript, JavaScript, HTML5, CSS3, RxJS, NgRx, Angular Material, AG Grid, DevExtreme. Back-end: Node.js, Express.js, REST APIs. Databases: MongoDB, Oracle, SQL, PL/SQL. DevOps: Git, GitHub, Azure DevOps, CI/CD, Docker, Jest. Plus AI-assisted engineering with GitHub Copilot.',
  },
  {
    topics: ['angular', 'rxjs', 'ngrx', 'material', 'frontend', 'front-end', 'front end', 'ui'],
    answer: 'Angular is his deepest strength — from AngularJS (2014) through modern Angular with RxJS, NgRx, Angular Material, AG Grid and DevExtreme. He led Angular front-end delivery for Abbott’s healthcare platforms at HCL and built Angular portals for Mavenir and Zuora.',
  },
  {
    topics: ['react', 'mern', 'reactjs', 'react.js'],
    answer: 'He currently builds React.js interfaces as part of the MERN stack (MongoDB, Express.js, React.js, Node.js) on the DLL One Source banking application at Cognizant.',
  },
  {
    topics: ['backend', 'back-end', 'node', 'nodejs', 'express', 'api', 'apis', 'rest', 'server'],
    answer: 'He builds and supports RESTful APIs with Node.js and Express.js, integrating MongoDB and Oracle databases, and has exposure to microservices.',
  },
  {
    topics: ['database', 'databases', 'mongodb', 'mongo', 'oracle', 'sql', 'plsql', 'pl/sql', 'query', 'queries'],
    answer: 'He works with MongoDB, Oracle Database, SQL and PL/SQL — writing and optimising SQL queries and supporting data validation on the DLL One Source banking platform.',
  },
  {
    topics: ['devops', 'azure', 'pipeline', 'pipelines', 'ci', 'cd', 'ci/cd', 'docker', 'git', 'github', 'deploy', 'testing', 'jest', 'unit'],
    answer: 'He uses Git/GitHub, Azure DevOps and Azure Pipelines for CI/CD, Docker for environments, and Jest for unit testing — and supports releases and production issues.',
  },
  {
    topics: ['hcl', 'abbott', 'healthcare', 'hf cloud', 'drx', 'ehr', 'emr', 'medical', 'technical lead', 'lead'],
    answer: 'At HCL Technologies (Oct 2022 – Jun 2025) he was a Technical Lead for Abbott’s HF Cloud, DRx and EMR/EHR applications — connecting hospitals, clinicians and heart patients. He built treatment plans, templates and dashboards, an EHR portal unifying Abbott apps, and reviewed and approved core-team code.',
  },
  {
    topics: ['leadership', 'leader', 'mentor', 'mentoring', 'review', 'code review', 'team', 'manage'],
    answer: 'He has led front-end delivery as a Technical Lead (HCL) and Team Leader (Cloud Collab), reviewing and approving core-team code, clarifying requirements directly with clients, and mentoring developers.',
  },
  {
    topics: ['mavenir', 'cloud collab', 'telecom', 'ecommerce', 'e-commerce', 'self-care', 'formio', 'form.io', 'strapi'],
    answer: 'At Cloud Collab Technologies (Mar 2021 – Sep 2022) he was a Senior Software Developer and Team Leader for Mavenir, building eCommerce and self-care portal modules from scratch with Angular, dynamic Form.io forms, AG Grid, NgRx, Strapi and Docker.',
  },
  {
    topics: ['zuora', 'saas', 'billing', 'subscription'],
    answer: 'At Zuora (Feb 2017 – Feb 2021) he was a Software Developer II on an enterprise subscription-billing SaaS platform, building Angular features with Angular Material and DevExtreme, writing Jest unit tests, and working on database-driven workflows.',
  },
  {
    topics: ['mind bridges', 'first', 'career start', 'started', 'angularjs', 'ui developer'],
    answer: 'He started his career in July 2014 as a UI Developer at Mind Bridges Technology, building screens and reusable components with HTML, CSS, JavaScript, Bootstrap and AngularJS.',
  },
  {
    topics: ['ai', 'copilot', 'llm', 'rag', 'agentic', 'prompt', 'certification', 'certified', 'certificate'],
    answer: 'He holds the GitHub Copilot – AI-Augmented Software Engineer Professional Certification and uses Copilot daily for code suggestions, debugging, reviews and documentation. He is exploring prompt engineering, LLM applications, RAG, agentic workflows and responsible-AI guardrails.',
  },
  {
    topics: ['domain', 'domains', 'industries', 'industry', 'sectors'],
    answer: 'Four domains: Banking & Financial Services (DLL One Source), Healthcare (Abbott HF Cloud, DRx, EMR/EHR), Telecom (Mavenir customer portal) and SaaS / Billing (Zuora).',
  },
  {
    topics: ['education', 'degree', 'college', 'university', 'study', 'studied', 'qualification', 'cgpa', 'engineering'],
    answer: 'He holds a Bachelor of Engineering in Electrical and Electronics Engineering from Adhiyamaan College of Engineering (2009 – 2013) with an 8.12 CGPA.',
  },
  {
    topics: ['location', 'where', 'based', 'city', 'remote', 'relocate', 'relocation', 'onsite', 'hybrid'],
    answer: 'He is based in Chennai, Tamil Nadu, India, and is comfortable with both remote and in-person collaboration. For specific location arrangements, please reach out directly.',
  },
  {
    topics: ['contact', 'email', 'phone', 'call', 'reach', 'hire', 'linkedin', 'connect'],
    answer: 'You can email mohamednaleem90@gmail.com, call +91 96779 31974, or connect on LinkedIn (linkedin.com/in/mohamed-naleem-5b4591106). The contact form at the bottom of this page works too.',
  },
  {
    topics: ['resume', 'cv', 'download', 'pdf'],
    answer: 'You can download his CV as a PDF using the “Download CV” button in the hero or contact section, or the RESUME link on the right edge of the page.',
  },
  {
    topics: ['strength', 'strengths', 'soft', 'communication', 'why hire', 'why', 'qualities'],
    answer: 'Strong client interaction and requirement clarification, problem-solving, end-to-end delivery ownership, and continuous learning across full-stack, DevOps and AI-assisted engineering — working well independently or in teams.',
  },
  {
    topics: ['available', 'availability', 'notice', 'salary', 'ctc', 'compensation', 'join', 'joining'],
    answer: 'He is open to senior full-stack and technical lead opportunities. Details like availability and compensation are best discussed directly — email mohamednaleem90@gmail.com.',
  },
  {
    topics: ['portfolio', 'site', 'website', 'built', 'how was this'],
    answer: 'This portfolio is built with Angular 19 standalone components and signals, TypeScript and SCSS — with light/dark themes, a command palette (Ctrl + K), scroll-optimised animations, and automated deployment via GitHub Actions to GitHub Pages.',
  },
];

export const SUGGESTED_QUESTIONS = [
  'What is his current role?',
  'Which tech stack does he use?',
  'Tell me about his leadership',
  'Is he AI-certified?',
];
