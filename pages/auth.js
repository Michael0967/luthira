import selectors from '../selectors.json'

class Auth {
  constructor() {
    this.input = selectors.passwordPage.input
    this.passwordSelector = selectors.passwordPage.enter
  }

  async inputField(page) {
    await page.locator(this.input).fill(process.env.PASSWORD)
  }

  async enter(page) {
    await page.locator(this.passwordSelector).click()
  }

  async breakPassword(page) {
    const url = page.url()

    if (url.includes('password')) {
      await this.inputField(page)
      await this.enter(page)

      const newUrl = page.url()

      if (newUrl.includes('password')) {
        throw new Error('🔴 incorrect password')
      }
    }
  }
}

export default new Auth()
