import Page from './page.js';

class CheckStepOne extends Page {
  get firstNameField() {
    return $('#first-name');
  }

  get lastNameField() {
    return $('#last-name');
  }

  get postalCodeField() {
    return $('#postal-code');
  }
  get continueButton() {
    return $('#continue');
  }
  async clickContinueAndVerify() {
    await this.continueButton.click();
    await browser.waitUntil(
      async () =>
        (await browser.getUrl()) ===
        'https://www.saucedemo.com/checkout-step-two.html',
      {
        timeout: 5000,
        timeoutMsg: 'Checkout step two page did not load correctly',
      }
    );
  }
  async inputData(firstName, lastName, postalCode) {
    await this.firstNameField.setValue(firstName);
    await this.lastNameField.setValue(lastName);
    await this.postalCodeField.setValue(postalCode);
  }
}

export default new CheckStepOne();
