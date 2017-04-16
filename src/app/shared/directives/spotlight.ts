import {Directive, Renderer, HostBinding, HostListener, ElementRef} from "@angular/core";


@Directive({
  selector: '[spotlight]'
})
export class SpotlightDirective {
  // @HostBinding('class.hot') hot = false;
  @HostListener('mouseover') spotLightOn() {
    this.renderer.setElementStyle(this.el.nativeElement, 'border', '1px red dashed');
  }
  @HostListener('mouseout') spotLightOff() {
    this.renderer.setElementStyle(this.el.nativeElement, 'border', 'none');
  }
  constructor(private renderer: Renderer,
              private el: ElementRef) {

  }
}
