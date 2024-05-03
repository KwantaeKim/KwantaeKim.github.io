var clock_FIN = document.querySelector('.blog-clock-FIN');

function getTime() {
    const time = new Date();
    const time_UTC = time.getTime() + (time.getTimezoneOffset() * 60 * 1000);

    // Determine if DST is in effect for EET timezone (March to October)
    const date = new Date();
    const year = date.getFullYear();
    const dstStart = new Date(year, 2, lastSundayOfMarch(year), 3, 0, 0); // Last Sunday of March, 03:00 UTC
    const dstEnd = new Date(year, 9, lastSundayOfOctober(year), 4, 0, 0); // Last Sunday of October, 04:00 UTC
    const isDST = time_UTC >= dstStart && time_UTC < dstEnd;

    // Adjust time difference based on DST
    const EET_time_diff = isDST ? 3 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000;
    const FIN_time = new Date(time_UTC + EET_time_diff);

    const FIN_hour = FIN_time.getHours();
    const FIN_min = FIN_time.getMinutes();
    const FIN_sec = FIN_time.getSeconds();
    const FIN_time_all = `${formatTime(FIN_hour)}:${formatTime(FIN_min)}:${formatTime(FIN_sec)}`;

    clock_FIN.innerHTML = FIN_time_all;
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
