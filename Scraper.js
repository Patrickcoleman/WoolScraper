const { timeout } = require('puppeteer');
const puppeteer = require('puppeteer');

async function fetchProductInfo(ProductId) {
    let productObject = {
        name: 'unset',
        onSpecial: 'unset',
        stockCode: 'unset'
    };

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        ]
    });

    const page = await browser.newPage();
    // await page.setRequestInterception(true);
    // page.on('request', interceptedRequest => {
    //     if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')){
    //         interceptedRequest.abort();
    //     } else {
    //         interceptedRequest.continue();
    //     }
    // });

    await page.goto('https://www.woolworths.com.au/shop/productdetails/270829',{ timeout : 10000})

    const tensecpromise = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, 'one');
    });

    await page.goto(`https://www.woolworths.com.au/shop/productdetails/${ProductId}`,{ timeout : 10000})

    const response = await Promise.race([
        await page.waitForResponse(response => response.url().includes('apis/ui/product/detail')),
        tensecpromise
    ])

    const jsonResponse = await response.json();
    const productData = jsonResponse['Product'];

    productObject.name = productData['Name'];
    productObject.onSpecial = productData['IsOnSpecial'];
    productObject.stockCode = productData['Stockcode'];

    await browser.close();
    return productObject;
};

module.exports = fetchProductInfo;