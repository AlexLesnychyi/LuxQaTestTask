import loginPage from "../pageobjects/login.page.js";

describe("My Login application", () => {
  beforeEach(async () => {
    await loginPage.open();
  });
  
  it("Login with invalid password", async () => {
    await expect(loginPage.inputPassword).toHaveAttribute("type", "password");

    await loginPage.login("standard_user", "qwerty12345");

    await loginPage.verifyErrorMessage()
  });
});
