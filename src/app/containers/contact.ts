import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

import {routeFadeStateTrigger} from "../app.animations";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Message} from "../core/model/message";
import swal from "sweetalert2";
import {UserService} from "../core/service/user";

const EMAIL_PATTERN = /.+@.+/;

@Component({
  selector: 'contact',
  template: `
    <hero [background]="'assets/hero.png'">
    </hero>
    <loadingspinner *ngIf="loading"></loadingspinner>
    <contact-form [parent]="contactForm" (form)="sendMessage($event)"></contact-form>
    <!--<div *ngIf=“isLoaded; then movieList else spinner”></div>-->

    <!--<ng-template #movieList>-->

      <!--<movies-list [movies]=“movies”></movies-list>-->

    <!--</ng-template>-->
    <!---->
    <!--<ng-template #spinner>-->

      <!--<spinner></spinner>-->

    <!--</ng-template>-->
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    routeFadeStateTrigger
  ]
})
export class ContactComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  messages: FirebaseListObservable<Message[]>;

  contactForm: FormGroup;
  loading: boolean = false;

  constructor(private db: AngularFireDatabase,
              private fb: FormBuilder,
              private _router: Router, private userService: UserService,
              private slimLoadingBarService: SlimLoadingBarService) {
    this.messages = db.list('/messages');
    this.contactForm = new FormGroup({});


  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.contactForm = this.fb.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(1),
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(EMAIL_PATTERN)
      ]],
      message: ['', [
        Validators.required
      ]]
    });
    this.slimLoadingBarService.complete();
  }

  sendMessage(message) {
    if (!this.contactForm.valid) {
      swal('Oops...', 'Please provide valid input', 'error');
      return;
    }

    this.loading = true;
    this.userService.sendEmail(this.contactForm.value.email, this.contactForm.value.fullName, this.contactForm.value.message)
      .subscribe(
        () => {
          this.loading = false;
          swal('Awesome', 'Email have been sent', 'success');
          this._router.navigate(['/']);
        },
        err => {
          //this.isCompleted = true;
          console.log(`error creating reservation ${err}`);
          this.loading = false;
          swal('Oops...', "Failed to send email", 'error');
        }
      );

    //this.messages.push(message)
    //  .then(x => console.log(message));
    //this.contactForm.reset();
    //this._router.navigate(['home']);
  }
}
