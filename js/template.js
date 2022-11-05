// Products
import { products, basket, likes } from "./products.js";
import { saveToLocalStorage, checkCounter, heartCounter, basketCounter } from "./main.js";


// Функция отображения страницы с товарами определенного типа:
function showProductsTypePage(type) {

    document.title = `MSTEFA - ${type[0].toUpperCase() + type.slice(1)}`;

    const productsMain = document.querySelector('.products');

    const container = document.createElement('div'); 
    container.classList.add('container');
    productsMain.append(container);
    

    const productsWrapper = document.createElement('div'); 
    productsWrapper.classList.add('products-wrapper');
    container.append(productsWrapper);

    const productsCategories = document.createElement('aside'); 
    productsCategories.classList.add('products-categories');
    productsWrapper.append(productsCategories);

    const productsType = document.createElement('section'); 
    productsType.classList.add('products-type');
    productsWrapper.append(productsType);

    /* Отображаем список категорий продуктов */
    // Создаём разметку, в которую будем довавлять свойства из объекта "products":
    const categoriesList = document.createElement('ul');
    categoriesList.classList.add('categories-list');
    productsCategories.append(categoriesList);

    // Функкция создания разметки категории продукта:
    function createCategoryHTML(category) {
        const categoriesListItem = document.createElement('li');

        const categoriesLink = document.createElement('a');
        categoriesLink.setAttribute('href', `./${category}.html`);
        categoriesLink.classList.add('categories-link');
        categoriesLink.innerText = `${category[0].toUpperCase() + category.slice(1)}`;

        categoriesListItem.append(categoriesLink);
        categoriesList.append(categoriesListItem);

        if ( category === type ) {
            categoriesLink.classList.add('active-category');
        }
    }
    Object.keys(products).sort().forEach( category => createCategoryHTML(category) );

    /* Отображаем карточки продуктов определенного типа */
    // Создаём заголовок:
    const productsTypeTitle = document.createElement('h4');
    productsTypeTitle.classList.add('products-type-title')
    productsTypeTitle.innerText = type;
    productsType.append(productsTypeTitle);

    // Создаём контейнер, в который будем добавлять карточки продуктов:
    const productsTypeList = document.createElement('div');
    productsTypeList.classList.add('products-type-list');
    productsType.append(productsTypeList);

     // Функкция создания разметки карточки продукта:
     function createProductCardHTML(product) {
        // Разметка карточки продукта:
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productsTypeList.append(productCard);

        const productCardLink = document.createElement('a');
        productCardLink.setAttribute('href', `./pages/${product.type}/${product.title.split(' ').join('-')}.html`);
        productCardLink.classList.add('product-card-link');
        productCard.append(productCardLink);

        // Разметка для абсолютно спозиционированного элемента "productCardHeart":
        const productCardHeart = document.createElement('span');
        productCardHeart.classList.add('product-card-heart');
        productCardHeart.classList.add('product-card-heart-hidden');
        productCard.append(productCardHeart);

        const productCardHeartImg = document.createElement('img');
        productCardHeartImg.setAttribute('src', './img/icons/products/heart-empty.svg');
        productCardHeartImg.setAttribute('alt', 'Heart\'s icon');
        productCardHeartImg.classList.add('product-card-heart-img');
        productCardHeart.append(productCardHeartImg);

         // Проверка значения свойства "isActive" в объекте товара и отображение элемента "productCardHeart":
        if (product.isActiveHeart === 'true') {
            productCardHeart.classList.remove('product-card-heart-hidden');
            productCardHeart.setAttribute('data-active-heart', '');
            productCardHeartImg.setAttribute('src', './img/icons/products/heart-full.svg');
        } 

        // В "productImg" вложен "img"
        const productImg = document.createElement('span');
        productImg.classList.add('product-img');
        productCardLink.append(productImg);

        const img = document.createElement('img');
        img.setAttribute('src', `./img/products/${product.type}/${product.title.split(' ').join('-')}/01.jpg`);
        img.setAttribute('alt', `${product.type[0].toUpperCase() + product.type.slice(1)} ${product.title[0].toUpperCase() + product.title.slice(1)}`);
        productImg.append(img);
            
        // В "productCardFooter" вложены "productCardTitle" и "productCardPrice"
        const productCardFooter = document.createElement('span');
        productCardFooter.classList.add('product-card-footer');
        productCardLink.append(productCardFooter);

        // Удаляем у типа товара множественное окончание (применяется для "productCardTitle"):
        const productCardTypeTitle = 
        product.type.endsWith('ses') ? product.type.slice(0, -2) : 
        !product.type.endsWith('s') ? product.type :
        product.type.slice(0, -1); 

        const productCardTitle = document.createElement('span');
        productCardTitle.classList.add('product-card-title');
        productCardTitle.innerText = `${productCardTypeTitle} ${product.title}`;
        productCardFooter.append(productCardTitle);

        const productCardPrice = document.createElement('span');
        productCardPrice.classList.add('product-card-price');
        productCardPrice.innerText = `${product.price.toFixed(2)}`;
        productCardFooter.append(productCardPrice);
    }
    // Перебираем массив и создаём разметку для каждого элемента:
    products[type].forEach( product => createProductCardHTML(product) ); 
      
    // Функкция для добавления / отмены добавления свойства "нравится":
    function heartAction(event) {
            if (event.target.className === 'product-card-heart-img') {

                const parentDiv = event.target.closest('div');
                const cardTitleArr = parentDiv.querySelector('.product-card-title').innerText.toLowerCase().split(' ');
                const cardTitleType = ( cardTitleArr[0].endsWith('s') ) ? cardTitleArr[0] + 'es' :
                ( cardTitleArr[0] === 'new' ) ? cardTitleArr[0] :
                cardTitleArr[0] + 's';
                const cardTitleName = cardTitleArr.slice(1).join(' ');
                const objInProducts = products[cardTitleType].find(product => product.title === cardTitleName);
                const objInBasket = basket.find(product => product.type === type && product.title === cardTitleName);
                const objInLikes = likes.find(product => product.type === type && product.title === cardTitleName);

                const parentSpan = event.target.closest('span');
                parentSpan.classList.toggle('product-card-heart-hidden');

                if ( !parentSpan.hasAttribute('data-active-heart') ) {

                    event.target.src = './img/icons/products/heart-full.svg';
                    objInProducts.isActiveHeart = 'true';

                    if (objInBasket) {
                        objInBasket.isActiveHeart = 'true';
                    }

                    parentSpan.setAttribute('data-active-heart', '');

                    // Добавляем объект продукта, внутри которого произошёл клик, в массив "likes":
                    likes.push(objInProducts);

                    
                } else {

                    event.target.src = './img/icons/products/heart-empty.svg';
                    objInProducts.isActiveHeart = 'false';

                    if (objInBasket) {
                        objInBasket.isActiveHeart = 'false';
                    }
                    
                    parentSpan.removeAttribute('data-active-heart');

                    // Удаляем объект продукта, внутри которого произошёл клик, из массива "likes":
                    likes.splice(likes.indexOf(objInLikes, 0), 1);
                }

                saveToLocalStorage();
                checkCounter(heartCounter, likes);
            }
    }
    productsMain.addEventListener('click', heartAction);
}

// Функция отображения страницы товара:
function showProductPage(type, title) {

    const productTypeTitle = 
        type.endsWith('ses') ? type.slice(0, -2) : 
        !type.endsWith('s') ? type :
        type.slice(0, -1); 

    document.title = `MSTEFA - ${productTypeTitle[0].toUpperCase() + productTypeTitle.slice(1)} ${title[0].toUpperCase() + title.slice(1)}`;

    const product = products[type].find( product => product.title === title);

    const productMain = document.querySelector('.product');

    const container = document.createElement('div'); 
    container.classList.add('container');
    productMain.append(container);

    const productWrapper = document.createElement('div'); 
    productWrapper.classList.add('product-wrapper');
    container.append(productWrapper);

    
    /* Разметка для блока с фотографиями */
    const imgContent = document.createElement('section'); 
    imgContent.classList.add('img-content');
    productWrapper.append(imgContent);

    const mainPhoto = document.createElement('div'); 
    mainPhoto.classList.add('main-photo');
    imgContent.append(mainPhoto);

    // Разметка для абсолютно спозиционированного элемента "productHeart":
    const productHeart = document.createElement('span');
    productHeart.classList.add('product-heart');
    productHeart.classList.add('product-heart-hidden');
    mainPhoto.append(productHeart);

    const productHeartImg = document.createElement('img');
    productHeartImg.setAttribute('src', '../../img/icons/products/heart-empty.svg');
    productHeartImg.setAttribute('alt', 'Heart\'s icon');
    productHeartImg.classList.add('product-heart-img');
    productHeart.append(productHeartImg);

    // Проверка значения свойства "isActive" в объекте товара и отображение элемента "productHeart":
    if (product.isActiveHeart === 'true') {
        productHeart.classList.remove('product-heart-hidden');
        productHeart.setAttribute('data-active-heart', '');
        productHeartImg.setAttribute('src', '../../img/icons/products/heart-full.svg');
    } 


    const secondaryPhoto = document.createElement('div'); 
    secondaryPhoto.classList.add('secondary-photo');
    imgContent.append(secondaryPhoto);

    const secondaryFirstImg = document.createElement('img');
    secondaryFirstImg.classList.add('secondary-photo-img');
    secondaryFirstImg.setAttribute('src', `../../img/products/${product.type}/${product.title.split(' ').join('-')}/01.jpg`);
    secondaryFirstImg.setAttribute('alt', 'Photo 01');
    secondaryPhoto.append(secondaryFirstImg);

    const secondarySecondImg = document.createElement('img');
    secondarySecondImg.classList.add('secondary-photo-img');
    secondarySecondImg.classList.add('secondary-photo-img-active');
    secondarySecondImg.setAttribute('src', `../../img/products/${product.type}/${product.title.split(' ').join('-')}/02.jpg`);
    secondarySecondImg.setAttribute('alt', 'Photo 02');
    secondaryPhoto.append(secondarySecondImg);


    mainPhoto.style.backgroundImage = `url( ${secondarySecondImg.getAttribute('src')} )`;


    const secondaryThirdImg = document.createElement('img');
    secondaryThirdImg.classList.add('secondary-photo-img');
    secondaryThirdImg.setAttribute('src', `../../img/products/${product.type}/${product.title.split(' ').join('-')}/03.jpg`);
    secondaryThirdImg.setAttribute('alt', 'Photo 03');
    secondaryPhoto.append(secondaryThirdImg);

    const secondaryFourthImg = document.createElement('img');
    secondaryFourthImg.classList.add('secondary-photo-img');
    secondaryFourthImg.setAttribute('src', `../../img/products/${product.type}/${product.title.split(' ').join('-')}/04.jpg`);
    secondaryFourthImg.setAttribute('alt', 'Photo 04');
    secondaryPhoto.append(secondaryFourthImg);

    const secondaryFifthImg = document.createElement('img');
    secondaryFifthImg.classList.add('secondary-photo-img');
    secondaryFifthImg.setAttribute('src', `../../img/products/${product.type}/${product.title.split(' ').join('-')}/05.jpg`);
    secondaryFifthImg.setAttribute('alt', 'Photo 05');
    secondaryPhoto.append(secondaryFifthImg);

    
    /* Разметка для блока с информацией о товаре */
    const infoContent = document.createElement('section'); 
    infoContent.classList.add('info-content');
    productWrapper.append(infoContent);


    const productCategoryLink = document.createElement('h6'); 
    productCategoryLink.classList.add('product-category-link');
    infoContent.append(productCategoryLink);

    const productCategoryLinkSpan = document.createElement('span');
    productCategoryLinkSpan.innerText = 'category / '; 
    productCategoryLink.append(productCategoryLinkSpan);

    const productCategoryLinkA = document.createElement('a');
    productCategoryLinkA.setAttribute('href', `../../${type}.html`);
    productCategoryLinkA.innerText = type;
    productCategoryLink.append(productCategoryLinkA);

    
    const productTitle = document.createElement('h5'); 
    productTitle.classList.add('product-title');
    productTitle.innerText = `${productTypeTitle[0].toUpperCase() + productTypeTitle.slice(1)} ${title}`;
    infoContent.append(productTitle);

    const productPrice = document.createElement('span'); 
    productPrice.classList.add('product-price');
    productPrice.innerText = `${product.price.toFixed(2)}`;
    infoContent.append(productPrice);

    const productColors = document.createElement('div'); 
    productColors.classList.add('color-info');
    infoContent.append(productColors);

    const productColorsSpan = document.createElement('span'); 
    productColorsSpan.innerText = `color: `;
    productColors.append(productColorsSpan);

    Object.entries(product.color).forEach( elem => {

        const productColorWrapper = document.createElement('div'); 
        productColorWrapper.classList.add('color-wrapper');
        productColors.append(productColorWrapper);

        const productColorName = document.createElement('span'); 
        productColorName.classList.add('color-name');
        productColorName.innerText = `${elem[1].colorName} `;
        productColorWrapper.append(productColorName);

        const productColorHEX = document.createElement('div'); 
        productColorHEX.classList.add('color-hex');
        productColorHEX.style.backgroundColor = `${elem[1].colorHEX}`
        productColorWrapper.append(productColorHEX);

    })


    const productBtn = document.createElement('div');
    productBtn.classList.add('product-btn'); 
    infoContent.append(productBtn);

    const btnAddToBasket = document.createElement('button');
    btnAddToBasket.classList.add('add-to-basket'); 
    btnAddToBasket.innerText = 'add to basket';
    productBtn.append(btnAddToBasket);

    if ( product.isActiveBasket === 'true' ) {
        btnAddToBasket.classList.add('add-to-basket-active');
    }

    const productBtnNote = document.createElement('p');
    productBtnNote.classList.add('product-btn-note'); 
    productBtnNote.innerText = 'production time is 10 business days*';
    productBtn.append(productBtnNote);


    const productComposition = document.createElement('div');
    productComposition.classList.add('product-composition'); 
    infoContent.append(productComposition);

    const productCompositionSpan = document.createElement('span'); 
    productCompositionSpan.innerText = `composition: `;
    productComposition.append(productCompositionSpan);

    const productCompositionWrapper = document.createElement('div'); 
    productCompositionWrapper.classList.add('composition-wrapper');
    productComposition.append(productCompositionWrapper);

    Object.entries(product.composition).forEach( elem => {

        const compositionSpan = document.createElement('span'); 
        compositionSpan.innerText = `${elem[1].property} - ${elem[1].value} `;
        productCompositionWrapper.append(compositionSpan);

    })


    if ( product.description !== undefined ) {

        const discription = document.createElement('div'); 
        discription.classList.add('discription');
        infoContent.append(discription);

        const discriptionSpan = document.createElement('span'); 
        discriptionSpan.innerText = `${product.description}`;
        discription.append(discriptionSpan);
    }

    const productCare = document.createElement('div'); 
    productCare.classList.add('product-care');
    infoContent.append(productCare);

    const productCareDetails = document.createElement('details'); 
    productCare.append(productCareDetails);

    const productCareSummary = document.createElement('summary'); 
    productCareSummary.innerText = 'product care';
    productCareDetails.append(productCareSummary);

    const productCareList = document.createElement('ul');
    productCareDetails.prepend(productCareList);

    const productCareListItemFirst = document.createElement('li');
    productCareListItemFirst.innerText = 'Wash on delicate cycle at 400 rpm.';
    productCareList.append(productCareListItemFirst);

    const productCareListItemSecond = document.createElement('li');
    productCareListItemSecond.innerText = 'Water temperature up to 30°C.';
    productCareList.append(productCareListItemSecond);

    const productCareListItemThird = document.createElement('li');
    productCareListItemThird.innerText = 'After washing, we recommend to pull the product a little in length. This way it will keep its shape.';
    productCareList.append(productCareListItemThird);

    const productCareListItemFourth = document.createElement('li');
    productCareListItemFourth.innerText = 'Iron at iron temperature up to 110°C.';
    productCareList.append(productCareListItemFourth);

    const productCareListItemFifth = document.createElement('li');
    productCareListItemFifth.innerText = 'Don\'t bleach.';
    productCareList.append(productCareListItemFifth);

    const productCareListItemSixth = document.createElement('li');
    productCareListItemSixth.innerText = 'Drying on a horizontal plane in a straightened state.';
    productCareList.append(productCareListItemSixth);

    const productCareListItemSeventh = document.createElement('li');
    productCareListItemSeventh.innerText = 'Tumble drying is prohibited.';
    productCareList.append(productCareListItemSeventh);


    const productDelivery = document.createElement('div'); 
    productDelivery.classList.add('product-delivery');
    infoContent.append(productDelivery);

    const deliveryDetails = document.createElement('details'); 
    productDelivery.append(deliveryDetails);

    const deliverySummary = document.createElement('summary'); 
    deliverySummary.innerText = 'delivery';
    deliveryDetails.append(deliverySummary);

    const deliveryContent = document.createElement('p');
    deliveryContent.innerText = 'Delivery to all regions.';
    deliveryDetails.prepend(deliveryContent);

    
    // Функкция изменения основного изображения товара:
    function showPhoto(event) {
        if (event.target.className === 'secondary-photo-img') {

            const parent = event.target.closest('section');
            const mainPhoto = parent.querySelector('.main-photo');

            const secondaryPhotoArr = Array.from( parent.querySelectorAll('.secondary-photo-img') );
            secondaryPhotoArr.forEach( elem => {
                if ( elem.classList.contains('secondary-photo-img-active') ) {
                    elem.classList.remove('secondary-photo-img-active');
                }
            })

            event.target.classList.add('secondary-photo-img-active');
            mainPhoto.style.backgroundImage = `url( ${event.target.getAttribute('src')} )`;
        }
    }
    productMain.addEventListener('click', showPhoto);

    // Функкция для добавления / отмены добавления свойства "нравится":
    function heartAction(event) {
        if (event.target.className === 'product-heart-img') {

            const objInProducts = product;
            const objInBasket = basket.find(product => product.type === type && product.title === title);
            const objInLikes = likes.find(product => product.type === type && product.title === title);

            const parentSpan = event.target.closest('span');
            parentSpan.classList.toggle('product-heart-hidden');

            if ( !parentSpan.hasAttribute('data-active-heart') ) {

                event.target.src = '../../img/icons/products/heart-full.svg';
                objInProducts.isActiveHeart = 'true';

                if (objInBasket) {
                    objInBasket.isActiveHeart = 'true';
                }

                parentSpan.setAttribute('data-active-heart', '');

                // Добавляем объект продукта, внутри которого произошёл клик, в массив "likes":
                likes.push(objInProducts);

                
            } else {

                event.target.src = '../../img/icons/products/heart-empty.svg';
                objInProducts.isActiveHeart = 'false';

                if (objInBasket) {
                    objInBasket.isActiveHeart = 'false';
                }
                
                parentSpan.removeAttribute('data-active-heart');

                // Удаляем объект продукта, внутри которого произошёл клик, из массива "likes":
                likes.splice(likes.indexOf(objInLikes, 0), 1);
            }

            saveToLocalStorage();
            checkCounter(heartCounter, likes);
        }
    }
    productMain.addEventListener('click', heartAction);

    // Функкция для добавления товара в корзину:
    function addProductToBasket(event) {
        if (event.target.className === 'add-to-basket') {
    
            const objInProducts = product;
            const objInLikes = likes.find(product => product.type === type && product.title === title);
    
            objInProducts.isActiveBasket = 'true';

            if (objInLikes) {
                objInLikes.isActiveBasket = 'true';
            }
    
            event.target.classList.add('add-to-basket-active');
    
            if ( !basket.includes(objInProducts) ) {
            basket.push(objInProducts);
            }
    
        saveToLocalStorage();
        checkCounter(basketCounter, basket);
        }
    }
    productMain.addEventListener('click', addProductToBasket);
}
 

export { showProductsTypePage, showProductPage };