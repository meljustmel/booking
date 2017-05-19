import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

const CREDIT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CreditFormComponent),
  multi: true
};
@Component({
  selector: 'credit-form',
  templateUrl: 'credit-form.html',
  styleUrls: ['credit-form.scss'],
  providers: [CREDIT_VALUE_ACCESSOR]
})
export class CreditFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Output() onComplete = new EventEmitter<any>();
  @Input() label;
  @Input() data;
  @Input() user;

  @Input() parent: FormGroup;
  value: any = {};
  private cardNumber = '';
  private expireDate = '';
  private cvc;
  private isValid : boolean = false;
  onModelChange: Function = (_: any) => {
  }

  onModelTouched: Function = () => {
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.value = value || {};
  }
  onInputChangeNumber($event) {
    this.cardNumber = $event;
    this.onInputChange();
  }
  onInputChangeExpiry($event) {
    this.expireDate = $event;
    this.onInputChange();
  }
  onInputChangeCVC($event) {
    this.cvc = $event;
    this.onInputChange();
  }
  onBookEvent($event) {
    console.log('onBookEvent called');
    this.onComplete.emit();
  }
  onInputChange() {
    if ((<any>window).Stripe.card.validateCardNumber(this.cardNumber) && (<any>window).Stripe.card.validateExpiry(this.expireDate) &&  (<any>window).Stripe.card.validateCVC(this.cvc)) {
      this.writeValue({cardNumber: this.cardNumber, expireDate: this.expireDate, cvc: this.cvc, valid: true});
      this.onModelChange(this.value);
      this.isValid = true;
      this.onModelTouched();
    } else {
      this.isValid = false;
      this.onModelChange({valid: false});
    }
  }
  ngOnInit() {

  }
}
