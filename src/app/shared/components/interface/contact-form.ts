import {Component, Input, OnInit, Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'contact-form',
  template: `
    <div class="auth">
      <div class="auth--box">
        <h2 class="small">Feel free to contact me</h2>
        <div class="auth--form form--fancy">
          <form [formGroup]="parent">
            <div class="form--fancy-wrapper">
              <div class="required form--fancy undefined">
                <input name="fullName" type="text" value=""><label>Full Name</label>
              </div>
              <div class="required form--fancy undefined">
                <input name="email" type="text" value=""><label>Email Address</label>
              </div>
              <div class="required form--fancy undefined">
                <textarea name="message" type="text" value="" placeholder="Say Hello!"></textarea>
              </div>
            </div>
            <div class="auth--form-wrapper">
              <div class="auth--form-col">
                <button class="btn btn--black" type="submit" (click)="submitForm($event)">Send</button>
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

  ngOnInit() {

  }
  submitForm(message) {
    this.form.next(message);
  }
}

