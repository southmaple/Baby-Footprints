import { test, expect } from '@playwright/test'

test('renders the home page', async ({ page }) => {
  await page.goto('./')
  await expect(page.locator('h1')).toHaveText('You did it!')
})

test('renders the not-found page for unknown routes', async ({ page }) => {
  await page.goto('missing-page')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
  await expect(page).toHaveTitle('Page not found | Baby Footprints')
})
