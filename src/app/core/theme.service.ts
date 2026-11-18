import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
const STORAGE_KEY = 'ev_theme';

/** Normal (light) and dark mode. Remembers the visitor's choice. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly mode = signal<ThemeMode>('light');
  readonly label = computed(() =>
    this.mode() === 'dark' ? 'Switch to normal mode' : 'Switch to dark mode'
  );

  constructor() {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage can be blocked; ignore */
    }
    const prefersDark =
      typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
    this.apply(saved === 'dark' || saved === 'light' ? saved : prefersDark ? 'dark' : 'light');
  }

  toggle(): void {
    const next: ThemeMode = this.mode() === 'dark' ? 'light' : 'dark';
    this.apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  private apply(mode: ThemeMode): void {
    this.mode.set(mode);
    this.doc.documentElement.setAttribute('data-theme', mode);
  }
}
