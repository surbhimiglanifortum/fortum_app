import * as Types from '../Types'
const initialState = {
    tnc_last_called: null,
    favCharger: null,
    checkActiveSession: true
}

const CommonReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.UPDATE_TNC_LAST_CALLED:
            return {
                ...state,
                tnc_last_called: action.payload
            };
        case Types.FAVCHARGER:
            return {
                ...state,
                favCharger: action.payload
            };
        case Types.CHECKACTIVESESSION:
            return {
                ...state,
                checkActiveSession: action.payload
            };
        default:
            return state;
    }
}


export default CommonReducer;
