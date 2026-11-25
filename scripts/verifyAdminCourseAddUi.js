import puppeteer from 'puppeteer-core';

async function verifyAdminCourseAddUi() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('gv_enrolled', 'true');
    localStorage.setItem('admin_token', 'sample-token');
  });

  console.log('Navigating to Admin Courses...');
  await page.goto('http://localhost:3000/admin/courses', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Click "+ Add Course Offering"
  const addBtn = await page.$('.admin-btn-primary');
  if (addBtn) {
    await addBtn.click();
    await new Promise(r => setTimeout(r, 600));

    // Choose department "AI & Data Science"
    await page.select('select.admin-input', 'AI & Data Science');
    await new Promise(r => setTimeout(r, 400));

    // Type Title
    const titleInput = await page.$('input[placeholder="e.g. Master Mechanical CAD & FEA Simulation"]');
    if (titleInput) {
      await titleInput.type('Generative AI & Deep Learning Systems');
    }

    await page.screenshot({
      path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v11-admin-add-course-department-selected.png'
    });
    console.log('Saved screenshot v11-admin-add-course-department-selected.png');

    // Click submit
    const submitBtn = await page.$('.admin-modal button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Now go to Home page and check Courses dropdown
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.click('.dropdown-trigger');
  await new Promise(r => setTimeout(r, 600));

  const items = await page.$$eval('.curated-item', els => els.map(el => ({
    title: el.querySelector('.curated-item-title')?.textContent?.trim(),
    modules: el.querySelector('.curated-item-modules')?.textContent?.trim(),
    href: el.getAttribute('href')
  })));
  console.log('Navbar items after Admin UI course add:', items);

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v12-navbar-after-admin-ai-add.png'
  });
  console.log('Saved screenshot v12-navbar-after-admin-ai-add.png');

  await browser.close();
}

verifyAdminCourseAddUi().catch(console.error);
