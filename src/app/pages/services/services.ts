import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CLINIC, SERVICES, SERVICE_FAQS } from '../../core/site-data';
import { RevealDirective } from '../../shared/reveal.directive';
import { Cta } from '../../shared/sections/cta';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, RevealDirective, Cta],
  templateUrl: './services.html'
})
export class Services {
  protected readonly clinic = CLINIC;
  protected readonly services = SERVICES;
  protected readonly faqs = SERVICE_FAQS;
}
