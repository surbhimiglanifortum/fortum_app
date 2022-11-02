import { Auth } from 'aws-amplify';
import appconfig from '../../Utils/appconfig';
import axios from '../BaseUrl'

export const getUserDetails = async () => {
    const result = await Auth.currentAuthenticatedUser();
    if (result.signInUserSession) {
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

export const walletHistory = async (username, startDate, endDated) => {
    return await axios.get(appconfig.BASE_URL + "/users/get-transactions/", {
        params: {
            username: username,
            startDate: startDate,
            endDate: endDated
        }
    })
}


export const getFavouriteCHarger = async (username) => {
    return await axios.get('/favouriteCharger/' + username);

};

export const walletRecharge = async (username, payload) => {
    return await axios.post("/juspay/initiate_payment/close_loop_balance/" + username, payload);

}

export const userGstList = async () => {
    return await axios.get("/gst_state_map/all-gst-state")
}


export const registerNoPhone = async (username, sub) => {
    return await axios.post(`/users/registernophone/${username}/${sub}`)
}

export const updateUserPhone = async (username, payload) => {
    return await axios.post(`/users/gist/${username}/phone`, payload)
}
export const refundPayAsUGo = async (username, session_id) => {
    return await axios.get("/sessions/refund/" + username + '/pay_as_you_go/' + session_id)
}

export const refundCloseLoopWallet = async (username, session_id) => {
    return await axios.get("/sessions/add/" + username + '/close_wallet/' + session_id)
}

export const getStoreDataService = async (username) => {
    return await axios.get(appconfig.BASE_URL + '/store/' + username);

};
