// const {exec} = require('child_process');
const fetchProductInfo = require('./Scraper');

const productIds = [333388,686544,574746];

(async () => {
    for (const id of productIds) {
        console.log(`Calling fetchProductInfo on product id ${id}`)
        try {
            const productData = await fetchProductInfo(id);
            console.log(`Product ${productData['name']} with id ${id} is on special? ${productData['onSpecial']}`)
        } catch (error) {
            console.error(`Whoopsie: ${id}:`, error)
        }
    }

})();