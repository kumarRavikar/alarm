document.addEventListener("DOMContentLoaded", () => {
    const currentTimeElement = document.getElementById('current-time');
    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const alarmStatusElement = document.getElementById('alarm-status');

    let alarmTime = null;
    let alarmTimeout = null;

    function updateCurrentTime() {
        const now = new Date();
        currentTimeElement.textContent = now.toLocaleTimeString();
    }

    function checkAlarm() {
        const now = new Date();
        if (alarmTime && now >= alarmTime) {
            alert("Alarm Ringing!");
            clearAlarm();
        }
    }

    function setAlarm() {
        const alarmValue = alarmTimeInput.value;
        if (!alarmValue) {
            alert("Please set a valid time for the alarm.");
            return;
        }

        const [hours, minutes] = alarmValue.split(':');
        alarmTime = new Date();
        alarmTime.setHours(hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);

        const now = new Date();
        if (alarmTime <= now) {
            alert("The set time has already passed. Please choose a future time.");
            alarmTime = null;
            return;
        }

        alarmStatusElement.textContent = `Alarm set for ${alarmTime.toLocaleTimeString()}`;

        if (alarmTimeout) {
            clearTimeout(alarmTimeout);
        }

        alarmTimeout = setTimeout(() => {
            alert("Alarm Ringing!");
            clearAlarm();
        }, alarmTime - now);
    }

    function clearAlarm() {
        alarmTime = null;
        alarmStatusElement.textContent = "";
        if (alarmTimeout) {
            clearTimeout(alarmTimeout);
        }
    }

    setAlarmButton.addEventListener('click', setAlarm);
    setInterval(updateCurrentTime, 1000);
    setInterval(checkAlarm, 1000);
});
