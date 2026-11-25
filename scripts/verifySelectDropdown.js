import puppeteer from 'puppeteer-core';

async function testSelect() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  console.log('Navigating to Home...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Click Enroll / Apply button to open EnrollModal
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      b.textContent.includes('Apply') || b.textContent.includes('Enroll') || b.textContent.includes('Get Started')
    );
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Inspect the select and options styles in DOM
  const styles = await page.evaluate(() => {
    const select = document.querySelector('select[name="program"]');
    if (!select) return null;
    const options = Array.from(select.querySelectorAll('option'));
    return {
      selectColor: window.getComputedStyle(select).color,
      selectBg: window.getComputedStyle(select).backgroundColor,
      selectColorScheme: window.getComputedStyle(select).colorScheme,
      optionsCount: options.length,
      optionSamples: options.slice(0, 5).map(o => ({
        text: o.textContent,
        color: window.getComputedStyle(o).color,
        bg: window.getComputedStyle(o).backgroundColor
      }))
    };
  });

  console.log('Select & Options Computed Styles:', JSON.stringify(styles, null, 2));

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v8-enroll-modal-dropdown-fixed.png'
  });
  console.log('Saved screenshot: v8-enroll-modal-dropdown-fixed.png');

  await browser.close();
  console.log('Verification completed successfully!');
}

testSelect().catch(console.error);
