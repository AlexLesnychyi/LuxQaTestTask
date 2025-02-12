import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('Valid Login', async () => {
        await LoginPage.open()
        await expect(await browser.getUrl()).toBe("https://www.saucedemo.com/")
        await expect(LoginPage.inputPassword).toHaveAttribute("type", "password")

        await LoginPage.login('standard_user', 'secret_sauce')

        expect(await browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');
    })
})

