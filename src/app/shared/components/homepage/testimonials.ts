import {Component, Input} from "@angular/core";
@Component({
  selector: 'testimonials',
  template: `
    <div class="discover__row container">
      <div class="discover__col">
        <div class="testimonial">
          <p>Cuando encuentras una persona que ama su trabajo y pone empeño, dedicacion al final este es el resultado, unas cejas como nunca las habia tenido, Dios bendiga tu talento y profesionalismo, se que tu nombre brillara entre las mejores de New York en tu area profesional.</p>
        </div>
        <!--<div class="avatar">-->
        <!--<img src="/assets/t2.png" class="avatar-image avatar-image&#45;&#45;icon" alt="name">-->
        <!--</div>-->
        <!--<h5>Gabrielle Campbell</h5>-->
        <br>
        <small>@yennyhc</small>
      </div>
      
      <div class="discover__col">
        <div class="testimonial">
          <p>I struggle with eyebrow growth. I have been them grow since my maternity photoshoot nearly a year ago. As you can see from the top photo they didn't grow much.
            However The Lovely You managed to make my eyebrows look better than ever before. So happy I took this step. Thank you for making my time there feel so welcoming and for bringing my eyebrows back to life. You are AMAZING at what you do. Thank you. Thank you Thank you.</p>
        </div>
        <!--<div class="avatar">-->
          <!--<img src="/assets/t1.png" class="avatar-image avatar-image&#45;&#45;icon" alt="name">-->
        <!--</div>-->
        <!--<h5>Ana Stanley</h5>-->
        <br>
        <small>@_your_favorite_nerd_</small>
      </div>
     
      <div class="discover__col">
        <div class="testimonial">
          <p>Can you just take a second to notice my brows, I have't let anyone touch my brows in more than a year and a half because they never got it right but then I came across The Lovely You and I thought "yeah I have to let her do my brows" and I was amazed . SO SO HAPPY! ladies check her out! I promise you won't be disappointed. She's such a sweet heart and doesn't rush her work!</p>
        </div>
        <!--<div class="avatar">-->
          <!--<img src="/assets/t3.png" class="avatar-image avatar-image&#45;&#45;icon" alt="name">-->
        <!--</div>-->
        <!--<h5>Jennifer Fisher</h5>-->
        <br>
        <small>@kriss_teen_88</small>
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

    @media screen and (max-width: 767px) {
      .testimonial {
        margin: 1em 0;
      }
    }
    

    * {
      box-sizing: border-box;
    }
  `]
})
export class TestimonialsComponent {
  @Input() background;

}

