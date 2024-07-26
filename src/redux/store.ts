import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import productSlice from "./productSlice"; // Adjust the path if necessary
import basketSlice from "./basketSlice"; // Adjust the path if necessary

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine your slices
const rootReducer = combineReducers({
  products: productSlice,
  basket: basketSlice,
});

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: {
//     products: productSlice,
//     basket: basketSlice,
//   },
// });

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
