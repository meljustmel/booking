import { RackPage } from './app.po';

describe('rack App', () => {
  let page: RackPage;

  beforeEach(() => {
    page = new RackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
