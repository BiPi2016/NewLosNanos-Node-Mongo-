const topCategoryNames =  ['male', 'female', "granny's corner"];
const topCategoryEndPoints = ['/products/?audience=boys', '/products/?audience=girls', '/products/?category=grannys'];
const boys = ['clothes', 'shoes', 'accessories', 'ethnic'];
const boysCatEndPoints = ['/products/?audience=boys&catogory=cloths', '/products/?audience=boys&catogory=shoes', '/products/?audience=boys&catogory=accessories'];
const girls = ['clothes', 'shoes', 'accessories', 'ethnic'];
const girlsCatEndPoints = ['/products/?audience=girls&catogory=cloths', '/products/?audience=girls&catogory=shoes', '/products/?audience=girls&catogory=accessories'];
const grannys = ['scarfs', 'jerseys', 'gloves'];
const grannysCatEndPoints = ['/products/?category=grannys&type=scarf', '/products/?category=grannys&type=jersey', '/products/?category=grannys&type=gloves'];
const boysCloths = ['jeans', 'trousers and chinos', 'shirts', 't-shirts', 'jerseys', 'jackets', 'coats', 'rain-gear'];
const boysShoes = ['sneakers', 'dressing-shoes', 'boots', 'sandals', 'hawainas', 'gum-boots and others'];
const boysAccessories = ['caps and hats', 'clocks', 'belts', 'socks', 'under-garments', 'mufflers', 'gloves', 'body-warmers'];
const boysEtnic = ['kurtas and pijamas', 'vests', 'dhoti kurtas', 'sherwanis', 'lohis' ];
const girlsCloths = ['jeans', 'trousers and chinos', 'shirts', 't-shirts', 'tops', 'jerseys', 'jackets', 'coats', 'skirts', 'rain-gear'];
const girlsEthnic = ['salwar-kurta', 'lehnga-cholis / ghagra-cholis', 'vests', 'jacekts', 'saaris'];
const girlsShoes = ['sneakers', 'dressing-shoes', 'boots', 'sandals', 'hawainas', 'gum-boots and others'];
const girlsAccessories = ['caps and hats', 'clocks', 'belts', 'socks', 'leggings', 'under-garments', 'mufflers', 'gloves', 'body-warmers', 'hair accessories', 'shawls'];

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
