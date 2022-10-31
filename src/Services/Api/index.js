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

export const getUniqueConnectors = async () => {
    return await axios.get('/locations/uniqueconnectors')
}

export const getPaymentOption = async (username) => {
    return await axios.get("/users/payment_options/" + username);
};

export const payAsYouGo = async (username, payload) => {
    return await axios.post("/juspay/initiate_payment/pay_as_you_go/" + username, payload)
}

export const checkOrderId = async (username, payload) => {
    return await axios.post("/users/start_pay_as_you_go/" + username, payload)
}

export const walletBalanceEnquiry = async (payload) => {
    return await axios.post("/pinelabs/wallet/check-balance", payload);
};

export const blockAmount = async (payload) => {
    return await axios.post('/pinelabs/wallet/transaction/block-amount', payload);
}