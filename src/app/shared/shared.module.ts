import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  BlockComponent,
  BlockHeaderComponent,
  BreadCrumbComponent,
  CardComponent,
  ConfirmFormComponent,
  FootComponent,
  HeroComponent,
  HeroTextComponent,
  ItemComponent,
  LogoComponent,
  MenuComponent,
  NavigatorComponent,
  SearchComponent,
  SecondaryComponent,
  ServiceFormComponent,
  ServicesComponent,
  TimeFormComponent,
  TimeComponent,
  SegmentComponent,
  ItemListComponent,
  TestimonialsComponent,
  QuestionsComponent,
  ProductsComponent,
  InstafeedComponent
} from './components';
import {PopoverDirective, SpotlightDirective} from './directives';
import {LoginModalComponent, ModalModule, ModalPlaceholderComponent} from './modal';
import {
  PopoverMenuComponent,
  PopoverModule,
  PopoverNotificationsComponent,
  PopoverPlaceholderComponent
} from './popover';
import {ScheduleModule} from '../schedule/schedule.module';
import { FormWizardModule } from './wizard';


@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    PopoverModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FormWizardModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  declarations: [
    ConfirmFormComponent,
    TimeFormComponent,
    TimeComponent,
    ServicesComponent,
    FootComponent,
    SegmentComponent,
    ServiceFormComponent,
    BreadCrumbComponent,
    SearchComponent,
    HeroComponent,
    HeroTextComponent,
    NavigatorComponent,
    SecondaryComponent,
    MenuComponent,
    LogoComponent,
    CardComponent,
    PopoverDirective,
    LoginModalComponent,
    PopoverMenuComponent,
    ItemComponent,
    ItemListComponent,
    PopoverNotificationsComponent,
    BlockComponent,
    BlockHeaderComponent,
    SpotlightDirective,
    TestimonialsComponent,
    QuestionsComponent,
    ProductsComponent,
    InstafeedComponent
  ],
  exports: [
    ConfirmFormComponent,
    TimeFormComponent,
    TimeComponent,
    ServicesComponent,
    FootComponent,
    SegmentComponent,
    ServiceFormComponent,
    BreadCrumbComponent,
    SearchComponent,
    HeroComponent,
    HeroTextComponent,
    BlockHeaderComponent,
    BlockComponent,
    ScheduleModule,
    FormWizardModule,
    ItemComponent,
    ItemListComponent,
    ReactiveFormsModule,
    FormsModule,
    PopoverNotificationsComponent,
    PopoverPlaceholderComponent,
    ModalPlaceholderComponent,
    NavigatorComponent,
    SecondaryComponent,
    MenuComponent,
    LogoComponent,
    CardComponent,
    PopoverDirective,
    LoginModalComponent,
    SpotlightDirective,
    TestimonialsComponent,
    QuestionsComponent,
    ProductsComponent,
    InstafeedComponent
  ]
})
export class SharedModule {
}
