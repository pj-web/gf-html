"use strict"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
                isMobile.Android()
                || isMobile.BlackBerry()
                || isMobile.iOS()
                || isMobile.Opera()
                || isMobile.Windows()
                );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc');
}

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


function handleCheckedSymptoms() {
    let checked = document.getElementsByClassName('checked');
    const symptoms = document.querySelectorAll('.symptoms__item');
    const button = document.querySelector('.symptoms__button');
    const close = document.querySelectorAll('.result-text>.close');
    const overlay = document.querySelector('.result-text__wrap');
    const overlayAll = document.querySelector('.result-overlay');
    const resultText = document.querySelector('.result-text');
    const resultTextContainer = document.querySelector('.result-text__container');
    const results = [
        'Вероятность того, что вы сейчас заражены, невысока. Вы можете укрепить иммунитет и проходить плановую дегельминтизацию раз в год.',
        'Комбинация Ваших симптомов говорит о высокой вероятности заражения одним из таких видов паразитов: токсоплазмы, аскариды, острицы, цепень или некоторые другие виды. Заражение могло произойти через опасные в плане заражения предметы (мобильный телефон, деньги, обувь), через воду из водопровода, еду без надлежащей термообработки (суши, малосольная рыба, сало, копчености, салаты из сырых овощей), через домашних животных или почву. Вам следует начать дегельминтизацию в кратчайшие сроки и повторять ее не реже, чем раз в год.',
        'При комбинации Ваших симптомов можно с уверенностью утверждать, что вы заражены паразитами. Скорее всего, с Вами живут одновременно несколько видов гельминтов: токсоплазмы, цепни, лямблии, аскариды, анкилостомы, власоглавы, острицы или другие. Заражение могло произойти через опасные в плане заражения предметы (мобильный телефон, деньги, обувь), через воду из водопровода, еду без надлежащей термообработки (суши, малосольная рыба, сало, копчености, салаты из сырых овощей), через домашних животных или почву. Вам необходимо начать дегельминтизацию уже сейчас, пока проблемы со здоровьем не стали необратимыми. Затем повторяйте дегельминтизацию ежегодно.'
    ];

    function toggleChecked() {
        for (let i = 0; i < symptoms.length; i++) {
            symptoms[i].addEventListener('click', function (e) {
                let target = e.target;
                while (target != this) {
                    if (target.classList.contains('symptoms__item') == true) {
                        return
                    }
                    target = target.parentNode;
                }
                if (target.classList.contains('checked')) {
                    target.classList.remove('checked');
                } else {
                    target.classList.add('checked');
                }
                checked = document.getElementsByClassName('checked');
            });
        }
    }

    toggleChecked();

    button.addEventListener('click', function () {
        let inneredText = '';
        switch (true) {
            case checked.length <= 1:
                inneredText = results[0];
                break;
            case checked.length > 1 && checked.length <= 4:
                inneredText = results[1];
                break;
            case checked.length > 4:
                inneredText = results[2];
                break;
        }
        overlay.style.display = 'flex';
        overlayAll.style.display = 'block';
        resultTextContainer.innerText = inneredText;
    });

    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function () {
            overlay.style.display = 'none';
            overlayAll.style.display = 'none';
            resultTextContainer.innerText = '';
        });
    }

    overlay.addEventListener('click', function () {
        overlay.style.display = 'none';
        overlayAll.style.display = 'none';
        resultTextContainer.innerText = '';
    });
    overlayAll.addEventListener('click', function () {
        overlay.style.display = 'none';
        overlayAll.style.display = 'none';
        resultTextContainer.innerText = '';
    });
    resultText.addEventListener('click', function (e) {
        e.stopPropagation();
    })

}

handleCheckedSymptoms();

// let date = new Date('May 11 2021 17:20:00');

// function counts() {
//     let now = new Date();
//     gap = date - now;

//     let days = Math.floor(gap / 1000 / 60 / 60 / 24);
//     let hours = Math.floor(gap / 1000 / 60 / 60 ) % 24;
//     let minutes = Math.floor(gap / 1000 / 60 ) % 60;
//     let seconds = Math.floor(gap / 1000 ) % 60;

//     if (gap < 0) {
//         days = days + 1;
//         hours = hours + 24;
//         minutes = minutes + 60;
//         seconds = seconds + 60;
//     }
//     document.getElementById('days').innerText = days;
//     document.getElementById('hours').innerText = hours;
//     document.getElementById('minutes').innerText = minutes;
//     document.getElementById('seconds').innerText = seconds;
// }
// counts();

// setInterval(counts, 1000);

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
        }
    });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

    if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('_lock');
    
    unlock = false;
    setTimeout(function () {
        unlock = true;
        }, timeout);
    }

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
    }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});





//<![CDATA[
    var remain_bv   = 80768;
    function parseTime_bv(timestamp){
        if (timestamp < 0) timestamp = 0;
     
        var day = Math.floor( (timestamp/60/60) / 24);
        var hour = Math.floor(timestamp/60/60);
        var mins = Math.floor((timestamp - hour*60*60)/60);
        var secs = Math.floor(timestamp - hour*60*60 - mins*60); 
        var left_hour = Math.floor( (timestamp - day*24*60*60) / 60 / 60 );
     
        $('span.countdown__item-day').text(day);
        $('span.countdown__item-hour').text(left_hour);
     
        if(String(mins).length > 1)
            $('span.countdown__item-minute').text(mins);
        else
            $('span.countdown__item-minute').text("0" + mins);
        if(String(secs).length > 1)
            $('span.countdown__item-second').text(secs);
        else
            $('span.countdown__item-second').text("0" + secs);
         
    }
     
    jQuery(function() {
        setInterval(function(){
            remain_bv = remain_bv - 1;
            parseTime_bv(remain_bv);
            if(remain_bv <= 0){
                alert('Hello');
            }
        }, 1000);
    });
    //]]>

    $('.pharmacies__item-title').on('click', function () {
        $(this).toggleClass('in').next().slideToggle();
        $('.pharmacies__item-title').not(this).removeClass('in').next().slideUp();
    });

    let animItems = document.querySelectorAll('.anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('active');                    
                } else {
                    if (!animItem.classList.contains('anim-hide')) {
                        animItem.classList.remove('active');
                    } else {
                        if (isMobile.any()) {
                            animItem.classList.remove('anim-items');
                        }
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }

    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.747368, 37.707107],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 15,
            behaviors: ['drag']
        });
    }

    


