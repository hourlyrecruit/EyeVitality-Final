import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CLINIC, DOCTORS, SERVICES, SLOTS, FAQS } from '../../core/site-data';
import { RevealDirective } from '../../shared/reveal.directive';

type RequiredField = 'name' | 'phone' | 'email';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.html'
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly doc = inject(DOCUMENT);

  protected readonly clinic = CLINIC;
  protected readonly services = SERVICES;
  protected readonly doctors = DOCTORS;
  protected readonly slots = SLOTS;
  protected readonly faqs = FAQS.slice(0, 5);
  protected readonly status = signal('');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]{7,}$/)]],
    email: ['', Validators.email],
    service: [SERVICES[0].title],
    doctor: ['No preference'],
    date: [''],
    slot: [SLOTS[0]],
    message: ['']
  });

  protected readonly before = [
    { title: 'Bring', text: 'Glasses, contact lenses, a medicine list and earlier eye reports.' },
    { title: 'Plan for', text: 'One to two hours, and blurry vision for a few hours if drops are used.' },
    { title: 'Wear', text: 'Comfortable clothes and sunglasses for the journey home.' }
  ];

  protected showError(field: RequiredField): boolean {
    const c = this.form.controls[field];
    return c.invalid && c.touched;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('Please check the highlighted fields.');
      return;
    }
    const v = this.form.getRawValue();
    const body = [
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      `Email: ${v.email}`,
      `Reason: ${v.service}`,
      `Doctor: ${v.doctor}`,
      `Preferred date: ${v.date}`,
      `Preferred slot: ${v.slot}`,
      '',
      v.message
    ].join('\n');
    const subject = encodeURIComponent('Consultation request from ' + v.name);
    // A static site cannot receive form data, so this opens the visitor's email app.
    // To receive bookings directly, post `v` to your own API or a form service instead.
    this.doc.location.href = `mailto:${CLINIC.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    this.status.set(`Your email app should open with the request ready to send. You can also call ${CLINIC.phone} to book.`);
  }
}
