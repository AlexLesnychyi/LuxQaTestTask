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
        
    
        let burgerBtn = await $('#react-burger-menu-btn')
        let menuWrapBefore = await $('//div[@class="bm-menu-wrap"]').getAttribute('aria-hidden')
        await expect(menuWrapBefore).toBe("true")

        await burgerBtn.click()

        let menuWrapAfter = await $('//div[@class="bm-menu-wrap"]').getAttribute('aria-hidden')
        await expect(menuWrapAfter).toBe("false")
        
        let menuList = await $('//nav[@class="bm-item-list"]')
        let menuItems = await menuList.$$('a')
        await expect(menuItems).toHaveLength(4)
        
        await $("#logout_sidebar_link").click()
        
        await expect(LoginPage.btnSubmit).toBeExisting()
        await expect(LoginPage.inputUsername).toHaveValue("")
        await expect(LoginPage.inputPassword).toHaveValue("")
    })
})

