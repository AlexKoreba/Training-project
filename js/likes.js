import { products, basket, likes } from "./products.js";
import { saveToLocalStorage, checkCounter, heartCounter, basketCounter, checkEmpty } from "./main.js";

const likesMain = document.querySelector('.likes');

const container = document.createElement('div'); 
container.classList.add('container');
likesMain.append(container);

const likesWrapper = document.createElement('div'); 
likesWrapper.classList.add('likes-wrapper');
container.append(likesWrapper);

const likesTitle = document.createElement('h4');
likesTitle.classList.add('likes-title')
likesTitle.innerText = 'you like this';
likesWrapper.append(likesTitle);


const emptyDiv = document.createElement('div');
emptyDiv.classList.add('empty')
likesWrapper.append(emptyDiv);

const emptyImg = document.createElement('img');
emptyImg.setAttribute('src', './img/icons/leaf.svg');
emptyImg.setAttribute('alt', 'Empty icon');
emptyDiv.append(emptyImg);

const emptyText = document.createElement('p');
emptyText.innerText = 'your favorites list is empty';
emptyDiv.append(emptyText);


const likesContent = document.createElement('div');
likesContent.classList.add('likes-content');
likesWrapper.append(likesContent);

const likesContentHeading = document.createElement('ul');
likesContentHeading.classList.add('likes-content-heading');
likesContent.append(likesContentHeading);

const firstColumn = document.createElement('li');
firstColumn.classList.add('first-column');
firstColumn.innerText = 'btn-remove';
likesContentHeading.append(firstColumn);

const secondColumn = document.createElement('li');
secondColumn.classList.add('second-column');
secondColumn.innerText = 'product image';
likesContentHeading.append(secondColumn);

const thirdColumn = document.createElement('li');
thirdColumn.classList.add('third-column');
thirdColumn.innerText = 'product name';
likesContentHeading.append(thirdColumn);

const fourthColumn = document.createElement('li');
fourthColumn.classList.add('fourth-column');
fourthColumn.innerText = 'price';
likesContentHeading.append(fourthColumn);

const fifthColumn = document.createElement('li');
fifthColumn.classList.add('fifth-column');
fifthColumn.innerText = 'btn-add';
likesContentHeading.append(fifthColumn);

checkEmpty(emptyDiv, likesContentHeading, likes);

// Функкция создания разметки карточки продукта:
function createProductCardHTML(product) {
    const likesList = document.createElement('ul');
    likesList.classList.add('likes-list');
    likesContent.append(likesList);

    const likesListLi = document.createElement('li');
    likesList.append(likesListLi);

    const likesListProduct = document.createElement('ul');
    likesListProduct.classList.add('likes-list-product');
    likesListLi.append(likesListProduct);

    const firstColumnLi = document.createElement('li');
    firstColumnLi.classList.add('first-column');
    likesListProduct.append(firstColumnLi);

    const btnRemoveFromLikes = document.createElement('button');
    btnRemoveFromLikes.classList.add('remove-from-likes');
    firstColumnLi.append(btnRemoveFromLikes);

    const btnRemoveSpanFirst = document.createElement('span');
    btnRemoveSpanFirst.classList.add('close');
    btnRemoveFromLikes.append(btnRemoveSpanFirst);

    const btnRemoveSpanSecond = document.createElement('span');
    btnRemoveSpanSecond.classList.add('close');
    btnRemoveFromLikes.append(btnRemoveSpanSecond);

    const secondColumnLi = document.createElement('li');
    secondColumnLi.classList.add('second-column');
    likesListProduct.append(secondColumnLi);

    const listProductImg = document.createElement('img');
    listProductImg.setAttribute('src', `./img/products/${product.type}/${product.title.split(' ').join('-')}/01.jpg`);
    listProductImg.setAttribute('alt', `${product.type[0].toUpperCase() + product.type.slice(1)} ${product.title[0].toUpperCase() + product.title.slice(1)}`);
    secondColumnLi.append(listProductImg);

    const productCardTypeTitle = 
    product.type.endsWith('ses') ? product.type.slice(0, -2) : 
    !product.type.endsWith('s') ? product.type :
    product.type.slice(0, -1); 

    const thirdColumnLi = document.createElement('li');
    thirdColumnLi.classList.add('third-column');
    thirdColumnLi.innerText = `${productCardTypeTitle} ${product.title}`;
    likesListProduct.append(thirdColumnLi);

    const fourthColumnLi = document.createElement('li');
    fourthColumnLi.classList.add('fourth-column');
    fourthColumnLi.innerText = `${product.price.toFixed(2)}`;
    likesListProduct.append(fourthColumnLi);

    const fifthColumnLi = document.createElement('li');
    fifthColumnLi.classList.add('fifth-column');
    likesListProduct.append(fifthColumnLi);

    const btnAddToBasket = document.createElement('button');
    btnAddToBasket.classList.add('add-to-basket');
    btnAddToBasket.innerText = 'add to basket';
    fifthColumnLi.append(btnAddToBasket);

    if ( product.isActiveBasket === 'true' ) {
        btnAddToBasket.classList.add('add-to-basket-active');
    }
}

// Перебираем массив и создаём разметку для каждого элемента:
likes.forEach( product => createProductCardHTML(product) ); 

// Функкция для добавления товара в корзину:
function addProductToBasket(event) {
    if (event.target.className === 'add-to-basket') {

        const parent = event.target.closest('ul');
        const cardTitleArr = parent.querySelector('.third-column').innerText.toLowerCase().split(' ');
        const cardTitleType = ( cardTitleArr[0].endsWith('s') ) ? cardTitleArr[0] + 'es' :
        ( cardTitleArr[0] === 'new' ) ? cardTitleArr[0] :
        cardTitleArr[0] + 's';
        const cardTitleName = cardTitleArr.slice(1).join(' ');
        const objInProducts = products[cardTitleType].find(product => product.title === cardTitleName);
        const objInLikes = likes.find(product => product.type === cardTitleType && product.title === cardTitleName);

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
likesMain.addEventListener('click', addProductToBasket);

// Функкция удаления товара из массива "нравится":
function deleteProductFromLikes(event) {
    if (event.target.className === 'remove-from-likes') {

        const parent = event.target.closest('ul');
        const cardTitleArr = parent.querySelector('.third-column').innerText.toLowerCase().split(' ');
        const cardTitleType = ( cardTitleArr[0].endsWith('s') ) ? cardTitleArr[0] + 'es' :
        ( cardTitleArr[0] === 'new' ) ? cardTitleArr[0] :
        cardTitleArr[0] + 's';
        const cardTitleName = cardTitleArr.slice(1).join(' ');
        const objInProducts = products[cardTitleType].find(product => product.title === cardTitleName);
        const objInLikes = likes.find(product => product.type === cardTitleType && product.title === cardTitleName);
        const objInBasket = basket.find(product => product.type === cardTitleType && product.title === cardTitleName);

        objInProducts.isActiveHeart = 'false';

        if (objInBasket) {
            objInBasket.isActiveHeart = 'false';
        }

        const indexInArr = likes.indexOf(objInLikes, 0);
        likes.splice(indexInArr, 1);

        parent.remove();
    } 
        saveToLocalStorage();
        checkCounter(heartCounter, likes);
        checkCounter(basketCounter, basket);
        checkEmpty(emptyDiv, likesContentHeading, likes);
}
likesMain.addEventListener('click', deleteProductFromLikes);