import Page from './page.js';

class CartPage extends Page {
  get checkoutButton() {
    return $('#checkout');
  }
  get cartList() {
    return $('.cart_list');
  }
  get errorMessageContainer() {
    return $('//div[contains(@class, "error-message-container")]');
  }
  async verifyItemExistsInCart(itemId) {
    await expect($(`//button[contains(@id, "${itemId}")]`)).toBeExisting();
  }
  async clickCheckout() {
    await this.checkoutButton.click();
  }
  async clickCheckoutAndVerify() {
    await this.checkoutButton.click();
    await browser.waitUntil(
      async () =>
        (await browser.getUrl()) ===
        'https://www.saucedemo.com/checkout-step-one.html',
      {
        timeout: 5000,
        timeoutMsg: 'Checkout step one page did not load correctly',
      }
    );
  }
  async verifyCartIsEmpty() {
    const cartItems = await this.cartList.$$('.cart_item');
    await expect(cartItems.length).toBe(0);
  }
  async verifyRedirectToCheckout() {
    const currentUrl = await browser.getUrl();
    if (currentUrl.includes('checkout-step-one.html')) {
      console.warn(
        'Bug detected: The page redirected to checkout-step-one despite the cart being empty.'
      );
      await expect(currentUrl).not.toContain('checkout-step-one.html');
    }
  }
  async verifyEmptyCartErrorMessage() {
    const errorMessage = await this.errorMessageContainer;
    if (await errorMessage.isExisting()) {
      let errorText = await errorMessage.getText();
      if (errorText.trim() === 'Cart is empty') {
        console.log("Correct error message displayed: 'Cart is empty'");
      } else {
        console.warn(`Unexpected error message displayed: '${errorText}'`);
      }
    } else {
      console.warn(
        'No error message displayed when trying to checkout with an empty cart.'
      );
    }
  }
}
export default new CartPage();
