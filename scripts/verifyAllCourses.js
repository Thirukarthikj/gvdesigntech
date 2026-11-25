import puppeteer from 'puppeteer-core';

async function verify() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  // Set Auth and bypass modal
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('gv_enrolled', 'true');
    localStorage.removeItem('gv_admin_courses');
    localStorage.setItem('gv_admin_token', 'mock_admin_token');
    localStorage.setItem('gv_admin_user', JSON.stringify({ name: 'Vinith Gunasekaran', role: 'Super Admin' }));
  });

  console.log('Navigating to Admin Courses...');
  await page.goto('http://localhost:3000/admin/courses', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/m39-admin-all-courses-catalog.png'
  });
  console.log('Saved screenshot: m39-admin-all-courses-catalog.png');

  // Filter by Mechanical in Admin
  await page.select('select.admin-select', 'Mechanical');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/m40-admin-mech-filter.png'
  });
  console.log('Saved screenshot: m40-admin-mech-filter.png');

  // Filter by Computer Science in Admin
  await page.select('select.admin-select', 'Computer');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/m41-admin-cs-filter.png'
  });
  console.log('Saved screenshot: m41-admin-cs-filter.png');

  // Filter by Curated Disciplines in Admin
  await page.select('select.admin-select', 'disciplines');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/m42-admin-disciplines-filter.png'
  });
  console.log('Saved screenshot: m42-admin-disciplines-filter.png');

  // Verify Public CNC page
  console.log('Navigating to Public CNC page...');
  await page.goto('http://localhost:3000/cnc-programming', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.evaluate(() => window.scrollTo(0, 950));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/m43-public-cnc-courses.png'
  });
  console.log('Saved screenshot: m43-public-cnc-courses.png');

  await browser.close();
  console.log('All course verifications complete!');
}

verify().catch(console.error);
