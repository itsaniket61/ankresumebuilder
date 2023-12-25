import fs from 'fs';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { CONSTANTS } from '@/app/variables/Constatnts';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY; 
    

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

function uploadBlob(filePath, fileData, callback) {
  const uploadMiddleware = upload.single('blob');
  
  // Create a mock request and response object
  const req = { file: { buffer: fileData } };
  const res = {};

  uploadMiddleware(req, res, function (err) {
    if (err) {
      return callback(err);
    }
    // File uploaded successfully
    callback(null, filePath);
  });
}

function encrypt(text) {
    const cipher = crypto.createCipher(algorithm, secretKey);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedText) {
    const decipher = crypto.createDecipher(algorithm, secretKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

function getBlobCode(stream, contentType) {
  const expirationSeconds = process.env.BLOB_EXPIRY||10;
  const uniqueIdentifier = Date.now().toString();
  let filePath = CONSTANTS.PATHS.BLOB_TEMP_DIR;
  if(!fs.existsSync(filePath)) fs.mkdirSync(filePath);
  filePath += `/${uniqueIdentifier}.tmp`;
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);

    stream.pipe(writeStream);

    stream.on('end', () => {
      const data = {
        filePath,
        contentType,
      };

      const cipher = encrypt(JSON.stringify(data));
      
      setTimeout(() => {
        // Delete the file after the specified duration
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      }, expirationSeconds * 1000);

      resolve(cipher);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

function getBlobStream(cipher) {
    try {
      const {filePath,contentType} = JSON.parse(decrypt(cipher));
      const filePathExist = fs.existsSync(filePath);
      if(!filePathExist) return undefined;
      const stream = fs.createReadStream(filePath);
      return {stream,contentType};
    } catch (error) {
      return undefined;
    }
}
export {uploadBlob,getBlobCode,getBlobStream}