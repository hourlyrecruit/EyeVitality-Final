import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/** Fades and lifts an element into view the first time it scrolls on screen. */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'rv' }
})
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      if (typeof IntersectionObserver === 'undefined') {
        node.classList.add('in');
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('in');
              io.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px' }
      );
      io.observe(node);
      this.destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
