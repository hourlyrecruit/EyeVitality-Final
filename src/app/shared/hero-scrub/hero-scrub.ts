import {
  DestroyRef,
  ElementRef,
  Component,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';

export interface HeroStage {
  /** Scroll position (0 to 1) at which this caption appears. */
  at: number;
  title: string;
  text: string;
  showCta?: boolean;
}

type SeekableVideo = HTMLVideoElement & { fastSeek?: (time: number) => void };

/**
 * A full-screen pinned section. As the visitor scrolls, the real video frames change
 * (video.currentTime follows scroll progress). The pointer or a touch drag tilts the scene.
 */
@Component({
  selector: 'app-hero-scrub',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-scrub.html'
})
export class HeroScrub {
  readonly stages = input.required<HeroStage[]>();
  readonly videoSrc = input.required<string>();
  /** Pairs of [scrollProgress, videoSeconds]. */
  readonly timeline = input<[number, number][]>([
    [0, 0],
    [0.5, 2.6],
    [1, 4.2]
  ]);
  readonly maxTime = input(4.2);
  readonly heightVh = input(380);
  readonly hintText = input('Scroll to look closer');

  protected readonly stageIndex = signal(0);
  protected readonly fallback = signal(false);
  protected readonly current = computed(() => [this.stages()[this.stageIndex()]]);

  private readonly sceneEl = viewChild.required<ElementRef<HTMLElement>>('sceneEl');
  private readonly pinEl = viewChild.required<ElementRef<HTMLElement>>('pinEl');
  private readonly vidEl = viewChild.required<ElementRef<SeekableVideo>>('vidEl');
  private readonly rigEl = viewChild.required<ElementRef<HTMLElement>>('rigEl');
  private readonly glowEl = viewChild.required<ElementRef<HTMLElement>>('glowEl');
  private readonly vigEl = viewChild.required<ElementRef<HTMLElement>>('vigEl');
  private readonly progEl = viewChild.required<ElementRef<HTMLElement>>('progEl');
  private readonly hintEl = viewChild.required<ElementRef<HTMLElement>>('hintEl');

  private readonly destroyRef = inject(DestroyRef);
  private cleanups: (() => void)[] = [];
  private raf = 0;

  constructor() {
    afterNextRender(() => this.start());
    this.destroyRef.onDestroy(() => this.stop());
  }

  private start(): void {
    const scene = this.sceneEl().nativeElement;
    const pin = this.pinEl().nativeElement;
    const video = this.vidEl().nativeElement;
    const rig = this.rigEl().nativeElement;
    const glow = this.glowEl().nativeElement;
    const vig = this.vigEl().nativeElement;
    const prog = this.progEl().nativeElement;
    const hint = this.hintEl().nativeElement;
    const stages = this.stages();

    video.muted = true;
    const reduce =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    const s = {
      target: 0, cur: 0, tx: 0, ty: 0, mx: 0, my: 0,
      visible: true, last: -1, ready: false, stage: 0, dur: this.maxTime()
    };

    const timeAt = (p: number): number => {
      const m = this.timeline();
      for (let i = 1; i < m.length; i++) {
        if (p <= m[i][0]) {
          const a = m[i - 1];
          const b = m[i];
          const k = (p - a[0]) / (b[0] - a[0]);
          const e = k * k * (3 - 2 * k) * 0.35 + k * 0.65; // gentle easing
          return a[1] + (b[1] - a[1]) * e;
        }
      }
      return m[m.length - 1][1];
    };

    const measure = () => {
      const r = scene.getBoundingClientRect();
      const span = r.height - pin.offsetHeight;
      s.target = span > 0 ? clamp(-r.top / span, 0, 1) : 0;
    };

    const kick = () => {
      if (!this.raf && s.visible) this.raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      this.raf = 0;
      s.cur += (s.target - s.cur) * (reduce ? 1 : 0.14);
      if (Math.abs(s.target - s.cur) < 0.0004) s.cur = s.target;
      s.mx += (s.tx - s.mx) * 0.07;
      s.my += (s.ty - s.my) * 0.07;
      const p = s.cur;

      if (s.ready) {
        const t = Math.round(clamp(timeAt(p), 0, s.dur) * 24) / 24; // snap to source frames
        if (Math.abs(t - s.last) >= 1 / 48 && (!video.seeking || Math.abs(t - s.last) > 0.3)) {
          if (video.fastSeek && Math.abs(t - video.currentTime) > 0.5) video.fastSeek(t);
          else video.currentTime = t;
          s.last = t;
        }
      }

      if (!reduce) {
        rig.style.transform =
          `rotateX(${(-s.my * 5).toFixed(2)}deg) rotateY(${(s.mx * 7).toFixed(2)}deg) ` +
          `translate3d(${(-s.mx * 14).toFixed(1)}px,${(-s.my * 10).toFixed(1)}px,0)`;
        video.style.transform = `scale(${(1.06 + p * 0.04).toFixed(4)})`;
        vig.style.transform = `translate3d(${(s.mx * 18).toFixed(1)}px,${(s.my * 12).toFixed(1)}px,0)`;
        glow.style.transform =
          `translate3d(${(s.mx * -34).toFixed(1)}px,${(s.my * -24).toFixed(1)}px,-120px)`;
      }
      glow.style.opacity = String(clamp((p - 0.15) * 1.6, 0, 1));
      prog.style.width = p * 100 + '%';
      hint.style.opacity = p > 0.03 ? '0' : '1';

      let idx = 0;
      stages.forEach((x, i) => {
        if (p >= x.at - 0.01) idx = i;
      });
      if (idx !== s.stage) {
        s.stage = idx;
        this.stageIndex.set(idx);
      }

      if (s.cur !== s.target || Math.abs(s.tx - s.mx) > 0.001 || Math.abs(s.ty - s.my) > 0.001) {
        this.raf = requestAnimationFrame(tick);
      }
    };

    const onPointer = (e: PointerEvent) => {
      const r = pin.getBoundingClientRect();
      s.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      s.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
      kick();
    };
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => undefined);
    };
    const useFallback = () => {
      this.fallback.set(true);
      hint.style.opacity = '1';
      video.loop = true;
      video.play().catch(() => undefined);
    };
    const onMeta = () => {
      if (!isFinite(video.duration) || video.duration < 1) {
        useFallback();
        return;
      }
      s.dur = Math.min(this.maxTime(), video.duration - 0.05);
      s.ready = true;
      video.currentTime = 0;
      unlock();
      measure();
      s.cur = s.target;
      kick();
    };
    const onScroll = () => {
      measure();
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
      if (s.visible) {
        measure();
        kick();
      }
    });
    io.observe(scene);

    const on = <K extends keyof HTMLElementEventMap>(
      target: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void, opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, fn, opts);
      this.cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('error', useFallback);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    on(pin, 'pointermove', onPointer, { passive: true });
    on(pin, 'pointerleave', onLeave);
    on(pin, 'pointerup', onLeave);
    on(pin, 'pointercancel', onLeave);
    this.cleanups.push(() => {
      io.disconnect();
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('error', useFallback);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('touchstart', unlock);
    });

    if (video.readyState >= 1) onMeta();
    measure();
    kick();
  }

  private stop(): void {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }
}
