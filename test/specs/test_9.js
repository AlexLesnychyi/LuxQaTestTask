import { $, browser, expect } from '@wdio/globals'
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
         //rewritten from test 8 
    let cartBadge = await $('//span[@class="shopping_cart_badge"]');
    
    let currentCartCount = 0;
    if (await cartBadge.isExisting()) {
        // If it exists, get the current cart count
        let badgeText = await cartBadge.getText();
        currentCartCount = parseInt(badgeText) || 0;  // Default to 0 if the badge is empty
    }

    await $(`//button[contains(@id, "${itemId}")]`).click();

    await cartBadge.waitForExist({ timeout: 5000 });

    let newCartCount = await cartBadge.getText();
    newCartCount = parseInt(newCartCount) || 0;  

    await expect(newCartCount).toBe(currentCartCount + 1);
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
    async function verifyLogOut() {

        await expect(LoginPage.btnSubmit).toBeExisting()
        await expect(LoginPage.inputUsername).toHaveValue("")
        await expect(LoginPage.inputPassword).toHaveValue("")
        
    }
    async function inputData(firstName,lastName,postalCode) {
        await $('#first-name').setValue(firstName);
        await $('#last-name').setValue(lastName);
        await $('#postal-code').setValue(postalCode);
    }
    async function checkEmptyCart() {
        let shoppingCart = await $('#shopping_cart_container');
        let shopText = await shoppingCart.getText()
        await expect(shopText).toBe("")
    }
    async function verifyProductsExist(items) {
        for (let item of items) {
        const button = await $(`//button[contains(@id, "${item}")]`);
        await button.waitForExist({ timeout: 5000 }); 
        await expect(button).toBeExisting(); 
    }
    }
    async function verifyTotalPrice() {
   
    const priceElements = await $$('.cart_item .inventory_item_price');

    let calculatedSubtotal = 0;
    for (let priceElement of priceElements) {
        let priceText = await priceElement.getText(); 
        let priceValue = parseFloat(priceText.replace("$", "")); 
        calculatedSubtotal += priceValue;
    }

    const taxText = await $('.summary_tax_label').getText();
    const taxAmount = parseFloat(taxText.replace("Tax: $", ""));

    const totalText = await $('.summary_total_label').getText();
    const totalPrice = parseFloat(totalText.replace("Total: $", ""));

    await expect(totalPrice).toBe(calculatedSubtotal + taxAmount);
    }
    async function verifyCartIsEmpty() {
    await $('#shopping_cart_container').click();
    await expect(await browser.getUrl()).toBe("https://www.saucedemo.com/cart.html");

    const cartList = await $('.cart_list');
    const cartItems = await cartList.$$('.cart_item');
    await expect(cartItems.length).toBe(0);

}


    it('Checkout without products', async () => {
        // await addToCart(items[0]) check if verify empty cart work or no 
        await verifyCartIsEmpty()
        await $('#checkout').click()
        const errorMessage = await $('//div[contains(@class, "error-message-container")]'); 

        if (await errorMessage.isExisting()) {
        let errorText = await errorMessage.getText();
        if (errorText.trim() === "Cart is empty") {
            console.log("Correct error message displayed: 'Cart is empty'");
             } else {
            console.warn(`Unexpected error message displayed: '${errorText}'`);
        }
                } else {
        console.warn("No error message displayed when trying to checkout with an empty cart.");
    }
    })
})

