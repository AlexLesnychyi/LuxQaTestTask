import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('My Login application', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('Logout and menu check', async () => {
    await inventoryPage.openMenu();

    await inventoryPage.verifyMenuItemsCount(4);

    await inventoryPage.logout();

    await loginPage.verifyInputsAreEmptyAfterLogOut();
  });
});
