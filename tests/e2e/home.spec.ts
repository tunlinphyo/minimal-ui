import { expect, test } from '@playwright/test'

test('opens the contact popover and shows the contact links', async ({ page }) => {
  await page.goto('/')

  const trigger = page.getByRole('button', { name: "Open Tun`s contact list" })
  const contact = page.locator('#contact')

  await expect(contact).not.toBeVisible()

  await trigger.click()

  await expect(contact).toBeVisible()
  await expect(contact.getByRole('heading', { level: 2, name: 'Tun Lin Phyo' })).toBeVisible()
  await expect(contact.getByRole('link', { name: "Visit Tun's GitHub profile" })).toBeVisible()
  await expect(contact.getByRole('link', { name: 'Connect with Tun on LinkedIn' })).toBeVisible()
  await expect(contact.getByRole('link', { name: 'Send email to Tun' })).toBeVisible()
})

test('loads the homepage and opens the testimonials dialog', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Tun Lin Phyo')
  await expect(page.getByRole('heading', { level: 1, name: 'Frontend Engineer' })).toBeVisible()

  await page.getByRole('button', { name: 'Open testimonials dialog' }).click()

  const dialog = page.locator('dialog#testimonial')
  await expect(dialog).toHaveAttribute('open', '')
  await expect(dialog.getByRole('heading', { level: 2, name: 'What People Say' })).toBeVisible()

  const people = dialog.getByRole('button', { name: /Open testimonial from Person / })
  const messages = dialog.locator('.message')
  const peopleCount = await people.count()

  for (let index = 0; index < peopleCount; index += 1) {
    await people.nth(index).click()
    await expect(messages.nth(index)).toBeVisible()

    if (index < peopleCount - 1) {
      await page.waitForTimeout(1000)
    }
  }

  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Close testimonials dialog' }).click()
  await expect(dialog).not.toHaveAttribute('open', '')
})
