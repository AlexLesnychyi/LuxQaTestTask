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
    async function switchToNewTab() {
    const allWindows = await browser.getWindowHandles();
    const newWindow = allWindows[allWindows.length - 1]; 
    await browser.switchToWindow(newWindow);
    }
    async function waitNewTab() {
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1, {
        timeout: 5000,
        timeoutMsg: 'New tab did not open'
        });
    }
    async function clickLink(linkText) {
        let link = await $(`//a[text()="${linkText}"]`)
        let hrefValue = await link.getAttribute('href')
        await link.click()
        return hrefValue
    }
    it('Footer Links', async () => {
        let originalWindow = await browser.getWindowHandle();

        const socialLinks = ["Twitter", "Facebook", "LinkedIn"];

        for (let linkText of socialLinks) {
            let expectedUrl = await clickLink(linkText);
            await waitNewTab();
            await switchToNewTab(originalWindow);

            let newTabUrl = await browser.getUrl();

            // fix the issue with old twitter link in href  
            if (linkText === "Twitter") {
                expect(newTabUrl.includes("twitter.com") || newTabUrl.includes("x.com")).toBeTruthy();
            } else {
                expect(newTabUrl).toContain(expectedUrl);
            }
            await browser.switchToWindow(originalWindow);
        }       
    })
})

