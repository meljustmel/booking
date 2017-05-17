import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, BookingComponent, ScheduleComponent, ReservationsComponent, ContactComponent, AboutComponent, UsersComponent, UserDetailComponent,
  ProfileComponent, MyReservationsComponent, MyMessagesComponent, MyProfileComponent } from "./containers/index";

import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthGuard } from './app.service'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
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
    component: ReservationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', component: UsersComponent},
      { path: ':id', component: UserDetailComponent },
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MyProfileComponent},
      { path: 'reservations', component: MyReservationsComponent },
      { path: 'messages', component: MyMessagesComponent },
    ]
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, SharedModule, CommonModule, RouterModule.forRoot(routes)],
  declarations: [HomeComponent, BookingComponent, ScheduleComponent, ReservationsComponent, ContactComponent, AboutComponent, UsersComponent, UserDetailComponent,
    ProfileComponent, MyReservationsComponent, MyMessagesComponent, MyProfileComponent],
  exports: [RouterModule, HomeComponent, BookingComponent, ScheduleComponent, ReservationsComponent, ContactComponent, AboutComponent, UsersComponent, UserDetailComponent,
    ProfileComponent, MyReservationsComponent, MyMessagesComponent, MyProfileComponent]
})
export class AppRoutingModule { }
