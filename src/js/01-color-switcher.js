const buttonStart = document.querySelector('button[data-start]');
console.log(buttonStart);
const buttonStop = document.querySelector('button[data-stop]');
const bodyNew = document.body;

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener('click', onStartClick);
function onStartClick() {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  timerId = setInterval(() => {
    bodyNew.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

buttonStop.addEventListener('click', onStopClick);
function onStopClick() {
  buttonStop.disabled = true;
  buttonStart.disabled = false;

  clearInterval(timerId);
}
