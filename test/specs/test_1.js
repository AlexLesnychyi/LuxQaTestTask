import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
beforeEach(async () => {
                 await LoginPage.open()
                 await expect(await browser.getUrl()).toBe("https://www.saucedemo.com/")
         })
    it('Valid Login', async () => {
        await expect(LoginPage.inputPassword).toHaveAttribute("type", "password")
    
        await LoginPage.login("standard_user","secret_sauce")

        expect(await browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');

        await expect($('#shopping_cart_container')).toBeExisting()
        const item_list = await $('.inventory_list')
        const item = await item_list.$$('.inventory_item')
        await expect(item.length).toBeGreaterThan(0)
    })
})

