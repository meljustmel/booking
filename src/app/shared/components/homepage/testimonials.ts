import {Component, Input} from "@angular/core";
@Component({
  selector: 'testimonials',
  template: `
    <div class="discover__row container">
      <div class="discover__col">
        <div class="testimonial">
          <p>Rapture takes the hassle out of going through the feedback on a design,
            which ultimately speeds up the entire process, something everyone wants.
            It's a brilliant product.</p>
        </div>
        <div class="avatar">
          <img src="/assets/t1.png" class="avatar-image avatar-image--icon" alt="name">
        </div>
        <h5>Ana Stanley</h5>
        <small>@username</small>
      </div>
      <div class="discover__col">
        <div class="testimonial">
          <p>Rapture has made massive improvements when communicating design at TMW.
            There are usually many stakeholders involved in the process, both internally
            and externally, and having a simple platform for feedback and approval is
            extremely helpful. Awesome work guys!</p>
        </div>
        <div class="avatar">
          <img src="/assets/t2.png" class="avatar-image avatar-image--icon" alt="name">
        </div>
        <h5>Gabrielle Campbell</h5>
        <small>@username</small>
      </div>
      <div class="discover__col">
        <div class="testimonial">
          <p>Easy to use, works great, customizable, and by far, the best support I have experienced.</p>
        </div>
        <div class="avatar">
          <img src="/assets/t3.png" class="avatar-image avatar-image--icon" alt="name">
        </div>
        <h5>Jennifer Fisher</h5>
        <small>@username</small>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1140px;
      margin: 0 auto;
      padding-bottom: 4em;
    }

    h5 {
      margin: auto;
    }

    small {
      opacity: 0.8;
    }

    p {
      background: #FFFFFF;
      margin: 0;
    }

    .discover__col {
      text-align: center;
      padding: 0;
    }

    .testimonial {
      background: #fff;
      border-radius: 10px;
      padding: 40px;
      position: relative;
      margin: 1em;
    }
    .testimonial:before, .testimonial:after {
      top: 100%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }
    .testimonial:before {
      border-top-color: #FFFFFF;
      border-width: 10px;
      margin-left: -10px;
      
    }
    .testimonial:before {
      border-top-color: #FFFFFF;
      border-width: 16px;
      margin-left: -16px;
    }
    .avatar {
      padding: 1em;
    }
    .avatar-image--icon {
      width: 70px;
      height: 70px;
    }
    

    * {
      box-sizing: border-box;
    }
  `]
})
export class TestimonialsComponent {
  @Input() background;

}

