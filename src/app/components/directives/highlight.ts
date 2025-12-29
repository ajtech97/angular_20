import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  constructor(private ele: ElementRef) {
  }

  @HostListener("mouseenter")
  onHover() {
    this.ele.nativeElement.style.color = "red"
  }

  @HostListener("mouseleave")
  onHoverLeft() {
    this.ele.nativeElement.style.color = "black"
  }

}
