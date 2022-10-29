import { Auth } from 'aws-amplify';
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