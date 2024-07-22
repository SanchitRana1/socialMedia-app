import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import userSlice from "./userSlice";

import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";



const rootReducer = combineReducers({
    app: appSlice,
    user: userSlice,
    // add more reducers here
  });
const persistConfig = {key:"root",storage, version:1}
const persistedReducer=persistReducer(persistConfig,rootReducer)


const appStore = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

// Create the persistor
const persistor = persistStore(appStore);

export {appStore,persistor} ;