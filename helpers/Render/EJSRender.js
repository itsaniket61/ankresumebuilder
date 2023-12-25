import fs from 'fs';
import ejs from 'ejs';
import CustomLogger from '../Log/CustomLogger';
import { CONSTANTS } from '@/app/variables/Constatnts';

export default function renderEjsFile(filePath, data) {
    const logger = new CustomLogger();
    try {
    // Read EJS template content from file
    const templateContent = fs.readFileSync(filePath, 'utf-8');
    logger.info("Template loaded sucessfully!!");
    // Render the template with dynamic data
    const renderedOutput = ejs.render(templateContent, { data });
    
    return renderedOutput;
  } catch (error) {
    logger.error(`Error rendering EJS file: ${error.message}`);
    return null;
  }finally{
    
  }
  
}

export {renderEjsFile};