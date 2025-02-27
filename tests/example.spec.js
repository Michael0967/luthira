import { test } from '@playwright/test'
import auth from '../pages/auth'
import fs from 'fs'

const SESSION_FILE = 'session.json'

// Only use storageState if the file already exists.
if (fs.existsSync(SESSION_FILE)) {
  test.use({ storageState: SESSION_FILE })
}

test.describe('open and close sidecart', () => {
  test.beforeAll(async ({ browser }) => {
    if (!fs.existsSync(SESSION_FILE)) {
      const context = await browser.newContext()
      const page = await context.newPage()

      await page.goto(process.env.BASE_URL)
      await auth.breakPassword(page)
      await page.goto(`${process.env.BASE_URL}?preview_theme_id=${process.env.PREVIEW}`)

      // Save session to file
      await context.storageState({ path: SESSION_FILE })
      await context.close()
    }
  })

  test('test', async ({ page }) => {
    console.log('test')
  })
})
