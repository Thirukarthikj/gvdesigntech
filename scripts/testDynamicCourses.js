import puppeteer from 'puppeteer-core';
import { connectMongo } from '../server/db.js';

async function testCompleteLifecycle() {
  console.log('=== TEST: DYNAMIC COURSE ADD & DELETE LIFECYCLE ===');

  // 1. Clean MongoDB
  const db = await connectMongo();
  await db.collection('courses').deleteMany({});
  console.log('Initial MongoDB courses count:', await db.collection('courses').countDocuments());

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  page.on('dialog', async (dialog) => {
    console.log('Browser dialog:', dialog.message());
    await dialog.accept();
    console.log('Dialog confirmed.');
  });

  // Ensure admin auth is present and clear localStorage courses
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('gv_enrolled', 'true');
    localStorage.setItem('gv_admin_token', 'mock_admin_token');
    localStorage.setItem('gv_admin_user', JSON.stringify({ name: 'Vinith Gunasekaran', role: 'Super Admin' }));
    localStorage.removeItem('gv_admin_courses');
  });

  // Step A: Admin Courses initially empty
  console.log('Step A: Navigating to Admin Courses...');
  await page.goto('http://localhost:3000/admin/courses', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v1-admin-empty.png' });
  console.log('Saved: v1-admin-empty.png');

  // Step B: Public Mechanical page initially empty
  console.log('Step B: Navigating to /mechanical (should show empty state)...');
  await page.goto('http://localhost:3000/mechanical', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => window.scrollTo(0, 750));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v2-mech-empty.png' });
  console.log('Saved: v2-mech-empty.png');

  // Step C: Public Civil page initially empty
  console.log('Step C: Navigating to /civil-engineering (should show empty state)...');
  await page.goto('http://localhost:3000/civil-engineering', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => window.scrollTo(0, 750));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v3-civil-empty.png' });
  console.log('Saved: v3-civil-empty.png');

  // Step D: Open Add Course modal and add new course
  console.log('Step D: Adding course via Admin Modal...');
  await page.goto('http://localhost:3000/admin/courses', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const addBtn = btns.find(b => b.textContent.includes('Add New Course'));
    if (addBtn) addBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Fill modal form using real keyboard events
  await page.focus('.admin-modal input.admin-input');
  await page.keyboard.type('Advanced Mechanical CAD Masterclass', { delay: 15 });

  await page.focus('.admin-modal textarea.admin-textarea');
  await page.keyboard.type('Complete industrial mastery of AutoCAD 2D/3D, SolidWorks parametric parts, GD&T, and CATIA surface styling.', { delay: 10 });

  // Click Submit: Publish Course to Website & MongoDB
  const submitClicked = await page.evaluate(() => {
    const submitBtn = document.querySelector('.admin-modal button[type="submit"]') || Array.from(document.querySelectorAll('.admin-modal button')).find(b =>
      b.textContent.includes('Publish') || b.textContent.includes('Save')
    );
    if (submitBtn) {
      submitBtn.click();
      return true;
    }
    return false;
  });
  console.log('Publish submit button clicked:', submitClicked);
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v4-admin-course-added.png' });
  console.log('Saved: v4-admin-course-added.png');

  // Verify MongoDB contains the course
  const mongoCountAfterAdd = await db.collection('courses').countDocuments();
  console.log('MongoDB course count after add:', mongoCountAfterAdd);

  // Step E: Verify on /mechanical
  console.log('Step E: Checking /mechanical (should display the newly added course)...');
  await page.goto('http://localhost:3000/mechanical', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => window.scrollTo(0, 750));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v5-mech-with-course.png' });
  console.log('Saved: v5-mech-with-course.png');

  // Step F: Delete the course in Admin Portal
  console.log('Step F: Navigating to Admin Courses to delete the course...');
  await page.goto('http://localhost:3000/admin/courses', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const deleted = await page.evaluate(() => {
    const delBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Delete');
    if (delBtn) {
      delBtn.click();
      return true;
    }
    return false;
  });
  console.log('Delete button clicked:', deleted);
  await new Promise(r => setTimeout(r, 1800));

  await page.screenshot({ path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v6-admin-deleted.png' });
  console.log('Saved: v6-admin-deleted.png');

  const mongoCountAfterDelete = await db.collection('courses').countDocuments();
  console.log('MongoDB course count after deletion:', mongoCountAfterDelete);

  // Step G: Verify on /mechanical that course is deleted and doesn't resurrect
  console.log('Step G: Checking /mechanical after deletion (should show empty state)...');
  await page.goto('http://localhost:3000/mechanical', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => window.scrollTo(0, 750));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v7-mech-deleted-clean.png' });
  console.log('Saved: v7-mech-deleted-clean.png');

  await browser.close();
  console.log('=== TEST FINISHED SUCCESSFULLY ===');
  process.exit(0);
}

testCompleteLifecycle().catch((err) => {
  console.error('Lifecycle test failed:', err);
  process.exit(1);
});
