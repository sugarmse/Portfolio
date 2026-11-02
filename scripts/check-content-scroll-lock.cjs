const { chromium } = require(process.argv[2]);
const assert = require('node:assert/strict');
const base = process.argv[4] || 'http://127.0.0.1:5173';

(async () => {
  const browser = await chromium.launch({ executablePath: process.argv[3], headless: true });
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 844 }, hasTouch: true });
      await page.goto(`${base}/content`);
      await page.locator('.j-navigation a[href="#places"]').click();
      await page.waitForTimeout(1200);
      const trigger = page.locator('.j-sailung-gallery .j-still button').first();
      await trigger.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      const before = await page.evaluate(() => scrollY);
      await trigger.click();
      const modal = page.locator('.j-dialog');
      assert(await modal.evaluate(element => element.open));
      const locked = await page.evaluate(() => ({
        y: scrollY,
        top: document.querySelector('#places').getBoundingClientRect().top,
        bodyPosition: getComputedStyle(document.body).position,
      }));
      assert.equal(locked.bodyPosition, 'fixed');
      await page.mouse.move(width / 2, 400);
      await page.mouse.wheel(0, 1500);
      await page.keyboard.press('PageDown');
      const session = await page.context().newCDPSession(page);
      await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: width / 2, y: 650 }] });
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: width / 2, y: 200 }] });
      await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await page.waitForTimeout(250);
      assert.equal(await page.evaluate(() => scrollY), locked.y);
      assert.equal(await page.locator('#places').evaluate(element => element.getBoundingClientRect().top), locked.top);
      await page.getByRole('button', { name: 'Next →' }).click();
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).position), 'fixed');
      // A short viewport must allow the viewer itself to scroll to its controls.
      await modal.evaluate(element => { element.style.maxHeight = '240px'; });
      await modal.hover();
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(150);
      assert(await modal.evaluate(element => element.scrollTop > 0));
      await page.keyboard.press('Escape');
      assert(Math.abs(await page.evaluate(() => scrollY) - before) < 2, 'Restore page position');
      assert.equal(await trigger.evaluate(element => element === document.activeElement), true);
      assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).position), 'fixed');
      await page.mouse.wheel(0, 500);
      await page.waitForTimeout(200);
      assert(await page.evaluate(() => scrollY) > before, 'Page scroll resumes');
      console.log(`${width}: wheel, keyboard and touch locked; viewer scroll, photo navigation, position and focus restoration passed`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
