import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

import {routeFadeStateTrigger} from "../app.animations";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Message} from "../core/model/message";
const EMAIL_PATTERN = /.+@.+/;

@Component({
  selector: 'contact',
  template: `
    <hero [background]="'assets/hero.png'">
    </hero>
    <contact-form [parent]="contactForm" (form)="sendMessage($event)"></contact-form>
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

  constructor(private db: AngularFireDatabase,
              private fb: FormBuilder,
              private _router: Router,
              private slimLoadingBarService: SlimLoadingBarService) {
    this.messages = db.list('/messages');
    this.contactForm = new FormGroup({});


  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.contactForm = this.fb.group({
      name: ['', [
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
  sendMessage(message: Message) {
    this.messages.push(message)
      .then(x => console.log(message));
    this.contactForm.reset();
    this._router.navigate(['home']);
  }
}
