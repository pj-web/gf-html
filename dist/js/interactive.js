"use strict"

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

let diagnosticText = document.querySelector('.symptoms-result__tip');

function adaptive() {
    let tablet = ($(window).width());
    if (tablet <= 1171) {
        diagnosticText.innerHTML = 'Отметьте выше симптомы которые вас беспокоят, затем нажмите кнопку “результат”';
    } else {
        diagnosticText.innerHTML = 'Отметьте слева симптомы которые вас беспокоят, затем нажмите кнопку “результат”';
    }
};
adaptive();


let drawLine = function () {
    let allCanvas = document.querySelectorAll('.canvas');
    for (let i = 0; i < allCanvas.length; i++) {
        const canvas = allCanvas[i];
        const ctx = canvas.getContext('2d');
        let wid = canvas.parentNode.offsetWidth;
        let hgh = canvas.parentNode.offsetHeight;
        canvas.width = wid;
        canvas.height = hgh;
        ctx.strokeStyle = '#f4090a';
        ctx.lineWidth = '1';
        ctx.clearRect(0, 0, wid, hgh);
        ctx.beginPath();
        ctx.moveTo(0 + 3, 0 + 5);
        ctx.lineTo(wid - 1, hgh - 5);
        ctx.moveTo(0 + 3, hgh - 5);
        ctx.lineTo(wid - 1, 0 + 5);
        ctx.stroke();
    }
};

function drawWithTimeout(time) {
    setTimeout(drawLine, time)
}

let drawTriangle = function () { // For triangles with shadow painting
    let allCanvas = document.querySelectorAll('.triangle')
    if (!allCanvas) {
        return
    } else {
        for (let i = 0; i < allCanvas.length; i++) {
            const canvas = allCanvas[i];
            const context = canvas.getContext('2d');
            let wid = 20;
            let hgh = 38;
            canvas.width = wid;
            canvas.height = hgh;
            context.clearRect(0, 0, wid, hgh);
            context.beginPath();
            context.moveTo(6, 19);
            context.lineTo(20, 4);
            context.lineTo(20, 34);
            context.closePath();
            context.shadowColor = "rgba(0,0,0,.08)";
            context.shadowBlur = 10;
            context.shadowOffsetX = -1;
            context.shadowOffsetY = 0;
            context.fillStyle = "#fff";
            context.fill();
        }
    }
};

drawTriangle();


const parasiteItem = document.querySelectorAll('.interactive__list__item');
const organs = document.querySelectorAll('.interactive-center__wrap>div');

for (let i = 0; i < parasiteItem.length; i++) {
    parasiteItem[i].addEventListener('mouseenter', function (e) {
        let target = e.target;
        let dataNumber = target.getAttribute('data-number');
        while (target != this) {
            if (target.classList.contains('interactive__list__item') == true) {
                return
            }
            target = target.parentNode;
        }
        for (let i = 0; i < parasiteItem.length; i++) {
            parasiteItem[i].classList.remove('__active');
        }
        target.classList.add('__active');
        for (let i = 0; i < organs.length; i++) {
            if (organs[i].classList.contains('__active') == false) {
                organs[i].classList.add('__active');
                organs[i].style.zIndex = '';
            }
        }

        switch (+dataNumber) {
            case 1:
                organs[0].classList.remove('__active');
                organs[0].style.zIndex = 9;
                organs[0].children[0].style.filter = '';
                break;
            case 2:
                organs[1].classList.remove('__active');
                organs[1].style.zIndex = 9;
                break;
            case 3:
                organs[2].classList.remove('__active');
                organs[2].style.zIndex = 9;
                break;
            case 4:
                organs[2].classList.remove('__active');
                organs[2].style.zIndex = 9;
                organs[3].classList.remove('__active');
                organs[3].style.zIndex = 8;
                organs[4].classList.remove('__active');
                organs[4].style.zIndex = 7;
                organs[6].classList.remove('__active');
                organs[6].style.zIndex = 9;
                break;
            case 5:
                organs[1].classList.remove('__active');
                organs[1].style.zIndex = 10;
                organs[2].classList.remove('__active');
                organs[2].style.zIndex = 9;
                organs[3].classList.remove('__active');
                organs[3].style.zIndex = 8;
                organs[4].classList.remove('__active');
                organs[4].style.zIndex = 7;
                organs[6].classList.remove('__active');
                organs[6].style.zIndex = 9;
                break;
        }
    });

}
