import {ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {AuthService, UserService} from "./service";
import {ReservationService} from "./service/res";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [],
  providers: [
    AuthService,
    UserService,
    ReservationService,
    // MessagesService
  ],
  exports: [SlimLoadingBarModule]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule exists already. Only import in the root/app module");
    }
  }
}
