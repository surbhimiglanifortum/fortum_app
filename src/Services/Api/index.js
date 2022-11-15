import { Auth } from 'aws-amplify';
import appconfig from '../../Utils/appconfig';
import axios from '../BaseUrl'
import { generateSHA } from '../../Utils/HelperCommonFunctions'

export const getUserDetails = async () => {
    const result = await Auth.currentAuthenticatedUser();
    if (result.signInUserSession) {
        return await axios.get("/api_app/users/gist/" + result.attributes.email)
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
    console.log("walletHistory", {
        username: username,
        startDate: startDate,
        endDate: endDated
    })
    return await axios.get(appconfig.BASE_URL + "/api_app/users/get-transactions/", {
        params: {
            username: username,
            startDate: startDate,
            endDate: endDated
        }
    })
}

export const getFavouriteCHarger = async (username, dispatch) => {
    const favData = await axios.get('/api_app/favouriteCharger/' + username);
    // dispatch(AddToRedux(favData.data?.result,Types.FAVCHARGER, ))
    return favData
};

export const deleteFavouriteCHarger = async (username, location_id) => {
    return await axios.delete('/api_app/favouriteCharger/' + username + '/' + location_id);
};

export const addFavouriteCharger = async (username, location_id) => {
    return await axios.post('/api_app/favouriteCharger', { username, location_id });
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
    return await axios.get('/api_app/store/' + username);
};

export const placeOrder = async (payload) => {
    return await axios.post('/api_app/orders/', payload);
};

export const sendOTP = async (phone) => {
    const dateIso = new Date().toISOString()
    const counter = Math.floor(Math.random() * (999 - 100)) + 100
    const hash = generateSHA(phone, dateIso, counter.toString());
    const payload = { number: phone, hash: hash, dateiso: dateIso, counter: counter.toString() }
    return await axios.post(appconfig.BASE_URL + '/sendotp', payload);
};

export const getChargingKeyService = async (username) => {
    return await axios.get('/api_app/charging_keys/ids/' + username);
};

export const getChargingKeyDetailsService = async (auth_id) => {
    return await axios.get('/api_app/tokens/' + auth_id);
};

export const getOrdersService = async (username) => {
    return await axios.get('/api_app/orders/' + username);
};

export const chargingList = async (username) => {
    return await axios.get('/api_app/sessions/allactive/' + username);
}

export const chargingListCompleted = async (username) => {
    return await axios.get('/api_app/sessions/all/' + username);
}

export const getAllUnpaid = async (username) => {
    return await axios.get('/api_app/sessions/allunpaid/' + username + '?app_version=' + appconfig.APP_VERSION_NUMBER);
}

export const unpaidPayByJuspay = async (session_id) => {
    return await axios.get('/api_app/sessions/pay/juspay/' + session_id);
}

export const unpaidPayByWallet = async (session_id) => {
    return await axios.get('/api_app/sessions/pay/close_wallet/' + session_id);
}

export const getSessionDetails = async (session_id) => {
    return await axios.get('/api_app/sessions/session_details/' + session_id);
}

export const getEvModalService = async () => {
    return await axios.get('/api_app/ev');
}

export const getPinelabHistroy = async (payload) => {
    return await axios.post('/api_app/pinelabs/wallet/history', payload);
}

export const getPinelabBalance = async (payload) => {
    return await axios.post("/api_app/pinelabs/wallet/check-balance", payload);
};

export const sentKycOtp = async (payload) => {
    return await axios.post("/api_app/pinelabs/user/prepaid-card/start", payload);
}

export const resendPinelabOtp = async (payload) => {
    return await axios.post("/api_app/pinelabs/user/prepaid-card/resend-otp", payload);
}

export const validatePinelabOtp = async (payload) => {
    return await axios.post("/api_app/pinelabs/user/prepaid-card/validate-otp", payload);
}

export const pinelabDocVerify = async (payload) => {
    return await axios.post("/api_app/pinelabs/user/verify/document", payload);
}

export const createPinelabWallet = async (payload) => {
    return await axios.post("/api_app/pinelabs/create-wallet", payload);
};

export const createPinelabDigitalCard = async (payload) => {
    return await axios.post("/api_app/pinelabs/card/issue/digital-card", payload);
};

export const getEncryptData = async (payload) => {
    return await axios.post('/api_app/pinelabs/card/encrypted-sdk-cred', payload)
}

export const orderPinelabCard = async (payload) => {
    return await axios.post('/api_app/pinelabs/card/order/digital-to-physical-card', payload)
}

export const checkCardOrderStatus = async (payload) => {
    return await axios.post('/api_app/pinelabs/card/order/get-status', payload)
}

export const getFaqService = async () => {
    return await axios.get('/api_app/faq/getfaq');
}

export const updateProfileService = async (username, fname,) => {
    return await axios.post("/api_app/gist/" + username + "/first_name", { first_name: fname })
}

export const getStateList = async () => {
    return await axios.get('/api_app/pinelabs/misc/state')
}

export const addAddressService = async (object, username) => {
    return await axios.post("/api_app/users/gist/" + username + "/address", object)
}

export const getTncVersion = async (username) => {
    return await axios.get("/api_app/tncversion/" + username)
}

export const acceptTnc = async (username) => {
    return await axios.put("/api_app/tncversion/" + username)
}

export const loadWalletMoney = async (payload) => {
    return await axios.post("/api_app/juspay/initiate_payment/stored-value-account", payload);
};


export const feedback = async (payload) => {
    return await axios.post("/api_app/feedback", payload);
};