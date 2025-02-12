import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('Login with invalid password', async () => {
        await LoginPage.open()

        await expect(LoginPage.inputPassword).toHaveAttribute("type", "password")

        await LoginPage.login('standard_user', 'qwerty12345')

        const errorMsg = await $('//div[@class="error-message-container error"]')
        await expect(errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service')
        let errorSvg = await $('//div[@class="login-box"]')
        let svgItem = await errorSvg.$$('svg')
        await expect(svgItem.length).toBeGreaterThan(0)
       
    })
})


