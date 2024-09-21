const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'subscriptions.json');

function loadSubscriptions() {
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        return JSON.parse(fileContent);
    } else {
        return {};
    }
}

function saveSubscriptions(newSubscriptions) {
    fs.writeFileSync(filePath, JSON.stringify(newSubscriptions, null, 2), 'utf8');
}

module.exports = {
    loadSubscriptions,
    saveSubscriptions
}