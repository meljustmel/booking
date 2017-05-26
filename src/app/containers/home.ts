import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Router} from "@angular/router";
import {routeFadeStateTrigger} from "../app.animations";
import {ServiceModalComponent, ModalService} from ".././shared/modal/index";
import {SharedModule} from "../shared/shared.module";
import {Service} from "../core/model/index";


@Component({
  selector: 'home',
  template: `
    <hero [type]="'jumbotron'" [background]="'assets/hero.png'">
      <hero-text
        [heading]="'The eyes are windows to the soul'"
        [subheading]="'Your gaze is the soul shining back into the world..'">
      </hero-text>
    </hero>
    <segment [title]="'The shape of your eyebrows should compliment the shape of your face.'"
             [subtitle]="'Similarly the shaping method should compliment the growth pattern of your eyebrows.'"
             [type]="'intro'">

    </segment>
    <segment [pretitle]="'Services'" [title]="'The shape of your eyebrows should compliment the shape of your face'"  [subtitle]="'Similarly the shaping method should compliment the growth pattern of your eyebrows'">
      <services [services]='services' (open)='serviceModal($event)'></services>
      <action [type]="'action'" [label]="'Book Now'" (action)='onAction()'></action>
    </segment>
    <segment [type]="'lovely'"
             [title]="'Some of the awesome people that love The Lovely You'"
             [pretitle]="'Client Testimonials'">
      <testimonials></testimonials>
    </segment>

    <segment [title]="'Frequently Asked Questions'">
      <questions></questions>
      <action [type]="'action'" [label]="'Contact Us'" [tag]="'Do you have other question?'" (action)='onContact()'></action>
    </segment>

    <!--<segment [type]="'alternate'"-->
             <!--[pretitle]="'Products'"-->
             <!--[title]="'Sign up to interact with what matters most'"-->
             <!--[subtitle]="'Great stories deserve a great audience'">-->
      <!--<products></products>-->
      <!--<action [type]="'action'" [label]="'See All Products'" (action)='onAction()'></action>-->
    <!--</segment>-->
    <!--<segment [type]="'flat'"-->
             <!--[title]="'Frequently Asked Questions'"-->
             <!--[subtitle]="'Great stories deserve a great audience'"-->
             <!--[pretitle]="'Instafeed'" >-->
      <!--<instafeed></instafeed>-->
    <!--</segment>-->
    <segment [type]="'action'"
             [title]="'Save your spot now!'"
             [subtitle]="'Check availability. Helps to plan in advance as space is limited.'">
      <action [type]="'lovely'" [label]="'Book Now'" (action)='onAction()'></action>
    </segment>

  `,
  animations: [
    routeFadeStateTrigger
  ],
  styles: [`
    :host {
      display: block;
    }
    .segment-action {
      background-color: #384368;
      color: #FFF;
    }
    .container {
      padding-top: 4em;
    }
  `]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  services: Service[] = [
    {
      'title': 'Brow Waxing',
      'price': 25,
      'description': 'Involves removing hair from the root along with dead skin cells resulting in an ultra smooth feel to the touch.',
      'type': 'Waxing',
      'img': '/assets/hands.jpg',
    },
    {
      'title': 'Brow Tinting',
      'price': 30,
      'description': 'Involves adding pigment to the eyebrow to achieve an more defined look. this process can last anywhere from 2-3 weeks. ',
      'type': 'Shaping',
      'img': '/assets/hands.jpg',
    },
    {
      'title': 'Brow Shaping',
      'price': 35,
      'description': 'Do you ever wake up wondering, “I’ve made a huge mistake”?',
      'type': 'Tinting',
      'img': '/assets/hands.jpg',
    }
  ];
  constructor(private router: Router,
              private modalService: ModalService,
              private slimLoadingBarService: SlimLoadingBarService) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.slimLoadingBarService.complete();
  }

  onAction() {
    this.router.navigate(['booking']);
  }

  onContact() {
    this.router.navigate(['contact']);
  }
  serviceModal(service): void {
    // console.log(service);
    const modal$ = this.modalService.create(SharedModule, ServiceModalComponent, {
      service: service,
      goToBooking: () => {
        this.router.navigate(['booking']);
      }
    });
  }

}
