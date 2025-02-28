import { expect } from '@playwright/test'
import selectors from '../selectors.json'

class Cart {
  constructor() {
    this.section = selectors.cart.section
    this.openIcon = selectors.cart.open
    this.closeIcon = selectors.cart.close
    this.closeOutsideSelector = selectors.cart.overlay
  }

  async toggle(page, action) {
    const actions = {
      open: this.openIcon,
      close: this.closeIcon,
      closeOutside: this.closeOutsideSelector,
    }

    if (!actions[action]) {
      throw new Error(`Invalid action: ${action}. Use 'open', 'close', or 'closeOutside'.`)
    }

    const element = page.locator(actions[action])
    await element.scrollIntoViewIfNeeded()
    await element.click({ force: true })
  }

  async isOpen(page, expected) {
    const section = page.locator(this.section)
    const expectedValue = expected ? 'true' : 'false'
    await expect(section).toHaveAttribute('data-active', expectedValue, { timeout: 500 })
  }
}

export default new Cart()
