// AOS
AOS.init({
    disable: 'mobile',
    once: true
});


// Slider
const slider = document.querySelector('#slider');
const sliderItems = Array.from( slider.children );
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');

sliderItems.forEach( function(slide, index) {

    // Скрываем все слайды кроме первого:
    if ( index !==0 ) {
        slide.classList.add('none');
    }

    // Добавляем индексы для слайдов:
    slide.dataset.index = index;

    // Добавляем data атрибут active для активного слайда:
    sliderItems[0].setAttribute('data-active', '');
})

function showNextSlide (direction) {

    // Скрываем текущий слайд:
    const currentSlide = slider.querySelector('[data-active]');
    const currentSlideIndex = +currentSlide.dataset.index;
    currentSlide.classList.add('none');
    currentSlide.removeAttribute('data-active');

    // Рассчитываем индекс следующего слайда в эависимости от направления движения:
    let nextSlideIndex;
    if ( direction === 'next' ) {
        nextSlideIndex = (currentSlideIndex + 1 === sliderItems.length) ? 0 : currentSlideIndex + 1;
    } else if ( direction === 'previous' ) {
        nextSlideIndex = (currentSlideIndex === 0) ? sliderItems.length - 1 : currentSlideIndex - 1;
    }

    // Отображаем следующий слайд:
    const nextSlide = slider.querySelector( `[data-index = "${nextSlideIndex}"]` );
    nextSlide.classList.remove('none');
    nextSlide.setAttribute('data-active', '');
}

btnNext.onclick = function() {
    showNextSlide('next'); 
}

btnPrev.onclick = function() {
    showNextSlide('previous');
}