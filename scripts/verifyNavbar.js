import puppeteer from 'puppeteer-core';

async function verifyNavbar() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('gv_enrolled', 'true');
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Click on Courses dropdown
  await page.click('.dropdown-trigger');
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/m44-navbar-curated-disciplines.png'
  });
  console.log('Saved screenshot: m44-navbar-curated-disciplines.png');

  await browser.close();
}

verifyNavbar().catch(console.error);
