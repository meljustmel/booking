import {Component, Input} from "@angular/core";
@Component({
  selector: 'questions',
  template: `
    <div class="container">
      <div class="discover__row">
        <div class="discover__col">
          <div class="article-card">
            <h3>Can I choose any platform for my Free Trial ?</h3>
            <p>Rapture takes the hassle out of going through the feedback on a design,
              which ultimately speeds up the entire process, something everyone wants.
              It's a brilliant product.</p>
          </div>
        </div>
        <div class="discover__col">
          <div class="article-card">
            <h3>Can I choose any platform for my Free Trial ?</h3>
            <p>Rapture has made massive improvements when communicating design at TMW.
              There are usually many stakeholders involved in the process, both internally
              and externally, and having a simple platform for feedback and approval is
              extremely helpful. Awesome work guys!</p>
          </div>
        </div>
      </div>
      <div class="discover__row">
        <div class="discover__col">
          <div class="article-card">
            <h3>Can I choose any platform for my Free Trial ?</h3>
            <p>Rapture has made massive improvements when communicating design at TMW.
              There are usually many stakeholders involved in the process, both internally
              and externally, and having a simple platform for feedback and approval is
              extremely helpful. Awesome work guys!</p>
          </div>
        </div>
        <div class="discover__col">
          <div class="article-card">
            <h3>Can I choose any platform for my Free Trial ?</h3>
            <p>Rapture takes the hassle out of going through the feedback on a design,
              which ultimately speeds up the entire process, something everyone wants.
              It's a brilliant product.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1040px;
      margin:0 auto;
      padding-bottom: 4em;
    }
    .discover__row {
      margin: 0;
      padding: 0;
    }
    .discover__col {
      text-align: left;
      width: 50%;
      padding: 1em;
    }
    h3 {
      
    }
    p {
      padding-top: 1em;
      font-size: 1.1em;
      opacity: 0.7;
    }

  `]
})
export class QuestionsComponent {
  @Input() background;
}

