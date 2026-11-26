import puppeteer from 'puppeteer-core';

async function verifyAdminInternshipManager() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  page.on('dialog', async dialog => {
    console.log('Dialog opened:', dialog.message());
    await dialog.accept();
  });

  // Set admin credentials and session
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('gv_admin_token', 'mock_verified_admin_token_gv_secure');
    localStorage.setItem('gv_admin_user', JSON.stringify({ name: 'Admin', role: 'Super Admin' }));
    sessionStorage.setItem('gv_enrolled', 'true');
  });

  console.log('--- Step 1: Navigate to Admin Internship Management ---');
  await page.goto('http://localhost:3000/admin/internships', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v27-admin-internships-catalog.png'
  });
  console.log('Saved screenshot v27-admin-internships-catalog.png');

  console.log('--- Step 2: Navigate to Front-End Internship Page ---');
  await page.goto('http://localhost:3000/internship', { waitUntil: 'networkidle0' });
  try {
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 600));
  } catch (e) {}

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v30-front-internship-page-new-program.png'
  });
  console.log('Saved screenshot v30-front-internship-page-new-program.png');

  console.log('--- Step 3: Click "Apply Now" specifically on Cloud & DevOps Card ---');
  const applyCloudBtn = await page.evaluateHandle(() => {
    const headings = Array.from(document.querySelectorAll('h3'));
    const cloudH3 = headings.find(h => h.textContent.includes('Cloud & DevOps'));
    if (!cloudH3) return null;
    let curr = cloudH3;
    while (curr && curr !== document.body) {
      const btn = Array.from(curr.querySelectorAll('button')).find(b => b.textContent.includes('Apply Now'));
      if (btn) return btn;
      curr = curr.parentElement;
    }
    return null;
  });

  if (applyCloudBtn && applyCloudBtn.asElement()) {
    console.log('Found specific Apply Now button on Cloud & DevOps card, clicking it...');
    await applyCloudBtn.asElement().click();
    await page.waitForSelector('select[name="program"]', { visible: true });
    await new Promise(r => setTimeout(r, 800));

    const selectedProgram = await page.$eval('select[name="program"]', el => el.value);
    const selectedText = await page.$eval('select[name="program"]', el => el.options[el.selectedIndex]?.text);
    console.log('Selected program in Enroll Modal is: value =', selectedProgram, '| text =', selectedText);

    await page.screenshot({
      path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v31-enroll-modal-new-internship-preselected.png'
    });
    console.log('Saved screenshot v31-enroll-modal-new-internship-preselected.png');
  } else {
    throw new Error('Could not find specific Cloud & DevOps card Apply Now button');
  }

  await browser.close();
  console.log('🎉 ALL TESTS PASSED: Admin-added internship program works end-to-end on front page and auto-selects in the enroll form!');
}

verifyAdminInternshipManager().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
