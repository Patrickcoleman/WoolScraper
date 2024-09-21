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
    await page.goto('https://www.woolworths.com.au/shop/productdetails/270829');

    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')){
            interceptedRequest.abort();
        } else {
            interceptedRequest.continue();
        }
    });

    // Navigate to the product page
    await page.goto(`https://www.woolworths.com.au/shop/productdetails/${ProductId}`);

    // Wait for the product API response
    const response = await page.waitForResponse(response => response.url().includes('apis/ui/product/detail'));

    // Process the response and extract product data
    const jsonResponse = await response.json();
    const productData = jsonResponse['Product'];

    // Update the outer productObject with actual product data
    productObject.name = productData['Name'];
    productObject.onSpecial = productData['IsOnSpecial'];
    productObject.stockCode = productData['Stockcode'];

    await browser.close(); // Close the browser once done
    return productObject; // Return the product data
};

module.exports = fetchProductInfo;