import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import fs from 'fs'

// Load environment variables
dotenv.config()

// Define session path
const SESSION_FILE = process.env.SESSION_FILE || 'session.json'

// Check if the session exists before assigning it
const storageState = fs.existsSync(SESSION_FILE) ? SESSION_FILE : undefined

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://printemps-a-paris.myshopify.com/',
    trace: 'on-first-retry',
    storageState,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
