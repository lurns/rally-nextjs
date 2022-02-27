import { DateTime } from "luxon";

export const formatDateMDY = (date) => {
    var newDate = DateTime.fromISO(date, {zone: 'America/Chicago'});

    return newDate.toLocaleString(DateTime.DATETIME_SHORT);
}