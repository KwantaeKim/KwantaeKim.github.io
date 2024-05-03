var clock_CHE = document.querySelector('.blog-clock-CHE');

function getTime() {
    const time = new Date();
    const time_UTC = time.getTime() + (time.getTimezoneOffset() * 60 * 1000);
    
    // Determine if DST is in effect for CET timezone (March to October)
    const date = new Date();
    const year = date.getFullYear();
    const dstStart = new Date(year, 2, lastSundayOfMarch(year), 2, 0, 0); // Last Sunday of March, 02:00 UTC
    const dstEnd = new Date(year, 9, lastSundayOfOctober(year), 3, 0, 0); // Last Sunday of October, 03:00 UTC
    const isDST = time_UTC >= dstStart && time_UTC < dstEnd;
    
    // Adjust time difference based on DST
    const CET_time_diff = isDST ? 2 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000;
    const CHE_time = new Date(time_UTC + CET_time_diff);

    const CHE_hour = CHE_time.getHours();
    const CHE_min = CHE_time.getMinutes();
    const CHE_sec = CHE_time.getSeconds();
    const CHE_time_all = `${formatTime(CHE_hour)}:${formatTime(CHE_min)}:${formatTime(CHE_sec)}`;

    clock_CHE.innerHTML = CHE_time_all;
}

function init() {
    setInterval(getTime, 1000);
}

function formatTime(timeValue) {
    return timeValue < 10 ? `0${timeValue}` : timeValue;
}

function lastSundayOfMarch(year) {
    const lastDayOfMonth = new Date(year, 2 + 1, 0);
    const dayOfWeek = lastDayOfMonth.getDay();
    return lastDayOfMonth.getDate() - dayOfWeek;
}

function lastSundayOfOctober(year) {
    const lastDayOfMonth = new Date(year, 9 + 1, 0);
    const dayOfWeek = lastDayOfMonth.getDay();
    return lastDayOfMonth.getDate() - dayOfWeek;
}

init();
