import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {

beforeEach(async () => {
            await LoginPage.open()
            await expect(await browser.getUrl()).toBe("https://www.saucedemo.com/")
            await expect(LoginPage.inputPassword).toHaveAttribute("type", "password")
            await LoginPage.login('standard_user', 'secret_sauce')
            expect(await browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');
    })
    async function addToCart(itemId) {
        await $(`//button[contains(@id, "${itemId}")]`).click();
        await expect($('//span[@class="shopping_cart_badge"]')).toHaveText("1");
    }
    async function verifyCart(itemId) {
        let shoppingCart = await $('#shopping_cart_container');
        await shoppingCart.click();
        await expect($(`//button[contains(@id, "${itemId}")]`)).toBeExisting();
    }
    async function verifyMenu() {
        let burgerBtn = await $('#react-burger-menu-btn');
        let menuWrap = await $('//div[@class="bm-menu-wrap"]');
        
        let menuWrapBefore = await menuWrap.getAttribute('aria-hidden');
        await expect(menuWrapBefore).toBe("true");

        await burgerBtn.click();

        let menuWrapAfter = await menuWrap.getAttribute('aria-hidden');
        await expect(menuWrapAfter).toBe("false");

        let menuList = await $('//nav[@class="bm-item-list"]');
        let menuItems = await menuList.$$('a');
        await expect(menuItems).toHaveLength(4);
    }
    async function verifyLogOut(params) {

        await expect(LoginPage.btnSubmit).toBeExisting()
        await expect(LoginPage.inputUsername).toHaveValue("")
        await expect(LoginPage.inputPassword).toHaveValue("")
        
    }
    async function getSortedItems(selector) {
    return await $$(selector).map(async item => await item.getText());
    }
    async function verifyAllSortings() {
    let sortDropdown = await $('.product_sort_container');
    let sortingOptions = [
        'Price (low to high)',
        'Price (high to low)',
        'Name (A to Z)',
        'Name (Z to A)'
    ];

    for (let option of sortingOptions) {
        await sortDropdown.selectByVisibleText(option);
        await browser.pause(1000); // Wait for sorting to apply

        const productNames = await getSortedItems('.inventory_item_name');
        const productPrices = await getSortedItems('.inventory_item_price');
        productPrices = productPrices.map(price => parseFloat(price.replace('$', '')));

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
    }
    it('Sorting', async () => {   
    await verifyAllSortings();
    })
})

