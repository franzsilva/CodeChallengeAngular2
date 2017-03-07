import { GistiaChallengePage } from './app.po';

describe('gistia-challenge App', () => {
  let page: GistiaChallengePage;

  beforeEach(() => {
    page = new GistiaChallengePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
