import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HABIT_SVG } from '../core/habit-illustrations';

/** Shows one of the friendly habit illustrations (static, trusted SVG). */
@Component({
  selector: 'app-habit-icon',
  standalone: true,
  template: `<div class="ill" [innerHTML]="html()"></div>`
})
export class HabitIcon {
  private readonly sanitizer = inject(DomSanitizer);
  readonly index = input.required<number>();
  protected readonly html = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(HABIT_SVG[this.index()] ?? '')
  );
}
