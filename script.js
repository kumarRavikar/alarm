document.addEventListener("DOMContentLoaded", () => {                         /* this event use to initilize the script,for the set alarm button to set 
    const currentTimeElement = document.getElementById('current-time');         an alarm updating and checking the time*/
    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const alarmStatusElement = document.getElementById('alarm-status');
    const alarmListElement = document.getElementById('alarm-list');

    let alarms = [];

    function updateCurrentTime() {   /* this function updates the current time display every seconds*/
        const now = new Date();
        currentTimeElement.textContent = now.toLocaleTimeString();
    }

    function checkAlarm() {     /* checking current time matchs any set alarm or alert user and clear the alarm*/
        const now = new Date();
        alarms.forEach(alarm => {
            if (now >= alarm.time) {
                alert("Alarm Ringing!");
                clearAlarm(alarm.id);
            }
        });
    }

    function setAlarm() {      
        const alarmValue = alarmTimeInput.value;
        if (!alarmValue) {
            alert("Please set a valid time for the alarm.");
            return;
        }

        const [hours, minutes] = alarmValue.split(':');
        const alarmTime = new Date();
        alarmTime.setHours(hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);

        const now = new Date();
        if (alarmTime <= now) {
            alert("The set time has already passed. Please choose a future time.");
            return;
        }

        const alarmId = Date.now();
        alarms.push({ id: alarmId, time: alarmTime });
        updateAlarmList();
    }

    function clearAlarm(id) {      /* this function removes an alarm from the list either when it rings or delete button clicked*/
        alarms = alarms.filter(alarm => alarm.id !== id);
        updateAlarmList();
    }

    function updateAlarmList() { 
        alarmListElement.innerHTML = '';
        alarms.forEach(alarm => {
            const alarmItem = document.createElement('div');
            alarmItem.className = 'alarm-item';
            alarmItem.innerHTML = `
                <span>${alarm.time.toLocaleTimeString()}</span>
                <button class="btn btn-danger" onclick="clearAlarm(${alarm.id})">Delete</button>
            `;
            alarmListElement.appendChild(alarmItem);
        });

        alarmStatusElement.textContent = alarms.length ? 'Alarms Set' : '';
    }

    setAlarmButton.addEventListener('click', setAlarm);
    setInterval(updateCurrentTime, 1000);
    setInterval(checkAlarm, 1000);

    window.clearAlarm = clearAlarm;
});
