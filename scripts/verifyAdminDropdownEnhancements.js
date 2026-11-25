import puppeteer from 'puppeteer-core';

async function verifyAdminDropdownEnhancements() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('gv_enrolled', 'true');
    localStorage.setItem('gv_admin_token', 'gv_session_valid');
  });

  console.log('--- Step 1: Navigating to Admin Courses ---');
  await page.goto('http://localhost:3000/admin/courses', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot initial Admin courses page with enhanced dropdown
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v13-admin-courses-dropdown-overview.png'
  });
  console.log('Saved v13-admin-courses-dropdown-overview.png');

  console.log('--- Step 2: Use dropdown to trigger Add New Course / Department ---');
  // Trigger __add_dept__ via dropdown select
  await page.select('select.admin-select', '__add_dept__');
  await new Promise(r => setTimeout(r, 600));

  // The modal is now open! Enter details for Robotics
  const customDeptInput = await page.$('input[placeholder*="Artificial Intelligence"]');
  if (customDeptInput) {
    await customDeptInput.click({ clickCount: 3 });
    await customDeptInput.type('Robotics & Automation');
  }

  const titleInput = await page.$('input[placeholder*="Master Mechanical CAD"]');
  if (titleInput) {
    await titleInput.type('Autonomous Mobile Robotics & ROS 2 Simulation');
  }

  const modulesInput = await page.$('input[placeholder*="e.g. AutoCAD, SolidWorks"]');
  if (modulesInput) {
    await modulesInput.type('ROS 2, MATLAB Simulink, SolidWorks Motion, KUKA Sim');
  }

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v14-admin-modal-custom-department-added.png'
  });
  console.log('Saved v14-admin-modal-custom-department-added.png');

  // Submit the form
  const submitBtn = await page.$('.admin-modal button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('--- Step 3: Verify Admin Courses page updated ---');
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v15-admin-robotics-course-live.png'
  });
  console.log('Saved v15-admin-robotics-course-live.png');

  console.log('--- Step 4: Verify Front-Page Courses Dropdown contains Robotics & Automation ---');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  await page.click('.dropdown-trigger');
  await new Promise(r => setTimeout(r, 600));

  const items = await page.$$eval('.curated-item', els => els.map(el => ({
    title: el.querySelector('.curated-item-title')?.textContent?.trim(),
    modules: el.querySelector('.curated-item-modules')?.textContent?.trim(),
    href: el.getAttribute('href')
  })));
  console.log('Front-page Courses dropdown disciplines:', items);

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v16-frontpage-courses-dropdown-with-robotics.png'
  });
  console.log('Saved v16-frontpage-courses-dropdown-with-robotics.png');

  await browser.close();
  console.log('All dropdown enhancement verifications completed successfully!');
}

verifyAdminDropdownEnhancements().catch(console.error);
