import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';

describe('My Login application', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });
  it('Saving the card after logout ', async () => {
    const item = 'sauce-labs-backpack';
    await inventoryPage.addToCart(item);
    await inventoryPage.verifyCartBadge(1);

    await inventoryPage.openMenu();
    await inventoryPage.verifyMenuItemsCount(4);
    await inventoryPage.logout();

    await loginPage.verifyInputsAreEmptyAfterLogOut();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.verifyCartBadge(1);
    await cartPage.openCart();
    await cartPage.verifyItemExistsInCart(item);
  });
});
