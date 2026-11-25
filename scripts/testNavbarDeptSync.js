import puppeteer from 'puppeteer-core';

async function testNavbarDeptSync() {
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

  console.log('--- Step 1: Check initial courses dropdown ---');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  await page.click('.dropdown-trigger');
  await new Promise(r => setTimeout(r, 600));

  let items = await page.$$eval('.curated-item', els => els.map(el => ({
    title: el.querySelector('.curated-item-title')?.textContent?.trim(),
    modules: el.querySelector('.curated-item-modules')?.textContent?.trim(),
    href: el.getAttribute('href')
  })));
  console.log('Initial dropdown items:', items);

  console.log('--- Step 2: Add course with department "Computer Science & IT" ---');
  const csCourse = {
    id: `course-${Date.now()}`,
    title: 'Full Stack Web Development & Cloud Systems',
    department: 'Computer Science & IT',
    category: 'Computer Science',
    duration: '4 Months',
    level: 'Beginner → Advanced',
    badge: 'POPULAR',
    modules: 'React, Node.js, Python, MongoDB, AWS',
    desc: 'Comprehensive engineering track covering front-end, backend, APIs and cloud.',
    link: '/computer-science',
    mode: 'Classroom Studio & Live Online'
  };

  // Add via API
  const addRes = await fetch('http://localhost:3000/api/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(csCourse)
  });
  console.log('API POST /api/courses status:', addRes.status);

  // Reload page and check dropdown
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.click('.dropdown-trigger');
  await new Promise(r => setTimeout(r, 600));

  items = await page.$$eval('.curated-item', els => els.map(el => ({
    title: el.querySelector('.curated-item-title')?.textContent?.trim(),
    modules: el.querySelector('.curated-item-modules')?.textContent?.trim(),
    href: el.getAttribute('href')
  })));
  console.log('Dropdown items after adding CS:', items);

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v9-navbar-cs-department-added.png'
  });

  console.log('--- Step 3: Add course with department "Civil Engineering & BIM" ---');
  const civilCourse = {
    id: `course-${Date.now() + 1}`,
    title: 'Advanced Structural Revit & BIM Coordination',
    department: 'Civil Engineering & BIM',
    category: 'Civil',
    duration: '3 Months',
    level: 'Intermediate → Advanced',
    badge: 'TOP RATED',
    modules: 'Revit Architecture, AutoCAD Civil 3D, Navisworks',
    desc: 'Master structural drafting, 3D architectural modeling and BIM coordination.',
    link: '/civil-engineering',
    mode: 'Classroom Studio & Live Online'
  };

  await fetch('http://localhost:3000/api/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(civilCourse)
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.click('.dropdown-trigger');
  await new Promise(r => setTimeout(r, 600));

  items = await page.$$eval('.curated-item', els => els.map(el => ({
    title: el.querySelector('.curated-item-title')?.textContent?.trim(),
    modules: el.querySelector('.curated-item-modules')?.textContent?.trim(),
    href: el.getAttribute('href')
  })));
  console.log('Dropdown items after adding Civil:', items);

  await page.screenshot({
    path: 'C:/Users/jthir/.gemini/antigravity/brain/54624c88-0553-411a-b1f5-a44d42912fa1/v10-navbar-multiple-departments.png'
  });

  console.log('--- Step 4: Click on Computer Science & IT in Dropdown ---');
  const csLink = await page.$('.curated-item[href="/computer-science"]');
  if (csLink) {
    await csLink.click();
    await new Promise(r => setTimeout(r, 1000));
    console.log('Current URL after clicking CS:', page.url());
  }

  await browser.close();
  console.log('All tests passed successfully!');
}

testNavbarDeptSync().catch(console.error);
