import { test, expect } from '@playwright/test'
import selectors from '../selectors.json'

test.describe('open and close sidecart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('test', async ({ page }) => {
    
  })
})
