import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('Validate', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000/';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  describe('Validate', () => {
    test('add a new product', async () => {
      await page.goto(baseUrl);
      const addProductButton = await page.$('.add-product');
      addProductButton.click();

      await page.waitForSelector('[id=popup]', { visible: true });
      const inputValue = await page.$('#inpText');
      expect(await inputValue.evaluate((node) => node.value)).toBe('');
    });

    test('change existed product', async () => {
      await page.goto(baseUrl);
      const addProductButton = await page.$('.change-product');
      addProductButton.click();

      await page.waitForSelector('[id=popup]', { visible: true });
      const inputValue = await page.$('#inpText');
      expect(await inputValue.evaluate((node) => node.value)).not.toBe('');
    });

    test('testing errors form', async () => {
      await page.goto(baseUrl);
      const addProductButton = await page.$('.add-product');
      addProductButton.click();

      await page.waitForSelector('[id=popup]', { visible: true });

      const saveButton = await page.$('#pSave');
      saveButton.click();

      await page.waitForSelector('[id=form-error]', { visible: true });
    });

    test('testing confirm form', async () => {
      await page.goto(baseUrl);
      const addProductButton = await page.$('.del-product');
      addProductButton.click();

      await page.waitForSelector('[id=confirm-del]', { visible: true });
    });
  });
});
