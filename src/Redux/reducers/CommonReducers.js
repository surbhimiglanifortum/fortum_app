import * as Types from '../Types'
const initialState = {
    tnc_last_called: null,
    favCharger: null
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
        default:
            return state;
    }
}


export default CommonReducer;
