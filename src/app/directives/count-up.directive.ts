import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('appCountUp') endValue: number | string = 0; // puede incluir sufijo (% / ms / s)
  @Input() duration = 1200; // ms
  @Input() easing: 'linear' | 'easeOut' = 'easeOut';
  @Input() prefix = '';
  @Input() suffix = '';

  private observer?: IntersectionObserver;
  private started = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    // Parse value and extract numeric portion
    const raw = (this.endValue ?? '').toString();
    const match = raw.match(/([0-9]+(?:\.[0-9]+)?)/);
    if(match){
      this.numericTarget = parseFloat(match[1]);
      const after = raw.slice(match.index! + match[1].length).trim();
      if(!this.suffix && after) this.suffix = ' ' + after;
    } else {
      this.numericTarget = 0;
    }
    if (!('IntersectionObserver' in window)) {
      this.render(this.numericTarget);
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting && !this.started){
          this.started = true;
          this.animate();
          this.observer?.disconnect();
        }
      });
    }, { threshold: .4 });
    this.observer.observe(this.el.nativeElement);
  }

  private numericTarget = 0;

  private animate(){
    const start = performance.now();
    const from = 0;
    const to = this.numericTarget;
    const dur = this.duration;
    const easeFn = this.easing === 'linear' ? (t:number)=>t : (t:number)=>1-Math.pow(1-t,3);
    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / dur);
      const eased = easeFn(t);
      const val = from + (to - from) * eased;
      this.render(val);
      if(t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  private render(val: number){
    const formatted = this.format(val, this.numericTarget);
    this.el.nativeElement.textContent = `${this.prefix}${formatted}${this.suffix}`.trim();
    this.el.nativeElement.classList.add('metric-counter');
  }

  private format(current: number, target: number){
    // Keep decimals only if original target had them
    const decimals = (target % 1 !== 0) ? 2 : 0;
    return current.toFixed(decimals);
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}