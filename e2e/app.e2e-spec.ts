import { WwwMelvinPage } from './app.po';

describe('www-melvin App', function() {
  let page: WwwMelvinPage;

  beforeEach(() => {
    page = new WwwMelvinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
