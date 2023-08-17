const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body')

buttonStart.addEventListener('click', onClickButtonStart);
buttonStop.addEventListener('click', onClickButtonStop);

buttonStop.disabled = true
let chageColorBodyTimer = null;

function onClickButtonStart() {
       buttonStop.disabled = false; 
    chageColorBodyTimer = setInterval(() => {
        buttonStart.disabled = true;
        bodyEl.style.backgroundColor = getRandomHexColor();
       
}, 1000);
    };

function onClickButtonStop() {
    buttonStart.disabled = false;
    buttonStop.disabled = true;

    clearInterval(chageColorBodyTimer);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

