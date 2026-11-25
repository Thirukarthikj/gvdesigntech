import puppeteer from 'puppeteer-core';

async function verifyAdminSidebarMenus() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('gv_enrolled', 'true');
    localStorage.setItem('gv_admin_token', 'gv_session_verified');
    localStorage.setItem('gv_admin_user', JSON.stringify({
      name: 'Super Admin',
      email: 'admin@gvdesigntech.com',
      role: 'Administrator'
    }));
  });

  console.log('Navigating to Admin Dashboard...');
  await page.goto('http://localhost:3000/admin/dashboard', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot sidebar overview
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v18-admin-sidebar-new-menu-options.png'
  });
  console.log('Saved v18-admin-sidebar-new-menu-options.png');

  // Click on "Watch Demo Video"
  console.log('Navigating to Watch Demo Video...');
  await page.click('a[href="/admin/demo-video"]');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v19-admin-demo-video-dedicated-page.png'
  });
  console.log('Saved v19-admin-demo-video-dedicated-page.png');

  // Click on "Recent Activities"
  console.log('Navigating to Recent Activities...');
  await page.click('a[href="/admin/recent-activities"]');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v20-admin-recent-activities-dedicated-page.png'
  });
  console.log('Saved v20-admin-recent-activities-dedicated-page.png');

  // Click on "Enroll Form & Offer Banner"
  console.log('Navigating to Enroll Form & Offer Banner...');
  await page.click('a[href="/admin/enroll-form"]');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v21-admin-enroll-form-dedicated-page.png'
  });
  console.log('Saved v21-admin-enroll-form-dedicated-page.png');

  await browser.close();
  console.log('Verification finished successfully!');
}

verifyAdminSidebarMenus().catch(console.error);
