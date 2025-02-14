import Page from './page.js';

class CheckStepTwo extends Page {
  get priceElements() {
    return $$('.cart_item .inventory_item_price');
  }
  get taxLabel() {
    return $('.summary_tax_label');
  }
  get totalLabel() {
    return $('.summary_total_label');
  }
  get finishButton() {
    return $('#finish');
  }
  async clickFinishButtonAndVerify() {
    await this.finishButton.click();
    await browser.waitUntil(
      async () =>
        (await browser.getUrl()) ===
        'https://www.saucedemo.com/checkout-complete.html',
      {
        timeout: 5000,
        timeoutMsg: 'Checkout complete page did not load correctly',
      }
    );
  }
  async verifyTotalPrice() {
    const priceElements = await this.priceElements;

    let calculatedSubtotal = 0;
    for (let priceElement of priceElements) {
      let priceText = await priceElement.getText();
      let priceValue = parseFloat(priceText.replace('$', ''));
      calculatedSubtotal += priceValue;
    }

    const taxText = await this.taxLabel.getText();
    const taxAmount = parseFloat(taxText.replace('Tax: $', ''));

    const totalText = await this.totalLabel.getText();
    const totalPrice = parseFloat(totalText.replace('Total: $', ''));

    await expect(totalPrice).toBe(calculatedSubtotal + taxAmount);
  }
}

export default new CheckStepTwo();
