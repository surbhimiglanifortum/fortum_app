import { Auth } from 'aws-amplify';
import appconfig from '../../Utils/appconfig';
import axios from '../BaseUrl'
import { generateSHA } from '../../Utils/HelperCommonFunctions'
export const getUserDetails = async () => {
    const result = await Auth.currentAuthenticatedUser();
    if (result.signInUserSession) {
        return await axios.get("/users/gist/" + result.attributes.email)
    } else {
        throw 'User Not logged in'
    }

}

export const getLocation = async (payload) => {
    return await axios.post("/api_app/locations/filter", payload)
}

export const getEvses = async (locid, payload) => {
    return await axios.post("/api_app/locations/gist/" + locid, payload)
}

export const getUniqueConnectors = async () => {
    return await axios.get('/api_app/locations/uniqueconnectors')
}

export const getPaymentOption = async (username) => {
    return await axios.get("/api_app/users/payment_options/" + username);
};

export const payAsYouGo = async (username, payload) => {
    return await axios.post("/api_app/juspay/initiate_payment/pay_as_you_go/" + username, payload)
}

export const checkOrderId = async (username, payload) => {
    return await axios.post("/api_app/users/start_pay_as_you_go/" + username, payload)
}

export const walletBalanceEnquiry = async (payload) => {
    return await axios.post("/api_app/pinelabs/wallet/check-balance", payload);
};

export const blockAmount = async (payload) => {
    return await axios.post('/api_app/pinelabs/wallet/transaction/block-amount', payload);
}

export const walletHistory = async (username, startDate, endDated) => {
    return await axios.get(appconfig.BASE_URL + "/api_app/users/get-transactions/", {
        params: {
            username: username,
            startDate: startDate,
            endDate: endDated
        }
    })
}


export const getFavouriteCHarger = async (username) => {
    return await axios.get('/api_app/favouriteCharger/' + username);

};

export const walletRecharge = async (username, payload) => {
    return await axios.post("/api_app/juspay/initiate_payment/close_loop_balance/" + username, payload);

}

export const userGstList = async () => {
    return await axios.get("/api_app/gst_state_map/all-gst-state")
}


export const registerNoPhone = async (username, sub) => {
    return await axios.post(`/api_app/users/registernophone/${username}/${sub}`)
}

export const updateUserPhone = async (username, payload) => {
    return await axios.post(`/api_app/users/gist/${username}/phone`, payload)
}
export const refundPayAsUGo = async (username, session_id) => {
    return await axios.get("/api_app/sessions/refund/" + username + '/pay_as_you_go/' + session_id)
}

export const refundCloseLoopWallet = async (username, session_id) => {
    return await axios.get("/api_app/sessions/add/" + username + '/close_wallet/' + session_id)
}

export const getStoreDataService = async (username) => {
    return await axios.get(appconfig.BASE_URL + '/api_app/store/' + username);

};


export const sendOTP = async (phone) => {
    const dateIso = new Date().toISOString()
    const counter = Math.floor(Math.random() * (999 - 100)) + 100
    const hash = generateSHA(phone, dateIso, counter.toString());
    const payload = { number: phone, hash: hash, dateiso: dateIso, counter: counter.toString() }

    return await axios.post(appconfig.BASE_URL + '/sendotp', payload);

    return await axios.get(appconfig.BASE_URL + '/store/' + username);
};
export const getChargingKeyService = async (username) => {
    return await axios.get(appconfig.BASE_URL + '/charging_keys/ids/' + username);
};
export const getChargingKeyDetailsService = async (auth_id) => {
    return await axios.get(appconfig.BASE_URL + '/tokens/' + auth_id);
};
export const getOrdersService = async (username) => {
    return await axios.get(appconfig.BASE_URL + '/orders/' + username);
};
