const selectMenu = document.querySelectorAll('select');
const timeBox = document.querySelector('.time');
const setAlarmBtn = document.querySelector('button');
const content = document.querySelector('.content');

let alarmTime;
let alarmState = 'noset';

const ringtone = new Audio("./files/ringtone.mp3");

// Hours
for (let i = 23; i >= 0; i--) {
    let val = i < 10 ? '0' + i : i;

    let option = document.createElement('option');
    option.value = val;
    option.innerText = val;

    selectMenu[0].appendChild(option);
}

// Minutes
for (let i = 59; i >= 0; i--) {
    let val = i < 10 ? '0' + i : i;

    let option = document.createElement('option');
    option.value = val;
    option.innerText = val;

    selectMenu[1].appendChild(option);
}

// Live Clock
setInterval(() => {
    let date = new Date();

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    timeBox.innerHTML = `${h}:${m}:${s}`;

    if (alarmTime === `${h}:${m}` && alarmState === 'set') {
        if (ringtone.paused) {
            ringtone.loop = true;
            ringtone.play();
        }
    }

}, 1000);

// Set / Clear Alarm
setAlarmBtn.addEventListener('click', () => {

    if (alarmState === 'noset') {

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;

        if (alarmTime.includes('Hour') || alarmTime.includes('Minute')) {
            return alert('زمان هشدار را به درستی مشخص کنید');
        }

        checkState('set');

    } else {

        checkState('noset');

    }

});

// Check Alarm State
function checkState(state) {

    if (state === 'set') {

        content.classList.add('disable');

        selectMenu[0].disabled = true;
        selectMenu[1].disabled = true;

        setAlarmBtn.innerText = 'Clear Alarm';

        alarmState = 'set';

    } else {

        content.classList.remove('disable');

        selectMenu[0].disabled = false;
        selectMenu[1].disabled = false;

        alarmTime = '';

        ringtone.pause();
        ringtone.currentTime = 0;

        setAlarmBtn.innerText = 'Set Alarm';

        alarmState = 'noset';

    }

}
