import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-icon',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass],
  template: `
    <span [ngClass]="className" [ngSwitch]="name" class="inline-flex items-center justify-center">
      <svg *ngSwitchCase="'menu'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/>
      </svg>
      <svg *ngSwitchCase="'close'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="M6 6l12 12M18 6 6 18" stroke-linecap="round"/>
      </svg>
      <svg *ngSwitchCase="'sun'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" stroke-linecap="round"/>
      </svg>
      <svg *ngSwitchCase="'moon'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="M20 15.4A8.5 8.5 0 1 1 8.6 4a7 7 0 1 0 11.4 11.4Z" stroke-linejoin="round"/>
      </svg>
      <svg *ngSwitchCase="'mail'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="M4 7.5 12 13l8-5.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="3" y="5" width="18" height="14" rx="2.5"/>
      </svg>
      <svg *ngSwitchCase="'linkedin'" viewBox="0 0 24 24" fill="currentColor" class="h-full w-full">
        <path d="M6.5 8.3A1.8 1.8 0 1 1 6.5 4.7a1.8 1.8 0 0 1 0 3.6ZM4.9 9.9h3.2V19H4.9V9.9Zm5.1 0h3.1v1.2h.1c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8V19h-3.2v-4.2c0-1 0-2.3-1.4-2.3s-1.7 1.1-1.7 2.2V19H10V9.9Z"/>
      </svg>
      <svg *ngSwitchCase="'github'" viewBox="0 0 24 24" fill="currentColor" class="h-full w-full">
        <path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.6-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.6-1.3-5.6-6.1 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.5 1.3a12.2 12.2 0 0 1 6.3 0c2.4-1.7 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.3 0 4.8-2.9 5.8-5.7 6.1.4.4.9 1.1.9 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z"/>
      </svg>
      <svg *ngSwitchCase="'arrow-up-right'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="M7 17 17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg *ngSwitchCase="'code'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg *ngSwitchCase="'server'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <rect x="4" y="4" width="16" height="6" rx="2"/>
        <rect x="4" y="14" width="16" height="6" rx="2"/>
        <path d="M8 7h.01M8 17h.01"/>
      </svg>
      <svg *ngSwitchCase="'database'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <ellipse cx="12" cy="6" rx="7" ry="3"/>
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>
      </svg>
      <svg *ngSwitchCase="'cloud'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="M7.5 18a4.5 4.5 0 1 1 .7-8.9A5.5 5.5 0 0 1 19 11a3.5 3.5 0 0 1-.5 7H7.5Z" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg *ngSwitchCase="'toolbox'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"/>
        <rect x="3" y="7" width="18" height="12" rx="2"/>
        <path d="M3 12h18M10 12v2h4v-2"/>
      </svg>
      <svg *ngSwitchCase="'calendar'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <path d="M16 3v4M8 3v4M3 10h18"/>
      </svg>
      <svg *ngSwitchCase="'clock'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <circle cx="12" cy="12" r="8.5"/>
        <path d="M12 7.5V12l3 2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg *ngSwitchCase="'search'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <circle cx="11" cy="11" r="6.5"/>
        <path d="m16 16 4 4" stroke-linecap="round"/>
      </svg>
      <svg *ngSwitchCase="'share'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
        <path d="M15 8a3 3 0 1 0-2.8-4H12a3 3 0 0 0 .2 1L8.9 7a3 3 0 1 0 0 10l3.3 2a3 3 0 1 0 .8-1.4l-3.3-2a3 3 0 0 0 0-2.2l3.3-2A3 3 0 0 0 15 8Z" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg *ngSwitchDefault viewBox="0 0 24 24" fill="currentColor" class="h-full w-full">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiIconComponent {
  @Input({ required: true }) public name!: string;
  @Input() public className = 'h-5 w-5';
}
