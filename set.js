const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0lybUMwdTVQNE1RSnR0VXR3RkFIVGdPVkNxOGV5UjgweGRybUpiN09Hcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUd5MFZyZDNPRzRESEM1bndhOVBDSDVyZVZVdE5SeUVDZm9vVVZzR0JXVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxUDR3c2FLbTkya21UYzZuSUpaZEZPOU9LOFNLTTR4RFFrWWw1VkZFVW0wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwRUVsTUZVeUwrQXVJK2JlRkk3aEg0Yi92YWZLMFF2ZElIUTgwMWtsbUJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNNV1B6WG04SkZVOFNRK0VpeGp1ZEtHd1dsaFZMd2ZiaTE4NjlwOWRObEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikx6R1IyV3dSb2EwdGFLQ1RGWWtwNTg5aG1tb0hBUVRYZkRXYnhCQ3lYaTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU1LbFZNU0VXU0lrMnVtbnRGNndaRU9abi9TUVNOVXFTa1ZJcVN2UGhYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmhrK1ZZVmRUdGlVMytOSHdPcFJETFNOZjdhdWFSeHoxSnA5Z1F2VkozYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtTK2JJVEJod2ZHeVhZMWRuNWxSR204eXFodUk4WDBPODR4UjNmZWswVkdEbEVubkliR2lwcm1PMTlZNjV2Y0NuSGRYZTlSODBoSTU5eTg0M2lzS0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkwLCJhZHZTZWNyZXRLZXkiOiI4b2tKTVM2SVl3REplK1RxcWFkZ3dHcEIrT1VuVS94QzdJc2tuRWdIT1NzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJOLUcwWVEyUVM0U1ExN2FzZnBpc0FBIiwicGhvbmVJZCI6IjVkMmY3NzdlLTE1MDAtNGZjNi04ODE4LThiYjVhOTU5Zjc1ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2ckd2SmJtayt1UkxxQWxtR0NYRkUyQjVrVzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSG9pZWZhLzU0Nkd6ay9lYjdtUzZELzQ0SEdNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjM0MUFOSzRMIiwibWUiOnsiaWQiOiIyNjM3NzU2MTQ2Mjc6ODFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05EQ243WUJFTm5xb3IwR0dCVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik82d2d3ZytwMHFOVWpaSzJoajZkdGtVYXE0VVUwdWlYNFJ1cWJLcyt3eTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImExa3lYUDQyd2swNmszamJ5RFFXZytHbWVJVFJydER3LzJWQlFXTlBMWjB0aHArSXZQd0VmZ0phSXFBNFhZdGVrMkJISmRHRkFPQ2d6d3l0N2JXa0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwSVU5cTI0R2dRTXRRWGFid0Vra0wybnBiVmQ4dXFyZ1FHUml0dlBIbmpqUWwvOW0xdXF5Y1VvRTFlSmZRb25iYVBJZm1qdXRMZVAyaDFYMU5QSi9Bdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc3NTYxNDYyNzo4MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUdXNJTUlQcWRLalZJMlN0b1krbmJaRkdxdUZGTkxvbCtFYnFteXJQc010In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5MTA5NzM0LCJteUFwcFN0YXRlS2V5SWQiOiJBRDBBQU1yQyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DON",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263775614627",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'DON-Thandeka-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
