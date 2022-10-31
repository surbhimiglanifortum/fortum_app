import axios from "axios";
import appconfig from "../../Utils/appconfig";

export const chargingListServices = async () => {
    let username = 'anuj.yadav@mfilterit.com'
    console.log("username of chqarging history API", username)
    const url = (appconfig.BASE_URL + "/sessions/allactive/" + username);
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

}
export const chargingListCompletedServices = async () => {
    let username = 'anuj.yadav@mfilterit.com'
    console.log("username of chqarging history API", username)
    const url = (appconfig.BASE_URL + "/sessions/all/" + username);
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

}