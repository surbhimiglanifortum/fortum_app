import { ADD_RESERVE, REMOVE_RESERVE } from './reducers/ChargingStationReservReducer';
import { USER_TYPE } from './reducers/UserTypeReducer'
import * as Types from './Types'

export const AddToRedux = (value, type) => {
    switch (type) {
        case Types.USER_TYPE:
            return {
                type: Types.USER_TYPE,
                payload: value
            }
            break
        case ADD_RESERVE:
            return {
                type: ADD_RESERVE,
                payload: value
            }
            break
        case REMOVE_RESERVE:
            return {
                type: REMOVE_RESERVE,
                payload: value
            }
        case Types.UPDATE_TNC_LAST_CALLED:
            return {
                type: Types.UPDATE_TNC_LAST_CALLED,
                payload: value
            }
            break
        case Types.USERDETAILS:
            return {
                type: Types.USERDETAILS,
                payload: value
            }
            break
        case Types.ExpiredSubscription:
            return {
                type: Types.ExpiredSubscription,
                payload: value
            }
            break
        case Types.ExpiredSubscriptionShown:
            return {
                type: Types.ExpiredSubscriptionShown,
                payload: value
            }
            break
        case Types.PINELABAUTH:
            return {
                type: Types.PINELABAUTH,
                payload: value
            }
        default:
            return '';
    }
}
