const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUtERWI0TXphRVlaQ1FvbUU0Qk1ESXQ1UWFxSGp2c3doeGh2My85Rm9IND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicDZTWnZJOHhpbG5xTC96VUFqdUFMektBbjB4czFYbGpwcExoY3EwdVNDMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRFd3cGFBWi9acDNRdnpudG1LNDlBb0VZODdQQjZjbFRsN0Riak5McFhzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6RFBQSGVSVmpJaDZsSmJGcWxvSE40Z0hsc05sdGt4QzhsOVh6TWFoUWpRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndKdUhSN0pnOU5rOXJpWnN4aVhCci9KY0JpbU15QkZhVHYxZkx1eGQ5MDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklPNTBycllKUXMvNzdOdDNGVzU3T1FkTU9DcUNscW8zSVJ3K3lkbEkraE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZaYlpHMHZGS2FCazdwNjNBM3dOQWsybGJnVURrdk4rK3BLdUhQSW8wND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTJWNEFXcXo4WWVVbjE2dVlMbnI2WGUyMmVIM3ZoTHNUN1Ntb0s4MGhRTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklpdTB3TzhOTUF3aUFvdUhvTEZlRUtwZ1FIVXJNVnFDU0hINzMxTTArSjA5YnEyL2xFZ1cvQ3JnNWdRUXhPQjFtczlZbmwvQkxUMkNtd3c0VmdHNGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiJOQzVhOWV3c3loRVlCRVNrbG9GUUhxcXFHeDVKYTlWcHFSQTJpaVhjRlNjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZbkRLdHU3ZVJ4eXFDUjBDY1NrWllnIiwicGhvbmVJZCI6ImYyZWNjYjZmLWExMWItNDljNy1iOTMwLWQ0MWEyMDU5ZmYyMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1WlppZ0RZZWY3bU5EbUlrT1Y5WHhZMFJQMEk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnVRMS8yZXE1YWxxUldIaEtlSlZ4d1JtSzI4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRRODVNUzhXIiwibWUiOnsiaWQiOiIyNjM3MTk5Mjk4NTk6NDVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ttT2g5Z0VFTEtkdUxrR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhFeGpQUTNnTjArbmppS09ML3N1ajdZdkE5K2MvQmZFVTdtbGRiUU1Qa2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJFeFRhazNZUW1ZU0Fhc2drSENEQnBSSmsvV2pnOFdJd0tjZzJ2VjBWK3V6VlduUUJEdE9wd2NCUmtjTkxLOTVrcGVqaU1aRk1vclFrelgrTzQ0Q0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJCdDg4Z3hnQzVnZXVHdThDMlF3eFMwK1FoUitpRy9PTHFuT3g5VlBqT0RQRG91SnQ3Y09xdjBtRE9VUDBpdnE1OXoxVmN1dnVnTEtnb1NpWFhXcjdpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxOTkyOTg1OTo0NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjUk1ZejBONERkUHA0NGlqaS83TG8rMkx3UGZuUHdYeEZPNXBYVzBERDVIIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMxMDcxNjc5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpaMiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DON",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " DON",              
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
