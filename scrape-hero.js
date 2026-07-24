const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://allsoll.com/');
  
  // Wait for the page to load
  await page.waitForTimeout(2000);
  
  // Get all text content of the first few elements under body
  const heroContent = await page.evaluate(() => {
    // Assuming the hero section is usually the first large section
    // Let's just grab the innerText of the body to see what's there
    // Or better, let's grab the HTML of the main node
    const main = document.querySelector('main') || document.body;
    return main.innerText;
  });
  
  fs.writeFileSync('hero-text.txt', heroContent);
  await browser.close();
})();
