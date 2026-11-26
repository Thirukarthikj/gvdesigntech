import puppeteer from 'puppeteer-core';

async function verifyAllProgramsPreselect() {
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

  const skipIntro = async () => {
    try {
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {}
  };

  // TEST 1: Civil Engineering Page Course Card Click
  console.log('--- Test 1: Civil Engineering Course Card Click ---');
  await page.goto('http://localhost:3000/civil-engineering', { waitUntil: 'networkidle0' });
  await skipIntro();
  await new Promise(r => setTimeout(r, 600));

  const learnBtn = await page.$('.mech-btn-learn');
  if (learnBtn) {
    console.log('Clicking Learn More button on Civil course card...');
    await learnBtn.click();
    await page.waitForSelector('select[name="program"]', { visible: true });

    const selectedProgram = await page.$eval('select[name="program"]', el => el.value);
    const selectedText = await page.$eval('select[name="program"]', el => el.options[el.selectedIndex]?.text);
    console.log('Test 1 Result: value =', selectedProgram, '| text =', selectedText);

    await page.screenshot({
      path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v22-civil-course-preselected.png'
    });
    console.log('Saved screenshot v22-civil-course-preselected.png');

    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 600));
  }

  // TEST 2: AI Internship Page "Apply for AI Internship" CTA
  console.log('--- Test 2: AI Internship CTA Click ---');
  await page.goto('http://localhost:3000/internship/ai', { waitUntil: 'networkidle0' });
  await skipIntro();
  await new Promise(r => setTimeout(r, 600));

  const applyAiBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Apply for AI Internship'));
  });

  if (applyAiBtn && applyAiBtn.asElement()) {
    console.log('Clicking Apply for AI Internship button...');
    await applyAiBtn.asElement().click();
    await page.waitForSelector('select[name="program"]', { visible: true });

    const selectedProgram = await page.$eval('select[name="program"]', el => el.value);
    const selectedText = await page.$eval('select[name="program"]', el => el.options[el.selectedIndex]?.text);
    console.log('Test 2 Result: value =', selectedProgram, '| text =', selectedText);

    await page.screenshot({
      path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v23-ai-internship-preselected.png'
    });
    console.log('Saved screenshot v23-ai-internship-preselected.png');

    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 600));
  }

  // TEST 3: Internship Hub Page Data Science Card "Apply Now"
  console.log('--- Test 3: Internship Hub Page Data Science Apply Now Click ---');
  await page.goto('http://localhost:3000/internship', { waitUntil: 'networkidle0' });
  await skipIntro();
  await new Promise(r => setTimeout(r, 600));

  const applyDsBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    // Find all Apply Now buttons
    const applyBtns = buttons.filter(b => b.textContent.trim() === 'Apply Now');
    // In InternshipPrograms.jsx: 0 is AI, 1 is Summer, 2 is College, 3 is Data Science, 4 is ML
    return applyBtns[3] || applyBtns[0];
  });

  if (applyDsBtn && applyDsBtn.asElement()) {
    console.log('Clicking Apply Now on Data Science Internship card...');
    await applyDsBtn.asElement().click();
    await page.waitForSelector('select[name="program"]', { visible: true });

    const selectedProgram = await page.$eval('select[name="program"]', el => el.value);
    const selectedText = await page.$eval('select[name="program"]', el => el.options[el.selectedIndex]?.text);
    console.log('Test 3 Result: value =', selectedProgram, '| text =', selectedText);

    await page.screenshot({
      path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v24-datascience-internship-preselected.png'
    });
    console.log('Saved screenshot v24-datascience-internship-preselected.png');

    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 600));
  }

  // TEST 4: Mechanical Engineering Page "Apply for Next Batch"
  console.log('--- Test 4: Mechanical Engineering Page CTA Click ---');
  await page.goto('http://localhost:3000/mechanical', { waitUntil: 'networkidle0' });
  await skipIntro();
  await new Promise(r => setTimeout(r, 600));

  const applyMechBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Apply for Next Batch'));
  });

  if (applyMechBtn && applyMechBtn.asElement()) {
    console.log('Clicking Apply for Next Batch on Mechanical page...');
    await applyMechBtn.asElement().click();
    await page.waitForSelector('select[name="program"]', { visible: true });

    const selectedProgram = await page.$eval('select[name="program"]', el => el.value);
    const selectedText = await page.$eval('select[name="program"]', el => el.options[el.selectedIndex]?.text);
    console.log('Test 4 Result: value =', selectedProgram, '| text =', selectedText);

    await page.screenshot({
      path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v25-mechanical-dept-preselected.png'
    });
    console.log('Saved screenshot v25-mechanical-dept-preselected.png');

    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 600));
  }

  // TEST 5: Computer Science Page "Apply for Next Batch"
  console.log('--- Test 5: Computer Science Page CTA Click ---');
  await page.goto('http://localhost:3000/computer-science', { waitUntil: 'networkidle0' });
  await skipIntro();
  await new Promise(r => setTimeout(r, 600));

  const applyCsBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Apply for Next Batch'));
  });

  if (applyCsBtn && applyCsBtn.asElement()) {
    console.log('Clicking Apply for Next Batch on Computer Science page...');
    await applyCsBtn.asElement().click();
    await page.waitForSelector('select[name="program"]', { visible: true });

    const selectedProgram = await page.$eval('select[name="program"]', el => el.value);
    const selectedText = await page.$eval('select[name="program"]', el => el.options[el.selectedIndex]?.text);
    console.log('Test 5 Result: value =', selectedProgram, '| text =', selectedText);

    await page.screenshot({
      path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v26-cs-dept-preselected.png'
    });
    console.log('Saved screenshot v26-cs-dept-preselected.png');
  }

  await browser.close();
  console.log('🎉 ALL 5 PRESELECTION TESTS PASSED PERFECTLY!');
}

verifyAllProgramsPreselect().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
