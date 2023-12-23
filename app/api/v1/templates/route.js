import fs from "fs"
import { NextResponse } from "next/server";

function getImageBase64(filePath) {
    try {
      // Read the image file synchronously
      const imageData = fs.readFileSync(filePath);
  
      // Convert the binary data to base64
      const base64Data = imageData.toString('base64');
  
      return base64Data;
    } catch (error) {
      console.error('Error reading or converting the image:', error);
      return null;
    }
  }

const getTemplates = (rootFolderPath)=>{
    const dirs = fs.readdirSync(rootFolderPath);
    const templates = [];
    for (let index = 0; index < dirs.length; index++) {
        const dir = dirs[index];

        const publicDir = process.cwd()+'/public';
        // Prepare paths of all template dependents
        let logoPath = '/templates/'+dir+'/logo.jpg';
        const sampleJsonPath = '/templates/'+dir+'/sample.json';
        const ejsPath = '/templates/'+dir+'/index.ejs';
        
        //Check Weather Logo, Samole Data and EJS is presenr
        if(fs.existsSync(publicDir+logoPath) && fs.existsSync(publicDir+sampleJsonPath) && fs.existsSync(publicDir+ejsPath)){
            //Created Template
            const template = {sampleJsonPath,logoPath,ejsPath};
            template['name'] = dir;

            //Added Template
            templates.push(template);
        }
    }
    return templates;
}

export const GET = (request) =>{
    const rootFolderPath = process.cwd()+'/public/templates';
    const jsonData = getTemplates(rootFolderPath);   
    return NextResponse.json(jsonData,{status:200});
}