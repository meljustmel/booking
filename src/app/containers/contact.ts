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
    <hero [type]="'top'" [background]="'assets/pink.png'"></hero>
    <section class="quote">
      <h3 class="text-center italic mb-half">"Udacity has empowered me to be a better software engineer. They have given me opportunities that I would not have if I had to rely on the traditional education system."</h3>
      <h6 class="mb-1 slate inline">— Jonathan, Graduate</h6>
    </section>
    <loadingspinner *ngIf="loading"></loadingspinner>
    <contact-form [parent]="contactForm" (form)="sendMessage($event)"></contact-form>
    <segment [title]="'hello@thelovelyou.com'"
             [type]="'contact'"
             [subtitle]="'Check availability. Helps to plan in advance as space is limited.'"></segment>
  `,
  styles: [`
    :host {
      display: block;
    }
    .slate {
      text-align: center;
      opacity: .7;
    }
    .quote h3.italic {
      font-family: "GT-Walsheim", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
      font-weight: 300;
    }
    @media (min-width: 44em) {
      .arrow-slider-block blockquote {
        padding: 0 8.125em;
      }
      .arrow-slider-block blockquote {
        margin: 0;
        text-align: center;
      }
    }

    @media screen and (min-width: 48rem) {
      section {
        padding: 4em 0 2em;
        width: 70%;
        margin: 0 auto;
      }

      h3 {
        font-size: 1.5em;
        line-height: 1.5em;
        font-weight: 100;
      }
      
      .text-center {
        text-align: center !important;
      }
      .italic, em {
        font-style: italic !important;
      }
      .mb-half {
        margin-bottom: 0.75rem !important;
      }
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
  loading = false;

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
