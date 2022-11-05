import { products, basket, likes } from "./products.js";

/* Drop-down menu */
const navMenu = document.querySelector('.nav-menu');
const navBtn = document.querySelector('.nav-btn');

navBtn.onclick = () => navMenu.classList.toggle('open');


/* LocalStorage */
// Функция добавления объектов в хранилище браузера LocalStorage:
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('basket', JSON.stringify(basket));
    localStorage.setItem('likes', JSON.stringify(likes));
};


/* Counters */
// Функция проверки значения и отображения счётчика:
function checkCounter(elem, arr) {
    elem.innerText = arr.length;
    ( arr.length === 0 ) ? elem.classList.add('hidden') : elem.classList.remove('hidden');
}

const heartCounter = document.querySelector('.heart-counter');
checkCounter(heartCounter, likes);

const basketCounter = document.querySelector('.basket-counter');
checkCounter(basketCounter, basket);


/* Empty list */
// Функция проверки наличия элементов в массиве и отображения блока "Empty":
function checkEmpty(elem, elemNext, arr) {
    ( arr.length === 0 ) ? elem.classList.remove('none') : elem.classList.add('none');
    ( arr.length === 0 ) ? elemNext.classList.add('hidden') : elemNext.classList.remove('hidden');
}


export { saveToLocalStorage, checkCounter, heartCounter, basketCounter, checkEmpty };