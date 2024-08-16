// Script to update the 'lastUpdated' field to 
// the current time and date in DD/MM/YYYY HH:MM.

const { consola } = require('consola');
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

function getCurrentDateTime() {
    const now = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const day = now.toLocaleString('en-GB', { day: '2-digit', ...options });
    const month = now.toLocaleString('en-GB', { month: '2-digit', ...options });
    const year = now.toLocaleString('en-GB', { year: '2-digit', ...options });
    const hours = now.toLocaleString('en-GB', { hour: '2-digit', ...options });
    const minutes = now.toLocaleString('en-GB', { minute: '2-digit', ...options });
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function updateFileDate(filePath) {
    if (!filePath) {
        console.error('File path is required.');
        process.exit(1);
    }

    try {
        let fileContent = fs.readFileSync(filePath, 'utf8');

        // Regex to match the 'lastUpdated' field in the frontmatter with format DD/MM/YY HH:MM
        const regex = /lastUpdated:\s*\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}/;
        const currentDateTime = getCurrentDateTime();
        const updatedContent = fileContent.replace(regex, `lastUpdated: ${currentDateTime}`);

        if (fileContent === updatedContent) {
            consola.warn('No changes were made to the file. \n       This is possibly because:\n       - The current time is the same as the time in the field currently.\n       - The current format of `lastUpdated` is invalid (it should be DD/MM/YY HH:MM).\n       Check the `lastUpdated` field in the frontmatter or try again when the next minute rolls around.\n       See the website repository for more information: `https://github.com/inttter/iinter.me`.');
        } else {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            consola.success(` Date updated to ${currentDateTime} (UTC) in ${filePath}!`);
        }
    } catch (error) {
        consola.error('Error:', error);
        process.exit(1);
    }
}

updateFileDate(path.resolve(filePath));