import { google } from 'googleapis';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = process.cwd()+'/services/storage/gdrive/token.json';

const gdriveCreds = {
  client_secret:process.env.GDRIVE_CLIENT_SECRET,
  client_id:process.env.GDRIVE_CLIENT_ID,
  redirect_uris:process.env.GDRIVE_REDIRECT_URL
}


const authorize = () => {
  // Check if we have previously stored a token.
  try {
    const { client_secret, client_id, redirect_uris } = gdriveCreds;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    return err.message;
  }
};

const getNewToken = () => {
  const { client_secret, client_id, redirect_uris } = gdriveCreds;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  return authUrl;
};

const writeToken = (code) =>{
  const { client_secret, client_id, redirect_uris } = gdriveCreds;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return reject(`Error while trying to retrieve access token: ${err}`);
      oAuth2Client.setCredentials(token);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      resolve(oAuth2Client);
    });
  });
}

const findFolder = async (drive, folderName) => {
  const response = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
    fields: 'files(id)',
  });

  const folders = response.data.files;
  return folders.length > 0 ? folders[0].id : null;
};

const createFolder = async (drive, folderName) => {
  const existingFolderId = await findFolder(drive, folderName);

  if (existingFolderId) {
    console.log(`Folder '${folderName}' already exists with ID: ${existingFolderId}`);
    return existingFolderId;
  }

  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
    return response.data.id;
  } catch (error) {
    console.error('Error creating folder on Google Drive:', error.message);
    throw error;
  }
};

const uploadFileToDrive = async (auth, filePath, fileName, folderName) => {
  const drive = google.drive({ version: 'v3', auth });

  // Check if the folder exists, create it if not
  const folderId = await createFolder(drive, folderName);

  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };

  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });
    return response.data.id;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error.message);
    throw error;
  }
};

const readFileFromDrive = async (auth, fileId, destinationPath) => {
  const drive = google.drive({ version: 'v3', auth });

  try {
    const response = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });

    const dest = fs.createWriteStream(destinationPath);
    await new Promise((resolve, reject) => {
      response.data
        .on('end', () => {
          console.log(`File ${fileId} has been successfully downloaded to ${destinationPath}`);
          resolve();
        })
        .on('error', (err) => {
          console.error('Error downloading file from Google Drive:', err.message);
          reject(err);
        })
        .pipe(dest);
    });
  } catch (error) {
    console.error('Error reading file from Google Drive:', error.message);
    throw error;
  }
};

export { authorize,getNewToken,writeToken, uploadFileToDrive,readFileFromDrive };
