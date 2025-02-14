import Page from './page.js';

class CheckoutCompletePage extends Page {
  get thankYouMessage() {
    return $("//h2[text()='Thank you for your order!']");
  }
  get backToProductsButton() {
    return $('#back-to-products');
  }
  async verifyThankYouMessage() {
    await expect(this.thankYouMessage).toBeExisting();
  }
  async clickBackToProducts() {
    await this.backToProductsButton.click();
    await browser.waitUntil(
      async () =>
        (await browser.getUrl()) === 'https://www.saucedemo.com/inventory.html',
      {
        timeout: 5000,
        timeoutMsg: 'Inventory page did not load correctly',
      }
    );
  }
}

export default new CheckoutCompletePage();
