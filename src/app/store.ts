import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/support/support-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, counterReducer);

export const store = configureStore({
    reducer: { 
        counter: counterReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;