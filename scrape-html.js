const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://allsoll.com/', {waitUntil: 'networkidle'});
  
  const headerHTML = await page.evaluate(() => {
    const header = document.querySelector('header') || document.querySelector('.header') || document.querySelector('#header');
    return header ? header.outerHTML : 'No header found';
  });
  
  const heroHTML = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll('div'));
    const hero = divs.find(d => d.innerText && d.innerText.includes('WORK') && d.innerText.includes('MATTERS'));
    return hero ? hero.outerHTML : 'No hero found';
  });

  fs.writeFileSync('allsoll-header.html', headerHTML);
  fs.writeFileSync('allsoll-hero.html', heroHTML);
  
  await browser.close();
})();
