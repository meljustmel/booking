import {Component, Input, OnInit, Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormGroup} from "@angular/forms";
import { UserService } from "../../../core/service/user";
import swal from 'sweetalert2';
import { Router } from '@angular/router'

@Component({
  selector: 'contact-form',
  template: `
    <div class="auth">
      <div class="auth--box">
        <h2 class="small">Feel free to contact me</h2>
        <div class="auth--form form--fancy">
          <form [formGroup]="parent" (ngSubmit)="submitForm($event)">
            <div class="form--fancy-wrapper">
              <div class="required form--fancy undefined">
                <input formControlName="fullName" type="text" value=""><label for="fullName" [ngClass]="{fullUp:parent.value.fullName!=''}">Full Name</label>
              </div>
              <div class="required form--fancy undefined">
                <input formControlName="email" type="text" value=""><label for="email" [ngClass]="{fullUp:parent.value.email!=''}">Email Address</label>
              </div>
              <div class="required form--fancy undefined">
                <textarea formControlName="message" type="text" value="" placeholder="Say Hello!"></textarea>
              </div>
            </div>
            <div class="auth--form-wrapper">
              <div class="auth--form-col">
                <button class="btn btn--black" type="submit" [disabled]="!parent.valid">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['contact-form.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() parent: FormGroup;
  @Output() form = new EventEmitter;


  constructor(private userService: UserService, private _router: Router) {
  }

  ngOnInit() {

  }
  submitForm(message) {
    this.form.next(message);
  }
}

