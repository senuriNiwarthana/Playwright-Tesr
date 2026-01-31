import { test, expect } from '@playwright/test';

const scenarios = [
    // Positive cases
    { id: 'Pos_Fun_0001', input: 'mata yanna oonee.' },
    { id: 'Pos_Fun_0002', input: 'mata heta gamanak yanna venavaa .uBAta puluvandha mata note tika whatsapp karanna.ubata puluvan time ekaka dhaanavadha.mata lab ekata yanna kalin ee tika balala yanna oonee.' },
    { id: 'Pos_Fun_0003', input: 'mata test ekak dharanna puLuvandha?' },
    { id: 'Pos_Fun_0004', input: 'api peeraadheNiyata gihin imu.' },
    { id: 'Pos_Fun_0005', input: 'machan api gihin inna kota uBA mama hoDHAyi kiyala kiyanna oona.' },
    { id: 'Pos_Fun_0006', input: 'oyaata kohomadha?' },
    { id: 'Pos_Fun_0007', input: 'apoyi apoyi' },
    { id: 'Pos_Fun_0008', input: 'eyala aayee enavaa.' },
    { id: 'Pos_Fun_0009', input: 'adoo machAan! supiri!!' },
    { id: 'Pos_Fun_0010', input: 'avurudhu samayee biimath riyadhuran heethu kota gena adhika lesa raThavaahana anathuru 3000 sa ikmavaa aethi athara mulu avurudhdhatama sidhu vuu puraavatama anathuru pramaNaya 25000 ikmavaa aethi athara eya vishaala sanKYaavak lesa  avurudhdhee   polis maDhYA prakashaka pavasaa aetha.' },
    { id: 'Pos_Fun_0011', input: 'nirmalii zoom ekata enna parakku venne signal prashna nisaa.' },
    { id: 'Pos_Fun_0012', input: 'oyaaa enavadha maath ekka yanna?' },
    { id: 'Pos_Fun_0013', input: 'karuNaakaralaa enna.' },
    { id: 'Pos_Fun_0014', input: 'mama pereedhaa gedhara giyaa.' },
    { id: 'Pos_Fun_0015', input: 'mama dhaekkee  naehae.' },
    { id: 'Pos_Fun_0016', input: 'lassanata vaeda karanna.' },
    { id: 'Pos_Fun_0017', input: 'raetta vaessa enavaanam mama restaurant ekata yannee naee.' },
    { id: 'Pos_Fun_0018', input: 'suba dhahavalak veva!' },
    { id: 'Pos_Fun_0019', input: 'mata heta gamanak ganna thiyanavaa. karuNaakarala mata eeka nivaaduvak dhenna puluvandha ?' },
    { id: 'Pos_Fun_0020', input: 'karuNaakaralaa mata eekata nivaadu velaavak balalaa uththarayak dhenavadha?' },
    { id: 'Pos_Fun_0021', input: 'mata OTP eka SMS vidihaata aavaa.' },
    { id: 'Pos_Fun_0022', input: 'api sellam karanna yanvaa saha passee gedhara enavaa.' },
    { id: 'Pos_Fun_0023', input: 'dhaenma navathinu' },
    { id: 'Pos_Fun_0024', input: 'oyaa adha mobile games gahanavadha?' },

    // Negative cases
    { id: 'Neg_Fun_0001', input: '???!!!...' },
    { id: 'Neg_Fun_0002', input: 'mma gdhara ynwa' },
    { id: 'Neg_Fun_0003', input: 'mama yaluwagegedhara gihin yanava.' },
{ id: 'Neg_Fun_0004', input: ' mata                                            \n\n\n\nkammaeliyi.' },
    { id: 'Neg_Fun_0005', input: 'account eke balance Rs.5000 yi eeka withdraw karanna ATM @ BOC branch eke PIN #656 use karanna.' },
    { id: 'Neg_Fun_0006', input: 'mma kiiuve "mata adha enna baee" kiyala  eyaa "aa hari" kiyalaa  kivvaa.' },
    { id: 'Neg_Fun_0007', input: '1st , 2nd eyaalata giyaa api 3ta .' },
    { id: 'Neg_Fun_0008', input: 'mama\nnuvara\tyanna\rhadhannee' },
    { id: 'Neg_Fun_0009', input: 'emama giyee gedhra, hebaeyi mama late vune.' },
    { id: 'Neg_Fun_0010', input: 'mata nidhimathayi $%?' },
];

test.describe('SwiftTranslator Automation', () => {

    test.setTimeout(180000); 

    for (const data of scenarios) {
        test(`Test Case ${data.id}`, async ({ page }) => {
            
            await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

            const inputField = page.locator('textarea').first();
            await inputField.waitFor({ state: 'visible' });
            
            
            await inputField.pressSequentially(data.input, { delay: 15 });

            
            await page.waitForTimeout(4000); 
            
            const outputField = page.locator('textarea').last();
            const actualOutput = await outputField.inputValue();

            console.log(`\n-----------------------------------`);
            console.log(`TC ID: ${data.id}`);
            console.log(`RESULT: ${actualOutput}`);
            console.log(`-----------------------------------`);

          
            if (data.id.startsWith('Pos')) {
                expect(actualOutput.length).toBeGreaterThan(0);
            }

            
            if (data.id.startsWith('Neg')) {
                expect(actualOutput).toBe('');
            }
            
            
        });
    }

    
    test('Pos_UI_0001: Output clears when input is deleted', async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
        const inputField = page.locator('textarea').first();
        const outputField = page.locator('textarea').last();
        
        await inputField.fill('Testing Update');
        await page.waitForTimeout(2000);
        await inputField.fill('');
        await page.waitForTimeout(2000);
        
        const output = await outputField.inputValue();
        expect(output).toBe('');
    });
});