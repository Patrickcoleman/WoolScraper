const express = require('express');
const app = express();

const {loadSubscriptions, saveSubscriptions} = require('./SubscriptionManager');

app.get('/subscribe/:email/:productid', (req, res) => {
    const { email, productid } = req.params;

    let subscriptions = loadSubscriptions();

    if (!subscriptions[email]) {
        subscriptions[email] = [productid];
    } else if (!subscriptions[email].includes(productid)) {
        subscriptions[email].push(productid);
    }

    saveSubscriptions(subscriptions);

    console.log(`Subscription added: ${email} to product ${productid}`);
    res.send(`Subscribed ${email} to product ${productid}!`);
});
app.get('/unsubscribe/:email/:productid', (req, res) => {
    const { email, productid } = req.params;

    let subscriptions = loadSubscriptions();

    if (subscriptions[email]) {
        if (subscriptions[email].includes(productid)){
            subscriptions[email].splice(subscriptions[email].indexOf(productid), 1);
            if (subscriptions[email].length === 0) {
                delete subscriptions[email];
            }
            
            saveSubscriptions(subscriptions);
            console.log(`Unsubscribed ${email} from product ${productid}`);
            return res.send(`Unsubscribed ${email} from product ${productid}!`);
        }
    }

    console.log(`No subscription found for ${email} on product ${productid}`);
    res.status(404).send(`No subscription found for ${email} on product ${productid}`);
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
