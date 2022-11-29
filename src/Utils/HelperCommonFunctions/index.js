import sha256 from 'crypto-js/sha256';
import { Auth } from 'aws-amplify';

export function validateEmail(email) { //Validates the email address
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone) { //Validates the phone number
    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
    return phoneRegex.test(phone);
}

export function generateSHA(number, dateISO, counter) {

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


export const getChargerMapObject = (standard) => {
    const map = {
        "IEC_62196_T1": { name: "TYPE1", icon: "connector-type1" },
        "IEC_62196_T2_COMBO": { name: "CCS", icon: "connector-ccs" },
        "CHADEMO": { name: "CHADEMO", icon: "connector-chademo" },
        "IEC_62196_T2": { name: "TYPE2", icon: "connector-type2" },
        "IEC_62196_T1_COMBO": { name: "Bharat DC001", icon: "connector-bharatdc" },
        "DOMESTIC_F": { name: "AC 001", icon: "connector-unknown" },
    }

    if (map.hasOwnProperty(standard)) {
        return map[standard]
    }
    else {
        return {
            name: standard,
            icon: ""
        }
    }
}

export const userExist = (userName) => {
    return Auth.signIn(userName, '123');
}


export const getPaymentString = (key) => {
    switch (key) {
        case "PAY_AS_U_GO":
            return "Debit/Credit card"
            break;

        case "CLOSED_WALLET":
            return "Closed Wallet"
            break;

        case "PREPAID_CARD":
            return "Prepaid card"
            break;

        case "PREPAID_CARD_WALLET_Block":
            return "Pinelab card"
            break;

        case "SESSIONPAYMENT":
            return "Debit/Credit card, Netbanking"
            break;

        case "SESSIONPAYMENTPREPAIDCARD":
            return "Prepaid card"
            break;

        default:
            return ""
            break;
    }

}

export const getChargeTime = (dataItem) => {
    try {
        let startDate = new Date(dataItem?.item?.start_datetime)
        let endDate = new Date(dataItem?.item?.end_datetime)
        var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        console.log("charge time", seconds)
        return secondsToHms(seconds)
    } catch (error) {
        console.log("error", error)
        return ""
    }
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " seconds") : "";
    console.log("charge time", hDisplay + mDisplay + sDisplay)
    return hDisplay + mDisplay + sDisplay;
}