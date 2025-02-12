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

    it('Logout', async () => {
        
    
        const burgerBtn = await $('#react-burger-menu-btn')
        const menuWrapBefore = await $('//div[@class="bm-menu-wrap"]').getAttribute('aria-hidden')
        await expect(menuWrapBefore).toBe("true")

        await burgerBtn.click()

        const menuWrapAfter = await $('//div[@class="bm-menu-wrap"]').getAttribute('aria-hidden')
        await expect(menuWrapAfter).toBe("false")
        
        const menuList = await $('//nav[@class="bm-item-list"]')
        const menuItems = await menuList.$$('a')
        await expect(menuItems).toHaveLength(4)
        
        await $("#logout_sidebar_link").click()
        
        await expect(LoginPage.btnSubmit).toBeExisting()
        await expect(LoginPage.inputUsername).toHaveValue("")
        await expect(LoginPage.inputPassword).toHaveValue("")
    })
})

