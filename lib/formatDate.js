import { DateTime } from "luxon";

export const formatDateMDY = (date) => {
    var newDate = DateTime.fromISO(date, {zone: 'America/Chicago'});

    return newDate.toLocaleString(DateTime.DATETIME_SHORT);
}

export const formatDateYYYYMMDD = (date) => {
    return new Date(date).toISOString().split("T")[0];
}

export const formatTimeHHMM = (dateISO) => {
    return DateTime.fromISO(dateISO).toFormat('HH:mm')
}

// true perils of aesthetically not liking the DateTime input
// and wanting them separated into 2 inputs
export const formatDbDate = (date, time) => {
    const splitTime = time.split(':')
    const splitDate = date.split('-')

    let toConvert = DateTime.now().set({ 
        day: Number(splitDate[2]), 
        month: Number(splitDate[1]), 
        year: Number(splitDate[0]),
        hour: Number(splitTime[0]), 
        minute: Number(splitTime[1]) 
    })

    return toConvert.toJSDate();
}

export const currentWeek = (date) => {
    var today = DateTime.fromJSDate(date, {zone: 'America/Chicago'});

    // get day of week
    var dayOfWeek = today.weekday;

    // week begins on Sunday (7) and ends on EOD Saturday (6)
    var week = {}

    if (dayOfWeek === 7) {
        week.begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        week.end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6, 23, 59, 59);
    } else if (dayOfWeek === 1) {
        week.begin = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
        week.end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5, 23, 59, 59);
    }  else if (dayOfWeek === 2) {
        week.begin = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2);
        week.end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4, 23, 59, 59);
    }  else if (dayOfWeek === 3) {
        week.begin = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3);
        week.end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 23, 59, 59);
    }  else if (dayOfWeek === 4) {
        week.begin = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 4);
        week.end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 23, 59, 59);
    }  else if (dayOfWeek === 5) {
        week.begin = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 5);
        week.end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 23, 59, 59);
    }  else if (dayOfWeek === 6) {
        week.begin = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
        week.end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    }

    return week
}