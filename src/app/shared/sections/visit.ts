import { Component } from '@angular/core';
import { CLINIC } from '../../core/site-data';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="alt">
      <div class="w split">
        <div appReveal>
          <h2 style="margin-bottom: 22px">Visit us in J. P. Nagar.</h2>
          <p class="lead">{{ clinic.address }}</p>
          <p>Call us to book or confirm your appointment time.</p>
          <p style="margin-top: 24px">
            <a class="btn" [href]="clinic.telHref">Call {{ clinic.phone }}</a>
            <a class="btn ghost" [href]="clinic.mapUrl" target="_blank" rel="noopener" style="margin-left: 8px">Get Directions</a>
          </p>
        </div>
        <div class="media" appReveal>
          <img class="ph" src="images/reception.jpg" alt="Our bright, welcoming reception area" loading="lazy" />
          <span class="chip">J. P. Nagar, Bengaluru</span>
        </div>
      </div>
    </section>
  `
})
export class Visit {
  protected readonly clinic = CLINIC;
}
