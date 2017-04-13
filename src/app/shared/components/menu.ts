import {Component, OnInit} from '@angular/core';
const template = `
  <div class="popover js-popover popover--menu popover--userActions popover--globalNav u-resetSpectrum popover--bottom u-fixed is-active"
            style="left: 986px; top: 52px;">
            <div class="popover-inner js-popover-inner">
              <ul class="list list--borderless list--short list--large" role="menu">
                <li class="list-item list-item--dark u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/new-story" role="menuitem" tabindex="-1">New story</a>
                </li>
                <li class="list-item list-item--dark u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/me/stories/drafts" role="menuitem"
                     tabindex="-1">Stories</a>
                </li>
                <li class="list-item list-item--dark u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/me/series/drafts" role="menuitem"
                     tabindex="-1">Series</a>
                </li>
                <li class="list-item list-item--dark u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/me/stats" role="menuitem" tabindex="-1">Stats</a>
                </li>
                <li class="list-item list-item--separator"></li>
                <li class="list-item list-item--dark u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/browse/bookmarks" role="menuitem" tabindex="-1">Bookmarks</a>
                </li>
                <li class="list-item list-item--dark u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/me/publications" role="menuitem" tabindex="-1">Publications</a>
                </li>
                <li class="list-item list-item--dark u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/me/following/suggestions" role="menuitem" tabindex="-1">Customize
                    your interests</a>
                </li>
                <li class="list-item list-item--separator"></li>
                <li class="list-item u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/@mpachecodesign" role="menuitem"
                     tabindex="-1">Profile</a>
                </li>
                <li class="list-item u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://medium.com/me/settings" style="margin-bottom: 0px">Settings</a>
                </li>
                <li class="list-item u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="https://help.medium.com" role="menuitem" tabindex="-1"
                     target="_blank">Help</a>
                </li>
                <li class="list-item u-padding0">
                  <a class="button button--dark button--chromeless u-baseColor--buttonDark"
                     href="#" tabindex="-1">Sign out</a>
                </li>
              </ul>
            </div>
            <div class="popover-arrow" style="left: 134px;"></div>
          </div>
`;
@Component({
  selector: 'menu',
  template,
  styles: [`
    .list-item > .button {
      margin-bottom: 0px !important;
    }

  `]
})
export class MenuComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
