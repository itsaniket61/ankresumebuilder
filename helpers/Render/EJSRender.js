import fs from 'fs';
import ejs from 'ejs';
import CustomLogger from '../Log/CustomLogger';

export default function renderEjsFile(filePath, data) {
    const logger = new CustomLogger();
    try {
    const templateName = filePath.substring(filePath.lastIndexOf('/')+1,filePath.length); 
    // Read EJS template content from file
    const templateContent = fs.readFileSync(process.cwd()+'/public/templates/'+templateName+'/index.ejs', 'utf-8');
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