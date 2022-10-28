const initialState = {
    reserveList: []
}

const ChargingStationReservReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESERVE:
            // let resv = [...state.reserveList]
            // let findReservData = resv.findIndex((data) => data.cid == action.payload.cid)
            // if (findReservData != -1) {
            //     resv[findReservData].startTime = action.payload.startTime
            //     resv[findReservData].endTime = action.payload.endTime
            //     resv[findReservData].uid = action.payload.uid

            //     console.log('check uid', action.payload.uid)
            // } else {
            //     resv.push(action.payload)
            // }
            let resv = []
            resv.push(action.payload)
            return {
                ...state,
                reserveList: resv
            };
        case REMOVE_RESERVE:
            return {
                ...state,
                reserveList: []
            }

        default:
            return state;
    }
}

export const ADD_RESERVE = 'ADD_RESERVE'
export const REMOVE_RESERVE = 'REMOVE_RESERVE'
export default ChargingStationReservReducer;
