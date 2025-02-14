import loginPage from "../pageobjects/login.page.js";

describe("My Login application", () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  it("Login with invalid login", async () => {
    await expect(loginPage.inputPassword).toHaveAttribute("type", "password");

    await loginPage.login("qwerty12345", "secret_sauce");

    await loginPage.verifyErrorMessage()
  });
});
