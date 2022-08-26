import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formDelay = document.querySelector('form');

formDelay.addEventListener('submit', onClictButtun);

function onClictButtun(e) {
  e.preventDefault();
  const {
    elements: {
      delay: { value: delay },
      step: { value: step },
      amount: { value: amount },
    },
  } = e.target;
  console.log({ delay, step, amount });

  for (let i = 0; i < amount; i++) {
    createPromise(i, delay).then(onResolve).catch(onReject);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const onResolve = ({ delay, position }) => {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};
const onReject = ({ delay, position }) => {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

// 1. Вызывается создание промисов с первой задержкой
// 2. Вызываются промисы шаг * на текущий шаг по номеру
//  + не забыть добавить значение первоночальной задержки
//  Сделать механизм который будет вызывать функцию createPromise сколько будет нажиматься amount,
