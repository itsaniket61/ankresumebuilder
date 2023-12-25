const cwd = process.cwd();
export const CONSTANTS = {
    PATHS:{
        PUBLIC_DIR:cwd+'/public',
        OUTPUT_PDF_DIR:cwd+"/outputs/PDFs",
        BLOB_TEMP_DIR:cwd+`/blobTemp`,
        TEMPLATE:{
            TEMPLATES_DIR_PATH:cwd+"/public/templates",
            SAMPLE_JSON_PATH:'/sample.json',
            LOGO_PATH:'/logo.jpg',
            EJS_PATH:'/index.ejs'
        },
        STORAGE:{
            ASSETS_DIR_PATH:cwd+'/storage/assets',

        }
    },
    

};
