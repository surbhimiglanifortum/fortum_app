import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTypeReducer from './reducers/UserTypeReducer'
import ChargingStationReservReducer from './reducers/ChargingStationReservReducer'
import CommonReducer from "./reducers/CommonReducers";
import { LOGOUT } from "./Types";
import AddToCartReducers from "./reducers/AddToCartreducer";
import AddSearchLocationReducer from "./reducers/AddSearchLocation";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['userTypeReducer','commonReducer','AddToCartReducers','addSearchLocationReducer'], // save
    blacklist: ['chargingStationReservReducer'] //Temporary 
}

const rootReducer = combineReducers({
    userTypeReducer: UserTypeReducer,
    chargingStationReservReducer: ChargingStationReservReducer,
    commonReducer:CommonReducer,
    AddToCartReducers:AddToCartReducers,
    addSearchLocationReducer:AddSearchLocationReducer
});

const removeReducer = (state, action) => {
    if (action.type === LOGOUT) {
        persistConfig.storage.removeItem('persist:root')
        state = undefined
    }
    return rootReducer(state, action)
}

export const persistedReducer = persistReducer(persistConfig, removeReducer)
export const configureStore = createStore(persistedReducer);
export const persistor = persistStore(configureStore)
