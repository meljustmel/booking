import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent, BookingComponent, ScheduleComponent, ReservationsComponent, ContactComponent, AboutComponent} from "./containers";
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'reservations',
    component: ReservationsComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, SharedModule, CommonModule, RouterModule.forRoot(routes)],
  declarations: [HomeComponent, BookingComponent, ScheduleComponent, ReservationsComponent, ContactComponent, AboutComponent],
  exports: [RouterModule, HomeComponent, BookingComponent, ScheduleComponent, ReservationsComponent, ContactComponent, AboutComponent]
})
export class AppRoutingModule { }
