# EyeVitality – Angular website

Eye-clinic website built with **Angular 22** (standalone components, signals, new control flow,
lazy-loaded routes). It follows the structure and tooling of the `EyeVitality-main` reference
project (Angular CLI, SCSS, `public/` assets, Vitest).

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/
npm test           # unit tests (Vitest)
```

## Pages (routes)

| Route | Page |
|---|---|
| `/` | Home – full-screen scroll-controlled eye video, services, imaging, conditions, doctors, habits, FAQ, gallery, visit |
| `/about` | About – approach, values, team, who we care for |
| `/services` | Services – six services with photos, what's included, FAQ |
| `/eye-health` | Eye health – parts of the eye, "How you see" video, conditions, habits, exam schedule, myths |
| `/doctors` | Doctors – full profiles |
| `/contact` | Contact – address, timings, booking form |

Normal / dark mode: the sun/moon button in the header (remembers the choice).

## Project layout

```
src/
  styles.scss                  global design (light + dark tokens, layout, components)
  app/
    app.ts / app.html          header, footer, theme button, "Call Now" button
    app.routes.ts              lazy routes + page titles
    app.config.ts              router setup (scroll to top on navigation)
    core/
      site-data.ts             ALL text content: clinic details, doctors, services, conditions, FAQs
      habit-illustrations.ts   the six habit illustrations (SVG)
      theme.service.ts         normal / dark mode
    shared/
      hero-scrub/              scroll-controlled video hero (video.currentTime follows scroll)
      reveal.directive.ts      fade-in on scroll   (appReveal)
      habit-icon.ts            renders one habit illustration
      sections/                reusable Cta, Visit and Gallery sections
    pages/                     home, about, services, eye-health, doctors, contact
public/
  images/  doctors/  video/    photos and the two videos
  _redirects                   Netlify rule so deep links (e.g. /about) work
```

## Things you will probably want to edit

| What | Where |
|---|---|
| Phone, email, address, map link | `CLINIC` in `src/app/core/site-data.ts` |
| Doctors (name, qualifications, photo) | `DOCTORS` in `site-data.ts` (photos in `public/doctors/`) |
| Services, conditions, FAQs, habits | `SERVICES`, `CONDITIONS`, `FAQS`, `SERVICE_FAQS`, `TIPS` in `site-data.ts` |
| Booking slots | `SLOTS` in `site-data.ts` (and the timings card in `pages/contact/contact.html`, footer in `app.html`) |
| Colours, dark mode | `:root` blocks at the top of `src/styles.scss` |
| Hero captions / video timing | `heroStages` in `pages/home/home.ts`, `timeline` input of `<app-hero-scrub>` |
| "How you see" video steps | `steps` in `pages/eye-health/eye-health.ts` (seconds into `how-you-see.mp4`) |

## Deploying

Any static host works. Because routes are real paths (`/about`), the host must serve
`index.html` for unknown paths: `public/_redirects` already does this on Netlify. For Apache or
Nginx add the usual "fall back to index.html" rule; on Firebase use a `rewrites` entry.

## Notes

* **Booking form:** it opens the visitor's email app (`mailto:`). A static Angular app cannot
  receive form data by itself. To receive bookings directly, send the form value to your own API
  or a form service inside `Contact.submit()` (`pages/contact/contact.ts`).
* **Hero video:** `public/video/hero-eye.mp4` is encoded with every frame as a keyframe so
  scrubbing is smooth. If you replace it, re-encode the same way:
  `ffmpeg -i input.mp4 -an -c:v libx264 -g 1 -crf 30 -pix_fmt yuv420p hero-eye.mp4`.
* **Fonts** (Sora, Inter) load from Google Fonts.
* The health information is general. Please have a qualified clinician review it before going live.
