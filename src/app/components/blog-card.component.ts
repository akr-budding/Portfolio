import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../models/content.models';
import { UiIconComponent } from './ui-icon.component';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, UiIconComponent, DatePipe],
  template: `
    <article class="panel section-card group flex h-full flex-col overflow-hidden">
      <div class="relative overflow-hidden rounded-[1.5rem] border border-white/10">
        <img [src]="post.coverImage" [alt]="post.title" class="h-52 w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>

      <div class="mt-6 flex flex-1 flex-col">
        <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
          <span>{{ post.category }}</span>
          <span class="h-1 w-1 rounded-full bg-[var(--color-muted)]"></span>
          <span>{{ post.publishedAt | date: 'MMM d, y' }}</span>
          <span class="h-1 w-1 rounded-full bg-[var(--color-muted)]"></span>
          <span>{{ post.readTime }} min read</span>
        </div>

        <h3 class="mt-4 font-display text-2xl font-semibold text-white">{{ post.title }}</h3>
        <p class="mt-4 text-sm leading-7 text-[var(--color-muted)]">{{ post.excerpt }}</p>

        <div class="mt-6 flex flex-wrap gap-2">
          @for (tag of post.tags.slice(0, 3); track tag) {
            <span class="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--color-muted)]">#{{ tag }}</span>
          }
        </div>

        <a
          [routerLink]="['/blog', post.slug]"
          class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition hover:gap-3"
        >
          Read More
          <app-ui-icon name="arrow-up-right" className="h-4 w-4" />
        </a>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  @Input({ required: true }) public post!: BlogPost;
}
