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
