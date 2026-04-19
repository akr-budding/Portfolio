import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { UiIconComponent } from './ui-icon.component';

@Component({
  selector: 'app-theme-toggle',
  imports: [UiIconComponent],
  template: `
    <button
      type="button"
      (click)="themeService.toggleTheme()"
      class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--color-text)] transition hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/10"
      aria-label="Toggle color theme"
    >
      <app-ui-icon [name]="themeService.theme() === 'dark' ? 'sun' : 'moon'" className="h-5 w-5" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
}
