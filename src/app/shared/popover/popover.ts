import {Component, NgModule, ViewChild, OnInit, ViewContainerRef, Compiler, ReflectiveInjector, Injectable, Injector, ComponentRef} from "@angular/core";
import {Observable, Subject, BehaviorSubject, ReplaySubject} from "rxjs/Rx";

// the modal-service
@Injectable()
export class PopoverService {
  private vcRef: ViewContainerRef;
  private injector: Injector;
  public activeInstances = 0;

  constructor(private compiler: Compiler) {
  }

  registerViewContainerRef(vcRef: ViewContainerRef): void {
    this.vcRef = vcRef;
  }

  registerInjector(injector: Injector): void {
    this.injector = injector;
  }

  create<T>(module: any, component: any, parameters?: Object): Observable<ComponentRef<T>> {
    const componentRef$ = new ReplaySubject();
    this.compiler.compileModuleAndAllComponentsAsync(module)
      .then(factory => {
        const componentFactory = factory.componentFactories.filter(item => item.componentType === component)[0];
        const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        const componentRef = this.vcRef.createComponent(componentFactory, 0, childInjector);
        Object.assign(componentRef.instance, parameters); // pass the @Input parameters to the instance
        this.activeInstances ++;
        componentRef.instance["componentIndex"] = this.activeInstances;
        componentRef.instance["destroy"] = () => {
          this.activeInstances --;
          componentRef.destroy();
        };
        componentRef$.next(componentRef);
        componentRef$.complete();
      });
    return <Observable<ComponentRef<T>>> componentRef$.asObservable();
  }
}

// this is the modal-placeholder, it will container the created modals
@Component({
  selector: "popover-template",
  template: `<div #popoverPlaceholder></div>`
})
export class PopoverPlaceholderComponent implements OnInit {
  @ViewChild("popoverPlaceholder", {read: ViewContainerRef}) viewContainerRef;

  constructor(private popoverService: PopoverService, private injector: Injector) {

  }
  ngOnInit(): void {
    this.popoverService.registerViewContainerRef(this.viewContainerRef);
    this.popoverService.registerInjector(this.injector);
  }
}

// These 2 items will make sure that you can annotate
// a modal-component with @Modal()
export class PopoverContainer {
  destroy: Function;
  componentIndex: number;
  closePopover(): void {
    this.destroy();
  }
}
export function Popover() {
  return function (target) {
    Object.assign(target.prototype,  PopoverContainer.prototype);
  };
}

// module definition
@NgModule({
  declarations: [PopoverPlaceholderComponent],
  exports: [PopoverPlaceholderComponent],
  providers: [PopoverService]
})
export class PopoverModule {
}
