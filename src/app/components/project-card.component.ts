import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../models/content.models';
import { UiIconComponent } from './ui-icon.component';

@Component({
  selector: 'app-project-card',
  imports: [UiIconComponent],
  template: `
    <article class="panel section-card group flex h-full flex-col overflow-hidden">
      <div class="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--color-surface)]">
        <img [src]="project.image" [alt]="project.title" class="h-52 w-full object-cover transition duration-700 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-panel)]/80 to-transparent"></div>
        <div class="absolute left-5 top-5">
          <span class="rounded-full border border-white/10 bg-[var(--color-panel)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            Project
          </span>
        </div>
      </div>

      <div class="mt-6 flex flex-1 flex-col">
        <div class="space-y-3">
          <p class="text-sm font-medium uppercase tracking-[0.28em] text-[var(--color-accent-2)]">{{ project.subtitle }}</p>
          <h3 class="font-display text-2xl font-semibold text-white">{{ project.title }}</h3>
          <p class="text-sm leading-7 text-[var(--color-muted)]">{{ project.summary }}</p>
        </div>

        <div class="mt-6 flex flex-wrap gap-2">
          @for (item of project.stack; track item) {
            <span class="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--color-muted)]">{{ item }}</span>
          }
        </div>

        <ul class="mt-6 space-y-3 text-sm text-[var(--color-muted)]">
          @for (feature of project.features; track feature) {
            <li class="flex gap-3">
              <span class="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
              <span>{{ feature }}</span>
            </li>
          }
        </ul>

        <div class="mt-8 flex flex-wrap gap-3">
          <a
            [href]="project.githubUrl"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/10"
          >
            <app-ui-icon name="github" className="h-4 w-4" />
            GitHub
          </a>
          <a
            [href]="project.demoUrl"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px]"
          >
            <app-ui-icon name="arrow-up-right" className="h-4 w-4" />
            Live Demo
          </a>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent {
  @Input({ required: true }) public project!: Project;
}
