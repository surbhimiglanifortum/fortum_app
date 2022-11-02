import axios from "axios";
import appconfig from "../../Utils/appconfig";

export const chargingListServices = async (userName) => {
    const url = (appconfig.BASE_URL + "/sessions/allactive/" + userName);
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const chargingListCompletedServices = async (userName) => {
    const url = (appconfig.BASE_URL + "/sessions/all/" + userName);
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

}