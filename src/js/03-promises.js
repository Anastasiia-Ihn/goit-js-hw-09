const formEl = document.querySelector('.form');
const delayEl= document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl= document.querySelector('[name="amount"]');

formEl.addEventListener('submit', handlercreatePromises)

function handlercreatePromises(evt) {
  evt.preventDefault();
  let delay = Number(delayEl.value);
  let step =Number(stepEl.value);
  let amount = Number(amountEl.value);
  for (let i = 1; i <= amount; i += 1) {
        createPromise(i, delay);
delay += step;
    
  }

}

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay })
      } else {
        rej({ position, delay })
      }
    }, delay);
    
  });
  promise
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}





