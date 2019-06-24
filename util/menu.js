const topCategoryNames =  ['boys', 'girls', "granny's corner"];
const topCategoryEndPoints = ['/?gender=boys', '/?gender=girls', '/?category=grannys'];
const boys = ['clothes', 'shoes', 'accessories', 'ethnic'];
const boysCatEndPoints = ['/?gender=boys&catogory=cloths', '/?gender=boys&catogory=shoes', '/?gender=boys&catogory=accessories', '/?gender=boys&catogory=ethnic'];
const girls = ['clothes', 'shoes', 'accessories', 'ethnic'];
const girlsCatEndPoints = ['/?gender=girls&catogory=cloths', '/?gender=girls&catogory=shoes', '/?gender=girls&catogory=accessories', '/?gender=girls&catogory=ethnic'];
const grannys = ['scarfs', 'jerseys', 'gloves'];
const grannysCatEndPoints = ['/?category=grannys&type=scarf', '/?category=grannys&type=jersey', '/?category=grannys&type=gloves'];
const boysCloths = ['jeans', 'trousers and chinos', 'shirts', 't-shirts', 'jerseys', 'jackets', 'coats', 'rain-gear', 'ethnic'];
const boysShoes = ['sneakers', 'dressing-shoes', 'boots', 'sandals', 'hawainas', 'gum-boots and others', 'ethnic'];
const boysAccessories = ['caps and hats', 'clocks', 'belts', 'socks', 'under-garments', 'mufllers', 'gloves', 'body-warmers'];
const boysEtnic = ['kurtas and pijamas', 'vests', 'dhoti kurtas', 'sherwanis', 'lohis' ];
const girlsCloths = ['jeans', 'trousers and chinos', 'shirts', 't-shirts', 'jerseys', 'jackets', 'coats', 'skirts', 'rain-gear', 'ethnic'];
const girlsEthnic = ['salwar-kurta', 'lehnga-cholis / ghagra-cholis', 'vests', 'jacekts', 'saaris'];
const girlsShoes = ['sneakers', 'dressing-shoes', 'boots', 'sandals', 'hawainas', 'gum-boots and others', 'ethnic'];
const girlsAccessories = ['caps and hats', 'clocks', 'belts', 'socks', 'leggings', 'under-garments', 'mufllers', 'gloves', 'body-warmers', 'hair accessories', 'shawls'];

const boysProducts = [boysCloths, boysShoes, boysAccessories, boysEtnic];
const girlsProducts = [girlsCloths, girlsShoes, girlsAccessories, girlsEthnic];
const grannysProducts = [grannys];

const boysCategories = boys.map( (n, index) => {
    return( {
        name: n,
        subCats: boysProducts[index],
        endPoint: boysCatEndPoints[index]
    });
});

const girlsCategories = girls.map( (n, index) => {
    return( {
        name: n,
        subCats: girlsProducts[index],
        endPoint: girlsCatEndPoints[index]
    });
});

const grannysCategories = grannys.map( (n, index) => {
    return( {
        name: n,
        endPoint: grannysCatEndPoints[index]
    });
});

const allCategories = [boysCategories, girlsCategories, grannysCategories];

const topCategory = topCategoryNames.map( (n, index) => {
    return {
        name: n,
        subCats: allCategories[index],
        endPoint: topCategoryEndPoints[index]
    }
});

module.exports = topCategory;
