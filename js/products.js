let products = {};
let basket = [];
let likes = [];


class Product {
    type = 'new';
    
    isActiveHeart = 'false';
    isActiveBasket = 'false';

    constructor(title, price, colorName, colorHEX, compositionProp1, compositionValue1, compositionProp2, compositionValue2) {
        this.title = title, 
        this.price = price,

        this.color = [],
        this.color[0] = {
            colorName: colorName,
            colorHEX: colorHEX
        },
        
        this.composition = [],
        this.composition[0] = {
            property: compositionProp1,
            value: compositionValue1
        }
        this.composition[1] = {
            property: compositionProp2,
            value: compositionValue2
        }
    }

    // Функция добавления описания в объект продукта:
    addDescription(descriptionText) {
        this.description = descriptionText;
        return this;
    }

    // Функция добавления дополнительного свойства (цвета или элемента состава) в объект продукта:
    addColorOrComposition(prop, propName, propValue) {

        if ( prop !== 'color' && prop !== 'composition' ) {
            return this;
        }
    
        const newArr = [];
        this[prop].forEach( obj => newArr.push(...Object.values(obj)) );
        
        if ( newArr.includes(propName) || newArr.includes(propValue) ) {
            return this;
        }
    
        const propertyName = ( prop === 'color' ) ? 'colorName' : 'property';
        const propertyValue = ( prop === 'color' ) ? 'colorHEX' : 'value';
        
        this[prop].push( {[propertyName]: propName, [propertyValue]: propValue} );
        return this;
    }

    // Функция добавления объекта продукта в соответствующий типу массив в объекте "products":
    addInArray() {

        if ( !(this.type in products) ) {
            products[this.type] = [];
        }

        if ( !products[this.type].includes(this) ) {
            products[this.type].push(this);
        }
        
        return this;
    }

    // Функция удаления объекта продукта из соответствующего типу массива в объекте "products":
    removeFromArray() {
        const indexInArr = products[this.type].indexOf(this, 0);
        products[this.type].splice(indexInArr, 1);
        return this;
    }
}


class Bodysuit extends Product {
    type = 'bodysuits';

    constructor(...args) {
        super (...args);
    }
}

class Dress extends Product {
    type = 'dresses';

    constructor(...args) {
        super (...args);
    }
}

class Costume extends Product {
    type = 'costumes';

    constructor(...args) {
        super (...args);
    }
}

class Shirt extends Product {
    type = 'shirts';

    constructor(...args) {
        super (...args);
    }
}

class Skirt extends Product {
    type = 'skirts';

    constructor(...args) {
        super (...args);
    }
}

class Sweater extends Product {
    type = 'sweaters';

    constructor(...args) {
        super (...args);
    }
}


new Product('cardigan long', 390, 'white', '#E2E2E0', 'acrylic fabrics', '70%', 'wool', '30%')
.addDescription('The cardigan isn\'t prickly, very warm and pleasant to the body.')
.addInArray();

new Product('jacket with vest', 315, 'gray', '#A5A7A9', 'viscose', '45%', 'wool', '30%')
.addColorOrComposition('composition', 'polyester', '25%')
.addDescription('Jacket and vest is made of dense soft material, ideal for cool weather.')
.addInArray();

new Product('top with flounces', 130, 'white', '#E2E2E0', 'cotton', '97%', 'elastane', '3%')
.addInArray();

new Product('pants with cutouts', 170, 'cappuccino', '#C5AB9F', 'cotton', '58%', 'nylon', '37%')
.addColorOrComposition('color', 'black', '#252525')
.addColorOrComposition('composition', 'elastane', '5%')
.addInArray();

new Product('turtleneck with cut', 179, 'black', '#252525', 'viscose', '97%', 'elastane', '3%')
.addColorOrComposition('color', 'cappuccino', '#C5AB9F')
.addInArray();

new Product('cropped top with buttons', 140, 'white', '#E2E2E0', 'cotton', '97%', 'elastane', '3%')
.addDescription('The top is made of cotton fabric, fits snugly to the body.')
.addInArray();

new Bodysuit('with assembly', 185, 'cream', '#F6E8B1', 'cotton', '97%', 'elastane', '3%')
.addDescription('Long sleeve bodysuit in double cotton fabric. The fabric is not translucent, soft, stretches well. The product is made in the form of a thong.')
.addInArray();

new Bodysuit('with lock', 185, 'black', '#252525', 'cotton', '97%', 'elastane', '3%')
.addDescription('Clasp at the bottom. Accessories to match the bodysuit.')
.addInArray();

new Bodysuit('knitted with long sleeve', 190, 'biege', '#E8D3B9', 'viscose', '97%', 'elastane', '3%')
.addDescription('Clasp at the bottom. Stretches well and fits all sizes.')
.addInArray();

new Bodysuit('basic', 180, 'graphite', '#66676A', 'cotton', '97%', 'elastane', '3%')
.addColorOrComposition('color', 'latte', '#DEC7AD')
.addDescription('Long sleeve bodysuit in double cotton fabric. The fabric is not translucent, soft, stretches well. The product is made in the form of a thong.')
.addInArray();

new Bodysuit('with round neckline', 185, 'heavenly', '#C5DFFB', 'cotton', '97%', 'elastane', '3%')
.addColorOrComposition('color', 'cappuccino', '#C5AB9F')
.addColorOrComposition('color', 'pink', '#FADADD')
.addColorOrComposition('color', 'black', '#252525')
.addDescription('Clasp at the bottom. Accessories to match the bodysuit.')
.addInArray();

new Costume('silk', 270, 'black', '#252525', 'viscose', '65%', 'cotton', '30%')
.addColorOrComposition('composition', 'elastane', '5%')
.addInArray();

new Costume('knitted', 230, 'lavender', '#DEACF3', 'viscose', '97%', 'elastane', '3%')
.addInArray();

new Costume('summer', 190, 'heavenly', '#C5DFFB', 'cotton', '92%', 'lycra', '8%')
.addInArray();

new Costume('with flounces', 270, 'graphite', '#66676A', 'cotton', '50%', 'acrylic fabrics', '50%')
.addDescription('Flounces aren\'t removable. After washing they perfectly retain their shape.')
.addInArray();

new Costume('insulated with lock', 320, 'graphite', '#66676A', 'cotton', '65%', 'polyester', '35%')
.addDescription('The product is made with insulation from the footer. Suitable for height 160-170, 170-180.')
.addInArray();

new Dress('knitted with cutout', 260, 'biege', '#E8D3B9', 'viscose', '96%', 'elastane', '4%')
.addDescription('Basic dress. Slim fit silhouette perfectly emprasister the figure. Thanks to artificial fibers, the material doesn\'t wrinkle and retains its shape.')
.addInArray();

new Dress('velvet', 135, 'black', '#252525', 'polyester', '95%', 'elastane', '5%')
.addInArray();

new Dress('with blue flowers', 210, 'white', '#E2E2E0', 'linen', '55%', 'viscose', '45%')
.addInArray();

new Shirt('in checker', 126, 'biege', '#E8D3B9', 'polyester', '95%', 'elastane', '5%')
.addInArray();

new Shirt('classic', 185, 'milky', '#FDF6E4', 'polyester', '65%', 'viscose', '45%')
.addColorOrComposition('color', 'heavenly', '#C5DFFB')
.addColorOrComposition('composition', 'elastane', '5%')
.addInArray();

new Shirt('silk', 135, 'milky', '#FDF6E4', 'viscose', '97%', 'elastane', '3%')
.addDescription('The shirt is made of light silk material, ideal for warm weather.')
.addInArray();

new Shirt('warm', 270, 'white', '#E2E2E0', 'polyester', '65%', 'viscose', '30%')
.addColorOrComposition('composition', 'elastane', '5%')
.addDescription('The shirt is made of dense soft material, ideal for cool weather. Oversize cut.')
.addInArray();

new Shirt('night', 150, 'blue steel', '#B0C4DE', 'viscose', '97%', 'elastane', '3%')
.addDescription('The shirt is made of light silk material, ideal for warm weather.')
.addInArray();

new Skirt('silk', 159, 'emerald', '#008080', 'viscose', '97%', 'elastane', '3%')
.addInArray();

new Skirt('plisse', 200, 'biege', '#E8D3B9', 'viscose', '97%', 'elastane', '3%')
.addInArray();

new Skirt('leather long', 210, 'black', '#252525', 'polyester', '50%', 'polyurethane', '50%')
.addDescription('Suitable for height from 155 cm to 180 cm.')
.addInArray();

new Sweater('olof', 250, 'blue', '#90CBF9', 'acrylic fabrics', '70%', 'wool', '30%')
.addDescription('Back length - 75 cm, width - 60 cm')
.addInArray();

new Sweater('ginger cookiet', 250, 'red', '#DC1C13', 'acrylic fabrics', '70%', 'wool', '30%')
.addDescription('Back length - 75 cm, width - 60 cm')
.addInArray();

new Sweater('honeycombs', 270, 'grape/lavender', '#931f80', 'acrylic fabrics', '50%', 'cotton', '50%')
.addDescription('Reversible sweater. You get a sweater 2 in 1: one side is dark grape, the other is light lavender.')
.addInArray();

new Sweater('with slits on the sides', 190, 'lime', '#C2F70F', 'acrylic fabrics', '50%', 'cotton', '50%')
.addDescription('Suitable for height: from 155 cm to 180 cm. Oversize cut. Suitable for sizes 42-48')
.addInArray();

new Sweater('with holes', 290, 'biege', '#E8D3B9', 'acrylic fabrics', '50%', 'cotton', '50%')
.addDescription('Suitable for height: from 155 cm to 180 cm. Oversize cut. Suitable for sizes 42-48')
.addInArray();

new Sweater('euphoria', 260, 'green', '#28713E', 'acrylic fabrics', '50%', 'cotton', '50%')
.addDescription('Suitable for height: from 155 cm to 180 cm. Oversize cut. Suitable for sizes 42-48')
.addInArray();


// LocalStorage
if ( localStorage.getItem('products') ) {
    products = JSON.parse( localStorage.getItem('products') );
}

if ( localStorage.getItem('basket') ) {
    basket = JSON.parse( localStorage.getItem('basket') );
}

if ( localStorage.getItem('likes') ) {
    likes = JSON.parse( localStorage.getItem('likes') );
}

export { products, basket, likes };