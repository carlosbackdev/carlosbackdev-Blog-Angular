import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appRevealDelay') delay = 0; // milisegundos
  @Input('appRevealOnce') once = true;
  @Input('appRevealClass') revealClass = 'reveal';
  @Input('appRevealThreshold') threshold = 0.12;

  private observer?: IntersectionObserver;
  private prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (this.prefersReduced) {
      this.apply();
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.apply();
          if (this.once) {
            this.observer?.unobserve(this.el.nativeElement);
          }
        }
      });
    }, { threshold: this.threshold });
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.willChange = 'transform, opacity';
    this.observer.observe(this.el.nativeElement);
  }

  private apply(){
    const node = this.el.nativeElement;
    node.style.animationDelay = this.delay + 'ms';
    node.classList.add(this.revealClass);
    node.style.removeProperty('opacity');
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
