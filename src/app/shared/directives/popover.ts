import {Directive, HostBinding, HostListener} from "@angular/core";


@Directive({
  selector: '[popover]'
})
export class PopoverDirective {
  @HostBinding('class.hot') spotLight = false;
  @HostListener('click') toggleOpen() {
    this.spotLight = !this.spotLight;
  }
}
