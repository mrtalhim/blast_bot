// logger.js

const fs = require('fs');

// Function to log messages
function log(message) {
    const logEntry = `[INFO] ${getCurrentTimestamp()}: ${message}\n`;
    fs.appendFile('app.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

// Function to log error messages
function error(message) {
    const errorEntry = `[ERROR] ${getCurrentTimestamp()}: ${message}\n`;
    fs.appendFile('app.log', errorEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

// Function to get the current timestamp
function getCurrentTimestamp() {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

module.exports = {
    log,
    error
};
