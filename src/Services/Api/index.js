import { Auth } from 'aws-amplify';
import appconfig from '../../Utils/appconfig';
import axios from '../BaseUrl'

export const getUserDetails = async () => {
    const result = await Auth.currentAuthenticatedUser();
    if (result) {
        return await axios.get("/users/gist/" + result.attributes.email)
    } else {
        throw 'User Not logged in'
    }

}

export const getLocation = async (payload) => {
    return await axios.post("/locations/filter", payload)
}

export const getEvses = async (locid, payload) => {
    return await axios.post("/locations/gist/" + locid, payload)
}

export const getUniqueConnectors = async () =>{
    return await axios.get('/locations/uniqueconnectors')
}

export const walletHistory = async (username, startDate, endDate) => {
    let userName = 'ritu.bhagwasiya@mfilterit.com'
    let srtDate = '2022-07-01T11:34:21'
    let EndData = '2022-10-31T06:02:03'
    return await axios.get(appconfig.BASE_URL + "/users/get-transactions/", {
        params: {
            username: userName,
            startDate: srtDate,
            endDate: EndData
        }
    })
}