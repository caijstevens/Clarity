export function getNextHour(date = new Date()) {
    date.setTime(date.getTime() + ( ( ( ( (59 - date.getMinutes()) * 60) + (59 - date.getSeconds()) ) * 1000) + (1000 - date.getMilliseconds()) ) );
    return date;
}

export function toDate(hours: number) {
    let date = new Date();
    date.setHours(Math.floor(hours));
    date.setMinutes((hours - Math.floor(hours)) * 60);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

export function toHours(date: Date) {
    return date.getHours() + (date.getMinutes() / 60);
}

export function getDay(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    

}

export function combineTimeAndDay(time: Date, day: Date) {
    let newDate = new Date(day.getTime());
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate.setSeconds(time.getSeconds());
    newDate.setMilliseconds(time.getMilliseconds());
    return newDate;
}

export function clamp(input: number, min: number, max: number) {
    return Math.max(min, Math.min(max, input));
}

export function hexStringToRGB(hex: string) {
    return {
        r: hexToNumber(hex.slice(1,2)),
        g: hexToNumber(hex.slice(3,4)),
        b: hexToNumber(hex.slice(5,6))
    }
}

export function getTextColourFromBackground(backgroundColor: string) {
    let rgb = hexStringToRGB(backgroundColor);
    console.log(Math.max(rgb.r, rgb.g, rgb.b));
    if (Math.max(rgb.r, rgb.g, rgb.b) > 189) {
        return "#000000";
    } else {
        return "#FFFFFF";
    }
}

export function hexToNumber(hex: string) {
    let result = 0;
    for (let index = 0; index < hex.length; index++) {
        result += parseInt(hex[index], 16) * (16 ** (hex.length - index));

    }
    return result;
}

export function getWeekFromDay(day: Date) {
    let weekDay = day.getDay();
    if (weekDay == 0) {
        weekDay = 6;
    } else {
        weekDay -= 1;
    }
    let mondayMidnight = new Date(day.getTime() - (weekDay * 86400000));
    let weekArray: Date[] = [mondayMidnight];
    for (let index = 1; index < 7; index++) {     
        weekArray.push(new Date(mondayMidnight.getTime() + (86400000 * index)));
    }  
    return weekArray;
}