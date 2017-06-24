import {Component, Input} from "@angular/core";
@Component({
  selector: 'questions',
  template: `
    <div class="container">
      <div class="discover__row">
        <div class="discover__col">
          <div class="article-card">
            <h3>How much time does an average appointment take?</h3>
            <p>Allow for at the very least 30 minutes to be on the chair and plan to arrive at least 10-15 minutes early.</p>
          </div>
        </div>
        <div class="discover__col">
          <div class="article-card">
            <h3>How often do I need to schedule a visit?</h3>
            <p>Depending on the rate of growth anywhere between 4-5 weeks to maintain the brow shape.</p>
          </div>
        </div>
      </div>
      <div class="discover__row">
        <div class="discover__col">
          <div class="article-card">
            <h3>How do I know is I should get the extra strength formula or the sensitive skin version?</h3>
            <p>The easiest way is to sample your own skin, by dabbing a bit of each and waiting at least 12 hours to check for a reaction on the spot of the application.</p>
          </div>
        </div>
        <div class="discover__col">
          <div class="article-card">
            <h3>How soon do I need to reserve a time slot?</h3>
            <p>Depending on how critical it is to get done by a specific time I would book as soon as possible.</p>
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
    .lovely {
      background: #FEEADE;
    }
    h3 {
      
    }
    p {
      padding-top: 1em;
      font-size: 1.1em;
      opacity: 0.7;
    }
    @media screen and (max-width: 640px) {
      .discover__col {
        text-align: left;
        width: 100%;
        padding: .2em;
      }
      h3 {
        font-size: 20px;

      }
      .discover__col {
        margin-bottom: 1.2em;
      }
      
    }

  `]
})
export class QuestionsComponent {
  @Input() background;
}

