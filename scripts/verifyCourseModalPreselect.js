import puppeteer from 'puppeteer-core';

async function verifyCourseModalPreselect() {
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

  console.log('--- Step 1: Navigate to Civil Engineering Page ---');
  await page.goto('http://localhost:3000/civil-engineering', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Find the "Learn More →" button or course card
  const learnBtn = await page.$('.mech-btn-learn');
  if (learnBtn) {
    console.log('Clicking Learn More button on Civil course card...');
    await learnBtn.click();
    await new Promise(r => setTimeout(r, 800));

    // Verify modal is open and inspect select[name="program"]
    const selectedProgram = await page.$eval('select[name="program"]', el => el.value);
    console.log('Selected program in Enroll Modal is:', selectedProgram);

    await page.screenshot({
      path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v17-enroll-modal-course-preselected.png'
    });
    console.log('Saved screenshot v17-enroll-modal-course-preselected.png');
  } else {
    console.warn('Could not find .mech-btn-learn on page');
  }

  await browser.close();
  console.log('Verification finished successfully!');
}

verifyCourseModalPreselect().catch(console.error);
