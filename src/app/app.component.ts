import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  NgZone,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  LucideArrowUp,
  LucideArrowUpRight,
  LucideAward,
  LucideBrainCircuit,
  LucideBriefcaseBusiness,
  LucideCheck,
  LucideCircleCheck,
  LucideCode,
  LucideCopy,
  LucideDatabase,
  LucideDownload,
  LucideGraduationCap,
  LucideHeartPulse,
  LucideLandmark,
  LucideLayoutDashboard,
  LucideMail,
  LucideMapPin,
  LucideMenu,
  LucideMoon,
  LucidePhone,
  LucideRadioTower,
  LucideReceipt,
  LucideServer,
  LucideShoppingCart,
  LucideSparkles,
  LucideStethoscope,
  LucideSun,
  LucideUsers,
  LucideWorkflow,
  LucideX,
} from '@lucide/angular';
import {
  LucideBookOpen,
  LucideChevronDown,
  LucideFlaskConical,
  LucideLightbulb,
  LucideQuote,
  LucideSearch,
  LucideTarget,
  LucideTrendingUp,
} from '@lucide/angular';
import { AssistantComponent } from './features/assistant/assistant.component';
import { CommandPaletteComponent, PaletteCommand } from './features/command-palette/command-palette.component';
import { ContactFormComponent } from './features/contact-form/contact-form.component';
import { HeartMonitorComponent } from './features/heart-monitor/heart-monitor.component';

type Theme = 'dark' | 'light';
type TokenKind = 'key' | 'string' | 'keyword' | 'number' | 'punct' | 'comment' | 'plain';

interface CodeToken {
  text: string;
  kind: TokenKind;
}

interface CodeTab {
  file: string;
  language: string;
  lines: CodeToken[][];
}

const THEME_STORAGE_KEY = 'naleem.theme';
const THEME_COLORS: Record<Theme, string> = { dark: '#09080d', light: '#f8f6fc' };
const TOKEN_PATTERN = /(\/\/.*$)|("[^"]*"(?=\s*:))|('[^']*'|"[^"]*")|\b(const|true|false)\b|\b(\d+)\b|([A-Za-z_$][\w$]*)(?=\s*:)|([{}[\]().,;:])/g;

// Splits a line of code into tokens for lightweight, markup-free syntax highlighting.
function tokenize(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let cursor = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ text: line.slice(cursor, index), kind: 'plain' });

    const kind: TokenKind = match[1] ? 'comment'
      : match[2] || match[6] ? 'key'
      : match[3] ? 'string'
      : match[4] ? 'keyword'
      : match[5] ? 'number'
      : 'punct';
    tokens.push({ text: match[0], kind });
    cursor = index + match[0].length;
  }

  if (cursor < line.length) tokens.push({ text: line.slice(cursor), kind: 'plain' });
  return tokens;
}

function codeTab(file: string, language: string, source: string[]): CodeTab {
  return { file, language, lines: source.map(tokenize) };
}

interface Experience {
  role: string;
  company: string;
  location: string;
  context?: string;
  dates: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  technologies: string[];
}

interface Project {
  name: string;
  category: string;
  description: string;
  contribution: string;
  technologies: string[];
  theme: string;
  initials: string;
  role: string;
  icon: 'bank' | 'heart' | 'clinic' | 'dashboard' | 'cart' | 'billing';
  flow: string[];
}

interface SkillGroup {
  title: string;
  icon: 'code' | 'server' | 'database' | 'workflow' | 'ai' | 'team';
  summary: string;
  skills: string[];
}

interface Domain {
  name: string;
  icon: 'bank' | 'health' | 'telecom' | 'billing';
  detail: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  role: string;
  period: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  flow: string[];
  stack: string[];
}

interface Note {
  title: string;
  tag: string;
  summary: string;
  points: string[];
  code?: string;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

@Component({
  selector: 'app-root',
  imports: [
    AssistantComponent,
    CommandPaletteComponent,
    ContactFormComponent,
    HeartMonitorComponent,
    LucideBookOpen,
    LucideChevronDown,
    LucideFlaskConical,
    LucideLightbulb,
    LucideQuote,
    LucideSearch,
    LucideTarget,
    LucideTrendingUp,
    LucideArrowUp,
    LucideArrowUpRight,
    LucideAward,
    LucideBrainCircuit,
    LucideBriefcaseBusiness,
    LucideCheck,
    LucideCircleCheck,
    LucideCode,
    LucideCopy,
    LucideDatabase,
    LucideDownload,
    LucideGraduationCap,
    LucideHeartPulse,
    LucideLandmark,
    LucideLayoutDashboard,
    LucideMail,
    LucideMapPin,
    LucideMenu,
    LucideMoon,
    LucidePhone,
    LucideRadioTower,
    LucideReceipt,
    LucideServer,
    LucideShoppingCart,
    LucideSparkles,
    LucideStethoscope,
    LucideSun,
    LucideUsers,
    LucideWorkflow,
    LucideX,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);
  private toastTimer?: ReturnType<typeof setTimeout>;

  readonly email = 'mohamednaleem90@gmail.com';
  readonly resumeUrl = 'Mohamed_Naleem_Resume.pdf';
  readonly repoUrl = 'https://github.com/mohamednaleem/naleem_portfolio';
  readonly certificationUrl = 'https://learn.microsoft.com/en-us/users/naleemmohamedcognizant-5200/credentials?tab=credentials-tab';
  readonly labSourceUrl = 'https://github.com/mohamednaleem/naleem_portfolio/tree/main/src/app/features/heart-monitor';
  /** Set to e.g. 'profile.jpg' after adding the photo to public/ to show it in the About section. */
  readonly photoUrl: string | null = null;
  /** Set to a Formspree endpoint (https://formspree.io/f/xxxx) to receive messages without opening a mail app. */
  readonly formEndpoint = '';
  readonly linkedinUrl = 'https://www.linkedin.com/in/mohamed-naleem-5b4591106/';
  readonly phones = [
    { label: '+91 96779 31974', href: 'tel:+919677931974' },
    { label: '+91 82484 78405', href: 'tel:+918248778405' },
  ];
  readonly currentYear = new Date().getFullYear();
  readonly ringCircumference = 2 * Math.PI * 21;

  readonly navLinks = [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'labs', label: 'Labs' },
    { id: 'experience', label: 'Experience' },
    { id: 'toolkit', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  readonly paletteOpen = signal(false);
  readonly assistantOpen = signal(false);

  readonly paletteCommands: PaletteCommand[] = [
    { id: 'go-about', group: 'Navigate', label: 'About', keywords: 'intro home top', run: () => this.goTo('about') },
    { id: 'go-work', group: 'Navigate', label: 'Selected work', keywords: 'projects portfolio', run: () => this.goTo('work') },
    { id: 'go-case', group: 'Navigate', label: 'Case studies', keywords: 'dll ehr story', run: () => this.goTo('case-studies') },
    { id: 'go-labs', group: 'Navigate', label: 'Labs · Heart-failure monitoring demo', keywords: 'demo live healthcare abbott chart', run: () => this.goTo('labs') },
    { id: 'go-experience', group: 'Navigate', label: 'Experience', keywords: 'career timeline jobs', run: () => this.goTo('experience') },
    { id: 'go-skills', group: 'Navigate', label: 'Skills & toolkit', keywords: 'tech stack', run: () => this.goTo('toolkit') },
    { id: 'go-domains', group: 'Navigate', label: 'Domains & AI', keywords: 'industries copilot', run: () => this.goTo('domains') },
    { id: 'go-education', group: 'Navigate', label: 'Education', keywords: 'degree certification', run: () => this.goTo('education') },
    { id: 'go-notes', group: 'Navigate', label: 'Engineering notes', keywords: 'blog til learned', run: () => this.goTo('notes') },
    { id: 'go-contact', group: 'Navigate', label: 'Contact', keywords: 'hire message', run: () => this.goTo('contact') },
    { id: 'cv', group: 'Actions', label: 'Download CV (PDF)', keywords: 'resume', run: () => this.downloadResume() },
    { id: 'ask', group: 'Actions', label: 'Ask the assistant about me', keywords: 'chat ai bot', run: () => this.assistantOpen.set(true) },
    { id: 'theme', group: 'Actions', label: 'Toggle light / dark theme', keywords: 'mode appearance', run: () => this.toggleTheme() },
    { id: 'copy', group: 'Actions', label: 'Copy email address', hint: this.email, keywords: 'contact', run: () => void this.copyEmail() },
    { id: 'mail', group: 'Links', label: 'Send an email', hint: this.email, run: () => this.openLink(`mailto:${this.email}`) },
    { id: 'linkedin', group: 'Links', label: 'Open LinkedIn profile', run: () => this.openLink(this.linkedinUrl, true) },
    { id: 'source', group: 'Links', label: 'View this site’s source on GitHub', keywords: 'code repo', run: () => this.openLink(this.repoUrl, true) },
  ];

  readonly caseStudies: CaseStudy[] = [
    {
      id: 'dll',
      title: 'DLL One Source — enterprise banking workflows',
      client: 'DLL (De Lage Landen) · Cognizant',
      role: 'MERN Stack Developer',
      period: '2025 — Present',
      challenge: 'Business users rely on DLL One Source for day-to-day banking workflows. Features must stay responsive in the UI while reading and writing consistent data across both MongoDB and Oracle.',
      approach: [
        'Built responsive, component-driven React.js screens with TypeScript and Bootstrap.',
        'Implemented and supported Node.js / Express.js REST APIs that integrate MongoDB and Oracle.',
        'Wrote and optimised SQL queries and supported data validation across environments.',
        'Used GitHub Copilot for faster scaffolding, debugging and documentation — with every suggestion reviewed.',
      ],
      outcomes: [
        'Features shipped through peer-reviewed pull requests and Azure DevOps CI/CD pipelines.',
        'Defects resolved and releases supported as part of an Agile delivery team.',
      ],
      flow: ['React.js UI', 'Express REST API', 'MongoDB + Oracle'],
      stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Oracle', 'SQL', 'Azure DevOps', 'GitHub Copilot'],
    },
    {
      id: 'ehr',
      title: 'EMR / EHR dashboard — one portal for patient records',
      client: 'Abbott · HCL Technologies',
      role: 'Technical Lead',
      period: '2022 — 2025',
      challenge: 'Clinicians worked across several Abbott applications to reach patient information. The goal was a single, consistent view of patient records inside one portal.',
      approach: [
        'Designed an Angular portal that brings multiple Abbott application views together.',
        'Managed shared state with NgRx and RxJS, and built reusable Angular Material components.',
        'Ran requirement-clarification sessions directly with the client.',
        'Reviewed and approved core-team code to keep quality consistent across modules.',
      ],
      outcomes: [
        'A unified portal giving clinicians one place to access patient records.',
        'Reusable modules and templates shared with the HF Cloud and DRx applications.',
      ],
      flow: ['Abbott apps', 'Unified Angular portal', 'Patient records'],
      stack: ['Angular', 'NgRx', 'RxJS', 'Angular Material', 'Chart.js', 'WebSocket'],
    },
  ];

  readonly notes: Note[] = [
    {
      title: 'Signals for local UI state',
      tag: 'Angular',
      summary: 'Why I reach for signals before subscriptions in modern Angular.',
      points: [
        'computed() derives values automatically — no manual subscribe / unsubscribe.',
        'Only templates that read a signal are updated, keeping change detection cheap.',
        'Keep RxJS for async streams and bridge with toSignal() where needed.',
      ],
      code: 'readonly threshold = signal(2);\nreadonly alerts = computed(() =>\n  readings().filter((r) => r.gain3d > this.threshold()));',
    },
    {
      title: 'Choosing the right RxJS flattening operator',
      tag: 'RxJS',
      summary: 'Four operators, four very different behaviours.',
      points: [
        'switchMap — search / typeahead: cancel stale requests.',
        'exhaustMap — submit buttons: ignore double clicks while saving.',
        'concatMap — ordered writes: run requests one after another.',
        'mergeMap — independent work that can run in parallel.',
      ],
    },
    {
      title: 'Getting real value from GitHub Copilot',
      tag: 'AI',
      summary: 'Habits that make AI pair-programming productive and safe.',
      points: [
        'State the intent first — a clear comment or signature gives better suggestions.',
        'Treat every suggestion like a code review: logic, edge cases and security.',
        'Lean on it for tests and boilerplate; keep design decisions human.',
        'Never paste secrets or client data into prompts.',
      ],
    },
    {
      title: 'Keeping scroll effects smooth',
      tag: 'Performance',
      summary: 'Lessons from building this portfolio.',
      points: [
        'Run scroll listeners outside NgZone and throttle them with requestAnimationFrame.',
        'Drive progress indicators with CSS variables instead of template bindings.',
        'Avoid animating blurred elements — soft gradients look the same and cost far less.',
      ],
    },
  ];

  /** Add real quotes (with permission) to show the Testimonials section. */
  readonly testimonials: Testimonial[] = [];

  readonly stats = [
    { value: '12', suffix: '+', label: 'YEARS IN SOFTWARE' },
    { value: '5', suffix: '', label: 'COMPANIES' },
    { value: '4', suffix: '', label: 'INDUSTRY DOMAINS' },
    { value: 'Full', suffix: '-stack', label: 'ANGULAR · REACT · NODE' },
  ];

  readonly companies = ['Cognizant', 'DLL', 'HCL Technologies', 'Abbott', 'Mavenir', 'Zuora'];

  readonly codeTabs: CodeTab[] = [
    codeTab('naleem.ts', 'TypeScript', [
      'const developer = {',
      "  name: 'Mohamed Naleem',",
      "  role: 'Senior Full Stack Developer',",
      "  experience: '12+ years',",
      "  stack: ['Angular', 'React', 'Node.js'],",
      "  domains: ['Banking', 'Healthcare', 'SaaS'],",
      "  location: 'Chennai, India',",
      '  openToWork: true,',
      '};',
    ]),
    codeTab('stack.json', 'JSON', [
      '{',
      '  "frontend": ["Angular", "React", "TypeScript"],',
      '  "backend": ["Node.js", "Express", "REST"],',
      '  "database": ["MongoDB", "Oracle", "SQL"],',
      '  "devops": ["Azure DevOps", "Docker", "Git"],',
      '  "ai": ["GitHub Copilot", "Prompting"]',
      '}',
    ]),
    codeTab('career.ts', 'TypeScript', [
      'const career = timeline()',
      "  .at(2025, 'Cognizant')    // Senior Associate",
      "  .at(2022, 'HCL Tech')     // Technical Lead",
      "  .at(2021, 'CloudCollab')  // Team Leader",
      "  .at(2017, 'Zuora')        // Software Dev II",
      "  .at(2014, 'MindBridges')  // UI Developer",
      '  .build();',
    ]),
  ];

  readonly rotatingPhrases = [
    'enterprise banking platforms.',
    'healthcare applications.',
    'REST APIs with Node.js.',
    'data-rich dashboards.',
    'customer self-service portals.',
  ];

  readonly theme = signal<Theme>(this.readInitialTheme());
  readonly isScrolled = signal(false);
  readonly showBackToTop = signal(false);
  readonly activeSection = signal('about');
  readonly menuOpen = signal(false);
  readonly emailCopied = signal(false);
  readonly toast = signal('');
  private readonly phraseIndex = signal(0);
  readonly currentPhrase = computed(() => this.rotatingPhrases[this.phraseIndex()]);
  readonly activeTab = signal(0);
  readonly currentTab = computed(() => this.codeTabs[this.activeTab()]);
  private tabTimer?: ReturnType<typeof setInterval>;

  readonly experiences: Experience[] = [
    {
      role: 'Senior Associate — Projects',
      company: 'Cognizant Technology Solutions',
      location: 'Chennai, TN',
      context: 'Client: DLL (De Lage Landen) · Banking & Financial Services',
      dates: 'Jul 2025 — Present',
      current: true,
      summary: 'MERN stack developer on DLL One Source, an enterprise banking application that powers business workflows for DLL.',
      highlights: [
        'Develop and enhance responsive user interfaces with React.js, TypeScript, HTML, CSS, and Bootstrap.',
        'Build and support RESTful APIs in Node.js and Express.js, integrating with MongoDB and Oracle databases.',
        'Write and optimise SQL queries, support data validation, and collaborate on backend and database changes.',
        'Use GitHub Copilot for AI-assisted coding, debugging, and documentation to raise team productivity.',
        'Contribute to Agile ceremonies, code reviews, defect fixes, release support, and Azure DevOps pipelines.',
      ],
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Oracle', 'SQL', 'TypeScript', 'Azure DevOps', 'GitHub Copilot'],
    },
    {
      role: 'Technical Lead',
      company: 'HCL Technologies',
      location: 'Chennai, TN',
      context: 'Client: Abbott · Healthcare & Medical Applications',
      dates: 'Oct 2022 — Jun 2025',
      summary: 'Led front-end delivery for HF Cloud, DRx, and EMR/EHR applications connecting hospitals, clinicians, and heart patients.',
      highlights: [
        'Developed healthcare applications supporting treatment and device-related workflows for heart patients.',
        'Created dynamic treatment plans, reusable templates, and dashboard modules for clinical users.',
        'Built an EHR dashboard unifying multiple Abbott application views into a single patient-records portal.',
        'Reviewed and approved core-team code, drove quality improvements, and clarified requirements with the client.',
      ],
      technologies: ['Angular', 'Angular Material', 'RxJS', 'NgRx', 'Chart.js', 'WebSocket', 'Bootstrap'],
    },
    {
      role: 'Senior Software Developer — Team Leader',
      company: 'Cloud Collab Technologies',
      location: 'Bangalore, KA',
      context: 'Client: Mavenir Systems · Telecom Customer Self-Service',
      dates: 'Mar 2021 — Sep 2022',
      summary: 'Led UI development for telecom eCommerce and customer self-care portals built from the ground up.',
      highlights: [
        'Developed eCommerce and self-care portal modules with responsive layouts and carousel functionality from scratch.',
        'Implemented dynamic, configurable forms with the Form.io library for an enterprise-grade user experience.',
        'Integrated AG Grid and reusable UI components, with Strapi as a headless CMS and Docker-based environments.',
      ],
      technologies: ['Angular', 'Angular Material', 'AG Grid', 'RxJS', 'NgRx', 'Form.io', 'Strapi', 'Docker'],
    },
    {
      role: 'Software Developer II',
      company: 'Zuora',
      location: 'Chennai, TN',
      context: 'Subscription Billing · Enterprise SaaS',
      dates: 'Feb 2017 — Feb 2021',
      summary: 'Four years building features for an enterprise subscription-billing SaaS platform used by global businesses.',
      highlights: [
        'Developed and maintained enterprise web application features using Angular and modern UI libraries.',
        'Delivered UI enhancements, unit tests with Jest, and issue fixes across database-driven workflows.',
      ],
      technologies: ['Angular', 'JavaScript', 'Angular Material', 'DevExtreme', 'RxJS', 'Jest', 'SQL', 'Git'],
    },
    {
      role: 'UI Developer',
      company: 'Mind Bridges Technology',
      location: 'Chennai, TN',
      dates: 'Jul 2014 — Jan 2017',
      summary: 'Built a strong foundation in front-end engineering, delivering screens and reusable components for client applications.',
      highlights: [
        'Built web application screens and reusable UI components with HTML, CSS, JavaScript, Bootstrap, and AngularJS.',
        'Supported implementation, defect fixing, and user-interface improvements for client projects.',
      ],
      technologies: ['AngularJS', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
    },
  ];

  readonly projects: Project[] = [
    {
      name: 'DLL One Source',
      category: 'Banking & Financial Services · Cognizant',
      description: 'An enterprise banking application supporting business workflows for DLL, backed by REST APIs over MongoDB and Oracle.',
      contribution: 'MERN stack development · REST APIs · SQL optimisation · Azure CI/CD',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Oracle'],
      theme: 'gold',
      initials: 'DLL',
      role: 'Full Stack Developer',
      icon: 'bank',
      flow: ['React.js', 'Express API', 'MongoDB / Oracle'],
    },
    {
      name: 'HF Cloud',
      category: 'Healthcare · HCL Technologies',
      description: 'A care-coordination platform connecting hospitals, clinicians, and heart patients around treatment and device workflows.',
      contribution: 'Technical lead · Core-team code reviews · Client collaboration',
      technologies: ['Angular', 'RxJS', 'NgRx', 'Angular Material'],
      theme: 'mint',
      initials: 'HF',
      role: 'Technical Lead',
      icon: 'heart',
      flow: ['Angular', 'NgRx Store', 'WebSocket'],
    },
    {
      name: 'DRx',
      category: 'Clinical tools · HCL Technologies',
      description: 'Clinician workflows with dynamic treatment plans and reusable templates, designed to support day-to-day patient care.',
      contribution: 'Technical lead · Treatment plans · Client collaboration',
      technologies: ['Angular', 'TypeScript', 'NgRx', 'Chart.js'],
      theme: 'lavender',
      initials: 'DR',
      role: 'Technical Lead',
      icon: 'clinic',
      flow: ['Templates', 'Treatment Plans', 'Chart.js'],
    },
    {
      name: 'EMR / EHR dashboard',
      category: 'Healthcare · HCL Technologies',
      description: 'A unified portal bringing multiple Abbott application views together for a single view of patient records.',
      contribution: 'Front-end delivery · Unified dashboard architecture',
      technologies: ['Angular', 'Angular Material', 'RxJS'],
      theme: 'blue',
      initials: 'EHR',
      role: 'Technical Lead',
      icon: 'dashboard',
      flow: ['Abbott Apps', 'Unified Portal', 'Patient Records'],
    },
    {
      name: 'eCommerce & self-care',
      category: 'Customer experience · Mavenir Systems',
      description: 'An eCommerce flow built from scratch alongside a responsive self-care portal with dynamic forms.',
      contribution: 'End-to-end UI development · Responsive forms',
      technologies: ['Angular', 'Form.io', 'AG Grid', 'Strapi'],
      theme: 'peach',
      initials: 'CX',
      role: 'Team Leader',
      icon: 'cart',
      flow: ['Angular', 'Form.io', 'Strapi CMS'],
    },
    {
      name: 'Subscription billing UI',
      category: 'Enterprise SaaS · Zuora',
      description: 'Feature development for an enterprise subscription-billing platform with data-rich grids and workflows.',
      contribution: 'Feature delivery · UI enhancements · Unit testing',
      technologies: ['Angular', 'DevExtreme', 'RxJS', 'Jest'],
      theme: 'slate',
      initials: 'ZU',
      role: 'Software Developer II',
      icon: 'billing',
      flow: ['Angular', 'DevExtreme', 'Billing APIs'],
    },
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      title: 'Front-end',
      icon: 'code',
      summary: 'Twelve years turning complex workflows into responsive, dependable interfaces.',
      skills: ['Angular', 'React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Angular Material', 'RxJS', 'NgRx', 'AG Grid', 'DevExtreme'],
    },
    {
      title: 'Backend & APIs',
      icon: 'server',
      summary: 'Designing and supporting RESTful services and integrations across systems.',
      skills: ['Node.js', 'Express.js', 'REST API development', 'API integration', 'Microservices exposure'],
    },
    {
      title: 'Databases',
      icon: 'database',
      summary: 'Document and relational data, from schema work to query optimisation.',
      skills: ['MongoDB', 'Oracle Database', 'SQL', 'PL/SQL'],
    },
    {
      title: 'DevOps & Tools',
      icon: 'workflow',
      summary: 'Version control, automated pipelines, containers, and testing.',
      skills: ['Git', 'GitHub', 'Azure DevOps', 'Azure Pipelines', 'CI/CD', 'Docker', 'Jest'],
    },
    {
      title: 'AI-assisted engineering',
      icon: 'ai',
      summary: 'Using AI pair-programming responsibly to ship faster with quality.',
      skills: ['GitHub Copilot', 'Prompt engineering', 'LLM concepts', 'RAG', 'Agentic workflows'],
    },
    {
      title: 'Ways of working',
      icon: 'team',
      summary: 'Delivery ownership from requirement clarification to production support.',
      skills: ['Agile / Scrum', 'Code review', 'Unit testing', 'Production support', 'Client communication', 'Mentoring'],
    },
  ];

  readonly domains: Domain[] = [
    { name: 'Banking & Financial Services', icon: 'bank', detail: 'DLL One Source enterprise banking application' },
    { name: 'Healthcare', icon: 'health', detail: 'Abbott HF Cloud, DRx, and EMR/EHR platforms' },
    { name: 'Telecom', icon: 'telecom', detail: 'Mavenir eCommerce and customer self-care portal' },
    { name: 'SaaS & Billing', icon: 'billing', detail: 'Zuora enterprise subscription-billing applications' },
  ];

  readonly aiHighlights = [
    'Hands-on with GitHub Copilot for code suggestions, debugging, code-review support, and documentation.',
    'Exploring prompt engineering, LLM-based applications, RAG, agentic workflows, and AI-enabled automation.',
    'Applying responsible-AI guardrails while upskilling in AI-native software engineering practices.',
  ];

  readonly courses = [
    'Angular Material Design',
    'Angular Unit Testing',
    'RxJS',
    'NgRx',
    'Git & GitHub',
    'Strapi Headless CMS',
  ];

  readonly strengths = [
    'Works independently and in teams, across remote and in-person collaboration.',
    'Strong client interaction, requirement clarification, and problem-solving.',
    'Takes ownership of delivery, from build through release and production support.',
    'Continuously upskilling across full-stack, DevOps, and AI-assisted engineering.',
  ];

  constructor() {
    this.applyTheme(this.theme());

    afterNextRender(() => {
      this.trackScroll();
      this.bindPointerEffects();
      this.observeReveals();
      this.observeSections();
      this.startPhraseRotation();
    });

    this.destroyRef.onDestroy(() => {
      clearTimeout(this.toastTimer);
      clearInterval(this.tabTimer);
    });
  }

  @HostListener('document:keydown.escape')
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:keydown', ['$event'])
  onShortcut(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.menuOpen.set(false);
      this.paletteOpen.update((open) => !open);
    }
  }

  openPalette(): void {
    this.menuOpen.set(false);
    this.paletteOpen.set(true);
  }

  goTo(id: string): void {
    this.document.getElementById(id)?.scrollIntoView({ behavior: this.prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  downloadResume(): void {
    const link = this.document.createElement('a');
    link.href = this.resumeUrl;
    link.download = this.resumeUrl;
    link.click();
  }

  private openLink(url: string, newTab = false): void {
    if (newTab) {
      this.document.defaultView?.open(url, '_blank', 'noopener,noreferrer');
    } else {
      this.document.location.href = url;
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  toggleTheme(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.applyTheme(next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch (error) {
      console.warn('Theme preference could not be saved.', error);
    }
  }

  scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: this.prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.emailCopied.set(true);
      this.showToast('Email address copied to clipboard');
    } catch {
      this.showToast(`Copy unavailable \u2014 email: ${this.email}`);
    }
  }

  selectTab(index: number): void {
    clearInterval(this.tabTimer);
    this.activeTab.set(index);
  }

  // Scroll work runs outside Angular, once per frame; change detection only runs when a flag flips.
  private trackScroll(): void {
    const view = this.document.defaultView;
    if (!view) return;

    const host = this.host.nativeElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop = view.scrollY;
      const scrollable = this.document.documentElement.scrollHeight - view.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, scrollTop / scrollable) : 0;
      host.style.setProperty('--scroll-progress', progress.toFixed(4));

      const scrolled = scrollTop > 24;
      const showTop = scrollTop > 600;
      if (scrolled !== this.isScrolled() || showTop !== this.showBackToTop()) {
        this.zone.run(() => {
          this.isScrolled.set(scrolled);
          this.showBackToTop.set(showTop);
        });
      }
    };

    const onScroll = () => {
      if (!frame) frame = view.requestAnimationFrame(update);
    };

    this.zone.runOutsideAngular(() => view.addEventListener('scroll', onScroll, { passive: true }));
    update();

    this.destroyRef.onDestroy(() => {
      view.removeEventListener('scroll', onScroll);
      if (frame) view.cancelAnimationFrame(frame);
    });
  }

  // Mouse-follow effects only touch CSS variables, so they stay outside change detection.
  private bindPointerEffects(): void {
    const root = this.host.nativeElement;
    const reducedMotion = this.prefersReducedMotion();

    const listen = (element: HTMLElement, type: 'pointermove' | 'pointerleave', handler: (event: PointerEvent) => void) => {
      element.addEventListener(type, handler, { passive: true });
      this.destroyRef.onDestroy(() => element.removeEventListener(type, handler));
    };

    this.zone.runOutsideAngular(() => {
      root.querySelectorAll<HTMLElement>('.spotlight').forEach((card) => {
        listen(card, 'pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
          card.style.setProperty('--my', `${event.clientY - rect.top}px`);
        });
      });

      const stage = root.querySelector<HTMLElement>('.code-stage');
      if (!stage || reducedMotion) return;

      listen(stage, 'pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        stage.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
        stage.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
      });
      listen(stage, 'pointerleave', () => {
        stage.style.setProperty('--ry', '0deg');
        stage.style.setProperty('--rx', '0deg');
      });
    });
  }

  private readInitialTheme(): Theme {
    return this.document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    const root = this.document.documentElement;
    root.setAttribute('data-theme', theme);
    this.document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  }

  private showToast(message: string): void {
    this.toast.set(message);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toast.set('');
      this.emailCopied.set(false);
    }, 2600);
  }

  private prefersReducedMotion(): boolean {
    return this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  private observeReveals(): void {
    const elements = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('.reveal'));

    if (this.prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    elements.forEach((element) => observer.observe(element));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private observeSections(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const navIds = new Set(this.navLinks.map((link) => link.id));
    const sections = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('section[id]'))
      .filter((section) => navIds.has(section.id));

    // A thin band near the upper-middle of the viewport decides the active section.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) this.activeSection.set(entry.target.id);
      }
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach((section) => observer.observe(section));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private startPhraseRotation(): void {
    if (this.prefersReducedMotion()) return;

    const timer = setInterval(() => {
      this.phraseIndex.update((index) => (index + 1) % this.rotatingPhrases.length);
    }, 2800);
    this.destroyRef.onDestroy(() => clearInterval(timer));

    // Auto-cycles the code tabs until the visitor picks one.
    this.tabTimer = setInterval(() => {
      this.activeTab.update((index) => (index + 1) % this.codeTabs.length);
    }, 6500);
  }
}
