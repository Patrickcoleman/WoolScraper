const fetchProductInfo = require('./Scraper');
const {loadSubscriptions} = require('./SubscriptionManager');
const mail = require('./Mailer');

let subscriptions = loadSubscriptions();

async function processSubscriptions(subscriptions){
    for (const email in subscriptions){
        console.log(`Starting on email: ${email}`);
        let emailstring = "";

        for (const productId of subscriptions[email]){
            try {
                console.log(`Calling fetchProductInfo on product id ${productId}`);
                const productData = await fetchProductInfo(productId);
                console.log(`Product ${productData['name']} with id ${productId} is on special? ${productData['onSpecial']}`);
                emailstring += `${productData['name']} is on special: ${productData['onSpecial']}\n`;
            } catch (error) {
                console.error(`Whoopsie: ${productId}:`, error);
            }
        }

        console.log(`Email content for ${email}: ${emailstring}`);
        // mail(email, emailstring);
        process.exit(0)
    }
}

processSubscriptions(subscriptions);

