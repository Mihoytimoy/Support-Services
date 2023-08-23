import { configureStore } from "@reduxjs/toolkit";
import supportReducer from "./features/support/support-slice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
    key: 'root', 
    version: 1,
    storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, supportReducer);

export const store = configureStore({
    reducer: { 
        support: persistedReducer,
    }, middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;