import { Component } from '@angular/core';
import {
  LucideArrowUpRight,
  LucideAward,
  LucideBrainCircuit,
  LucideBriefcaseBusiness,
  LucideCircleCheck,
  LucideCode,
  LucideDatabase,
  LucideGraduationCap,
  LucideHeartPulse,
  LucideLandmark,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideRadioTower,
  LucideReceipt,
  LucideServer,
  LucideSparkles,
  LucideUsers,
  LucideWorkflow,
} from '@lucide/angular';

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
    LucideArrowUpRight,
    LucideAward,
    LucideBrainCircuit,
    LucideBriefcaseBusiness,
    LucideCircleCheck,
    LucideCode,
    LucideDatabase,
    LucideGraduationCap,
    LucideHeartPulse,
    LucideLandmark,
    LucideMail,
    LucideMapPin,
    LucidePhone,
    LucideRadioTower,
    LucideReceipt,
    LucideServer,
    LucideSparkles,
    LucideUsers,
    LucideWorkflow,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly email = 'mohamednaleem90@gmail.com';
  readonly linkedinUrl = 'https://www.linkedin.com/in/mohamed-naleem-5b4591106/';
  readonly phones = [
    { label: '+91 96779 31974', href: 'tel:+919677931974' },
    { label: '+91 82484 78405', href: 'tel:+918248778405' },
  ];
  readonly currentYear = new Date().getFullYear();

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
    },
    {
      name: 'HF Cloud',
      category: 'Healthcare · HCL Technologies',
      description: 'A care-coordination platform connecting hospitals, clinicians, and heart patients around treatment and device workflows.',
      contribution: 'Technical lead · Core-team code reviews · Client collaboration',
      technologies: ['Angular', 'RxJS', 'NgRx', 'Angular Material'],
      theme: 'mint',
      initials: 'HF',
    },
    {
      name: 'DRx',
      category: 'Clinical tools · HCL Technologies',
      description: 'Clinician workflows with dynamic treatment plans and reusable templates, designed to support day-to-day patient care.',
      contribution: 'Technical lead · Treatment plans · Client collaboration',
      technologies: ['Angular', 'TypeScript', 'NgRx', 'Chart.js'],
      theme: 'lavender',
      initials: 'DR',
    },
    {
      name: 'EMR / EHR dashboard',
      category: 'Healthcare · HCL Technologies',
      description: 'A unified portal bringing multiple Abbott application views together for a single view of patient records.',
      contribution: 'Front-end delivery · Unified dashboard architecture',
      technologies: ['Angular', 'Angular Material', 'RxJS'],
      theme: 'blue',
      initials: 'EHR',
    },
    {
      name: 'eCommerce & self-care',
      category: 'Customer experience · Mavenir Systems',
      description: 'An eCommerce flow built from scratch alongside a responsive self-care portal with dynamic forms.',
      contribution: 'End-to-end UI development · Responsive forms',
      technologies: ['Angular', 'Form.io', 'AG Grid', 'Strapi'],
      theme: 'peach',
      initials: 'CX',
    },
    {
      name: 'Subscription billing UI',
      category: 'Enterprise SaaS · Zuora',
      description: 'Feature development for an enterprise subscription-billing platform with data-rich grids and workflows.',
      contribution: 'Feature delivery · UI enhancements · Unit testing',
      technologies: ['Angular', 'DevExtreme', 'RxJS', 'Jest'],
      theme: 'slate',
      initials: 'ZU',
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
}
