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
    async function verifyLogOut(params) {

        await expect(LoginPage.btnSubmit).toBeExisting()
        await expect(LoginPage.inputUsername).toHaveValue("")
        await expect(LoginPage.inputPassword).toHaveValue("")
        
    }
    it('Saving the card after logout ', async () => {
       
        //add Item to Cart
        const item = "sauce-labs-backpack"
        // let item2 = "sauce-labs-bolt-t-shirt"
        await addToCart(item)
        // await addToCart(item2)
        await verifyCart(item)
        await verifyMenu()

        await $("#logout_sidebar_link").click()
        
        await verifyLogOut()
        
        await LoginPage.login('standard_user', 'secret_sauce')

    
        await verifyCart(item)
    })
})

