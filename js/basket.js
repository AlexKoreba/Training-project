import { products, basket, likes } from "./products.js";
import { saveToLocalStorage, checkCounter, heartCounter, basketCounter, checkEmpty } from "./main.js";

const basketMain = document.querySelector('main.basket');

const container = document.createElement('div'); 
container.classList.add('container');
basketMain.append(container);

const basketWrapper = document.createElement('div'); 
basketWrapper.classList.add('basket-wrapper');
container.append(basketWrapper);

const basketTitle = document.createElement('h4');
basketTitle.classList.add('basket-title');
basketTitle.innerText = 'basket';
basketWrapper.append(basketTitle);


const emptyDiv = document.createElement('div');
emptyDiv.classList.add('empty')
basketWrapper.append(emptyDiv);

const emptyImg = document.createElement('img');
emptyImg.setAttribute('src', './img/icons/leaf.svg');
emptyImg.setAttribute('alt', 'Empty icon');
emptyDiv.append(emptyImg);

const emptyText = document.createElement('p');
emptyText.innerText = 'your basket is empty';
emptyDiv.append(emptyText);

const basketContent = document.createElement('div');
basketContent.classList.add('basket-content');
basketWrapper.append(basketContent);

const basketContentHeading = document.createElement('ul');
basketContentHeading.classList.add('basket-content-heading');
basketContent.append(basketContentHeading);

const firstColumn = document.createElement('li');
firstColumn.classList.add('first-column');
firstColumn.innerText = 'product image';
basketContentHeading.append(firstColumn);

const secondColumn = document.createElement('li');
secondColumn.classList.add('second-column');
secondColumn.innerText = 'product';
basketContentHeading.append(secondColumn);

const thirdColumn = document.createElement('li');
thirdColumn.classList.add('third-column');
thirdColumn.innerText = 'price';
basketContentHeading.append(thirdColumn);

const fourthColumn = document.createElement('li');
fourthColumn.classList.add('fourth-column');
fourthColumn.innerText = 'quantity';
basketContentHeading.append(fourthColumn);

const fifthColumn = document.createElement('li');
fifthColumn.classList.add('fifth-column');
fifthColumn.innerText = 'subtotal';
basketContentHeading.append(fifthColumn);

const sixthColumn = document.createElement('li');
sixthColumn.classList.add('sixth-column');
sixthColumn.innerText = 'btn-remove';
basketContentHeading.append(sixthColumn);

checkEmpty(emptyDiv, basketContentHeading, basket);


// Функкция создания разметки модального окна:
function createModalWindowHTML(type) {

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');
    document.body.append(modalWrapper);


    const modal = document.createElement('div');
    modal.classList.add('modal');
    modalWrapper.append(modal);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modal.append(modalBody);

    let imgSrc;
    let imgAlt;

    let firstModalText;
    let secondModalText;

    if ( type === 'success') {

        imgSrc = './img/icons/nav/success.png';
        imgAlt = 'Success icon';

        firstModalText = `Your order for the amount of <strong>${calcBasketResult().toFixed(2)} BYN</strong> has been successfully placed!`;
        secondModalText = 'Thanks for choosing our company :)';
    }

    if ( type === 'fail') {

        imgSrc = './img/icons/nav/fail.png';
        imgAlt = 'Fail icon';

        firstModalText = 'Your order not placed :(';
        secondModalText = 'Incorrect quantity of products!';
    }

    const modalBodyImg = document.createElement('img');
    modalBodyImg.setAttribute('src', imgSrc);
    modalBodyImg.setAttribute('alt', imgAlt);
    modalBody.append(modalBodyImg);

    const modalBodyFirstText = document.createElement('p');
    modalBodyFirstText.innerHTML = firstModalText;
    modalBody.append(modalBodyFirstText);

    const modalBodySecondText = document.createElement('p');
    modalBodySecondText.innerText = secondModalText;
    modalBody.append(modalBodySecondText);

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    modal.append(modalFooter);

    const btnModal = document.createElement('button');
    btnModal.classList.add('btn-modal');
            btnModal.innerText = 'confirm';
    modalFooter.append(btnModal);
}

// Функция подсчёта суммы товара в зависимости от количества:
function calcProductResult(price, quantity) {
    return price * quantity;
}

// Функкция создания разметки карточки продукта:
function createProductCardHTML(product) {
    const basketList = document.createElement('ul');
    basketList.classList.add('basket-list');
    basketContent.append(basketList);

    const basketListLi = document.createElement('li');
    basketList.append(basketListLi);

    const basketListProduct = document.createElement('ul');
    basketListProduct.classList.add('basket-list-product');
    basketListLi.append(basketListProduct);

    const firstColumnLi = document.createElement('li');
    firstColumnLi.classList.add('first-column');
    basketListProduct.append(firstColumnLi);

    const basketProductImg = document.createElement('img');
    basketProductImg.setAttribute('src', `./img/products/${product.type}/${product.title.split(' ').join('-')}/01.jpg`);
    basketProductImg.setAttribute('alt', `${product.type[0].toUpperCase() + product.type.slice(1)} ${product.title[0].toUpperCase() + product.title.slice(1)}`);
    firstColumnLi.append(basketProductImg);

    const secondColumnLi = document.createElement('li');
    secondColumnLi.classList.add('second-column');
    basketListProduct.append(secondColumnLi);

    const productCardTypeTitle = 
    product.type.endsWith('ses') ? product.type.slice(0, -2) : 
    !product.type.endsWith('s') ? product.type :
    product.type.slice(0, -1); 

    const productName = document.createElement('span');
    productName.innerText = `${productCardTypeTitle} ${product.title}`;
    productName.style.color = '#EB6254';
    productName.style.fontWeight = 600;
    secondColumnLi.append(productName);

    const productColor = document.createElement('span');
    productColor.innerText = `color: ${product.color[0].colorName}`;
    secondColumnLi.append(productColor);

    const thirdColumnLi = document.createElement('li');
    thirdColumnLi.classList.add('third-column');
    thirdColumnLi.innerText = `${product.price.toFixed(2)}`;
    basketListProduct.append(thirdColumnLi);

    const fourthColumnLi = document.createElement('li');
    fourthColumnLi.classList.add('fourth-column');
    basketListProduct.append(fourthColumnLi);

    const productQuantity = document.createElement('input');
    productQuantity.classList.add('input-quantity');
    productQuantity.setAttribute('type', 'text');
    productQuantity.setAttribute('maxlength', '2');
    productQuantity.value = 1;
    fourthColumnLi.append(productQuantity);

    const fifthColumnLi = document.createElement('li');
    fifthColumnLi.classList.add('fifth-column');
    fifthColumnLi.innerText = `${ ( calcProductResult(product.price, productQuantity.value).toFixed(2) )}`;
    basketListProduct.append(fifthColumnLi);

    const sixthColumnLi = document.createElement('li');
    sixthColumnLi.classList.add('sixth-column');
    basketListProduct.append(sixthColumnLi);

    const btnRemoveFromBasket = document.createElement('button');
    btnRemoveFromBasket.classList.add('remove-from-basket');
    sixthColumnLi.append(btnRemoveFromBasket);
        
    const btnRemoveSpanFirst = document.createElement('span');
    btnRemoveSpanFirst.classList.add('close');
    btnRemoveFromBasket.append(btnRemoveSpanFirst);

    const btnRemoveSpanSecond = document.createElement('span');
    btnRemoveSpanSecond.classList.add('close');
    btnRemoveFromBasket.append(btnRemoveSpanSecond);
}

// Перебираем массив и создаём разметку для каждого элемента:
basket.forEach( product => createProductCardHTML(product) ); 

// Функция проверки наличия нулевых сумм за товар:
function createZeroForProduct() {
    const arrSubtotalHTML = Array.from( basketContent.querySelectorAll('.basket-list-product .fifth-column') );
    const arrSubtotal = arrSubtotalHTML.map( elem => +elem.innerText );
    return arrSubtotal.includes(0);
}

// Функция подсчёта итоговой суммы:
function calcBasketResult() {
    const arrSubtotalHTML = Array.from( basketContent.querySelectorAll('.basket-list-product .fifth-column') );
    const arrSubtotal = arrSubtotalHTML.map( elem => +elem.innerText );
    const sumSubtotal = arrSubtotal.reduce( (sum, elem) => sum + elem, 0);
    return sumSubtotal;
}

// Функция создания разметки для итоговой суммы:
function basketTotalHTML(col) {
    if (basket.length !== 0) {
        const basketTotals = document.createElement('div');
        basketTotals.classList.add('basket-totals');
        basketWrapper.append(basketTotals);

        const basketTotalsTitle = document.createElement('h5');
        basketTotalsTitle.classList.add('basket-totals-title');
        basketTotalsTitle.innerText = 'cart totals';
        basketTotals.append(basketTotalsTitle);

        col();

        const basketSubtotal = document.createElement('div');
        basketSubtotal.classList.add('basket-subtotal');
        basketTotals.append(basketSubtotal);

        const basketSubtotalText = document.createElement('span');
        basketSubtotalText.innerText = 'subtotal';
        basketSubtotal.append(basketSubtotalText);

        const basketSubtotalValue = document.createElement('span');
        basketSubtotalValue.classList.add('basket-subtotal-value');
        basketSubtotalValue.innerText = `${col().toFixed(2)}`;
        basketSubtotal.append(basketSubtotalValue);

        const basketTotal = document.createElement('div');
        basketTotal.classList.add('basket-total');
        basketTotals.append(basketTotal);

        const basketTotalText = document.createElement('span');
        basketTotalText.innerText = 'total';
        basketTotal.append(basketTotalText);

        const basketTotalValue = document.createElement('span');
        basketTotalValue.classList.add('basket-total-value');
        basketTotalValue.innerText = `${basketSubtotalValue.innerText}`;
        basketTotal.append(basketTotalValue);

        const btnOrder = document.createElement('button');
        btnOrder.classList.add('btn-order');
        btnOrder.innerText = 'place an order';
        basketTotals.append(btnOrder);
    }
}
basketTotalHTML(calcBasketResult);

// Функция изменения итоговой суммы:
function changeBasketResult(col) {
    const subtotal = document.querySelector('.basket-subtotal-value');
    subtotal.innerText = `${col().toFixed(2)}`;
    const total = document.querySelector('.basket-total-value');
    total.innerText = `${col().toFixed(2)}`;

    if ( basket.length === 0 ) {
        const totals = document.querySelector('.basket-totals');
        totals.classList.add('none');
    }
}

// Функкция удаления товара из корзины:
function deleteProductFromBasket(event) {
    if (event.target.className === 'remove-from-basket') {

        const parent = event.target.closest('ul');
        const cardTitleArr = parent.querySelector('.second-column span:nth-child(1)').innerText.toLowerCase().split(' ');
        const cardTitleType = ( cardTitleArr[0].endsWith('s') ) ? cardTitleArr[0] + 'es' :
        ( cardTitleArr[0] === 'new' ) ? cardTitleArr[0] :
        cardTitleArr[0] + 's';
        const cardTitleName = cardTitleArr.slice(1).join(' ');
        const objInProducts = products[cardTitleType].find(product => product.title === cardTitleName);
        const objInLikes = likes.find(product => product.type === cardTitleType && product.title === cardTitleName);
        const objInBasket = basket.find(product => product.type === cardTitleType && product.title === cardTitleName);

        objInProducts.isActiveBasket = 'false';

        if (objInLikes) {
            objInLikes.isActiveBasket = 'false';
        }

        const indexInArr = basket.indexOf(objInBasket, 0);
        basket.splice(indexInArr, 1);

        parent.remove();
    } 
        saveToLocalStorage();
        checkCounter(heartCounter, likes);
        checkCounter(basketCounter, basket);
        checkEmpty(emptyDiv, basketContentHeading, basket);

        changeBasketResult(calcBasketResult);        
}
basketMain.addEventListener('click', deleteProductFromBasket);

// Функция изменения количества товара и перерасчёта итоговых сумм (по товару и итого):
function changeProductQuantity(event) {
    if (event.target.className === 'input-quantity') {

        const parent = event.target.closest('ul');
        const productPrice = +parent.querySelector('.third-column').innerText;
        let productSubtotalHTML = parent.querySelector('.fifth-column');

        event.target.value = ( event.target.value.startsWith('-') || isNaN( +event.target.value ) ) ? 1 : +event.target.value;

        productSubtotalHTML.innerText = (calcProductResult(productPrice, event.target.value)).toFixed(2);

        changeBasketResult(calcBasketResult); 
    }
}
basketMain.addEventListener('input', changeProductQuantity);

// Функкция оформления заказа и удаления всех товаров из корзины:
function orderAcceptance(event) {
    if (event.target.className === 'btn-order') {

        const parent = event.target.closest('.basket-wrapper');
        const basketProductsArr = Array.from( parent.querySelectorAll('.basket-list-product') );

        const arrWithTypeAndTitle = basketProductsArr.map( elem => {
            const cardTitleArr = elem.querySelector('.second-column span:nth-child(1)').innerText.toLowerCase().split(' ');
            const cardTitleType = ( cardTitleArr[0].endsWith('s') ) ? cardTitleArr[0] + 'es' :
            ( cardTitleArr[0] === 'new' ) ? cardTitleArr[0] :
            cardTitleArr[0] + 's';
            const cardTitleName = cardTitleArr.slice(1).join(' ');
            return [cardTitleType, cardTitleName];
        });

        const arrWithObjInProducts = [];
        arrWithTypeAndTitle.forEach( elem => arrWithObjInProducts.push( products[elem[0]].find(product => product.title === elem[1]) ));

        const arrWithObjInBasket = [];
        arrWithTypeAndTitle.forEach( elem => arrWithObjInBasket.push( basket.find(product => product.type === elem[0] && product.title === elem[1]) ));

        const arrWithObjInLikes = [];
        arrWithTypeAndTitle.forEach( elem => arrWithObjInLikes.push( likes.find(product => product.type === elem[0] && product.title === elem[1]) ));


        if ( !createZeroForProduct() ) {

            arrWithObjInProducts.forEach( product => product.isActiveBasket = 'false');

            arrWithObjInLikes.forEach( product => {
                if ( product !== undefined ) {
                            product.isActiveBasket = 'false'
                }
            });

            arrWithObjInBasket.forEach( product => product.isActiveBasket = 'false');

            // Создание модального окна с положительным контентом:
            createModalWindowHTML('success');

            // Закрытие модального окна + очистка корзины + сохранение информации в LocalStorage:
            document.addEventListener('click', function(event) {

                if (event.target.className === 'btn-modal') {

                    event.target.closest('.modal-wrapper').remove();

                    parent.querySelector('.basket-content').remove();
                    basket.length = 0;

                    saveToLocalStorage();
                    checkCounter(heartCounter, likes);
                    checkCounter(basketCounter, basket);
                    checkEmpty(emptyDiv, basketContentHeading, basket);

                    changeBasketResult(calcBasketResult);
                }
            });
 
        } else {

            // Создание модального окна с негативным контентом:
            createModalWindowHTML('fail');

            // Закрытие модального окна:
            document.addEventListener('click', function(event) {

                if (event.target.className === 'btn-modal') {
                    event.target.closest('.modal-wrapper').remove();
                }
            });
        } 
    }
}
basketMain.addEventListener('click', orderAcceptance);