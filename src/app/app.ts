import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle.component';
import { UiIconComponent } from './components/ui-icon.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemeToggleComponent, UiIconComponent],
  template: `
    <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-500">
      <div class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[color:var(--color-surface-alpha)] backdrop-blur-xl">
        <header class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a routerLink="/" class="flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-accent)]/15 ring-1 ring-[var(--color-accent)]/30">
              <span class="font-display text-lg font-semibold text-[var(--color-accent)]">AR</span>
            </div>
            <div>
              <p class="font-display text-sm uppercase tracking-[0.35em] text-[var(--color-muted)]">Portfolio</p>
              <p class="text-sm font-semibold">Ashwini Ranjan</p>
            </div>
          </a>

          <nav class="hidden items-center gap-6 md:flex">
            @for (item of navItems(); track item.label) {
              <a
                [routerLink]="item.route"
                [fragment]="item.fragment"
                routerLinkActive="text-[var(--color-text)]"
                class="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
              >
                {{ item.label }}
              </a>
            }
          </nav>

          <div class="flex items-center gap-3">
            <app-theme-toggle />
            <a
              href="mailto:ashwini.ranjan@protonmail.com"
              class="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent)]/10 md:inline-flex"
            >
              Hire Me
            </a>
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 md:hidden"
              (click)="menuOpen.update((value) => !value)"
              [attr.aria-expanded]="menuOpen()"
              aria-label="Toggle menu"
            >
              <app-ui-icon [name]="menuOpen() ? 'close' : 'menu'" className="h-5 w-5 text-[var(--color-text)]" />
            </button>
          </div>
        </header>

        @if (menuOpen()) {
          <div class="border-t border-white/10 bg-[var(--color-panel)] px-4 py-4 md:hidden">
            <nav class="flex flex-col gap-3">
              @for (item of navItems(); track item.label) {
                <a
                  [routerLink]="item.route"
                  [fragment]="item.fragment"
                  class="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-[var(--color-text)]"
                  (click)="menuOpen.set(false)"
                >
                  {{ item.label }}
                </a>
              }
            </nav>
          </div>
        }
      </div>

      <main class="pt-24">
        <router-outlet />
      </main>

      <footer class="border-t border-white/10 bg-[var(--color-panel)]/70">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:px-8">
          <div class="space-y-4">
            <p class="font-display text-2xl font-semibold text-white">Building fast, secure, maintainable .NET products.</p>
            <p class="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              Full-stack .NET developer focused on enterprise applications, Angular frontends, performant APIs, and reliable Azure delivery pipelines.
            </p>
            <div class="flex items-center gap-3">
              <a
                href="mailto:ashwini.ranjan@protonmail.com"
                class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[var(--color-muted)] transition hover:border-[var(--color-accent)]/50 hover:text-white"
                aria-label="Email Ashwini"
              >
                <app-ui-icon name="mail" className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ashwini-ranjan-41b930161"
                target="_blank"
                rel="noreferrer"
                class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[var(--color-muted)] transition hover:border-[var(--color-accent)]/50 hover:text-white"
                aria-label="LinkedIn profile"
              >
                <app-ui-icon name="linkedin" className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[var(--color-muted)] transition hover:border-[var(--color-accent)]/50 hover:text-white"
                aria-label="GitHub profile placeholder"
              >
                <app-ui-icon name="github" className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 class="font-display text-lg font-semibold text-white">Quick Links</h2>
            <ul class="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              @for (item of footerNav; track item.label) {
                <li>
                  <a [routerLink]="item.route" [fragment]="item.fragment" class="transition hover:text-white">
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div class="space-y-4">
            <h2 class="font-display text-lg font-semibold text-white">Built For</h2>
            <p class="text-sm leading-7 text-[var(--color-muted)]">
              Recruiters, engineering leaders, and product teams who want a developer comfortable across UI, API, data, and deployment layers.
            </p>
            <p class="text-sm text-[var(--color-accent)]">Built with Angular.</p>
          </div>
        </div>

        <div class="border-t border-white/10 px-4 py-5 text-center text-xs text-[var(--color-muted)]">
          © {{ year }} Ashwini Ranjan. All rights reserved.
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly themeService = inject(ThemeService);

  protected readonly menuOpen = signal(false);
  protected readonly navItems = computed(() => [
    { label: 'Home', route: '/', fragment: undefined },
    { label: 'About', route: '/', fragment: 'about' },
    { label: 'Skills', route: '/', fragment: 'skills' },
    { label: 'Experience', route: '/', fragment: 'experience' },
    { label: 'Projects', route: '/', fragment: 'projects' },
    { label: 'Blog', route: '/blog', fragment: undefined },
    { label: 'Contact', route: '/', fragment: 'contact' }
  ]);

  protected readonly footerNav = [
    { label: 'About Me', route: '/', fragment: 'about' },
    { label: 'Projects', route: '/', fragment: 'projects' },
    { label: 'Blog', route: '/blog', fragment: undefined },
    { label: 'Contact', route: '/', fragment: 'contact' }
  ];

  protected readonly year = new Date().getFullYear();

  public constructor() {
    this.themeService.initializeTheme();
  }
}
