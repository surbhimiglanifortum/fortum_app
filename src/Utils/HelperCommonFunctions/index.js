import sha256 from 'crypto-js/sha256';



export function validateEmail(email) { //Validates the email address
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone) { //Validates the phone number
    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
    return phoneRegex.test(phone);
}



export function generateSHA(number, dateISO, counter) {
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
    console.log("GEnerate sha done")
    return hashDigest;
}