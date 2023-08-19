import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker')
const btnDataStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const dateNow = new Date();
const timeNow = dateNow.getTime()// дата зараз в мілісек чи використати Date.now???

let timeCurrent = null;
btnDataStart.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: dateNow,
  minuteIncrement: 1,
    
  onOpen() {
    btnDataStart.disabled = false; // для того щоб при відкритті календаря кнопка Start ставала активною
  },
  
  onClose(selectedDates) {
    timeCurrent = selectedDates[0].getTime();    // дата обрана користувачев в мілісек
    const time = timeCurrent - timeNow;    // період в мілісек (різниця між поточним та обраним періодом)

    btnDataStart.addEventListener('click', onClickStart)
    
    function onClickStart(){
      
      setInterval(() => {
        if (time < 0) {
          window.alert("Please choose a date in the future")
        } else if (time > 0) {
          convertMs(time)
          //  форматування мілісек в дн:год:хв:сек
          console.log(convertMs(time).days);
          
           dataDays.textContent = addLeadingZero(convertMs(time).days);
          dataHours.textContent = addLeadingZero(convertMs(time).hours);
          dataMinutes.textContent = addLeadingZero(convertMs(time).minutes);
          dataSeconds.textContent =addLeadingZero(convertMs(time).seconds);
        } else {
          dataDays.textContent = '00';
          dataHours.textContent = '00';
          dataMinutes.textContent = '00';
          dataSeconds.textContent = '00';
        }

      }, 1000);
    };
  } ,
} )  


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
 return value.padStart(2, '0')
}