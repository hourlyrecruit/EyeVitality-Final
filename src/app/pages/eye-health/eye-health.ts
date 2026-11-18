import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { CONDITIONS, TIPS } from '../../core/site-data';
import { HabitIcon } from '../../shared/habit-icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { Cta } from '../../shared/sections/cta';
import { RouterLink } from '@angular/router';

interface Info { title: string; text: string; }
interface VideoStep extends Info { time: number; }

@Component({
  selector: 'app-eye-health',
  standalone: true,
  imports: [RouterLink, RevealDirective, HabitIcon, Cta],
  templateUrl: './eye-health.html'
})
export class EyeHealth {
  protected readonly conditions = CONDITIONS;
  protected readonly tips = TIPS;

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('hv');
  /** Index of the step currently playing in the "How you see" video (-1 = none). */
  protected readonly activeStep = signal(-1);

  protected readonly parts: Info[] = [
    { title: 'Cornea', text: 'The clear window at the very front. It bends incoming light and protects the eye. Think of it as the glass of a camera.' },
    { title: 'Iris and pupil', text: 'The coloured ring is the iris. The black centre is the pupil. The iris makes the pupil bigger in the dark and smaller in bright light.' },
    { title: 'Lens', text: 'A clear, flexible lens that changes shape to focus on near or far things, just like a camera lens.' },
    { title: 'Ciliary body', text: 'A ring of tiny muscles around the lens. It pulls and relaxes to change the lens shape, and makes the fluid at the front of the eye.' },
    { title: 'Retina and macula', text: 'The retina is the light-sensing screen at the back. Its centre, the macula, gives the sharp detail you need to read and see faces.' },
    { title: 'Choroid and sclera', text: 'The choroid is a layer of blood vessels that feeds the retina. The sclera is the tough white outer wall that protects the whole eye.' }
  ];

  /** Seconds are positions in public/video/how-you-see.mp4. */
  protected readonly steps: VideoStep[] = [
    { title: 'Light enters', text: 'Light passes through the clear cornea at the front of the eye.', time: 0 },
    { title: 'The pupil adjusts', text: 'The iris opens the pupil in dim light and narrows it in bright light.', time: 3 },
    { title: 'The lens focuses', text: 'The lens bends the light to make a sharp picture, near or far.', time: 7 },
    { title: 'The retina senses', text: 'Millions of tiny light-sensing cells turn the picture into signals.', time: 15 },
    { title: 'The brain sees', text: 'The optic nerve sends the signals to the brain, which builds the picture you see.', time: 22 }
  ];

  protected readonly ages: Info[] = [
    { title: 'Children', text: 'A first eye check before school age, or sooner if you notice squinting or eye rubbing. Time outdoors and breaks from screens support healthy growing eyes.' },
    { title: '20s and 30s', text: 'Screen strain and dry eyes are common. Protect against UV light and keep contact-lens hygiene strict.' },
    { title: '40s', text: 'Near vision starts to get harder as the lens stiffens, usually from the early to mid 40s. Glaucoma risk begins to rise, so regular exams matter.' },
    { title: '60 and over', text: 'Cataract, macular degeneration, glaucoma and dry eye become more likely. A yearly exam is a sensible habit.' }
  ];

  protected readonly examFrequency: Info[] = [
    { title: 'Children', text: 'Before school age, then as advised by your eye doctor.' },
    { title: 'Adults 18 to 39', text: 'Every one to two years, or as advised if you wear glasses or lenses.' },
    { title: 'Adults 40 to 64', text: 'Every one to two years. The 40s are a good time for a baseline check.' },
    { title: 'Adults 65 and over', text: 'Every year, as cataract, glaucoma and macular conditions become more common.' },
    { title: 'People with diabetes', text: 'Every year with a dilated retina exam, even if your vision seems fine.' },
    { title: 'Family history of eye disease', text: 'Earlier and more frequent checks. Ask your doctor how often.' }
  ];

  protected readonly screenSetup: Info[] = [
    { title: 'Position the screen', text: 'Arm’s length away, with the top of the screen at or just below eye level.' },
    { title: 'Reduce glare', text: 'Avoid a bright window behind or in front of the screen. Match screen brightness to the room.' },
    { title: 'Blink often', text: 'We blink less when focused. Blink fully and consciously to keep eyes moist.' },
    { title: 'Take short breaks', text: 'Look away every 20 minutes, and stand up and move every hour.' },
    { title: 'Use lubricating drops if advised', text: 'If your eyes still feel dry, ask your doctor which drops suit you.' }
  ];

  protected readonly myths: Info[] = [
    { title: '“Reading in dim light damages your eyes.”', text: 'It can make them tired and uncomfortable, but it doesn’t cause lasting damage.' },
    { title: '“Carrots give you perfect vision.”', text: 'Vitamin A is important for the retina, but eating more than you need won’t sharpen your sight.' },
    { title: '“Screens permanently harm your eyes.”', text: 'They can cause strain, dryness and headaches. Regular breaks and good lighting help.' },
    { title: '“Wearing glasses makes your eyes weaker.”', text: 'Glasses correct how you see; they don’t make your eyes worse.' }
  ];

  protected readonly inspection: Info[] = [
    { title: 'OCT scan', text: 'Light-based cross-sections of the retina, taken in seconds without touching the eye.' },
    { title: 'Retinal imaging', text: 'A colour photograph of the retina, optic nerve and blood vessels, stored for comparison.' },
    { title: 'Slit-lamp exam', text: 'A microscope and thin beam of light for a detailed look at the cornea, iris and lens.' }
  ];

  protected seek(step: VideoStep): void {
    const el = this.video()?.nativeElement;
    if (!el) return;
    el.currentTime = step.time;
    el.play().catch(() => undefined);
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  protected onTime(): void {
    const el = this.video()?.nativeElement;
    if (!el) return;
    let active = -1;
    if (el.currentTime > 0.1) {
      this.steps.forEach((s, i) => {
        if (el.currentTime >= s.time - 0.2) active = i;
      });
    }
    this.activeStep.set(active);
  }
}
