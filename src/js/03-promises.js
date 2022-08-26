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

  let tempDelay = +delay;
  for (let i = 0; i < amount; i++) {
    console.log(i, tempDelay);
    createPromise(i, tempDelay).then(onResolve).catch(onReject);
    tempDelay += +step;
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
    clearTimeout();
  });
}
const onResolve = ({ delay, position }) => {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};
const onReject = ({ delay, position }) => {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
