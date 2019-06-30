const boys = {
    categories: ['clothes', 'shoes', 'accessories', 'ethnic'],
    types: [
        ['jeans', 'trousers and chinos', 'shirts', 't-shirts', 'jerseys', 'jackets', 'coats', 'rain-gear'],
        ['sneakers', 'dressing-shoes', 'boots', 'sandals', 'hawaianas', 'gum-boots and others'],
        ['caps and hats', 'clocks', 'belts', 'socks', 'under-garments', 'mufflers', 'gloves', 'body-warmers', 'lohis'],
        ['kurtas and pijamas', 'vests', 'dhoti kurtas', 'sherwanis' ]
    ]
}

const girls = {
    categories: ['clothes', 'shoes', 'accessories', 'ethnic'],
    types: [
        ['jeans', 'trousers and chinos', 'shirts', 't-shirts', 'jerseys', 'jackets', 'coats', 'tops', 'skirts', 'rain-gear', 'dresses'],
        ['sneakers', 'dressing-shoes', 'boots', 'sandals', 'hawainas', 'gum-boots and others'],
        ['caps and hats', 'clocks', 'belts', 'socks', 'leggings', 'under-garments', 'mufflers', 'gloves', 'body-warmers', 'hair accessories', 'shawls'],
        ['salwar-kurta', 'lehnga-cholis / ghagra-cholis', 'vests', 'jacekts', 'saaris'],
    ]
}

const prodClassification = document.getElementById('prodClassification');
const audienceList = document.getElementById('prodAudience');
const catList = document.getElementById('prodCategory');
const typeList = document.getElementById('prodType');
const sizeContainer = document.getElementById('sizes');

console.log('selected gender ' + audienceList.value);
console.log('selected category ' + catList.value);


const audience = function () {
    return (audienceList.value === 'male' ? boys : girls);
};

// Loading proper options for product classification and sizes
prodClassification.addEventListener('change', getLists);
// Loading sizes 
window.addEventListener('load', getSizes);

function getLists(evt) {
    console.log(evt.target);
    if(evt.target.classList.contains('genderSelection')) {
        console.log(evt.target.value);
        getCat(audience());
        getType(catList.selectedIndex);
        getSizes();
    } else if(evt.target.classList.contains('catSelection')) {
        getType(catList.selectedIndex);
        getSizes();
    } else if(evt.target.classList.contains('typeSelection')) {
        getSizes();
    }  
}


// Creates list of all categories that belong to selected audience/gender
function getCat(gender) {
    catList.innerHTML = '';
    gender.categories.forEach( (category, index) => {
        const option = document.createElement('option');
        option.classList.add('selectOption');
        option.appendChild(document.createTextNode(category));
        option.value = category;
        catList.appendChild(option);
    });
    catList.selectedIndex = 0;
}

// Creates list of all product-types that belong to the selected category
function getType(index) {
    typeList.innerHTML = '';
    audience().types[index].forEach(type => {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(type));
        option.value = type;
        typeList.appendChild(option);
        typeList.selectedIndex = 0;
    });
    typeList.selectedIndex = 0;
}

// Get Sizes for the product being added based upon prod-type, category and taget-audience(gender)
function getSizes() {
    let selectedType = typeList.value;
    let selectedCat = catList.value;
    selectedAud = audienceList.value;
    const myFetchReq = new Request(`/admin/prodSizes?prodType=${selectedType}&category=${selectedCat}&audience=${selectedAud}`);
    fetch(myFetchReq, {
        credentials: "same-origin"
    })
    .then( result => {
        if(result.ok) {
            console.log('Fetch successfull');
            return result.json();
        }
        throw new Error('Some error occured while fetching sizes');
    })
    .then( result => {
        console.log('This was the result ' + JSON.stringify(result));
        console.log('Sizes: ' + result['sizeNames']);
        const sizes = result.sizeNames[0].split(', ');
        const sizeList = document.createElement('div');
        sizes.forEach( size => {
            const sizeQtycontainer = document.createElement('section');
            sizeQtycontainer.classList.add("centerFlexSpaceBetween");
            const sizeDiv = document.createElement('div');
            sizeDiv.style.width = "50%";
            sizeDiv.classList.add('centerFlexSpaceBetween');
            const sizeName = document.createElement('p');
            sizeName.appendChild(document.createTextNode(size))
            sizeName.classList.add('sizeName');
            sizeDiv.appendChild(sizeName);
            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.name = "chk"+size;
            chk.value = size;
            chk.classList.add('sizeChk');
            sizeDiv.appendChild(chk);
            const qtyInSize = document.createElement('input');
            qtyInSize.type = 'number';
            qtyInSize.name = "qty"+size;
            qtyInSize.classList.add("formInput");
            sizeQtycontainer.appendChild(sizeDiv);
            sizeQtycontainer.appendChild(qtyInSize);
            sizeList.append(sizeQtycontainer);
        });
        sizeContainer.removeChild(sizeContainer.firstChild);
        sizeContainer.appendChild(sizeList);
    })
    .catch( err => {
        if(err)
            console.log(err);
    });
}