import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOCTORS } from '../../core/site-data';
import { RevealDirective } from '../../shared/reveal.directive';
import { Cta } from '../../shared/sections/cta';
import { Visit } from '../../shared/sections/visit';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, RevealDirective, Visit, Cta],
  templateUrl: './about.html'
})
export class About {
  protected readonly doctors = DOCTORS;

  protected readonly values = [
    { icon: '◎', title: 'Clarity', text: 'Plain-language explanations, on-screen scans and written plans.' },
    { icon: '◇', title: 'Prevention', text: 'Catching problems early is gentler, cheaper and protects more sight.' },
    { icon: '✦', title: 'Precision', text: 'Modern diagnostics and measured, individual treatment decisions.' },
    { icon: '☺', title: 'Respect', text: 'Unhurried visits, honest advice and no pressure to treat.' },
    { icon: '◈', title: 'Continuity', text: 'One record across exam, imaging, surgery and follow-up.' },
    { icon: '◉', title: 'Access', text: 'Care for every age, from a child’s first check to later-life eye disease.' }
  ];

  protected readonly audiences = [
    { icon: '☺', title: 'Children', text: 'Vision screening, lazy eye, squint and short-sightedness, with a gentle approach.' },
    { icon: '◉', title: 'Working adults', text: 'Screen strain, dry eyes, glasses and lens fittings, and regular check-ups.' },
    { icon: '◇', title: 'Over 40s', text: 'Near-vision changes, glaucoma screening and early cataract checks.' },
    { icon: '✚', title: 'People with diabetes', text: 'Yearly retina checks and imaging to catch changes early.' }
  ];
}
