import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('My Login application', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });
  it('Footer Links', async () => {
    let originalWindow = await browser.getWindowHandle();

    const socialLinks = ['Twitter', 'Facebook', 'LinkedIn'];

    for (let linkText of socialLinks) {
      await inventoryPage.verifyFooterLink(linkText, originalWindow);
    }
  });
});
