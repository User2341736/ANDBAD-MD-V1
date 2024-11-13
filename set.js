const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU1TcVplOUI2V0pkZ1M2RDlKUkFxNTR4L2F3WGJjU3Rrc0NzTndMbTgzZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmdxV3c5YXEvb0RtNURySUdSay9RYmpMc0w5QmcyNmJrQ2JRWDBzR1NrOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTnVCMG10bS9OMC9HMll4ZE1vNWZ6SzRFY2JYSHlIc0VFbHpGTTFWd0hrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRkE5eGpLdkhJSjYyaFNXbzNEcytzT2RrTE0wNU5SVmZFVkFVbHBJWVN3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFNZlR2MTlMSWwxdEhYVmxOUTFLTEhVNXU3Zm1BdnBjMEZTY1lyUUNxMVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdZakdxcTlFQ09VdE9OelFndWl1V1Y2VTZOdFdkUHNGMWVtNUpsVEhoQ1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVBUdEMvWEVRSnkzUFFhWVNvc3RwbDU0ZStIVlV0eHpBTGlBcWpsOVdtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamxqUzY2SGxhK3kzSS9UMnZDaTAySXMvUlROS3NuYXl4dy9nekFhWlduOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikp3aHVndUtObGprR09JSm1IeTVxb0JlaWt0Mnd5WWhBRWwzR2hVU1lDNXJkRmxIcWNSNldPQTA4amxneUtySG9VTVJRMFI2ZWEvYTV6YUFvSmVPTkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzEsImFkdlNlY3JldEtleSI6IklZWjJ2Ym1mL3JwMmxqNDVhWVF2R2tPKzFMZTE5bGFpSTM5RVdwc3NtTk09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik1SUGpTazNOUjhLbFgyczVRcHF5T1EiLCJwaG9uZUlkIjoiNjZkODZjOTgtNWYwYy00ZTIwLTk1NWEtOWI0YzdjYmRjNTZmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imk3aEJzUDgwSU1SV0cwVWVUZnNNZjRuZkN4MD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHd3VnQWUrRS9xOUpwdStPSmdsMXVwZjBFS289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRDY0RUhQNFoiLCJtZSI6eyJpZCI6IjI2Mzc3NTYxNDYyNzo0MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVBSOThVR0VNVHEwN2tHR0RJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoic3ZET1VmMzFkTEVsWUEzMDNXcVRKLzhYT2hXOWt0NjRRK1FjcjNaN2xGQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiK2srT1VkaVJsMk9FWXY4NlBwdDArU2tKVzFEU3RRZUcxQUJUelZKNXRHNTd1ZGJtMHYxa0M5K1dtbjJHcWxqZGtvUytadi9CUlRBUmV1MmoxaUhPQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IkdqRG1xdHNxWUY5Q2VjeVB5NUhKcXk3aGxCK1RHVlI3L2QrTEYvQW9NcWE0T0hweGV5cS9yMWZiMDdwTHljWTZLbXVQSVdtaHliQ1pSSVMvS1hRSEJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzc1NjE0NjI3OjQxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJMd3psSDk5WFN4SldBTjlOMXFreWYvRnpvVnZaTGV1RVBrSEs5MmU1UlEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzE1MjM5MjIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR1Q4In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DON",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263775614627",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'DON_MD',
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
