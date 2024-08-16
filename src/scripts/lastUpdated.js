// Script to update the 'lastUpdated' field to 
// the current time and date in DD/MM/YYYY HH:MM.

const { consola } = require('consola');
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

function getCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
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
            consola.warn('No changes were made to the file. This is possibly because the current time is the same (within ~60s) or because the current format of `lastUpdated` is invalid (it should be DD/MM/YY). Try again when the next minute rolls around.');
        } else {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            consola.success(` Date updated to ${currentDateTime} in ${filePath}!`);
        }
    } catch (error) {
        consola.error('Error:', error);
        process.exit(1);
    }
}

updateFileDate(path.resolve(filePath));