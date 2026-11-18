import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { ThemeService } from './core/theme.service';
import { CLINIC, DOCTORS, SERVICES } from './core/site-data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the clinic name and phone number in the header and footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('EyeVitality');
    expect(text).toContain(CLINIC.phone);
  });
});

describe('ThemeService', () => {
  it('toggles between normal and dark mode', () => {
    const theme = TestBed.inject(ThemeService);
    const start = theme.mode();
    theme.toggle();
    expect(theme.mode()).not.toBe(start);
    expect(document.documentElement.getAttribute('data-theme')).toBe(theme.mode());
  });
});

describe('site data', () => {
  it('has complete doctor and service records', () => {
    expect(DOCTORS.length).toBe(3);
    expect(SERVICES.length).toBe(6);
    for (const s of SERVICES) expect(s.image).toMatch(/^images\//);
    for (const d of DOCTORS) expect(d.focus.length).toBeGreaterThan(0);
  });
});
