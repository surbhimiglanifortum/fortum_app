import * as Types from '../Types'

const initialState = {
    userType: '',
    userDetails: null,
    expiredSubscriptionShown: null
}

const UserTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.USER_TYPE:
            return {
                ...state,
                userType: action.payload
            };
        case Types.USERDETAILS:
            return {
                ...state,
                userDetails: action.payload
            };
        case Types.ExpiredSubscription:
            return {
                ...state,
                userDetails: action.payload
            };
        case Types.ExpiredSubscriptionShown:
            return {
                ...state,
                expiredSubscriptionShown: action.payload
            };
        case Types.PINELABAUTH:
            return {
                ...state,
                pineLabAuth: action.payload
            }
        default:
            return state;
    }
}


export default UserTypeReducer;
