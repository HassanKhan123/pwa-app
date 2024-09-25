import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

import { createMigrate, persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  storage,
  version: 3,
  //   blacklist: ['theme.pageLoaded', 'api'],
  migrate: createMigrate({
    // @ts-expect-error migrations are poorly typed
    1: (state) => {
      return {
        ...state,
      };
    },
    // @ts-expect-error migrations are poorly typed
    2: (state) => {
      return {
        ...state,
        user: {
          // @ts-expect-error migrations are poorly typed
          ...state.user,
          usedParticipationCode: {},
        },
      };
    },
    // @ts-expect-error migrations are poorly typed
    3: (state) => {
      return {
        ...state,
        user: {
          // @ts-expect-error migrations are poorly typed
          ...state.user,
          tokenExpiry: 0,
          isLoggedIn: false,
        },
      };
    },
  }),
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",

  // this line of code removes the redux error in the console
  
  // middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
  //   serializableCheck: false,
  // }),

  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware({ serializableCheck: false }).concat([
  //       api.middleware,
  //       thunk,
  //     ]),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
