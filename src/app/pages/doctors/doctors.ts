import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CLINIC, DOCTORS } from '../../core/site-data';
import { RevealDirective } from '../../shared/reveal.directive';
import { Cta } from '../../shared/sections/cta';
import { Visit } from '../../shared/sections/visit';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [RouterLink, RevealDirective, Visit, Cta],
  templateUrl: './doctors.html'
})
export class Doctors {
  protected readonly clinic = CLINIC;
  protected readonly doctors = DOCTORS;

  protected readonly teamPoints = [
    { title: 'Shared records', text: 'Your exam, scans and treatment notes live in one place, so every specialist sees the full picture.' },
    { title: 'Referrals in-house', text: 'Need a retina specialist or a paediatric opinion? We hand over within the clinic.' },
    { title: 'Follow-up that’s planned', text: 'You leave each visit knowing when to come back and what to watch for.' }
  ];

  /** "Dr. Rohan Mehta" becomes "Dr. Rohan" for the booking button. */
  protected shortName(name: string): string {
    return name.split(' ').slice(0, 2).join(' ');
  }
}
