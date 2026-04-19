import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  public readonly theme = signal<ThemeMode>('dark');

  public initializeTheme() {
    const stored = this.document.defaultView?.localStorage.getItem('portfolio-theme');
    this.applyTheme(stored === 'light' ? 'light' : 'dark');
  }

  public toggleTheme() {
    this.applyTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(mode: ThemeMode) {
    this.theme.set(mode);
    this.document.documentElement.classList.toggle('light', mode === 'light');
    this.document.defaultView?.localStorage.setItem('portfolio-theme', mode);
  }
}
