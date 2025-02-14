import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkStepOne from '../pageobjects/check_step_one.js';
import checkStepTwo from '../pageobjects/check_step_two.js';
import checkoutCompletePage from '../pageobjects/checkout_complete.page.js';

describe('My Login application', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });
  it('Valid Checkout', async () => {
    const item = 'sauce-labs-backpack';
    await inventoryPage.addToCart(item);
    await inventoryPage.verifyCartBadge(1);
    await inventoryPage.openCart();

    await cartPage.verifyItemExistsInCart(item);
    await cartPage.clickCheckoutAndVerify();

    await checkStepOne.inputData('John', 'Doe', '12345');
    await checkStepOne.clickContinueAndVerify();

    await checkStepTwo.verifyTotalPrice();
    await checkStepTwo.clickFinishButtonAndVerify();

    await checkoutCompletePage.verifyThankYouMessage();
    await checkoutCompletePage.clickBackToProducts();

    await inventoryPage.verifyCartIsEmpty();
    await inventoryPage.verifyItemsExist();

    await expect(inventoryPage.cartIcon).toBeExisting();
  });
});
