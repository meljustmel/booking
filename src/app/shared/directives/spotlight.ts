import {Directive, Renderer, HostBinding, HostListener, ElementRef} from "@angular/core";


@Directive({
  selector: '[spotlight]'
})
export class SpotlightDirective {
  // @HostBinding('class.hot') hot = false;
  @HostListener('click') spotLight() {
    this.renderer.setElementStyle(this.el.nativeElement, 'border', '1px red dashed');
  }
  constructor(private renderer: Renderer,
              private el: ElementRef) {

  }
}
