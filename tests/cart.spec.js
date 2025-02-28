import { test, expect } from '@playwright/test'
import cart from '../pages/cart.js'
import auth from '../pages/auth.js'

const SESSION_FILE = 'session.json'
const STORE = process.env.STORE

test.describe('Cart', () => {
  test.beforeEach(async ({ page, context }) => {
    if (!STORE) {
      throw new Error('❌ STORE environment variable is not defined')
    }

    await page.goto(STORE)
    await auth.breakPassword(page)
    await page.goto(STORE)

    // Validar que la URL no contiene "/password"
    const currentUrl = page.url()
    expect(currentUrl).not.toContain('/password')

    // Guardar las cookies en un archivo JSON
    await context.storageState({ path: SESSION_FILE })
    console.log('✅ Session stored in', SESSION_FILE)
  })

  test('side cart should be closed on start', async ({ page }) => {
    await cart.isOpen(page, false)
  })

  test('open side cart', async ({ page }) => {
    await cart.toggle(page, 'open')
    await cart.isOpen(page, true)
  })

  test('close side cart', async ({ page }) => {
    await cart.toggle(page, 'open')
    await cart.isOpen(page, true)
    await cart.toggle(page, 'close')
    await cart.isOpen(page, false)
  })

  test('close side cart by clicking outside', async ({ page }) => {
    await cart.toggle(page, 'open')
    await cart.isOpen(page, true)
    await cart.toggle(page, 'closeOutside')
    await cart.isOpen(page, false)
  })
})
