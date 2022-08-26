import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timeInput = document.querySelector('input');
const buttonStart = document.querySelector('button[data-start]');
const timerDiv = document.querySelector('.timer');
const fieldDiv = document.querySelector('.field');

const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

buttonStart.addEventListener('click', onClickStartButtun);
function onClickStartButtun() {
  timer.start();
  buttonStart.disabled = true;
}
// Выбранная дата пользователем
let selectedDate = null;
let timerId = null;
const currentTime = Date.now();

const timer = {
  start() {
    const startTime = selectedDate;
    // происходит сейчас с интервалом в 1с
    timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      showTimeSpan(days, hours, minutes, seconds);
      if (deltaTime < 1000) {
        clearInterval(timerId);
      }
      // console.log(${ days }, ${ hours }, ${ minutes }, ${ seconds });
    }, 1000);
  },
};

// Зробити функцію яка працює з DOM
// Функція має приймати час об'єктом в секундах convertMs
// Поставити все в інтервал
// Нотіфікашку вставити

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    if (selectedDates[0].getTime() < currentTime) {
      console.log(selectedDates[0].getTime);
      return Notify.failure('Please choose a date in the future');
    } else {
      return Notify.success('Right value');
    }
  },
};
flatpickr(timeInput, options);

// Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function showTimeSpan(days, hours, minutes, seconds) {
  spanDays.textContent = days;
  spanHours.textContent = hours;
  spanMinutes.textContent = minutes;
  spanSeconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
