import puppeteer from 'puppeteer';
const fs = require('fs');
import { getBlobCode } from '../BlobManager/blobManager';
import { CONSTANTS } from '@/app/variables/Constatnts';

const generatePDF = async (htmlContent, outputPath) => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
  
    // Set the content and render the PDF
    await page.setContent(htmlContent);
    
    const outputPdfsDir = CONSTANTS.PATHS.OUTPUT_PDF_DIR;
    if(!fs.existsSync(outputPdfsDir)){
      fs.mkdirSync(outputPdfsDir,{recursive:true});
    }
    const opp = outputPdfsDir+Date.now().toString()+"-"+outputPath
    await page.pdf({ path: opp, format: 'A4' });
    const ins = fs.createReadStream(opp);
    // Close the browser
    await browser.close();
    const blobCode = getBlobCode(ins,'application/pdf');
    fs.rmSync(opp);
    return blobCode;
};

export {generatePDF};