import { test, expect } from '@playwright/test';

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Updated from Spreadsheet
const TEST_DATA = {
  positive: [
    {
      tcId: 'Pos_Fun_0001',
      name: 'Convert a simple daily usage sentence',
      input: 'mata yanna oonee.',
      expected: 'මට යන්න ඕනේ.',
      category: 'Greeting / request',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0002',
      name: 'Convert mixed Singlish and English compound sentence',
      input: 'mata heta gamanak yanna venavaa .uBAta puluvandha mata note tika whatsapp karanna.ubata puluvan time ekaka dhaanavadha.mata lab ekata yanna kalin ee tika balala yanna oonee.',
      expected: 'මට හෙට ගමනක් යන්න වෙනවා .උඹට පුලුවන්ද මට note ටික whatsapp කරන්න.උබට පුලුවන් time එකක දානවද.මට lab එකට යන්න කලින් ඒ ටික බලල යන්න ඕනේ.',
      category: 'Mixed Singlish + English',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0003',
      name: 'Real-time Sinhala output update',
      input: 'mata test ekak karanna puLuvandha?',
      expected: 'මට test එකක් කරන්න පුළුවන්ද?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0004',
      name: 'Convert location reference',
      input: 'api peeraadheNiyata gihin imu.',
      expected: 'අපි පේරාදෙණියට ගිහින් ඉමු.',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0005',
      name: 'Convert location reference with conversation',
      input: 'machan api gihin inna kota uBA mama hoDHAyi kiyala kiyanna oona.',
      expected: 'මචන් අපි ගිහින් ඉන්න කොට උඹ මම හොඳයි කියල කියන්න ඕන.',
      category: 'Daily conversation',
      grammar: 'Simple sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0006',
      name: 'Convert interrogative greeting question',
      input: 'oyaata kohomadha?',
      expected: 'ඔයාට කොහොමද?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0007',
      name: 'Convert repeated word for emphasis',
      input: 'apoyi apoyi',
      expected: 'අපොයි අපොයි',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0008',
      name: 'Convert third person plural pronoun sentence',
      input: 'eyaalaa aayee enavaa.',
      expected: 'එයාලා ආයේ එනවා.',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0009',
      name: 'Convert informal slang greeting',
      input: 'adoo machan! supiri!!',
      expected: 'අඩෝ මචන්! සුපිරි!!',
      category: 'Informal language',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0010',
      name: 'Convert long paragraph with complex structure',
      input: 'avurudhu samayee biimath riyadhuran heethu kota gena adhika lesa raThavaahana anathuru 3000 sa ikmavaa aethi athara mulu avurudhdhatama sidhu vuu puraavatama anathuru pramaNaya 25000 ikmavaa aethi athara eya vishaala sanKYaavak lesa  avurudhdhee   polis maDhYA prakashaka pavasaa aetha.',
      expected: 'අවුරුදු සමයේ බීමත් රියදුරන් හේතු කොට ගෙන අදික ලෙස රථවාහන අනතුරු 3000 ස ඉක්මවා ඇති අතර මුලු අවුරුද්දටම සිදු වූ පුරාවටම අනතුරු ප්‍රමණය 25000 ඉක්මවා ඇති අතර එය විශාල සන්ඛ්‍යාවක් ලෙස  අවුරුද්දේ   පොලිස් මධ්‍ය ප්‍රකශක පවසා ඇත.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'L'
    },
    {
      tcId: 'Pos_Fun_0011',
      name: 'Convert medium sentence with place names and English words',
      input: 'nirmalii zoom ekata enna late venne signal prashna nisaa',
      expected: 'නිර්මලී zoom එකට එන්න late වෙන්නෙ සිග්නල් ප්‍රශ්න නිසා',
      category: 'Mixed Singlish + English',
      grammar: 'Simple sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0012',
      name: 'Handle question mark punctuation',
      input: 'oyaa enavadha maath ekka yanna?',
      expected: 'ඔයා එනවද මාත් එක්ක යන්න?',
      category: 'Punctuation',
      grammar: 'Interrogative',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0013',
      name: 'Convert imperative command form',
      input: 'karuNaakaralaa enna.',
      expected: 'කරුණාකරලා එන්න.',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0014',
      name: 'Convert simple past tense sentence',
      input: 'mama pereedhaa gedhara giyaa.',
      expected: 'මම පෙරේදා ගෙදර ගියා.',
      category: 'Daily language usage',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0015',
      name: 'Convert strong negation with dhaekkee naee',
      input: 'mama dhaekkee naehae.',
      expected: 'මම දැක්කේ නැහැ.',
      category: 'Daily language usage',
      grammar: 'Negative form',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0016',
      name: 'Convert imperative command with urgency',
      input: 'lassanata vaeda karanna.',
      expected: 'ලස්සනට වැඩ කරන්න.',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0017',
      name: 'Convert complex sentence with conditional clause',
      input: 'raeeta vaessa enavaanam mama restaurant ekata yannee naee.',
      expected: 'රෑට වැස්ස එනවානම් මම restaurant එකට යන්නේ නෑ.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0018',
      name: 'Convert polite greeting expression',
      input: 'suba dhahavalak veevaa!',
      expected: 'සුබ දහවලක් වේවා!',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0019',
      name: 'Convert polite request with honorific phrasing',
      input: 'mata heta gamanak ganna thiyanavaa. karuNaakarala mata eekata nivaaduvak dhenna puluvandha ?',
      expected: 'මට හෙට ගමනක් ගන්න තියනවා. කරුණාකරල මට ඒකට නිවාඩුවක් දෙන්න පුලුවන්ද ?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0020',
      name: 'Convert sentence with abbreviations',
      input: 'mata heta gamanak ganna thiyanavaa. karuNaakarala mata eekata nivaaduvak dhenna puluvandha ?',
      expected: 'මට හෙට ගමනක් ගන්න තියනවා. කරුණාකරල මට ඒකට නිවාඩුවක් දෙන්න පුලුවන්ද ?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0021',
      name: 'Convert sentence with abbreviations OTP SMS',
      input: 'mata OTP eka SMS vidhihata aavaa.',
      expected: 'මට OTP එක SMS විදිහට ආවා.',
      category: 'Mixed Singlish + English',
      grammar: 'Compound sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0022',
      name: 'Convert compound sentence',
      input: 'api sellam karanna yanvaa saha passee gedhara enavaa.',
      expected: 'අපි සෙල්ලම් කරන්න යන්වා සහ පස්සේ ගෙදර එනවා.',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0023',
      name: 'Convert imperative command',
      input: 'dhaenma navathinu',
      expected: 'දැන්ම නවතිනු',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0024',
      name: 'English brand inside Singlish',
      input: 'oyaa adha mobile games gahanavadha?',
      expected: 'ඔයා අද mobile games ගහනවද?',
      category: 'Mixed Singlish + English',
      grammar: 'Simple sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0025',
      name: 'Place name preservation',
      input: 'api apee vacation ekata Thailand  valata yamudha?',
      expected: 'අපි අපේ vacation එකට Thailand  වලට යමුද?',
      category: 'Names / places / common English words',
      grammar: 'Interrogative',
      length: 'M'
    }
  ],
  
  negative: [
    {
      tcId: 'Neg_Fun_0001',
      name: 'Failure with input containing only punctuation',
      input: '???!!!...',
      expected: 'Empty output or error message',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0002',
      name: 'Incorrect conversion with excessive line breaks',
      input: 'mata                                            \n\n\n\nkammaeliyi.',
      expected: 'මට \n\n\n\nකම්මැලියි.',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0003',
      name: 'Mishandling mixed script input with special symbols',
      input: 'account eke balance Rs.5000 yi eeka withdraw karanna ATM @ BOC branch eke PIN #656 use karanna.',
      expected: 'account එකේ balance Rs.5000 යි ඒක withdraw කරන්න ATM @ BOC branch එකේ PIN #656 use කරන්න.',
      category: 'Mixed Singlish + English',
      grammar: 'Imperative (command)',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0004',
      name: 'Quotation marks within sentences misprocessed',
      input: 'mma kiiuve "mata adha enna baee" kiyala  eyaa "aa hari" kiyalaa  kivvaa.',
      expected: 'මම කිව්වේ "මට අද එන්න බෑ" කියලා  ඒයා " ආ හරි" කියලා කිව්වා.',
      category: 'Punctuation / numbers',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0005',
      name: 'Numeric ordinals with suffixes incorrectly converted',
      input: '1st , 2nd eyaalata giyaa api 3ta .',
      expected: '1st , 2න්ඩ් එයාලට ගියා අපි 3 ට.',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0006',
      name: 'Backslash escape sequences corrupt conversion',
      input: 'mama\\nnuvara\\tyanna\\rhadhannee',
      expected: 'මම\nනුවර\tයන්න\rහදන්නේ',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0007',
      name: 'Multiple typos in medium sentence',
      input: 'mama giyee gedhra, hebaeyi mama late vune.',
      expected: 'මම ගියේ ගෙධ්‍රා, හෙබැයි මම late වුනේ.',
      category: 'Typographical error handling',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0008',
      name: 'Failure with mathematical expressions mixed with Singlish',
      input: 'equation eka solve karanna x squared plus 5x minus 3 equals zero kiyalaa hadagannava',
      expected: 'equation එක solve කරන්න x squared plus 5x minus 3 equals zero කියලා හදගන්නවා',
      category: 'Mixed Singlish + English',
      grammar: 'Imperative (command)',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0009',
      name: 'Failure with mathematical expressions variant',
      input: 'equation eka solve karanna x squared plus 5x minus 3 equals zero kiyalaa hadagannava',
      expected: 'equation එක solve කරන්න x ස්කයර්ඩ් plus 5x minus 3 equals zero කියලා හදගන්නවා',
      category: 'Mixed Singlish + English',
      grammar: 'Imperative (command)',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0010',
      name: 'Special characters cause unexpected behavior',
      input: 'mata nidhimathayi $%?',
      expected: 'මට නිදිමතයි?',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'M'
    }
  ],
  
  ui: {
    tcId: 'Pos_UI_0025',
    name: 'Sinhala output updates automatically in real-time',
    input: 'mama rathnapurayee yanava',
    partialInput: 'mama rata',
    expectedFull: 'මම රත්නපුරයේ යනවා',
    category: 'Punctuation / numbers',
    grammar: 'Simple sentence',
    length: 'S'
  }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
