import Page from './page.js';

class LoginPage extends Page {
  get inputUsername() {
    return $('#user-name');
  }
  get inputPassword() {
    return $('#password');
  }
  get btnSubmit() {
    return $('input[type="submit"]');
  }
  get errorMessage() {
    return $('.error-message-container');
  } // Error handling
  get errorIcon() {
    return $('//div[@class="login-box"]');
  }

  async getBorderColor(element) {
    const color = await element.getCSSProperty('border-bottom-color');
    return color.value;
  }
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
  async verifyErrorMessage() {
    let errorMsg= "Epic sadface: Username and password do not match any user in this service"
    await expect(this.errorMessage).toHaveText(errorMsg);
    await expect(this.errorIcon).toBeExisting();

    const usernameColor = await this.getBorderColor(this.inputUsername);
    const passwordColor = await this.getBorderColor(this.inputPassword);

    expect(usernameColor).toBe('rgba(226,35,26,1)'); // Red border color
    expect(passwordColor).toBe('rgba(226,35,26,1)');
  }
  async verifyInputsAreEmptyAfterLogOut() {
    await expect(this.btnSubmit).toBeExisting();
    await expect(this.inputUsername).toHaveValue("");
    await expect(this.inputPassword).toHaveValue("");
  }

  open() {
    return super.open(''); // Base URL opens login page
  }
}

export default new LoginPage();
