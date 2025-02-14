import Page from './page.js';

class InventoryPage extends Page {
  get inventoryList() {
    return $('.inventory_list'); // Product list container
  }

  async getInventoryItems() {
    return await this.inventoryList.$$('.inventory_item'); // Get all products
  }

  get cartIcon() {
    return $('#shopping_cart_container'); // Cart icon
  }
  get logoutButton() {
    return $('#logout_sidebar_link');
  }
  get menuList() {
    return $('//nav[@class="bm-item-list"]');
  }
  get burgerMenuButton() {
    return $('#react-burger-menu-btn');
  }
  get menuWrap() {
    return $('//div[@class="bm-menu-wrap"]');
  }
  get menuList() {
    return $('//nav[@class="bm-item-list"]');
  }

  get cartBadge() {
    return $('//span[@class="shopping_cart_badge"]');
  }
  get sortDropdown() {
    return $('.product_sort_container');
  }
  get socialLinks() {
    return {
      Twitter: $('//a[text()="Twitter"]'),
      Facebook: $('//a[text()="Facebook"]'),
      LinkedIn: $('//a[text()="LinkedIn"]'),
    };
  }
  async openCart() {
    await this.cartIcon.click();
    await browser.waitUntil(
      async () =>
        (await browser.getUrl()) === 'https://www.saucedemo.com/cart.html',
      {
        timeout: 5000,
        timeoutMsg: 'Cart page did not load correctly',
      }
    );
  }
  async addToCart(itemId) {
    let currentCartCount = 0;

    if (await this.cartBadge.isExisting()) {
      currentCartCount = parseInt(await this.cartBadge.getText()) || 0;
    }

    await $(`//button[contains(@id, "${itemId}")]`).click();

    await this.cartBadge.waitForExist({ timeout: 5000 });

    const newCartCount = parseInt(await this.cartBadge.getText()) || 0;
    await expect(newCartCount).toBe(currentCartCount + 1);
  }

  async verifyCartBadge(expectedCount) {
    if (expectedCount === 0) {
      await expect(this.cartBadge).not.toBeExisting();
    } else {
      await expect(await this.cartBadge.getText()).toBe(
        expectedCount.toString()
      );
    }
  }
  async openMenu() {
    await expect(await this.menuWrap.getAttribute('aria-hidden')).toBe('true');
    await this.burgerMenuButton.click();
    await expect(await this.menuWrap.getAttribute('aria-hidden')).toBe('false');
  }

  async verifyMenuItemsCount(expectedCount) {
    const menuItems = await this.menuList.$$('a');
    await expect(menuItems).toHaveLength(expectedCount);
  }
  async getSortedItems(selector) {
    const elements = await $$(selector);
    let texts = [];

    for (let item of elements) {
      texts.push(await item.getText());
    }

    return texts;
  }
  async sortBy(option) {
    await this.sortDropdown.selectByVisibleText(option);
    await browser.pause(1000);
  }
  async verifySorting(option) {
    const productNames = await this.getSortedItems('.inventory_item_name');
    let productPrices = await this.getSortedItems('.inventory_item_price');
    productPrices = productPrices.map((price) =>
      parseFloat(price.replace('$', ''))
    );

    const expectedNames = [...productNames].sort();
    const expectedPrices = [...productPrices].sort((a, b) => a - b);

    if (option === 'Name (Z to A)') expectedNames.reverse();
    if (option === 'Price (high to low)') expectedPrices.reverse();

    if (option.includes('Name')) {
      await expect(productNames).toEqual(expectedNames);
    } else {
      await expect(productPrices).toEqual(expectedPrices);
    }
  }

  async verifyAllSortings() {
    const sortingOptions = [
      'Price (low to high)',
      'Price (high to low)',
      'Name (A to Z)',
      'Name (Z to A)',
    ];

    for (let option of sortingOptions) {
      await this.sortBy(option);
      await this.verifySorting(option);
    }
  }
  async clickSocialLink(linkText) {
    let link = this.socialLinks[linkText];
    let hrefValue = await link.getAttribute('href');
    await link.click();
    return hrefValue;
  }
  async waitForNewTab() {
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > 1,
      {
        timeout: 5000,
        timeoutMsg: 'New tab did not open',
      }
    );
  }
  async switchToNewTab(originalWindow) {
    const allWindows = await browser.getWindowHandles();
    const newWindow = allWindows.find((win) => win !== originalWindow);
    await browser.switchToWindow(newWindow);
  }
  async verifyFooterLink(linkText, originalWindow) {
    await this.clickSocialLink(linkText);

    let newTabUrl = await browser.getUrl();

    const domainMap = {
      Twitter: ['twitter.com', 'x.com'],
      Facebook: ['facebook.com'],
      LinkedIn: ['linkedin.com'],
    };

    const expectedDomains = domainMap[linkText];

    const isValid = expectedDomains.some((domain) =>
      newTabUrl.includes(domain)
    );
    expect(isValid).toBeTruthy();

    await browser.switchToWindow(originalWindow);
  }
  async verifyCartIsEmpty() {
    const cartBadgeText = await this.cartIcon.getText();
    await expect(cartBadgeText).toBe('');
  }
  async verifyItemsExist() {
    await expect(this.inventoryList).toBeExisting();

    const items = await this.getInventoryItems();
    await expect(items.length).toBeGreaterThan(0);
  }
  async logout() {
    await this.logoutButton.click();
  }
}

export default new InventoryPage();
