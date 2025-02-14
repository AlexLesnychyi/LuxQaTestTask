import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Login Tests', () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  it('should login successfully and display inventory', async () => {
    await expect(loginPage.inputPassword).toHaveAttribute("type", "password");
    await loginPage.login('standard_user', 'secret_sauce');

    expect(await browser.getUrl()).toBe(
      'https://www.saucedemo.com/inventory.html'
    );

    await expect(inventoryPage.inventoryList).toBeExisting();
    const items = await inventoryPage.getInventoryItems();
    expect(items.length).toBeGreaterThan(0);

    await expect(inventoryPage.cartIcon).toBeExisting();
  });
});
