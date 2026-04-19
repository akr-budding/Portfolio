import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  template: `
    <div class="max-w-2xl space-y-4">
      <div class="pill">
        <span class="h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
        {{ eyebrow }}
      </div>
      <h2 class="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {{ title }}
      </h2>
      <p class="text-base leading-8 text-[var(--color-muted)]">
        {{ description }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeadingComponent {
  @Input({ required: true }) public eyebrow!: string;
  @Input({ required: true }) public title!: string;
  @Input({ required: true }) public description!: string;
}
