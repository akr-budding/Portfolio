import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  template: `
    <div class="panel section-card animate-pulse">
      <div class="skeleton h-48 rounded-[1.5rem]"></div>
      <div class="mt-6 space-y-4">
        <div class="skeleton h-4 w-24 rounded-full"></div>
        <div class="skeleton h-7 w-3/4 rounded-full"></div>
        <div class="skeleton h-4 w-full rounded-full"></div>
        <div class="skeleton h-4 w-5/6 rounded-full"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonCardComponent {}
