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

  it('should provide working resume-request, email, and LinkedIn links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.contact-button')?.getAttribute('href'))
      .toBe('mailto:mohamednaleem90@gmail.com');
    expect(compiled.querySelector('.resume-rail')?.getAttribute('href'))
      .toContain('subject=Resume%20request');
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
});
