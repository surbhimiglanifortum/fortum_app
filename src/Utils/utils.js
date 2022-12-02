import sha256 from 'crypto-js/sha256';
import moment from 'moment';

export const GetFormatedDate = (date) => {
    //     const monthNames = ["January", "February", "March", "April", "May", "June",
    //         "July", "August", "September", "October", "November", "December"];

    //     // if (typeof datetime === 'string' || datetime instanceof String)
    //     // datetime = datetime.replace("Z","")

    //     var date = new Date(datetime);
    //     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'} `
    // }
    // export const GetFormatedDateOnly = (datetime) => {
    //     var date = new Date(datetime);
    //     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return moment.utc(date).local().format('DD/MM/YYYY , h:mm A');
}

export const GetCouterTime = (startTime, endDate) => {
    // console.log("Charger time ",startTime,endDate)
    const today = new Date(startTime);
    endDate != undefined ? endDate = new Date(endDate) : endDate = new Date()
    // const endDate = new Date("2022-01-04T12:21:13Z");
    const days = parseInt((endDate - today) / (1000 * 60 * 60 * 24));
    let hours = parseInt(Math.abs(endDate - today) / (1000 * 60 * 60) % 24);
    let minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
    let seconds = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60);

    if (String(hours).length < 2) {
        hours = '0' + hours
    }

    if (String(minutes).length < 2) {
        minutes = '0' + minutes
    }

    if (String(seconds).length < 2) {
        seconds = '0' + seconds
    }

    const timerObj = {
        hours: `${hours}`,
        minutes: `${minutes}`,
        seconds: `${seconds}`
    }

    return timerObj
}

export const generateSHA = (number, dateISO, counter) => {
    console.log("GEnerate sha")
    const HASH = "19c14cbe3260087bf121af4b6949469b"
    let n = number.split("")
    let counters = counter.split("")
    if (n.length < 10) {
        return ""
    }
    n.splice(0, 0, counters[0])
    n.splice(4, 0, counters[1])
    n.splice(7, 0, counters[2])
    n.splice(3, 0, dateISO)
    n = n.join(HASH)

    const hashDigest = sha256(n).toString();

    return hashDigest;
}


export const YouSavedBannerAmount = (kwh) => {
    kwh = parseFloat(kwh)
    console.log("lanlsdsa")
    console.log(kwh)
    return ((4.74 * 7 * kwh + 7.14 * 7 * kwh - 2 * 3.91 * kwh * 7) / 2).toFixed(2)
}