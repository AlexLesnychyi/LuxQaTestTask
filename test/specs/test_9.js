import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';

describe('My Login application', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });
  it('Checkout without products', async () => {
    await inventoryPage.openCart();

    await cartPage.verifyCartIsEmpty();
    await cartPage.clickCheckout();
    await cartPage.verifyRedirectToCheckout();
    await cartPage.verifyEmptyCartErrorMessage();
  });
});
