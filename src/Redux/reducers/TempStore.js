import * as Types from '../Types'
const initialState = {
    checkActiveSession: true
}

const TempStore = (state = initialState, action) => {

    switch (action.type) {
        case Types.CHECKACTIVESESSION:
            return {
                ...state,
                checkActiveSession: action.payload
            };
        default:
            return state;
    }
}


export default TempStore;
