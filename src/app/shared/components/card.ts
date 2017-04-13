import {Component, OnInit} from "@angular/core";
const template = `
<div class="streamItem-card streamItem-card--postPreview u-paddingRight20 u-paddingLeft20 u-borderRadius3">
              <div class="streamItem-cardInner streamItem-cardInner--postPreview">
                <div class="postArticle postArticle--short">
                  <div class="u-clearfix u-marginBottom10">
                    <div class="postMetaInline u-floatLeft">
                      <div class="u-flexCenter">
                        <div class="postMetaInline-avatar u-flex0">
                          <a class="link avatar u-baseColor--link" href="#">
                            <img alt="Go to the profile of"
                                 class="avatar-image u-size36x36 u-xs-size32x32"
                                 src="https://cdn-images-1.medium.com/fit/c/72/72/0*wEUbPMQtxJoFvwRL.jpg">
                          </a>
                        </div>
                        <div class="postMetaInline-authorLockup u-flex1 u-noWrapWithEllipsis">
                          <a
                            class="link link link--darken link--accent u-accentColor--textNormal u-accentColor--textDarken u-baseColor--link">Melvin</a>
                          <div class="u-fontSize12 u-baseColor--textNormal u-textColorNormal">
                            <a class="link link--darken" href="#">
                              <time>Mar 27</time>
                            </a>
                            <span class="middotDivider u-fontSize12"></span>
                            <span class="readingTime" title="6 min read"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <a class="" data-action-source="web_digest---------4-----------"
                       href="https://medium.com/@katya_alexander/designing-the-sound-of-reality-680729bdae7a?source=web_digest---------4-----------">
                      <div class="postArticle-content js-postField">
                        <section class="section section--body section--first section--last">
                          <div class="section-divider">
                            <hr class="section-divider">
                          </div>
                          <div class="section-content">
                            <div class="section-inner sectionLayout--insetColumn">
                              <figure
                                class="graf graf--figure graf--layoutCroppedHeightPreview graf--leading"
                                id="0a7c">
                                <div class="aspectRatioPlaceholder is-locked">
                                  <div class="aspectRatioPlaceholder-fill"
                                       style="padding-bottom: 30%;"></div>
                                  <div
                                    class="progressiveMedia js-progressiveMedia graf-image is-canvasLoaded is-imageLoaded"
                                    data-height="2640"
                                    data-image-id="1*FYZkxJruQxW5-G8LgJ444Q.png"
                                    data-scroll="native" data-width="5655">
                                    <img
                                      class="progressiveMedia-thumbnail js-progressiveMedia-thumbnail"
                                      src="https://cdn-images-1.medium.com/freeze/fit/t/60/18/1*FYZkxJruQxW5-G8LgJ444Q.png?q=20">
                                    <canvas
                                      class="progressiveMedia-canvas js-progressiveMedia-canvas"
                                      height="22" width="75"></canvas>
                                    <img
                                      class="progressiveMedia-image js-progressiveMedia-image"
                                      data-src="https://cdn-images-1.medium.com/fit/t/1600/480/1*FYZkxJruQxW5-G8LgJ444Q.png"
                                      src="https://cdn-images-1.medium.com/fit/t/1600/480/1*FYZkxJruQxW5-G8LgJ444Q.png">
                                    <noscript class="js-progressiveMedia-inner">&lt;img
                                      class="progressiveMedia-noscript
                                      js-progressiveMedia-inner"
                                      src="https://cdn-images-1.medium.com/fit/t/1600/480/1*FYZkxJruQxW5-G8LgJ444Q.png"&gt;
                                    </noscript>
                                  </div>
                                </div>
                              </figure>
                              <h3 class="graf graf--h3 graf-after--figure graf--trailing graf--title"
                                  id="1747"><strong
                                class="markup--strong markup--h3-strong">Designing the
                                Sound of Reality: Lessons From Designing Spatial
                                Workstation</strong></h3>
                            </div>
                          </div>
                        </section>
                      </div>
                    </a>
                  </div>
                  <div class="postArticle-readMore">
                    <a class="button button--smaller button--chromeless u-baseColor--buttonNormal" href="#">Read
                      more…</a>
                  </div>
                  <div class="u-clearfix u-paddingTop10">
                    <div class="buttonSet buttonSet--withLabels u-floatLeft">
                      <div class="buttonSet-inner">
                        <div class="js-actionRecommend">
                          <button
                            aria-label="Recommend to share this article with your followers and let the author know you liked it"
                            class="button button--primary button--chromeless is-touchIconFadeInPulse u-accentColor--buttonNormal button--withIcon button--withSvgIcon u-accentColor--iconLight js-actionRecommendButton"
                            data-action="upvote" data-action-source="listing"
                            data-action-value="680729bdae7a"
                            title="Recommend to share this article with your followers and let the author know you liked it"><span
                            class="button-defaultState"><span
                            class="svgIcon svgIcon--heart svgIcon--25px is-flushLeft"><svg
                            class="svgIcon-use" height="25" viewbox="0 0 25 25" width="25">
														<path
                              d="M12.5 21a.492.492 0 0 1-.327-.122c-.278-.24-.61-.517-.978-.826-2.99-2.5-7.995-6.684-7.995-10.565C3.2 6.462 5.578 4 8.5 4c1.55 0 3 .695 4 1.89a5.21 5.21 0 0 1 4-1.89c2.923 0 5.3 2.462 5.3 5.487 0 3.97-4.923 8.035-7.865 10.464-.42.35-.798.66-1.108.93a.503.503 0 0 1-.327.12zM8.428 4.866c-2.414 0-4.378 2.05-4.378 4.568 0 3.475 5.057 7.704 7.774 9.975.243.2.47.39.676.56.245-.21.52-.43.813-.68 2.856-2.36 7.637-6.31 7.637-9.87 0-2.52-1.964-4.57-4.377-4.57-1.466 0-2.828.76-3.644 2.04-.1.14-.26.23-.43.23-.18 0-.34-.09-.43-.24-.82-1.27-2.18-2.03-3.65-2.03z"
                              fill-rule="evenodd"></path></svg></span></span><span
                            class="button-activeState"><span
                            class="svgIcon svgIcon--heartFilled svgIcon--25px is-flushLeft"><svg
                            class="svgIcon-use" height="25" viewbox="0 0 25 25" width="25">
														<path
                              d="M12.5 21a.492.492 0 0 1-.327-.122c-.278-.24-.61-.517-.978-.826-2.99-2.5-7.995-6.684-7.995-10.565C3.2 6.462 5.578 4 8.5 4c1.55 0 3 .695 4 1.89a5.21 5.21 0 0 1 4-1.89c2.923 0 5.3 2.462 5.3 5.487 0 3.97-4.923 8.035-7.865 10.464-.42.35-.798.66-1.108.93a.503.503 0 0 1-.327.12z"
                              fill-rule="evenodd"></path></svg></span></span></button>
                          <button
                            class="button button--chromeless u-baseColor--buttonNormal u-disablePointerEvents"
                            data-action="show-recommends" data-action-value="680729bdae7a">
                            39
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="buttonSet u-floatRight">
                      <div class="buttonSet-inner">
                        <a class="button button--chromeless u-baseColor--buttonNormal"
                           data-action-source="web_digest---------4-----------"
                           href="https://medium.com/@katya_alexander/designing-the-sound-of-reality-680729bdae7a?source=web_digest---------4-----------#--responses">3
                          responses</a>
                        <button aria-label="Bookmark this story to read later"
                                class="button button--chromeless is-touchIconFadeInPulse u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--bookmark js-bookmarkButton"
                                data-action="add-to-bookmarks" data-action-value="680729bdae7a"
                                title="Bookmark this story to read later"><span
                          class="button-defaultState"><span
                          class="svgIcon svgIcon--bookmark svgIcon--25px is-flushRight"><svg
                          class="svgIcon-use" height="25" viewbox="0 0 25 25" width="25">
													<path
                            d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"
                            fill-rule="evenodd"></path></svg></span></span><span
                          class="button-activeState"><span
                          class="svgIcon svgIcon--bookmarkFilled svgIcon--25px is-flushRight"><svg
                          class="svgIcon-use" height="26" viewbox="0 0 25 26" width="25">
													<path
                            d="M19 7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 17.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V7z"
                            fill-rule="evenodd"></path></svg></span></span></button>
                      </div>
                    </div>
        </div>
     </div>
  </div>
</div>
`;
@Component({
  selector: 'card',
  template,
  styles: []
})
export class CardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
