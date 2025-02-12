import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
 beforeEach(async () => {
                     await LoginPage.open()
                     await expect(await browser.getUrl()).toBe("https://www.saucedemo.com/")
    })
     async function verifyErrorMsgOnLogin() {
            const errorMsg = await $('//div[@class="error-message-container error"]')
            await expect(errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service')
            const errorSvg = await $('//div[@class="login-box"]')
            const svgItem = await errorSvg.$$('svg')
            await expect(svgItem.length).toBeGreaterThan(0)
    
            const usernameField = await LoginPage.inputUsername;
            const usernameFieldColor = await usernameField.getCSSProperty('border-bottom-color');
            await expect(usernameFieldColor.value).toBe('rgba(226,35,26,1)'); // Red border color
    
            const passwordField = await LoginPage.inputPassword;
            const passwordFieldColor = await passwordField.getCSSProperty('border-bottom-color');
            await expect(passwordFieldColor.value).toBe('rgba(226,35,26,1)'); 
        }
    it('Login with invalid login', async () => {
        await expect(LoginPage.inputPassword).toHaveAttribute("type", "password")
        
        await LoginPage.login('qwerty12345', 'secret_sauce')

        await verifyErrorMsgOnLogin()
    })
})


