import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLongText]',
})
export class LongTextDirective {
  @Input() containerElementRef!: HTMLDivElement;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (
      this.el.nativeElement.offsetWitdh > this.containerElementRef.offsetWidth
    ) {
      this.el.nativeElement.style.textOverflow = 'hidden';
    }
  }
}
