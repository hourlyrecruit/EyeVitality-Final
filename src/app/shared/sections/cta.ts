import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CLINIC } from '../../core/site-data';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="rel">
      <div class="aur"><i></i><i></i></div>
      <div class="w" appReveal style="text-align: center">
        <h2 style="max-width: 20ch; margin: 0 auto 18px">Your vision. Our priority.</h2>
        <p style="margin: 0 auto 28px">
          Take the first step towards healthier vision. Schedule a consultation with our
          specialists.
        </p>
        <a class="btn" routerLink="/contact">Book a consultation</a>
        <a class="btn ghost" [href]="clinic.telHref" style="margin-left: 8px">Call {{ clinic.phone }}</a>
      </div>
    </section>
  `
})
export class Cta {
  protected readonly clinic = CLINIC;
}
