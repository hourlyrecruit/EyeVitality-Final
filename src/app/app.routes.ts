import { Routes } from '@angular/router';

// Every page is lazy-loaded, so the first visit downloads only what it needs.
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'EyeVitality · Your Eyes, Our Priority',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home)
  },
  {
    path: 'about',
    title: 'About · EyeVitality',
    loadComponent: () => import('./pages/about/about').then((m) => m.About)
  },
  {
    path: 'services',
    title: 'Services · EyeVitality',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services)
  },
  {
    path: 'eye-health',
    title: 'Eye Health · EyeVitality',
    loadComponent: () => import('./pages/eye-health/eye-health').then((m) => m.EyeHealth)
  },
  {
    path: 'doctors',
    title: 'Doctors · EyeVitality',
    loadComponent: () => import('./pages/doctors/doctors').then((m) => m.Doctors)
  },
  {
    path: 'contact',
    title: 'Book A Consultation · EyeVitality',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact)
  },
  { path: '**', redirectTo: '' }
];
