import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section>
      <div class="w">
        <div class="head" appReveal>
          <h2 style="max-width: 16ch">Inside our clinic.</h2>
          <p style="max-width: 44ch; margin: 0">Modern equipment and a calm, welcoming space.</p>
        </div>
        <div class="mosaic" appReveal>
          @for (p of photos; track p.src) {
            <figure>
              <img [src]="p.src" [alt]="p.alt" loading="lazy" />
              <figcaption>{{ p.caption }}</figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `
})
export class Gallery {
  protected readonly photos = [
    { src: 'images/reception.jpg', alt: 'Bright reception and waiting area', caption: 'Reception and waiting area' },
    { src: 'images/slit-lamp-exam.jpg', alt: 'Doctor using a slit lamp on a patient', caption: 'Slit-lamp examination' },
    { src: 'images/retina-scan-exam.jpg', alt: 'Retina scan with a doctor reviewing images', caption: 'Retinal imaging' },
    { src: 'images/lasik-suite.jpg', alt: 'Laser vision correction suite', caption: 'Vision correction suite' }
  ];
}
