import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONDITIONS, DOCTORS, FAQS, SERVICES, TIPS } from '../../core/site-data';
import { HeroScrub, HeroStage } from '../../shared/hero-scrub/hero-scrub';
import { RevealDirective } from '../../shared/reveal.directive';
import { Cta } from '../../shared/sections/cta';
import { Gallery } from '../../shared/sections/gallery';
import { Visit } from '../../shared/sections/visit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RevealDirective, HeroScrub, Gallery, Visit, Cta],
  templateUrl: './home.html'
})
export class Home {
  protected readonly services = SERVICES;
  protected readonly conditions = CONDITIONS;
  protected readonly doctors = DOCTORS;
  protected readonly tips = TIPS;
  protected readonly faqs = FAQS;

  /** Captions shown over the scroll-controlled hero video. */
  protected readonly heroStages: HeroStage[] = [
    { at: 0, title: 'Your eyes, our priority.', text: 'Comprehensive exams, advanced diagnostics and personal care from experienced specialists.', showCta: true },
    { at: 0.34, title: 'Expert care for healthy eyes', text: 'Comprehensive examinations and personalized treatment plans guided by experienced specialists.', showCta: true },
    { at: 0.67, title: 'Optimizing your visual potential', text: 'Advanced diagnostics and modern corrective solutions tailored to your lifestyle.', showCta: true },
    { at: 0.95, title: 'Empowering your visual experience', text: 'Patient-first care that helps you see, work and live with confidence.', showCta: true }
  ];

  protected readonly stats = [
    { value: '2012', label: 'Caring for patients since' },
    { value: '3', label: 'Specialist doctors' },
    { value: '6', label: 'Eye-care services' },
    { value: 'All ages', label: 'Children to seniors' }
  ];

  protected readonly features = [
    { icon: '◎', title: 'Enhancing your sight', text: 'Advanced eye-care solutions for improved vision and a better quality of life.' },
    { icon: '◇', title: 'Preventive first', text: 'Personalized, preventive care that puts your eye health ahead of everything else.' },
    { icon: '✦', title: 'Crystal-clear precision', text: 'Accurate diagnosis and expert solutions, explained in plain language.' }
  ];

  protected readonly imaging = [
    { tag: 'OCT', title: 'Cross-section retina scans', text: 'Light-based images that reveal swelling or thinning in the retina long before you notice it.' },
    { tag: 'Photo', title: 'Retinal photography', text: 'A colour record of the retina and optic nerve to compare from visit to visit.' },
    { tag: 'Laser', title: 'Computer-guided correction', text: 'Treatment plans built from your own corneal measurements.' }
  ];

  protected readonly visitSteps = [
    { n: '1', title: 'Check-in', text: 'Bring your glasses, lenses and a list of medicines.' },
    { n: '2', title: 'Pre-tests', text: 'Painless scans of your vision, eye pressure and retina.' },
    { n: '3', title: 'Examination', text: 'Your doctor checks the front and back of each eye.' },
    { n: '4', title: 'Your plan', text: 'We explain the findings and agree on next steps together.' }
  ];
}
