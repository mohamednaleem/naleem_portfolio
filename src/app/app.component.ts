import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
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

@Component({
  selector: 'app-root',
  imports: [
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
  private toastTimer?: ReturnType<typeof setTimeout>;

  readonly email = 'mohamednaleem90@gmail.com';
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
    { id: 'experience', label: 'Experience' },
    { id: 'toolkit', label: 'Skills' },
    { id: 'domains', label: 'Domains' },
    { id: 'contact', label: 'Contact' },
  ];

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
  readonly scrollProgress = signal(0);
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
      this.onWindowScroll();
      this.observeReveals();
      this.observeSections();
      this.startPhraseRotation();
    });

    this.destroyRef.onDestroy(() => {
      clearTimeout(this.toastTimer);
      clearInterval(this.tabTimer);
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const view = this.document.defaultView;
    if (!view) return;

    const scrollTop = view.scrollY;
    const scrollable = this.document.documentElement.scrollHeight - view.innerHeight;

    this.isScrolled.set(scrollTop > 24);
    this.showBackToTop.set(scrollTop > 600);
    this.scrollProgress.set(scrollable > 0 ? Math.min(1, scrollTop / scrollable) : 0);
  }

  @HostListener('document:keydown.escape')
  closeMenu(): void {
    this.menuOpen.set(false);
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

  onCardPointerMove(event: PointerEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  selectTab(index: number): void {
    clearInterval(this.tabTimer);
    this.activeTab.set(index);
  }

  onTiltMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || this.prefersReducedMotion()) return;

    const stage = event.currentTarget as HTMLElement;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
    stage.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
  }

  onTiltLeave(event: PointerEvent): void {
    const stage = event.currentTarget as HTMLElement;
    stage.style.setProperty('--ry', '0deg');
    stage.style.setProperty('--rx', '0deg');
  }

  private readInitialTheme(): Theme {
    return this.document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
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
