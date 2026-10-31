import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the portfolio', () => {
    const fixture = TestBed.createComponent(AppComponent);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the introduction and portfolio sections', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('MOHAMED NALEEM');
    expect(compiled.querySelector('#work')).not.toBeNull();
    expect(compiled.querySelector('#experience')).not.toBeNull();
    expect(compiled.querySelector('#toolkit')).not.toBeNull();
    expect(compiled.querySelector('#about')).not.toBeNull();
  });

  it('should show resume-based experience, projects, and technology skills', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const content = compiled.textContent ?? '';

    expect(content).toContain('Cognizant Technology Solutions');
    expect(content).toContain('DLL One Source');
    expect(content).toContain('HCL Technologies');
    expect(content).toContain('Cloud Collab Technologies');
    expect(content).toContain('HF Cloud');
    expect(content).toContain('React');
    expect(content).toContain('TypeScript');
    expect(content).toContain('SQL');
  });

  it('should provide working resume-download, email, and LinkedIn links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.contact-button')?.getAttribute('href'))
      .toBe('mailto:mohamednaleem90@gmail.com');
    const resumeLink = compiled.querySelector('.resume-rail');
    expect(resumeLink?.getAttribute('href')).toBe('Mohamed_Naleem_Resume.pdf');
    expect(resumeLink?.hasAttribute('download')).toBeTrue();
    expect(compiled.querySelector('a[href*="linkedin.com/in/mohamed-naleem"]'))
      .not.toBeNull();
  });

  it('should toggle between dark and light themes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const initial = app.theme();

    app.toggleTheme();
    const toggled = initial === 'dark' ? 'light' : 'dark';
    expect(app.theme()).toBe(toggled);
    expect(document.documentElement.getAttribute('data-theme')).toBe(toggled);

    app.toggleTheme();
    expect(app.theme()).toBe(initial);
  });

  it('should render the theme toggle, mobile menu toggle, and back-to-top button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.theme-toggle')).not.toBeNull();
    expect(compiled.querySelector('.menu-toggle')?.getAttribute('aria-expanded')).toBe('false');
    expect(compiled.querySelector('.back-to-top')).not.toBeNull();
  });

  it('should open the command palette with Ctrl+K', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.paletteOpen()).toBeTrue();
    expect((fixture.nativeElement as HTMLElement).querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('should render case studies, the live lab, notes, and the contact form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#case-studies')).not.toBeNull();
    expect(compiled.querySelector('app-heart-monitor')).not.toBeNull();
    expect(compiled.querySelector('#notes')).not.toBeNull();
    expect(compiled.querySelector('app-contact-form form')).not.toBeNull();
    expect(compiled.querySelector('#testimonials')).toBeNull();
  });
});
