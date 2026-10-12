import { Component } from '@angular/core';
import {
  LucideArrowUpRight,
  LucideBriefcaseBusiness,
  LucideCode,
  LucideDatabase,
  LucideGraduationCap,
  LucideLayers,
  LucideMail,
  LucideSparkles,
} from '@lucide/angular';

interface Experience {
  role: string;
  company: string;
  context?: string;
  dates: string;
  summary: string;
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
  summary: string;
  skills: string[];
}

@Component({
  selector: 'app-root',
  imports: [
    LucideArrowUpRight,
    LucideBriefcaseBusiness,
    LucideCode,
    LucideDatabase,
    LucideGraduationCap,
    LucideLayers,
    LucideMail,
    LucideSparkles,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly email = 'mohamednaleem90@gmail.com';
  readonly linkedinUrl = 'https://www.linkedin.com/in/mohamed-naleem-5b4591106/';
  readonly currentYear = new Date().getFullYear();

  readonly experiences: Experience[] = [
    {
      role: 'Technical Lead',
      company: 'HCL Technologies',
      context: 'Healthcare applications · Abbott',
      dates: 'Oct 2022 — Present',
      summary: 'Led front-end delivery across HF Cloud, DRx and EHR initiatives. Reviewed and approved core-team code, worked directly with the client, and helped shape clinician-focused treatment plans and a unified patient-records dashboard.',
      technologies: ['Angular', 'RxJS', 'NgRx', 'Angular Material', 'Chart.js', 'WebSocket'],
    },
    {
      role: 'Senior Software Developer · Team Leader',
      company: 'Cloud Collab Technologies',
      context: 'Client: Mavenir Systems',
      dates: 'Mar 2021 — Sep 2022',
      summary: 'Built an end-to-end eCommerce experience and a responsive self-care customer portal, including carousel functionality and dynamic forms.',
      technologies: ['Angular', 'AG Grid', 'DevExtreme', 'NgRx', 'Strapi', 'Docker'],
    },
    {
      role: 'Software Developer II',
      company: 'Zuora',
      dates: 'Feb 2017 — Feb 2021',
      summary: 'Contributed to user-interface development across Angular applications and worked with SQL as part of the product stack.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Angular Material', 'SQL', 'Jest'],
    },
    {
      role: 'UI Developer',
      company: 'Mind Bridges Technology',
      dates: 'Jul 2014 — Jan 2017',
      summary: 'Developed web user interfaces with a focus on clear, usable experiences and a strong foundation in AngularJS and front-end fundamentals.',
      technologies: ['AngularJS', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
    },
  ];

  readonly projects: Project[] = [
    {
      name: 'HF Cloud',
      category: 'Healthcare · HCL Technologies',
      description: 'A care-coordination application connecting hospitals and heart patients around pacemaker implantation workflows.',
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
      name: 'EHR patient portal',
      category: 'Healthcare · HCL Technologies',
      description: 'A dashboard bringing Abbott applications together in one place for access to patient records.',
      contribution: 'Front-end delivery · Application dashboard',
      technologies: ['Angular', 'Angular Material', 'RxJS'],
      theme: 'blue',
      initials: 'EHR',
    },
    {
      name: 'eCommerce & self-care',
      category: 'Customer experience · Mavenir Systems',
      description: 'An eCommerce flow built from scratch alongside a responsive self-care portal with dynamic forms.',
      contribution: 'End-to-end UI development · Responsive forms',
      technologies: ['Angular', 'Form.io', 'AG Grid', 'DevExtreme'],
      theme: 'peach',
      initials: 'CX',
    },
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      title: 'Frontend engineering',
      summary: 'A decade-plus of turning complex product workflows into dependable interfaces.',
      skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'],
    },
    {
      title: 'Application architecture',
      summary: 'Reactive state, reusable UI patterns, and component libraries built to scale.',
      skills: ['RxJS', 'NgRx', 'Angular Material', 'AG Grid', 'DevExtreme', 'Jest'],
    },
    {
      title: 'Full-stack & delivery',
      summary: 'Comfortable working across data, integrations, collaboration, and delivery.',
      skills: ['SQL', 'Strapi', 'Docker', 'WebSocket', 'Git', 'GitHub'],
    },
  ];

  readonly courses = [
    'Angular Material Design',
    'Angular Unit Testing',
    'RxJS',
    'NgRx',
    'Git & GitHub',
    'Strapi (Headless CMS)',
  ];
}
